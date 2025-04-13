import type { FindPizzas, FindPizzasVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Pizzas from 'src/components/Pizza/Pizzas'

export const QUERY: TypedDocumentNode<FindPizzas, FindPizzasVariables> = gql`
  query FindPizzas {
    pizzas {
      id
      name
      price
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No pizzas yet.{' '}
      <Link to={routes.newPizza()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindPizzas>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pizzas,
}: CellSuccessProps<FindPizzas, FindPizzasVariables>) => {
  return <Pizzas pizzas={pizzas} />
}
