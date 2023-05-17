import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(1);
	const [incrementValue, setIncrementValue] = useState(1);
	const minCount = -3;
	const maxCount = 10;

	return (
		<>
			<h1>Count is: {count}</h1>
			{count === minCount && <div>Min count reached.</div>}
			{count === maxCount && <div>Max count reached.</div>}
			<input value={incrementValue} onChange={(e) => setIncrementValue(+e.target.value)}></input>
			<button
				disabled={true}
				onClick={() => {
					if (count < maxCount) {
						setCount(count + incrementValue);
					}
				}}>
				Increase count
			</button>
			<button
				onClick={() => {
					if (count > minCount) {
						setCount(count - incrementValue);
					}
				}}>
				Decrease count
			</button>
			<button
				onClick={() => {
					setCount(1);
				}}>
				Reset count
			</button>
		</>
	);
}

export default App;
