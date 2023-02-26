export function isEmailAddress(str) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  // returns a boolean
}


export function convertSlugFromStr(value){
    return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}