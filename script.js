/*=====================================================
        PREMIUM LOVE WEBSITE
        SCRIPT.JS - BAGIAN 1
======================================================*/

/*==============================
        ELEMENT
==============================*/

const loading = document.getElementById("loading");

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");

const gif = document.getElementById("mainGif");

const typingText = document.getElementById("typingText");
const question = document.getElementById("question");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const loveFill = document.getElementById("loveFill");
const lovePercent = document.getElementById("lovePercent");

const resultCard = document.getElementById("resultCard");

const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("letterModal");
const closeBtn = document.getElementById("closeLetter");

const emojiContainer = document.getElementById("emojiContainer");
const loveRain = document.getElementById("loveRain");

/*==============================
        VARIABLES
==============================*/

let musicPlaying = false;
let loveValue = 0;
let noClick = 0;

const gifs = [
    "gif/bear.gif",
    "gif/love.gif",
    "gif/happy.gif"
];

const emojiList = [
    "❤️",
    "💕",
    "💖",
    "💗",
    "💘",
    "🥰",
    "😍",
    "😘",
    "✨",
    "🌸"
];

/*==============================
        UTILITIES
==============================*/

const random = (min, max) =>
    Math.random() * (max - min) + min;

const randomItem = array =>
    array[Math.floor(Math.random() * array.length)];

/*==============================
        LOADING
==============================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.opacity = "0";

        loading.style.pointerEvents = "none";

        setTimeout(() => {

            loading.remove();

        }, 700);

    }, 1600);

});

/*==============================
        MUSIC
==============================*/

function playMusic() {

    if (musicPlaying) return;

    music.volume = 0.5;

    music.play().catch(() => {});

    musicPlaying = true;

    musicBtn.textContent = "🔊";

}

document.addEventListener("click", playMusic, {
    once: true
});

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicBtn.textContent = "🔊";

    } else {

        music.pause();

        musicBtn.textContent = "🎵";

    }

});

/*==============================
        TYPING EFFECT
==============================*/

const message =
"Aku punya satu pertanyaan penting buat orang paling cantik di dunia... 🥺❤️";

typingText.textContent = "";

let index = 0;

function typingEffect() {

    if (index >= message.length) return;

    typingText.textContent += message[index];

    index++;

    setTimeout(typingEffect, 40);

}

setTimeout(typingEffect, 800);

/*==============================
        LOVE METER
==============================*/

function increaseLove(target = 100) {

    const timer = setInterval(() => {

        if (loveValue >= target) {

            clearInterval(timer);

            return;

        }

        loveValue++;

        loveFill.style.width = `${loveValue}%`;

        lovePercent.textContent = `${loveValue}%`;

    }, 18);

}

/*==============================
        FLOATING EMOJI
==============================*/

function createEmoji() {

    const emoji = document.createElement("span");

    emoji.className = "floatingEmoji";

    emoji.textContent = randomItem(emojiList);

    emoji.style.left = random(5, 95) + "%";

    emoji.style.fontSize = random(22, 40) + "px";

    emojiContainer.appendChild(emoji);

    emoji.animate(
        [
            {
                transform: "translateY(0)",
                opacity: 1
            },
            {
                transform: `translateY(-${window.innerHeight}px) rotate(${random(-180,180)}deg)`,
                opacity: 0
            }
        ],
        {
            duration: 4000,
            easing: "linear"
        }
    );

    setTimeout(() => {

        emoji.remove();

    }, 4000);

}

/*==============================
        LOVE RAIN
==============================*/

