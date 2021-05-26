function isValid(regex: string): boolean {
    let isValid = true;
    try {
        new RegExp(regex);
    } catch (e) {
        console.log(e.message);
        isValid = false;
    }

    return isValid;
}

export { isValid };
