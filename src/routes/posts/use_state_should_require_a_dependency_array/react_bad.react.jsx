import React, { useLayoutEffect, useMemo } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useStateWithDeps } from 'use-state-with-deps'

// Doesn't update
export function BadTodoApp1() {
	const [items, setItems] = useState([{ name: 'First task' }, { name: 'Second task' }, { name: 'Third task' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div class="flex flex-col gap-2">
		<h2 class="text-xl font-bold">Todo list</h2>
		<div class="flex w-full justify-between flex-wrap gap-4">
			<div class="flex flex-col gap-2 grow">
				<strong>Tasks:</strong>
				{items.map((item, i) => <button class="text-start" style={{ fontWeight: activeItem === i ? 'bold' : undefined }} onClick={() => setActiveItem(i)}>Edit "{item.name}"</button>)}
			</div>
			<div class="flex flex-col gap-2 basis-40">
				<strong>Editing "{items[activeItem].name}"</strong>
				Title: <TodoEditor1 item={items[activeItem]} saveName={(name) => setItems(p => p.map((item, i) => i === activeItem ? { ...item, name } : item))} saveDrawing={(drawing) => setItems(p => p.map((item, i) => i === activeItem ? { ...item, drawing } : item))} />
			</div>
		</div>
	</div>

}

const colors = ['black', 'white', 'red', 'blue', 'yellow'];

function TodoEditor1({ item, saveName, saveDrawing, enableDrawing }) {
	const [name, setName] = useState(item.name, [item]);
	const [brushColor, setBrushColor] = useState('black');
	const canvasSize = { width: 200, height: 200 };
	const canvasRef = useRef();
	useLayoutEffect(() => {
		if (!canvasRef.current) { return; }
		const ctx = canvasRef.current.getContext('2d');
		if (!item.drawing) {
			ctx.reset();
			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
			return
		}
		const img = new Image(canvasSize.width, canvasSize.height);
		img.onload = () => {
			ctx.reset();
			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
			ctx.drawImage(img, 0, 0);
		}
		img.src = item.drawing;
	}, [item])
	return <div class="flex flex-col gap-2"><form class="flex"><input value={name} onChange={(e) => setName(e.target.value)} /><button type="submit" style={{ display: enableDrawing ? 'none' : undefined }} onClick={(e) => { e.preventDefault(); saveName(name) }}>Save</button></form>{enableDrawing ? <div class="flex flex-col gap-2"><strong>Notes</strong>
		<div class="flex gap-2">{colors.map(color => <span style={{ display: 'inline-block', width: '28px', height: '28px', "background-color": color, "border-radius": '100%', outline: '#aaa solid 1px', transform: brushColor === color ? 'scale(1.3)' : undefined }} onClick={() => setBrushColor(color)} />)}</div>
		<canvas ref={canvasRef} class="border-black border" width={canvasSize.width} height={canvasSize.height} style={{ ...canvasSize, "image-rendering": 'pixelated' }} onMouseMove={e => {
			const canvas = e.currentTarget;
			const ctx = canvas.getContext('2d');
			if (!e.buttons) { ctx.beginPath(); return; }
			const x = e.pageX - e.currentTarget.offsetLeft;
			const y = e.pageY - e.currentTarget.offsetTop;
			ctx.strokeStyle = brushColor;
			ctx.lineWidth = 2;
			ctx.lineCap = 'round';
			ctx.lineTo(x, y);
			ctx.stroke();
		}} /><button onClick={() => {
			saveName(name)
			saveDrawing(canvasRef.current.toDataURL('image/png'))
		}}>Save</button>
	</div> : undefined}</div>
}


function TodoEditorWithDeps({ item, saveName, saveDrawing, enableDrawing }) {
	const [name, setName] = useStateWithDeps(item.name, [item]);
	const [brushColor, setBrushColor] = useState('black');
	const canvasSize = { width: 200, height: 200 };
	const canvasRef = useRef();
	useLayoutEffect(() => {
		if (!canvasRef.current) { return; }
		const ctx = canvasRef.current.getContext('2d');
		if (!item.drawing) {
			ctx.reset();
			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
			return
		}
		const img = new Image(canvasSize.width, canvasSize.height);
		img.onload = () => {
			ctx.reset();
			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
			ctx.drawImage(img, 0, 0);
		}
		img.src = item.drawing;
	}, [item])
	return <div class="flex flex-col gap-2"><form class="flex"><input value={name} onChange={(e) => setName(e.target.value)} /><button type="submit" style={{ display: enableDrawing ? 'none' : undefined }} onClick={(e) => { e.preventDefault(); saveName(name) }}>Save</button></form>{enableDrawing ? <div class="flex flex-col gap-2"><strong>Notes</strong>
		<div class="flex gap-2">{colors.map(color => <span style={{ display: 'inline-block', width: '28px', height: '28px', "background-color": color, "border-radius": '100%', outline: '#aaa solid 1px', transform: brushColor === color ? 'scale(1.3)' : undefined }} onClick={() => setBrushColor(color)} />)}</div>
		<canvas ref={canvasRef} class="border-black border" width={canvasSize.width} height={canvasSize.height} style={{ ...canvasSize, "image-rendering": 'pixelated' }} onMouseMove={e => {
			const canvas = e.currentTarget;
			const ctx = canvas.getContext('2d');
			if (!e.buttons) { ctx.beginPath(); return; }
			const x = e.pageX - e.currentTarget.offsetLeft;
			const y = e.pageY - e.currentTarget.offsetTop;
			ctx.strokeStyle = brushColor;
			ctx.lineWidth = 2;
			ctx.lineCap = 'round';
			ctx.lineTo(x, y);
			ctx.stroke();
		}} /><button onClick={() => {
			saveName(name)
			saveDrawing(canvasRef.current.toDataURL('image/png'))
		}}>Save</button>
	</div> : undefined}</div>
}


function TodoEditorWithUseEffect({ item, saveName, saveDrawing, enableDrawing }) {
	const [brushColor, setBrushColor] = useState('black');
	const canvasSize = { width: 200, height: 200 };
	const canvasRef = useRef();

	const [name, setName] = useState(item.name, [item]);
	useEffect(() => {
		setName(item.name)
	}, [item.name])

	useLayoutEffect(() => {
		if (!canvasRef.current) { return; }
		const ctx = canvasRef.current.getContext('2d');
		if (!item.drawing) {
			ctx.reset();
			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
			return
		}
		const img = new Image(canvasSize.width, canvasSize.height);
		img.onload = () => {
			ctx.reset();
			ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
			ctx.drawImage(img, 0, 0);
		}
		img.src = item.drawing;
	}, [item])
	return <div class="flex flex-col gap-2"><form class="flex"><input value={name} onChange={(e) => setName(e.target.value)} /><button type="submit" style={{ display: enableDrawing ? 'none' : undefined }} onClick={(e) => { e.preventDefault(); saveName(name) }}>Save</button></form>{enableDrawing ? <div class="flex flex-col gap-2"><strong>Notes</strong>
		<div class="flex gap-2">{colors.map(color => <span style={{ display: 'inline-block', width: '28px', height: '28px', "background-color": color, "border-radius": '100%', outline: '#aaa solid 1px', transform: brushColor === color ? 'scale(1.3)' : undefined }} onClick={() => setBrushColor(color)} />)}</div>
		<canvas ref={canvasRef} class="border-black border" width={canvasSize.width} height={canvasSize.height} style={{ ...canvasSize, "image-rendering": 'pixelated' }} onMouseMove={e => {
			const canvas = e.currentTarget;
			const ctx = canvas.getContext('2d');
			if (!e.buttons) { ctx.beginPath(); return; }
			const x = e.pageX - e.currentTarget.offsetLeft;
			const y = e.pageY - e.currentTarget.offsetTop;
			ctx.strokeStyle = brushColor;
			ctx.lineWidth = 2;
			ctx.lineCap = 'round';
			ctx.lineTo(x, y);
			ctx.stroke();
		}} /><button onClick={() => {
			saveName(name)
			saveDrawing(canvasRef.current.toDataURL('image/png'))
		}}>Save</button>
	</div> : undefined}</div>
}

export function BadTodoAppWithKey(props) {
	const [items, setItems] = useState([{ name: 'First task' }, { name: 'Second task' }, { name: 'Third task' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div class="flex flex-col gap-2">
		<h2 class="text-xl font-bold">Todo list</h2>
		<div class="flex w-full justify-between flex-wrap gap-4">
			<div class="flex flex-col gap-2 grow">
				<strong>Tasks:</strong>
				{items.map((item, i) => <button class="text-start" style={{ fontWeight: activeItem === i ? 'bold' : undefined }} onClick={() => setActiveItem(i)}>Edit "{item.name}"</button>)}
			</div>
			<div class="flex flex-col gap-2 basis-40">
				<strong>Editing "{items[activeItem].name}"</strong>
				Title: <TodoEditor1 key={activeItem} item={items[activeItem]} saveName={(name) => setItems(p => p.map((item, i) => i === activeItem ? { ...item, name } : item))} saveDrawing={(drawing) => setItems(p => p.map((item, i) => i === activeItem ? { ...item, drawing } : item))} enableDrawing={props.enableDrawing} />
			</div>
		</div>
	</div>

}

export function BadTodoAppWithDeps(props) {
	const [items, setItems] = useState([{ name: 'First task' }, { name: 'Second task' }, { name: 'Third task' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div class="flex flex-col gap-2">
		<h2 class="text-xl font-bold">Todo list</h2>
		<div class="flex w-full justify-between flex-wrap gap-4">
			<div class="flex flex-col gap-2 grow">
				<strong>Tasks:</strong>
				{items.map((item, i) => <button class="text-start" style={{ fontWeight: activeItem === i ? 'bold' : undefined }} onClick={() => setActiveItem(i)}>Edit "{item.name}"</button>)}
			</div>
			<div class="flex flex-col gap-2 basis-40">
				<strong>Editing "{items[activeItem].name}"</strong>
				Title: <TodoEditorWithDeps item={items[activeItem]} saveName={(name) => setItems(p => p.map((item, i) => i === activeItem ? { ...item, name } : item))} saveDrawing={(drawing) => setItems(p => p.map((item, i) => i === activeItem ? { ...item, drawing } : item))} enableDrawing={props.enableDrawing} />
			</div>
		</div>
	</div>
}

export function BadTodoAppWithUseEffect(props) {
	const [items, setItems] = useState([{ name: 'First task' }, { name: 'Second task' }, { name: 'Third task' }]);
	const [activeItem, setActiveItem] = useState(0);

	return <div class="flex flex-col gap-2">
		<h2 class="text-xl font-bold">Todo list</h2>
		<div class="flex w-full justify-between flex-wrap gap-4">
			<div class="flex flex-col gap-2 grow">
				<strong>Tasks:</strong>
				{items.map((item, i) => <button class="text-start" style={{ fontWeight: activeItem === i ? 'bold' : undefined }} onClick={() => setActiveItem(i)}>Edit "{item.name}"</button>)}
			</div>
			<div class="flex flex-col gap-2 basis-40">
				<strong>Editing "{items[activeItem].name}"</strong>
				Title: <TodoEditorWithUseEffect item={items[activeItem]} saveName={(name) => setItems(p => p.map((item, i) => i === activeItem ? { ...item, name } : item))} saveDrawing={(drawing) => setItems(p => p.map((item, i) => i === activeItem ? { ...item, drawing } : item))} enableDrawing={props.enableDrawing} />
			</div>
		</div>
	</div>
}



