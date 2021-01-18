var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#f06f82',
    progressColor: '#ec1839',
    barWidth : 2,
    cursorWidth : 0.5,
    cursorColor: '#ec1389',
    fillParent: true,
    loopSelection: true,
    responsive: true
});
wavesurfer.on('pause', function () {
    id("waveform").style.opacity = 0.5;
});
wavesurfer.on('play', function () {
    id("waveform").style.opacity = 1;
});