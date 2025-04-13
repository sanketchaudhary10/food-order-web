import ToppingCell from 'src/components/Topping/ToppingCell'

type ToppingPageProps = {
  id: number
}

const ToppingPage = ({ id }: ToppingPageProps) => {
  return <ToppingCell id={id} />
}

export default ToppingPage
