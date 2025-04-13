import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from 'src/auth'
import { navigate, routes } from '@redwoodjs/router'

import LoginPage from '../../pages/LoginPage/LoginPage'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Menu', href: '#', current: false },
  { name: 'Orders', href: '#', current: false },
  { name: 'Locations', href: '#', current: false },
  { name: 'Login/Register', href: '/login', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

  const { isAuthenticated, logOut } = useAuth()

  return (
    <Disclosure as="nav" className="bg-red-900 rounded-t-xl shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <Bars3Icon className="block h-6 w-6 group-data-open:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6 group-data-open:block" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="images/piazza.jpg"
                alt="Your Company"
              />
            </div>

            {/* Nav Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - notification and profile */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Notification button */}
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/images/user.png"
                    alt=""
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        active ? 'bg-gray-100' : ''
                      }`}
                    >
                      Your Profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        active ? 'bg-gray-100' : ''
                      }`}
                    >
                      Settings
                    </a>
                  )}
                </MenuItem>
                {isAuthenticated && (
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={async () => {
                          await logOut()
                          navigate(routes.main())
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                )}

              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
