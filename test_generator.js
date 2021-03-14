let Array0to20 = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
let ArrayDecimal = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
let ArrayHundred = ['hundred'];

function toReadable (number) {

    function number0to99 (number) {
        if (number <= 20) {
        return Array0to20[number];
        }
        if (number > 20 && number < 100) {
            let decimal = Math.floor(number/10);
            if (number%10===0) {
                return ArrayDecimal[decimal-2];
            }
            else {
                return (ArrayDecimal[decimal-2] + '-' + Array0to20[number%10]);
            }
        }
    }

    function number100to999 (number) {
        if (number === 100) {
            return (Array0to20[1] + ' ' + ArrayHundred[0]);
        }
        if (number%100 === 0) {
            let hundred = Math.floor(number/100);
            return (Array0to20[hundred] + ' ' + ArrayHundred[0]);
        }
        if (number > 100 && number < 1000) {
            let hundred = Math.floor(number/100);
            number = number.toString().slice(-2);
            number = parseInt(number, 10);
            return (Array0to20[hundred] + ' ' + ArrayHundred[0] + ' ' + number0to99(number));
        }
    } 
    
    if (number < 100) {
        return number0to99(number);
    }
    
    if (number >= 100 && number < 1000) {
        return number100to999(number);
    }
}

var fs = require('fs');
var stream = fs.createWriteStream("test.js");
stream.once('open', function(fd) {
    for (let i = 0; i < 1000; i++) {
        stream.write("it('Should return \\'"+toReadable(i)+"\\' when "+i+" given', () => {\n");
        stream.write("const readable = toReadable("+i+");\n");
        stream.write("assert.equal(readable, '"+toReadable(i)+"');\n");
        stream.write("});\n");
        stream.write("\n");
    }
    stream.end();
});
