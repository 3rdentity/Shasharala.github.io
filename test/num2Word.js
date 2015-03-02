/*
*########
*num2Word
*########
*/
var num2Word = {
    thousandsPlus: [
        "",
        "thousand",
        "million",
        "billion",
        "trillion"
    ],
    digits: [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine"
    ],
    teens:[
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen"
    ],
    twentyPlus: [
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety"
    ],
    conv: function num2Word(num) {
        num = num.toString();
        num = num.replace(/[\, ]/g,""); //get rid of spaces or commas globally
        if (num != parseFloat(num)) return "NAN"; //make sure num is actually a number
        var x = num.indexOf("."); //holds length of num or length/indexOf a decimal point
        if (x == -1) {
            x = num.length;
        }
        if (x > 15) {
            return "The number you have provided is too large";
        }
        var n = num.split(""); //holds num broken into an array of integers
        var res = ""; //holds the result of our conversion
        var rev = false; //is true if current digit has been reviewed already
        if (x === 1 && Number(n[0]) === 0) { //if input is zero there is no need to do very many tests, just return zero
            res += this.digits[0];
            return res;
        }
        else {
            for (var i = 0; i < x; i++) { //convert until we reach a decimal point or the end of n
                if ((x - i) % 3 === 2) { //if x has a remainder of two it must be a teens number, a twentyPlus number, or a zero
                    if (Number(n[i]) === 1) { //if x has a remainder of two and n starts with "1" then n must be a teens number
                        res += this.teens[Number(n[i + 1])] + " "; //find teens number in array by checking number of next digit in n
                        i++; //move i forward one since the teens array contains numbers that cover two digits and we already checked the next digit in n
                        rev = true;
                    }
                    else if (Number(n[i]) !== 0) { //if n is not zero the it must be a twentyPlus number
                        res += this.twentyPlus[Number(n[i]) - 2] + " "; //find twentyPlus number in array by stepping back two since array starts at twenty with an index of zero
                        rev = true;
                    }
                }
                else if (Number(n[i]) !== 0) { //if n is does not have a remainder of two then it must be either a single digit or a hundreds number
                    res += this.digits[Number(n[i])] +" "; //find digit in array
                    if ((x - i) % 3 === 0) res += "hundred "; //if x has no remained then it is a hundreds number. add the word "hundred" after the digit we just added
                    rev = true;
                }
                if ((x - i) % 3 === 1) { //if x has a remainder of one then it must be a thousandsPlus number
                    if (rev === true) { //if n has already been reviewed and must be a thousandsPlus number because of the above text then we may continue
                        res += this.thousandsPlus[(x - (i + 1)) / 3] + " "; //locate what thousandths place is being referenced by taking the length of num and removing (current index + 1)(to account for the zero index in the thousandsPlus array) from it before dividing it by three
                    }
                    rev = false;
                }
            }
            if (x !== num.length) { //if x is the indexOf a decimal point
                var y = num.length;
                res += "point ";
                for (var i = x + 1; i < y; i++) { //i will start at x and move along till it reaches the end of n
                    res += this.digits[Number(n[i])] + " "; //find digit in array
                }
            }
            return res;
        }
    }
};
