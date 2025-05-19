import React from 'react'
import { useState, useEffect } from 'react'

// Doesn't update
export function BadTodoApp1() {
	const [items, setItems] = useState([{ name: 'First item' }, { name: 'Second item' }, { name: 'Third item' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div>
		<TodoEditor1 item={items[activeItem]} />
		<button onClick={() => setActiveItem(n => (n + 1) % items.length)}>Next</button>
	</div>

}

function TodoEditor1({ item }) {
	const [name, setName] = useState(item.name, [item]);
	const [completed, setCompleted] = useState(item.completed, [item]);
	return <div><input value={name} onChange={(e) => setName(e.target.value)} /></div>

}


// Doesn't update
export function BadTodoApp2() {
	const [items, setItems] = useState([{ id: 'first-id', name: 'First item' }, { id: 'second-id', name: 'Second item' }, { id: 'third-id', name: 'Third item' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div>
		<TodoEditor2 item={items[activeItem]} />
		<button onClick={() => setActiveItem(n => (n + 1) % items.length)}>Next</button>
	</div>

}

// Updates, but causes an extra render and runs an effect with invalid state
function TodoEditor2({ item }) {
	const [name, setName] = useState(item.name, [item]);
	const [completed, setCompleted] = useState(item.completed, [item]);
	useEffect(() => {
		setName(item.name);
		setCompleted(item.completed);
	}, [item])
	useEffect(() => {
		console.log('Updating database:', item.id, name)
	})
	return <div><input value={name} onChange={(e) => setName(e.target.value)} /></div>

}
