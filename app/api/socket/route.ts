import { NextApiResponseServerIo } from '@/types'
import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'

export async function GET(_req: NextApiRequest, res: NextApiResponseServerIo) {
  console.log('res', res)
  if (!res?.socket?.server?.io) {
    const path = '/api/socket'
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    })

    res.socket.server.io = io
  }
  res.end()
}
