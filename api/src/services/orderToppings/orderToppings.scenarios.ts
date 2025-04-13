import type { Prisma, OrderTopping } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrderToppingCreateArgs>({
  orderTopping: {
    one: {
      data: {
        order: {
          create: {
            user: {
              create: {
                email: 'String8360384',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2025-04-13T18:04:08.728Z',
              },
            },
            pizza: { create: { name: 'String', price: 3724268.815486953 } },
          },
        },
        topping: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        order: {
          create: {
            user: {
              create: {
                email: 'String6339427',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2025-04-13T18:04:08.772Z',
              },
            },
            pizza: { create: { name: 'String', price: 4431539.4072949225 } },
          },
        },
        topping: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<OrderTopping, 'orderTopping'>
