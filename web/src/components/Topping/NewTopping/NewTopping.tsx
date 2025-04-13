import type {
  CreateToppingMutation,
  CreateToppingInput,
  CreateToppingMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ToppingForm from 'src/components/Topping/ToppingForm'

const CREATE_TOPPING_MUTATION: TypedDocumentNode<
  CreateToppingMutation,
  CreateToppingMutationVariables
> = gql`
  mutation CreateToppingMutation($input: CreateToppingInput!) {
    createTopping(input: $input) {
      id
    }
  }
`

const NewTopping = () => {
  const [createTopping, { loading, error }] = useMutation(
    CREATE_TOPPING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Topping created')
        navigate(routes.toppings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateToppingInput) => {
    createTopping({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Topping</h2>
      </header>
      <div className="rw-segment-main">
        <ToppingForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTopping
