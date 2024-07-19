import { InitialModal } from '@/components/modals/initial-modal'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'

export default async function Page() {
  const profile = await initialProfile()
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })
  console.log('profile', profile)
  console.log('server', server)

  if (server) {
    return redirect(`/servers/${server.id}`)
  }
  return <InitialModal />
}
