# Xerr
A better Error constructor can push errors into stack.


## Getting Started 
Install : ``npm i xerr``


## Examples

```javascript

try {
	Object.bad();
} catch (err) {
	console.log( Error('call bad', err) );
	// JS native Error constructor show message only 'call bad'
}

Error = require('xerr');
console.log('\n=== After use xerr ===\n');

try {
	Object.bad();
} catch (err) {
	console.log( new Error('call bad', err) );
	// Show stacks 'call bad' & 'Object.bad is not a function' after used xerr
}


```



## Other features

```javascript

Error = require('xerr');

try {
	
	try {Object.bad();} catch (err) {
		throw new Error('call bad', err, {
			name: 'ServerError',
			data: 'Other info'
		});
	}

} catch (err) {
	var error = Error('a error', err);
	console.log('err.data: ', err.data);
	console.log('error: ', error);
	console.log('error.stacks: ', error.stacks);
}


```

## API
``var NativeError = Error``

``var Xerr = Error = require('xerr')``

``var err = Error(stringMessage, objectError, objectOpt)`` // Return a objectError

``var err = Error(stringMessage, objectOpt)``

``var err = Error(stringMessage, objectError)``

``var err = Error(stringMessage)``

``var err = new Error(stringMessage)``

``err.stack`` // A better stack string that had all stack of objectErrors

``err.stacks`` // A array filled by objectErrors

``err[key]`` // Keys from objectOpt

``throw err``

``Xerr.__ERROR__`` // JS native Error constructor

``NativeError.__XERR__`` // Xerr constructor

## license
ISC