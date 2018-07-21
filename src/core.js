const bindings = {

};


export default function Observed(target) {

    //init
    for (let prop of Object.keys(target)) {
        var element = document.getElementById(prop);
        
        if (prop) element.value = target[prop];
        Object.defineProperty(bindings, prop, {value: element});
    }

    const handler = {
        get: function(obj, name) {
            return obj[name];
        },
        set: function(obj, prop, newValue) {
            console.log(`Значение свойства ${prop} изменилось с ${obj[prop]} на ${newValue}`);

            // Стандартная установка нового значения
            obj[prop] = newValue;
            bindings[prop].value = newValue;
            return true;
        }
    };
    return new Proxy(target, handler);
}