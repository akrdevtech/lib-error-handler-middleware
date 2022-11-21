
# Express Global Error Handler Middleware
## Description
A custom error handler middleware for ExpressJS applications with TS.
-   TypeScript support.
- Generic Error Support
## Quick Links

-   [Example Usage (TypeScript)](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Example-Usage-typescript)
-   [Example Usage (JavaScript)](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Example-Usage-javascript)
- [Generic Error Support](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Generic-Error-Support) 
	- [Generic Error Support Usage Example ](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Example-Generic-Error-Support-Usage)
- [Custom Error Support](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Custom-Error-Support) 
	- [Define Custom Errors](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Define-Custom-Errors) 
	- [Custom Error Support Usage Example](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Custom-Generic-Error-Support-Usage)

## Usage
### Install
```sh
npm i @akrdevtech/lib-error-handler-middleware
```
### [](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Example-Usage-typescript) Example Usage (TypeScript)

```js script
import * as express from 'express'
import { errorHandler } from  '@akrdevtech/lib-error-handler-middleware';

const app = express()

app.get('/', (req, res) => { res.send(`Hello World!`) } );
// your app routes goes here ... 

app.use(errorHandler)

const port = 8000;
app.listen(port, () => {console.log(`⚡️ Service started : PORT → ${port}}`);
```
### [](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Example-Usage-javascript) Example Usage (JavaScript)
```js script
const app = require('express')()
const { errorHandler } = require('@akrdevtech/lib-error-handler-middleware');

app.get('/', (req, res) => { res.send(`Hello World!`) } );
// your app routes goes here ... 

app.use(errorHandler)

const port = 8000;
app.listen(port, () => {console.log(`⚡️ Service started : PORT → ${port}}`);
```

## [](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Generic-Error-Support) Generic Error Support
Make use of the common generic errors that are shipped with this package to handle some common error scenarios in the application. Some of them are as follows...

- `BaseError` - Implement your custom error extending this base
- `NotFoundError`
- `DatabaseError`
- `InternalError`
- `ValidationError`
- `AccessDeniedError` 
- `ConfigurationError`
- `InvalidArgumentError`
- `RequestValidationMiddlewareError`
### [](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Example-Generic-Error-Support-Usage)Generic Error Support Usage Example

```js script
const app = require('express')()
const { 
	errorHandler,
	ConfigurationError 
} = require('@akrdevtech/lib-error-handler-middleware');

app.get('/', (req, res, next) => { 
  try {
      exampleService();
      res.send(`Hello World!`)
    } catch (error) {
      next(error)
    } 
});
// your app routes goes here ... 

const exampleService = () =>{
	// throwing custom errors
	throw new ConfigurationError('Some configuration error message')
}

app.use(errorHandler)

const port = 8000;
app.listen(port, () => {console.log(`⚡️ Service started : PORT → ${port}}`);
```
## [](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Custom-Error-Support) Custom Error Support
Define you own custom errors by extending the BaseError in the package.

### [](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Define-Custom-Errors) Define Custom Errors
```js script
import { 
  ErrorSource,
  HttpStatusCode,
  BaseError 
} from '@akrdevtech/lib-error-handler-middleware';

export class MyCustomError extends BaseError {
  constructor(message: string) {
    super(ErrorSource.INTERNAL, message);
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    Object.setPrototypeOf(this, MyCustomError.prototype);
  }
}
```

### [](https://www.npmjs.com/package/@akrdevtech/lib-error-handler-middleware#Custom-Generic-Error-Support-Usage)Custom Error Support Usage Example

```js script
import * as express from 'express'
import { errorHandler } from  '@akrdevtech/lib-error-handler-middleware';
import { MyCustomError } from '../path/to/custom/error/file';

const app = express()

app.get('/', (req, res, next) => { 
  try {
      exampleService();
      res.send(`Hello World!`)
    } catch (error) {
      next(error)
    } 
});
// your app routes goes here ... 

const exampleService = () =>{
	// throwing custom errors
	throw new MyCustomError('Some configuration error message')
}

app.use(errorHandler)

const port = 8000;
app.listen(port, () => {console.log(`⚡️ Service started : PORT → ${port}}`);
```