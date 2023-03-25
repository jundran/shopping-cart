import { useCart } from './Context'
import { Link } from 'react-router-dom'
import routes from '../routes'

export default function Header () {
	const cart = useCart()

	return (
		<header className="Header">
			<Link to={routes.HOME} >
				<span>Home</span>
				<img src="/shopping-cart/home.png" alt="home page" />
			</Link>
			<Link to={routes.PRODUCTS} >
				<span>Products</span>
				<img src="/shopping-cart/products.png" alt="products page" />
			</Link>
			<Link to={routes.CHECKOUT} >
				<img src="/shopping-cart/shopping-cart.png" alt="checkout" />
				<span className='cart-total'>{cart.items.length}</span>
			</Link>
		</header>
	)
}
