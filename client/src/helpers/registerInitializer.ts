import { ZettelExtensions } from '@zettelooo/extension-api'
import { Data } from 'shared'

export const registerInitializer: ZettelExtensions.Helper<'pagePanel', 'signedIn' | 'pagePanel', [], void, Data> =
  function ({ signedInApi, pagePanelApi }) {
    this.register(
      pagePanelApi.registry.initializer(async ({ command }) => {
        if (pagePanelApi.data.page.data?.disabled || pagePanelApi.data.page.data?.tipIsClosed) {
          await signedInApi.access.updatePage({
            id: pagePanelApi.target.pageId,
            data: undefined,
          })
        }
      })
    )
  }
