import PizzaCell from 'src/components/Pizza/PizzaCell'

type PizzaPageProps = {
  id: number
}

const PizzaPage = ({ id }: PizzaPageProps) => {
  return <PizzaCell id={id} />
}

export default PizzaPage
