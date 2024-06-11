/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    str = str.toLowerCase().replace(" ", '');
    let vowels = 0;
    for(const letter of str){
      if(letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'){
        vowels += 1;
      }
    }
    return vowels;
}

module.exports = countVowels;