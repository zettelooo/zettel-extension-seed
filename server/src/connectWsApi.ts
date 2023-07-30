import { ZettelServices } from '@zettelooo/api-server'
import { Data } from 'shared'
import { ZETTEL_EXTENSION_ACCESS_KEY, ZETTEL_TARGET_ENVIRONMENT } from './constants'

export function connectWsApi(): ZettelServices.Ws.GetUpdates<Data> {
  const connection = new ZettelServices.Ws.GetUpdates<Data>({
    wsApi: { targetEnvironment: ZETTEL_TARGET_ENVIRONMENT },
    extensionAccessKey: ZETTEL_EXTENSION_ACCESS_KEY,
    startInitially: true,
    retryConnectionTimeoutMilliseconds: 10 * 1000,
    onStatusChange: status => {},
    onMutation: async mutation => {},
  })
  return connection
}
