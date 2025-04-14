import { useQuery, useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { toast } from '@redwoodjs/web/toast'
import { navigate } from '@redwoodjs/router'

export const QUERY = gql`
  query GetToppings {
    toppings {
      id
      name
    }
  }
`

const CREATE_ORDER_WITH_TOPPINGS = gql`
  mutation CreateOrderWithToppings($pizzaId: Int!, $userId: Int!, $toppingIds: [Int!]!) {
    createOrderWithToppings(pizzaId: $pizzaId, userId: $userId, toppingIds: $toppingIds) {
      id
      pdfBase64
    }
  }
`

const ToppingSelector = ({ pizzaId, pizzaName, userId }) => {
  const { data, loading, error } = useQuery(QUERY)
  console.log('Topping Query State:', { data, loading, error })
  const [selectedToppings, setSelectedToppings] = useState<number[]>([])
  const [createOrder] = useMutation(CREATE_ORDER_WITH_TOPPINGS)

  const handleToggle = (id: number) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    )
  }

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        variables: {
          pizzaId,
          userId,
          toppingIds: selectedToppings,
        },
      })
  
      const { id, pdfBase64 } = res.data.createOrderWithToppings
  
      const byteCharacters = atob(pdfBase64)
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) =>
        byteCharacters.charCodeAt(i)
      )
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'application/pdf' })
  
      const url = URL.createObjectURL(blob)
      window.open(url)
  
      toast.success('Order placed! Receipt generated.')
      navigate('/')
    } catch (e) {
      console.error(e)
      toast.error('Failed to place order')
    }
  }
  

  if (loading) return <div>Loading toppings...</div>
  if (error) return <div>Error loading toppings.</div>

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Customize Your {pizzaName}</h2>
      <ul className="mb-6">
        {data.toppings.map((topping) => (
          <li key={topping.id}>
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedToppings.includes(topping.id)}
                onChange={() => handleToggle(topping.id)}
              />
              <span>{topping.name}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  )
}

export default ToppingSelector