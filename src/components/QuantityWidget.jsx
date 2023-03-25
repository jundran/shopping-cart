import { useState } from 'react'
import { useCart } from './Context'

export default function QuantityWidget ({ item }) {
	const cart = useCart()
	const itemInCart = cart.findItem(item.id)
	const [quantityInput, setQuantityInput] = useState(itemInCart ? itemInCart.quantity : 1)

	function handleUpdateItem () {
		if (!quantityInput) setQuantityInput(1)
		cart.updateItem(item.id, quantityInput || 1)
	}

	function handleQuantityInput (e) {
		const value = e.target.value
		if (!value) return setQuantityInput('')
		let number = Number(value)
		if (isNaN(number)) return
		if (number > 999) number = 999
		if (number < 1) number = 1
		setQuantityInput(number)
	}

	function handleQuantityButtons (increment) {
		// quantityInput may be empty string
		let actual = quantityInput ? quantityInput : 0
		if (increment) actual = actual + 1
		else actual = actual - 1

		if (actual > 999) actual = 999
		if (actual < 1) actual = 1
		setQuantityInput(actual)
	}

	function renderButton () {
		if (!itemInCart) return (
			<button data-testid='add' className='cart-button' onClick={handleUpdateItem}>
				<span>Add to Cart</span>
				<img src="/shopping-cart/add-to-cart.png" alt={`Add ${item.name} to cart`} />
			</button>
		)
		if (itemInCart.quantity !== quantityInput) return (
			<button data-testid='update' className='cart-button' onClick={handleUpdateItem}>
				<span>Update Quantity</span>
				<img src="/shopping-cart/update-cart.png" alt={`Update ${item.name} in cart`} />
			</button>
		)
		return null
	}

	return (
		<div className='QuantityWidget'>
			<img
				src="/shopping-cart/minus.svg"
				alt={'Decrease quantity'}
				onClick={() => handleQuantityButtons(false)}
			/>
			<input
				value={quantityInput}
				onChange={handleQuantityInput}
			/>
			<img
				src="/shopping-cart/plus.svg"
				alt={'Increase quantity'}
				onClick={() => handleQuantityButtons(true)}
			/>
			{renderButton()}
		</div>
	)
}
