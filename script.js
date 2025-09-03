const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

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

initializeSong = () => {
    cover.src = `images/${playlist[index].file}.webp`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].bandName;
}

previousSong = () => {
    if (index == 0) {
        index = playlist.length -1 ;
    }
    else {
        index = index - 1;
    }
    initializeSong();
    playSong();
}


nextSong = () => {
    if (index === playlist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}

initializeSong();

play.addEventListener("click", playPause);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);



