var __Error__ = Error;

var xerr = require('./xerr');
var assert = require('assert');

assert.ok(xerr !== Error, 'XERR diff Error');
assert.ok(Error === __Error__, 'Error be clean');

Error = xerr;

assert.strictEqual(xerr, Error, 'XERR instead Error');
assert.ok(Error !== __Error__, 'Error be Invaded');


function f4() {
	try {
		f4.a();
	} catch (err) {
		throw Error('f4 throw');
	}
}

function f3() {
	try {
		f4();
	} catch (err) {
		throw new Error('f3 call f4 err', err, {
			name: 'F3Error'
		});
	}
	
}

function f2() {
	try {
		f3();
	} catch (err) {
		var e = new Error('f2 call f3 err', {
			name: 'F2Error'
		});
		throw e;
	}
	
}

Error('test');

assert.throws(()=>{
		f4();
	},
	(err)=>{
		var s = err.stack.split('\n');
		var sL = s.splice(1,1)[0];
		return sL.trim() === 'at f4 (D:\\GitHub\\xerr\\test.js:19:9)';
	},
	'not show XERR line'
);


assert.throws(()=>{
		f3();
	},
	(err)=>{
		var s = err.stack.toString();
		return !!~s.indexOf('f4 throw');
	},
	'f3 stack has f4 err'
);


assert.throws(()=>{
		f2();
	},
	(err)=>{
		var s = err.name === 'F2Error';
		return s;
	},
	'discriminate args 2 is obj'
);


Error = xerr.__ERROR__;
assert.ok(xerr !== __Error__, 'XERR diff Error');
assert.ok(Error === __Error__, 'Error be clean');


assert.throws(()=>{
		f3();
	},
	(err)=>{
		var s = err.stack.toString();
		return !~s.indexOf('f4 throw');
	},
	'f3 stack not has f4 err'
);


var xerr2 = require('./xerr');
assert.ok(xerr2 !== Error, 'XERR diff Error');
assert.ok(Error === __Error__, 'Error be clean');
assert.ok(xerr === xerr2, 'req be xerr');

for (let i in require.cache) {
	delete require.cache[i];
}

var clearBack = require('./xerr');

assert.ok(xerr2 !== Error, 'XERR diff Error');
assert.ok(Error === __Error__, 'Error be clean');
assert.ok(clearBack === xerr2, 'clearBack be xerr');


var xerr3 = Error.__XERR__;

assert.strictEqual(xerr3, xerr, 'XERR instead Error');

xerr.__ERROR__ = 'bad';

assert.strictEqual(xerr.__ERROR__, __Error__, '__ERROR__ is Error');

console.log('test ok !');