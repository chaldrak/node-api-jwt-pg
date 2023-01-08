const jwtDecode = (token, options) =>{
    options = options || {};
    var pos = options.header == true ? 0 : 1;
    try {
        return JSON.parse(atob(token.split(".")[pos]));
    } catch (e) {
        console.log(e.message);
    }
}

export {jwtDecode};