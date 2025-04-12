import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String6203687',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2025-04-12T21:15:14.816Z',
      },
    },
    two: {
      data: {
        email: 'String7227078',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2025-04-12T21:15:14.816Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
