import { containerDir } from './constants';
import { bindDir } from './constants';
import { ifDir } from './constants';

const directives = [bindDir, ifDir];

const bindings = {

};

//initizlize
export default function Bindings(target) {

    const rootElement = document.querySelector(`[${containerDir}]`);

    for (let prop of Object.keys(target)) {

        Object.defineProperty(bindings, prop, {
            value: {
                boundVal: target[prop],
                elements: []
            },
            enumerable: true
        });

        const selectors = directives.map((dir) => `[${dir}]`).join(',');
        const bindElements = rootElement.querySelectorAll(selectors);

        bindElements.forEach(bindElement => {

            if (bindElement.getAttribute(bindDir) === prop || bindElement.getAttribute(ifDir) === prop) {
                bindings[prop].elements.push(bindElement);

                if (prop === bindDir) { 
                    bindElement.value = target[prop];
                }
            }
        });


    }

    const handler = {
        get: function(obj, name) {
            return obj[name];
        },
        set: function(obj, prop, newValue) {
            console.log(`"${prop}" property value changed from "${obj[prop]}" to "${newValue}"`);

            // standart installing the new value
            obj[prop] = newValue;

            // bindings updating
            bindings[prop].boundVal = newValue;
            bindings[prop].elements.forEach(element => {
                if (element.hasAttribute(`${bindDir}`)) {
                    element.value = newValue;
                }

                if (element.hasAttribute(`${ifDir}`)) {
                    element.style.display = (newValue) ? "block" : "none";
                }
            });

            return true;
        }
    };

    const proxy = new Proxy(target, handler);

    // values updating by elements updating
    Object.keys(bindings).forEach((bindingValue) => {
        bindings[bindingValue].elements.forEach(bindElement => {
            bindElement.addEventListener('input', (e) => {
                proxy[bindingValue] = e.target.value;
            });
        });
    });

    return proxy;
}