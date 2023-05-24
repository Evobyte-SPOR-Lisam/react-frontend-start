import { useEffect, useState } from "react";
import "./NumbersGame.css";

// Scrieti o aplicatie React care afiseaza 10 butoane in stanga si 10 butoane in dreapta.
// Cele 10 butoane din stanga au numerele de la 1 la 10 in ordine aleatoare, iar cele 10 din dreapta au numerele de la -10 la -1 in ordine aleatoare.
// Utilizatorul trebuie sa potriveasca fiecare numar din stanga cu opusul sau astfel:
//      selecteaza un buton din stanga, dupa care trebuie sa selecteze butonul cu numarul opus in dreapta.
//      Daca selecteaza corect, ambele butoane devin verzi si nu se mai poate face click pe ele.
//      Daca selecteaza gresit, ambele butoane devin rosii si nu se mai poate face click pe ele.
//      Scorul final este egal cu numarul butoanelor verzi.

function getRandomNumbers(count: number, negatives = false): number[] {
	// returns a shuffled array with the numbers 1, 2, ..., count
	const result = [];
	for (let i = 0; i < count; i++) {
		let v = i + 1;
		if (negatives) {
			v = -v;
		}
		result.push(v);
	}

	// see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	let currentIndex = result.length;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
	}

	return result;
}

interface GameState {
	[v: number]: string;
}

export default function NumbersGame() {
	const [numbersLeft, setNumbersLeft] = useState(getRandomNumbers(10));
	const [numbersRight, setNumbersRight] = useState(getRandomNumbers(10, true));

	const [leftStates, setLeftStates] = useState({} as GameState);
	const [rightStates, setRightStates] = useState({} as GameState);

	const [selectedLeft, setSelectedLeft] = useState<number | undefined>(undefined);
	const [selectedRight, setSelectedRight] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (selectedLeft === undefined || selectedRight === undefined) {
			return;
		}
		let result = "incorrect";
		if (selectedRight + selectedLeft === 0) {
			result = "correct";
		}
		setLeftStates((leftStates) => {
			return {
				...leftStates,
				[selectedLeft]: result,
			};
		});
		setRightStates((rightStates) => {
			return {
				...rightStates,
				[selectedRight]: result,
			};
		});
		setSelectedLeft(undefined);
		setSelectedRight(undefined);
	}, [selectedLeft, selectedRight]);

	function handleLeftBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		setSelectedLeft(+event.currentTarget.value);
	}

	function handleRightBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		setSelectedRight(+event.currentTarget.value);
	}

	return (
		<div>
			<h2>Numbers matching game</h2>
			<h3>Score: TODO</h3>

			<div className="col">
				<div className="btns">
					{numbersLeft.map((v, i) => {
						if (leftStates[v] === "correct")
							return (
								<button
									key={i}
									onClick={handleLeftBtnClick}
									value={v}
									disabled={true}
									className={"btn-matched"}>
									Number {v}
								</button>
							);
						if (leftStates[v] === "incorrect")
							return (
								<button
									key={i}
									onClick={handleLeftBtnClick}
									value={v}
									disabled={true}
									className={"btn-incorrect"}>
									Number {v}
								</button>
							);
						return (
							<button
								key={i}
								onClick={handleLeftBtnClick}
								value={v}
								disabled={v === selectedLeft}
								className={v === selectedLeft ? "btn-sel" : ""}>
								Number {v}
							</button>
						);
					})}
				</div>
			</div>

			<div className="col">
				<div className="btns">
					{numbersRight.map((v, i) => {
						if (rightStates[v] === "correct")
							return (
								<button
									key={i}
									onClick={handleRightBtnClick}
									value={v}
									disabled={true}
									className={"btn-matched"}>
									Number {v}
								</button>
							);
						if (rightStates[v] === "incorrect")
							return (
								<button
									key={i}
									onClick={handleLeftBtnClick}
									value={v}
									disabled={true}
									className={"btn-incorrect"}>
									Number {v}
								</button>
							);
						return (
							<button
								key={i}
								onClick={handleRightBtnClick}
								value={v}
								disabled={v === selectedRight}
								className={v === selectedRight ? "btn-sel" : ""}>
								Number {v}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
