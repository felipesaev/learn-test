import CartItem from './cart-item';

const product = {
  title: "Relogio",
  price: "22.00",
  image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
}

export default function Cart() {
  return (
    <div className="fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        <button className="text-gray-600 focus:outline-none">
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <hr className="my-3" />
      <CartItem product={product}/>
      <div className="mt-8">
        <form className="flex items-center justify-center">
          <input className="form-input w-48" type="text" placeholder="Add promocode" />
          <button className="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
            <span>Apply</span>
          </button>
        </form>
      </div>
      <a className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
        <span>Chechout</span>
        <svg
          className="h-5 w-5 mx-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </a>
    </div>
  );
}
