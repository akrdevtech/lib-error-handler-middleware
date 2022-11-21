import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ErrorSource } from './enums/errorSource';
import { HttpStatusCode } from './enums/httpStatusCode';
import { HttpStatusMessage } from './enums/httpStatusMessage';
import { ValidationErrorType } from './interfaces/errorInterfaces';

function getUniqueErrors(errors: Array<ValidationErrorType>) {
    const uniqueArray: Array<ValidationErrorType> = [];
    errors.forEach((error) => {
        if (!uniqueArray.find((uE) => uE.param === error.param)) uniqueArray.push(error);
    });
    return uniqueArray;
}

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    const body = {
        message: err.message ? err.message : err.errorMessage ? err.errorMessage : HttpStatusMessage.INTERNAL_SERVER_ERROR,
        stack: err.stack ? err.stack : '',
        errors: err.errors ? err.errors : [],
        source: err.source ? err.source : ErrorSource.INTERNAL,
        transactionId: req.txId,
    };

    if (body.source === ErrorSource.VALIDATION && body.errors.length) {
        const errorList = getUniqueErrors(body.errors);
        const msg = errorList.reduce(
            (str: string, erroDoc: ValidationErrorType, currentIndex: number, arr: Array<ValidationErrorType>) => {
                if (currentIndex >= arr.length - 1) return str + erroDoc.param + ' - ' + erroDoc.msg;
                else return str + erroDoc.param + ' - ' + erroDoc.msg + ', ';
            },
            '',
        );
        if (msg.length) body.message = msg;
    }

    const status = err.status || err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    res.status(status).send(body);
    next();
};
