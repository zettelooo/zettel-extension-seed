import { WindowWithExtensionFunction } from '@zettelyay/extension-api'
import { ExtensionScope } from '@zettelyay/models'
import { PageExtensionData } from '../../shared/PageExtensionData'
import { watchPageExtensionData } from './watchPageExtensionData'

void ((window as WindowWithExtensionFunction).extensionFunction = function (api) {
  this.while('activated', function ({ activatedApi }) {
    this.while('signedIn', function ({ signedInApi }) {
      this.while('pagePanelRendered', function ({ pagePanelRenderedApi }) {
        if (!this.scopes.includes(ExtensionScope.Page)) return

        const applyPageExtensionData = (): void => {
          quickActionRegistration.reference.current?.update({
            disabled: false,
            switchChecked: Boolean(pageExtensionDataRef.current?.enabled),
          })
          tipMessageRegistration.reference.current?.update({
            initialState: pageExtensionDataRef.current,
            hidden: !pageExtensionDataRef.current,
          })
        }
        const { pageExtensionDataRef } = watchPageExtensionData.bind(this)({ api }, applyPageExtensionData)

        const quickActionRegistration = this.register(
          pagePanelRenderedApi.registry.quickAction(() => ({
            title: 'My extension',
            description: 'My extension description',
            avatarUrl: api.extensionHeader.avatar.file
              ? api.getFileUrl(api.extensionHeader.avatar.file)
              : api.extensionHeader.avatar.dataUrl,
            disabled: true,
            switchChecked: false,
            async onClick() {
              activatedApi.access.showMessage('My extension', 'This is a message from my extension!', {
                variant: 'success',
              })
            },
            async onToggleSwitch(checked) {
              quickActionRegistration.reference.current?.update({
                disabled: true,
              })
              await setPageExtensionData(checked ? { enabled: true } : undefined)
              quickActionRegistration.reference.current?.update({
                disabled: false,
              })
            },
          }))
        )

        const loadingIndicatorRegistration = this.register(
          pagePanelRenderedApi.registry.loadingIndicator(() => `Updating ${api.extensionHeader.name} status...`),
          { initiallyInactive: true }
        )

        const tipMessageRegistration = this.register(
          pagePanelRenderedApi.registry.message<PageExtensionData>(() => ({
            initialState: undefined,
            render: ({ renderContext, un }) => ({
              encapsulated: true,
              html: !renderContext.state
                ? '<p>Loading...</p>'
                : `
<div>
  <p style="display: flex; align-items: center; gap: 10px;">
    <img src="${api.getFileUrl('idea.png')}" alt="tip" />
    This is a tip about my extension!
  </p>
  <p>
    This will show up when the extension is enabled on the page.
  </p>
</div>
`,
            }),
            variant: 'information',
            hidden: true,
          }))
        )

        async function setPageExtensionData(newPageExtensionData: PageExtensionData): Promise<void> {
          try {
            loadingIndicatorRegistration.activate()
            await signedInApi.access.setPageExtensionData<PageExtensionData>(
              pagePanelRenderedApi.target.pageId,
              newPageExtensionData
            )
          } catch {
            // Do nothing!
          } finally {
            loadingIndicatorRegistration.deactivate()
          }
        }
      })
    })
  })
})
