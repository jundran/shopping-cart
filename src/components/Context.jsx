import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export default function CartProvider ({ children }) {
	const [items, setItems] = useState([])
	const [localStorageEnabled, setLocalStorageEnabled] = useState(true)

	useEffect(() => {
		console.log('Getting saved items from local storage')
		try {
			const savedItems = JSON.parse(localStorage.getItem('shopping-cart'))
			if (savedItems) setItems(savedItems)
		} catch (error) {
			setLocalStorageEnabled(false)
			console.warn('Unable to access local storage - ' + error)
		}
	}, [])

	function updateLocalStorage (updatedItems) {
		if (!localStorageEnabled) return
		console.log('Updating local storage')
		try {
			localStorage.setItem('shopping-cart', JSON.stringify(updatedItems))
		} catch (error) {
			setLocalStorageEnabled(false)
			console.warn('Unable to access local storage - ' + error)
		}
	}

	function clearCart () {
		setItems([])
		updateLocalStorage([])
	}

	function findItem (id) {
		return items.find(item => item.id ===id)
	}

	function updateItem (id, quantity) {
		if (quantity === 0) {
			const newItems = items.filter(item => item.id !== id)
			updateLocalStorage(newItems)
			return setItems(newItems)
		}

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
