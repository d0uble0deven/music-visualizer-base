const audio = document.getElementById('audio');
console.log('audio: ', audio);

const canvas = document.getElementById('canvas');
console.log('canvas: ', canvas);
const ctx = canvas.getContext('2d');

// Resize the canvas to fill the browser window dynamically
canvas.width = window.innerWidth / 4;
canvas.height = window.innerHeight / 4;

// Uncomment if accessing the audio file from a different domain
// audio.crossOrigin = "anonymous";

audio.addEventListener('play', () => {
    console.log('Start button clicked, audio started playing');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log('audioContext: ', audioContext);
    
    const audioSource = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const timeDomainDataArray = new Uint8Array(bufferLength);
    const frequencyDataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);

        // Clear the canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Retrieve time domain data for waves
        analyser.getByteTimeDomainData(timeDomainDataArray);

        // Debugging: Log time domain data
        // console.log('timeDomainDataArray: ', timeDomainDataArray);

        // Draw the waves
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(0, 255, 255)";
        ctx.beginPath();

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = timeDomainDataArray[i] / 128.0;
            const y = v * (canvas.height / 2);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Retrieve frequency data for bars
        analyser.getByteFrequencyData(frequencyDataArray);

        // Debugging: Log frequency data
        // console.log('frequencyDataArray: ', frequencyDataArray);

        // Draw the bars
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = frequencyDataArray[i];
            // console.log(frequencyDataArray)
            // console.log(barHeight)
            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            ctx.fillRect(x, canvas.height - 100 / 2, barWidth, 100 / 2);

            
            // ctx.fillRect(x, barHeight, barHeight - canvas.height / 2, barWidth / 2);
            // ctx.fillRect(x, barHeight, barWidth / 2, barHeight - canvas.height / 2);
            // ctx.fillRect(barHeight, barWidth / 2, x, barHeight - canvas.height / 2);
            // ctx.fillRect(canvas.height - barHeight / 2, barWidth, barHeight / 2, x);

            x += barWidth + 1;
        }
    }

    // Call the combined draw function
    draw();
});















// const audio = document.getElementById('audio');
// console.log('audio: ', audio)
// // audio.crossOrigin = "anonymous";
// const canvas = document.getElementById('canvas');
// console.log('canvas: ', canvas)
// const ctx = canvas.getContext('2d');

// // Resize the canvas to fill the browser window dynamically
// canvas.width = window.innerWidth/4;
// canvas.height = window.innerHeight/4;

// // Set the audio source to use the proxy server
// // audio.src = 'file:///Users/devgovindji/CodeBases/r3f-projects/music-visualizer/public/file_example_MP3_5MG.mp3';
// // audio.src = 'public/file_example_MP3_5MG.mp3';
// // audio.src = 'https://file-examples.com/storage/fedab560656679c849d6def/2017/11/file_example_MP3_5MG.mp3';
// // audio.src = 'http://localhost:3000/proxy?url=https://example.com/your-audio-file.mp3';

// audio.addEventListener('play', () => {
//     console.log('play - audio: ', audio)
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     console.log('audioContext: ', audioContext)
//     const audioSource = audioContext.createMediaElementSource(audio);
//     const analyser = audioContext.createAnalyser();

//     audioSource.connect(analyser);
//     analyser.connect(audioContext.destination);

//     analyser.fftSize = 2048;
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     function drawWaves() {
//         const drawVisual = requestAnimationFrame(drawWaves);
//         analyser.getByteTimeDomainData(dataArray);

//         ctx.fillStyle = "rgb(200 200 200)";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.lineWidth = 2;
//         ctx.strokeStyle = "rgb(0 0 0)";
//         ctx.beginPath();

//         const sliceWidth = canvas.width / bufferLength;
//         let x = 0;

//         for (let i = 0; i < bufferLength; i++) {
//             const v = dataArray[i] / 128.0;
//             const y = v * (canvas.height / 2);
          
//             if (i === 0) {
//                 ctx.moveTo(x, y);
//             } else {
//                 ctx.lineTo(x, y);
//             }
          
//             x += sliceWidth;
//         }

//         ctx.lineTo(canvas.width, canvas.height / 2);
//         ctx.stroke();
//     }


//     drawWaves()


//     function drawBars() {
//         console.log('drawBars')
//         requestAnimationFrame(drawBars);
        
//         analyser.getByteFrequencyData(dataArray);

//         ctx.fillStyle = '#000';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         const barWidth = (canvas.width / bufferLength) * 2.5;
//         let barHeight;
//         let x = 0;

//         for (let i = 0; i < bufferLength; i++) {
//             barHeight = dataArray[i];
//             ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
//             ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

//             x += barWidth + 1;
//         }
        
//     }

//     drawBars();

    
// });
