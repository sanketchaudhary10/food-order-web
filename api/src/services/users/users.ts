import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { createTransport } from 'nodemailer'
import { randomBytes } from 'crypto'


export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

// export const inviteUser = async ({ input }) => {
//   const { email, invitedBy } = input

//   // Checking if the user already exists or not
//   const existing = await db.user.findUnique({ where: { email } })
//   if (existing) {
//     throw new Error('User already invited or registered')
//   }

//   return db.user.create({
//     data: {
//       email,
//       invitedBy,
//       isInvited: true,
//       hashedPassword: '', // placeholder
//       salt: '',
//       roles: 'user',
//     },
//   })
// }


const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
})

const generateToken = () => randomBytes(32).toString('hex')

export const inviteUser = async ({ input }) => {
  const { email, invitedBy } = input

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error('User already invited or registered')
  }

  const token = generateToken()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hrs

  const newUser = await db.user.create({
    data: {
      email,
      invitedBy,
      isInvited: true,
      hashedPassword: '',
      salt: '',
      roles: 'user',
      inviteToken: token,
      inviteTokenExpiresAt: expiresAt,
    },
  })

  const inviteLink = `http://localhost:8910/signup?token=${token}`

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'You’ve been invited!',
    html: `<p>Hello,</p>
           <p>You’ve been invited to join our app. Click the link below to sign up:</p>
           <a href="${inviteLink}">${inviteLink}</a>
           <p>This link will expire in 24 hours.</p>`,
  })

  return newUser
}


