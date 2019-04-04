import _io from 'socket.io'

export interface MySocket extends _io.Socket {
  token: string
}
