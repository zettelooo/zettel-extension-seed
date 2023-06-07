import { ZettelServices } from '@zettelooo/api-server'
import { CardExtensionData, PageExtensionData } from 'shared'
import { ZETTEL_EXTENSION_ACCESS_KEY, ZETTEL_TARGET_ENVIRONMENT } from './constants'

export function connectWsApi(): ZettelServices.Extension.Ws.GetUpdates<PageExtensionData, CardExtensionData> {
  const connection = new ZettelServices.Extension.Ws.GetUpdates<PageExtensionData, CardExtensionData>({
    extensionWsApi: { targetEnvironment: ZETTEL_TARGET_ENVIRONMENT },
    extensionAccessKey: ZETTEL_EXTENSION_ACCESS_KEY,
    startInitially: true,
    retryConnectionTimeoutMilliseconds: 10 * 1000,
    onStatusChange: status => {},
    onMutation: async mutation => {},
  })
  return connection
}
