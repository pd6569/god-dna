/**
 * Created by peter on 09/08/2017.
 */


var binaryCode = [];
var seqLoaded;
var currentFrame = 0;

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        seqLoaded = true;
        var contents = e.target.result;
        for (i = 0; i < contents.length ; i++) {
            if (contents.charAt(i) == 'A') binaryCode.push(0);
            if (contents.charAt(i) == 'C') binaryCode.push(0);
            if (contents.charAt(i) == 'G') binaryCode.push(1);
            if (contents.charAt(i) == 'T') binaryCode.push(1);
        }
        console.log("binary code: ", binaryCode);
        convertBinaryToAscii();
    };
    reader.readAsText(file);
}

function convertBinaryToAscii() {
    console.log("convertBinaryToAscii");
    var tempBinaryChar = "";
    var ascii = "";
    for (var i = 0; i < binaryCode.length ; i++) {
        tempBinaryChar += binaryCode[i];
        if (tempBinaryChar.length % 8 === 0) {
            ascii += String.fromCharCode(parseInt(tempBinaryChar, 2));
            tempBinaryChar = "";
        }
    }
    displayAscii(ascii);
}

function displayAscii(ascii){
    var frameShiftCount = document.getElementById('frameShift');
    var element = document.getElementById('binaryContainer');
    frameShiftCount.textContent = currentFrame;
    element.textContent = ascii;
}

function frameShift(){
    console.log("frameShift: ", currentFrame);
    if (!seqLoaded) return alert("File not loaded");
    if (binaryCode){
        currentFrame++;
        binaryCode.shift();
        convertBinaryToAscii();
    }
}

document.getElementById('file-input').addEventListener('change', readSingleFile, false);
document.getElementById('frameShiftBtn').addEventListener('click', frameShift, false);