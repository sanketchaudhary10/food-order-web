import type { FindPizzaById, FindPizzaByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Pizza from 'src/components/Pizza/Pizza'

export const QUERY: TypedDocumentNode<FindPizzaById, FindPizzaByIdVariables> =
  gql`
    query FindPizzaById($id: Int!) {
      pizza: pizza(id: $id) {
        id
        name
        price
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Pizza not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPizzaByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pizza,
}: CellSuccessProps<FindPizzaById, FindPizzaByIdVariables>) => {
  return <Pizza pizza={pizza} />
}
