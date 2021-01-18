Music.addToFav = function(musicId){
    fetch("http://localhost:4000/addToFav/"+musicId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function(response) {
        return response.json();
    }).then(function(data){
        alert(data.msg);
    });
}

Music.createFavDiv = function(musicObj){
    const theDiv = '<div class="music-container" id="music'+musicObj.id+'" audio="'+musicObj.audioName+'">'
                            +'<div class="image-container">'
                                +'<img src="./images/heartMusic.png" alt="guitar">'
                            +'</div>'
                            +'<div class="music-name">'
                                +'<h2>'+musicObj.artist+'</h2>'
                                +'<p>'+musicObj.audioName+'</p>'
                            +'</div>'
                            +'<div class="music-icon">'
                                +'<i class="fa fa-heart heart" onclick="Music.deleteFromFav('+musicObj.id+');"></i>'
                                +'<i class="fa fa-play" onclick="Music.playAudio(this.parentNode.parentNode.id);" id="faPlay"></i>'
                                +'<i class="fa fa-music"></i>'
                            +'</div>'
                        +'</div>';
        id("allFavs").innerHTML += theDiv; 
}

Music.deleteFromFav = function(musicId){
    fetch("http://localhost:4000/removeFromFavs/"+musicId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function(response) {
        return response.json();
    }).then(function(data){
        alert(data.msg);
        if(data.status == "ok"){
            const toRemoveMusicContainer = id("music"+musicId);
            console.log(toRemoveMusicContainer);
            console.log(musicId);
            toRemoveMusicContainer.remove();
        }
    });
}

Music.getAllFavs = function(){
    fetch("http://localhost:4000/getAllFavs")
    .then(response => response.json())
    .then(data => {
        id("allFavs").innerHTML = "";
        data.forEach(musicObj => {
            Music.createFavDiv(musicObj);
        });
        musicActions();
    });
}
