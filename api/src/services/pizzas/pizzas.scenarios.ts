import type { Prisma, Pizza } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PizzaCreateArgs>({
  pizza: {
    one: { data: { name: 'String', price: 9121920.863508005 } },
    two: { data: { name: 'String', price: 8447052.936632711 } },
  },
})

export type StandardScenario = ScenarioData<Pizza, 'pizza'>
