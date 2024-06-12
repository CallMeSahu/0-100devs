/*
    Code a counter in Javascript, It should go up as time goes by in intervals of 1 second.
*/

let count = 0;

const updateTime = () => {
    console.log(count);
    count++;
}

const timer1 = setInterval(updateTime, 1000);