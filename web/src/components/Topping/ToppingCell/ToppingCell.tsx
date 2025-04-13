import type { FindToppingById, FindToppingByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Topping from 'src/components/Topping/Topping'

export const QUERY: TypedDocumentNode<
  FindToppingById,
  FindToppingByIdVariables
> = gql`
  query FindToppingById($id: Int!) {
    topping: topping(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Topping not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindToppingByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  topping,
}: CellSuccessProps<FindToppingById, FindToppingByIdVariables>) => {
  return <Topping topping={topping} />
}
