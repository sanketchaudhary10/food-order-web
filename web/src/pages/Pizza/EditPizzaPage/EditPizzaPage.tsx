import EditPizzaCell from 'src/components/Pizza/EditPizzaCell'

type PizzaPageProps = {
  id: number
}

const EditPizzaPage = ({ id }: PizzaPageProps) => {
  return <EditPizzaCell id={id} />
}

export default EditPizzaPage
