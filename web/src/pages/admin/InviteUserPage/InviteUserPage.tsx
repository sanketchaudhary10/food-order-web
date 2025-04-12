import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'

const INVITE_USER_MUTATION = gql`
  mutation InviteUserMutation($input: InviteUserInput!) {
    inviteUser(input: $input) {
      id
      email
      isInvited
    }
  }
`

const InviteUserPage = () => {
  const { currentUser } = useAuth()
  const [email, setEmail] = useState('')
  const [inviteUser] = useMutation(INVITE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User invited successfully!')
      setEmail('')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (e) => {
    e.preventDefault()
    inviteUser({
      variables: {
        input: {
          email,
          invitedBy: currentUser?.id,
        },
      },
    })
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Invite a New User</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          required
          placeholder="Email address"
          className="w-full p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Invite
        </button>
      </form>
    </div>
  )
}

export default InviteUserPage
