import type {
  DeletePizzaMutation,
  DeletePizzaMutationVariables,
  FindPizzaById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_PIZZA_MUTATION: TypedDocumentNode<
  DeletePizzaMutation,
  DeletePizzaMutationVariables
> = gql`
  mutation DeletePizzaMutation($id: Int!) {
    deletePizza(id: $id) {
      id
    }
  }
`

interface Props {
  pizza: NonNullable<FindPizzaById['pizza']>
}

const Pizza = ({ pizza }: Props) => {
  const [deletePizza] = useMutation(DELETE_PIZZA_MUTATION, {
    onCompleted: () => {
      toast.success('Pizza deleted')
      navigate(routes.pizzas())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePizzaMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pizza ' + id + '?')) {
      deletePizza({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Pizza {pizza.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{pizza.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{pizza.name}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{pizza.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPizza({ id: pizza.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(pizza.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Pizza
