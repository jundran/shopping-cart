import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export default function CartProvider ({ children }) {
	const [items, setItems] = useState([])

	useEffect(() => {
		console.log('Getting saved items from local storage')
		const savedItems = JSON.parse(localStorage.getItem('shopping-cart'))
		if (savedItems) setItems(savedItems)
	}, [])

	function updateLocalStorage (updatedItems = items) {
		console.log('Updating local storage')
		localStorage.setItem('shopping-cart', JSON.stringify(updatedItems))
	}

	function clearCart () {
		setItems([])
		updateLocalStorage([])
	}

	function findItem (id) {
		return items.find(item => item.id ===id)
	}

	function updateItem (id, quantity) {
		if (quantity === 0) return setItems(items.filter(item => item.id !== id))

		const updatedItem = {
			id,
			quantity
		}

		const newItems = items.filter(item => item.id !== id)
		newItems.push(updatedItem)
		setItems(newItems)
		updateLocalStorage(newItems)
	}

	return (
		<CartContext.Provider value={{
			items,
			updateItem,
			findItem,
			clearCart
		}}>
			{children}
		</CartContext.Provider>
	)
}

export function useCart () {
	return useContext(CartContext)
}
