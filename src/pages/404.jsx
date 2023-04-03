import routes from '../routes'
import { Link } from 'react-router-dom'

export default function NotFound () {
	return (
		<section className='NotFound'>
			<p>Page Not Found - 404</p>
			<Link to={routes.HOME}>Home page</Link>
			<Link to={routes.PRODUCTS}>Products</Link>
			<Link to={routes.CHECKOUT}>Checkout</Link>
		</section>
	)
}
