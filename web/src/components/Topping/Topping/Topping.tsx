import type {
  DeleteToppingMutation,
  DeleteToppingMutationVariables,
  FindToppingById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_TOPPING_MUTATION: TypedDocumentNode<
  DeleteToppingMutation,
  DeleteToppingMutationVariables
> = gql`
  mutation DeleteToppingMutation($id: Int!) {
    deleteTopping(id: $id) {
      id
    }
  }
`

interface Props {
  topping: NonNullable<FindToppingById['topping']>
}

const Topping = ({ topping }: Props) => {
  const [deleteTopping] = useMutation(DELETE_TOPPING_MUTATION, {
    onCompleted: () => {
      toast.success('Topping deleted')
      navigate(routes.toppings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteToppingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete topping ' + id + '?')) {
      deleteTopping({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Topping {topping.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{topping.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{topping.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTopping({ id: topping.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(topping.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Topping
