import { ZettelExtensions } from '@zettelooo/extension-api'
import { Data } from 'shared'
import { registerInitializer } from './helpers/registerInitializer'
import { registerQuickAction } from './helpers/registerQuickAction'
import { registerTipMessage } from './helpers/registerTipMessage'
import { registerComposerPart } from './helpers/registerComposerPart'
import { registerCardPart } from './helpers/registerCardPart'

ZettelExtensions.setStarter<Data>(function (api) {
  this.while('activated', function ({ activatedApi }) {
    this.while('signedIn', function ({ signedInApi }) {
      this.while('pagePanel', function ({ pagePanelApi }) {
        registerInitializer.bind(this)({ signedInApi, pagePanelApi })
        registerQuickAction.bind(this)({ api, activatedApi, signedInApi, pagePanelApi })
        registerTipMessage.bind(this)({ api, signedInApi, pagePanelApi })
        this.while('composer', function ({ composerApi }) {
          registerComposerPart.bind(this)({ activatedApi, composerApi })
        })
      })
      this.while('card', function ({ cardApi }) {
        registerCardPart.bind(this)({ cardApi })
      })
    })
  })
})
