export const filterArray = (arr, filter, exist) => {
    return arr.filter(item => filter.includes(item.id));
}

export const setState = (res) => {
    let store = {};
    store.spec = [...(new Set(res.map(item =>  item.employee.spec)))].map((item, ind) => ({name: item, id: ind+1}));
    store.medic = res.map(item => ({name: item.employee.name, id: item.employee.id, time: item.time, spec: item.employee.spec}));
    return store;
}

export const timeArrays = (medics) => {
    let need = [];
    medics.forEach((elem, ind) => {
        elem.time.flat().forEach((t, index) => {
            let obj = {
                id: ind.toString() + index.toString(),
                metaName: t.replace(' ', 'T'),
                name: t.slice(0, t.length - 3) + ' ' + elem.name,
                time: t.slice(0, t.length - 3),
                medic: {
                    id: elem.id,
                    name: elem.name
                }
            }
            need.push(obj);
        })
    });
    return need;
}

export const checkFields = (fields, texts, send, type) => {
    let requiredEmptyTexts = texts.filter(item => !send[item.name] && item.required);
    let requiredEmptyFields;
    if (type === 'sign') {
        requiredEmptyFields = fields.filter(item => !send[item.name] && item.required);
    } else {
        requiredEmptyFields = fields.filter(item => !send[item.name] && item.required && item.required!=='sign');
    }
    if (requiredEmptyFields.length || requiredEmptyTexts.length) {
        return [requiredEmptyFields, requiredEmptyTexts];
    } else {
        return false;
    }   
}

export const createPostObject = (send, type) => {
    let d = new Date();
    let str = ( d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":00");
    let need = {
        ...send,
        clinic: send.clinic.id,
        medic: send.medic ? send.medic.id : null,
        spec: send.spec.name,
        dateTime: send.dateTime ? send.dateTime.metaName : str,
        today: send.dateTime ? send.dateTime.metaName : str,
        type
    };
    debugger
    return need
}