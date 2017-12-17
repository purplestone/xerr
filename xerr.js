(function (xerr) {
	if('object'==typeof exports && 'undefined'!=typeof module)
	  module.exports = xerr;
	else if('function'==typeof define&&define.amd)
	  define([],xerr);
	else if ('undefined'!=typeof window) {
		window.xerr = xerr;
	}else if ('undefined'!=typeof global) {
		global.xerr = xerr;
	}
})((function (Err) {
	var c;
	if (Err.__ERROR__ || Err.__XERR__) {
		c = Err.__XERR__ || Err;
	}else{
		var set = function (o, k, v) {
			if (Object.defineProperty) {
				Object.defineProperty(o, k, {
					value: v
				});
			}else{
				o[k] = v;
			}
		};
		var rmOrg = function (s) {
			(s = s.split('\n')).splice(1,1);
			return s.join('\n');
		}
		var c = function  XERR(msg) {
			var e = new Err(msg);
			var err = arguments[1];
			var data = arguments[2];
			if ({}.toString.call(arguments[1]) === '[object Object]') {
				data = arguments[1];
				err = arguments[2];
			}
			if ({}.toString.call(data) === '[object Object]') {
				for (var k in data) {
					set(e, k, data[k]);
				}
			}
			try {
				e.stack = rmOrg(e.stack);
			} catch (err) {}
			if(err) {
				try {
					e.stack = [e.stack, err.stack].join('\n');
					set(e, 'stacks', [e].concat(err.stacks || err));
				} catch (err) {} 
			}
			return e;
		};
		c.prototype = Err.prototype;
		if (c.__proto__) {
			c.__proto__ = Err;
		}else{
			c.captureStackTrace = Err.captureStackTrace;
			c.stackTraceLimit = Err.stackTraceLimit;
		}
		set(Err, '__XERR__', c);
		set(c, '__ERROR__', Err);
		set(c, 'getNativeError', function () {
			return Err;
		});

	}
	return c;
}(Error)));







