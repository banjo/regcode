import { logger } from "../config/logger";

function isValid(regex: string): boolean {
    /* tslint:disable */
    try {
        new RegExp(regex);
        return true;
    } catch (e) {
        logger.log(e.message);
        return false;
    }
    /* tslint:enable */
}

export { isValid };
