import type { Topping } from '@prisma/client'

import {
  toppings,
  topping,
  createTopping,
  updateTopping,
  deleteTopping,
} from './toppings'
import type { StandardScenario } from './toppings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('toppings', () => {
  scenario('returns all toppings', async (scenario: StandardScenario) => {
    const result = await toppings()

    expect(result.length).toEqual(Object.keys(scenario.topping).length)
  })

  scenario('returns a single topping', async (scenario: StandardScenario) => {
    const result = await topping({ id: scenario.topping.one.id })

    expect(result).toEqual(scenario.topping.one)
  })

  scenario('creates a topping', async () => {
    const result = await createTopping({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a topping', async (scenario: StandardScenario) => {
    const original = (await topping({ id: scenario.topping.one.id })) as Topping
    const result = await updateTopping({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a topping', async (scenario: StandardScenario) => {
    const original = (await deleteTopping({
      id: scenario.topping.one.id,
    })) as Topping
    const result = await topping({ id: original.id })

    expect(result).toEqual(null)
  })
})
