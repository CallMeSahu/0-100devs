/*
    Without using setInterval, try to code a counter in Javascript.
*/

let count = 0;

function updateTime(){
    console.log(count);
    count++;
    setTimeout(updateTime, 1000);
}

updateTime();