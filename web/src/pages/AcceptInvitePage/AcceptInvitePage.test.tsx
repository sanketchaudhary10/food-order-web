import { render } from '@redwoodjs/testing/web'

import AcceptInvitePage from './AcceptInvitePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AcceptInvitePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AcceptInvitePage />)
    }).not.toThrow()
  })
})
