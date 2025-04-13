import type { Pizza } from '@prisma/client'

import { pizzas, pizza, createPizza, updatePizza, deletePizza } from './pizzas'
import type { StandardScenario } from './pizzas.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pizzas', () => {
  scenario('returns all pizzas', async (scenario: StandardScenario) => {
    const result = await pizzas()

    expect(result.length).toEqual(Object.keys(scenario.pizza).length)
  })

  scenario('returns a single pizza', async (scenario: StandardScenario) => {
    const result = await pizza({ id: scenario.pizza.one.id })

    expect(result).toEqual(scenario.pizza.one)
  })

  scenario('creates a pizza', async () => {
    const result = await createPizza({
      input: { name: 'String', price: 6633174.140146294 },
    })

    expect(result.name).toEqual('String')
    expect(result.price).toEqual(6633174.140146294)
  })

  scenario('updates a pizza', async (scenario: StandardScenario) => {
    const original = (await pizza({ id: scenario.pizza.one.id })) as Pizza
    const result = await updatePizza({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a pizza', async (scenario: StandardScenario) => {
    const original = (await deletePizza({ id: scenario.pizza.one.id })) as Pizza
    const result = await pizza({ id: original.id })

    expect(result).toEqual(null)
  })
})
