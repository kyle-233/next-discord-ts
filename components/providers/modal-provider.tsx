import { CreateChannelModal } from '../modals/create-channel-modal'
import { CreateServerModal } from '../modals/create-server-modal'
import { EditServerModal } from '../modals/edit-server-modal'
import { InviteModal } from '../modals/invite-modal'
import { MembersModal } from '../modals/members-modal'

export const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
    </>
  )
}
