import { ErrorSource } from '../enums/errorSource';
import { HttpStatusCode } from '../enums/httpStatusCode';
import { BaseError } from './BaseError';

export class InvalidArgumentError extends BaseError {
  constructor(message: string) {
    super(ErrorSource.INTERNAL, message);
    this.statusCode = HttpStatusCode.FORBIDDEN;
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}
