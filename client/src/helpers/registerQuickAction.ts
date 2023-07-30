import { ZettelExtensions } from '@zettelooo/extension-api'
import { Data } from 'shared'

export const registerQuickAction: ZettelExtensions.Helper<
  'pagePanel',
  'api' | 'activated' | 'signedIn' | 'pagePanel',
  [],
  void,
  Data
> = function ({ api, activatedApi, signedInApi, pagePanelApi }) {
  const quickActionRegistration = this.register(
    pagePanelApi.registry.quickAction(() => ({
      title: api.header.name,
      description: api.header.description,
      avatarUrl: api.header.avatarUrl,
      disabled: true,
      switchChecked: false,
      async onClick() {
        activatedApi.access.showMessage('My extension', 'This is a message from my extension!', {
          variant: 'success',
        })
      },
      async onToggleSwitch(checked) {
        quickActionRegistration.reference.current?.update({ disabled: true })
        await signedInApi.access.updatePage({
          id: pagePanelApi.target.pageId,
          data: checked ? undefined : { disabled: true },
        })
        quickActionRegistration.reference.current?.update({ disabled: false })
      },
    }))
  )

  this.register(
    pagePanelApi.watch(
      data => data.page.data,
      pageData => {
        quickActionRegistration.reference.current?.update({
          disabled: false,
          switchChecked: !pageData?.disabled,
        })
      },
      {
        initialCallback: true,
      }
    )
  )
}
