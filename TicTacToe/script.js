console.log("Welcome to TicTacToe!");

const boxes = document.querySelectorAll(".box");
const aside = document.querySelector("aside");

// Sounds
const ting = document.querySelector("#ting");
const gameOver = document.querySelector("#gameOver");
const error = document.querySelector("#error");
const won = document.querySelector("#won");

function playMusic(music){
	music.currentTime = 0; // Refresh Music
	music.play(); // Play Music
}

const wonMsg = document.querySelector("#wonMsg");
const drawMsg = document.querySelector("#drawMsg");
const wonLine = document.querySelector("#wonLine");
let isGameOver = false;

// Give x or o class
function giveClass(e){
	e.innerText === "X" ? e.classList.add("x") : e.classList.add("o");
}

// Remove x & o classes from Boxes
function removeClass(){
	boxes.forEach(e => {
		e.classList.remove("x");
		e.classList.remove("o");	
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

// Draw Won Line 
function drawLine(text, property, value){
	wonLine.style.width = "90%";
	
	if (property === "applyTop"){
		wonLine.style.top = "55%";
		wonLine.style.transform = value;
	}
	else if (property === "top"){
		wonLine.style.top = value;
	}
}

// Check Win
function checkWin(){
	let wins = [
		[0, 1, 2, "top", "17%"],
		[3, 4, 5, "top", "55%"],
		[6, 7, 8, "top", "94%"],
		[0, 3, 6, "applyTop", "translateX(-42%) rotate(90deg)"],
		[1, 4, 7, "applyTop", "rotate(90deg)"],
		[2, 5, 8, "applyTop", "translateX(42%) rotate(90deg)"],
		[0, 4, 8, "applyTop", "rotate(45deg)"],
		[2, 4, 6, "applyTop", "rotate(-45deg)"]
	];
	
	wins.forEach(e => {
		if ((boxes[e[0]].innerText === boxes[e[1]].innerText) && (boxes[e[0]].innerText === boxes[e[2]].innerText) && (boxes[e[0]].innerText !== "")){
			isGameOver = true;
			document.querySelector("#winner").innerText = turn;
			document.querySelector("#winner").className = `${turn.toLowerCase()}`;
			drawLine(e[0].innerText, e[3], e[4]); // Draw Line
			setTimeout(()=>{ // Pause for Some Time
				aside.style.display = "block";
				drawMsg.style.display = "none";
				wonMsg.style.display = "flex";
				playMusic(won); // Play Won Music
			}, 700);
		}
		else {
			checkDraw();
		}
	});
}

// Check Draw
function checkDraw(){
	let count = 0;
	boxes.forEach(e => {
		if (e.innerText.trim() !== ""){
			count++;
		}
	});
	
	if (count === boxes.length){
		setTimeout(()=>{
			aside.style.display = "block";
			wonMsg.style.display = "none";
			drawMsg.style.display = "flex";
			playMusic(gameOver); // Play GameOver Music
		}, 500);
	}
}

boxes.forEach(e => {
	e.addEventListener("click", ()=>{
		if (e.innerText === ''){
			e.innerText = turn;
			giveClass(e);
			playMusic(ting); // Play Ting Music
			checkWin();
			changeTurn();
			if (isGameOver === false){
				checkDraw();
			}
		}
		else {
			playMusic(error); // Play Error Music
			e.style.animation = "error 0.3s linear";
			setTimeout(()=>{
				e.removeAttribute("style");
			}, 300);
		}
	});
});

// Restart Game
function reset(){
	boxes.forEach(e => {
		e.innerText = "";	
	});
	wonLine.removeAttribute("style");
	removeClass();
	removeFlash();
	turn = "X";
	giveFlash();
	won.pause(); // Pause Won Music
}

document.querySelectorAll(".restart").forEach(e => {
	e.addEventListener("click", () => {
		setTimeout(()=>{
			reset();
			aside.style.display = "none";
		}, 300);
	});
});

// Toggle Theme
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

document.querySelector("#toggleTheme").addEventListener("click", ()=>{
	document.body.classList.toggle("lightMode");
	let mode = document.body.className;

	if (mode === "lightMode"){
		moon.style.fontSize = "0";
		sun.style.fontSize = "1.5rem";
	}

	else {
		sun.style.fontSize = "0";
		moon.style.fontSize = "1.5rem";
	}
});
