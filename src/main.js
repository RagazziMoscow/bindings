import Observed from './core';

window.data = Observed({
    name: 'cekavo',
    country: 'Italy'
});

console.log(data);
console.log(data.name);

window.data.name = 'Ljupco';
window.data.country = 'od Italija';

/*
* Proxy
* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy
*/

/**
 * defiune props
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty 
 */

 /**
  * webpack source maps
  * https://webpack.js.org/configuration/devtool/
  */
