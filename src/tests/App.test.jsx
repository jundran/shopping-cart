import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuantityWidget from '../components/QuantityWidget'
import * as Context from '../components/Context'

async function asyncRepeat (times, fn) {
	for (let i = 0; i < times; i++) await fn()
}

describe('Quantity Widget', () => {
	beforeEach(() => {
		const items= [{
			id: '1',
			quantity: 100
		}]
		vi.spyOn(Context, 'useCart').mockImplementation(() => ({
			items,
			findItem: id => items.find(item => item.id === id)
		}))
	})

	test('Input is 1 when item is not in the cart', async () => {
		render(<QuantityWidget item={{ id: '2' }} />)
		const input = screen.getByRole('textbox')
		expect(input.value).toBe('1')
	})

	test('Increment and decrement buttons render correct value in input box', async () => {
		render(<QuantityWidget item={{ id: '1', quantity: 100 }} />)
		const minus = screen.getByAltText('Decrease quantity')
		const plus = screen.getByAltText('Increase quantity')
		const input = screen.getByRole('textbox')
		const user = userEvent.setup()
		expect(input.value).toBe('100')
		await asyncRepeat(5, () => user.click(plus))
		expect(input.value).toBe('105')
		await asyncRepeat(2, () => user.click(minus))
		expect(input.value).toBe('103')
	})

	test('Input can only be a number or empty string', async () => {
		render(<QuantityWidget item={{ id: '2' }} />)
		const input = screen.getByRole('textbox')
		const user = userEvent.setup()
		expect(input.value).toBe('1')
		await user.type(input, '0')
		expect(input.value).toBe('10')
		await user.type(input, 'x')
		expect(input.value).toBe('10')
		await user.type(input, ' ')
		expect(input.value).toBe('10')
		await asyncRepeat(3, () => user.type(input, '{backspace}'))
		expect(input.value).toBe('')
	})

	test('Buttons correctly update input when it is empty string', async () => {
		render(<QuantityWidget item={{ id: '2' }} />)
		const input = screen.getByRole('textbox')
		const user = userEvent.setup()
		await user.type(input, '{backspace}')
		expect(input.value).toBe('')
		await user.click(screen.getByAltText('Increase quantity'))
		expect(input.value).toBe('1')
	})
})
