import { ZettelExtensions } from '@zettelooo/extension-api'
import { Data } from 'shared'

export const registerTipMessage: ZettelExtensions.Helper<
  'pagePanel',
  'api' | 'signedIn' | 'pagePanel',
  [],
  void,
  Data
> = function ({ api, signedInApi, pagePanelApi }) {
  const tipMessageRegistration = this.register(
    pagePanelApi.registry.message<{ readonly closing?: boolean }>(() => ({
      initialState: {},
      render: ({ renderContext, un }) => ({
        encapsulated: true,
        html: `
<div>
  <p style="display: flex; align-items: center; gap: 10px;">
    <img src="${api.getFileUrl({ filePath: 'idea.png' })}" alt="tip" />
    Every card is now a text card!
  </p>
  <p>${renderContext.state.closing ? 'Closing...' : 'You may close this tip.'}</p>
</div>
`,
      }),
      variant: 'information',
      onClose: async () => {
        if (tipMessageRegistration.reference.current?.getState().closing) return
        tipMessageRegistration.reference.current?.setState({ closing: true })
        try {
          await signedInApi.access.updatePage({
            id: pagePanelApi.target.pageId,
            data: { ...pagePanelApi.data.page.data, tipIsClosed: true },
          })
        } finally {
          tipMessageRegistration.reference.current?.setState({ closing: false })
        }
      },
    })),
    {
      condition: data => !data.page.data?.disabled && !data.page.data?.tipIsClosed,
    }
  )
}
