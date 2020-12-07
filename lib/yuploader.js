/**
 * 
 * @name: yuploader
 * @description: for image upload
 * @repository: https://github.com/lhlyu/yuploader
 * @author: lhlyu
 * @version: 0.0.1-test.5
 * @time: 12/7/2020, 10:39:28 AM
 * 
 */

'use strict';

function sum(a, b) {
  console.log(a, b, a + b);
  console.log('hello');
  return a + b;
}

sum(1, 11);
sum(2, 4);
sum(3, 4);
document.querySelector('#app').innerHTML = sum(22, 0);
module.exports = {
  sum: sum
};
