var audio, context, file, analyser, canvas, ctx, center_x, center_y;

file = document.getElementById("file");
audio = document.getElementById("audio");

file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;
    frequency_array = new Uint8Array(analyser.frequencyBinCount);
    audio.play();
    animationLooper();
}

function animationLooper() {

    canvas = document.getElementById("renderer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");

    center_x = canvas.width/2;
    center_y = canvas.height/2;
    radius = 150;

    var rads = Math.PI*2/90;
    var colors = ["#660000","#990000","#CC0000","#FF0000","#CC3333","#FF6666","#FF9999","#FFCCCC","#FFCC99","#FF9966","#FF6633","#FF6600","#FF3300","#CC3300","#993300","#663300","#996633","#CC9900","#FFCC00","#FFFF00","#FFFF33","#FFFF66","#FFFF99","#FFFFCC","#CCFFCC","#99FF99","#66FF66","#00FF00","#00CC00","#009900","#006600","#003300","#003333","#336666","#006666","#009999","#00CCCC",
"#66CCCC","#66FFCC","#99FFCC","#CCFFFF","#99FFFF","#00FFFF","#00CCFF","#0099FF","#0066FF","#0033FF","#003399","#000066","#000099","#0000CC","#0000FF","#3366FF","#3399FF","#66CCFF","#99CCFF","#CCCCFF","#9999FF","#9966FF","#9933FF","#9900CC","#663399","#660099","#330066","#660066","#990066","#CC0099","#FF0099","#FF00FF","#FF66FF","#FF99FF","#FFCCFF"];
    console.log(colors.length);

    analyser.getByteFrequencyData(frequency_array);
    console.log(frequency_array);
    for(var i=0; i<90; i++) {

        var bar_height = frequency_array[i]*0.5;
        /*if(i<10) {
            bar_height *= 0.5
        }*/
        console.log(frequency_array[i]);

        var x = center_x + Math.cos(rads*i)*radius;
        var y = center_y + Math.sin(rads*i)*radius;
        var xe = center_x + Math.cos(rads*i)*(radius + bar_height);
        var ye = center_y + Math.sin(rads*i)*(radius + bar_height);
        
        var color = colors[Math.floor(i/90*72)];//colors[Math.floor(Math.random()*72)];

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI*2, true);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xe, ye);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI*2, true);
        ctx.fill();
    }
    window.requestAnimationFrame(animationLooper);

}