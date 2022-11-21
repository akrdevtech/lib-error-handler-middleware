import { ErrorSource } from '../enums/errorSource';
import { BaseError } from './BaseError';

export class ConfigurationError extends BaseError {
  constructor(message: string) {
    super(ErrorSource.CONFIGURATION, message);
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}
