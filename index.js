const id = ["ttc", "start", "board"];
let i = {};
for (const val of id) {
  const dih = document.querySelector(`#${val}`);
  if (!dih) console.error("Invalid element");
  i[val] = dih;
}

i.start.addEventListener("click", () => {
  i.start.style.display = "none";
  startGame();
})

const wins = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [7,5,3]
]
let score = {
  p1: 0,
  p2: 0
}
let isPlayer1Turn = true;
function startGame () {
  const pTurn = document.createElement("h1");
  pTurn.textContent = "Player 1 Turn!";
  pTurn.id = "pTurn";
  container.insertBefore(pTurn, ttc);
  ttc.style.display = "grid";
  ttc.style.grid = "repeat(3, 1fr) / repeat(3, 1fr)";
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const btn = document.createElement("button");
      btn.textContent = "";
      i[r * 3 + c + 1] = btn;
      btn.id = r * 3 + c + 1;
      ttc.appendChild(btn);
      btn.addEventListener("click", () => {
        if (isPlayer1Turn && btn.textContent === "") {
          btn.textContent = "X";
          isPlayer1Turn = false;
          pTurn.textContent = "Player 2 Turn!";
          checkWin();
        } else if (!isPlayer1Turn && btn.textContent === "") {
          btn.textContent = "O";
          isPlayer1Turn = true;
          pTurn.textContent = "Player 1 Turn!";
          checkWin();
        }
      })
    }
  }
  const p1 = document.createElement("h1");
  const p2 = document.createElement("h1");
  p1.textContent = `Player 1 : ${score.p1}`;
  p2.textContent = `Player 2 : ${score.p2}`;
  p1.setAttribute("id", "p1");
  p2.setAttribute("id", "p2");
  i["p1"] = p1;
  i["p2"] = p2;
  i.board.append(p1);
  i.board.append(p2);
}

function checkWin () {
  for (const [a, b, c] of wins) {
    if (i[a].textContent !== "" && i[a].textContent === i[b].textContent && i[a].textContent === i[c].textContent && i[b].textContent === i[c].textContent) {
      alert(isPlayer1Turn ? "Player 2 wins!" : "Player 1 Wins!");
      resetGame(true);
    }
  }
  if ([1,2,3,4,5,6,7,8,9].every((val) => i[val].textContent !== "")) {
    alert("It's a draw!");
    resetGame();
  }
}
function resetGame (isWin = false) {
  [1,2,3,4,5,6,7,8,9].forEach(x => i[x].textContent = "");
  if (!isWin) return;
  if (isPlayer1Turn) {
    score.p2 += 1;
    i.p2.textContent = `Player 2 : ${score.p2}`;
  } else {
    score.p1 += 1;
    i.p1.textContent = `Player 1 : ${score.p1}`;
  }
}