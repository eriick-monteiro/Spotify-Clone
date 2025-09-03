const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");

const cyberScript = {
    songName: "CyberScript",
    bandName: "N!gh7 ₿ØyZ",
    file: "CyberScript"
}

const cyberStyleSheet = {
    songName: "CyberStyleSheet",
    bandName: "N!gh7 ₿ØyZ",
    file: "CyberStyleSheet"
}

const helloWorld = {
    songName: "h3ll0-w0rld",
    bandName: "N!gh7 ₿ØyZ",
    file: "h3ll0-w0rld"
}

const reactThis = {
    songName: "ReactThis",
    bandName: "N!gh7 ₿ØyZ",
    file: "ReactThis"
}

const originalPlaylist = [cyberScript, cyberStyleSheet, helloWorld, reactThis];
let sortedPlaylist = [...originalPlaylist];
let index = 0;
let isPlaying = false;
let isLiked = false;
let isShuffled = false;

function playSong() {
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    song.pause();
    isPlaying = false;
}

function playPause() {
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `images/${sortedPlaylist[index].file}.webp`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].bandName;
}

function previousSong() {
    if (index == 0) {
        index = sortedPlaylist.length -1 ;
    }
    else {
        index = index - 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    let size = preShuffleArray.length;
    let currentIndex = size - 1;
    
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        
        currentIndex -= 1;
    }
}

function shufflePlaylist() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add("button-active");
    }
    else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove("button-active");
    }
}

initializeSong();

play.addEventListener("click", playPause);
// play.addEventListener("dblclick", nextSong);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shufflePlaylist);


