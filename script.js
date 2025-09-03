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
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");
const likeButton = document.getElementById("like");

const playlistName = document.getElementById("playlist-title");
playlistName.innerHTML = "Playlist 03"

const cyberScript = {
    songName: "CyberScript",
    bandName: "N!gh7 ₿ØyZ",
    file: "CyberScript",
    isLiked: false
}

const cyberStyleSheet = {
    songName: "CyberStyleSheet",
    bandName: "N!gh7 ₿ØyZ",
    file: "CyberStyleSheet",
    isLiked: false
}

const helloWorld = {
    songName: "h3ll0-w0rld",
    bandName: "N!gh7 ₿ØyZ",
    file: "h3ll0-w0rld",
    isLiked: false
}

const reactThis = {
    songName: "ReactThis",
    bandName: "N!gh7 ₿ØyZ",
    file: "ReactThis",
    isLiked: false
}

const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [cyberScript, cyberStyleSheet, helloWorld, reactThis];
let sortedPlaylist = [...originalPlaylist];
let index = 0;
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

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
    updateTotalTime();
    checkIsLiked();
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
    songTime.innerHTML = toHHMMSS(song.currentTime);
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

function shuffleButtonClicked() {
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

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    }
    else {
        playSong();
    }
}

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;

        repeatButton.classList.add("button-active");
    }
    else {
        repeatOn = false;
        
        repeatButton.classList.remove("button-active");
    }
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let sec = Math.floor(originalNumber - hours * 3600 - min * 60);

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
    else {
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
}

function updateTotalTime() {
    totalTime.innerHTML = toHHMMSS(song.duration);
}

function likeMusic() {
    likeButton.querySelector(".bi").classList.remove("bi-heart");
    likeButton.querySelector(".bi").classList.add("bi-heart-fill");
    likeButton.classList.add("button-active");
}

function unlikeMusic() {
    likeButton.querySelector(".bi").classList.remove("bi-heart-fill");
    likeButton.querySelector(".bi").classList.add("bi-heart");
    likeButton.classList.remove("button-active");
}

function checkIsLiked() {
    if (sortedPlaylist[index].isLiked === true) {
        likeMusic();
    }
    else {
        sortedPlaylist[index].isLiked = false;
        unlikeMusic();
    }
}

function likeButtonClicked() {
    if (sortedPlaylist[index].isLiked === false) {
        likeMusic();
        sortedPlaylist[index].isLiked = true;
    }
    else {
        unlikeMusic();
        sortedPlaylist[index].isLiked = false;
    }
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

initializeSong();

play.addEventListener("click", playPause);
// play.addEventListener("dblclick", nextSong);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBar);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);
likeButton.addEventListener("click", likeButtonClicked);


