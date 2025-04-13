import { createDbAuthClient, createAuth } from '@redwoodjs/auth-dbauth-web'

const dbAuthClient = createDbAuthClient()

export const { AuthProvider, useAuth } = createAuth(dbAuth, {
    onLogin: () => {
      window.location.href = '/dashboard' 
    },
    onLogout: () => {
      window.location.href = '/login'
    },
  })
  
