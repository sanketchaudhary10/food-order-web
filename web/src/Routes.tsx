// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import InviteUserPage from './pages/admin/InviteUserPage/InviteUserPage'
import AcceptInvitePage from './pages/AcceptInvitePage/AcceptInvitePage'
import MainPage from './pages/MainPage/MainPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="Toppings" titleTo="toppings" buttonLabel="New Topping" buttonTo="newTopping">
        <Route path="/toppings/new" page={ToppingNewToppingPage} name="newTopping" />
        <Route path="/toppings/{id:Int}/edit" page={ToppingEditToppingPage} name="editTopping" />
        <Route path="/toppings/{id:Int}" page={ToppingToppingPage} name="topping" />
        <Route path="/toppings" page={ToppingToppingsPage} name="toppings" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Pizzas" titleTo="pizzas" buttonLabel="New Pizza" buttonTo="newPizza">
        <Route path="/pizzas/new" page={PizzaNewPizzaPage} name="newPizza" />
        <Route path="/pizzas/{id:Int}/edit" page={PizzaEditPizzaPage} name="editPizza" />
        <Route path="/pizzas/{id:Int}" page={PizzaPizzaPage} name="pizza" />
        <Route path="/pizzas" page={PizzaPizzasPage} name="pizzas" />
      </Set>
      <Route path="/dashboard" page={DashboardPage} name="dashboard" />
      <Route path="/" page={MainPage} name="main" />
      <Route path="/accept-invite" page={AcceptInvitePage} name="acceptInvite" />
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
        <Route path="/admin/invite" page={InviteUserPage} name="inviteUser" />
        {/* <Route path="/accept-invite" page={AcceptInvitePage} name="acceptInvite" /> */}

      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
