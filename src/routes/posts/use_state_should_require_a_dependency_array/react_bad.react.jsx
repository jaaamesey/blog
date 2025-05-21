import React, { useMemo } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'

// Doesn't update
export function BadTodoApp1() {
	const [items, setItems] = useState([{ id: 'first-id', name: 'First item' }, { id: 'second-id', name: 'Second item' }, { id: 'third-id', name: 'Third item' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div>
		<div>Editing {items[activeItem].id}</div>
		<TodoEditor1 item={items[activeItem]} />
		<button onClick={() => setActiveItem(n => (n + 1) % items.length)}>Next</button>
	</div>

}

function TodoEditor1({ item }) {
	const [name, setName] = useState(item.name, [item]);
	const [completed, setCompleted] = useState(item.completed, [item]);
	return <div><input value={name} onChange={(e) => setName(e.target.value)} /></div>

}


export function BadTodoApp2() {
	const [items, setItems] = useState([{ id: 'first-id', name: 'First item' }, { id: 'second-id', name: 'Second item' }, { id: 'third-id', name: 'Third item' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div>
		<div>Editing {items[activeItem].id}</div>
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
export function BadTodoAppTwoPointFive() {
	const [items, setItems] = useState([{ id: 'first-id', name: 'First item' }, { id: 'second-id', name: 'Second item' }, { id: 'third-id', name: 'Third item' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div>
		TodoEditorTwoPointFive
		<div>Editing {items[activeItem].id}</div>
		<TodoEditorTwoPointFive item={items[activeItem]} />
		<button onClick={() => setActiveItem(n => (n + 1) % items.length)}>Next</button>
	</div>

}

// Updates, but causes an extra render
function TodoEditorTwoPointFive({ item: sourceItem }) {
	const [item, setInternalItem] = useState(sourceItem);
	const [name, setName] = useStateWithDeps(item.name, [item]);
	const [completed, setCompleted] = useStateWithDeps(item.completed, [item]);
	if (sourceItem !== item) {
		setInternalItem(sourceItem);
		setName(sourceItem.name);
		setCompleted(sourceItem.completed);
	}

	useEffect(() => {
		console.log('Updating database:', item.id, name)
	})
	return <div><input value={name} onChange={(e) => setName(e.target.value)} /></div>
}

// Perfect!
export function BadTodoApp3() {
	const [items, setItems] = useState([{ id: 'first-id', name: 'First item' }, { id: 'second-id', name: 'Second item' }, { id: 'third-id', name: 'Third item' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div>
		<div>Editing {items[activeItem].id}</div>
		<TodoEditor3 item={items[activeItem]} />
		<button onClick={() => setActiveItem(n => (n + 1) % items.length)}>Next</button>
	</div>

}

function TodoEditor3({ item }) {
	const [name, setName] = useStateWithDeps(item.name, [item]);
	const [completed, setCompleted] = useStateWithDeps(item.completed, [item]);
	useEffect(() => {
		setName(item.name);
		setCompleted(item.completed);
	}, [item])
	useEffect(() => {
		console.log('Updating database:', item.id, name)
	})
	return <div><input value={name} onChange={(e) => setName(e.target.value)} /></div>

}
function useMutableDerivation(source) {
	const prevSource = useRef(source);
	const overlay = useRef(source);
	if (source !== prevSource.current) {
		overlay.current = source;
	}
	prevSource.current = source;

	const forceRerender = useState()[1];

	const mutate = useCallback((newState) => {
		if (newState === overlay.current) {
			return;
		}
		overlay.current = newState;
		forceRerender(Symbol());
	}, []);

	return [overlay.current, mutate];
}

function useStateWithDeps(createNewState, deps) {
	const sourceState = useMemo(typeof createNewState === 'function' ? createNewState : () => createNewState, deps);
	return useMutableDerivation(sourceState);

}
