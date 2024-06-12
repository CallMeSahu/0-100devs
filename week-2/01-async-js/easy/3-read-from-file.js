/*
    Write code to read contents of a file and print it to the console. 
    You can use the fs library to as a black box, the goal is to understand async tasks. 
    Try to do an expensive operation below the file read and see how it affects the output. 
    Make the expensive operation more and more expensive and see how it affects the output.
*/

const fs = require('fs');

const readFileAsync = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if(err){
                console.error(err);
            }
            else{
                console.log(data);
            }
        })
    })
}

const readFileWithExpense = async(path) => {
    try{
        const data = await readFileAsync(path);
        console.log('File Content: ', data);
        let sum = 0;
        for(let i=0; i<=1000; i++){
            sum += i;
        }
    }
    catch(err){
        console.error(err)
    }
}

readFileWithExpense('./a.txt');
console.log('After file read function is called.')