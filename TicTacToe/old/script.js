console.log("Welcome to TicTacToe...");

const music = new Audio("/assets/music.mp3");
const turnMusic = new Audio("/assets/ting.mp3");
const gameOver = new Audio("/assets/gameOver.mp3");
let isGameOver = false;


let turn = "X";

// Function to Change turn
function changeTurn(){
	return turn === "X" ? "O" : "X";
}

// Function to Check Win
function checkWin(){
	let boxTexts = document.querySelectorAll(".boxText");
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
	wins.forEach(e =>{
		if ((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[2]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[0]].innerText !== "")){
			document.querySelector("#info").innerText = boxTexts[e[0]].innerText + " Won";
			isGameOver = true;
			document.querySelector("#imgBox").querySelector("img").style.width = "100px";
		}	
	});
}

// Games Logic
document.querySelectorAll(".box").forEach(box => {
		let boxText = box.querySelector(".boxText");
		box.addEventListener("click", ()=>{
			if (boxText.innerText === ''){
				boxText.innerText = turn;
				boxText.disabled = true;
				turn = changeTurn();
				turnMusic.play();
				checkWin();
				if (!isGameOver){
					document.querySelector("#info").innerText = `Turn for ${turn}`;
				}
			}
		});
});
