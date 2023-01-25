export function checkPhoneNumber(num) {
    let phoneNo = /^\+(?:[0-9] ?){6,14}[0-9]$/
    return !!num.match(phoneNo);
}