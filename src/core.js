import {bindDir} from './constants';
import {containerDir} from './constants';

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

        const bindElements = rootElement.querySelectorAll(`[${bindDir}]`);

        bindElements.forEach(bindElement => {
            if (bindElement.getAttribute(bindDir) === prop) {
                bindings[prop].elements.push(bindElement);
                if (prop) bindElement.value = target[prop];
            }
        });


    }

    const handler = {
        get: function(obj, name) {
            return obj[name];
        },
        set: function(obj, prop, newValue) {
            console.log(`"${prop}" property value changed from "${obj[prop]}" to "${newValue}"`);

            // Стандартная установка нового значения
            obj[prop] = newValue;

            // Обновление привязок
            bindings[prop].boundVal = newValue;
            bindings[prop].elements.forEach(element => {
                element.value = newValue;
            });

            return true;
        }
    };

    const proxy = new Proxy(target, handler);

    // обновление значений при обновлении элементов
    Object.keys(bindings).forEach((bindingValue) => {
        bindings[bindingValue].elements.forEach(bindElement => {
            bindElement.addEventListener('input', (e) => {
                proxy[bindingValue] = e.target.value;
            });
        });
    });

    return proxy;
}