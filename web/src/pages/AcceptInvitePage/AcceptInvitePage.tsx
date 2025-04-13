import { useState, useEffect } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Form, Label, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

const ACCEPT_INVITE_MUTATION = gql`
  mutation AcceptInviteMutation($input: AcceptInviteInput!) {
    acceptInvite(input: $input) {
      id
      name
      email
    }
  }
`

const AcceptInvitePage = () => {
  const [token, setToken] = useState('')
  const [acceptInvite] = useMutation(ACCEPT_INVITE_MUTATION, {
    onCompleted: () => {
      toast.success('Account created! Please log in.')
      navigate(routes.login())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenFromUrl = urlParams.get('token')
    setToken(tokenFromUrl || '')
  }, [])

  const onSubmit = (data) => {
    acceptInvite({
      variables: {
        input: {
          ...data,
          token,
        },
      },
    })
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Complete Your Registration</h2>
      <Form onSubmit={onSubmit} className="space-y-4">
        <Label name="name" className="block">Name</Label>
        <TextField name="name" className="w-full border p-2 rounded" required />

        <Label name="password" className="block">Password</Label>
        <PasswordField name="password" className="w-full border p-2 rounded" required />

        <Submit className="bg-green-600 text-white px-4 py-2 rounded">Create Account</Submit>
      </Form>
    </div>
  )
}

export default AcceptInvitePage
