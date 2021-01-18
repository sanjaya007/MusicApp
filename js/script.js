const nav = document.querySelector('.nav');
navList = nav.querySelectorAll('li');

const sections = document.querySelectorAll('section');

for(let i = 0; i < navList.length; i++){
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function(){
        for(let j = 0; j < navList.length; j++){
            const ra = navList[j].querySelector('a');
            ra.classList.remove('active');
            sections.forEach(section =>{
                section.classList.remove('show')
            });
        }
        this.classList.add('active');
        sections.forEach(section => {
            if(section.id == a.id)
            {
                section.classList.add('show');
            }
        })
    });    
}


function musicActions(){
    const musicIcons = document.querySelectorAll('.music-icon i');

    musicIcons.forEach(musicIcon => {
        musicIcon.addEventListener('click', musicTask);

    function musicTask(){
        if (musicIcon.classList.contains("fa-heart")){
            this.classList.toggle('heart');
        }

        if (musicIcon.classList.contains("fa-bookmark")){
            this.classList.toggle('bookmark');
        }
    }
    });
}

function showMusicPlayer(){
    const musicPlayer = document.querySelector('.music-player');
    musicPlayer.classList.remove('hidden');
}

function activeMusicPlayer(musicElementID){
    const musicContainers = document.querySelectorAll('.music-container');
    musicContainers.forEach(musicContainer => {
        const faIcon = musicContainer.childNodes[2].childNodes[1];
        if(musicContainer.id == musicElementID){
            // faIcon.className = 'fa fa-pause';
            // console.log(faIcon.className);

            musicContainer.classList.add('active');
            if(wavesurfer.isPlaying()) faIcon.className = 'fa fa-pause';
            else faIcon.className = 'fa fa-play';
            // console.log(faIcon.className);

        }else{
            musicContainer.classList.remove('active');
            faIcon.className = 'fa fa-play';
        }
    })
}

