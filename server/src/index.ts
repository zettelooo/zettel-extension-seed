import { connectWsApi } from './connectWsApi'
import { startServer } from './startServer'

const connection = connectWsApi()
startServer(connection)
