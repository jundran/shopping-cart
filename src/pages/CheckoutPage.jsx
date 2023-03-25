import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../components/Context'
import Header from '../components/Header'
import Orders from '../components/Orders'
import OrderSummary from '../components/OrderSummary'
import routes from '../routes'

export default function CheckoutPage () {
	const [orderComplete, setOrderComplete] = useState(false)
	const cart = useCart()
	const items = cart.items
	document.title='Shopping Cart | Checkout'

	if (orderComplete) return <OrderConfirmation />

	if (!items.length) return (
		<>
			<Header />
			<section className='full-screen-info'>
				<p>Your cart is empty</p>
				<p><Link to={routes.PRODUCTS}>View products</Link></p>
			</section>
		</>
	)

	return (
		<>
			<Header />
			<section className='Checkout'>
				<Orders />
				<OrderSummary onOrderComplete={() => setOrderComplete(true)} />
			</section>
		</>
	)
}

function OrderConfirmation () {
	return (
		<>
			<Header />
			<section className='full-screen-info'>
				<p>Thank you for your order</p>
				<p><Link to={routes.HOME}>Home page</Link></p>
			</section>
		</>
	)
}
