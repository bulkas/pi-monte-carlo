const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const btnThrow = document.getElementById("btn-stone-throw");
const btnClear = document.getElementById("btn-stone-clear");
const btnComputePi = document.getElementById("btn-compute-pi");

const amountThrowingStones = 400 * 400;
// circle radius
const r = 300;

const stones = new Set();

let computed_pi = 0;

function drawCoordinateSystem() {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(400, 800); // Move the pen
    ctx.lineTo(400, 0); // Draw a line
    ctx.moveTo(0, 400); // Move the pen
    ctx.lineTo(800, 400); // Draw a line
    ctx.stroke(); // Render the path
}

function drawSquare() {
    ctx.strokeStyle = "blue";
    ctx.beginPath(); // Start a new path
    ctx.moveTo(100, 100);
    ctx.lineTo(700, 100);
    ctx.lineTo(700, 700);
    ctx.lineTo(100, 700);
    ctx.lineTo(100, 100);
    ctx.stroke(); // Render the path
}

function drawCircle() {
    ctx.strokeStyle = "red";
    ctx.beginPath(); // Start a new path
    ctx.arc(400, 400, 300, 0, 2 * Math.PI);
    ctx.stroke(); // Render the path
}

const drawStones = () => {
    stones.forEach((stone) => {
        ctx.fillRect(stone.x, stone.y, 1, 1);
    });
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCoordinateSystem();
    drawSquare();
    drawCircle();
    drawStones();
}

const getRandomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isInCircle = (x, y) => Math.pow(x - 400, 2) + Math.pow(y - 400, 2) <= Math.pow(r, 2);

const getStones = () => stones.size;

const getStonesInCircle = () => {
    let stonesInCircle = 0;
    stones.forEach((stone) => {
        if (isInCircle(stone.x, stone.y)) stonesInCircle += 1;
    });
    return stonesInCircle;
}

function throwStones() {
    for (let i = 0; i < amountThrowingStones; i++) {
        // Randomises x and y coordinate <100; 700>
        const x = getRandomInRange(100, 700);
        const y = getRandomInRange(100, 700);
        stones.add({ x: x, y: y });
    }
    redraw();
}

function computePi() {
    let stones = getStones();
    let stonesInCircle = getStonesInCircle();
    computed_pi = 4 * stonesInCircle / stones;
    alert(`Total stones: ${stones}\nStones in the circle: ${stonesInCircle}\nPI approximation: ${computed_pi}\nPrecission: ${computed_pi / Math.PI * 100}%`);
}

btnThrow.addEventListener('click', throwStones);
btnComputePi.addEventListener('click', computePi);
btnClear.addEventListener('click', () => {
    stones.clear();
    redraw();
})

redraw();
