import { MySocket } from './types'

const socketConnector = (client: MySocket) => {
  const { token } = client.handshake.query
  if (token !== undefined) {
    client.token = token
    client.join(token)
    client.emit('ready')
  } else {
    client.disconnect()
  }
}

export default socketConnector
