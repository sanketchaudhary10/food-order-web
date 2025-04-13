import type { FindToppings, FindToppingsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Toppings from 'src/components/Topping/Toppings'

export const QUERY: TypedDocumentNode<FindToppings, FindToppingsVariables> =
  gql`
    query FindToppings {
      toppings {
        id
        name
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No toppings yet.{' '}
      <Link to={routes.newTopping()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindToppings>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  toppings,
}: CellSuccessProps<FindToppings, FindToppingsVariables>) => {
  return <Toppings toppings={toppings} />
}
