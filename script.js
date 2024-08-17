const musicContainer=document.getElementById('music-container');
const playBtn=document.getElementById('play');
const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');

const audio=document.getElementById('audio');
const progress=document.getElementById('progress');
const progressContainer=document.getElementById('progress-container');
const title=document.getElementById('title');
const cover=document.getElementById('cover');
const currTime=document.querySelector('#currTime');
const durTime=document.querySelector('#durTime');

//song titles
const songs=['hey', 'summer', 'ukulele'];

//keep track of song
let songIndex=2;

//initially load song details into DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;
}

//play Song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//pause song
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');

    audio.pause();
}

//previous song
function prevSong(){
    songIndex--;

    if(songIndex<0){
        songIndex=songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//next song
function nextSong(){
    songIndex++;

    if(songIndex>songs.length-1){
        songIndex=0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//updateProgress Bar
function updateProgress(e){
    const{duration, currentTime}=e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}

//set progress Bar
function setProgress(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration=audio.duration;

    audio.currTime=(clickX/width)*duration;
}

//get duration and current time for time of song
function DurTime(e){
    const{durTime, currentTime}=e.srcElement;

    var sec;
    var sec_d;

    //define minutes current time
    let min=(currentTime==null)?0:Math.floor(currentTime/60);
    min=min<10?'0'+min:min;

    //defines seconds current time
    function get_sec(x){
        if(Math.floor(x)>=60){
            for(var i=1; i<=60; i++){
                if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))){
                    sec=Math.floor(x)-(60*i);
                    sec=sec<10?'0'+sec:sec;
                }
            }
        }else{
            sec=Math.floor(x);
            sec=sec<10?'0'+sec:sec;
        }
    }
    get_sec(currentTime, sec);

    //change currentTime DOM
    currTime.innerHTML=min+':'+sec;

    //define minutes duration
    let min_d=(isNaN(duration)===true)?'0':Math.floor(duration/60);
    min_d=min_d<10?'0'+min_d:min_d;


    function get_sec_d(x){
        if(Math.floor(x)>=60){
            for(var i=1; i<=60; i++){
                if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))){
                    sec_d=Math.floor(x)-(60*i);
                    sec_d=sec_d<10?'0'+sec_d:sec_d;
                }
            }
        }else{
            sec_d=Math.floor(x);
            sec_d=sec_d<10?'0'+sec_d:sec_d;
        }
    }
    
    //define seconds duration
    get_sec_d(duration);

    //change duration DOM;
    durTime.innerHTML=min_d+':'+sec_d;
};

//event Listeners
playBtn.addEventListener('click', ()=>{
    const isPlaying=musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

//change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//time/song update
audio.addEventListener('timeupdate', updateProgress);

//click on progressBar
progressContainer.addEventListener('click', setProgress);

//song ends
audio.addEventListener('ended', nextSong);

//time of song
audio.addEventListener('timeupdate', durTime);

