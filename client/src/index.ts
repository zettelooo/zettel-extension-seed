import { ZettelExtensions } from '@zettelooo/extension-api'
import { PageExtensionData } from 'shared'

void ((window as ZettelExtensions.WindowWithStarter).$starter = function (api) {
  this.while('activated', function ({ activatedApi }) {
    this.while('signedIn', function ({ signedInApi }) {
      this.while('pagePanel', function ({ pagePanelApi }) {
        if (!this.scopes.includes(ZettelExtensions.Scope.Page)) return

        const quickActionRegistration = this.register(
          pagePanelApi.registry.quickAction(() => ({
            title: 'My extension',
            description: 'My extension description',
            avatarUrl: api.header.avatarUrl,
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
          pagePanelApi.registry.loadingIndicator(() => `Updating ${api.header.name} status...`),
          { initiallyInactive: true }
        )

        const tipMessageRegistration = this.register(
          pagePanelApi.registry.message<PageExtensionData>(() => ({
            initialState: undefined,
            render: ({ renderContext, un }) => ({
              encapsulated: true,
              html: !renderContext.state
                ? '<p>Loading...</p>'
                : `
<div>
  <p style="display: flex; align-items: center; gap: 10px;">
    <img src="${api.getFileUrl({ filePath: 'idea.png' })}" alt="tip" />
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

        this.register(
          pagePanelApi.watch(
            data => data.page.extensionData as PageExtensionData,
            pageExtensionData => {
              quickActionRegistration.reference.current?.update({
                disabled: false,
                switchChecked: Boolean(pageExtensionData?.enabled),
              })
              tipMessageRegistration.reference.current?.update({
                initialState: pageExtensionData,
                hidden: !pageExtensionData,
              })
            },
            {
              initialCallback: true,
            }
          )
        )

        async function setPageExtensionData(newPageExtensionData: PageExtensionData): Promise<void> {
          try {
            loadingIndicatorRegistration.activate()
            await signedInApi.access.setPageExtensionData<PageExtensionData>(
              pagePanelApi.target.pageId,
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
