/**
 * 
 * @name: yuploader
 * @description: for libaray
 * @repository: 
 * @author: lhlyu
 * @version: 0.0.1-test.1
 * @time: 12/6/2020, 11:36:41 PM
 * 
 */

'use strict';

function sum(a, b) {
  console.log(a, b, a + b);
  console.log('hello');
  return a + b;
}

sum(1, 2);
sum(2, 4);
sum(3, 4);
document.querySelector('#app').innerHTML = sum(22, 0);