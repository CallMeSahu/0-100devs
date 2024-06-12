/*
    Using the fs library again, try to write to the contents of a file. You can use the fs library to as a black box, the goal is to understand async tasks.
*/

const fs = require('fs');

const writeToFileAsync = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf-8', (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve();
            }
        })
    })
}

const writeFile = async(path, data) => {
    try{
        await writeToFileAsync(path, data);
        console.log('Write complete!');
    }
    catch(err){
        console.error(err);
    }
}

const sampleData = 'Hi my name is Siddhartha!';
writeFile('./a.txt', sampleData);
console.log('After file write function is called.');