function createHeart() {

    const heart = document.createElement("div");

    heart.textContent = "💖";

    heart.style.position = "fixed";

    heart.style.left = random(0, 100) + "%";

    heart.style.top = "-30px";

    heart.style.fontSize = random(18, 34) + "px";

    heart.style.pointerEvents = "none";

    loveRain.appendChild(heart);

    heart.animate(
        [
            {
                transform: "translateY(0)",
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 100}px) rotate(${random(-180,180)}deg)`,
                opacity: 0
            }
        ],
        {
            duration: random(4500, 7000),
            easing: "linear"
        }
    );

    setTimeout(() => {

        heart.remove();

    }, 7000);

}

setInterval(createHeart, 600);
/*=====================================================
        PREMIUM LOVE WEBSITE
        SCRIPT.JS - BAGIAN 2
======================================================*/

/*==============================
        NO BUTTON RUN AWAY
==============================*/

const textContent= [
    "Enggak",
    "Yakin?",
    "Salah Tombol",
    "Jangan Dong",
    "Coba Lagi",
    "Pilih Iya",
    "Masa Enggak?"
];

function moveNoButton(){

    const card = document.querySelector(".card");

    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = cardRect.width - btnRect.width - 30;
    const maxY = cardRect.height - btnRect.height - 30;

    const x = random(20,maxX);
    const y = random(150,maxY);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    noBtn.textContent = noTexts[noClick % noTexts.length];

    gif.src = randomItem(gifs);

    createEmoji();

    noClick++;

}

noBtn.addEventListener("mouseenter",moveNoButton);

noBtn.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    moveNoButton();

});

/*==============================
        YES BUTTON
==============================*/

yesBtn.addEventListener("click",()=>{

    playMusic();

    gif.src = "gif/happy.gif";

    question.innerHTML =
    "🥹 Yeayyy... Makasih udah milih aku ❤️";

    increaseLove();

    for(let i=0;i<35;i++){

        setTimeout(createEmoji,i*80);

    }

    for(let i=0;i<50;i++){

        setTimeout(createHeart,i*90);

    }

    createConfetti();

    launchFireworks();

    setTimeout(()=>{

        resultCard.classList.add("show");

        resultCard.scrollIntoView({

            behavior:"smooth"

        });

    },1800);

});

/*==============================
        LOVE LETTER
==============================*/

nextBtn.addEventListener("click",()=>{

    modal.classList.add("show");

});

closeBtn.addEventListener("click",()=>{

    modal.classList.remove("show");

});

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("show");

    }

});

/*==============================
        KEYBOARD
==============================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        yesBtn.click();

    }

    if(e.key==="Escape"){

        modal.classList.remove("show");

    }

});

/*==============================
        BUTTON RIPPLE
==============================*/

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("click",(e)=>{

        const ripple=document.createElement("span");

        ripple.className="ripple";

        ripple.style.left=e.offsetX+"px";
        ripple.style.top=e.offsetY+"px";

        btn.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});

/*==============================
        AUTO ANIMATION
==============================*/

setInterval(()=>{

    yesBtn.animate(

        [

            {
                transform:"scale(1)"
            },

            {
                transform:"scale(1.06)"
            },

            {
                transform:"scale(1)"
            }

        ],

        {

            duration:1000

        }

    );

},2500);

setInterval(()=>{

    gif.animate(

        [

            {
                transform:"translateY(0)"
            },

            {
                transform:"translateY(-8px)"
            },

            {
                transform:"translateY(0)"
            }

        ],

        {

            duration:2200

        }

    );

},2200);

/*==============================
        CONSOLE
==============================*/

console.log(
"%c💖 Premium Love Website Loaded 💖",
"color:#ff4f91;font-size:18px;font-weight:bold;"
);
/*=====================================================
        PREMIUM LOVE WEBSITE
        SCRIPT.JS - BAGIAN 3
        CONFETTI & FIREWORK
======================================================*/

/*==============================
        CANVAS
==============================*/

const confettiCanvas = document.getElementById("confettiCanvas");
const fireworkCanvas = document.getElementById("fireworkCanvas");

const confettiCtx = confettiCanvas.getContext("2d");
const fireCtx = fireworkCanvas.getContext("2d");

function resizeCanvas(){

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    fireworkCanvas.width = window.innerWidth;
    fireworkCanvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/*==============================
        CONFETTI
==============================*/

let confettis = [];

class Confetti{

    constructor(){

        this.x = random(0, confettiCanvas.width);
        this.y = -20;

        this.size = random(6,12);

        this.speed = random(2,5);

        this.angle = random(0,360);

        this.rotate = random(-6,6);

        this.color = randomItem([
            "#ff4f91",
            "#ff7eb3",
            "#ffd166",
            "#ffffff",
            "#7cf4ff",
            "#b388ff"
        ]);

    }

    update(){

        this.y += this.speed;
        this.angle += this.rotate;

    }

    draw(){

        confettiCtx.save();

        confettiCtx.translate(this.x,this.y);

        confettiCtx.rotate(this.angle*Math.PI/180);

        confettiCtx.fillStyle = this.color;

        confettiCtx.fillRect(
            -this.size/2,
            -this.size/2,
            this.size,
            this.size
        );

        confettiCtx.restore();

    }

}

function createConfetti(){

    for(let i=0;i<120;i++){

        confettis.push(new Confetti());

    }

}

function animateConfetti(){

    confettiCtx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );

    for(let i=confettis.length-1;i>=0;i--){

        confettis[i].update();

        confettis[i].draw();

        if(confettis[i].y>confettiCanvas.height+30){

            confettis.splice(i,1);

        }

    }

    requestAnimationFrame(animateConfetti);

}

animateConfetti();

/*==============================
        FIREWORK
==============================*/

let particles = [];

class Particle{

    constructor(x,y,color){

        this.x=x;
        this.y=y;

        this.color=color;

        this.radius=random(2,4);

        this.life=100;

        const angle=Math.random()*Math.PI*2;
        const speed=random(2,7);

        this.vx=Math.cos(angle)*speed;
        this.vy=Math.sin(angle)*speed;

    }

    update(){

        this.x+=this.vx;
        this.y+=this.vy;

        this.vy+=0.05;

        this.life--;

    }

    draw(){

        fireCtx.save();

        fireCtx.globalAlpha=this.life/100;

        fireCtx.beginPath();

        fireCtx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        fireCtx.fillStyle=this.color;

        fireCtx.fill();

        fireCtx.restore();

    }

}

function explode(x,y){

    const colors=[

        "#ff4f91",
        "#ff7eb3",
        "#ffffff",
        "#ffd166",
        "#7cf4ff",
        "#b388ff"

    ];

    const color=randomItem(colors);

    for(let i=0;i<60;i++){

        particles.push(

            new Particle(x,y,color)

        );

    }

}

function launchFireworks(){

    for(let i=0;i<5;i++){

        setTimeout(()=>{

            explode(

                random(
                    window.innerWidth*0.2,
                    window.innerWidth*0.8
                ),

                random(
                    window.innerHeight*0.15,
                    window.innerHeight*0.55
                )

            );

        },i*500);

    }

}

function animateFirework(){

    fireCtx.clearRect(
        0,
        0,
        fireworkCanvas.width,
        fireworkCanvas.height
    );

    for(let i=particles.length-1;i>=0;i--){

        particles[i].update();

        particles[i].draw();

        if(particles[i].life<=0){

            particles.splice(i,1);

        }

    }

    requestAnimationFrame(animateFirework);

}

animateFirework();

/*==============================
        AUTO EMOJI
==============================*/

setInterval(()=>{

    if(document.hidden) return;

    if(Math.random()>0.6){

        createEmoji();

    }

},2000);

/*==============================
        FINISH
==============================*/

console.log(
"%c❤️ Semua Script Berhasil Dimuat ❤️",
"color:#ff4f91;font-size:18px;font-weight:bold;"
);

console.log("Premium Love Website Siap Digunakan 🚀");