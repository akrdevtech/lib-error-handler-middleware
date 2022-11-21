export interface ValidationErrorType {
  location: string;
  msg: string;
  param: string;
  value?: string;
}