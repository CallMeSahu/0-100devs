/*
    Can you make it so that it updates every second, and shows time in the following formats - 
    - HH:MM::SS (Eg. 13:45:23)
    - HH:MM::SS AM/PM (Eg 01:45:23 PM)
*/

function updateTime(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const time24Hrs = `${hours}:${minutes}:${seconds}`;
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const hours12Hrs = hours % 12 || 12;
    const time12Hrs = `${hours12Hrs}:${minutes}:${seconds} ${amPm}`;

    console.log(time24Hrs);
    console.log(time12Hrs);
}

const myInterval = setInterval(updateTime, 1000);