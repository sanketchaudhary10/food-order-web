import type {
  EditPizzaById,
  UpdatePizzaInput,
  UpdatePizzaMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PizzaForm from 'src/components/Pizza/PizzaForm'

export const QUERY: TypedDocumentNode<EditPizzaById> = gql`
  query EditPizzaById($id: Int!) {
    pizza: pizza(id: $id) {
      id
      name
      price
    }
  }
`

const UPDATE_PIZZA_MUTATION: TypedDocumentNode<
  EditPizzaById,
  UpdatePizzaMutationVariables
> = gql`
  mutation UpdatePizzaMutation($id: Int!, $input: UpdatePizzaInput!) {
    updatePizza(id: $id, input: $input) {
      id
      name
      price
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pizza }: CellSuccessProps<EditPizzaById>) => {
  const [updatePizza, { loading, error }] = useMutation(UPDATE_PIZZA_MUTATION, {
    onCompleted: () => {
      toast.success('Pizza updated')
      navigate(routes.pizzas())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdatePizzaInput,
    id: EditPizzaById['pizza']['id']
  ) => {
    updatePizza({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Pizza {pizza?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PizzaForm
          pizza={pizza}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
