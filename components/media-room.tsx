'use client'
import { useUser } from '@clerk/nextjs'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser()
  const [token, setToken] = useState('')

  useEffect(() => {
    console.log('user', user)
    if (!user?.firstName || !user.lastName) return
    // const name = user?.firstName
    //   ? `${user?.firstName} ${user?.lastName}`
    //   : `${user?.emailAddresses?.[0].emailAddress}`

    const name = `${user?.firstName} ${user?.lastName}` as string

    ;(async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [user?.firstName, user?.lastName, chatId])

  if (token === '') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }
  return (
    <LiveKitRoom
      data-lk-theme="deafault"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      style={{ height: '100dvh' }}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}