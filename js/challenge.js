const cntr = document.getElementById("counter");
const hrt = document.getElementById("heart");
const mns = document.getElementById("minus");
const pls = document.getElementById("plus");
const pse = document.getElementById("pause");
const likesList = document.querySelector(".likes");
const form = document.querySelector("form");
const comment = document.querySelector("#comment-input");
const commentList = document.querySelector("#list");

let likeCounts = {};
let interval;
let isPaused = false;

function startCntr() {
    interval = setInterval(() => {
        let count = parseInt(cntr.textContent) || 0;
        cntr.textContent = count + 1;
    }, 1000);
}

function stopCntr() {
    clearInterval(interval);
}

document.addEventListener("DOMContentLoaded", () => {
    startCntr();
    pse.textContent = "pause";
});

const mnsHandler = () => {
    let count = parseInt(cntr.textContent) || 0;
    cntr.textContent = count - 1;
};

const plsHandler = () => {
    let count = parseInt(cntr.textContent) || 0;
    cntr.textContent = count + 1;
};

const hrtHandler = () => {
    let count = parseInt(cntr.textContent) || 0;
    if (likeCounts[count]) {
        likeCounts[count]++;
    } else {
        likeCounts[count] = 1;
    }
    let existingLikeItem = document.querySelector(`[data-number="${count}"]`);
    if (existingLikeItem) {
        existingLikeItem.textContent = `${count} liked ${likeCounts[count]} time${likeCounts[count] > 1 ? "s" : ""}`;
} else {
    let li = document.createElement("li");
    li.setAttribute("data-number", count);
    li.textContent = `${count} liked 1 time`;
    likesList.appendChild(li);
    }
};

mns.addEventListener("click", mnsHandler);
pls.addEventListener("click", plsHandler);
hrt.addEventListener("click", hrtHandler);

pse.addEventListener("click", () => {
    if (pse.textContent.toLowerCase() === "pause") {
        stopCntr();
        pse.textContent = "resume";
        hrt.disabled = true;
        mns.disabled = true;
        pls.disabled = true;
    } else {
        startCntr();
        pse.textContent = "pause";
        hrt.disabled = false;
        mns.disabled = false;
        pls.disabled = false;
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (comment.value.trim().length !== 0) {
        let p = document.createElement("p")
        p.textContent = comment.value;
        commentList.appendChild(p);
        comment.value = "";
    };
});
