const styleSwitcher = document.querySelector('.style-switcher');
const toggleStyle = document.querySelector('.toggle-style-switcher');
const bodySkin = document.querySelectorAll('.body-skin');

const uploadBox = document.querySelector('.uploadBox');
const toggleIcon = document.querySelector('.uploadIcon');
const iconFa = document.querySelector('.uploadIcon i');
const uploadBtn = document.querySelector('.uploadBtn');

const popContainer = document.querySelector('.popContainer');
const closePop = document.querySelector('.close-pop');

toggleStyle.addEventListener('click', function(){
    styleSwitcher.classList.toggle('open');
});

for(let i = 0; i < bodySkin.length; i++){
    bodySkin[i].addEventListener('change', function(){
        if(this.value === 'dark'){
            document.body.classList.add('dark');
        }
        else{
            document.body.classList.remove('dark');
        }
    });
}

toggleIcon.addEventListener('click', function(){
    uploadBox.classList.toggle('open');
    iconFa.classList.toggle('rotate');
    this.classList.toggle('animate')
});

uploadBtn.addEventListener('click', function(){
    popContainer.classList.add('popActive');
});

closePop.addEventListener('click', function(){
    popContainer.classList.remove('popActive');
});
