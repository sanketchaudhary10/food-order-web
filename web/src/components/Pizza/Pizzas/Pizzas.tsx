import type {
  DeletePizzaMutation,
  DeletePizzaMutationVariables,
  FindPizzas,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Pizza/PizzasCell'
import { truncate } from 'src/lib/formatters'

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

const PizzasList = ({ pizzas }: FindPizzas) => {
  const [deletePizza] = useMutation(DELETE_PIZZA_MUTATION, {
    onCompleted: () => {
      toast.success('Pizza deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePizzaMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pizza ' + id + '?')) {
      deletePizza({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza) => (
            <tr key={pizza.id}>
              <td>{truncate(pizza.id)}</td>
              <td>{truncate(pizza.name)}</td>
              <td>{truncate(pizza.price)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.pizza({ id: pizza.id })}
                    title={'Show pizza ' + pizza.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPizza({ id: pizza.id })}
                    title={'Edit pizza ' + pizza.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete pizza ' + pizza.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(pizza.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PizzasList
