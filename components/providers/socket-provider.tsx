'use client'
import { createContext, useContext, useEffect, useState } from 'react'

import { io as ClientIO } from 'socket.io-client'

type SocketContextType = {
  socket: any | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: '/api/socket/io',
        addTrailingSlash: false,
      },
    )
    const onConnected = () => {
      setIsConnected(true)
    }
    const onDisConnected = () => {
      setIsConnected(false)
    }
    socketInstance.on('connect', onConnected)
    socketInstance.on('disconect', onDisConnected)

    setSocket(socketInstance)

    return () => {
      socketInstance.off('connect', onConnected)
      socketInstance.off('disconnect', onDisConnected)
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
