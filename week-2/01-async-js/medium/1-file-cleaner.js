/*
    Read a file, remove all the extra spaces and write it back to the same file.
*/

const fs = require('fs');

const removeExtraSpaces = (data) => {
    return data.replace(/\s+/g , ' ');
}

const rectifyFileContent = async(path) => {
    try {
        let data = await fs.promises.readFile(path, 'utf-8');
        data = removeExtraSpaces(data);
        await fs.promises.writeFile(path, data, 'utf-8');
        console.log('File Rectified!');
    } catch (err) {
        console.error(err)
    }
}

rectifyFileContent('./a.txt');
console.log('After rectify file function is called.')