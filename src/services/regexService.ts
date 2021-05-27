import { logger } from "../config/logger";

function isValid(regex: string): boolean {
    let isValid = true;
    try {
        new RegExp(regex);
    } catch (e) {
        logger.log(e.message);
        isValid = false;
    }

    return isValid;
}

export { isValid };
