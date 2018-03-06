//全局常量设置

let bindToGlobal = (obj, key='_const') => {
    if (typeof window[key] === 'undefined') {
        window[key] = {};
    }
    
    for (let i in obj) {
        window[key][i] = obj[i]
    }
}


const http = {
	PORT : "http://localhost:8081/"
}

bindToGlobal(http, '_HTTP');

