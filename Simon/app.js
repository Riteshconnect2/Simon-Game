let gameSeq = [];
let userSeq = [];
let btns = ["green", "red", "yellow", "blue"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 200);
}

 
function flashSequence(seq) {
  let i = 0;
  function next() {
    if (i < seq.length) {
      let btn = document.querySelector(`.${seq[i]}`);
      btnFlash(btn);
      i++;
      setTimeout(next, 600);
    }
  }
  next();
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerHTML = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);

  flashSequence(gameSeq);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "";
    }, 200);
    reset();
  }
}

function btnPress() {
  if (!started) return;  

  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
