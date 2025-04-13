import type { OrderTopping } from '@prisma/client'

import {
  orderToppings,
  orderTopping,
  createOrderTopping,
  updateOrderTopping,
  deleteOrderTopping,
} from './orderToppings'
import type { StandardScenario } from './orderToppings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('orderToppings', () => {
  scenario('returns all orderToppings', async (scenario: StandardScenario) => {
    const result = await orderToppings()

    expect(result.length).toEqual(Object.keys(scenario.orderTopping).length)
  })

  scenario(
    'returns a single orderTopping',
    async (scenario: StandardScenario) => {
      const result = await orderTopping({ id: scenario.orderTopping.one.id })

      expect(result).toEqual(scenario.orderTopping.one)
    }
  )

  scenario('creates a orderTopping', async (scenario: StandardScenario) => {
    const result = await createOrderTopping({
      input: {
        orderId: scenario.orderTopping.two.orderId,
        toppingId: scenario.orderTopping.two.toppingId,
      },
    })

    expect(result.orderId).toEqual(scenario.orderTopping.two.orderId)
    expect(result.toppingId).toEqual(scenario.orderTopping.two.toppingId)
  })

  scenario('updates a orderTopping', async (scenario: StandardScenario) => {
    const original = (await orderTopping({
      id: scenario.orderTopping.one.id,
    })) as OrderTopping
    const result = await updateOrderTopping({
      id: original.id,
      input: { orderId: scenario.orderTopping.two.orderId },
    })

    expect(result.orderId).toEqual(scenario.orderTopping.two.orderId)
  })

  scenario('deletes a orderTopping', async (scenario: StandardScenario) => {
    const original = (await deleteOrderTopping({
      id: scenario.orderTopping.one.id,
    })) as OrderTopping
    const result = await orderTopping({ id: original.id })

    expect(result).toEqual(null)
  })
})
