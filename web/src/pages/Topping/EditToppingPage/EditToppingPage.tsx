import EditToppingCell from 'src/components/Topping/EditToppingCell'

type ToppingPageProps = {
  id: number
}

const EditToppingPage = ({ id }: ToppingPageProps) => {
  return <EditToppingCell id={id} />
}

export default EditToppingPage
