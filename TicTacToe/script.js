console.log("Welcome to TicTacToe!");

const boxes = document.querySelectorAll(".box");
const aside = document.querySelector("aside");

// Give x or o class
function giveClass(){
	boxes.forEach(e => {
		e.innerText === "X" ? e.classList.add("x") : e.classList.add("o");
	});
}

let turn = "X";
giveFlash();

// Toggle Turn
function changeTurn(){
	removeFlash();
	turn === "X" ? turn = "O" : turn = "X";
	giveFlash();
}

// Give Flash
function giveFlash(){
	document.querySelector(`.${turn.toLowerCase()}`).classList.add("turn");
}

// Remove Flash
function removeFlash(){
	document.querySelector(`.${turn.toLowerCase()}`).classList.remove("turn");
}

// Check Win
function checkWin(){
	let wins = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	
	wins.forEach(e => {
		if ((boxes[e[0]].innerText === boxes[e[1]].innerText) && (boxes[e[2]].innerText === boxes[e[1]].innerText) && (boxes[e[0]].innerText !== "")){
			document.querySelector("#winner").innerText = turn;
			document.querySelector("#winner").className = `${turn.toLowerCase()}`;
			aside.style.display = "block";
		}
	});
}


boxes.forEach(e => {
	e.addEventListener("click", ()=>{
		if (e.innerText === ''){
			e.innerText = turn;
			giveClass();
			checkWin();
			changeTurn();
		}
	});
});


// Restart Game
function reset(){
	boxes.forEach(e => {
		e.innerText = "";	
	});
	removeFlash();
	turn = "X";
	giveFlash();
}

document.querySelectorAll(".restart").forEach(e => {
	e.addEventListener("click", () => {
		reset();
		aside.style.display = "none";
	});
});

// Aside
document.querySelector("#cross").addEventListener("click", ()=>{
	aside.style.display = "none";
});

// Toggle Theme
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

document.querySelector("#toggleTheme").addEventListener("click", ()=>{
	document.body.classList.toggle("lightMode");
	let mode = document.body.className;

	if (mode === "lightMode"){
		moon.style.display = "none";
		sun.style.display = "block";
	}

	else {
		sun.style.display = "none";
		moon.style.display = "block";
	}
});
