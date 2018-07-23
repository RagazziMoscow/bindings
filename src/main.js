import Bindings from './core';

window.data = Bindings({
    name: 'Ilya',
    country: 'Italy'
});

console.log(data);
console.log(data.name);
console.log(data.country);

window.data.name = 'Marko';
window.data.country = 'di Mosca';

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
