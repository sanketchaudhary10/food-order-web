import type {
  DeleteToppingMutation,
  DeleteToppingMutationVariables,
  FindToppings,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Topping/ToppingsCell'
import { truncate } from 'src/lib/formatters'

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

const ToppingsList = ({ toppings }: FindToppings) => {
  const [deleteTopping] = useMutation(DELETE_TOPPING_MUTATION, {
    onCompleted: () => {
      toast.success('Topping deleted')
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

  const onDeleteClick = (id: DeleteToppingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete topping ' + id + '?')) {
      deleteTopping({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {toppings.map((topping) => (
            <tr key={topping.id}>
              <td>{truncate(topping.id)}</td>
              <td>{truncate(topping.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.topping({ id: topping.id })}
                    title={'Show topping ' + topping.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTopping({ id: topping.id })}
                    title={'Edit topping ' + topping.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete topping ' + topping.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(topping.id)}
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

export default ToppingsList
