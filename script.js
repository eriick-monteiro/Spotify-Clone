const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");

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

playlist = [cyberScript, cyberStyleSheet, helloWorld, reactThis];
let index = 0;
let isPlaying = false;
let isLiked = false;

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
    cover.src = `images/${playlist[index].file}.webp`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].bandName;
}

function previousSong() {
    if (index == 0) {
        index = playlist.length -1 ;
    }
    else {
        index = index - 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === playlist.length - 1) {
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

initializeSong();

play.addEventListener("click", playPause);
// play.addEventListener("dblclick", nextSong);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);


