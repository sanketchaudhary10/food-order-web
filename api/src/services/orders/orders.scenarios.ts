import type { Prisma, Order } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrderCreateArgs>({
  order: {
    one: {
      data: {
        user: {
          create: {
            email: 'String6631996',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2025-04-13T18:03:49.251Z',
          },
        },
        pizza: { create: { name: 'String', price: 8783833.107982742 } },
      },
    },
    two: {
      data: {
        user: {
          create: {
            email: 'String6169099',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2025-04-13T18:03:49.295Z',
          },
        },
        pizza: { create: { name: 'String', price: 5967400.281894753 } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Order, 'order'>
