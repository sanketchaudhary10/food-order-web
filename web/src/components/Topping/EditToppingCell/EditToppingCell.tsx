import type {
  EditToppingById,
  UpdateToppingInput,
  UpdateToppingMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ToppingForm from 'src/components/Topping/ToppingForm'

export const QUERY: TypedDocumentNode<EditToppingById> = gql`
  query EditToppingById($id: Int!) {
    topping: topping(id: $id) {
      id
      name
    }
  }
`

const UPDATE_TOPPING_MUTATION: TypedDocumentNode<
  EditToppingById,
  UpdateToppingMutationVariables
> = gql`
  mutation UpdateToppingMutation($id: Int!, $input: UpdateToppingInput!) {
    updateTopping(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ topping }: CellSuccessProps<EditToppingById>) => {
  const [updateTopping, { loading, error }] = useMutation(
    UPDATE_TOPPING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Topping updated')
        navigate(routes.toppings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateToppingInput,
    id: EditToppingById['topping']['id']
  ) => {
    updateTopping({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Topping {topping?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ToppingForm
          topping={topping}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
