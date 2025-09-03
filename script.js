const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const capa = document.getElementById("cover");

musics = ["CyberScript", "CyberStyleSheet", "h3ll0-w0rld", "ReactThis"];
music = musics[2];

songName.innerText = music;
bandName.innerText = "N!gh7 ₿ØyZ";
song.src = `songs/${music}.mp3`;
capa.src = `images/${music}.webp`;
let isPlaying = false;
let isLiked = false;

function playPause() {
    if (!isPlaying) {
        play.querySelector(".bi").classList.remove("bi-play-circle-fill");
        play.querySelector(".bi").classList.add("bi-pause-circle-fill");
        song.play();
    } else if (isPlaying) {
        play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
        play.querySelector(".bi").classList.add("bi-play-circle-fill");
        song.pause();
    }
    isPlaying = !isPlaying;
}

play.addEventListener("click", playPause);

