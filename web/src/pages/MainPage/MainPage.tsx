// import { Link } from '@redwoodjs/router'
// import Navbar from 'src/components/NavBar/NavBar'
// import Footer from 'src/components/Footer/footer'


// const pizzaData = [
//     {
//       id: 1,
//       name: 'Veggie Delight',
//       price: '$9.99',
//       image: './images/veggie-delight.jpg',
//     },
//     {
//       id: 2,
//       name: 'Pepperoni Classic',
//       price: '$11.49',
//       image: './images/pepperoni.jpg',
//     },
//     {
//       id: 3,
//       name: 'Margherita Magic',
//       price: '$8.75',
//       image: './images/margherita.jpg',
//     },
//   ]

// const MainPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-white text-gray-800">
//       <Navbar />
//       <main className="flex-grow flex flex-col items-center text-center px-6 py-12 bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100">
//         <h2 className="text-4xl md:text-5xl font-bold mb-4">
//           Your Healthy Pizza Journey Starts Here 🍕
//         </h2>
//         <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl">
//           Delicious. Nutritious. Delivered to your doorstep with ease.
//         </p>
//         <Link
//           to="/login"
//           className="mb-10 px-8 py-3 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition duration-200"
//         >
//           Order Now
//         </Link>

//         {/* Pizza Listings */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
//           {pizzaData.map((pizza) => (
//             <div key={pizza.id} className="bg-white rounded-xl shadow-md p-4 text-left">
//               {/* <img src={pizza.image} alt={pizza.name} className="w-full rounded-md mb-4" /> */}
//               <img src={pizza.image} alt={pizza.name} className="w-full sm:w-64 h-auto" />
//               <h3 className="text-xl font-semibold mb-2">{pizza.name}</h3>
//               <p className="text-gray-700 mb-3">{pizza.price}</p>
//               <button className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
//                 Add to Order
//               </button>
//             </div>
//           ))}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }

// export default MainPage



import { useState } from 'react'
import { Link } from '@redwoodjs/router'
import { useAuth } from 'src/auth'
import Navbar from 'src/components/NavBar/NavBar'
import Footer from 'src/components/Footer/footer'
import ToppingSelector from 'src/components/ToppingSelector/ToppingSelector'

const pizzaData = [
  {
    id: 1,
    name: 'Veggie Delight',
    price: '$9.99',
    image: './images/veggie-delight.jpg',
  },
  {
    id: 2,
    name: 'Pepperoni Classic',
    price: '$11.49',
    image: './images/pepperoni.jpg',
  },
  {
    id: 3,
    name: 'Margherita Magic',
    price: '$8.75',
    image: './images/margherita.jpg',
  },
]

const MainPage = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const [selectedPizza, setSelectedPizza] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="flex-grow flex flex-col items-center text-center px-6 py-12 bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Your Healthy Pizza Journey Starts Here 🍕
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl">
          Delicious. Nutritious. Delivered to your doorstep with ease.
        </p>

        {!isAuthenticated ? (
          <Link
            to="/login"
            className="mb-10 px-8 py-3 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition duration-200"
          >
            Order Now
          </Link>
        ) : (
          <p className="text-green-700 mb-6 font-medium">Welcome back! Choose your pizza below.</p>
        )}

        {/* Debug user info (remove later)
        {isAuthenticated && (
          <pre className="text-xs text-left text-gray-600 bg-gray-100 p-2 rounded mt-2">
            {JSON.stringify(currentUser, null, 2)}
          </pre>
        )} */}
        {isAuthenticated && (
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>
        )}


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {pizzaData.map((pizza) => (
            <div key={pizza.id} className="bg-white rounded-xl shadow-md p-4 text-left">
              <img src={pizza.image} alt={pizza.name} className="w-full sm:w-64 h-auto" />
              <h3 className="text-xl font-semibold mb-2">{pizza.name}</h3>
              <p className="text-gray-700 mb-3">{pizza.price}</p>
              {isAuthenticated ? (
                <button
                  onClick={() => setSelectedPizza(pizza)}
                  className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Add to Order
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full block text-center py-2 bg-gray-300 text-gray-600 rounded"
                >
                  Login to Order
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedPizza && currentUser?.id && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold"
              onClick={() => setSelectedPizza(null)}
            >
              ×
            </button>
            <ToppingSelector
              pizzaId={selectedPizza.id}
              pizzaName={selectedPizza.name}
              userId={currentUser.id}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default MainPage

