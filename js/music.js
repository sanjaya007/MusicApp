
var Music = {

    row1 : null,
    MUSIC_API : "http://localhost:4000/getAllMusic", 

    getAllMusic : function(){
        this.row1 = id("row1");
        fetch(this.MUSIC_API)
        .then(response => response.json())
        .then(data => {
            row1.innerHTML = "";
            data.forEach(musicObj => {
                this.createMusicDiv(musicObj);  
            });
            musicActions();
        })

    },

    createMusicDiv : function(musicObj){
        const theDiv = '<div class="music-container" id="music'+musicObj.id+'" audio="'+musicObj.audioName+'">'
                            +'<div class="image-container">'
                                +'<img src="./images/guitar.png" alt="guitar">'
                            +'</div>'
                            +'<div class="music-name">'
                                +'<h2>'+musicObj.artist+'</h2>'
                                +'<p>'+musicObj.audioName+'</p>'
                            +'</div>'
                            +'<div class="music-icon">'
                                +'<i class="fa fa-heart" onclick="Music.addToFav('+musicObj.id+');"></i>'
                                +'<i class="fa fa-play" onclick="Music.playAudio(this.parentNode.parentNode.id);" id="faPlay"></i>'
                                +'<i class="fa fa-bookmark"></i>'
                            +'</div>'
                        +'</div>';
        this.row1.innerHTML += theDiv; 
    },
    lastLoadedElId : null,

    playAudio : function(elId){
        this.showLoading();
        showMusicPlayer();
        const audioSrc = document.getElementById(elId).getAttribute("audio");
        if(elId !== this.lastLoadedElId){
            wavesurfer.load("audios/"+audioSrc);
            wavesurfer.on('ready', function () {
                wavesurfer.playPause();
                Music.startTime();

                // handling play pause on first click (fa-icon)
                const theParent = id(elId);
                const faIcon1 = theParent.getElementsByTagName("i")[1];
                faIcon1.className = 'fa fa-pause';
            

            });
            wavesurfer.on('waveform-ready', function () {
                Music.hideLoading();
            });
            this.lastLoadedElId = elId;
        }else{
            this.playToggle();
        }
        activeMusicPlayer(elId);
        
        
    },

    showLoading: function(){
        id("loading").style.display == "block";
    },

    hideLoading: function(){
        id("loading").style.display == "none";  
    },

    timerCounter : null,
    startTime : function(){
        this.stopTime();
        startTime = new Date();
        this.timerCounter = setInterval(() =>{
            id("musicTime").innerText = secondsToHms(wavesurfer.getCurrentTime());
        }, 1000);
    },
    stopTime : function(){
        clearInterval(this.timerCounter);
    },

    playToggle : function(){
        wavesurfer.playPause();
        this.hoverPlayToggle();
        activeMusicPlayer(this.lastLoadedElId);
    },

    hoverPlayToggle: function(){
        if(wavesurfer.isPlaying()){
            id("hoverPlay").className = "fa fa-pause";
        } 
        else {
            id("hoverPlay").className = "fa fa-play";
        }
    },

    keyCodeFns : function(e){
        var e = window.event || e;
        const kc = e.key;

        switch (kc) {
            case " ":
                e.preventDefault();
                Music.playToggle();
                break;
            
            case "m":
                wavesurfer.toggleMute();
                break;
        
            default:
                break;
        }
    }

}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h < 1 ? 0 : h;
    var mDisplay = m < 1 ? 0: m;
    var sDisplay = s < 1 ? 0 : s;
    return hDisplay +":"+ mDisplay +":"+ sDisplay; 
}

document.onkeypress = Music.keyCodeFns;