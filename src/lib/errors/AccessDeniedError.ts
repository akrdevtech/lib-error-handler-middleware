import { ErrorSource } from '../enums/errorSource';
import { HttpStatusCode } from '../enums/httpStatusCode';
import { BaseError } from './BaseError';

export class AccessDeniedError extends BaseError {
  constructor(message: string) {
    super(ErrorSource.INTERNAL, message);
    this.statusCode = HttpStatusCode.UNAUTHORIZED;
    Object.setPrototypeOf(this, AccessDeniedError.prototype);
  }
}
