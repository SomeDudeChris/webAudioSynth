// This was my first basic synthesizer
// document.getElementById('btn').addEventListener('click', () => {
//     //Create a new audio context and if the browser is out of date or can't connect to the audio context, throw a not supported message.
//     const actx = new (AudioContext || webkitAudioContext)();
//     if (!actx) throw 'Not Supported';

//     //create a new oscillator in the audio context
//     const osc = actx.createOscillator();
//     const gainNode = actx.createGain();

//     gainNode.gain.setValueAtTime(0.1, actx.currentTime);

//     //give the oscillator different contexts
//     osc.type = 'sawtooth';
//     osc.frequency.value = 440;
//     osc.connect(gainNode);
//     gainNode.connect(actx.destination);

//     //start the oscillator and stop it after two seconds.
//     osc.start();
//     osc.stop(actx.currentTime + 2);

//     const sliderVol = document.querySelector(".volume");

//     sliderVol.addEventListener('input', (e) => {
//         const val = e.target.value;

//         gainNode.gain.setValueAtTime(val, actx.currentTime);
//     })
// })

//This time I would like to try to create a few buttons and make creating oscillators and using them with nodes seperate functions so that it is more scalable.

//this function converts a midi number input into a frequency, this is so that when I add the webAudioMIDI features then it will work with that.
const midiToFreq = (m) => {
    return 2 ** ((m-69)/12) * 440;
}

let actx;

document.getElementById('btn').addEventListener('click', () => {
    actx = new AudioContext();
    if (!actx) throw 'Not Supported';
})


//create an object which stores all the notes and their midi numbers, I'm sure there is a better way of doing this.
const NOTES = {
    'c-4' : 60,
    'c#4' : 61,
    'd-4' : 62,
    'd#4' : 63,
    'e-4' : 64,
    'f-4' : 65,
    'f#4' : 66,
    'g-4' : 67,
    'g#4' : 68,
    'a-4' : 69,
    'a#4' : 70,
    'b-4' : 71,
    'c-5' : 72
};

let osc;

document.querySelectorAll('button[data-note]').forEach((button) => {
    button.addEventListener('mousedown', () => {
        osc = actx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = Math.round(midiToFreq(NOTES[button.dataset.note]));
        osc.connect(actx.destination);
        osc.start();
    });

    button.addEventListener('mouseup', osc.stop(actx.currentTime));
});