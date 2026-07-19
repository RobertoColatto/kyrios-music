// ===============================
// COLOQUE SUAS MÚSICAS AQUI
// ===============================

console.log(playlist);

// ===============================

const audio = document.getElementById("audio");
const musicName = document.getElementById("musicName");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistDiv = document.getElementById("playlist");

let currentMusic = 0;

function loadMusic(index){

    audio.src = playlist[index].file;
    musicName.innerHTML = playlist[index].title;

    document.querySelectorAll(".playlist div").forEach((item,i)=>{
        item.classList.toggle("active",i===index);
    });

}

function playPause(){

    if(audio.paused){
        audio.play();
        playBtn.innerHTML="⏸";
    }else{
        audio.pause();
        playBtn.innerHTML="▶";
    }

}

function next(){

    currentMusic++;

    if(currentMusic>=playlist.length)
        currentMusic=0;

    loadMusic(currentMusic);
    audio.play();
    playBtn.innerHTML="⏸";

}

function previous(){

    currentMusic--;

    if(currentMusic<0)
        currentMusic=playlist.length-1;

    loadMusic(currentMusic);
    audio.play();
    playBtn.innerHTML="⏸";

}

audio.addEventListener("ended",next);

audio.addEventListener("timeupdate",()=>{

    const percent=(audio.currentTime/audio.duration)*100;
    progress.style.width=percent+"%";

    current.innerHTML=format(audio.currentTime);
    duration.innerHTML=format(audio.duration);

});

function format(sec){

    if(isNaN(sec)) return "0:00";

    let min=Math.floor(sec/60);
    let s=Math.floor(sec%60);

    if(s<10) s="0"+s;

    return min+":"+s;

}

progressContainer.addEventListener("click",(e)=>{

    const width=progressContainer.clientWidth;
    const click=e.offsetX;

    audio.currentTime=(click/width)*audio.duration;

});

volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});

playlist.forEach((music,index)=>{

    const item=document.createElement("div");

    item.innerHTML=music.title;

    item.onclick=()=>{

        currentMusic=index;
        loadMusic(index);
        audio.play();
        playBtn.innerHTML="⏸";

    };

    playlistDiv.appendChild(item);

});

loadMusic(currentMusic);

//função auxiliar pra ignorar acentos
function matchIgnoringAccents(str1, str2) {
    const clean = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return clean(str1).includes(clean(str2));
}

//função de busca
function searchMusic(playlist, searchStr) {
    const results = []
    for(const item of playlist) {
        for(const key in item) {
            //if(key == "title" && item[key].toLowerCase().includes(searchStr.toLowerCase())) {
            if(key == "title" && matchIgnoringAccents(item[key], searchStr)) {
                //console.log(item[key]);
                results.push(item[key]);
            }
        }
    }
    return results
}

r = searchMusic(playlist, "")
console.log(r)