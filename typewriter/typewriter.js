/*
MIT License

Copyright (c) 2018 Amit Kumar Gupta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
var speed = 120;
var interval = 2000;
var delay = 100;

var typingSpeedArr = [];
var deleteSpeedArr = [];

var rotate = true;
var shouldDelete = true;

var targetEl = $("#typetext");

var deleteText = function() {
    var txt = targetEl.text();
    if(txt.length === 0){
        typeNext();
    }else{
        txt = currentLine().substring(0, txt.length - 1);
        targetEl.text(txt);
        setTimeout(function() {
            deleteText();
        }, deleteSpeedArr[ currentLineIndex ]);
    }
};

var typeText = function() {
    var txt = targetEl.text();
    var cLine = currentLine();
    if(cLine){
        if(txt.length === cLine.length){
            if(shouldDelete){
                setTimeout(function() {
                    deleteText();
                }, interval);
            }else{
                typeNext();
            }
        }else{
            txt = cLine.substring(0, txt.length + 1);
            targetEl.text(txt);
            setTimeout(function() {
                typeText();
            }, typingSpeedArr[ currentLineIndex ] );
        }
    }
};

var currentLineIndex = 0;

function nextLine(){
    return lines[ currentLineIndex++ ];
}

function currentLine(){
    if(currentLineIndex === lines.length){
        if(rotate) currentLineIndex = 0;
        else return;
    }
    return lines[ currentLineIndex ];
}

function startTyping() {

    for(var i = 0; i < lines.length; i++){
        var line = lines[i];
        typingSpeedArr.push( speed - line.length );
        if( typingSpeedArr[i] < 1 ) typingSpeedArr[i] = 2;

        deleteSpeedArr.push( (speed / 2)  - line.length );
        if( deleteSpeedArr[i] < 1 ) deleteSpeedArr[i] = 2;
    }
    typeNext();
};


function typeNext(){
    var line = nextLine();
    line && (
        setTimeout(function() {
            targetEl.text('');
            typeText() ;
        }, interval)
    );
}

var lines = [ 'abc', 'xyz', 'mno' ];

setTimeout(startTyping, delay);
