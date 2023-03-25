import { useCart } from './Context'
import products from '../product-data'

export default function OrderSummary ({ onOrderComplete }) {
	const cart = useCart()

	function handleOrderSubmit (e) {
		e.preventDefault()
		cart.clearCart()
		onOrderComplete()
	}

	function getItemsTotal () {
		let total = 0
		for (const item of cart.items) {
			const product = products.find(p => p.id === item.id)
			total += product.price * item.quantity
		}
		return total
	}

	const itemsTotal = getItemsTotal()
	const tax = itemsTotal * .05
	const shipping = 5.95
	const grandTotal = itemsTotal + tax + shipping


	return (
		<section className="OrderSummary">
			<h2>Order Summary</h2>
			<ul>
				<li>
					<span>Total before tax: </span>
					<span>${itemsTotal.toFixed(2)}</span>
				</li>
				<li>
					<span>Tax: </span>
					<span>${tax.toFixed(2)}</span>
				</li>
				<li>
					<span>Shipping: </span>
					<span>${shipping}</span>
				</li>
				<li>
					<span>Grand Total: </span>
					<span><b>${grandTotal.toFixed(2)}</b></span>
				</li>
			</ul>
			<form onSubmit={(handleOrderSubmit)}>
				<button>Complete Order</button>
			</form>
		</section>
	)
}
