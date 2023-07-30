import { ZettelServices } from '@zettelooo/api-server'
import { Data } from 'shared'
import { ZETTEL_EXTENSION_ACCESS_KEY, ZETTEL_TARGET_ENVIRONMENT } from './constants'

export const restApiClient = new ZettelServices.Rest<Data>({
  restApi: { targetEnvironment: ZETTEL_TARGET_ENVIRONMENT },
  extensionAccessKey: ZETTEL_EXTENSION_ACCESS_KEY,
})
