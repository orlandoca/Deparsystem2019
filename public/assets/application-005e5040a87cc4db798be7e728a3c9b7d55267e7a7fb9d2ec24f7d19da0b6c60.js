/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  window.nested_form_fields || (window.nested_form_fields = {});

  nested_form_fields.bind_nested_forms_links = function() {
    $('body').off("click", '.add_nested_fields_link');
    $('body').on('click', '.add_nested_fields_link', function(event, additional_data) {
      var $child_templates, $link, $parsed_template, $template, added_index, association_path, index_placeholder, object_class, target, template_html;
      $link = $(this);
      object_class = $link.data('object-class');
      association_path = $link.data('association-path');
      added_index = $(".nested_" + association_path).length;
      $.event.trigger("fields_adding.nested_form_fields", {
        object_class: object_class,
        added_index: added_index,
        association_path: association_path,
        additional_data: additional_data
      });
      if ($link.data('scope')) {
        $template = $(($link.data('scope')) + " #" + association_path + "_template");
      } else {
        $template = $("#" + association_path + "_template");
      }
      target = $link.data('insert-into');
      template_html = $template.html();
      index_placeholder = "__" + association_path + "_index__";
      template_html = template_html.replace(new RegExp(index_placeholder, "g"), added_index);
      template_html = template_html.replace(new RegExp("__nested_field_for_replace_with_index__", "g"), added_index);
      $parsed_template = $(template_html);
      $child_templates = $parsed_template.closestChild('.form_template');
      $child_templates.each(function() {
        var $child;
        $child = $(this);
        return $child.replaceWith($("<script id='" + ($child.attr('id')) + "' type='text/html' />").html($child.html()));
      });
      if (target != null) {
        $('#' + target).append($parsed_template);
      } else {
        $template.before($parsed_template);
      }
      $parsed_template.trigger("fields_added.nested_form_fields", {
        object_class: object_class,
        added_index: added_index,
        association_path: association_path,
        event: event,
        additional_data: additional_data
      });
      return false;
    });
    $('body').off("click", '.remove_nested_fields_link');
    return $('body').on('click', '.remove_nested_fields_link', function() {
      var $link, $nested_fields_container, delete_association_field_name, delete_field, object_class, removed_index;
      $link = $(this);
      if (!$.rails.allowAction($link)) {
        return false;
      }
      object_class = $link.data('object-class');
      delete_association_field_name = $link.data('delete-association-field-name');
      removed_index = parseInt(delete_association_field_name.match('(\\d+\\]\\[_destroy])')[0].match('\\d+')[0]);
      $.event.trigger("fields_removing.nested_form_fields", {
        object_class: object_class,
        delete_association_field_name: delete_association_field_name,
        removed_index: removed_index
      });
      $nested_fields_container = $link.parents(".nested_fields").first();
      delete_field = $nested_fields_container.find("input[type='hidden'][name='" + delete_association_field_name + "']");
      if (delete_field.length > 0) {
        delete_field.val('1');
      } else {
        $nested_fields_container.before("<input type='hidden' name='" + delete_association_field_name + "' value='1' />");
      }
      $nested_fields_container.hide();
      $nested_fields_container.find('input[required]:hidden, select[required]:hidden, textarea[required]:hidden').removeAttr('required');
      $nested_fields_container.trigger("fields_removed.nested_form_fields", {
        object_class: object_class,
        delete_association_field_name: delete_association_field_name,
        removed_index: removed_index
      });
      return false;
    });
  };

  $(document).on("page:change turbolinks:load", function() {
    return nested_form_fields.bind_nested_forms_links();
  });

  jQuery(function() {
    return nested_form_fields.bind_nested_forms_links();
  });

  $.fn.closestChild = function(selector) {
    var $children, $results;
    $children = void 0;
    $results = void 0;
    $children = this.children();
    if ($children.length === 0) {
      return $();
    }
    $results = $children.filter(selector);
    if ($results.length > 0) {
      return $results;
    } else {
      return $children.closestChild(selector);
    }
  };

}).call(this);
/*
Turbolinks 5.1.0
Copyright © 2018 Basecamp, LLC
 */

(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,e){return Turbolinks.controller.visit(t,e)},clearCache:function(){return Turbolinks.controller.clearCache()},setProgressBarDelay:function(t){return Turbolinks.controller.setProgressBarDelay(t)}}}).call(this),function(){var t,e,r,n=[].slice;Turbolinks.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},Turbolinks.closest=function(e,r){return t.call(e,r)},t=function(){var t,r;return t=document.documentElement,null!=(r=t.closest)?r:function(t){var r;for(r=this;r;){if(r.nodeType===Node.ELEMENT_NODE&&e.call(r,t))return r;r=r.parentNode}}}(),Turbolinks.defer=function(t){return setTimeout(t,1)},Turbolinks.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},Turbolinks.dispatch=function(t,e){var n,o,i,s,a,u;return a=null!=e?e:{},u=a.target,n=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,n===!0),i.data=null!=o?o:{},i.cancelable&&!r&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},r=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),Turbolinks.match=function(t,r){return e.call(t,r)},e=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),Turbolinks.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}.call(this),function(){Turbolinks.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.HttpRequest=function(){function e(e,r,n){this.delegate=e,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=Turbolinks.Location.wrap(r).requestURL,this.referrer=Turbolinks.Location.wrap(n).absoluteURL,this.createXHR()}return e.NETWORK_FAILURE=0,e.TIMEOUT_FAILURE=-1,e.timeout=60,e.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},e.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},e.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},e.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},e.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},e.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},e.prototype.requestCanceled=function(){return this.endRequest()},e.prototype.notifyApplicationBeforeRequestStart=function(){return Turbolinks.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},e.prototype.notifyApplicationAfterRequestEnd=function(){return Turbolinks.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},e.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},e.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},e.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},e.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.BrowserAdapter=function(){function e(e){this.controller=e,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new Turbolinks.ProgressBar}var r,n,o;return o=Turbolinks.HttpRequest,r=o.NETWORK_FAILURE,n=o.TIMEOUT_FAILURE,e.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},e.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},e.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},e.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},e.prototype.visitRequestCompleted=function(t){return t.loadResponse()},e.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case r:case n:return this.reload();default:return t.loadResponse()}},e.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},e.prototype.visitCompleted=function(t){return t.followRedirect()},e.prototype.pageInvalidated=function(){return this.reload()},e.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},e.prototype.showProgressBar=function(){return this.progressBar.show()},e.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},e.prototype.reload=function(){return window.location.reload()},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.History=function(){function e(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},e.prototype.push=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("push",t,e)},e.prototype.replace=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("replace",t,e)},e.prototype.onPopState=function(t){var e,r,n,o;return this.shouldHandlePopState()&&(o=null!=(r=t.state)?r.turbolinks:void 0)?(e=Turbolinks.Location.wrap(window.location),n=o.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(e,n)):void 0},e.prototype.onPageLoad=function(t){return Turbolinks.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},e.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},e.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},e.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},e}()}.call(this),function(){Turbolinks.Snapshot=function(){function t(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return t.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},t.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},t.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},t.prototype.clone=function(){return new t({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},t.prototype.getRootLocation=function(){var t,e;return e=null!=(t=this.getSetting("root"))?t:"/",new Turbolinks.Location(e)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.body.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},t}()}.call(this),function(){var t=[].slice;Turbolinks.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){Turbolinks.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.SnapshotRenderer=function(e){function r(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=new Turbolinks.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new Turbolinks.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return t(r,e),r.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},r.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},r.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},r.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},r.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},r.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},r.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},r.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.assignNewBody=function(){return document.body=this.newBody},r.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},r.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},r.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},r.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},r.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},r.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},r.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},r.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},r.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},r}(Turbolinks.Renderer)}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.ErrorRenderer=function(e){function r(t){this.html=t}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(Turbolinks.Renderer)}.call(this),function(){Turbolinks.View=function(){function t(t){this.delegate=t,this.element=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return Turbolinks.Snapshot.fromElement(this.element)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,e,r){return Turbolinks.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),Turbolinks.Snapshot.wrap(t),e)},t.prototype.renderError=function(t,e){return Turbolinks.ErrorRenderer.render(this.delegate,e,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ScrollManager=function(){function e(e){this.delegate=e,this.onScroll=t(this.onScroll,this),this.onScroll=Turbolinks.throttle(this.onScroll)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},e.prototype.scrollToElement=function(t){return t.scrollIntoView()},e.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},e.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},e.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},e}()}.call(this),function(){Turbolinks.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var e;return t.prototype.has=function(t){var r;return r=e(t),r in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var r;return r=e(t),this.snapshots[r]},t.prototype.write=function(t,r){var n;return n=e(t),this.snapshots[n]=r},t.prototype.touch=function(t){var r,n;return n=e(t),r=this.keys.indexOf(n),r>-1&&this.keys.splice(r,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},e=function(t){return Turbolinks.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Visit=function(){function e(e,r,n){this.controller=e,this.action=n,this.performScroll=t(this.performScroll,this),this.identifier=Turbolinks.uuid(),this.location=Turbolinks.Location.wrap(r),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var r;return e.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},e.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},e.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},e.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},e.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=r(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},e.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new Turbolinks.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},e.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},e.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},e.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},e.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},e.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},e.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},e.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},e.prototype.requestCompletedWithResponse=function(t,e){return this.response=t,null!=e&&(this.redirectedToLocation=Turbolinks.Location.wrap(e)),this.adapter.visitRequestCompleted(this)},e.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},e.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},e.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},e.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},e.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},e.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},e.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},e.prototype.getTimingMetrics=function(){return Turbolinks.copyObject(this.timingMetrics)},r=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},e.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},e.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},e.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},e.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Controller=function(){function e(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new Turbolinks.History(this),this.view=new Turbolinks.View(this),this.scrollManager=new Turbolinks.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return e.prototype.start=function(){return Turbolinks.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},e.prototype.disable=function(){return this.enabled=!1},e.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},e.prototype.clearCache=function(){return this.cache=new Turbolinks.SnapshotCache(10)},e.prototype.visit=function(t,e){var r,n;return null==e&&(e={}),t=Turbolinks.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(r=null!=(n=e.action)?n:"advance",this.adapter.visitProposedToLocationWithAction(t,r)):window.location=t:void 0},e.prototype.startVisitToLocationWithAction=function(t,e,r){var n;return Turbolinks.supported?(n=this.getRestorationDataForIdentifier(r),this.startVisit(t,e,{restorationData:n})):window.location=t},e.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},e.prototype.startHistory=function(){return this.location=Turbolinks.Location.wrap(window.location),this.restorationIdentifier=Turbolinks.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.stopHistory=function(){return this.history.stop()},e.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},e.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,e){var r;return this.restorationIdentifier=e,this.enabled?(r=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:r,historyChanged:!0}),this.location=Turbolinks.Location.wrap(t)):this.adapter.pageInvalidated()},e.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},e.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},e.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},e.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},e.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},e.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},e.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},e.prototype.render=function(t,e){return this.view.render(t,e)},e.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},e.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},e.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},e.prototype.pageLoaded=function(){
return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},e.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},e.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},e.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},e.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},e.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,e){return Turbolinks.dispatch("turbolinks:click",{target:t,data:{url:e.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationBeforeVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationAfterVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},e.prototype.notifyApplicationBeforeCachingSnapshot=function(){return Turbolinks.dispatch("turbolinks:before-cache")},e.prototype.notifyApplicationBeforeRender=function(t){return Turbolinks.dispatch("turbolinks:before-render",{data:{newBody:t}})},e.prototype.notifyApplicationAfterRender=function(){return Turbolinks.dispatch("turbolinks:render")},e.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),Turbolinks.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},e.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},e.prototype.createVisit=function(t,e,r){var n,o,i,s,a;return o=null!=r?r:{},s=o.restorationIdentifier,i=o.restorationData,n=o.historyChanged,a=new Turbolinks.Visit(this,t,e),a.restorationIdentifier=null!=s?s:Turbolinks.uuid(),a.restorationData=Turbolinks.copyObject(i),a.historyChanged=n,a.referrer=this.location,a},e.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},e.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},e.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?Turbolinks.closest(t,"a[href]:not([target]):not([download])"):void 0},e.prototype.getVisitableLocationForLink=function(t){var e;return e=new Turbolinks.Location(t.getAttribute("href")),this.locationIsVisitable(e)?e:void 0},e.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},e.prototype.nodeIsVisitable=function(t){var e;return(e=Turbolinks.closest(t,"[data-turbolinks]"))?"false"!==e.getAttribute("data-turbolinks"):!0},e.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},e.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},e.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},e}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,e,r;Turbolinks.start=function(){return e()?(null==Turbolinks.controller&&(Turbolinks.controller=t()),Turbolinks.controller.start()):void 0},e=function(){return null==window.Turbolinks&&(window.Turbolinks=Turbolinks),r()},t=function(){var t;return t=new Turbolinks.Controller,t.adapter=new Turbolinks.BrowserAdapter(t),t},r=function(){return window.Turbolinks===Turbolinks},r()&&Turbolinks.start()}.call(this);
/*!
 DataTables 1.10.12
 ©2008-2015 SpryMedia Ltd - datatables.net/license
*/

(function(h){"function"===typeof define&&define.amd?define(["jquery"],function(D){return h(D,window,document)}):"object"===typeof exports?module.exports=function(D,I){D||(D=window);I||(I="undefined"!==typeof window?require("jquery"):require("jquery")(D));return h(I,D,D.document)}:h(jQuery,window,document)})(function(h,D,I,k){function X(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),
d[c]=e,"o"===b[1]&&X(a[e])});a._hungarianMap=d}function K(a,b,c){a._hungarianMap||X(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==k&&(c||b[d]===k))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),K(a[d],b[d],c)):b[d]=b[e]})}function Da(a){var b=m.defaults.oLanguage,c=a.sZeroRecords;!a.sEmptyTable&&(c&&"No data available in table"===b.sEmptyTable)&&E(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(c&&"Loading..."===b.sLoadingRecords)&&E(a,a,"sZeroRecords","sLoadingRecords");
a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&db(a)}function eb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");"boolean"===typeof a.sScrollX&&(a.sScrollX=a.sScrollX?"100%":"");"boolean"===typeof a.scrollX&&(a.scrollX=
a.scrollX?"100%":"");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&K(m.models.oSearch,a[b])}function fb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;b&&!h.isArray(b)&&(a.aDataSort=[b])}function gb(a){if(!m.__browser){var b={};m.__browser=b;var c=h("<div/>").css({position:"fixed",top:0,left:0,height:1,width:1,overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,
width:100,overflow:"scroll"}).append(h("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=c.children(),e=d.children();b.barWidth=d[0].offsetWidth-d[0].clientWidth;b.bScrollOversize=100===e[0].offsetWidth&&100!==d[0].clientWidth;b.bScrollbarLeft=1!==Math.round(e.offset().left);b.bBounding=c[0].getBoundingClientRect().width?!0:!1;c.remove()}h.extend(a.oBrowser,m.__browser);a.oScroll.iBarWidth=m.__browser.barWidth}function hb(a,b,c,d,e,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;d!==e;)a.hasOwnProperty(d)&&
(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Ea(a,b){var c=m.defaults.column,d=a.aoColumns.length,c=h.extend({},m.models.oColumn,c,{nTh:b?b:I.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},m.models.oSearch,c[d]);ja(a,d,h(b).data())}function ja(a,b,c){var b=a.aoColumns[b],d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=e.attr("width")||null;var f=
(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(fb(c),K(m.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),h.extend(b,c),E(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),E(b,c,"aDataSort"));var g=b.mData,j=Q(g),i=b.mRender?Q(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&
(c(g.sort)||c(g.type)||c(g.filter));b._setter=null;b.fnGetData=function(a,b,c){var d=j(a,b,k,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return R(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=d.sSortableNone,b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=d.sSortJUIAscAllowed):
!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function Y(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Fa(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&ka(a);u(a,null,"column-sizing",[a])}function Z(a,b){var c=la(a,"bVisible");return"number"===typeof c[b]?c[b]:null}function $(a,b){var c=la(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}
function aa(a){var b=0;h.each(a.aoColumns,function(a,d){d.bVisible&&"none"!==h(d.nTh).css("display")&&b++});return b}function la(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Ga(a){var b=a.aoColumns,c=a.aoData,d=m.ext.type.detect,e,f,g,j,i,h,l,q,t;e=0;for(f=b.length;e<f;e++)if(l=b[e],t=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=d.length;g<j;g++){i=0;for(h=c.length;i<h;i++){t[i]===k&&(t[i]=B(a,i,e,"type"));q=d[g](t[i],a);if(!q&&
g!==d.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function ib(a,b,c,d){var e,f,g,j,i,n,l=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){n=b[e];var q=n.targets!==k?n.targets:n.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Ea(a);d(q[f],n)}else if("number"===typeof q[f]&&0>q[f])d(l.length+q[f],n);else if("string"===typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&
d(j,n)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function N(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},m.models.oRow,{src:c?"dom":"data",idx:e});f._aData=b;a.aoData.push(f);for(var g=a.aoColumns,j=0,i=g.length;j<i;j++)g[j].sType=null;a.aiDisplayMaster.push(e);b=a.rowIdFn(b);b!==k&&(a.aIds[b]=f);(c||!a.oFeatures.bDeferRender)&&Ha(a,e,c,d);return e}function ma(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,e){c=Ia(a,e);return N(a,c.data,e,c.cells)})}function B(a,b,c,d){var e=a.iDraw,
f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,i=f.fnGetData(g,d,{settings:a,row:b,col:c});if(i===k)return a.iDrawError!=e&&null===j&&(L(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b+", column "+c,4),a.iDrawError=e),j;if((i===g||null===i)&&null!==j&&d!==k)i=j;else if("function"===typeof i)return i.call(g);return null===i&&"display"==d?"":i}function jb(a,b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d,{settings:a,row:b,col:c})}
function Ja(a){return h.map(a.match(/(\\.|[^\.])+/g)||[""],function(a){return a.replace(/\\./g,".")})}function Q(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=Q(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=Ja(f);
for(var i=0,n=j.length;i<n;i++){f=j[i].match(ba);g=j[i].match(U);if(f){j[i]=j[i].replace(ba,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");if(h.isArray(a)){i=0;for(n=a.length;i<n;i++)g.push(c(a[i],b,j))}a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(U,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}function R(a){if(h.isPlainObject(a))return R(a._);
if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=Ja(e),f;f=e[e.length-1];for(var g,j,i=0,n=e.length-1;i<n;i++){g=e[i].match(ba);j=e[i].match(U);if(g){e[i]=e[i].replace(ba,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");if(h.isArray(d)){j=0;for(n=d.length;j<n;j++)f={},b(f,d[j],g),a[e[i]].push(f)}else a[e[i]]=d;return}j&&(e[i]=e[i].replace(U,
""),a=a[e[i]](d));if(null===a[e[i]]||a[e[i]]===k)a[e[i]]={};a=a[e[i]]}if(f.match(U))a[f.replace(U,"")](d);else a[f.replace(ba,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ka(a){return G(a.aoData,"_aData")}function na(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0;a.aIds={}}function oa(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===k&&a.splice(d,1)}function ca(a,b,c,d){var e=a.aoData[b],f,g=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);
c.innerHTML=B(a,b,d,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=Ia(a,e,d,d===k?k:e._aData).data;else{var j=e.anCells;if(j)if(d!==k)g(j[d],d);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}e._aSortData=null;e._aFilterData=null;g=a.aoColumns;if(d!==k)g[d].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;La(a,e)}}function Ia(a,b,c,d){var e=[],f=b.firstChild,g,j,i=0,n,l=a.aoColumns,q=a._rowReadObject,d=d!==k?d:q?{}:[],t=function(a,b){if("string"===typeof a){var c=a.indexOf("@");
-1!==c&&(c=a.substring(c+1),R(a)(d,b.getAttribute(c)))}},S=function(a){if(c===k||c===i)j=l[i],n=h.trim(a.innerHTML),j&&j._bAttrSrc?(R(j.mData._)(d,n),t(j.mData.sort,a),t(j.mData.type,a),t(j.mData.filter,a)):q?(j._setter||(j._setter=R(j.mData)),j._setter(d,n)):d[i]=n;i++};if(f)for(;f;){g=f.nodeName.toUpperCase();if("TD"==g||"TH"==g)S(f),e.push(f);f=f.nextSibling}else{e=b.anCells;f=0;for(g=e.length;f<g;f++)S(e[f])}if(b=b.firstChild?b:b.nTr)(b=b.getAttribute("id"))&&R(a.rowId)(d,b);return{data:d,cells:e}}
function Ha(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,n,l,q;if(null===e.nTr){j=c||I.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;La(a,e);l=0;for(q=a.aoColumns.length;l<q;l++){n=a.aoColumns[l];i=c?d[l]:I.createElement(n.sCellType);i._DT_CellIndex={row:b,column:l};g.push(i);if((!c||n.mRender||n.mData!==l)&&(!h.isPlainObject(n.mData)||n.mData._!==l+".display"))i.innerHTML=B(a,b,l,"display");n.sClass&&(i.className+=" "+n.sClass);n.bVisible&&!c?j.appendChild(i):!n.bVisible&&c&&i.parentNode.removeChild(i);
n.fnCreatedCell&&n.fnCreatedCell.call(a.oInstance,i,B(a,b,l),f,b,l)}u(a,"aoRowCreatedCallback",null,[j,f,b])}e.nTr.setAttribute("role","row")}function La(a,b){var c=b.nTr,d=b._aData;if(c){var e=a.rowIdFn(d);e&&(c.id=e);d.DT_RowClass&&(e=d.DT_RowClass.split(" "),b.__rowc=b.__rowc?pa(b.__rowc.concat(e)):e,h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));d.DT_RowAttr&&h(c).attr(d.DT_RowAttr);d.DT_RowData&&h(c).data(d.DT_RowData)}}function kb(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===
h("th, td",g).length,n=a.oClasses,l=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Ma(a,f.nTh,b))),f.sTitle!=d[0].innerHTML&&d.html(f.sTitle),Na(a,"header")(a,d,f,n);i&&da(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(n.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(n.sFooterTH);
if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function ea(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,n;if(b){c===k&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(n=i=1,j[d][f]===k){a.appendChild(g[d][f].cell);
for(j[d][f]=1;g[d+i]!==k&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+n]!==k&&g[d][f].cell==g[d][f+n].cell;){for(c=0;c<i;c++)j[d+c][f+n]=1;n++}h(g[d][f].cell).attr("rowspan",i).attr("colspan",n)}}}}function O(a){var b=u(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,d=a.asStripeClasses,e=d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==y(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=
-1);var g=a._iDisplayStart,n=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!lb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:n;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ha(a,l);l=q.nTr;if(0!==e){var t=d[c%e];q._sRowStripe!=t&&(h(l).removeClass(q._sRowStripe).addClass(t),q._sRowStripe=t)}u(a,"aoRowCallback",null,[l,q._aData,c,j]);b.push(l);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==y(a)?c=f.sLoadingRecords:
f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:aa(a),"class":a.oClasses.sRowEmpty}).html(c))[0];u(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ka(a),g,n,i]);u(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],Ka(a),g,n,i]);d=h(a.nTBody);d.children().detach();d.append(h(b));u(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function T(a,b){var c=a.oFeatures,d=c.bFilter;
c.bSort&&mb(a);d?fa(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;O(a);a._drawHold=!1}function nb(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,n,l,q,t=0;t<f.length;t++){g=null;j=f[t];if("<"==j){i=h("<div/>")[0];
n=f[t+1];if("'"==n||'"'==n){l="";for(q=2;f[t+q]!=n;)l+=f[t+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(n=l.split("."),i.id=n[0].substr(1,n[0].length-1),i.className=n[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;t+=q}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==j&&d.bPaginate&&d.bLengthChange)g=ob(a);else if("f"==j&&d.bFilter)g=pb(a);else if("r"==j&&d.bProcessing)g=qb(a);else if("t"==j)g=rb(a);else if("i"==j&&d.bInfo)g=sb(a);else if("p"==
j&&d.bPaginate)g=tb(a);else if(0!==m.ext.feature.length){i=m.ext.feature;q=0;for(n=i.length;q<n;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),e.append(g))}c.replaceWith(e);a.nHolding=null}function da(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,n,l,q,t;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){l=1*e.getAttribute("colspan");
q=1*e.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;n=g;t=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][n+j]={cell:e,unique:t},a[f+g].nTr=d}e=e.nextSibling}}}function qa(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],da(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function ra(a,b,c){u(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var d={},
e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance,i=function(b){u(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var n=h.isFunction(f)?f(b,a):f,b=h.isFunction(f)&&n?n:h.extend(!0,b,n);delete g.data}n={data:b,success:function(b){var c=b.error||b.sError;c&&L(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=u(a,null,"xhr",
[a,null,a.jqXHR]);-1===h.inArray(!0,d)&&("parsererror"==c?L(a,0,"Invalid JSON response",1):4===b.readyState&&L(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;u(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(n,{url:g||a.sAjaxSource})):h.isFunction(g)?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(n,g)),g.data=f)}function lb(a){return a.bAjaxDataGet?(a.iDraw++,C(a,
!0),ra(a,ub(a),function(b){vb(a,b)}),!1):!0}function ub(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,n,l,q=V(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var k=function(a,b){j.push({name:a,value:b})};k("sEcho",a.iDraw);k("iColumns",c);k("sColumns",G(b,"sName").join(","));k("iDisplayStart",g);k("iDisplayLength",i);var S={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)n=b[g],
l=f[g],i="function"==typeof n.mData?"function":n.mData,S.columns.push({data:i,name:n.sName,searchable:n.bSearchable,orderable:n.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),k("mDataProp_"+g,i),d.bFilter&&(k("sSearch_"+g,l.sSearch),k("bRegex_"+g,l.bRegex),k("bSearchable_"+g,n.bSearchable)),d.bSort&&k("bSortable_"+g,n.bSortable);d.bFilter&&(k("sSearch",e.sSearch),k("bRegex",e.bRegex));d.bSort&&(h.each(q,function(a,b){S.order.push({column:b.col,dir:b.dir});k("iSortCol_"+a,b.col);k("sSortDir_"+
a,b.dir)}),k("iSortingCols",q.length));b=m.ext.legacy.ajax;return null===b?a.sAjaxSource?j:S:b?j:S}function vb(a,b){var c=sa(a,b),d=b.sEcho!==k?b.sEcho:b.draw,e=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(d){if(1*d<a.iDraw)return;a.iDraw=1*d}na(a);a._iRecordsTotal=parseInt(e,10);a._iRecordsDisplay=parseInt(f,10);d=0;for(e=c.length;d<e;d++)N(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;O(a);a._bInitComplete||
ta(a,b);a.bAjaxDataGet=!0;C(a,!1)}function sa(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?Q(c)(b):b}function pb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),f=function(){var b=!this.value?
"":this.value;b!=e.sSearch&&(fa(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,O(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===y(a)?400:0,i=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT",g?Oa(f,g):f).bind("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==I.activeElement&&i.val(e.sSearch)}catch(d){}});
return b[0]}function fa(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Ga(a);if("ssp"!=y(a)){wb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)xb(a,e[b].sSearch,b,e[b].bEscapeRegex!==k?!e[b].bEscapeRegex:e[b].bRegex,e[b].bSmart,e[b].bCaseInsensitive);yb(a)}else f(b);a.bFiltered=!0;u(a,null,"search",[a])}function yb(a){for(var b=
m.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<g;f++){for(var j=[],i=0,n=c.length;i<n;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;h.merge(c,j)}}function xb(a,b,c,d,e,f){if(""!==b)for(var g=a.aiDisplay,d=Pa(b,d,e,f),e=g.length-1;0<=e;e--)b=a.aoData[g[e]]._aFilterData[c],d.test(b)||g.splice(e,1)}function wb(a,b,c,d,e,f){var d=Pa(b,d,e,f),e=a.oPreviousSearch.sSearch,f=a.aiDisplayMaster,g;0!==m.ext.search.length&&(c=!0);g=zb(a);if(0>=b.length)a.aiDisplay=f.slice();
else{if(g||c||e.length>b.length||0!==b.indexOf(e)||a.bSorted)a.aiDisplay=f.slice();b=a.aiDisplay;for(c=b.length-1;0<=c;c--)d.test(a.aoData[b[c]]._sFilterRow)||b.splice(c,1)}}function Pa(a,b,c,d){a=b?a:Qa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',"")}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function zb(a){var b=a.aoColumns,c,d,e,f,g,j,i,h,l=m.ext.type.search;c=!1;d=0;for(f=a.aoData.length;d<
f;d++)if(h=a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=B(a,d,e,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(ua.innerHTML=i,i=Zb?ua.textContent:ua.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function Ab(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}
function Bb(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function sb(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Cb,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",b+"_info"));return d[0]}function Cb(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,d=a._iDisplayStart+1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),
g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Db(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Db(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/
e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ga(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;var g=a.bDeferLoading;if(a.bInitialised){nb(a);kb(a);ea(a,a.aoHeader);ea(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Fa(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=x(f.sWidth));u(a,null,"preInit",[a]);T(a);e=y(a);if("ssp"!=e||g)"ajax"==e?ra(a,[],function(c){var f=sa(a,c);for(b=0;b<f.length;b++)N(a,f[b]);a.iInitDisplayStart=d;T(a);C(a,!1);ta(a,c)},a):(C(a,!1),
ta(a))}else setTimeout(function(){ga(a)},200)}function ta(a,b){a._bInitComplete=!0;(b||a.oInit.aaData)&&Y(a);u(a,null,"plugin-init",[a,b]);u(a,"aoInitComplete","init",[a,b])}function Ra(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Sa(a);u(a,null,"length",[a,c])}function ob(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=h.isArray(d[0]),f=e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=new Option(d[g],f[g]);var i=
h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).bind("change.DT",function(){Ra(a,h(this).val());O(a)});h(a.nTable).bind("length.dt.DT",function(b,c,d){a===c&&h("select",i).val(d)});return i[0]}function tb(a){var b=a.sPaginationType,c=m.ext.pager[b],d="function"===typeof c,e=function(a){O(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],f=a.aanFeatures;
d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),k,l=0;for(k=f.p.length;l<k;l++)Na(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,e)},sName:"pagination"}));return b}function Ta(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&(d=0)):"first"==b?d=0:
"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:L(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(u(a,null,"page",[a]),c&&O(a));return b}function qb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");u(a,null,"processing",
[a,b])}function rb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),n=h(b[0].cloneNode(!1)),l=b.children("tfoot");l.length||(l=null);i=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:d?!d?null:x(d):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",
width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({position:"relative",overflow:"auto",width:!d?null:x(d)}).append(b));l&&i.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:x(d):"100%"}).append(h("<div/>",{"class":f.sScrollFootInner}).append(n.removeAttr("id").css("margin-left",0).append("bottom"===j?g:null).append(b.children("tfoot")))));
var b=i.children(),k=b[0],f=b[1],t=l?b[2]:null;if(d)h(f).on("scroll.DT",function(){var a=this.scrollLeft;k.scrollLeft=a;l&&(t.scrollLeft=a)});h(f).css(e&&c.bCollapse?"max-height":"height",e);a.nScrollHead=k;a.nScrollBody=f;a.nScrollFoot=t;a.aoDrawCallback.push({fn:ka,sName:"scrolling"});return i[0]}function ka(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,b=b.iBarWidth,f=h(a.nScrollHead),g=f[0].style,j=f.children("div"),i=j[0].style,n=j.children("table"),j=a.nScrollBody,l=h(j),q=j.style,t=h(a.nScrollFoot).children("div"),
m=t.children("table"),o=h(a.nTHead),F=h(a.nTable),p=F[0],r=p.style,u=a.nTFoot?h(a.nTFoot):null,Eb=a.oBrowser,Ua=Eb.bScrollOversize,s=G(a.aoColumns,"nTh"),P,v,w,y,z=[],A=[],B=[],C=[],D,E=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};v=j.scrollHeight>j.clientHeight;if(a.scrollBarVis!==v&&a.scrollBarVis!==k)a.scrollBarVis=v,Y(a);else{a.scrollBarVis=v;F.children("thead, tfoot").remove();u&&(w=u.clone().prependTo(F),P=u.find("tr"),w=
w.find("tr"));y=o.clone().prependTo(F);o=o.find("tr");v=y.find("tr");y.find("th, td").removeAttr("tabindex");c||(q.width="100%",f[0].style.width="100%");h.each(qa(a,y),function(b,c){D=Z(a,b);c.style.width=a.aoColumns[D].sWidth});u&&J(function(a){a.style.width=""},w);f=F.outerWidth();if(""===c){r.width="100%";if(Ua&&(F.find("tbody").height()>j.offsetHeight||"scroll"==l.css("overflow-y")))r.width=x(F.outerWidth()-b);f=F.outerWidth()}else""!==d&&(r.width=x(d),f=F.outerWidth());J(E,v);J(function(a){B.push(a.innerHTML);
z.push(x(h(a).css("width")))},v);J(function(a,b){if(h.inArray(a,s)!==-1)a.style.width=z[b]},o);h(v).height(0);u&&(J(E,w),J(function(a){C.push(a.innerHTML);A.push(x(h(a).css("width")))},w),J(function(a,b){a.style.width=A[b]},P),h(w).height(0));J(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+B[b]+"</div>";a.style.width=z[b]},v);u&&J(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+C[b]+"</div>";a.style.width=
A[b]},w);if(F.outerWidth()<f){P=j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")?f+b:f;if(Ua&&(j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")))r.width=x(P-b);(""===c||""!==d)&&L(a,1,"Possible column misalignment",6)}else P="100%";q.width=x(P);g.width=x(P);u&&(a.nScrollFoot.style.width=x(P));!e&&Ua&&(q.height=x(p.offsetHeight+b));c=F.outerWidth();n[0].style.width=x(c);i.width=x(c);d=F.height()>j.clientHeight||"scroll"==l.css("overflow-y");e="padding"+(Eb.bScrollbarLeft?"Left":
"Right");i[e]=d?b+"px":"0px";u&&(m[0].style.width=x(c),t[0].style.width=x(c),t[0].style[e]=d?b+"px":"0px");F.children("colgroup").insertBefore(F.children("thead"));l.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)j.scrollTop=0}}function J(a,b,c){for(var d=0,e=0,f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Fa(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,e=d.sY,f=d.sX,g=d.sXInner,
j=c.length,i=la(a,"bVisible"),n=h("th",a.nTHead),l=b.getAttribute("width"),k=b.parentNode,t=!1,m,o,p=a.oBrowser,d=p.bScrollOversize;(m=b.style.width)&&-1!==m.indexOf("%")&&(l=m);for(m=0;m<i.length;m++)o=c[i[m]],null!==o.sWidth&&(o.sWidth=Fb(o.sWidthOrig,k),t=!0);if(d||!t&&!f&&!e&&j==aa(a)&&j==n.length)for(m=0;m<j;m++)i=Z(a,m),null!==i&&(c[i].sWidth=x(n.eq(m).width()));else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var r=h("<tr/>").appendTo(j.find("tbody"));
j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width","");n=qa(a,j.find("thead")[0]);for(m=0;m<i.length;m++)o=c[i[m]],n[m].style.width=null!==o.sWidthOrig&&""!==o.sWidthOrig?x(o.sWidthOrig):"",o.sWidthOrig&&f&&h(n[m]).append(h("<div/>").css({width:o.sWidthOrig,margin:0,padding:0,border:0,height:1}));if(a.aoData.length)for(m=0;m<i.length;m++)t=i[m],o=c[t],h(Gb(a,t)).clone(!1).append(o.sContentPadding).appendTo(r);h("[name]",
j).removeAttr("name");o=h("<div/>").css(f||e?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(j).appendTo(k);f&&g?j.width(g):f?(j.css("width","auto"),j.removeAttr("width"),j.width()<k.clientWidth&&l&&j.width(k.clientWidth)):e?j.width(k.clientWidth):l&&j.width(l);for(m=e=0;m<i.length;m++)k=h(n[m]),g=k.outerWidth()-k.width(),k=p.bBounding?Math.ceil(n[m].getBoundingClientRect().width):k.outerWidth(),e+=k,c[i[m]].sWidth=x(k-g);b.style.width=x(e);o.remove()}l&&(b.style.width=
x(l));if((l||f)&&!a._reszEvt)b=function(){h(D).bind("resize.DT-"+a.sInstance,Oa(function(){Y(a)}))},d?setTimeout(b,1E3):b(),a._reszEvt=!0}function Fb(a,b){if(!a)return 0;var c=h("<div/>").css("width",x(a)).appendTo(b||I.body),d=c[0].offsetWidth;c.remove();return d}function Gb(a,b){var c=Hb(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?h("<td/>").html(B(a,c,b,"display"))[0]:d.anCells[b]}function Hb(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=B(a,f,b,"display")+"",c=c.replace($b,
""),c=c.replace(/&nbsp;/g," "),c.length>d&&(d=c.length,e=f);return e}function x(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function V(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var n=[];f=function(a){a.length&&!h.isArray(a[0])?n.push(a):h.merge(n,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<n.length;a++){i=n[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||
"string",n[a]._idx===k&&(n[a]._idx=h.inArray(n[a][1],e[g].asSorting)),d.push({src:i,col:g,dir:n[a][1],index:n[a]._idx,type:j,formatter:m.ext.type.order[j+"-pre"]})}return d}function mb(a){var b,c,d=[],e=m.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ga(a);h=V(a);b=0;for(c=h.length;b<c;b++)j=h[b],j.formatter&&g++,Ib(a,j.col);if("ssp"!=y(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,k=f[a]._aSortData,m=f[b]._aSortData;for(g=
0;g<i;g++)if(j=h[g],c=k[j.col],e=m[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,m=f[a]._aSortData,p=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=m[i.col],g=p[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Jb(a){for(var b,c,d=a.aoColumns,e=V(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,
"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Va(a,b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,
G(e,"0")),-1!==c?(b=g(e[c],!0),null===b&&1===e.length&&(b=0),null===b?e.splice(c,1):(e[c][1]=f[b],e[c]._idx=b)):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);T(a);"function"==typeof d&&d(a)}function Ma(a,b,c,d){var e=a.aoColumns[c];Wa(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Va(a,c,b.shiftKey,d);"ssp"!==y(a)&&C(a,!1)},0)):Va(a,c,b.shiftKey,d))})}
function va(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=V(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(G(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(G(a.aoData,"anCells",g)).addClass(c+(2>e?e+1:3))}a.aLastSort=d}function Ib(a,b){var c=a.aoColumns[b],d=m.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,$(a,b)));for(var f,g=m.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],
c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:B(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function wa(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:Ab(a.oPreviousSearch),columns:h.map(a.aoColumns,function(b,d){return{visible:b.bVisible,search:Ab(a.aoPreSearchCols[d])}})};u(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,
b)}}function Kb(a){var b,c,d=a.aoColumns;if(a.oFeatures.bStateSave){var e=a.fnStateLoadCallback.call(a.oInstance,a);if(e&&e.time&&(b=u(a,"aoStateLoadParams","stateLoadParams",[a,e]),-1===h.inArray(!1,b)&&(b=a.iStateDuration,!(0<b&&e.time<+new Date-1E3*b)&&d.length===e.columns.length))){a.oLoadedState=h.extend(!0,{},e);e.start!==k&&(a._iDisplayStart=e.start,a.iInitDisplayStart=e.start);e.length!==k&&(a._iDisplayLength=e.length);e.order!==k&&(a.aaSorting=[],h.each(e.order,function(b,c){a.aaSorting.push(c[0]>=
d.length?[0,c[1]]:c)}));e.search!==k&&h.extend(a.oPreviousSearch,Bb(e.search));b=0;for(c=e.columns.length;b<c;b++){var f=e.columns[b];f.visible!==k&&(d[b].bVisible=f.visible);f.search!==k&&h.extend(a.aoPreSearchCols[b],Bb(f.search))}u(a,"aoStateLoaded","stateLoaded",[a,e])}}}function xa(a){var b=m.settings,a=h.inArray(a,G(b,"nTable"));return-1!==a?b[a]:null}function L(a,b,c,d){c="DataTables warning: "+(a?"table id="+a.sTableId+" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+
d);if(b)D.console&&console.log&&console.log(c);else if(b=m.ext,b=b.sErrMode||b.errMode,a&&u(a,null,"error",[a,d,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==typeof b&&b(a,d,c)}}function E(a,b,c,d){h.isArray(c)?h.each(c,function(c,d){h.isArray(d)?E(a,b,d[0],d[1]):E(a,b,d)}):(d===k&&(d=c),b[c]!==k&&(a[d]=b[c]))}function Lb(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==
e&&h.isArray(d)?d.slice():d);return a}function Wa(a,b,c){h(a).bind("click.DT",b,function(b){a.blur();c(b)}).bind("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).bind("selectstart.DT",function(){return!1})}function z(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function u(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,d),e.push(b.result));return e}function Sa(a){var b=a._iDisplayStart,
c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d);b-=b%d;if(-1===d||0>b)b=0;a._iDisplayStart=b}function Na(a,b){var c=a.renderer,d=m.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===typeof c?d[c]||d._:d._}function y(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function ya(a,b){var c=[],c=Mb.numbers_length,d=Math.floor(c/2);b<=c?c=W(0,b):a<=d?(c=W(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=W(b-(c-2),b):(c=W(a-d+2,a+d-1),c.push("ellipsis"),
c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function db(a){h.each({num:function(b){return za(b,a)},"num-fmt":function(b){return za(b,a,Xa)},"html-num":function(b){return za(b,a,Aa)},"html-num-fmt":function(b){return za(b,a,Aa,Xa)}},function(b,c){v.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(v.type.search[b+a]=v.type.search.html)})}function Nb(a){return function(){var b=[xa(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return m.ext.internal[a].apply(this,
b)}}var m=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new r(xa(this[v.iApiIndex])):new r(this)};this.fnAddData=function(a,b){var c=this.api(!0),d=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===k||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===k||a?b.draw(!1):
(""!==d.sX||""!==d.sY)&&ka(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,b,c){var d=this.api(!0),a=d.rows(a),e=a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===k||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===k?e.search(a,
c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==d||"th"==d?c.cell(a,b).data():c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),
[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return xa(this[v.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=
function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===k||e)&&h.columns.adjust();(d===k||d)&&h.draw();return 0};this.fnVersionCheck=v.fnVersionCheck;var b=this,c=a===k,d=this.length;c&&(a={});this.oApi=this.internal=v.internal;for(var e in m.ext.internal)e&&(this[e]=Nb(e));this.each(function(){var e={},e=1<d?Lb(e,a,!0):a,g=0,j,i=this.getAttribute("id"),n=!1,l=m.defaults,q=h(this);if("table"!=
this.nodeName.toLowerCase())L(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{eb(l);fb(l.column);K(l,l,!0);K(l.column,l.column,!0);K(l,h.extend(e,q.data()));var t=m.settings,g=0;for(j=t.length;g<j;g++){var p=t[g];if(p.nTable==this||p.nTHead.parentNode==this||p.nTFoot&&p.nTFoot.parentNode==this){g=e.bRetrieve!==k?e.bRetrieve:l.bRetrieve;if(c||g)return p.oInstance;if(e.bDestroy!==k?e.bDestroy:l.bDestroy){p.oInstance.fnDestroy();break}else{L(p,0,"Cannot reinitialise DataTable",3);
return}}if(p.sTableId==this.id){t.splice(g,1);break}}if(null===i||""===i)this.id=i="DataTables_Table_"+m.ext._unique++;var o=h.extend(!0,{},m.models.oSettings,{sDestroyWidth:q[0].style.width,sInstance:i,sTableId:i});o.nTable=this;o.oApi=b.internal;o.oInit=e;t.push(o);o.oInstance=1===b.length?b:q.dataTable();eb(e);e.oLanguage&&Da(e.oLanguage);e.aLengthMenu&&!e.iDisplayLength&&(e.iDisplayLength=h.isArray(e.aLengthMenu[0])?e.aLengthMenu[0][0]:e.aLengthMenu[0]);e=Lb(h.extend(!0,{},l),e);E(o.oFeatures,
e,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));E(o,e,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols",
"aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]);E(o.oScroll,e,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);E(o.oLanguage,e,"fnInfoCallback");z(o,"aoDrawCallback",e.fnDrawCallback,"user");z(o,"aoServerParams",e.fnServerParams,"user");z(o,"aoStateSaveParams",e.fnStateSaveParams,"user");z(o,"aoStateLoadParams",e.fnStateLoadParams,"user");z(o,"aoStateLoaded",e.fnStateLoaded,"user");z(o,"aoRowCallback",e.fnRowCallback,
"user");z(o,"aoRowCreatedCallback",e.fnCreatedRow,"user");z(o,"aoHeaderCallback",e.fnHeaderCallback,"user");z(o,"aoFooterCallback",e.fnFooterCallback,"user");z(o,"aoInitComplete",e.fnInitComplete,"user");z(o,"aoPreDrawCallback",e.fnPreDrawCallback,"user");o.rowIdFn=Q(e.rowId);gb(o);i=o.oClasses;e.bJQueryUI?(h.extend(i,m.ext.oJUIClasses,e.oClasses),e.sDom===l.sDom&&"lfrtip"===l.sDom&&(o.sDom='<"H"lfr>t<"F"ip>'),o.renderer)?h.isPlainObject(o.renderer)&&!o.renderer.header&&(o.renderer.header="jqueryui"):
o.renderer="jqueryui":h.extend(i,m.ext.classes,e.oClasses);q.addClass(i.sTable);o.iInitDisplayStart===k&&(o.iInitDisplayStart=e.iDisplayStart,o._iDisplayStart=e.iDisplayStart);null!==e.iDeferLoading&&(o.bDeferLoading=!0,g=h.isArray(e.iDeferLoading),o._iRecordsDisplay=g?e.iDeferLoading[0]:e.iDeferLoading,o._iRecordsTotal=g?e.iDeferLoading[1]:e.iDeferLoading);var r=o.oLanguage;h.extend(!0,r,e.oLanguage);""!==r.sUrl&&(h.ajax({dataType:"json",url:r.sUrl,success:function(a){Da(a);K(l.oLanguage,a);h.extend(true,
r,a);ga(o)},error:function(){ga(o)}}),n=!0);null===e.asStripeClasses&&(o.asStripeClasses=[i.sStripeOdd,i.sStripeEven]);var g=o.asStripeClasses,v=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(g,function(a){return v.hasClass(a)}))&&(h("tbody tr",this).removeClass(g.join(" ")),o.asDestroyStripes=g.slice());t=[];g=this.getElementsByTagName("thead");0!==g.length&&(da(o.aoHeader,g[0]),t=qa(o));if(null===e.aoColumns){p=[];g=0;for(j=t.length;g<j;g++)p.push(null)}else p=e.aoColumns;g=0;for(j=
p.length;g<j;g++)Ea(o,t?t[g]:null);ib(o,e.aoColumnDefs,p,function(a,b){ja(o,a,b)});if(v.length){var s=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h(v[0]).children("th, td").each(function(a,b){var c=o.aoColumns[a];if(c.mData===a){var d=s(b,"sort")||s(b,"order"),e=s(b,"filter")||s(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};ja(o,a)}}})}var w=o.oFeatures;e.bStateSave&&(w.bStateSave=
!0,Kb(o,e),z(o,"aoDrawCallback",wa,"state_save"));if(e.aaSorting===k){t=o.aaSorting;g=0;for(j=t.length;g<j;g++)t[g][1]=o.aoColumns[g].asSorting[0]}va(o);w.bSort&&z(o,"aoDrawCallback",function(){if(o.bSorted){var a=V(o),b={};h.each(a,function(a,c){b[c.src]=c.dir});u(o,null,"order",[o,a,b]);Jb(o)}});z(o,"aoDrawCallback",function(){(o.bSorted||y(o)==="ssp"||w.bDeferRender)&&va(o)},"sc");g=q.children("caption").each(function(){this._captionSide=q.css("caption-side")});j=q.children("thead");0===j.length&&
(j=h("<thead/>").appendTo(this));o.nTHead=j[0];j=q.children("tbody");0===j.length&&(j=h("<tbody/>").appendTo(this));o.nTBody=j[0];j=q.children("tfoot");if(0===j.length&&0<g.length&&(""!==o.oScroll.sX||""!==o.oScroll.sY))j=h("<tfoot/>").appendTo(this);0===j.length||0===j.children().length?q.addClass(i.sNoFooter):0<j.length&&(o.nTFoot=j[0],da(o.aoFooter,o.nTFoot));if(e.aaData)for(g=0;g<e.aaData.length;g++)N(o,e.aaData[g]);else(o.bDeferLoading||"dom"==y(o))&&ma(o,h(o.nTBody).children("tr"));o.aiDisplay=
o.aiDisplayMaster.slice();o.bInitialised=!0;!1===n&&ga(o)}});b=null;return this},v,r,p,s,Ya={},Ob=/[\r\n]/g,Aa=/<.*?>/g,ac=/^[\w\+\-]/,bc=/[\w\+\-]$/,cc=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Xa=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,M=function(a){return!a||!0===a||"-"===a?!0:!1},Pb=function(a){var b=parseInt(a,10);return!isNaN(b)&&isFinite(a)?b:null},Qb=function(a,b){Ya[b]||(Ya[b]=RegExp(Qa(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,
"").replace(Ya[b],"."):a},Za=function(a,b,c){var d="string"===typeof a;if(M(a))return!0;b&&d&&(a=Qb(a,b));c&&d&&(a=a.replace(Xa,""));return!isNaN(parseFloat(a))&&isFinite(a)},Rb=function(a,b,c){return M(a)?!0:!(M(a)||"string"===typeof a)?null:Za(a.replace(Aa,""),b,c)?!0:null},G=function(a,b,c){var d=[],e=0,f=a.length;if(c!==k)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<f;e++)a[e]&&d.push(a[e][b]);return d},ha=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==k)for(;f<g;f++)a[b[f]][c]&&
e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},W=function(a,b){var c=[],d;b===k?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Sb=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&b.push(a[c]);return b},pa=function(a){var b=[],c,d,e=a.length,f,g=0;d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b};m.util={throttle:function(a,b){var c=b!==k?b:200,d,e;return function(){var b=this,g=+new Date,h=arguments;d&&g<d+c?(clearTimeout(e),
e=setTimeout(function(){d=k;a.apply(b,h)},c)):(d=g,a.apply(b,h))}},escapeRegex:function(a){return a.replace(cc,"\\$1")}};var A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ba=/\[.*?\]$/,U=/\(\)$/,Qa=m.util.escapeRegex,ua=h("<div>")[0],Zb=ua.textContent!==k,$b=/<.*?>/g,Oa=m.util.throttle,Tb=[],w=Array.prototype,dc=function(a){var b,c,d=m.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,e),-1!==b?[d[b]]:
null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return-1!==b?d[b]:null}).toArray()};r=function(a,b){if(!(this instanceof r))return new r(a,b);var c=[],d=function(a){(a=dc(a))&&(c=c.concat(a))};if(h.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=pa(c);b&&h.merge(this,b);this.selector={rows:null,cols:null,opts:null};r.extend(this,this,Tb)};
m.Api=r;h.extend(r.prototype,{any:function(){return 0!==this.count()},concat:w.concat,context:[],count:function(){return this.flatten().length},each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=this.context;return b.length>a?new r(b[a],this[a]):null},filter:function(a){var b=[];if(w.filter)b=w.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new r(this.context,b)},flatten:function(){var a=
[];return new r(this.context,a.concat.apply(a,this.toArray()))},join:w.join,indexOf:w.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,d){var e=[],f,g,h,i,n,l=this.context,m,t,p=this.selector;"string"===typeof a&&(d=c,c=b,b=a,a=!1);g=0;for(h=l.length;g<h;g++){var o=new r(l[g]);if("table"===b)f=c.call(o,l[g],g),f!==k&&e.push(f);else if("columns"===b||"rows"===b)f=c.call(o,l[g],this[g],g),f!==k&&e.push(f);else if("column"===b||"column-rows"===
b||"row"===b||"cell"===b){t=this[g];"column-rows"===b&&(m=Ba(l[g],p.opts));i=0;for(n=t.length;i<n;i++)f=t[i],f="cell"===b?c.call(o,l[g],f.row,f.column,g,i):c.call(o,l[g],f,g,i,m),f!==k&&e.push(f)}}return e.length||d?(a=new r(l,a?e.concat.apply([],e):e),b=a.selector,b.rows=p.rows,b.cols=p.cols,b.opts=p.opts,a):this},lastIndexOf:w.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(w.map)b=w.map.call(this,a,this);else for(var c=
0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new r(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:w.pop,push:w.push,reduce:w.reduce||function(a,b){return hb(this,a,b,0,this.length,1)},reduceRight:w.reduceRight||function(a,b){return hb(this,a,b,this.length-1,-1,-1)},reverse:w.reverse,selector:null,shift:w.shift,sort:w.sort,splice:w.splice,toArray:function(){return w.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},
unique:function(){return new r(this.context,pa(this))},unshift:w.unshift});r.extend=function(a,b,c){if(c.length&&b&&(b instanceof r||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=b.apply(a,arguments);r.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++)f=c[d],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,r.extend(a,b[f.name],f.propExt)}};r.register=p=function(a,b){if(h.isArray(a))for(var c=0,d=a.length;c<
d;c++)r.register(a[c],b);else for(var e=a.split("."),f=Tb,g,j,c=0,d=e.length;c<d;c++){g=(j=-1!==e[c].indexOf("()"))?e[c].replace("()",""):e[c];var i;a:{i=0;for(var n=f.length;i<n;i++)if(f[i].name===g){i=f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===d-1?i.val=b:f=j?i.methodExt:i.propExt}};r.registerPlural=s=function(a,b,c){r.register(a,c);r.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof r?a.length?h.isArray(a[0])?new r(a.context,
a[0]):a[0]:k:a})};p("tables()",function(a){var b;if(a){b=r;var c=this.context;if("number"===typeof a)a=[c[a]];else var d=h.map(c,function(a){return a.nTable}),a=h(d).filter(a).map(function(){var a=h.inArray(this,d);return c[a]}).toArray();b=new b(a)}else b=this;return b});p("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new r(b[0]):a});s("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});s("tables().body()","table().body()",
function(){return this.iterator("table",function(a){return a.nTBody},1)});s("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});s("tables().footer()","table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});s("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});p("draw()",function(a){return this.iterator("table",function(b){"page"===
a?O(b):("string"===typeof a&&(a="full-hold"===a?!1:!0),T(b,!1===a))})});p("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Ta(b,a)})});p("page.info()",function(){if(0===this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a.oFeatures.bPaginate?a._iDisplayLength:-1,d=a.fnRecordsDisplay(),e=-1===c;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d,
serverSide:"ssp"===y(a)}});p("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ra(b,a)})});var Ub=function(a,b,c){if(c){var d=new r(a);d.one("draw",function(){c(d.ajax.json())})}if("ssp"==y(a))T(a,b);else{C(a,!0);var e=a.jqXHR;e&&4!==e.readyState&&e.abort();ra(a,[],function(c){na(a);for(var c=sa(a,c),d=0,e=c.length;d<e;d++)N(a,c[d]);T(a,b);C(a,!1)})}};p("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});
p("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});p("ajax.reload()",function(a,b){return this.iterator("table",function(c){Ub(c,!1===b,a)})});p("ajax.url()",function(a){var b=this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});p("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Ub(c,
!1===b,a)})});var $a=function(a,b,c,d,e){var f=[],g,j,i,n,l,m;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(n=b.length;i<n;i++){j=b[i]&&b[i].split?b[i].split(","):[b[i]];l=0;for(m=j.length;l<m;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&(f=f.concat(g))}a=v.selector[a];if(a.length){i=0;for(n=a.length;i<n;i++)f=a[i](d,e,f)}return pa(f)},ab=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",
page:"all"},a)},bb=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Ba=function(a,b){var c,d,e,f=[],g=a.aiDisplay;c=a.aiDisplayMaster;var j=b.search;d=b.order;e=b.page;if("ssp"==y(a))return"removed"===j?[]:W(0,c.length);if("current"==e){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if("current"==d||"applied"==d)f="none"==j?c.slice():"applied"==j?g.slice():h.map(c,function(a){return-1===
h.inArray(a,g)?a:null});else if("index"==d||"original"==d){c=0;for(d=a.aoData.length;c<d;c++)"none"==j?f.push(c):(e=h.inArray(c,g),(-1===e&&"removed"==j||0<=e&&"applied"==j)&&f.push(c))}return f};p("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=ab(b),c=this.iterator("table",function(c){var e=b;return $a("row",a,function(a){var b=Pb(a);if(b!==null&&!e)return[b];var j=Ba(c,e);if(b!==null&&h.inArray(b,j)!==-1)return[b];if(!a)return j;if(typeof a==="function")return h.map(j,function(b){var e=
c.aoData[b];return a(b,e._aData,e.nTr)?b:null});b=Sb(ha(c.aoData,j,"nTr"));if(a.nodeName){if(a._DT_RowIndex!==k)return[a._DT_RowIndex];if(a._DT_CellIndex)return[a._DT_CellIndex.row];b=h(a).closest("*[data-dt-row]");return b.length?[b.data("dt-row")]:[]}if(typeof a==="string"&&a.charAt(0)==="#"){j=c.aIds[a.replace(/^#/,"")];if(j!==k)return[j.idx]}return h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,e)},1);c.selector.rows=a;c.selector.opts=b;return c});p("rows().nodes()",function(){return this.iterator("row",
function(a,b){return a.aoData[b].nTr||k},1)});p("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ha(a.aoData,b,"_aData")},1)});s("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData},1)});s("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){ca(b,c,a)})});s("rows().indexes()","row().index()",function(){return this.iterator("row",
function(a,b){return b},1)});s("rows().ids()","row().id()",function(a){for(var b=[],c=this.context,d=0,e=c.length;d<e;d++)for(var f=0,g=this[d].length;f<g;f++){var h=c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((!0===a?"#":"")+h)}return new r(c,b)});s("rows().remove()","row().remove()",function(){var a=this;this.iterator("row",function(b,c,d){var e=b.aoData,f=e[c],g,h,i,n,l;e.splice(c,1);g=0;for(h=e.length;g<h;g++)if(i=e[g],l=i.anCells,null!==i.nTr&&(i.nTr._DT_RowIndex=g),null!==l){i=0;for(n=
l.length;i<n;i++)l[i]._DT_CellIndex.row=g}oa(b.aiDisplayMaster,c);oa(b.aiDisplay,c);oa(a[d],c,!1);Sa(b);c=b.rowIdFn(f._aData);c!==k&&delete b.aIds[c]});this.iterator("table",function(a){for(var c=0,d=a.aoData.length;c<d;c++)a.aoData[c].idx=c});return this});p("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(ma(b,c)[0]):h.push(N(b,c));return h},1),c=this.rows(-1);c.pop();h.merge(c,b);
return c});p("row()",function(a,b){return bb(this.rows(a,b))});p("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;b[0].aoData[this[0]]._aData=a;ca(b[0],this[0],"data");return this});p("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});p("row.add()",function(a){a instanceof h&&a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?
ma(b,a)[0]:N(b,a)});return this.row(b[0])});var cb=function(a,b){var c=a.context;if(c.length&&(c=c[0].aoData[b!==k?b:a[0]])&&c._details)c._details.remove(),c._detailsShow=k,c._details=k},Vb=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();var e=c[0],f=new r(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");0<G(g,"_details").length&&(f.on("draw.dt.DT_details",
function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(e===b)for(var c,d=aa(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",d)}),f.on("destroy.dt.DT_details",function(a,b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&cb(f,c)}))}}};p("row().child()",function(a,b){var c=this.context;if(a===k)return c.length&&this.length?
c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)cb(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?e.push(a):(c=h("<tr><td/></tr>").addClass(b),h("td",c).addClass(b).html(a)[0].colSpan=aa(d),e.push(c[0]))};f(a,b);c._details&&c._details.remove();c._details=h(e);c._detailsShow&&c._details.insertAfter(c.nTr)}return this});
p(["row().child.show()","row().child().show()"],function(){Vb(this,!0);return this});p(["row().child.hide()","row().child().hide()"],function(){Vb(this,!1);return this});p(["row().child.remove()","row().child().remove()"],function(){cb(this);return this});p("row().child.isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var ec=/^(.+):(name|visIdx|visible)$/,Wb=function(a,b,c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(B(a,e[d],b));
return c};p("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=ab(b),c=this.iterator("table",function(c){var e=a,f=b,g=c.aoColumns,j=G(g,"sName"),i=G(g,"nTh");return $a("column",e,function(a){var b=Pb(a);if(a==="")return W(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var e=Ba(c,f);return h.map(g,function(b,f){return a(f,Wb(c,f,0,0,e),i[f])?f:null})}var k=typeof a==="string"?a.match(ec):"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],
10);if(b<0){var m=h.map(g,function(a,b){return a.bVisible?b:null});return[m[m.length+b]]}return[Z(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null});default:return[]}if(a.nodeName&&a._DT_CellIndex)return[a._DT_CellIndex.column];b=h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray();if(b.length||!a.nodeName)return b;b=h(a).closest("*[data-dt-column]");return b.length?[b.data("dt-column")]:[]},c,f)},1);c.selector.cols=a;c.selector.opts=b;return c});s("columns().header()",
"column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});s("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});s("columns().data()","column().data()",function(){return this.iterator("column-rows",Wb,1)});s("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},1)});s("columns().cache()","column().cache()",
function(a){return this.iterator("column-rows",function(b,c,d,e,f){return ha(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});s("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return ha(a.aoData,e,"anCells",b)},1)});s("columns().visible()","column().visible()",function(a,b){var c=this.iterator("column",function(b,c){if(a===k)return b.aoColumns[c].bVisible;var f=b.aoColumns,g=f[c],j=b.aoData,i,n,l;if(a!==k&&g.bVisible!==a){if(a){var m=
h.inArray(!0,G(f,"bVisible"),c+1);i=0;for(n=j.length;i<n;i++)l=j[i].nTr,f=j[i].anCells,l&&l.insertBefore(f[c],f[m]||null)}else h(G(b.aoData,"anCells",c)).detach();g.bVisible=a;ea(b,b.aoHeader);ea(b,b.aoFooter);wa(b)}});a!==k&&(this.iterator("column",function(c,e){u(c,null,"column-visibility",[c,e,a,b])}),(b===k||b)&&this.columns.adjust());return c});s("columns().indexes()","column().index()",function(a){return this.iterator("column",function(b,c){return"visible"===a?$(b,c):c},1)});p("columns.adjust()",
function(){return this.iterator("table",function(a){Y(a)},1)});p("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return Z(c,b);if("fromData"===a||"toVisible"===a)return $(c,b)}});p("column()",function(a,b){return bb(this.columns(a,b))});p("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=ab(c),f=
b.aoData,g=Ba(b,e),j=Sb(ha(f,g,"anCells")),i=h([].concat.apply([],j)),l,n=b.aoColumns.length,m,p,r,u,v,s;return $a("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){m=[];p=0;for(r=g.length;p<r;p++){l=g[p];for(u=0;u<n;u++){v={row:l,column:u};if(c){s=f[l];a(v,B(b,l,u),s.anCells?s.anCells[u]:null)&&m.push(v)}else m.push(v)}}return m}if(h.isPlainObject(a))return[a];c=i.filter(a).map(function(a,b){return{row:b._DT_CellIndex.row,column:b._DT_CellIndex.column}}).toArray();if(c.length||
!a.nodeName)return c;s=h(a).closest("*[data-dt-row]");return s.length?[{row:s.data("dt-row"),column:s.data("dt-column")}]:[]},b,e)});var d=this.columns(b,c),e=this.rows(a,c),f,g,j,i,n,l=this.iterator("table",function(a,b){f=[];g=0;for(j=e[b].length;g<j;g++){i=0;for(n=d[b].length;i<n;i++)f.push({row:e[b][g],column:d[b][i]})}return f},1);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});s("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b])&&
a.anCells?a.anCells[c]:k},1)});p("cells().data()",function(){return this.iterator("cell",function(a,b,c){return B(a,b,c)},1)});s("cells().cache()","cell().cache()",function(a){a="search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)});s("cells().render()","cell().render()",function(a){return this.iterator("cell",function(b,c,d){return B(b,c,d,a)},1)});s("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,
b,c){return{row:b,column:c,columnVisible:$(a,c)}},1)});s("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,d){ca(b,c,a,d)})});p("cell()",function(a,b,c){return bb(this.cells(a,b,c))});p("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?B(b[0],c[0].row,c[0].column):k;jb(b[0],c[0].row,c[0].column,a);ca(b[0],c[0].row,"data",c[0].column);return this});p("order()",function(a,b){var c=this.context;if(a===k)return 0!==
c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:a.length&&!h.isArray(a[0])&&(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});p("order.listener()",function(a,b,c){return this.iterator("table",function(d){Ma(d,a,b,c)})});p("order.fixed()",function(a){if(!a){var b=this.context,b=b.length?b[0].aaSortingFixed:k;return h.isArray(b)?{pre:b}:b}return this.iterator("table",function(b){b.aaSortingFixed=h.extend(!0,{},a)})});p(["columns().order()",
"column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,c){e.push([c,a])});c.aaSorting=e})});p("search()",function(a,b,c,d){var e=this.context;return a===k?0!==e.length?e[0].oPreviousSearch.sSearch:k:this.iterator("table",function(e){e.oFeatures.bFilter&&fa(e,h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),1)})});s("columns().search()","column().search()",function(a,
b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===k)return g[f].sSearch;e.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),fa(e,e.oPreviousSearch,1))})});p("state()",function(){return this.context.length?this.context[0].oSavedState:null});p("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});p("state.loaded()",function(){return this.context.length?
this.context[0].oLoadedState:null});p("state.save()",function(){return this.iterator("table",function(a){wa(a)})});m.versionCheck=m.fnVersionCheck=function(a){for(var b=m.version.split("."),a=a.split("."),c,d,e=0,f=a.length;e<f;e++)if(c=parseInt(b[e],10)||0,d=parseInt(a[e],10)||0,c!==d)return c>d;return!0};m.isDataTable=m.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;h.each(m.settings,function(a,e){var f=e.nScrollHead?h("table",e.nScrollHead)[0]:null,g=e.nScrollFoot?h("table",e.nScrollFoot)[0]:
null;if(e.nTable===b||f===b||g===b)c=!0});return c};m.tables=m.fnTables=function(a){var b=!1;h.isPlainObject(a)&&(b=a.api,a=a.visible);var c=h.map(m.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable});return b?new r(c):c};m.camelToHungarian=K;p("$()",function(a,b){var c=this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){p(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0].match(/\.dt\b/)||
(a[0]+=".dt");var d=h(this.tables().nodes());d[b].apply(d,a);return this})});p("clear()",function(){return this.iterator("table",function(a){na(a)})});p("settings()",function(){return new r(this.context,this.context)});p("init()",function(){var a=this.context;return a.length?a[0].oInit:null});p("data()",function(){return this.iterator("table",function(a){return G(a.aoData,"_aData")}).flatten()});p("destroy()",function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,
d=b.oClasses,e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),p;b.bDestroying=!0;u(b,"aoDestroyCallback","destroy",[b]);a||(new r(b)).columns().visible(!0);k.unbind(".DT").find(":not(tbody *)").unbind(".DT");h(D).unbind(".DT-"+b.sInstance);e!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&e!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));b.aaSorting=[];b.aaSortingFixed=[];va(b);h(l).removeClass(b.asStripeClasses.join(" "));
h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);b.bJUI&&(h("th span."+d.sSortIcon+", td span."+d.sSortIcon,g).detach(),h("th, td",g).each(function(){var a=h("div."+d.sSortJUIWrapper,this);h(this).append(a.contents());a.detach()}));f.children().detach();f.append(l);g=a?"remove":"detach";i[g]();k[g]();!a&&c&&(c.insertBefore(e,b.nTableReinsertBefore),i.css("width",b.sDestroyWidth).removeClass(d.sTable),(p=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%
p])}));c=h.inArray(b,m.settings);-1!==c&&m.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){p(b+"s().every()",function(a){var d=this.selector.opts,e=this;return this.iterator(b,function(f,g,h,i,n){a.call(e[b](g,"cell"===b?h:d,"cell"===b?d:k),g,h,i,n)})})});p("i18n()",function(a,b,c){var d=this.context[0],a=Q(a)(d.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:a._);return a.replace("%d",c)});m.version="1.10.12";m.settings=[];m.models={};m.models.oSearch={bCaseInsensitive:!0,
sSearch:"",bRegex:!1,bSmart:!0};m.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};m.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,
sTitle:null,sType:null,sWidth:null,sWidthOrig:null};m.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bJQueryUI:!1,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,
fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===
a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",
sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},m.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",
renderer:null,rowId:"DT_RowId"};X(m.defaults);m.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};X(m.defaults.column);m.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,
bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],
aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,
fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==y(this)?1*this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==y(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=
this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?!1===f||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};m.ext=v={buttons:{},classes:{},builder:"-source-",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},
header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:m.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:m.version};h.extend(v,{afnFiltering:v.search,aTypes:v.type.detect,ofnSearch:v.type.search,oSort:v.type.order,afnSortData:v.order,aoFeatures:v.feature,oApi:v.internal,oStdClasses:v.classes,oPagination:v.pager});h.extend(m.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",
sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",
sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});var Ca="",Ca="",H=Ca+"ui-state-default",ia=Ca+"css_right ui-icon ui-icon-",Xb=Ca+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";h.extend(m.ext.oJUIClasses,
m.ext.classes,{sPageButton:"fg-button ui-button "+H,sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:H+" sorting_asc",sSortDesc:H+" sorting_desc",sSortable:H+" sorting",sSortableAsc:H+" sorting_asc_disabled",sSortableDesc:H+" sorting_desc_disabled",sSortableNone:H+" sorting_disabled",sSortJUIAsc:ia+"triangle-1-n",sSortJUIDesc:ia+"triangle-1-s",sSortJUI:ia+"carat-2-n-s",
sSortJUIAscAllowed:ia+"carat-1-n",sSortJUIDescAllowed:ia+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+H,sScrollFoot:"dataTables_scrollFoot "+H,sHeaderTH:H,sFooterTH:H,sJUIHeader:Xb+" ui-corner-tl ui-corner-tr",sJUIFooter:Xb+" ui-corner-bl ui-corner-br"});var Mb=m.ext.pager;h.extend(Mb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(a,b){return[ya(a,
b)]},simple_numbers:function(a,b){return["previous",ya(a,b),"next"]},full_numbers:function(a,b){return["first","previous",ya(a,b),"next","last"]},_numbers:ya,numbers_length:7});h.extend(!0,m.ext.renderer,{pageButton:{_:function(a,b,c,d,e,f){var g=a.oClasses,j=a.oLanguage.oPaginate,i=a.oLanguage.oAria.paginate||{},k,l,m=0,p=function(b,d){var o,r,u,s,v=function(b){Ta(a,b.data.action,true)};o=0;for(r=d.length;o<r;o++){s=d[o];if(h.isArray(s)){u=h("<"+(s.DT_el||"div")+"/>").appendTo(b);p(u,s)}else{k=null;
l="";switch(s){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":k=j.sFirst;l=s+(e>0?"":" "+g.sPageButtonDisabled);break;case "previous":k=j.sPrevious;l=s+(e>0?"":" "+g.sPageButtonDisabled);break;case "next":k=j.sNext;l=s+(e<f-1?"":" "+g.sPageButtonDisabled);break;case "last":k=j.sLast;l=s+(e<f-1?"":" "+g.sPageButtonDisabled);break;default:k=s+1;l=e===s?g.sPageButtonActive:""}if(k!==null){u=h("<a>",{"class":g.sPageButton+" "+l,"aria-controls":a.sTableId,"aria-label":i[s],
"data-dt-idx":m,tabindex:a.iTabIndex,id:c===0&&typeof s==="string"?a.sTableId+"_"+s:null}).html(k).appendTo(b);Wa(u,{action:s},v);m++}}}},r;try{r=h(b).find(I.activeElement).data("dt-idx")}catch(o){}p(h(b).empty(),d);r&&h(b).find("[data-dt-idx="+r+"]").focus()}}});h.extend(m.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return Za(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&(!ac.test(a)||!bc.test(a)))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||M(a)?"date":
null},function(a,b){var c=b.oLanguage.sDecimal;return Za(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c,!0)?"html-num-fmt"+c:null},function(a){return M(a)||"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(m.ext.type.search,{html:function(a){return M(a)?a:"string"===typeof a?a.replace(Ob," ").replace(Aa,""):""},string:function(a){return M(a)?a:"string"===typeof a?a.replace(Ob,
" "):a}});var za=function(a,b,c,d){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Qb(a,b));a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,"")));return 1*a};h.extend(v.type.order,{"date-pre":function(a){return Date.parse(a)||0},"html-pre":function(a){return M(a)?"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return M(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,
b){return a<b?1:a>b?-1:0}});db("");h.extend(!0,m.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass)}})},jqueryui:function(a,b,c,d){h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(e,
f,g,h){if(a===f){e=c.idx;b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(h[e]=="asc"?d.sSortJUIAsc:h[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});var Yb=function(a){return"string"===typeof a?a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):a};m.render={number:function(a,
b,c,d,e){return{display:function(f){if("number"!==typeof f&&"string"!==typeof f)return f;var g=0>f?"-":"",h=parseFloat(f);if(isNaN(h))return Yb(f);f=Math.abs(h);h=parseInt(f,10);f=c?b+(f-h).toFixed(c).substring(2):"";return g+(d||"")+h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,a)+f+(e||"")}}},text:function(){return{display:Yb}}};h.extend(m.ext.internal,{_fnExternApiFunc:Nb,_fnBuildAjax:ra,_fnAjaxUpdate:lb,_fnAjaxParameters:ub,_fnAjaxUpdateDraw:vb,_fnAjaxDataSrc:sa,_fnAddColumn:Ea,_fnColumnOptions:ja,
_fnAdjustColumnSizing:Y,_fnVisibleToColumnIndex:Z,_fnColumnIndexToVisible:$,_fnVisbleColumns:aa,_fnGetColumns:la,_fnColumnTypes:Ga,_fnApplyColumnDefs:ib,_fnHungarianMap:X,_fnCamelToHungarian:K,_fnLanguageCompat:Da,_fnBrowserDetect:gb,_fnAddData:N,_fnAddTr:ma,_fnNodeToDataIndex:function(a,b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:B,_fnSetCellData:jb,_fnSplitObjNotation:Ja,_fnGetObjectDataFn:Q,_fnSetObjectDataFn:R,
_fnGetDataMaster:Ka,_fnClearTable:na,_fnDeleteIndex:oa,_fnInvalidate:ca,_fnGetRowElements:Ia,_fnCreateTr:Ha,_fnBuildHead:kb,_fnDrawHead:ea,_fnDraw:O,_fnReDraw:T,_fnAddOptionsHtml:nb,_fnDetectHeader:da,_fnGetUniqueThs:qa,_fnFeatureHtmlFilter:pb,_fnFilterComplete:fa,_fnFilterCustom:yb,_fnFilterColumn:xb,_fnFilter:wb,_fnFilterCreateSearch:Pa,_fnEscapeRegex:Qa,_fnFilterData:zb,_fnFeatureHtmlInfo:sb,_fnUpdateInfo:Cb,_fnInfoMacros:Db,_fnInitialise:ga,_fnInitComplete:ta,_fnLengthChange:Ra,_fnFeatureHtmlLength:ob,
_fnFeatureHtmlPaginate:tb,_fnPageChange:Ta,_fnFeatureHtmlProcessing:qb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:rb,_fnScrollDraw:ka,_fnApplyToChildren:J,_fnCalculateColumnWidths:Fa,_fnThrottle:Oa,_fnConvertToWidth:Fb,_fnGetWidestNode:Gb,_fnGetMaxLenString:Hb,_fnStringToCss:x,_fnSortFlatten:V,_fnSort:mb,_fnSortAria:Jb,_fnSortListener:Va,_fnSortAttachListener:Ma,_fnSortingClasses:va,_fnSortData:Ib,_fnSaveState:wa,_fnLoadState:Kb,_fnSettingsFromNode:xa,_fnLog:L,_fnMap:E,_fnBindAction:Wa,_fnCallbackReg:z,
_fnCallbackFire:u,_fnLengthOverflow:Sa,_fnRenderer:Na,_fnDataSource:y,_fnRowAttributes:La,_fnCalculateEnd:function(){}});h.fn.dataTable=m;m.$=h;h.fn.dataTableSettings=m.settings;h.fn.dataTableExt=m.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};h.each(m,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable});
/*!
 DataTables Bootstrap 3 integration
 ©2011-2015 SpryMedia Ltd - datatables.net/license
*/

(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,d){a||(a=window);if(!d||!d.fn.dataTable)d=require("datatables.net")(a,d).$;return b(d,a,a.document)}:b(jQuery,window,document)})(function(b,a,d){var f=b.fn.dataTable;b.extend(!0,f.defaults,{dom:"<'row'<'col-md-6'l><'col-md-6'f>><'row'<'col-md-12'tr>><'row'<'col-md-5'i><'col-md-7'p>>",renderer:"bootstrap"});b.extend(f.ext.classes,
{sWrapper:"dataTables_wrapper form-inline dt-bootstrap4",sFilterInput:"form-control input-sm",sLengthSelect:"form-control input-sm",sProcessing:"dataTables_processing panel panel-default",sPageButton:"paginate_button page-item"});f.ext.renderer.pageButton.bootstrap=function(a,h,r,m,j,n){var o=new f.Api(a),s=a.oClasses,k=a.oLanguage.oPaginate,t=a.oLanguage.oAria.paginate||{},e,g,p=0,q=function(d,f){var l,h,i,c,m=function(a){a.preventDefault();!b(a.currentTarget).hasClass("disabled")&&o.page()!=a.data.action&&
o.page(a.data.action).draw("page")};l=0;for(h=f.length;l<h;l++)if(c=f[l],b.isArray(c))q(d,c);else{g=e="";switch(c){case "ellipsis":e="&#x2026;";g="disabled";break;case "first":e=k.sFirst;g=c+(0<j?"":" disabled");break;case "previous":e=k.sPrevious;g=c+(0<j?"":" disabled");break;case "next":e=k.sNext;g=c+(j<n-1?"":" disabled");break;case "last":e=k.sLast;g=c+(j<n-1?"":" disabled");break;default:e=c+1,g=j===c?"active":""}e&&(i=b("<li>",{"class":s.sPageButton+" "+g,id:0===r&&"string"===typeof c?a.sTableId+
"_"+c:null}).append(b("<a>",{href:"#","aria-controls":a.sTableId,"aria-label":t[c],"data-dt-idx":p,tabindex:a.iTabIndex,"class":"page-link"}).html(e)).appendTo(d),a.oApi._fnBindAction(i,{action:c},m),p++)}},i;try{i=b(h).find(d.activeElement).data("dt-idx")}catch(u){}q(b(h).empty().html('<ul class="pagination"/>').children("ul"),m);i&&b(h).find("[data-dt-idx="+i+"]").focus()};return f});
/*!
 Buttons for DataTables 1.1.2
 ©2015 SpryMedia Ltd - datatables.net/license
*/

(function(e){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(p){return e(p,window,document)}):"object"===typeof exports?module.exports=function(p,o){p||(p=window);if(!o||!o.fn.dataTable)o=require("datatables.net")(p,o).$;return e(o,p,p.document)}:e(jQuery,window,document)})(function(e,p,o,n){var j=e.fn.dataTable,t=0,u=0,l=j.ext.buttons,m=function(a,b){!0===b&&(b={});e.isArray(b)&&(b={buttons:b});this.c=e.extend(!0,{},m.defaults,b);b.buttons&&(this.c.buttons=b.buttons);
this.s={dt:new j.Api(a),buttons:[],subButtons:[],listenKeys:"",namespace:"dtb"+t++};this.dom={container:e("<"+this.c.dom.container.tag+"/>").addClass(this.c.dom.container.className)};this._constructor()};e.extend(m.prototype,{action:function(a,b){var c=this._indexToButton(a).conf;if(b===n)return c.action;c.action=b;return this},active:function(a,b){var c=this._indexToButton(a),d=this.c.dom.button.active;if(b===n)return c.node.hasClass(d);c.node.toggleClass(d,b===n?!0:b);return this},add:function(a,
b){if("string"===typeof a&&-1!==a.indexOf("-")){var c=a.split("-");this.c.buttons[1*c[0]].buttons.splice(1*c[1],0,b)}else this.c.buttons.splice(1*a,0,b);this.dom.container.empty();this._buildButtons(this.c.buttons);return this},container:function(){return this.dom.container},disable:function(a){this._indexToButton(a).node.addClass(this.c.dom.button.disabled);return this},destroy:function(){e("body").off("keyup."+this.s.namespace);var a=this.s.buttons,b=this.s.subButtons,c,d,f;c=0;for(a=a.length;c<
a;c++){this.removePrep(c);d=0;for(f=b[c].length;d<f;d++)this.removePrep(c+"-"+d)}this.removeCommit();this.dom.container.remove();b=this.s.dt.settings()[0];c=0;for(a=b.length;c<a;c++)if(b.inst===this){b.splice(c,1);break}return this},enable:function(a,b){if(!1===b)return this.disable(a);this._indexToButton(a).node.removeClass(this.c.dom.button.disabled);return this},name:function(){return this.c.name},node:function(a){return this._indexToButton(a).node},removeCommit:function(){var a=this.s.buttons,
b=this.s.subButtons,c,d;for(c=a.length-1;0<=c;c--)null===a[c]&&(a.splice(c,1),b.splice(c,1),this.c.buttons.splice(c,1));c=0;for(a=b.length;c<a;c++)for(d=b[c].length-1;0<=d;d--)null===b[c][d]&&(b[c].splice(d,1),this.c.buttons[c].buttons.splice(d,1));return this},removePrep:function(a){var b,c=this.s.dt;if("number"===typeof a||-1===a.indexOf("-"))b=this.s.buttons[1*a],b.conf.destroy&&b.conf.destroy.call(c.button(a),c,b,b.conf),b.node.remove(),this._removeKey(b.conf),this.s.buttons[1*a]=null;else{var d=
a.split("-");b=this.s.subButtons[1*d[0]][1*d[1]];b.conf.destroy&&b.conf.destroy.call(c.button(a),c,b,b.conf);b.node.remove();this._removeKey(b.conf);this.s.subButtons[1*d[0]][1*d[1]]=null}return this},text:function(a,b){var c=this._indexToButton(a),d=this.c.dom.collection.buttonLiner,d="string"===typeof a&&-1!==a.indexOf("-")&&d&&d.tag?d.tag:this.c.dom.buttonLiner.tag,e=this.s.dt,h=function(a){return"function"===typeof a?a(e,c.node,c.conf):a};if(b===n)return h(c.conf.text);c.conf.text=b;d?c.node.children(d).html(h(b)):
c.node.html(h(b));return this},toIndex:function(a){var b,c,d,e;d=this.s.buttons;var h=this.s.subButtons;b=0;for(c=d.length;b<c;b++)if(d[b].node[0]===a)return b+"";b=0;for(c=h.length;b<c;b++){d=0;for(e=h[b].length;d<e;d++)if(h[b][d].node[0]===a)return b+"-"+d}},_constructor:function(){var a=this,b=this.s.dt,c=b.settings()[0];c._buttons||(c._buttons=[]);c._buttons.push({inst:this,name:this.c.name});this._buildButtons(this.c.buttons);b.on("destroy",function(){a.destroy()});e("body").on("keyup."+this.s.namespace,
function(b){if(!o.activeElement||o.activeElement===o.body){var c=String.fromCharCode(b.keyCode).toLowerCase();a.s.listenKeys.toLowerCase().indexOf(c)!==-1&&a._keypress(c,b)}})},_addKey:function(a){a.key&&(this.s.listenKeys+=e.isPlainObject(a.key)?a.key.key:a.key)},_buildButtons:function(a,b,c){var d=this.s.dt,f=0;b||(b=this.dom.container,this.s.buttons=[],this.s.subButtons=[]);for(var h=0,i=a.length;h<i;h++){var k=this._resolveExtends(a[h]);if(k)if(e.isArray(k))this._buildButtons(k,b,c);else{var g=
this._buildButton(k,c!==n?!0:!1);if(g){var r=g.node;b.append(g.inserter);c===n?(this.s.buttons.push({node:r,conf:k,inserter:g.inserter}),this.s.subButtons.push([])):this.s.subButtons[c].push({node:r,conf:k,inserter:g.inserter});k.buttons&&(g=this.c.dom.collection,k._collection=e("<"+g.tag+"/>").addClass(g.className),this._buildButtons(k.buttons,k._collection,f));k.init&&k.init.call(d.button(r),d,r,k);f++}}}},_buildButton:function(a,b){var c=this.c.dom.button,d=this.c.dom.buttonLiner,f=this.c.dom.collection,
h=this.s.dt,i=function(b){return"function"===typeof b?b(h,g,a):b};b&&f.button&&(c=f.button);b&&f.buttonLiner&&(d=f.buttonLiner);if(a.available&&!a.available(h,a))return!1;var k=function(a,b,c,d){d.action.call(b.button(c),a,b,c,d);e(b.table().node()).triggerHandler("buttons-action.dt",[b.button(c),b,c,d])},g=e("<"+c.tag+"/>").addClass(c.className).attr("tabindex",this.s.dt.settings()[0].iTabIndex).attr("aria-controls",this.s.dt.table().node().id).on("click.dtb",function(b){b.preventDefault();!g.hasClass(c.disabled)&&
a.action&&k(b,h,g,a);g.blur()}).on("keyup.dtb",function(b){b.keyCode===13&&!g.hasClass(c.disabled)&&a.action&&k(b,h,g,a)});d.tag?g.append(e("<"+d.tag+"/>").html(i(a.text)).addClass(d.className)):g.html(i(a.text));!1===a.enabled&&g.addClass(c.disabled);a.className&&g.addClass(a.className);a.titleAttr&&g.attr("title",a.titleAttr);a.namespace||(a.namespace=".dt-button-"+u++);d=(d=this.c.dom.buttonContainer)&&d.tag?e("<"+d.tag+"/>").addClass(d.className).append(g):g;this._addKey(a);return{node:g,inserter:d}},
_indexToButton:function(a){if("number"===typeof a||-1===a.indexOf("-"))return this.s.buttons[1*a];a=a.split("-");return this.s.subButtons[1*a[0]][1*a[1]]},_keypress:function(a,b){var c,d,f,h;f=this.s.buttons;var i=this.s.subButtons,k=function(c,d){if(c.key)if(c.key===a)d.click();else if(e.isPlainObject(c.key)&&c.key.key===a&&(!c.key.shiftKey||b.shiftKey))if(!c.key.altKey||b.altKey)if(!c.key.ctrlKey||b.ctrlKey)(!c.key.metaKey||b.metaKey)&&d.click()};c=0;for(d=f.length;c<d;c++)k(f[c].conf,f[c].node);
c=0;for(d=i.length;c<d;c++){f=0;for(h=i[c].length;f<h;f++)k(i[c][f].conf,i[c][f].node)}},_removeKey:function(a){if(a.key){var b=e.isPlainObject(a.key)?a.key.key:a.key,a=this.s.listenKeys.split(""),b=e.inArray(b,a);a.splice(b,1);this.s.listenKeys=a.join("")}},_resolveExtends:function(a){for(var b=this.s.dt,c,d,f=function(c){for(var d=0;!e.isPlainObject(c)&&!e.isArray(c);){if(c===n)return;if("function"===typeof c){if(c=c(b,a),!c)return!1}else if("string"===typeof c){if(!l[c])throw"Unknown button type: "+
c;c=l[c]}d++;if(30<d)throw"Buttons: Too many iterations";}return e.isArray(c)?c:e.extend({},c)},a=f(a);a&&a.extend;){if(!l[a.extend])throw"Cannot extend unknown button type: "+a.extend;var h=f(l[a.extend]);if(e.isArray(h))return h;if(!h)return!1;c=h.className;a=e.extend({},h,a);c&&a.className!==c&&(a.className=c+" "+a.className);var i=a.postfixButtons;if(i){a.buttons||(a.buttons=[]);c=0;for(d=i.length;c<d;c++)a.buttons.push(i[c]);a.postfixButtons=null}if(i=a.prefixButtons){a.buttons||(a.buttons=[]);
c=0;for(d=i.length;c<d;c++)a.buttons.splice(c,0,i[c]);a.prefixButtons=null}a.extend=h.extend}return a}});m.background=function(a,b,c){c===n&&(c=400);a?e("<div/>").addClass(b).css("display","none").appendTo("body").fadeIn(c):e("body > div."+b).fadeOut(c,function(){e(this).remove()})};m.instanceSelector=function(a,b){if(!a)return e.map(b,function(a){return a.inst});var c=[],d=e.map(b,function(a){return a.name}),f=function(a){if(e.isArray(a))for(var i=0,k=a.length;i<k;i++)f(a[i]);else"string"===typeof a?
-1!==a.indexOf(",")?f(a.split(",")):(a=e.inArray(e.trim(a),d),-1!==a&&c.push(b[a].inst)):"number"===typeof a&&c.push(b[a].inst)};f(a);return c};m.buttonSelector=function(a,b){for(var c=[],d=function(a,b){var g,f,h=[];e.each(b.s.buttons,function(a,b){null!==b&&h.push({node:b.node[0],name:b.conf.name})});e.each(b.s.subButtons,function(a,b){e.each(b,function(a,b){null!==b&&h.push({node:b.node[0],name:b.conf.name})})});g=e.map(h,function(a){return a.node});if(e.isArray(a)||a instanceof e){g=0;for(f=a.length;g<
f;g++)d(a[g],b)}else if(null===a||a===n||"*"===a){g=0;for(f=h.length;g<f;g++)c.push({inst:b,idx:b.toIndex(h[g].node)})}else if("number"===typeof a)c.push({inst:b,idx:a});else if("string"===typeof a)if(-1!==a.indexOf(",")){var j=a.split(",");g=0;for(f=j.length;g<f;g++)d(e.trim(j[g]),b)}else if(a.match(/^\d+(\-\d+)?$/))c.push({inst:b,idx:a});else if(-1!==a.indexOf(":name")){j=a.replace(":name","");g=0;for(f=h.length;g<f;g++)h[g].name===j&&c.push({inst:b,idx:b.toIndex(h[g].node)})}else e(g).filter(a).each(function(){c.push({inst:b,
idx:b.toIndex(this)})});else"object"===typeof a&&a.nodeName&&(f=e.inArray(a,g),-1!==f&&c.push({inst:b,idx:b.toIndex(g[f])}))},f=0,h=a.length;f<h;f++)d(b,a[f]);return c};m.defaults={buttons:["copy","excel","csv","pdf","print"],name:"main",tabIndex:0,dom:{container:{tag:"div",className:"dt-buttons"},collection:{tag:"div",className:"dt-button-collection"},button:{tag:"a",className:"dt-button",active:"active",disabled:"disabled"},buttonLiner:{tag:"span",className:""}}};m.version="1.1.2";e.extend(l,{collection:{text:function(a){return a.i18n("buttons.collection",
"Collection")},className:"buttons-collection",action:function(a,b,c,d){var a=c.offset(),f=e(b.table().container()),h=!1;e("div.dt-button-background").length&&(h=e("div.dt-button-collection").offset(),e(o).trigger("click.dtb-collection"));d._collection.addClass(d.collectionLayout).css("display","none").appendTo("body").fadeIn(d.fade);var i=d._collection.css("position");h&&"absolute"===i?d._collection.css({top:h.top+5,left:h.left+5}):"absolute"===i?(d._collection.css({top:a.top+c.outerHeight(),left:a.left}),
c=a.left+d._collection.outerWidth(),f=f.offset().left+f.width(),c>f&&d._collection.css("left",a.left-(c-f))):(a=d._collection.height()/2,a>e(p).height()/2&&(a=e(p).height()/2),d._collection.css("marginTop",-1*a));d.background&&m.background(!0,d.backgroundClassName,d.fade);setTimeout(function(){e("div.dt-button-background").on("click.dtb-collection",function(){});e("body").on("click.dtb-collection",function(a){if(!e(a.target).parents().andSelf().filter(d._collection).length){d._collection.fadeOut(d.fade,
function(){d._collection.detach()});e("div.dt-button-background").off("click.dtb-collection");m.background(false,d.backgroundClassName,d.fade);e("body").off("click.dtb-collection");b.off("buttons-action.b-internal")}})},10);if(d.autoClose)b.on("buttons-action.b-internal",function(){e("div.dt-button-background").click()})},background:!0,collectionLayout:"",backgroundClassName:"dt-button-background",autoClose:!1,fade:400},copy:function(a,b){if(l.copyHtml5)return"copyHtml5";if(l.copyFlash&&l.copyFlash.available(a,
b))return"copyFlash"},csv:function(a,b){if(l.csvHtml5&&l.csvHtml5.available(a,b))return"csvHtml5";if(l.csvFlash&&l.csvFlash.available(a,b))return"csvFlash"},excel:function(a,b){if(l.excelHtml5&&l.excelHtml5.available(a,b))return"excelHtml5";if(l.excelFlash&&l.excelFlash.available(a,b))return"excelFlash"},pdf:function(a,b){if(l.pdfHtml5&&l.pdfHtml5.available(a,b))return"pdfHtml5";if(l.pdfFlash&&l.pdfFlash.available(a,b))return"pdfFlash"},pageLength:function(a){var a=a.settings()[0].aLengthMenu,b=e.isArray(a[0])?
a[0]:a,c=e.isArray(a[0])?a[1]:a,d=function(a){return a.i18n("buttons.pageLength",{"-1":"Show all rows",_:"Show %d rows"},a.page.len())};return{extend:"collection",text:d,className:"buttons-page-length",autoClose:!0,buttons:e.map(b,function(a,b){return{text:c[b],action:function(b,c){c.page.len(a).draw()},init:function(b,c,d){var e=this,c=function(){e.active(b.page.len()===a)};b.on("length.dt"+d.namespace,c);c()},destroy:function(a,b,c){a.off("length.dt"+c.namespace)}}}),init:function(a,b,c){var e=
this;a.on("length.dt"+c.namespace,function(){e.text(d(a))})},destroy:function(a,b,c){a.off("length.dt"+c.namespace)}}}});j.Api.register("buttons()",function(a,b){b===n&&(b=a,a=n);return this.iterator(!0,"table",function(c){if(c._buttons)return m.buttonSelector(m.instanceSelector(a,c._buttons),b)},!0)});j.Api.register("button()",function(a,b){var c=this.buttons(a,b);1<c.length&&c.splice(1,c.length);return c});j.Api.registerPlural("buttons().active()","button().active()",function(a){return a===n?this.map(function(a){return a.inst.active(a.idx)}):
this.each(function(b){b.inst.active(b.idx,a)})});j.Api.registerPlural("buttons().action()","button().action()",function(a){return a===n?this.map(function(a){return a.inst.action(a.idx)}):this.each(function(b){b.inst.action(b.idx,a)})});j.Api.register(["buttons().enable()","button().enable()"],function(a){return this.each(function(b){b.inst.enable(b.idx,a)})});j.Api.register(["buttons().disable()","button().disable()"],function(){return this.each(function(a){a.inst.disable(a.idx)})});j.Api.registerPlural("buttons().nodes()",
"button().node()",function(){var a=e();e(this.each(function(b){a=a.add(b.inst.node(b.idx))}));return a});j.Api.registerPlural("buttons().text()","button().text()",function(a){return a===n?this.map(function(a){return a.inst.text(a.idx)}):this.each(function(b){b.inst.text(b.idx,a)})});j.Api.registerPlural("buttons().trigger()","button().trigger()",function(){return this.each(function(a){a.inst.node(a.idx).trigger("click")})});j.Api.registerPlural("buttons().containers()","buttons().container()",function(){var a=
e();e(this.each(function(b){a=a.add(b.inst.container())}));return a});j.Api.register("button().add()",function(a,b){1===this.length&&this[0].inst.add(a,b);return this.button(a)});j.Api.register("buttons().destroy()",function(){this.pluck("inst").unique().each(function(a){a.destroy()});return this});j.Api.registerPlural("buttons().remove()","buttons().remove()",function(){this.each(function(a){a.inst.removePrep(a.idx)});this.pluck("inst").unique().each(function(a){a.removeCommit()});return this});
var q;j.Api.register("buttons.info()",function(a,b,c){var d=this;if(!1===a)return e("#datatables_buttons_info").fadeOut(function(){e(this).remove()}),clearTimeout(q),q=null,this;q&&clearTimeout(q);e("#datatables_buttons_info").length&&e("#datatables_buttons_info").remove();e('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a?"<h2>"+a+"</h2>":"").append(e("<div/>")["string"===typeof b?"html":"append"](b)).css("display","none").appendTo("body").fadeIn();c!==n&&0!==c&&(q=setTimeout(function(){d.buttons.info(!1)},
c));return this});j.Api.register("buttons.exportData()",function(a){if(this.context.length){for(var b=new j.Api(this.context[0]),c=e.extend(!0,{},{rows:null,columns:"",modifier:{search:"applied",order:"applied"},orthogonal:"display",stripHtml:!0,stripNewlines:!0,decodeEntities:!0,trim:!0,format:{header:function(a){return d(a)},footer:function(a){return d(a)},body:function(a){return d(a)}}},a),d=function(a){if("string"!==typeof a)return a;c.stripHtml&&(a=a.replace(/<.*?>/g,""));c.trim&&(a=a.replace(/^\s+|\s+$/g,
""));c.stripNewlines&&(a=a.replace(/\n/g," "));c.decodeEntities&&(s.innerHTML=a,a=s.value);return a},a=b.columns(c.columns).indexes().map(function(a){return c.format.header(b.column(a).header().innerHTML,a)}).toArray(),f=b.table().footer()?b.columns(c.columns).indexes().map(function(a){var d=b.column(a).footer();return c.format.footer(d?d.innerHTML:"",a)}).toArray():null,h=b.rows(c.rows,c.modifier).indexes().toArray(),h=b.cells(h,c.columns).render(c.orthogonal).toArray(),i=a.length,k=0<i?h.length/
i:0,g=Array(k),l=0,m=0;m<k;m++){for(var n=Array(i),o=0;o<i;o++)n[o]=c.format.body(h[l],o,m),l++;g[m]=n}return{header:a,footer:f,body:g}}});var s=e("<textarea/>")[0];e.fn.dataTable.Buttons=m;e.fn.DataTable.Buttons=m;e(o).on("init.dt plugin-init.dt",function(a,b){if("dt"===a.namespace){var c=b.oInit.buttons||j.defaults.buttons;c&&!b._buttons&&(new m(b,c)).container()}});j.ext.feature.push({fnInit:function(a){var a=new j.Api(a),b=a.init().buttons||j.defaults.buttons;return(new m(a,b)).container()},cFeature:"B"});
return m});
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/*!
 Bootstrap integration for DataTables' Buttons
 ©2015 SpryMedia Ltd - datatables.net/license
*/

(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs","datatables.net-buttons"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);if(!b||!b.fn.dataTable)b=require("datatables.net-bs")(a,b).$;b.fn.dataTable.Buttons||require("datatables.net-buttons")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c){var a=c.fn.dataTable;c.extend(!0,a.Buttons.defaults,{dom:{container:{className:"dt-buttons btn-group"},
button:{className:"btn btn-default"},collection:{tag:"ul",className:"dt-button-collection dropdown-menu",button:{tag:"li",className:"dt-button"},buttonLiner:{tag:"a",className:""}}}});a.ext.buttons.collection.text=function(a){return a.i18n("buttons.collection",'Collection <span class="caret"/>')};return a.Buttons});
(function(g){"function"===typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(h){return g(h,window,document)}):"object"===typeof exports?module.exports=function(h,f){h||(h=window);if(!f||!f.fn.dataTable)f=require("datatables.net")(h,f).$;f.fn.dataTable.Buttons||require("datatables.net-buttons")(h,f);return g(f,h,h.document)}:g(jQuery,window,document)})(function(g,h,f,m){var i=g.fn.dataTable,e={version:"1.0.4-TableTools2",clients:{},moviePath:"",nextId:1,
$:function(a){"string"==typeof a&&(a=f.getElementById(a));a.addClass||(a.hide=function(){this.style.display="none"},a.show=function(){this.style.display=""},a.addClass=function(a){this.removeClass(a);this.className+=" "+a},a.removeClass=function(a){this.className=this.className.replace(RegExp("\\s*"+a+"\\s*")," ").replace(/^\s+/,"").replace(/\s+$/,"")},a.hasClass=function(a){return!!this.className.match(RegExp("\\s*"+a+"\\s*"))});return a},setMoviePath:function(a){this.moviePath=a},dispatch:function(a,
b,d){(a=this.clients[a])&&a.receiveEvent(b,d)},register:function(a,b){this.clients[a]=b},getDOMObjectPosition:function(a){var b={left:0,top:0,width:a.width?a.width:a.offsetWidth,height:a.height?a.height:a.offsetHeight};""!==a.style.width&&(b.width=a.style.width.replace("px",""));""!==a.style.height&&(b.height=a.style.height.replace("px",""));for(;a;)b.left+=a.offsetLeft,b.top+=a.offsetTop,a=a.offsetParent;return b},Client:function(a){this.handlers={};this.id=e.nextId++;this.movieId="ZeroClipboard_TableToolsMovie_"+
this.id;e.register(this.id,this);a&&this.glue(a)}};e.Client.prototype={id:0,ready:!1,movie:null,clipText:"",fileName:"",action:"copy",handCursorEnabled:!0,cssEffects:!0,handlers:null,sized:!1,sheetName:"",glue:function(a,b){this.domElement=e.$(a);var d=99;this.domElement.style.zIndex&&(d=parseInt(this.domElement.style.zIndex,10)+1);var c=e.getDOMObjectPosition(this.domElement);this.div=f.createElement("div");var j=this.div.style;j.position="absolute";j.left="0px";j.top="0px";j.width=c.width+"px";
j.height=c.height+"px";j.zIndex=d;"undefined"!=typeof b&&""!==b&&(this.div.title=b);0!==c.width&&0!==c.height&&(this.sized=!0);this.domElement&&(this.domElement.appendChild(this.div),this.div.innerHTML=this.getHTML(c.width,c.height).replace(/&/g,"&amp;"))},positionElement:function(){var a=e.getDOMObjectPosition(this.domElement),b=this.div.style;b.position="absolute";b.width=a.width+"px";b.height=a.height+"px";0!==a.width&&0!==a.height&&(this.sized=!0,b=this.div.childNodes[0],b.width=a.width,b.height=
a.height)},getHTML:function(a,b){var d="",c="id="+this.id+"&width="+a+"&height="+b;if(navigator.userAgent.match(/MSIE/))var j=location.href.match(/^https/i)?"https://":"http://",d=d+('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+j+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+a+'" height="'+b+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+
e.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+c+'"/><param name="wmode" value="transparent"/></object>');else d+='<embed id="'+this.movieId+'" src="'+e.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+a+'" height="'+b+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+
c+'" wmode="transparent" />';return d},hide:function(){this.div&&(this.div.style.left="-2000px")},show:function(){this.reposition()},destroy:function(){var a=this;this.domElement&&this.div&&(g(this.div).remove(),this.div=this.domElement=null,g.each(e.clients,function(b,d){d===a&&delete e.clients[b]}))},reposition:function(a){a&&((this.domElement=e.$(a))||this.hide());if(this.domElement&&this.div){var a=e.getDOMObjectPosition(this.domElement),b=this.div.style;b.left=""+a.left+"px";b.top=""+a.top+"px"}},
clearText:function(){this.clipText="";this.ready&&this.movie.clearText()},appendText:function(a){this.clipText+=a;this.ready&&this.movie.appendText(a)},setText:function(a){this.clipText=a;this.ready&&this.movie.setText(a)},setFileName:function(a){this.fileName=a;this.ready&&this.movie.setFileName(a)},setSheetName:function(a){this.sheetName=a;this.ready&&this.movie.setSheetName(a)},setAction:function(a){this.action=a;this.ready&&this.movie.setAction(a)},addEventListener:function(a,b){a=a.toString().toLowerCase().replace(/^on/,
"");this.handlers[a]||(this.handlers[a]=[]);this.handlers[a].push(b)},setHandCursor:function(a){this.handCursorEnabled=a;this.ready&&this.movie.setHandCursor(a)},setCSSEffects:function(a){this.cssEffects=!!a},receiveEvent:function(a,b){var d,a=a.toString().toLowerCase().replace(/^on/,"");switch(a){case "load":this.movie=f.getElementById(this.movieId);if(!this.movie){d=this;setTimeout(function(){d.receiveEvent("load",null)},1);return}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){d=
this;setTimeout(function(){d.receiveEvent("load",null)},100);this.ready=!0;return}this.ready=!0;this.movie.clearText();this.movie.appendText(this.clipText);this.movie.setFileName(this.fileName);this.movie.setAction(this.action);this.movie.setHandCursor(this.handCursorEnabled);break;case "mouseover":this.domElement&&this.cssEffects&&this.recoverActive&&this.domElement.addClass("active");break;case "mouseout":this.domElement&&this.cssEffects&&(this.recoverActive=!1,this.domElement.hasClass("active")&&
(this.domElement.removeClass("active"),this.recoverActive=!0));break;case "mousedown":this.domElement&&this.cssEffects&&this.domElement.addClass("active");break;case "mouseup":this.domElement&&this.cssEffects&&(this.domElement.removeClass("active"),this.recoverActive=!1)}if(this.handlers[a])for(var c=0,j=this.handlers[a].length;c<j;c++){var e=this.handlers[a][c];if("function"==typeof e)e(this,b);else if("object"==typeof e&&2==e.length)e[0][e[1]](this,b);else if("string"==typeof e)h[e](this,b)}}};
e.hasFlash=function(){try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return!0}catch(a){if(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]!==m&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)return!0}return!1};h.ZeroClipboard_TableTools=e;var o=function(a,b){b.attr("id");b.parents("html").length?a.glue(b[0],""):setTimeout(function(){o(a,b)},500)},n=function(a,b){var d="*"===a.filename&&"*"!==a.title&&a.title!==m?a.title:a.filename;"function"===
typeof d&&(d=d());-1!==d.indexOf("*")&&(d=d.replace("*",g("title").text()));d=d.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,"");return b===m||!0===b?d+a.extension:d},q=function(a){var b="Sheet1";a.sheetName&&(b=a.sheetName.replace(/[\[\]\*\/\\\?\:]/g,""));return b},r=function(a){a=a.title;"function"===typeof a&&(a=a());return-1!==a.indexOf("*")?a.replace("*",g("title").text()):a},k=function(a,b){var d=b.match(/[\s\S]{1,8192}/g)||[];a.clearText();for(var c=0,e=d.length;c<e;c++)a.appendText(d[c])},
p=function(a,b){for(var d=b.newline?b.newline:navigator.userAgent.match(/Windows/)?"\r\n":"\n",c=a.buttons.exportData(b.exportOptions),e=b.fieldBoundary,g=b.fieldSeparator,h=RegExp(e,"g"),s=b.escapeChar!==m?b.escapeChar:"\\",f=function(a){for(var b="",c=0,d=a.length;c<d;c++)0<c&&(b+=g),b+=e?e+(""+a[c]).replace(h,s+e)+e:a[c];return b},t=b.header?f(c.header)+d:"",i=b.footer&&c.footer?d+f(c.footer):"",k=[],l=0,n=c.body.length;l<n;l++)k.push(f(c.body[l]));return{str:t+k.join(d)+i,rows:k.length}},l={available:function(){return e.hasFlash()},
init:function(a,b,d){e.moviePath=i.Buttons.swfPath;var c=new e.Client;c.setHandCursor(!0);c.addEventListener("mouseDown",function(){d._fromFlash=!0;a.button(b[0]).trigger();d._fromFlash=!1});o(c,b);d._flash=c},destroy:function(a,b,d){d._flash.destroy()},fieldSeparator:",",fieldBoundary:'"',exportOptions:{},title:"*",filename:"*",extension:".csv",header:!0,footer:!1};i.Buttons.swfPath="//cdn.datatables.net/buttons/1.0.0/swf/flashExport.swf";i.Api.register("buttons.resize()",function(){g.each(e.clients,
function(a,b){b.domElement!==m&&b.domElement.parentNode&&b.positionElement()})});i.ext.buttons.copyFlash=g.extend({},l,{className:"buttons-copy buttons-flash",text:function(a){return a.i18n("buttons.copy","Copy")},action:function(a,b,d,c){c._fromFlash&&(a=c._flash,d=p(b,c),c=c.customize?c.customize(d.str,c):d.str,a.setAction("copy"),k(a,c),b.buttons.info(b.i18n("buttons.copyTitle","Copy to clipboard"),b.i18n("buttons.copyInfo",{_:"Copied %d rows to clipboard",1:"Copied 1 row to clipboard"},d.rows),
3E3))},fieldSeparator:"\t",fieldBoundary:""});i.ext.buttons.csvFlash=g.extend({},l,{className:"buttons-csv buttons-flash",text:function(a){return a.i18n("buttons.csv","CSV")},action:function(a,b,d,c){a=c._flash;b=p(b,c);b=c.customize?c.customize(b.str,c):b.str;a.setAction("csv");a.setFileName(n(c));k(a,b)},escapeChar:'"'});i.ext.buttons.excelFlash=g.extend({},l,{className:"buttons-excel buttons-flash",text:function(a){return a.i18n("buttons.excel","Excel")},action:function(a,b,d,c){var a="",d=c._flash,
b=b.buttons.exportData(c.exportOptions),e=function(a){for(var b=[],c=0,d=a.length;c<d;c++){if(null===a[c]||a[c]===m)a[c]="";b.push("number"===typeof a[c]||a[c].match&&g.trim(a[c]).match(/^-?\d+(\.\d+)?$/)&&"0"!==a[c].charAt(0)?'<c t="n"><v>'+a[c]+"</v></c>":'<c t="inlineStr"><is><t>'+(!a[c].replace?a[c]:a[c].replace(/&(?!amp;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/[\x00-\x1F\x7F-\x9F]/g,""))+"</t></is></c>")}return"<row>"+b.join("")+"</row>"};c.header&&(a+=e(b.header));for(var f=
0,h=b.body.length;f<h;f++)a+=e(b.body[f]);c.footer&&(a+=e(b.footer));d.setAction("excel");d.setFileName(n(c));d.setSheetName(q(c));k(d,a)},extension:".xlsx"});i.ext.buttons.pdfFlash=g.extend({},l,{className:"buttons-pdf buttons-flash",text:function(a){return a.i18n("buttons.pdf","PDF")},action:function(a,b,d,c){var a=c._flash,d=b.buttons.exportData(c.exportOptions),e=b.table().node().offsetWidth,f=b.columns(c.columns).indexes().map(function(a){return b.column(a).header().offsetWidth/e});a.setAction("pdf");
a.setFileName(r(c));k(a,JSON.stringify({title:n(c,!1),message:c.message,colWidth:f.toArray(),orientation:c.orientation,size:c.pageSize,header:c.header?d.header:null,footer:c.footer?d.footer:null,body:d.body}))},extension:".pdf",orientation:"portrait",pageSize:"A4",message:"",newline:"\n"});return i.Buttons});
(function(g){"function"===typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(d){return g(d,window,document)}):"object"===typeof exports?module.exports=function(d,f){d||(d=window);if(!f||!f.fn.dataTable)f=require("datatables.net")(d,f).$;f.fn.dataTable.Buttons||require("datatables.net-buttons")(d,f);return g(f,d,d.document)}:g(jQuery,window,document)})(function(g,d,f,k){var l=g.fn.dataTable,j;if("undefined"!==typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))j=
void 0;else{var x=d.document,q=x.createElementNS("http://www.w3.org/1999/xhtml","a"),E="download"in q,r=d.webkitRequestFileSystem,y=d.requestFileSystem||r||d.mozRequestFileSystem,F=function(a){(d.setImmediate||d.setTimeout)(function(){throw a;},0)},s=0,t=function(a){var b=function(){"string"===typeof a?(d.URL||d.webkitURL||d).revokeObjectURL(a):a.remove()};d.chrome?b():setTimeout(b,500)},u=function(a,b,e){for(var b=[].concat(b),c=b.length;c--;){var d=a["on"+b[c]];if("function"===typeof d)try{d.call(a,
e||a)}catch(i){F(i)}}},A=function(a){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["﻿",a],{type:a.type}):a},B=function(a,b){var a=A(a),e=this,c=a.type,z=!1,i,g,m=function(){u(e,["writestart","progress","write","writeend"])},o=function(){if(z||!i)i=(d.URL||d.webkitURL||d).createObjectURL(a);g?g.location.href=i:d.open(i,"_blank")===k&&"undefined"!==typeof safari&&(d.location.href=i);e.readyState=e.DONE;m();t(i)},n=function(a){return function(){if(e.readyState!==
e.DONE)return a.apply(this,arguments)}},f={create:!0,exclusive:!1},h;e.readyState=e.INIT;b||(b="download");if(E)i=(d.URL||d.webkitURL||d).createObjectURL(a),q.href=i,q.download=b,c=x.createEvent("MouseEvents"),c.initMouseEvent("click",!0,!1,d,0,0,0,0,0,!1,!1,!1,!1,0,null),q.dispatchEvent(c),e.readyState=e.DONE,m(),t(i);else{d.chrome&&(c&&"application/octet-stream"!==c)&&(h=a.slice||a.webkitSlice,a=h.call(a,0,a.size,"application/octet-stream"),z=!0);r&&"download"!==b&&(b+=".download");if("application/octet-stream"===
c||r)g=d;y?(s+=a.size,y(d.TEMPORARY,s,n(function(c){c.root.getDirectory("saved",f,n(function(c){var d=function(){c.getFile(b,f,n(function(b){b.createWriter(n(function(c){c.onwriteend=function(a){g.location.href=b.toURL();e.readyState=e.DONE;u(e,"writeend",a);t(b)};c.onerror=function(){var a=c.error;a.code!==a.ABORT_ERR&&o()};["writestart","progress","write","abort"].forEach(function(a){c["on"+a]=e["on"+a]});c.write(a);e.abort=function(){c.abort();e.readyState=e.DONE};e.readyState=e.WRITING}),o)}),
o)};c.getFile(b,{create:false},n(function(a){a.remove();d()}),n(function(a){a.code===a.NOT_FOUND_ERR?d():o()}))}),o)}),o)):o()}},h=B.prototype;"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob?j=function(a,b){return navigator.msSaveOrOpenBlob(A(a),b)}:(h.abort=function(){this.readyState=this.DONE;u(this,"abort")},h.readyState=h.INIT=0,h.WRITING=1,h.DONE=2,h.error=h.onwritestart=h.onprogress=h.onwrite=h.onabort=h.onerror=h.onwriteend=null,j=function(a,b){return new B(a,b)})}var v=function(a,
b){var e="*"===a.filename&&"*"!==a.title&&a.title!==k?a.title:a.filename;"function"===typeof e&&(e=e());-1!==e.indexOf("*")&&(e=e.replace("*",g("title").text()));e=e.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,"");return b===k||!0===b?e+a.extension:e},G=function(a){var b="Sheet1";a.sheetName&&(b=a.sheetName.replace(/[\[\]\*\/\\\?\:]/g,""));return b},H=function(a){a=a.title;"function"===typeof a&&(a=a());return-1!==a.indexOf("*")?a.replace("*",g("title").text()):a},w=function(a){return a.newline?
a.newline:navigator.userAgent.match(/Windows/)?"\r\n":"\n"},C=function(a,b){for(var e=w(b),c=a.buttons.exportData(b.exportOptions),d=b.fieldBoundary,i=b.fieldSeparator,g=RegExp(d,"g"),m=b.escapeChar!==k?b.escapeChar:"\\",f=function(a){for(var b="",c=0,e=a.length;c<e;c++)0<c&&(b+=i),b+=d?d+(""+a[c]).replace(g,m+d)+d:a[c];return b},n=b.header?f(c.header)+e:"",h=b.footer&&c.footer?e+f(c.footer):"",j=[],l=0,p=c.body.length;l<p;l++)j.push(f(c.body[l]));return{str:n+j.join(e)+h,rows:j.length}},D=function(){return-1!==
navigator.userAgent.indexOf("Safari")&&-1===navigator.userAgent.indexOf("Chrome")&&-1===navigator.userAgent.indexOf("Opera")},p={"_rels/.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\t<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',"xl/_rels/workbook.xml.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\t<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
"[Content_Types].xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\t<Default Extension="xml" ContentType="application/xml"/>\t<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\t<Default Extension="jpeg" ContentType="image/jpeg"/>\t<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>\t<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
"xl/workbook.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\t<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>\t<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>\t<bookViews>\t\t<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>\t</bookViews>\t<sheets>\t\t<sheet name="__SHEET_NAME__" sheetId="1" r:id="rId1"/>\t</sheets></workbook>',
"xl/worksheets/sheet1.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">\t<sheetData>\t\t__DATA__\t</sheetData></worksheet>'};l.ext.buttons.copyHtml5={className:"buttons-copy buttons-html5",
text:function(a){return a.i18n("buttons.copy","Copy")},action:function(a,b,e,c){var a=C(b,c),d=a.str,e=g("<div/>").css({height:1,width:1,overflow:"hidden",position:"fixed",top:0,left:0});c.customize&&(d=c.customize(d,c));c=g("<textarea readonly/>").val(d).appendTo(e);if(f.queryCommandSupported("copy")){e.appendTo(b.table().container());c[0].focus();c[0].select();try{f.execCommand("copy");e.remove();b.buttons.info(b.i18n("buttons.copyTitle","Copy to clipboard"),b.i18n("buttons.copySuccess",{1:"Copied one row to clipboard",
_:"Copied %d rows to clipboard"},a.rows),2E3);return}catch(i){}}a=g("<span>"+b.i18n("buttons.copyKeys","Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.")+"</span>").append(e);b.buttons.info(b.i18n("buttons.copyTitle","Copy to clipboard"),a,0);c[0].focus();c[0].select();var h=g(a).closest(".dt-button-info"),m=function(){h.off("click.buttons-copy");g(f).off(".buttons-copy");b.buttons.info(!1)};h.on("click.buttons-copy",
m);g(f).on("keydown.buttons-copy",function(a){27===a.keyCode&&m()}).on("copy.buttons-copy cut.buttons-copy",function(){m()})},exportOptions:{},fieldSeparator:"\t",fieldBoundary:"",header:!0,footer:!1};l.ext.buttons.csvHtml5={className:"buttons-csv buttons-html5",available:function(){return d.FileReader!==k&&d.Blob},text:function(a){return a.i18n("buttons.csv","CSV")},action:function(a,b,d,c){w(c);a=C(b,c).str;b=c.charset;c.customize&&(a=c.customize(a,c));!1!==b?(b||(b=f.characterSet||f.charset),b&&
(b=";charset="+b)):b="";j(new Blob([a],{type:"text/csv"+b}),v(c))},filename:"*",extension:".csv",exportOptions:{},fieldSeparator:",",fieldBoundary:'"',escapeChar:'"',charset:null,header:!0,footer:!1};l.ext.buttons.excelHtml5={className:"buttons-excel buttons-html5",available:function(){return d.FileReader!==k&&d.JSZip!==k&&!D()},text:function(a){return a.i18n("buttons.excel","Excel")},action:function(a,b,e,c){a="";b=b.buttons.exportData(c.exportOptions);e=function(a){for(var b=[],c=0,d=a.length;c<
d;c++){if(null===a[c]||a[c]===k)a[c]="";b.push("number"===typeof a[c]||a[c].match&&g.trim(a[c]).match(/^-?\d+(\.\d+)?$/)&&"0"!==a[c].charAt(0)?'<c t="n"><v>'+a[c]+"</v></c>":'<c t="inlineStr"><is><t>'+(!a[c].replace?a[c]:a[c].replace(/&(?!amp;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,""))+"</t></is></c>")}return"<row>"+b.join("")+"</row>"};c.header&&(a+=e(b.header));for(var f=0,i=b.body.length;f<i;f++)a+=e(b.body[f]);c.footer&&(a+=e(b.footer));
var b=new d.JSZip,e=b.folder("_rels"),f=b.folder("xl"),i=b.folder("xl/_rels"),h=b.folder("xl/worksheets");b.file("[Content_Types].xml",p["[Content_Types].xml"]);e.file(".rels",p["_rels/.rels"]);f.file("workbook.xml",p["xl/workbook.xml"].replace("__SHEET_NAME__",G(c)));i.file("workbook.xml.rels",p["xl/_rels/workbook.xml.rels"]);h.file("sheet1.xml",p["xl/worksheets/sheet1.xml"].replace("__DATA__",a));j(b.generate({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),
v(c))},filename:"*",extension:".xlsx",exportOptions:{},header:!0,footer:!1};l.ext.buttons.pdfHtml5={className:"buttons-pdf buttons-html5",available:function(){return d.FileReader!==k&&d.pdfMake},text:function(a){return a.i18n("buttons.pdf","PDF")},action:function(a,b,e,c){w(c);a=b.buttons.exportData(c.exportOptions);b=[];c.header&&b.push(g.map(a.header,function(a){return{text:"string"===typeof a?a:a+"",style:"tableHeader"}}));for(var f=0,e=a.body.length;f<e;f++)b.push(g.map(a.body[f],function(a){return{text:"string"===
typeof a?a:a+"",style:f%2?"tableBodyEven":"tableBodyOdd"}}));c.footer&&b.push(g.map(a.footer,function(a){return{text:"string"===typeof a?a:a+"",style:"tableFooter"}}));a={pageSize:c.pageSize,pageOrientation:c.orientation,content:[{table:{headerRows:1,body:b},layout:"noBorders"}],styles:{tableHeader:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154",alignment:"center"},tableBodyEven:{},tableBodyOdd:{fillColor:"#f3f3f3"},tableFooter:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154"},title:{alignment:"center",
fontSize:15},message:{}},defaultStyle:{fontSize:10}};c.message&&a.content.unshift({text:c.message,style:"message",margin:[0,0,0,12]});c.title&&a.content.unshift({text:H(c,!1),style:"title",margin:[0,0,0,12]});c.customize&&c.customize(a,c);a=d.pdfMake.createPdf(a);"open"===c.download&&!D()?a.open():a.getBuffer(function(a){a=new Blob([a],{type:"application/pdf"});j(a,v(c))})},title:"*",filename:"*",extension:".pdf",exportOptions:{},orientation:"portrait",pageSize:"A4",header:!0,footer:!1,message:null,
customize:null,download:"download"};return l.Buttons});
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(e){return d(e,window,document)}):"object"===typeof exports?module.exports=function(e,a){e||(e=window);if(!a||!a.fn.dataTable)a=require("datatables.net")(e,a).$;a.fn.dataTable.Buttons||require("datatables.net-buttons")(e,a);return d(a,e,e.document)}:d(jQuery,window,document)})(function(d,e,a){var i=d.fn.dataTable,g=a.createElement("a");i.ext.buttons.print={className:"buttons-print",
text:function(c){return c.i18n("buttons.print","Print")},action:function(c,b,a,f){c=b.buttons.exportData(f.exportOptions);a=function(c,a){for(var b="<tr>",d=0,e=c.length;d<e;d++)b+="<"+a+">"+c[d]+"</"+a+">";return b+"</tr>"};b='<table class="'+b.table().node().className+'">';f.header&&(b+="<thead>"+a(c.header,"th")+"</thead>");for(var b=b+"<tbody>",j=0,i=c.body.length;j<i;j++)b+=a(c.body[j],"td");b+="</tbody>";f.footer&&(b+="<tfoot>"+a(c.footer,"th")+"</tfoot>");var h=e.open("",""),c=f.title;"function"===
typeof c&&(c=c());-1!==c.indexOf("*")&&(c=c.replace("*",d("title").text()));h.document.close();var k="<title>"+c+"</title>";d("style, link").each(function(){var c=k,b=d(this).clone()[0],a;"link"===b.nodeName.toLowerCase()&&(g.href=b.href,a=g.host,-1===a.indexOf("/")&&0!==g.pathname.indexOf("/")&&(a+="/"),b.href=g.protocol+"//"+a+g.pathname+g.search);k=c+b.outerHTML});d(h.document.head).html(k);d(h.document.body).html("<h1>"+c+"</h1><div>"+f.message+"</div>"+b);f.customize&&f.customize(h);setTimeout(function(){f.autoPrint&&
(h.print(),h.close())},250)},title:"*",message:"",exportOptions:{},header:!0,footer:!1,autoPrint:!0,customize:null};return i.Buttons});
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
/*!

JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2014 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JSZip=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){if(a){this.data=a,this.length=this.data.length,this.index=0,this.zero=0;for(var b=0;b<this.data.length;b++)a[b]=255&a[b]}}var e=a("./dataReader");d.prototype=new e,d.prototype.byteAt=function(a){return this.data[this.zero+a]},d.prototype.lastIndexOfSignature=function(a){for(var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.length-4;f>=0;--f)if(this.data[f]===b&&this.data[f+1]===c&&this.data[f+2]===d&&this.data[f+3]===e)return f-this.zero;return-1},d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return[];var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"./dataReader":6}],2:[function(a,b,c){"use strict";var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";c.encode=function(a,b){for(var c,e,f,g,h,i,j,k="",l=0;l<a.length;)c=a.charCodeAt(l++),e=a.charCodeAt(l++),f=a.charCodeAt(l++),g=c>>2,h=(3&c)<<4|e>>4,i=(15&e)<<2|f>>6,j=63&f,isNaN(e)?i=j=64:isNaN(f)&&(j=64),k=k+d.charAt(g)+d.charAt(h)+d.charAt(i)+d.charAt(j);return k},c.decode=function(a,b){var c,e,f,g,h,i,j,k="",l=0;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<a.length;)g=d.indexOf(a.charAt(l++)),h=d.indexOf(a.charAt(l++)),i=d.indexOf(a.charAt(l++)),j=d.indexOf(a.charAt(l++)),c=g<<2|h>>4,e=(15&h)<<4|i>>2,f=(3&i)<<6|j,k+=String.fromCharCode(c),64!=i&&(k+=String.fromCharCode(e)),64!=j&&(k+=String.fromCharCode(f));return k}},{}],3:[function(a,b,c){"use strict";function d(){this.compressedSize=0,this.uncompressedSize=0,this.crc32=0,this.compressionMethod=null,this.compressedContent=null}d.prototype={getContent:function(){return null},getCompressedContent:function(){return null}},b.exports=d},{}],4:[function(a,b,c){"use strict";c.STORE={magic:"\x00\x00",compress:function(a,b){return a},uncompress:function(a){return a},compressInputType:null,uncompressInputType:null},c.DEFLATE=a("./flate")},{"./flate":9}],5:[function(a,b,c){"use strict";var d=a("./utils"),e=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];b.exports=function(a,b){if("undefined"==typeof a||!a.length)return 0;var c="string"!==d.getTypeOf(a);"undefined"==typeof b&&(b=0);var f=0,g=0,h=0;b=-1^b;for(var i=0,j=a.length;j>i;i++)h=c?a[i]:a.charCodeAt(i),g=255&(b^h),f=e[g],b=b>>>8^f;return-1^b}},{"./utils":22}],6:[function(a,b,c){"use strict";function d(a){this.data=null,this.length=0,this.index=0,this.zero=0}var e=a("./utils");d.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||0>a)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(a){},readInt:function(a){var b,c=0;for(this.checkOffset(a),b=this.index+a-1;b>=this.index;b--)c=(c<<8)+this.byteAt(b);return this.index+=a,c},readString:function(a){return e.transformTo("string",this.readData(a))},readData:function(a){},lastIndexOfSignature:function(a){},readDate:function(){var a=this.readInt(4);return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1)}},b.exports=d},{"./utils":22}],7:[function(a,b,c){"use strict";c.base64=!1,c.binary=!1,c.dir=!1,c.createFolders=!1,c.date=null,c.compression=null,c.compressionOptions=null,c.comment=null,c.unixPermissions=null,c.dosPermissions=null},{}],8:[function(a,b,c){"use strict";var d=a("./utils");c.string2binary=function(a){return d.string2binary(a)},c.string2Uint8Array=function(a){return d.transformTo("uint8array",a)},c.uint8Array2String=function(a){return d.transformTo("string",a)},c.string2Blob=function(a){var b=d.transformTo("arraybuffer",a);return d.arrayBuffer2Blob(b)},c.arrayBuffer2Blob=function(a){return d.arrayBuffer2Blob(a)},c.transformTo=function(a,b){return d.transformTo(a,b)},c.getTypeOf=function(a){return d.getTypeOf(a)},c.checkSupport=function(a){return d.checkSupport(a)},c.MAX_VALUE_16BITS=d.MAX_VALUE_16BITS,c.MAX_VALUE_32BITS=d.MAX_VALUE_32BITS,c.pretty=function(a){return d.pretty(a)},c.findCompression=function(a){return d.findCompression(a)},c.isRegExp=function(a){return d.isRegExp(a)}},{"./utils":22}],9:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,e=a("pako");c.uncompressInputType=d?"uint8array":"array",c.compressInputType=d?"uint8array":"array",c.magic="\b\x00",c.compress=function(a,b){return e.deflateRaw(a,{level:b.level||-1})},c.uncompress=function(a){return e.inflateRaw(a)}},{pako:25}],10:[function(a,b,c){"use strict";function d(a,b){return this instanceof d?(this.files={},this.comment=null,this.root="",a&&this.load(a,b),void(this.clone=function(){var a=new d;for(var b in this)"function"!=typeof this[b]&&(a[b]=this[b]);return a})):new d(a,b)}var e=a("./base64");d.prototype=a("./object"),d.prototype.load=a("./load"),d.support=a("./support"),d.defaults=a("./defaults"),d.utils=a("./deprecatedPublicUtils"),d.base64={encode:function(a){return e.encode(a)},decode:function(a){return e.decode(a)}},d.compressions=a("./compressions"),b.exports=d},{"./base64":2,"./compressions":4,"./defaults":7,"./deprecatedPublicUtils":8,"./load":11,"./object":14,"./support":18}],11:[function(a,b,c){"use strict";var d=a("./base64"),e=a("./utf8"),f=a("./utils"),g=a("./zipEntries");b.exports=function(a,b){var c,h,i,j;for(b=f.extend(b||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:e.utf8decode}),b.base64&&(a=d.decode(a)),h=new g(a,b),c=h.files,i=0;i<c.length;i++)j=c[i],this.file(j.fileNameStr,j.decompressed,{binary:!0,optimizedBinaryString:!0,date:j.date,dir:j.dir,comment:j.fileCommentStr.length?j.fileCommentStr:null,unixPermissions:j.unixPermissions,dosPermissions:j.dosPermissions,createFolders:b.createFolders});return h.zipComment.length&&(this.comment=h.zipComment),this}},{"./base64":2,"./utf8":21,"./utils":22,"./zipEntries":23}],12:[function(a,b,c){(function(a){"use strict";b.exports=function(b,c){return new a(b,c)},b.exports.test=function(b){return a.isBuffer(b)}}).call(this,"undefined"!=typeof Buffer?Buffer:void 0)},{}],13:[function(a,b,c){"use strict";function d(a){this.data=a,this.length=this.data.length,this.index=0,this.zero=0}var e=a("./uint8ArrayReader");d.prototype=new e,d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"./uint8ArrayReader":19}],14:[function(a,b,c){"use strict";var d=a("./support"),e=a("./utils"),f=a("./crc32"),g=a("./signature"),h=a("./defaults"),i=a("./base64"),j=a("./compressions"),k=a("./compressedObject"),l=a("./nodeBuffer"),m=a("./utf8"),n=a("./stringWriter"),o=a("./uint8ArrayWriter"),p=function(a){if(a._data instanceof k&&(a._data=a._data.getContent(),a.options.binary=!0,a.options.base64=!1,"uint8array"===e.getTypeOf(a._data))){var b=a._data;a._data=new Uint8Array(b.length),0!==b.length&&a._data.set(b,0)}return a._data},q=function(a){var b=p(a),c=e.getTypeOf(b);return"string"===c?!a.options.binary&&d.nodebuffer?l(b,"utf-8"):a.asBinary():b},r=function(a){var b=p(this);return null===b||"undefined"==typeof b?"":(this.options.base64&&(b=i.decode(b)),b=a&&this.options.binary?D.utf8decode(b):e.transformTo("string",b),a||this.options.binary||(b=e.transformTo("string",D.utf8encode(b))),b)},s=function(a,b,c){this.name=a,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=b,this.options=c,this._initialMetadata={dir:c.dir,date:c.date}};s.prototype={asText:function(){return r.call(this,!0)},asBinary:function(){return r.call(this,!1)},asNodeBuffer:function(){var a=q(this);return e.transformTo("nodebuffer",a)},asUint8Array:function(){var a=q(this);return e.transformTo("uint8array",a)},asArrayBuffer:function(){return this.asUint8Array().buffer}};var t=function(a,b){var c,d="";for(c=0;b>c;c++)d+=String.fromCharCode(255&a),a>>>=8;return d},u=function(a){return a=a||{},a.base64!==!0||null!==a.binary&&void 0!==a.binary||(a.binary=!0),a=e.extend(a,h),a.date=a.date||new Date,null!==a.compression&&(a.compression=a.compression.toUpperCase()),a},v=function(a,b,c){var d,f=e.getTypeOf(b);if(c=u(c),"string"==typeof c.unixPermissions&&(c.unixPermissions=parseInt(c.unixPermissions,8)),c.unixPermissions&&16384&c.unixPermissions&&(c.dir=!0),c.dosPermissions&&16&c.dosPermissions&&(c.dir=!0),c.dir&&(a=x(a)),c.createFolders&&(d=w(a))&&y.call(this,d,!0),c.dir||null===b||"undefined"==typeof b)c.base64=!1,c.binary=!1,b=null,f=null;else if("string"===f)c.binary&&!c.base64&&c.optimizedBinaryString!==!0&&(b=e.string2binary(b));else{if(c.base64=!1,c.binary=!0,!(f||b instanceof k))throw new Error("The data of '"+a+"' is in an unsupported format !");"arraybuffer"===f&&(b=e.transformTo("uint8array",b))}var g=new s(a,b,c);return this.files[a]=g,g},w=function(a){"/"==a.slice(-1)&&(a=a.substring(0,a.length-1));var b=a.lastIndexOf("/");return b>0?a.substring(0,b):""},x=function(a){return"/"!=a.slice(-1)&&(a+="/"),a},y=function(a,b){return b="undefined"!=typeof b?b:!1,a=x(a),this.files[a]||v.call(this,a,null,{dir:!0,createFolders:b}),this.files[a]},z=function(a,b,c){var d,g=new k;return a._data instanceof k?(g.uncompressedSize=a._data.uncompressedSize,g.crc32=a._data.crc32,0===g.uncompressedSize||a.dir?(b=j.STORE,g.compressedContent="",g.crc32=0):a._data.compressionMethod===b.magic?g.compressedContent=a._data.getCompressedContent():(d=a._data.getContent(),g.compressedContent=b.compress(e.transformTo(b.compressInputType,d),c))):(d=q(a),d&&0!==d.length&&!a.dir||(b=j.STORE,d=""),g.uncompressedSize=d.length,g.crc32=f(d),g.compressedContent=b.compress(e.transformTo(b.compressInputType,d),c)),g.compressedSize=g.compressedContent.length,g.compressionMethod=b.magic,g},A=function(a,b){var c=a;return a||(c=b?16893:33204),(65535&c)<<16},B=function(a,b){return 63&(a||0)},C=function(a,b,c,d,h,i){var j,k,l,n,o=(c.compressedContent,i!==m.utf8encode),p=e.transformTo("string",i(b.name)),q=e.transformTo("string",m.utf8encode(b.name)),r=b.comment||"",s=e.transformTo("string",i(r)),u=e.transformTo("string",m.utf8encode(r)),v=q.length!==b.name.length,w=u.length!==r.length,x=b.options,y="",z="",C="";l=b._initialMetadata.dir!==b.dir?b.dir:x.dir,n=b._initialMetadata.date!==b.date?b.date:x.date;var D=0,E=0;l&&(D|=16),"UNIX"===h?(E=798,D|=A(b.unixPermissions,l)):(E=20,D|=B(b.dosPermissions,l)),j=n.getHours(),j<<=6,j|=n.getMinutes(),j<<=5,j|=n.getSeconds()/2,k=n.getFullYear()-1980,k<<=4,k|=n.getMonth()+1,k<<=5,k|=n.getDate(),v&&(z=t(1,1)+t(f(p),4)+q,y+="up"+t(z.length,2)+z),w&&(C=t(1,1)+t(this.crc32(s),4)+u,y+="uc"+t(C.length,2)+C);var F="";F+="\n\x00",F+=o||!v&&!w?"\x00\x00":"\x00\b",F+=c.compressionMethod,F+=t(j,2),F+=t(k,2),F+=t(c.crc32,4),F+=t(c.compressedSize,4),F+=t(c.uncompressedSize,4),F+=t(p.length,2),F+=t(y.length,2);var G=g.LOCAL_FILE_HEADER+F+p+y,H=g.CENTRAL_FILE_HEADER+t(E,2)+F+t(s.length,2)+"\x00\x00\x00\x00"+t(D,4)+t(d,4)+p+y+s;return{fileRecord:G,dirRecord:H,compressedObject:c}},D={load:function(a,b){throw new Error("Load method is not defined. Is the file jszip-load.js included ?")},filter:function(a){var b,c,d,f,g=[];for(b in this.files)this.files.hasOwnProperty(b)&&(d=this.files[b],f=new s(d.name,d._data,e.extend(d.options)),c=b.slice(this.root.length,b.length),b.slice(0,this.root.length)===this.root&&a(c,f)&&g.push(f));return g},file:function(a,b,c){if(1===arguments.length){if(e.isRegExp(a)){var d=a;return this.filter(function(a,b){return!b.dir&&d.test(a)})}return this.filter(function(b,c){return!c.dir&&b===a})[0]||null}return a=this.root+a,v.call(this,a,b,c),this},folder:function(a){if(!a)return this;if(e.isRegExp(a))return this.filter(function(b,c){return c.dir&&a.test(b)});var b=this.root+a,c=y.call(this,b),d=this.clone();return d.root=c.name,d},remove:function(a){a=this.root+a;var b=this.files[a];if(b||("/"!=a.slice(-1)&&(a+="/"),b=this.files[a]),b&&!b.dir)delete this.files[a];else for(var c=this.filter(function(b,c){return c.name.slice(0,a.length)===a}),d=0;d<c.length;d++)delete this.files[c[d].name];return this},generate:function(a){a=e.extend(a||{},{base64:!0,compression:"STORE",compressionOptions:null,type:"base64",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:m.utf8encode}),e.checkSupport(a.type),"darwin"!==a.platform&&"freebsd"!==a.platform&&"linux"!==a.platform&&"sunos"!==a.platform||(a.platform="UNIX"),"win32"===a.platform&&(a.platform="DOS");var b,c,d=[],f=0,h=0,k=e.transformTo("string",a.encodeFileName(a.comment||this.comment||""));for(var l in this.files)if(this.files.hasOwnProperty(l)){var p=this.files[l],q=p.options.compression||a.compression.toUpperCase(),r=j[q];if(!r)throw new Error(q+" is not a valid compression method !");var s=p.options.compressionOptions||a.compressionOptions||{},u=z.call(this,p,r,s),v=C.call(this,l,p,u,f,a.platform,a.encodeFileName);f+=v.fileRecord.length+u.compressedSize,h+=v.dirRecord.length,d.push(v)}var w="";w=g.CENTRAL_DIRECTORY_END+"\x00\x00\x00\x00"+t(d.length,2)+t(d.length,2)+t(h,4)+t(f,4)+t(k.length,2)+k;var x=a.type.toLowerCase();for(b="uint8array"===x||"arraybuffer"===x||"blob"===x||"nodebuffer"===x?new o(f+h+w.length):new n(f+h+w.length),c=0;c<d.length;c++)b.append(d[c].fileRecord),b.append(d[c].compressedObject.compressedContent);for(c=0;c<d.length;c++)b.append(d[c].dirRecord);b.append(w);var y=b.finalize();switch(a.type.toLowerCase()){case"uint8array":case"arraybuffer":case"nodebuffer":return e.transformTo(a.type.toLowerCase(),y);case"blob":return e.arrayBuffer2Blob(e.transformTo("arraybuffer",y),a.mimeType);case"base64":return a.base64?i.encode(y):y;default:return y}},crc32:function(a,b){return f(a,b)},utf8encode:function(a){return e.transformTo("string",m.utf8encode(a))},utf8decode:function(a){return m.utf8decode(a)}};b.exports=D},{"./base64":2,"./compressedObject":3,"./compressions":4,"./crc32":5,"./defaults":7,"./nodeBuffer":12,"./signature":15,"./stringWriter":17,"./support":18,"./uint8ArrayWriter":20,"./utf8":21,"./utils":22}],15:[function(a,b,c){"use strict";c.LOCAL_FILE_HEADER="PK",c.CENTRAL_FILE_HEADER="PK",c.CENTRAL_DIRECTORY_END="PK",c.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",c.ZIP64_CENTRAL_DIRECTORY_END="PK",c.DATA_DESCRIPTOR="PK\b"},{}],16:[function(a,b,c){"use strict";function d(a,b){this.data=a,b||(this.data=f.string2binary(this.data)),this.length=this.data.length,this.index=0,this.zero=0}var e=a("./dataReader"),f=a("./utils");d.prototype=new e,d.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},d.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"./dataReader":6,"./utils":22}],17:[function(a,b,c){"use strict";var d=a("./utils"),e=function(){this.data=[]};e.prototype={append:function(a){a=d.transformTo("string",a),this.data.push(a)},finalize:function(){return this.data.join("")}},b.exports=e},{"./utils":22}],18:[function(a,b,c){(function(a){"use strict";if(c.base64=!0,c.array=!0,c.string=!0,c.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,c.nodebuffer="undefined"!=typeof a,c.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)c.blob=!1;else{var b=new ArrayBuffer(0);try{c.blob=0===new Blob([b],{type:"application/zip"}).size}catch(d){try{var e=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,f=new e;f.append(b),c.blob=0===f.getBlob("application/zip").size}catch(d){c.blob=!1}}}}).call(this,"undefined"!=typeof Buffer?Buffer:void 0)},{}],19:[function(a,b,c){"use strict";function d(a){a&&(this.data=a,this.length=this.data.length,this.index=0,this.zero=0)}var e=a("./arrayReader");d.prototype=new e,d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return new Uint8Array(0);var b=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"./arrayReader":1}],20:[function(a,b,c){"use strict";var d=a("./utils"),e=function(a){this.data=new Uint8Array(a),this.index=0};e.prototype={append:function(a){0!==a.length&&(a=d.transformTo("uint8array",a),this.data.set(a,this.index),this.index+=a.length)},finalize:function(){return this.data}},b.exports=e},{"./utils":22}],21:[function(a,b,c){"use strict";for(var d=a("./utils"),e=a("./support"),f=a("./nodeBuffer"),g=new Array(256),h=0;256>h;h++)g[h]=h>=252?6:h>=248?5:h>=240?4:h>=224?3:h>=192?2:1;g[254]=g[254]=1;var i=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;h>f;f++)c=a.charCodeAt(f),55296===(64512&c)&&h>f+1&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=128>c?1:2048>c?2:65536>c?3:4;for(b=e.uint8array?new Uint8Array(i):new Array(i),g=0,f=0;i>g;f++)c=a.charCodeAt(f),55296===(64512&c)&&h>f+1&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),128>c?b[g++]=c:2048>c?(b[g++]=192|c>>>6,b[g++]=128|63&c):65536>c?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},j=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return 0>c?b:0===c?b:c+g[a[c]]>b?c:b},k=function(a){var b,c,e,f,h=a.length,i=new Array(2*h);for(c=0,b=0;h>b;)if(e=a[b++],128>e)i[c++]=e;else if(f=g[e],f>4)i[c++]=65533,b+=f-1;else{for(e&=2===f?31:3===f?15:7;f>1&&h>b;)e=e<<6|63&a[b++],f--;f>1?i[c++]=65533:65536>e?i[c++]=e:(e-=65536,i[c++]=55296|e>>10&1023,i[c++]=56320|1023&e)}return i.length!==c&&(i.subarray?i=i.subarray(0,c):i.length=c),d.applyFromCharCode(i)};c.utf8encode=function(a){return e.nodebuffer?f(a,"utf-8"):i(a)},c.utf8decode=function(a){if(e.nodebuffer)return d.transformTo("nodebuffer",a).toString("utf-8");a=d.transformTo(e.uint8array?"uint8array":"array",a);for(var b=[],c=0,f=a.length,g=65536;f>c;){var h=j(a,Math.min(c+g,f));e.uint8array?b.push(k(a.subarray(c,h))):b.push(k(a.slice(c,h))),c=h}return b.join("")}},{"./nodeBuffer":12,"./support":18,"./utils":22}],22:[function(a,b,c){"use strict";function d(a){return a}function e(a,b){for(var c=0;c<a.length;++c)b[c]=255&a.charCodeAt(c);return b}function f(a){var b=65536,d=[],e=a.length,f=c.getTypeOf(a),g=0,h=!0;try{switch(f){case"uint8array":String.fromCharCode.apply(null,new Uint8Array(0));break;case"nodebuffer":String.fromCharCode.apply(null,j(0))}}catch(i){h=!1}if(!h){for(var k="",l=0;l<a.length;l++)k+=String.fromCharCode(a[l]);return k}for(;e>g&&b>1;)try{"array"===f||"nodebuffer"===f?d.push(String.fromCharCode.apply(null,a.slice(g,Math.min(g+b,e)))):d.push(String.fromCharCode.apply(null,a.subarray(g,Math.min(g+b,e)))),g+=b}catch(i){b=Math.floor(b/2)}return d.join("")}function g(a,b){for(var c=0;c<a.length;c++)b[c]=a[c];return b}var h=a("./support"),i=a("./compressions"),j=a("./nodeBuffer");c.string2binary=function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(255&a.charCodeAt(c));return b},c.arrayBuffer2Blob=function(a,b){c.checkSupport("blob"),b=b||"application/zip";try{return new Blob([a],{type:b})}catch(d){try{var e=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,f=new e;return f.append(a),f.getBlob(b)}catch(d){throw new Error("Bug : can't construct the Blob.")}}},c.applyFromCharCode=f;var k={};k.string={string:d,array:function(a){return e(a,new Array(a.length))},arraybuffer:function(a){return k.string.uint8array(a).buffer},uint8array:function(a){return e(a,new Uint8Array(a.length))},nodebuffer:function(a){return e(a,j(a.length))}},k.array={string:f,array:d,arraybuffer:function(a){return new Uint8Array(a).buffer},uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return j(a)}},k.arraybuffer={string:function(a){return f(new Uint8Array(a))},array:function(a){return g(new Uint8Array(a),new Array(a.byteLength))},arraybuffer:d,uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return j(new Uint8Array(a))}},k.uint8array={string:f,array:function(a){return g(a,new Array(a.length))},arraybuffer:function(a){return a.buffer},uint8array:d,nodebuffer:function(a){return j(a)}},k.nodebuffer={string:f,array:function(a){return g(a,new Array(a.length))},arraybuffer:function(a){return k.nodebuffer.uint8array(a).buffer},uint8array:function(a){return g(a,new Uint8Array(a.length))},nodebuffer:d},c.transformTo=function(a,b){if(b||(b=""),!a)return b;c.checkSupport(a);var d=c.getTypeOf(b),e=k[d][a](b);return e},c.getTypeOf=function(a){return"string"==typeof a?"string":"[object Array]"===Object.prototype.toString.call(a)?"array":h.nodebuffer&&j.test(a)?"nodebuffer":h.uint8array&&a instanceof Uint8Array?"uint8array":h.arraybuffer&&a instanceof ArrayBuffer?"arraybuffer":void 0},c.checkSupport=function(a){var b=h[a.toLowerCase()];if(!b)throw new Error(a+" is not supported by this browser")},c.MAX_VALUE_16BITS=65535,c.MAX_VALUE_32BITS=-1,c.pretty=function(a){var b,c,d="";for(c=0;c<(a||"").length;c++)b=a.charCodeAt(c),d+="\\x"+(16>b?"0":"")+b.toString(16).toUpperCase();return d},c.findCompression=function(a){for(var b in i)if(i.hasOwnProperty(b)&&i[b].magic===a)return i[b];return null},c.isRegExp=function(a){return"[object RegExp]"===Object.prototype.toString.call(a)},c.extend=function(){var a,b,c={};for(a=0;a<arguments.length;a++)for(b in arguments[a])arguments[a].hasOwnProperty(b)&&"undefined"==typeof c[b]&&(c[b]=arguments[a][b]);return c}},{"./compressions":4,"./nodeBuffer":12,"./support":18}],23:[function(a,b,c){"use strict";function d(a,b){this.files=[],this.loadOptions=b,a&&this.load(a)}var e=a("./stringReader"),f=a("./nodeBufferReader"),g=a("./uint8ArrayReader"),h=a("./arrayReader"),i=a("./utils"),j=a("./signature"),k=a("./zipEntry"),l=a("./support");a("./object");d.prototype={checkSignature:function(a){var b=this.reader.readString(4);if(b!==a)throw new Error("Corrupted zip or bug : unexpected signature ("+i.pretty(b)+", expected "+i.pretty(a)+")")},isSignature:function(a,b){var c=this.reader.index;this.reader.setIndex(a);var d=this.reader.readString(4),e=d===b;return this.reader.setIndex(c),e},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var a=this.reader.readData(this.zipCommentLength),b=l.uint8array?"uint8array":"array",c=i.transformTo(b,a);this.zipComment=this.loadOptions.decodeFileName(c)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.versionMadeBy=this.reader.readString(2),this.versionNeeded=this.reader.readInt(2),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,b,c,d=this.zip64EndOfCentralSize-44,e=0;d>e;)a=this.reader.readInt(2),b=this.reader.readInt(4),c=this.reader.readString(b),this.zip64ExtensibleData[a]={id:a,length:b,value:c}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,b;for(a=0;a<this.files.length;a++)b=this.files[a],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(j.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8(),b.processAttributes()},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readString(4)===j.CENTRAL_FILE_HEADER;)a=new k({zip64:this.zip64},this.loadOptions),a.readCentralPart(this.reader),this.files.push(a);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(j.CENTRAL_DIRECTORY_END);if(0>a){var b=!this.isSignature(0,j.LOCAL_FILE_HEADER);throw b?new Error("Can't find end of central directory : is this a zip file ? If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip : can't find end of central directory")}this.reader.setIndex(a);var c=a;if(this.checkSignature(j.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,a=this.reader.lastIndexOfSignature(j.ZIP64_CENTRAL_DIRECTORY_LOCATOR),0>a)throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(a),this.checkSignature(j.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,j.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(j.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip : can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(j.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var d=this.centralDirOffset+this.centralDirSize;this.zip64&&(d+=20,d+=12+this.zip64EndOfCentralSize);var e=c-d;if(e>0)this.isSignature(c,j.CENTRAL_FILE_HEADER)||(this.reader.zero=e);else if(0>e)throw new Error("Corrupted zip: missing "+Math.abs(e)+" bytes.")},prepareReader:function(a){var b=i.getTypeOf(a);if(i.checkSupport(b),"string"!==b||l.uint8array)if("nodebuffer"===b)this.reader=new f(a);else if(l.uint8array)this.reader=new g(i.transformTo("uint8array",a));else{if(!l.array)throw new Error("Unexpected error: unsupported type '"+b+"'");this.reader=new h(i.transformTo("array",a))}else this.reader=new e(a,this.loadOptions.optimizedBinaryString)},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},b.exports=d},{"./arrayReader":1,"./nodeBufferReader":13,"./object":14,"./signature":15,"./stringReader":16,"./support":18,"./uint8ArrayReader":19,"./utils":22,"./zipEntry":24}],24:[function(a,b,c){"use strict";function d(a,b){this.options=a,this.loadOptions=b}var e=a("./stringReader"),f=a("./utils"),g=a("./compressedObject"),h=a("./object"),i=a("./support"),j=0,k=3;d.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},prepareCompressedContent:function(a,b,c){return function(){var d=a.index;a.setIndex(b);var e=a.readData(c);return a.setIndex(d),e}},prepareContent:function(a,b,c,d,e){return function(){var a=f.transformTo(d.uncompressInputType,this.getCompressedContent()),b=d.uncompress(a);if(b.length!==e)throw new Error("Bug : uncompressed data size mismatch");return b}},readLocalPart:function(a){var b,c;if(a.skip(22),this.fileNameLength=a.readInt(2),c=a.readInt(2),this.fileName=a.readData(this.fileNameLength),a.skip(c),-1==this.compressedSize||-1==this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");if(b=f.findCompression(this.compressionMethod),null===b)throw new Error("Corrupted zip : compression "+f.pretty(this.compressionMethod)+" unknown (inner file : "+f.transformTo("string",this.fileName)+")");if(this.decompressed=new g,this.decompressed.compressedSize=this.compressedSize,this.decompressed.uncompressedSize=this.uncompressedSize,this.decompressed.crc32=this.crc32,this.decompressed.compressionMethod=this.compressionMethod,this.decompressed.getCompressedContent=this.prepareCompressedContent(a,a.index,this.compressedSize,b),this.decompressed.getContent=this.prepareContent(a,a.index,this.compressedSize,b,this.uncompressedSize),this.loadOptions.checkCRC32&&(this.decompressed=f.transformTo("string",this.decompressed.getContent()),
h.crc32(this.decompressed)!==this.crc32))throw new Error("Corrupted zip : CRC32 mismatch")},readCentralPart:function(a){if(this.versionMadeBy=a.readInt(2),this.versionNeeded=a.readInt(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4),this.fileNameLength=a.readInt(2),this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");this.fileName=a.readData(this.fileNameLength),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var a=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),a===j&&(this.dosPermissions=63&this.externalFileAttributes),a===k&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(a){if(this.extraFields[1]){var b=new e(this.extraFields[1].value);this.uncompressedSize===f.MAX_VALUE_32BITS&&(this.uncompressedSize=b.readInt(8)),this.compressedSize===f.MAX_VALUE_32BITS&&(this.compressedSize=b.readInt(8)),this.localHeaderOffset===f.MAX_VALUE_32BITS&&(this.localHeaderOffset=b.readInt(8)),this.diskNumberStart===f.MAX_VALUE_32BITS&&(this.diskNumberStart=b.readInt(4))}},readExtraFields:function(a){var b,c,d,e=a.index;for(this.extraFields=this.extraFields||{};a.index<e+this.extraFieldsLength;)b=a.readInt(2),c=a.readInt(2),d=a.readString(c),this.extraFields[b]={id:b,length:c,value:d}},handleUTF8:function(){var a=i.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=h.utf8decode(this.fileName),this.fileCommentStr=h.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(null!==b)this.fileNameStr=b;else{var c=f.transformTo(a,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(c)}var d=this.findExtraFieldUnicodeComment();if(null!==d)this.fileCommentStr=d;else{var e=f.transformTo(a,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(e)}}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var b=new e(a.value);return 1!==b.readInt(1)?null:h.crc32(this.fileName)!==b.readInt(4)?null:h.utf8decode(b.readString(a.length-5))}return null},findExtraFieldUnicodeComment:function(){var a=this.extraFields[25461];if(a){var b=new e(a.value);return 1!==b.readInt(1)?null:h.crc32(this.fileComment)!==b.readInt(4)?null:h.utf8decode(b.readString(a.length-5))}return null}},b.exports=d},{"./compressedObject":3,"./object":14,"./stringReader":16,"./support":18,"./utils":22}],25:[function(a,b,c){"use strict";var d=a("./lib/utils/common").assign,e=a("./lib/deflate"),f=a("./lib/inflate"),g=a("./lib/zlib/constants"),h={};d(h,e,f,g),b.exports=h},{"./lib/deflate":26,"./lib/inflate":27,"./lib/utils/common":28,"./lib/zlib/constants":31}],26:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=i.assign({level:s,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:t,to:""},a||{});var b=this.options;b.raw&&b.windowBits>0?b.windowBits=-b.windowBits:b.gzip&&b.windowBits>0&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=h.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(c!==p)throw new Error(k[c]);b.header&&h.deflateSetHeader(this.strm,b.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}function g(a,b){return b=b||{},b.gzip=!0,e(a,b)}var h=a("./zlib/deflate"),i=a("./utils/common"),j=a("./utils/strings"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=Object.prototype.toString,n=0,o=4,p=0,q=1,r=2,s=-1,t=0,u=8;d.prototype.push=function(a,b){var c,d,e=this.strm,f=this.options.chunkSize;if(this.ended)return!1;d=b===~~b?b:b===!0?o:n,"string"==typeof a?e.input=j.string2buf(a):"[object ArrayBuffer]"===m.call(a)?e.input=new Uint8Array(a):e.input=a,e.next_in=0,e.avail_in=e.input.length;do{if(0===e.avail_out&&(e.output=new i.Buf8(f),e.next_out=0,e.avail_out=f),c=h.deflate(e,d),c!==q&&c!==p)return this.onEnd(c),this.ended=!0,!1;0!==e.avail_out&&(0!==e.avail_in||d!==o&&d!==r)||("string"===this.options.to?this.onData(j.buf2binstring(i.shrinkBuf(e.output,e.next_out))):this.onData(i.shrinkBuf(e.output,e.next_out)))}while((e.avail_in>0||0===e.avail_out)&&c!==q);return d===o?(c=h.deflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===p):d===r?(this.onEnd(p),e.avail_out=0,!0):!0},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===p&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Deflate=d,c.deflate=e,c.deflateRaw=f,c.gzip=g},{"./utils/common":28,"./utils/strings":29,"./zlib/deflate":33,"./zlib/messages":38,"./zlib/zstream":40}],27:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l=this.strm,m=this.options.chunkSize,o=!1;if(this.ended)return!1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?l.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?l.input=new Uint8Array(a):l.input=a,l.next_in=0,l.avail_in=l.input.length;do{if(0===l.avail_out&&(l.output=new h.Buf8(m),l.next_out=0,l.avail_out=m),c=g.inflate(l,j.Z_NO_FLUSH),c===j.Z_BUF_ERROR&&o===!0&&(c=j.Z_OK,o=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;l.next_out&&(0!==l.avail_out&&c!==j.Z_STREAM_END&&(0!==l.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(l.output,l.next_out),f=l.next_out-e,k=i.buf2string(l.output,e),l.next_out=f,l.avail_out=m-f,f&&h.arraySet(l.output,l.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(l.output,l.next_out)))),0===l.avail_in&&0===l.avail_out&&(o=!0)}while((l.avail_in>0||0===l.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d===j.Z_SYNC_FLUSH?(this.onEnd(j.Z_OK),l.avail_out=0,!0):!0},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e},{"./utils/common":28,"./utils/strings":29,"./zlib/constants":31,"./zlib/gzheader":34,"./zlib/inflate":36,"./zlib/messages":38,"./zlib/zstream":40}],28:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;d>f;f++)a[e+f]=b[c+f]},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;c>b;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;c>b;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;d>f;f++)a[e+f]=b[c+f]},flattenChunks:function(a){return[].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f))},c.setTyped(d)},{}],29:[function(a,b,c){"use strict";function d(a,b){if(65537>b&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;b>d;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0])}catch(h){f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(h){g=!1}for(var i=new e.Buf8(256),j=0;256>j;j++)i[j]=j>=252?6:j>=248?5:j>=240?4:j>=224?3:j>=192?2:1;i[254]=i[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;h>f;f++)c=a.charCodeAt(f),55296===(64512&c)&&h>f+1&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=128>c?1:2048>c?2:65536>c?3:4;for(b=new e.Buf8(i),g=0,f=0;i>g;f++)c=a.charCodeAt(f),55296===(64512&c)&&h>f+1&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),128>c?b[g++]=c:2048>c?(b[g++]=192|c>>>6,b[g++]=128|63&c):65536>c?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;d>c;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,h=b||a.length,j=new Array(2*h);for(e=0,c=0;h>c;)if(f=a[c++],128>f)j[e++]=f;else if(g=i[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&h>c;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:65536>f?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f)}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return 0>c?b:0===c?b:c+i[a[c]]>b?c:b}},{"./common":28}],30:[function(a,b,c){"use strict";function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521}return e|f<<16|0}b.exports=d},{}],31:[function(a,b,c){"use strict";b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],32:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;256>c;c++){a=c;for(var d=0;8>d;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;g>h;h++)a=a>>>8^e[255&(a^b[h])];return-1^a}var f=d();b.exports=e},{}],33:[function(a,b,c){"use strict";function d(a,b){return a.msg=H[b],b}function e(a){return(a<<1)-(a>4?9:0)}function f(a){for(var b=a.length;--b>=0;)a[b]=0}function g(a){var b=a.state,c=b.pending;c>a.avail_out&&(c=a.avail_out),0!==c&&(D.arraySet(a.output,b.pending_buf,b.pending_out,c,a.next_out),a.next_out+=c,b.pending_out+=c,a.total_out+=c,a.avail_out-=c,b.pending-=c,0===b.pending&&(b.pending_out=0))}function h(a,b){E._tr_flush_block(a,a.block_start>=0?a.block_start:-1,a.strstart-a.block_start,b),a.block_start=a.strstart,g(a.strm)}function i(a,b){a.pending_buf[a.pending++]=b}function j(a,b){a.pending_buf[a.pending++]=b>>>8&255,a.pending_buf[a.pending++]=255&b}function k(a,b,c,d){var e=a.avail_in;return e>d&&(e=d),0===e?0:(a.avail_in-=e,D.arraySet(b,a.input,a.next_in,e,c),1===a.state.wrap?a.adler=F(a.adler,b,e,c):2===a.state.wrap&&(a.adler=G(a.adler,b,e,c)),a.next_in+=e,a.total_in+=e,e)}function l(a,b){var c,d,e=a.max_chain_length,f=a.strstart,g=a.prev_length,h=a.nice_match,i=a.strstart>a.w_size-ka?a.strstart-(a.w_size-ka):0,j=a.window,k=a.w_mask,l=a.prev,m=a.strstart+ja,n=j[f+g-1],o=j[f+g];a.prev_length>=a.good_match&&(e>>=2),h>a.lookahead&&(h=a.lookahead);do if(c=b,j[c+g]===o&&j[c+g-1]===n&&j[c]===j[f]&&j[++c]===j[f+1]){f+=2,c++;do;while(j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&m>f);if(d=ja-(m-f),f=m-ja,d>g){if(a.match_start=b,g=d,d>=h)break;n=j[f+g-1],o=j[f+g]}}while((b=l[b&k])>i&&0!==--e);return g<=a.lookahead?g:a.lookahead}function m(a){var b,c,d,e,f,g=a.w_size;do{if(e=a.window_size-a.lookahead-a.strstart,a.strstart>=g+(g-ka)){D.arraySet(a.window,a.window,g,g,0),a.match_start-=g,a.strstart-=g,a.block_start-=g,c=a.hash_size,b=c;do d=a.head[--b],a.head[b]=d>=g?d-g:0;while(--c);c=g,b=c;do d=a.prev[--b],a.prev[b]=d>=g?d-g:0;while(--c);e+=g}if(0===a.strm.avail_in)break;if(c=k(a.strm,a.window,a.strstart+a.lookahead,e),a.lookahead+=c,a.lookahead+a.insert>=ia)for(f=a.strstart-a.insert,a.ins_h=a.window[f],a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+1])&a.hash_mask;a.insert&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+ia-1])&a.hash_mask,a.prev[f&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=f,f++,a.insert--,!(a.lookahead+a.insert<ia)););}while(a.lookahead<ka&&0!==a.strm.avail_in)}function n(a,b){var c=65535;for(c>a.pending_buf_size-5&&(c=a.pending_buf_size-5);;){if(a.lookahead<=1){if(m(a),0===a.lookahead&&b===I)return ta;if(0===a.lookahead)break}a.strstart+=a.lookahead,a.lookahead=0;var d=a.block_start+c;if((0===a.strstart||a.strstart>=d)&&(a.lookahead=a.strstart-d,a.strstart=d,h(a,!1),0===a.strm.avail_out))return ta;if(a.strstart-a.block_start>=a.w_size-ka&&(h(a,!1),0===a.strm.avail_out))return ta}return a.insert=0,b===L?(h(a,!0),0===a.strm.avail_out?va:wa):a.strstart>a.block_start&&(h(a,!1),0===a.strm.avail_out)?ta:ta}function o(a,b){for(var c,d;;){if(a.lookahead<ka){if(m(a),a.lookahead<ka&&b===I)return ta;if(0===a.lookahead)break}if(c=0,a.lookahead>=ia&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ia-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),0!==c&&a.strstart-c<=a.w_size-ka&&(a.match_length=l(a,c)),a.match_length>=ia)if(d=E._tr_tally(a,a.strstart-a.match_start,a.match_length-ia),a.lookahead-=a.match_length,a.match_length<=a.max_lazy_match&&a.lookahead>=ia){a.match_length--;do a.strstart++,a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ia-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart;while(0!==--a.match_length);a.strstart++}else a.strstart+=a.match_length,a.match_length=0,a.ins_h=a.window[a.strstart],a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+1])&a.hash_mask;else d=E._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++;if(d&&(h(a,!1),0===a.strm.avail_out))return ta}return a.insert=a.strstart<ia-1?a.strstart:ia-1,b===L?(h(a,!0),0===a.strm.avail_out?va:wa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ta:ua}function p(a,b){for(var c,d,e;;){if(a.lookahead<ka){if(m(a),a.lookahead<ka&&b===I)return ta;if(0===a.lookahead)break}if(c=0,a.lookahead>=ia&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ia-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),a.prev_length=a.match_length,a.prev_match=a.match_start,a.match_length=ia-1,0!==c&&a.prev_length<a.max_lazy_match&&a.strstart-c<=a.w_size-ka&&(a.match_length=l(a,c),a.match_length<=5&&(a.strategy===T||a.match_length===ia&&a.strstart-a.match_start>4096)&&(a.match_length=ia-1)),a.prev_length>=ia&&a.match_length<=a.prev_length){e=a.strstart+a.lookahead-ia,d=E._tr_tally(a,a.strstart-1-a.prev_match,a.prev_length-ia),a.lookahead-=a.prev_length-1,a.prev_length-=2;do++a.strstart<=e&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ia-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart);while(0!==--a.prev_length);if(a.match_available=0,a.match_length=ia-1,a.strstart++,d&&(h(a,!1),0===a.strm.avail_out))return ta}else if(a.match_available){if(d=E._tr_tally(a,0,a.window[a.strstart-1]),d&&h(a,!1),a.strstart++,a.lookahead--,0===a.strm.avail_out)return ta}else a.match_available=1,a.strstart++,a.lookahead--}return a.match_available&&(d=E._tr_tally(a,0,a.window[a.strstart-1]),a.match_available=0),a.insert=a.strstart<ia-1?a.strstart:ia-1,b===L?(h(a,!0),0===a.strm.avail_out?va:wa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ta:ua}function q(a,b){for(var c,d,e,f,g=a.window;;){if(a.lookahead<=ja){if(m(a),a.lookahead<=ja&&b===I)return ta;if(0===a.lookahead)break}if(a.match_length=0,a.lookahead>=ia&&a.strstart>0&&(e=a.strstart-1,d=g[e],d===g[++e]&&d===g[++e]&&d===g[++e])){f=a.strstart+ja;do;while(d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&f>e);a.match_length=ja-(f-e),a.match_length>a.lookahead&&(a.match_length=a.lookahead)}if(a.match_length>=ia?(c=E._tr_tally(a,1,a.match_length-ia),a.lookahead-=a.match_length,a.strstart+=a.match_length,a.match_length=0):(c=E._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++),c&&(h(a,!1),0===a.strm.avail_out))return ta}return a.insert=0,b===L?(h(a,!0),0===a.strm.avail_out?va:wa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ta:ua}function r(a,b){for(var c;;){if(0===a.lookahead&&(m(a),0===a.lookahead)){if(b===I)return ta;break}if(a.match_length=0,c=E._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++,c&&(h(a,!1),0===a.strm.avail_out))return ta}return a.insert=0,b===L?(h(a,!0),0===a.strm.avail_out?va:wa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ta:ua}function s(a,b,c,d,e){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d,this.func=e}function t(a){a.window_size=2*a.w_size,f(a.head),a.max_lazy_match=C[a.level].max_lazy,a.good_match=C[a.level].good_length,a.nice_match=C[a.level].nice_length,a.max_chain_length=C[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=ia-1,a.match_available=0,a.ins_h=0}function u(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=Z,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new D.Buf16(2*ga),this.dyn_dtree=new D.Buf16(2*(2*ea+1)),this.bl_tree=new D.Buf16(2*(2*fa+1)),f(this.dyn_ltree),f(this.dyn_dtree),f(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new D.Buf16(ha+1),this.heap=new D.Buf16(2*da+1),f(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new D.Buf16(2*da+1),f(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function v(a){var b;return a&&a.state?(a.total_in=a.total_out=0,a.data_type=Y,b=a.state,b.pending=0,b.pending_out=0,b.wrap<0&&(b.wrap=-b.wrap),b.status=b.wrap?ma:ra,a.adler=2===b.wrap?0:1,b.last_flush=I,E._tr_init(b),N):d(a,P)}function w(a){var b=v(a);return b===N&&t(a.state),b}function x(a,b){return a&&a.state?2!==a.state.wrap?P:(a.state.gzhead=b,N):P}function y(a,b,c,e,f,g){if(!a)return P;var h=1;if(b===S&&(b=6),0>e?(h=0,e=-e):e>15&&(h=2,e-=16),1>f||f>$||c!==Z||8>e||e>15||0>b||b>9||0>g||g>W)return d(a,P);8===e&&(e=9);var i=new u;return a.state=i,i.strm=a,i.wrap=h,i.gzhead=null,i.w_bits=e,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=f+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+ia-1)/ia),i.window=new D.Buf8(2*i.w_size),i.head=new D.Buf16(i.hash_size),i.prev=new D.Buf16(i.w_size),i.lit_bufsize=1<<f+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new D.Buf8(i.pending_buf_size),i.d_buf=i.lit_bufsize>>1,i.l_buf=3*i.lit_bufsize,i.level=b,i.strategy=g,i.method=c,w(a)}function z(a,b){return y(a,b,Z,_,aa,X)}function A(a,b){var c,h,k,l;if(!a||!a.state||b>M||0>b)return a?d(a,P):P;if(h=a.state,!a.output||!a.input&&0!==a.avail_in||h.status===sa&&b!==L)return d(a,0===a.avail_out?R:P);if(h.strm=a,c=h.last_flush,h.last_flush=b,h.status===ma)if(2===h.wrap)a.adler=0,i(h,31),i(h,139),i(h,8),h.gzhead?(i(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),i(h,255&h.gzhead.time),i(h,h.gzhead.time>>8&255),i(h,h.gzhead.time>>16&255),i(h,h.gzhead.time>>24&255),i(h,9===h.level?2:h.strategy>=U||h.level<2?4:0),i(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(i(h,255&h.gzhead.extra.length),i(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(a.adler=G(a.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=na):(i(h,0),i(h,0),i(h,0),i(h,0),i(h,0),i(h,9===h.level?2:h.strategy>=U||h.level<2?4:0),i(h,xa),h.status=ra);else{var m=Z+(h.w_bits-8<<4)<<8,n=-1;n=h.strategy>=U||h.level<2?0:h.level<6?1:6===h.level?2:3,m|=n<<6,0!==h.strstart&&(m|=la),m+=31-m%31,h.status=ra,j(h,m),0!==h.strstart&&(j(h,a.adler>>>16),j(h,65535&a.adler)),a.adler=1}if(h.status===na)if(h.gzhead.extra){for(k=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>k&&(a.adler=G(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending!==h.pending_buf_size));)i(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>k&&(a.adler=G(a.adler,h.pending_buf,h.pending-k,k)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=oa)}else h.status=oa;if(h.status===oa)if(h.gzhead.name){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=G(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=G(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.gzindex=0,h.status=pa)}else h.status=pa;if(h.status===pa)if(h.gzhead.comment){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=G(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=G(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.status=qa)}else h.status=qa;if(h.status===qa&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&g(a),h.pending+2<=h.pending_buf_size&&(i(h,255&a.adler),i(h,a.adler>>8&255),a.adler=0,h.status=ra)):h.status=ra),0!==h.pending){if(g(a),0===a.avail_out)return h.last_flush=-1,N}else if(0===a.avail_in&&e(b)<=e(c)&&b!==L)return d(a,R);if(h.status===sa&&0!==a.avail_in)return d(a,R);if(0!==a.avail_in||0!==h.lookahead||b!==I&&h.status!==sa){var o=h.strategy===U?r(h,b):h.strategy===V?q(h,b):C[h.level].func(h,b);if(o!==va&&o!==wa||(h.status=sa),o===ta||o===va)return 0===a.avail_out&&(h.last_flush=-1),N;if(o===ua&&(b===J?E._tr_align(h):b!==M&&(E._tr_stored_block(h,0,0,!1),b===K&&(f(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),g(a),0===a.avail_out))return h.last_flush=-1,N}return b!==L?N:h.wrap<=0?O:(2===h.wrap?(i(h,255&a.adler),i(h,a.adler>>8&255),i(h,a.adler>>16&255),i(h,a.adler>>24&255),i(h,255&a.total_in),i(h,a.total_in>>8&255),i(h,a.total_in>>16&255),i(h,a.total_in>>24&255)):(j(h,a.adler>>>16),j(h,65535&a.adler)),g(a),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?N:O)}function B(a){var b;return a&&a.state?(b=a.state.status,b!==ma&&b!==na&&b!==oa&&b!==pa&&b!==qa&&b!==ra&&b!==sa?d(a,P):(a.state=null,b===ra?d(a,Q):N)):P}var C,D=a("../utils/common"),E=a("./trees"),F=a("./adler32"),G=a("./crc32"),H=a("./messages"),I=0,J=1,K=3,L=4,M=5,N=0,O=1,P=-2,Q=-3,R=-5,S=-1,T=1,U=2,V=3,W=4,X=0,Y=2,Z=8,$=9,_=15,aa=8,ba=29,ca=256,da=ca+1+ba,ea=30,fa=19,ga=2*da+1,ha=15,ia=3,ja=258,ka=ja+ia+1,la=32,ma=42,na=69,oa=73,pa=91,qa=103,ra=113,sa=666,ta=1,ua=2,va=3,wa=4,xa=3;C=[new s(0,0,0,0,n),new s(4,4,8,4,o),new s(4,5,16,8,o),new s(4,6,32,32,o),new s(4,4,16,16,p),new s(8,16,32,32,p),new s(8,16,128,128,p),new s(8,32,128,256,p),new s(32,128,258,1024,p),new s(32,258,258,4096,p)],c.deflateInit=z,c.deflateInit2=y,c.deflateReset=w,c.deflateResetKeep=v,c.deflateSetHeader=x,c.deflate=A,c.deflateEnd=B,c.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":28,"./adler32":30,"./crc32":32,"./messages":38,"./trees":39}],34:[function(a,b,c){"use strict";function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}b.exports=d},{}],35:[function(a,b,c){"use strict";var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{15>q&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(w>q&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),15>q&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,w>q&&(p+=B[f++]<<q,q+=8,w>q&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,x>w){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}else if(w>n){if(z+=l+n-w,w-=n,x>w){x-=w;do C[h++]=o[z++];while(--w);if(z=0,x>n){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}}else if(z+=n-w,x>w){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]))}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]))}break}}break}}while(g>f&&j>h);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=g>f?5+(g-f):5-(f-g),a.avail_out=j>h?257+(j-h):257-(h-j),c.hold=p,c.bits=q}},{}],36:[function(a,b,c){"use strict";function d(a){return(a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new r.Buf16(320),this.work=new r.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=K,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new r.Buf32(oa),b.distcode=b.distdyn=new r.Buf32(pa),b.sane=1,b.back=-1,C):F}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):F}function h(a,b){var c,d;return a&&a.state?(d=a.state,0>b?(c=0,b=-b):(c=(b>>4)+1,48>b&&(b&=15)),b&&(8>b||b>15)?F:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):F}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==C&&(a.state=null),c):F}function j(a){return i(a,ra)}function k(a){if(sa){var b;for(p=new r.Buf32(512),q=new r.Buf32(32),b=0;144>b;)a.lens[b++]=8;for(;256>b;)a.lens[b++]=9;for(;280>b;)a.lens[b++]=7;for(;288>b;)a.lens[b++]=8;for(v(x,a.lens,0,288,p,0,a.work,{bits:9}),b=0;32>b;)a.lens[b++]=5;v(y,a.lens,0,32,q,0,a.work,{bits:5}),sa=!1}a.lencode=p,a.lenbits=9,a.distcode=q,a.distbits=5}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new r.Buf8(f.wsize)),d>=f.wsize?(r.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),r.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(r.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,oa,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new r.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return F;c=a.state,c.mode===V&&(c.mode=W),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=C;a:for(;;)switch(c.mode){case K:if(0===c.wrap){c.mode=W;break}for(;16>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=t(c.check,Ba,2,0),m=0,n=0,c.mode=L;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=la;break}if((15&m)!==J){a.msg="unknown compression method",c.mode=la;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=la;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?T:V,m=0,n=0;break;case L:for(;16>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.flags=m,(255&c.flags)!==J){a.msg="unknown compression method",c.mode=la;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=la;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=t(c.check,Ba,2,0)),m=0,n=0,c.mode=M;case M:for(;32>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=t(c.check,Ba,4,0)),m=0,n=0,c.mode=N;case N:for(;16>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=t(c.check,Ba,2,0)),m=0,n=0,c.mode=O;case O:if(1024&c.flags){for(;16>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=t(c.check,Ba,2,0)),m=0,n=0}else c.head&&(c.head.extra=null);c.mode=P;case P:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),r.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=t(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=Q;case Q:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&i>q);if(512&c.flags&&(c.check=t(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=R;case R:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&i>q);if(512&c.flags&&(c.check=t(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=S;case S:if(512&c.flags){for(;16>n;){
if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=la;break}m=0,n=0}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=V;break;case T:for(;32>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}a.adler=c.check=d(m),m=0,n=0,c.mode=U;case U:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,E;a.adler=c.check=1,c.mode=V;case V:if(b===A||b===B)break a;case W:if(c.last){m>>>=7&n,n-=7&n,c.mode=ia;break}for(;3>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=X;break;case 1:if(k(c),c.mode=ba,b===B){m>>>=2,n-=2;break a}break;case 2:c.mode=$;break;case 3:a.msg="invalid block type",c.mode=la}m>>>=2,n-=2;break;case X:for(m>>>=7&n,n-=7&n;32>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=la;break}if(c.length=65535&m,m=0,n=0,c.mode=Y,b===B)break a;case Y:c.mode=Z;case Z:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;r.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=V;break;case $:for(;14>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=la;break}c.have=0,c.mode=_;case _:for(;c.have<c.ncode;){for(;3>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=v(w,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=la;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(n>=qa);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(16>sa)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;za>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=la;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2}else if(17===sa){for(za=qa+3;za>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3}else{for(za=qa+7;za>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=la;break}for(;q--;)c.lens[c.have++]=wa}}if(c.mode===la)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=la;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=v(x,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=la;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=v(y,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=la;break}if(c.mode=ba,b===B)break a;case ba:c.mode=ca;case ca:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,u(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===V&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(n>=qa);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(n>=ta+qa);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ha;break}if(32&ra){c.back=-1,c.mode=V;break}if(64&ra){a.msg="invalid literal/length code",c.mode=la;break}c.extra=15&ra,c.mode=da;case da:if(c.extra){for(za=c.extra;za>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}c.was=c.length,c.mode=ea;case ea:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(n>=qa);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(n>=ta+qa);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=la;break}c.offset=sa,c.extra=15&ra,c.mode=fa;case fa:if(c.extra){for(za=c.extra;za>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=la;break}c.mode=ga;case ga:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=la;break}q>c.wnext?(q-=c.wnext,oa=c.wsize-q):oa=c.wnext-q,q>c.length&&(q=c.length),pa=c.window}else pa=f,oa=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[oa++];while(--q);0===c.length&&(c.mode=ca);break;case ha:if(0===j)break a;f[h++]=c.length,j--,c.mode=ca;break;case ia:if(c.wrap){for(;32>n;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?t(c.check,f,p,h-p):s(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=la;break}m=0,n=0}c.mode=ja;case ja:if(c.wrap&&c.flags){for(;32>n;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=la;break}m=0,n=0}c.mode=ka;case ka:xa=D;break a;case la:xa=G;break a;case ma:return H;case na:default:return F}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<la&&(c.mode<ia||b!==z))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=ma,H):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?t(c.check,f,p,a.next_out-p):s(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===V?128:0)+(c.mode===ba||c.mode===Y?256:0),(0===o&&0===p||b===z)&&xa===C&&(xa=I),xa)}function n(a){if(!a||!a.state)return F;var b=a.state;return b.window&&(b.window=null),a.state=null,C}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?F:(c.head=b,b.done=!1,C)):F}var p,q,r=a("../utils/common"),s=a("./adler32"),t=a("./crc32"),u=a("./inffast"),v=a("./inftrees"),w=0,x=1,y=2,z=4,A=5,B=6,C=0,D=1,E=2,F=-2,G=-3,H=-4,I=-5,J=8,K=1,L=2,M=3,N=4,O=5,P=6,Q=7,R=8,S=9,T=10,U=11,V=12,W=13,X=14,Y=15,Z=16,$=17,_=18,aa=19,ba=20,ca=21,da=22,ea=23,fa=24,ga=25,ha=26,ia=27,ja=28,ka=29,la=30,ma=31,na=32,oa=852,pa=592,qa=15,ra=qa,sa=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":28,"./adler32":30,"./crc32":32,"./inffast":35,"./inftrees":37}],37:[function(a,b,c){"use strict";var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;e>=D;D++)P[D]=0;for(E=0;o>E;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;G>F&&0===P[F];F++);for(F>H&&(H=F),K=1,D=1;e>=D;D++)if(K<<=1,K-=P[D],0>K)return-1;if(K>0&&(a===h||1!==G))return-1;for(Q[1]=0,D=1;e>D;D++)Q[D+1]=Q[D]+P[D];for(E=0;o>E;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(var T=0;;){T++,z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]]}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;G>I+J&&(K-=P[I+J],!(0>=K));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0}},{"../utils/common":28}],38:[function(a,b,c){"use strict";b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],39:[function(a,b,c){"use strict";function d(a){for(var b=a.length;--b>=0;)a[b]=0}function e(a,b,c,d,e){this.static_tree=a,this.extra_bits=b,this.extra_base=c,this.elems=d,this.max_length=e,this.has_stree=a&&a.length}function f(a,b){this.dyn_tree=a,this.max_code=0,this.stat_desc=b}function g(a){return 256>a?ia[a]:ia[256+(a>>>7)]}function h(a,b){a.pending_buf[a.pending++]=255&b,a.pending_buf[a.pending++]=b>>>8&255}function i(a,b,c){a.bi_valid>X-c?(a.bi_buf|=b<<a.bi_valid&65535,h(a,a.bi_buf),a.bi_buf=b>>X-a.bi_valid,a.bi_valid+=c-X):(a.bi_buf|=b<<a.bi_valid&65535,a.bi_valid+=c)}function j(a,b,c){i(a,c[2*b],c[2*b+1])}function k(a,b){var c=0;do c|=1&a,a>>>=1,c<<=1;while(--b>0);return c>>>1}function l(a){16===a.bi_valid?(h(a,a.bi_buf),a.bi_buf=0,a.bi_valid=0):a.bi_valid>=8&&(a.pending_buf[a.pending++]=255&a.bi_buf,a.bi_buf>>=8,a.bi_valid-=8)}function m(a,b){var c,d,e,f,g,h,i=b.dyn_tree,j=b.max_code,k=b.stat_desc.static_tree,l=b.stat_desc.has_stree,m=b.stat_desc.extra_bits,n=b.stat_desc.extra_base,o=b.stat_desc.max_length,p=0;for(f=0;W>=f;f++)a.bl_count[f]=0;for(i[2*a.heap[a.heap_max]+1]=0,c=a.heap_max+1;V>c;c++)d=a.heap[c],f=i[2*i[2*d+1]+1]+1,f>o&&(f=o,p++),i[2*d+1]=f,d>j||(a.bl_count[f]++,g=0,d>=n&&(g=m[d-n]),h=i[2*d],a.opt_len+=h*(f+g),l&&(a.static_len+=h*(k[2*d+1]+g)));if(0!==p){do{for(f=o-1;0===a.bl_count[f];)f--;a.bl_count[f]--,a.bl_count[f+1]+=2,a.bl_count[o]--,p-=2}while(p>0);for(f=o;0!==f;f--)for(d=a.bl_count[f];0!==d;)e=a.heap[--c],e>j||(i[2*e+1]!==f&&(a.opt_len+=(f-i[2*e+1])*i[2*e],i[2*e+1]=f),d--)}}function n(a,b,c){var d,e,f=new Array(W+1),g=0;for(d=1;W>=d;d++)f[d]=g=g+c[d-1]<<1;for(e=0;b>=e;e++){var h=a[2*e+1];0!==h&&(a[2*e]=k(f[h]++,h))}}function o(){var a,b,c,d,f,g=new Array(W+1);for(c=0,d=0;Q-1>d;d++)for(ka[d]=c,a=0;a<1<<ba[d];a++)ja[c++]=d;for(ja[c-1]=d,f=0,d=0;16>d;d++)for(la[d]=f,a=0;a<1<<ca[d];a++)ia[f++]=d;for(f>>=7;T>d;d++)for(la[d]=f<<7,a=0;a<1<<ca[d]-7;a++)ia[256+f++]=d;for(b=0;W>=b;b++)g[b]=0;for(a=0;143>=a;)ga[2*a+1]=8,a++,g[8]++;for(;255>=a;)ga[2*a+1]=9,a++,g[9]++;for(;279>=a;)ga[2*a+1]=7,a++,g[7]++;for(;287>=a;)ga[2*a+1]=8,a++,g[8]++;for(n(ga,S+1,g),a=0;T>a;a++)ha[2*a+1]=5,ha[2*a]=k(a,5);ma=new e(ga,ba,R+1,S,W),na=new e(ha,ca,0,T,W),oa=new e(new Array(0),da,0,U,Y)}function p(a){var b;for(b=0;S>b;b++)a.dyn_ltree[2*b]=0;for(b=0;T>b;b++)a.dyn_dtree[2*b]=0;for(b=0;U>b;b++)a.bl_tree[2*b]=0;a.dyn_ltree[2*Z]=1,a.opt_len=a.static_len=0,a.last_lit=a.matches=0}function q(a){a.bi_valid>8?h(a,a.bi_buf):a.bi_valid>0&&(a.pending_buf[a.pending++]=a.bi_buf),a.bi_buf=0,a.bi_valid=0}function r(a,b,c,d){q(a),d&&(h(a,c),h(a,~c)),G.arraySet(a.pending_buf,a.window,b,c,a.pending),a.pending+=c}function s(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}function t(a,b,c){for(var d=a.heap[c],e=c<<1;e<=a.heap_len&&(e<a.heap_len&&s(b,a.heap[e+1],a.heap[e],a.depth)&&e++,!s(b,d,a.heap[e],a.depth));)a.heap[c]=a.heap[e],c=e,e<<=1;a.heap[c]=d}function u(a,b,c){var d,e,f,h,k=0;if(0!==a.last_lit)do d=a.pending_buf[a.d_buf+2*k]<<8|a.pending_buf[a.d_buf+2*k+1],e=a.pending_buf[a.l_buf+k],k++,0===d?j(a,e,b):(f=ja[e],j(a,f+R+1,b),h=ba[f],0!==h&&(e-=ka[f],i(a,e,h)),d--,f=g(d),j(a,f,c),h=ca[f],0!==h&&(d-=la[f],i(a,d,h)));while(k<a.last_lit);j(a,Z,b)}function v(a,b){var c,d,e,f=b.dyn_tree,g=b.stat_desc.static_tree,h=b.stat_desc.has_stree,i=b.stat_desc.elems,j=-1;for(a.heap_len=0,a.heap_max=V,c=0;i>c;c++)0!==f[2*c]?(a.heap[++a.heap_len]=j=c,a.depth[c]=0):f[2*c+1]=0;for(;a.heap_len<2;)e=a.heap[++a.heap_len]=2>j?++j:0,f[2*e]=1,a.depth[e]=0,a.opt_len--,h&&(a.static_len-=g[2*e+1]);for(b.max_code=j,c=a.heap_len>>1;c>=1;c--)t(a,f,c);e=i;do c=a.heap[1],a.heap[1]=a.heap[a.heap_len--],t(a,f,1),d=a.heap[1],a.heap[--a.heap_max]=c,a.heap[--a.heap_max]=d,f[2*e]=f[2*c]+f[2*d],a.depth[e]=(a.depth[c]>=a.depth[d]?a.depth[c]:a.depth[d])+1,f[2*c+1]=f[2*d+1]=e,a.heap[1]=e++,t(a,f,1);while(a.heap_len>=2);a.heap[--a.heap_max]=a.heap[1],m(a,b),n(f,j,a.bl_count)}function w(a,b,c){var d,e,f=-1,g=b[1],h=0,i=7,j=4;for(0===g&&(i=138,j=3),b[2*(c+1)+1]=65535,d=0;c>=d;d++)e=g,g=b[2*(d+1)+1],++h<i&&e===g||(j>h?a.bl_tree[2*e]+=h:0!==e?(e!==f&&a.bl_tree[2*e]++,a.bl_tree[2*$]++):10>=h?a.bl_tree[2*_]++:a.bl_tree[2*aa]++,h=0,f=e,0===g?(i=138,j=3):e===g?(i=6,j=3):(i=7,j=4))}function x(a,b,c){var d,e,f=-1,g=b[1],h=0,k=7,l=4;for(0===g&&(k=138,l=3),d=0;c>=d;d++)if(e=g,g=b[2*(d+1)+1],!(++h<k&&e===g)){if(l>h){do j(a,e,a.bl_tree);while(0!==--h)}else 0!==e?(e!==f&&(j(a,e,a.bl_tree),h--),j(a,$,a.bl_tree),i(a,h-3,2)):10>=h?(j(a,_,a.bl_tree),i(a,h-3,3)):(j(a,aa,a.bl_tree),i(a,h-11,7));h=0,f=e,0===g?(k=138,l=3):e===g?(k=6,l=3):(k=7,l=4)}}function y(a){var b;for(w(a,a.dyn_ltree,a.l_desc.max_code),w(a,a.dyn_dtree,a.d_desc.max_code),v(a,a.bl_desc),b=U-1;b>=3&&0===a.bl_tree[2*ea[b]+1];b--);return a.opt_len+=3*(b+1)+5+5+4,b}function z(a,b,c,d){var e;for(i(a,b-257,5),i(a,c-1,5),i(a,d-4,4),e=0;d>e;e++)i(a,a.bl_tree[2*ea[e]+1],3);x(a,a.dyn_ltree,b-1),x(a,a.dyn_dtree,c-1)}function A(a){var b,c=4093624447;for(b=0;31>=b;b++,c>>>=1)if(1&c&&0!==a.dyn_ltree[2*b])return I;if(0!==a.dyn_ltree[18]||0!==a.dyn_ltree[20]||0!==a.dyn_ltree[26])return J;for(b=32;R>b;b++)if(0!==a.dyn_ltree[2*b])return J;return I}function B(a){pa||(o(),pa=!0),a.l_desc=new f(a.dyn_ltree,ma),a.d_desc=new f(a.dyn_dtree,na),a.bl_desc=new f(a.bl_tree,oa),a.bi_buf=0,a.bi_valid=0,p(a)}function C(a,b,c,d){i(a,(L<<1)+(d?1:0),3),r(a,b,c,!0)}function D(a){i(a,M<<1,3),j(a,Z,ga),l(a)}function E(a,b,c,d){var e,f,g=0;a.level>0?(a.strm.data_type===K&&(a.strm.data_type=A(a)),v(a,a.l_desc),v(a,a.d_desc),g=y(a),e=a.opt_len+3+7>>>3,f=a.static_len+3+7>>>3,e>=f&&(e=f)):e=f=c+5,e>=c+4&&-1!==b?C(a,b,c,d):a.strategy===H||f===e?(i(a,(M<<1)+(d?1:0),3),u(a,ga,ha)):(i(a,(N<<1)+(d?1:0),3),z(a,a.l_desc.max_code+1,a.d_desc.max_code+1,g+1),u(a,a.dyn_ltree,a.dyn_dtree)),p(a),d&&q(a)}function F(a,b,c){return a.pending_buf[a.d_buf+2*a.last_lit]=b>>>8&255,a.pending_buf[a.d_buf+2*a.last_lit+1]=255&b,a.pending_buf[a.l_buf+a.last_lit]=255&c,a.last_lit++,0===b?a.dyn_ltree[2*c]++:(a.matches++,b--,a.dyn_ltree[2*(ja[c]+R+1)]++,a.dyn_dtree[2*g(b)]++),a.last_lit===a.lit_bufsize-1}var G=a("../utils/common"),H=4,I=0,J=1,K=2,L=0,M=1,N=2,O=3,P=258,Q=29,R=256,S=R+1+Q,T=30,U=19,V=2*S+1,W=15,X=16,Y=7,Z=256,$=16,_=17,aa=18,ba=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],da=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ea=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fa=512,ga=new Array(2*(S+2));d(ga);var ha=new Array(2*T);d(ha);var ia=new Array(fa);d(ia);var ja=new Array(P-O+1);d(ja);var ka=new Array(Q);d(ka);var la=new Array(T);d(la);var ma,na,oa,pa=!1;c._tr_init=B,c._tr_stored_block=C,c._tr_flush_block=E,c._tr_tally=F,c._tr_align=D},{"../utils/common":28}],40:[function(a,b,c){"use strict";function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}b.exports=d},{}]},{},[10])(10)});
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){(function(e){t.exports=e.pdfMake=n(1)}).call(e,function(){return this}())},function(t,e,n){(function(e){"use strict";function r(t,e,n){this.docDefinition=t,this.fonts=e||s,this.vfs=n}var i=n(6),o=n(105),a=o.saveAs,s={Roboto:{normal:"Roboto-Regular.ttf",bold:"Roboto-Medium.ttf",italics:"Roboto-Italic.ttf",bolditalics:"Roboto-Italic.ttf"}};r.prototype._createDoc=function(t,n){var r=new i(this.fonts);r.fs.bindFS(this.vfs);var o,a=r.createPdfKitDocument(this.docDefinition,t),s=[];a.on("data",function(t){s.push(t)}),a.on("end",function(){o=e.concat(s),n(o,a._pdfMakePages)}),a.end()},r.prototype._getPages=function(t,e){if(!e)throw"getBuffer is an async method and needs a callback argument";this._createDoc(t,function(t,n){e(n)})},r.prototype.open=function(t){var e=window.open("","_blank");try{this.getDataUrl(function(t){e.location.href=t})}catch(n){throw e.close(),n}},r.prototype.print=function(){this.getDataUrl(function(t){var e=document.createElement("iframe");e.style.position="absolute",e.style.left="-99999px",e.src=t,e.onload=function(){function t(){document.body.removeChild(e),document.removeEventListener("click",t)}document.addEventListener("click",t,!1)},document.body.appendChild(e)},{autoPrint:!0})},r.prototype.download=function(t,e){"function"==typeof t&&(e=t,t=null),t=t||"file.pdf",this.getBuffer(function(n){var r;try{r=new Blob([n],{type:"application/pdf"})}catch(i){if("InvalidStateError"==i.name){var o=new Uint8Array(n);r=new Blob([o.buffer],{type:"application/pdf"})}}if(!r)throw"Could not generate blob";a(r,t),"function"==typeof e&&e()})},r.prototype.getBase64=function(t,e){if(!t)throw"getBase64 is an async method and needs a callback argument";this._createDoc(e,function(e){t(e.toString("base64"))})},r.prototype.getDataUrl=function(t,e){if(!t)throw"getDataUrl is an async method and needs a callback argument";this._createDoc(e,function(e){t("data:application/pdf;base64,"+e.toString("base64"))})},r.prototype.getBuffer=function(t,e){if(!t)throw"getBuffer is an async method and needs a callback argument";this._createDoc(e,function(e){t(e)})},t.exports={createPdf:function(t){return new r(t,window.pdfMake.fonts,window.pdfMake.vfs)}}}).call(e,n(2).Buffer)},function(t,e,n){(function(t,r){function i(){function t(){}try{var e=new Uint8Array(1);return e.foo=function(){return 42},e.constructor=t,42===e.foo()&&e.constructor===t&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(n){return!1}}function o(){return t.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function t(e){return this instanceof t?(this.length=0,this.parent=void 0,"number"==typeof e?a(this,e):"string"==typeof e?s(this,e,arguments.length>1?arguments[1]:"utf8"):h(this,e)):arguments.length>1?new t(e,arguments[1]):new t(e)}function a(e,n){if(e=g(e,0>n?0:0|v(n)),!t.TYPED_ARRAY_SUPPORT)for(var r=0;n>r;r++)e[r]=0;return e}function s(t,e,n){("string"!=typeof n||""===n)&&(n="utf8");var r=0|y(e,n);return t=g(t,r),t.write(e,n),t}function h(e,n){if(t.isBuffer(n))return u(e,n);if(V(n))return c(e,n);if(null==n)throw new TypeError("must start with number, buffer, array or string");if("undefined"!=typeof ArrayBuffer){if(n.buffer instanceof ArrayBuffer)return l(e,n);if(n instanceof ArrayBuffer)return f(e,n)}return n.length?d(e,n):p(e,n)}function u(t,e){var n=0|v(e.length);return t=g(t,n),e.copy(t,0,0,n),t}function c(t,e){var n=0|v(e.length);t=g(t,n);for(var r=0;n>r;r+=1)t[r]=255&e[r];return t}function l(t,e){var n=0|v(e.length);t=g(t,n);for(var r=0;n>r;r+=1)t[r]=255&e[r];return t}function f(e,n){return t.TYPED_ARRAY_SUPPORT?(n.byteLength,e=t._augment(new Uint8Array(n))):e=l(e,new Uint8Array(n)),e}function d(t,e){var n=0|v(e.length);t=g(t,n);for(var r=0;n>r;r+=1)t[r]=255&e[r];return t}function p(t,e){var n,r=0;"Buffer"===e.type&&V(e.data)&&(n=e.data,r=0|v(n.length)),t=g(t,r);for(var i=0;r>i;i+=1)t[i]=255&n[i];return t}function g(e,n){t.TYPED_ARRAY_SUPPORT?(e=t._augment(new Uint8Array(n)),e.__proto__=t.prototype):(e.length=n,e._isBuffer=!0);var r=0!==n&&n<=t.poolSize>>>1;return r&&(e.parent=$),e}function v(t){if(t>=o())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o().toString(16)+" bytes");return 0|t}function m(e,n){if(!(this instanceof m))return new m(e,n);var r=new t(e,n);return delete r.parent,r}function y(t,e){"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var r=!1;;)switch(e){case"ascii":case"binary":case"raw":case"raws":return n;case"utf8":case"utf-8":return H(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return Y(t).length;default:if(r)return H(t).length;e=(""+e).toLowerCase(),r=!0}}function _(t,e,n){var r=!1;if(e=0|e,n=void 0===n||n===1/0?this.length:0|n,t||(t="utf8"),0>e&&(e=0),n>this.length&&(n=this.length),e>=n)return"";for(;;)switch(t){case"hex":return T(this,e,n);case"utf8":case"utf-8":return I(this,e,n);case"ascii":return L(this,e,n);case"binary":return R(this,e,n);case"base64":return C(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return B(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}function w(t,e,n,r){n=Number(n)||0;var i=t.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var o=e.length;if(o%2!==0)throw new Error("Invalid hex string");r>o/2&&(r=o/2);for(var a=0;r>a;a++){var s=parseInt(e.substr(2*a,2),16);if(isNaN(s))throw new Error("Invalid hex string");t[n+a]=s}return a}function b(t,e,n,r){return q(H(e,t.length-n),t,n,r)}function x(t,e,n,r){return q(Z(e),t,n,r)}function S(t,e,n,r){return x(t,e,n,r)}function k(t,e,n,r){return q(Y(e),t,n,r)}function E(t,e,n,r){return q(G(e,t.length-n),t,n,r)}function C(t,e,n){return 0===e&&n===t.length?K.fromByteArray(t):K.fromByteArray(t.slice(e,n))}function I(t,e,n){n=Math.min(t.length,n);for(var r=[],i=e;n>i;){var o=t[i],a=null,s=o>239?4:o>223?3:o>191?2:1;if(n>=i+s){var h,u,c,l;switch(s){case 1:128>o&&(a=o);break;case 2:h=t[i+1],128===(192&h)&&(l=(31&o)<<6|63&h,l>127&&(a=l));break;case 3:h=t[i+1],u=t[i+2],128===(192&h)&&128===(192&u)&&(l=(15&o)<<12|(63&h)<<6|63&u,l>2047&&(55296>l||l>57343)&&(a=l));break;case 4:h=t[i+1],u=t[i+2],c=t[i+3],128===(192&h)&&128===(192&u)&&128===(192&c)&&(l=(15&o)<<18|(63&h)<<12|(63&u)<<6|63&c,l>65535&&1114112>l&&(a=l))}}null===a?(a=65533,s=1):a>65535&&(a-=65536,r.push(a>>>10&1023|55296),a=56320|1023&a),r.push(a),i+=s}return A(r)}function A(t){var e=t.length;if(J>=e)return String.fromCharCode.apply(String,t);for(var n="",r=0;e>r;)n+=String.fromCharCode.apply(String,t.slice(r,r+=J));return n}function L(t,e,n){var r="";n=Math.min(t.length,n);for(var i=e;n>i;i++)r+=String.fromCharCode(127&t[i]);return r}function R(t,e,n){var r="";n=Math.min(t.length,n);for(var i=e;n>i;i++)r+=String.fromCharCode(t[i]);return r}function T(t,e,n){var r=t.length;(!e||0>e)&&(e=0),(!n||0>n||n>r)&&(n=r);for(var i="",o=e;n>o;o++)i+=j(t[o]);return i}function B(t,e,n){for(var r=t.slice(e,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1]);return i}function O(t,e,n){if(t%1!==0||0>t)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function M(e,n,r,i,o,a){if(!t.isBuffer(e))throw new TypeError("buffer must be a Buffer instance");if(n>o||a>n)throw new RangeError("value is out of bounds");if(r+i>e.length)throw new RangeError("index out of range")}function D(t,e,n,r){0>e&&(e=65535+e+1);for(var i=0,o=Math.min(t.length-n,2);o>i;i++)t[n+i]=(e&255<<8*(r?i:1-i))>>>8*(r?i:1-i)}function U(t,e,n,r){0>e&&(e=4294967295+e+1);for(var i=0,o=Math.min(t.length-n,4);o>i;i++)t[n+i]=e>>>8*(r?i:3-i)&255}function P(t,e,n,r,i,o){if(e>i||o>e)throw new RangeError("value is out of bounds");if(n+r>t.length)throw new RangeError("index out of range");if(0>n)throw new RangeError("index out of range")}function z(t,e,n,r,i){return i||P(t,e,n,4,3.4028234663852886e38,-3.4028234663852886e38),X.write(t,e,n,r,23,4),n+4}function F(t,e,n,r,i){return i||P(t,e,n,8,1.7976931348623157e308,-1.7976931348623157e308),X.write(t,e,n,r,52,8),n+8}function W(t){if(t=N(t).replace(tt,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function N(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function j(t){return 16>t?"0"+t.toString(16):t.toString(16)}function H(t,e){e=e||1/0;for(var n,r=t.length,i=null,o=[],a=0;r>a;a++){if(n=t.charCodeAt(a),n>55295&&57344>n){if(!i){if(n>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(a+1===r){(e-=3)>-1&&o.push(239,191,189);continue}i=n;continue}if(56320>n){(e-=3)>-1&&o.push(239,191,189),i=n;continue}n=i-55296<<10|n-56320|65536}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,128>n){if((e-=1)<0)break;o.push(n)}else if(2048>n){if((e-=2)<0)break;o.push(n>>6|192,63&n|128)}else if(65536>n){if((e-=3)<0)break;o.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(1114112>n))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return o}function Z(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e}function G(t,e){for(var n,r,i,o=[],a=0;a<t.length&&!((e-=2)<0);a++)n=t.charCodeAt(a),r=n>>8,i=n%256,o.push(i),o.push(r);return o}function Y(t){return K.toByteArray(W(t))}function q(t,e,n,r){for(var i=0;r>i&&!(i+n>=e.length||i>=t.length);i++)e[i+n]=t[i];return i}/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
var K=n(3),X=n(4),V=n(5);e.Buffer=t,e.SlowBuffer=m,e.INSPECT_MAX_BYTES=50,t.poolSize=8192;var $={};t.TYPED_ARRAY_SUPPORT=void 0!==r.TYPED_ARRAY_SUPPORT?r.TYPED_ARRAY_SUPPORT:i(),t.TYPED_ARRAY_SUPPORT&&(t.prototype.__proto__=Uint8Array.prototype,t.__proto__=Uint8Array),t.isBuffer=function(t){return!(null==t||!t._isBuffer)},t.compare=function(e,n){if(!t.isBuffer(e)||!t.isBuffer(n))throw new TypeError("Arguments must be Buffers");if(e===n)return 0;for(var r=e.length,i=n.length,o=0,a=Math.min(r,i);a>o&&e[o]===n[o];)++o;return o!==a&&(r=e[o],i=n[o]),i>r?-1:r>i?1:0},t.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},t.concat=function(e,n){if(!V(e))throw new TypeError("list argument must be an Array of Buffers.");if(0===e.length)return new t(0);var r;if(void 0===n)for(n=0,r=0;r<e.length;r++)n+=e[r].length;var i=new t(n),o=0;for(r=0;r<e.length;r++){var a=e[r];a.copy(i,o),o+=a.length}return i},t.byteLength=y,t.prototype.length=void 0,t.prototype.parent=void 0,t.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?I(this,0,t):_.apply(this,arguments)},t.prototype.equals=function(e){if(!t.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:0===t.compare(this,e)},t.prototype.inspect=function(){var t="",n=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(t+=" ... ")),"<Buffer "+t+">"},t.prototype.compare=function(e){if(!t.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?0:t.compare(this,e)},t.prototype.indexOf=function(e,n){function r(t,e,n){for(var r=-1,i=0;n+i<t.length;i++)if(t[n+i]===e[-1===r?0:i-r]){if(-1===r&&(r=i),i-r+1===e.length)return n+r}else r=-1;return-1}if(n>2147483647?n=2147483647:-2147483648>n&&(n=-2147483648),n>>=0,0===this.length)return-1;if(n>=this.length)return-1;if(0>n&&(n=Math.max(this.length+n,0)),"string"==typeof e)return 0===e.length?-1:String.prototype.indexOf.call(this,e,n);if(t.isBuffer(e))return r(this,e,n);if("number"==typeof e)return t.TYPED_ARRAY_SUPPORT&&"function"===Uint8Array.prototype.indexOf?Uint8Array.prototype.indexOf.call(this,e,n):r(this,[e],n);throw new TypeError("val must be string, number or Buffer")},t.prototype.get=function(t){return this.readUInt8(t)},t.prototype.set=function(t,e){return this.writeUInt8(t,e)},t.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else if(isFinite(e))e=0|e,isFinite(n)?(n=0|n,void 0===r&&(r="utf8")):(r=n,n=void 0);else{var i=r;r=e,e=0|n,n=i}var o=this.length-e;if((void 0===n||n>o)&&(n=o),t.length>0&&(0>n||0>e)||e>this.length)throw new RangeError("attempt to write outside buffer bounds");r||(r="utf8");for(var a=!1;;)switch(r){case"hex":return w(this,t,e,n);case"utf8":case"utf-8":return b(this,t,e,n);case"ascii":return x(this,t,e,n);case"binary":return S(this,t,e,n);case"base64":return k(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,e,n);default:if(a)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),a=!0}},t.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var J=4096;t.prototype.slice=function(e,n){var r=this.length;e=~~e,n=void 0===n?r:~~n,0>e?(e+=r,0>e&&(e=0)):e>r&&(e=r),0>n?(n+=r,0>n&&(n=0)):n>r&&(n=r),e>n&&(n=e);var i;if(t.TYPED_ARRAY_SUPPORT)i=t._augment(this.subarray(e,n));else{var o=n-e;i=new t(o,void 0);for(var a=0;o>a;a++)i[a]=this[a+e]}return i.length&&(i.parent=this.parent||this),i},t.prototype.readUIntLE=function(t,e,n){t=0|t,e=0|e,n||O(t,e,this.length);for(var r=this[t],i=1,o=0;++o<e&&(i*=256);)r+=this[t+o]*i;return r},t.prototype.readUIntBE=function(t,e,n){t=0|t,e=0|e,n||O(t,e,this.length);for(var r=this[t+--e],i=1;e>0&&(i*=256);)r+=this[t+--e]*i;return r},t.prototype.readUInt8=function(t,e){return e||O(t,1,this.length),this[t]},t.prototype.readUInt16LE=function(t,e){return e||O(t,2,this.length),this[t]|this[t+1]<<8},t.prototype.readUInt16BE=function(t,e){return e||O(t,2,this.length),this[t]<<8|this[t+1]},t.prototype.readUInt32LE=function(t,e){return e||O(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},t.prototype.readUInt32BE=function(t,e){return e||O(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},t.prototype.readIntLE=function(t,e,n){t=0|t,e=0|e,n||O(t,e,this.length);for(var r=this[t],i=1,o=0;++o<e&&(i*=256);)r+=this[t+o]*i;return i*=128,r>=i&&(r-=Math.pow(2,8*e)),r},t.prototype.readIntBE=function(t,e,n){t=0|t,e=0|e,n||O(t,e,this.length);for(var r=e,i=1,o=this[t+--r];r>0&&(i*=256);)o+=this[t+--r]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},t.prototype.readInt8=function(t,e){return e||O(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},t.prototype.readInt16LE=function(t,e){e||O(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},t.prototype.readInt16BE=function(t,e){e||O(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},t.prototype.readInt32LE=function(t,e){return e||O(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},t.prototype.readInt32BE=function(t,e){return e||O(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},t.prototype.readFloatLE=function(t,e){return e||O(t,4,this.length),X.read(this,t,!0,23,4)},t.prototype.readFloatBE=function(t,e){return e||O(t,4,this.length),X.read(this,t,!1,23,4)},t.prototype.readDoubleLE=function(t,e){return e||O(t,8,this.length),X.read(this,t,!0,52,8)},t.prototype.readDoubleBE=function(t,e){return e||O(t,8,this.length),X.read(this,t,!1,52,8)},t.prototype.writeUIntLE=function(t,e,n,r){t=+t,e=0|e,n=0|n,r||M(this,t,e,n,Math.pow(2,8*n),0);var i=1,o=0;for(this[e]=255&t;++o<n&&(i*=256);)this[e+o]=t/i&255;return e+n},t.prototype.writeUIntBE=function(t,e,n,r){t=+t,e=0|e,n=0|n,r||M(this,t,e,n,Math.pow(2,8*n),0);var i=n-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+n},t.prototype.writeUInt8=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,1,255,0),t.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[n]=255&e,n+1},t.prototype.writeUInt16LE=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,2,65535,0),t.TYPED_ARRAY_SUPPORT?(this[n]=255&e,this[n+1]=e>>>8):D(this,e,n,!0),n+2},t.prototype.writeUInt16BE=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,2,65535,0),t.TYPED_ARRAY_SUPPORT?(this[n]=e>>>8,this[n+1]=255&e):D(this,e,n,!1),n+2},t.prototype.writeUInt32LE=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,4,4294967295,0),t.TYPED_ARRAY_SUPPORT?(this[n+3]=e>>>24,this[n+2]=e>>>16,this[n+1]=e>>>8,this[n]=255&e):U(this,e,n,!0),n+4},t.prototype.writeUInt32BE=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,4,4294967295,0),t.TYPED_ARRAY_SUPPORT?(this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=255&e):U(this,e,n,!1),n+4},t.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e=0|e,!r){var i=Math.pow(2,8*n-1);M(this,t,e,n,i-1,-i)}var o=0,a=1,s=0>t?1:0;for(this[e]=255&t;++o<n&&(a*=256);)this[e+o]=(t/a>>0)-s&255;return e+n},t.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e=0|e,!r){var i=Math.pow(2,8*n-1);M(this,t,e,n,i-1,-i)}var o=n-1,a=1,s=0>t?1:0;for(this[e+o]=255&t;--o>=0&&(a*=256);)this[e+o]=(t/a>>0)-s&255;return e+n},t.prototype.writeInt8=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,1,127,-128),t.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),0>e&&(e=255+e+1),this[n]=255&e,n+1},t.prototype.writeInt16LE=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,2,32767,-32768),t.TYPED_ARRAY_SUPPORT?(this[n]=255&e,this[n+1]=e>>>8):D(this,e,n,!0),n+2},t.prototype.writeInt16BE=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,2,32767,-32768),t.TYPED_ARRAY_SUPPORT?(this[n]=e>>>8,this[n+1]=255&e):D(this,e,n,!1),n+2},t.prototype.writeInt32LE=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,4,2147483647,-2147483648),t.TYPED_ARRAY_SUPPORT?(this[n]=255&e,this[n+1]=e>>>8,this[n+2]=e>>>16,this[n+3]=e>>>24):U(this,e,n,!0),n+4},t.prototype.writeInt32BE=function(e,n,r){return e=+e,n=0|n,r||M(this,e,n,4,2147483647,-2147483648),0>e&&(e=4294967295+e+1),t.TYPED_ARRAY_SUPPORT?(this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=255&e):U(this,e,n,!1),n+4},t.prototype.writeFloatLE=function(t,e,n){return z(this,t,e,!0,n)},t.prototype.writeFloatBE=function(t,e,n){return z(this,t,e,!1,n)},t.prototype.writeDoubleLE=function(t,e,n){return F(this,t,e,!0,n)},t.prototype.writeDoubleBE=function(t,e,n){return F(this,t,e,!1,n)},t.prototype.copy=function(e,n,r,i){if(r||(r=0),i||0===i||(i=this.length),n>=e.length&&(n=e.length),n||(n=0),i>0&&r>i&&(i=r),i===r)return 0;if(0===e.length||0===this.length)return 0;if(0>n)throw new RangeError("targetStart out of bounds");if(0>r||r>=this.length)throw new RangeError("sourceStart out of bounds");if(0>i)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),e.length-n<i-r&&(i=e.length-n+r);var o,a=i-r;if(this===e&&n>r&&i>n)for(o=a-1;o>=0;o--)e[o+n]=this[o+r];else if(1e3>a||!t.TYPED_ARRAY_SUPPORT)for(o=0;a>o;o++)e[o+n]=this[o+r];else e._set(this.subarray(r,r+a),n);return a},t.prototype.fill=function(t,e,n){if(t||(t=0),e||(e=0),n||(n=this.length),e>n)throw new RangeError("end < start");if(n!==e&&0!==this.length){if(0>e||e>=this.length)throw new RangeError("start out of bounds");if(0>n||n>this.length)throw new RangeError("end out of bounds");var r;if("number"==typeof t)for(r=e;n>r;r++)this[r]=t;else{var i=H(t.toString()),o=i.length;for(r=e;n>r;r++)this[r]=i[r%o]}return this}},t.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(t.TYPED_ARRAY_SUPPORT)return new t(this).buffer;for(var e=new Uint8Array(this.length),n=0,r=e.length;r>n;n+=1)e[n]=this[n];return e.buffer}throw new TypeError("Buffer.toArrayBuffer not supported in this browser")};var Q=t.prototype;t._augment=function(e){return e.constructor=t,e._isBuffer=!0,e._set=e.set,e.get=Q.get,e.set=Q.set,e.write=Q.write,e.toString=Q.toString,e.toLocaleString=Q.toString,e.toJSON=Q.toJSON,e.equals=Q.equals,e.compare=Q.compare,e.indexOf=Q.indexOf,e.copy=Q.copy,e.slice=Q.slice,e.readUIntLE=Q.readUIntLE,e.readUIntBE=Q.readUIntBE,e.readUInt8=Q.readUInt8,e.readUInt16LE=Q.readUInt16LE,e.readUInt16BE=Q.readUInt16BE,e.readUInt32LE=Q.readUInt32LE,e.readUInt32BE=Q.readUInt32BE,e.readIntLE=Q.readIntLE,e.readIntBE=Q.readIntBE,e.readInt8=Q.readInt8,e.readInt16LE=Q.readInt16LE,e.readInt16BE=Q.readInt16BE,e.readInt32LE=Q.readInt32LE,e.readInt32BE=Q.readInt32BE,e.readFloatLE=Q.readFloatLE,e.readFloatBE=Q.readFloatBE,e.readDoubleLE=Q.readDoubleLE,e.readDoubleBE=Q.readDoubleBE,e.writeUInt8=Q.writeUInt8,e.writeUIntLE=Q.writeUIntLE,e.writeUIntBE=Q.writeUIntBE,e.writeUInt16LE=Q.writeUInt16LE,e.writeUInt16BE=Q.writeUInt16BE,e.writeUInt32LE=Q.writeUInt32LE,e.writeUInt32BE=Q.writeUInt32BE,e.writeIntLE=Q.writeIntLE,e.writeIntBE=Q.writeIntBE,e.writeInt8=Q.writeInt8,e.writeInt16LE=Q.writeInt16LE,e.writeInt16BE=Q.writeInt16BE,e.writeInt32LE=Q.writeInt32LE,e.writeInt32BE=Q.writeInt32BE,e.writeFloatLE=Q.writeFloatLE,e.writeFloatBE=Q.writeFloatBE,e.writeDoubleLE=Q.writeDoubleLE,e.writeDoubleBE=Q.writeDoubleBE,e.fill=Q.fill,e.inspect=Q.inspect,e.toArrayBuffer=Q.toArrayBuffer,e};var tt=/[^+\/0-9A-Za-z-_]/g}).call(e,n(2).Buffer,function(){return this}())},function(t,e,n){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(t){"use strict";function e(t){var e=t.charCodeAt(0);return e===a||e===l?62:e===s||e===f?63:h>e?-1:h+10>e?e-h+26+26:c+26>e?e-c:u+26>e?e-u+26:void 0}function n(t){function n(t){u[l++]=t}var r,i,a,s,h,u;if(t.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var c=t.length;h="="===t.charAt(c-2)?2:"="===t.charAt(c-1)?1:0,u=new o(3*t.length/4-h),a=h>0?t.length-4:t.length;var l=0;for(r=0,i=0;a>r;r+=4,i+=3)s=e(t.charAt(r))<<18|e(t.charAt(r+1))<<12|e(t.charAt(r+2))<<6|e(t.charAt(r+3)),n((16711680&s)>>16),n((65280&s)>>8),n(255&s);return 2===h?(s=e(t.charAt(r))<<2|e(t.charAt(r+1))>>4,n(255&s)):1===h&&(s=e(t.charAt(r))<<10|e(t.charAt(r+1))<<4|e(t.charAt(r+2))>>2,n(s>>8&255),n(255&s)),u}function i(t){function e(t){return r.charAt(t)}function n(t){return e(t>>18&63)+e(t>>12&63)+e(t>>6&63)+e(63&t)}var i,o,a,s=t.length%3,h="";for(i=0,a=t.length-s;a>i;i+=3)o=(t[i]<<16)+(t[i+1]<<8)+t[i+2],h+=n(o);switch(s){case 1:o=t[t.length-1],h+=e(o>>2),h+=e(o<<4&63),h+="==";break;case 2:o=(t[t.length-2]<<8)+t[t.length-1],h+=e(o>>10),h+=e(o>>4&63),h+=e(o<<2&63),h+="="}return h}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,a="+".charCodeAt(0),s="/".charCodeAt(0),h="0".charCodeAt(0),u="a".charCodeAt(0),c="A".charCodeAt(0),l="-".charCodeAt(0),f="_".charCodeAt(0);t.toByteArray=n,t.fromByteArray=i}(e)},function(t,e){e.read=function(t,e,n,r,i){var o,a,s=8*i-r-1,h=(1<<s)-1,u=h>>1,c=-7,l=n?i-1:0,f=n?-1:1,d=t[e+l];for(l+=f,o=d&(1<<-c)-1,d>>=-c,c+=s;c>0;o=256*o+t[e+l],l+=f,c-=8);for(a=o&(1<<-c)-1,o>>=-c,c+=r;c>0;a=256*a+t[e+l],l+=f,c-=8);if(0===o)o=1-u;else{if(o===h)return a?NaN:(d?-1:1)*(1/0);a+=Math.pow(2,r),o-=u}return(d?-1:1)*a*Math.pow(2,o-r)},e.write=function(t,e,n,r,i,o){var a,s,h,u=8*o-i-1,c=(1<<u)-1,l=c>>1,f=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=r?0:o-1,p=r?1:-1,g=0>e||0===e&&0>1/e?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,a=c):(a=Math.floor(Math.log(e)/Math.LN2),e*(h=Math.pow(2,-a))<1&&(a--,h*=2),e+=a+l>=1?f/h:f*Math.pow(2,1-l),e*h>=2&&(a++,h/=2),a+l>=c?(s=0,a=c):a+l>=1?(s=(e*h-1)*Math.pow(2,i),a+=l):(s=e*Math.pow(2,l-1)*Math.pow(2,i),a=0));i>=8;t[n+d]=255&s,d+=p,s/=256,i-=8);for(a=a<<i|s,u+=i;u>0;t[n+d]=255&a,d+=p,a/=256,u-=8);t[n+d-p]|=128*g}},function(t,e){var n=Array.isArray,r=Object.prototype.toString;t.exports=n||function(t){return!!t&&"[object Array]"==r.call(t)}},function(t,e,n){"use strict";function r(t){this.fontDescriptors=t}function i(t){if(!t)return null;if("number"==typeof t||t instanceof Number)t={left:t,right:t,top:t,bottom:t};else if(t instanceof Array)if(2===t.length)t={left:t[0],top:t[1],right:t[0],bottom:t[1]};else{if(4!==t.length)throw"Invalid pageMargins definition";t={left:t[0],top:t[1],right:t[2],bottom:t[3]}}return t}function o(t){t.registerTableLayouts({noBorders:{hLineWidth:function(t){return 0},vLineWidth:function(t){return 0},paddingLeft:function(t){return t&&4||0},paddingRight:function(t,e){return t<e.table.widths.length-1?4:0}},headerLineOnly:{hLineWidth:function(t,e){return 0===t||t===e.table.body.length?0:t===e.table.headerRows?2:0},vLineWidth:function(t){return 0},paddingLeft:function(t){return 0===t?0:8},paddingRight:function(t,e){return t===e.table.widths.length-1?0:8}},lightHorizontalLines:{hLineWidth:function(t,e){return 0===t||t===e.table.body.length?0:t===e.table.headerRows?2:1},vLineWidth:function(t){return 0},hLineColor:function(t){return 1===t?"black":"#aaa"},paddingLeft:function(t){return 0===t?0:8},paddingRight:function(t,e){return t===e.table.widths.length-1?0:8}}})}function a(t){if("string"==typeof t||t instanceof String){var e=v[t.toUpperCase()];if(!e)throw"Page size "+t+" not recognized";return{width:e[0],height:e[1]}}return t}function s(t,e){var n=e.options.size[0]>e.options.size[1]?"landscape":"portrait";if(t.pageSize.orientation!==n){var r=e.options.size[0],i=e.options.size[1];e.options.size=[i,r]}}function h(t,e,n){n._pdfMakePages=t;for(var r=0;r<t.length;r++){r>0&&(s(t[r],n),n.addPage(n.options));for(var i=t[r],o=0,a=i.items.length;a>o;o++){var h=i.items[o];switch(h.type){case"vector":l(h.item,n);break;case"line":u(h.item,h.item.x,h.item.y,n);break;case"image":f(h.item,h.item.x,h.item.y,n)}}i.watermark&&c(i,n),e.setFontRefsToPdfDoc()}}function u(t,e,n,r){e=e||0,n=n||0;var i=t.getHeight(),o=t.getAscenderHeight();y.drawBackground(t,e,n,r);for(var a=0,s=t.inlines.length;s>a;a++){var h=t.inlines[a];r.fill(h.color||"black"),r.save(),r.transform(1,0,0,-1,0,r.page.height);var u=h.font.encode(h.text);r.addContent("BT"),r.addContent(""+(e+h.x)+" "+(r.page.height-n-o)+" Td"),r.addContent("/"+u.fontId+" "+h.fontSize+" Tf"),r.addContent("<"+u.encodedText+"> Tj"),r.addContent("ET"),h.link&&r.link(e+h.x,r.page.height-n-i,h.width,i,h.link),r.restore()}y.drawDecorations(t,e,n,r)}function c(t,e){var n=t.watermark;e.fill("black"),e.opacity(.6),e.save(),e.transform(1,0,0,-1,0,e.page.height);var r=180*Math.atan2(e.page.height,e.page.width)/Math.PI;e.rotate(r,{origin:[e.page.width/2,e.page.height/2]});var i=n.font.encode(n.text);e.addContent("BT"),e.addContent(""+(e.page.width/2-n.size.size.width/2)+" "+(e.page.height/2-n.size.size.height/4)+" Td"),e.addContent("/"+i.fontId+" "+n.size.fontSize+" Tf"),e.addContent("<"+i.encodedText+"> Tj"),e.addContent("ET"),e.restore()}function l(t,e){switch(e.lineWidth(t.lineWidth||1),t.dash?e.dash(t.dash.length,{space:t.dash.space||t.dash.length}):e.undash(),e.fillOpacity(t.fillOpacity||1),e.strokeOpacity(t.strokeOpacity||1),e.lineJoin(t.lineJoin||"miter"),t.type){case"ellipse":e.ellipse(t.x,t.y,t.r1,t.r2);break;case"rect":t.r?e.roundedRect(t.x,t.y,t.w,t.h,t.r):e.rect(t.x,t.y,t.w,t.h);break;case"line":e.moveTo(t.x1,t.y1),e.lineTo(t.x2,t.y2);break;case"polyline":if(0===t.points.length)break;e.moveTo(t.points[0].x,t.points[0].y);for(var n=1,r=t.points.length;r>n;n++)e.lineTo(t.points[n].x,t.points[n].y);if(t.points.length>1){var i=t.points[0],o=t.points[t.points.length-1];(t.closePath||i.x===o.x&&i.y===o.y)&&e.closePath()}}t.color&&t.lineColor?e.fillAndStroke(t.color,t.lineColor):t.color?e.fill(t.color):e.stroke(t.lineColor||"black")}function f(t,e,n,r){r.image(t.image,t.x,t.y,{width:t._width,height:t._height})}var d=(n(7),n(9)),p=n(11),g=n(24),v=(n(46),n(102)),m=n(103),y=n(104),d=n(9);r.prototype.createPdfKitDocument=function(t,e){e=e||{};var n=a(t.pageSize||"a4");if("landscape"===t.pageOrientation&&(n={width:n.height,height:n.width}),n.orientation="landscape"===t.pageOrientation?t.pageOrientation:"portrait",this.pdfKitDoc=new g({size:[n.width,n.height],compress:!1}),this.pdfKitDoc.info.Producer="pdfmake",this.pdfKitDoc.info.Creator="pdfmake",t.info){t.info;this.pdfKitDoc.info.Title=t.info.title?t.info.title:null,this.pdfKitDoc.info.Author=t.info.author?t.info.author:null,this.pdfKitDoc.info.Subject=t.info.subject?t.info.subject:null,this.pdfKitDoc.info.Keywords=t.info.keywords?t.info.keywords:null}this.fontProvider=new d(this.fontDescriptors,this.pdfKitDoc),t.images=t.images||{};var r=new p(n,i(t.pageMargins||40),new m(this.pdfKitDoc,t.images));o(r),e.tableLayouts&&r.registerTableLayouts(e.tableLayouts);var s=r.layoutDocument(t.content,this.fontProvider,t.styles||{},t.defaultStyle||{fontSize:12,font:"Roboto"},t.background,t.header,t.footer,t.images,t.watermark,t.pageBreakBefore);if(h(s,this.fontProvider,this.pdfKitDoc),e.autoPrint){var u=this.pdfKitDoc.ref({Type:"Action",S:"Named",N:"Print"});this.pdfKitDoc._root.data.OpenAction=u,u.end()}return this.pdfKitDoc};t.exports=r,r.prototype.fs=n(44)},function(t,e,n){var r;(function(t,i){(function(){function o(t,e){if(t!==e){var n=null===t,r=t===I,i=t===t,o=null===e,a=e===I,s=e===e;if(t>e&&!o||!i||n&&!a&&s||r&&s)return 1;if(e>t&&!n||!s||o&&!r&&i||a&&i)return-1}return 0}function a(t,e,n){for(var r=t.length,i=n?r:-1;n?i--:++i<r;)if(e(t[i],i,t))return i;return-1}function s(t,e,n){if(e!==e)return y(t,n);for(var r=n-1,i=t.length;++r<i;)if(t[r]===e)return r;return-1}function h(t){return"function"==typeof t||!1}function u(t){return null==t?"":t+""}function c(t,e){for(var n=-1,r=t.length;++n<r&&e.indexOf(t.charAt(n))>-1;);return n}function l(t,e){for(var n=t.length;n--&&e.indexOf(t.charAt(n))>-1;);return n}function f(t,e){return o(t.criteria,e.criteria)||t.index-e.index}function d(t,e,n){for(var r=-1,i=t.criteria,a=e.criteria,s=i.length,h=n.length;++r<s;){var u=o(i[r],a[r]);if(u){if(r>=h)return u;var c=n[r];return u*("asc"===c||c===!0?1:-1)}}return t.index-e.index}function p(t){return Yt[t]}function g(t){return qt[t]}function v(t,e,n){return e?t=Vt[t]:n&&(t=$t[t]),"\\"+t}function m(t){return"\\"+$t[t]}function y(t,e,n){for(var r=t.length,i=e+(n?0:-1);n?i--:++i<r;){var o=t[i];if(o!==o)return i}return-1}function _(t){return!!t&&"object"==typeof t}function w(t){return 160>=t&&t>=9&&13>=t||32==t||160==t||5760==t||6158==t||t>=8192&&(8202>=t||8232==t||8233==t||8239==t||8287==t||12288==t||65279==t)}function b(t,e){for(var n=-1,r=t.length,i=-1,o=[];++n<r;)t[n]===e&&(t[n]=Y,o[++i]=n);return o}function x(t,e){for(var n,r=-1,i=t.length,o=-1,a=[];++r<i;){var s=t[r],h=e?e(s,r,t):s;r&&n===h||(n=h,a[++o]=s)}return a}function S(t){for(var e=-1,n=t.length;++e<n&&w(t.charCodeAt(e)););return e}function k(t){for(var e=t.length;e--&&w(t.charCodeAt(e)););return e}function E(t){return Kt[t]}function C(t){function e(t){if(_(t)&&!Ls(t)&&!(t instanceof i)){if(t instanceof r)return t;if(ea.call(t,"__chain__")&&ea.call(t,"__wrapped__"))return dr(t)}return new r(t)}function n(){}function r(t,e,n){this.__wrapped__=t,this.__actions__=n||[],this.__chain__=!!e}function i(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Aa,this.__views__=[]}function w(){var t=new i(this.__wrapped__);return t.__actions__=te(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=te(this.__iteratees__),t.__takeCount__=this.__takeCount__,t.__views__=te(this.__views__),t}function Q(){if(this.__filtered__){var t=new i(this);t.__dir__=-1,t.__filtered__=!0}else t=this.clone(),t.__dir__*=-1;return t}function rt(){var t=this.__wrapped__.value(),e=this.__dir__,n=Ls(t),r=0>e,i=n?t.length:0,o=Yn(0,i,this.__views__),a=o.start,s=o.end,h=s-a,u=r?s:a-1,c=this.__iteratees__,l=c.length,f=0,d=Sa(h,this.__takeCount__);if(!n||j>i||i==h&&d==h)return nn(r&&n?t.reverse():t,this.__actions__);var p=[];t:for(;h--&&d>f;){u+=e;for(var g=-1,v=t[u];++g<l;){var m=c[g],y=m.iteratee,_=m.type,w=y(v);if(_==Z)v=w;else if(!w){if(_==H)continue t;break t}}p[f++]=v}return p}function ot(){this.__data__={}}function Yt(t){return this.has(t)&&delete this.__data__[t]}function qt(t){return"__proto__"==t?I:this.__data__[t]}function Kt(t){return"__proto__"!=t&&ea.call(this.__data__,t)}function Xt(t,e){return"__proto__"!=t&&(this.__data__[t]=e),this}function Vt(t){var e=t?t.length:0;for(this.data={hash:ma(null),set:new la};e--;)this.push(t[e])}function $t(t,e){var n=t.data,r="string"==typeof e||Mi(e)?n.set.has(e):n.hash[e];return r?0:-1}function Jt(t){var e=this.data;"string"==typeof t||Mi(t)?e.set.add(t):e.hash[t]=!0}function Qt(t,e){for(var n=-1,r=t.length,i=-1,o=e.length,a=No(r+o);++n<r;)a[n]=t[n];for(;++i<o;)a[n++]=e[i];return a}function te(t,e){var n=-1,r=t.length;for(e||(e=No(r));++n<r;)e[n]=t[n];return e}function ee(t,e){for(var n=-1,r=t.length;++n<r&&e(t[n],n,t)!==!1;);return t}function ne(t,e){for(var n=t.length;n--&&e(t[n],n,t)!==!1;);return t}function oe(t,e){for(var n=-1,r=t.length;++n<r;)if(!e(t[n],n,t))return!1;return!0}function ae(t,e,n,r){for(var i=-1,o=t.length,a=r,s=a;++i<o;){var h=t[i],u=+e(h);n(u,a)&&(a=u,s=h)}return s}function se(t,e){for(var n=-1,r=t.length,i=-1,o=[];++n<r;){var a=t[n];e(a,n,t)&&(o[++i]=a)}return o}function he(t,e){for(var n=-1,r=t.length,i=No(r);++n<r;)i[n]=e(t[n],n,t);return i}function ue(t,e){for(var n=-1,r=e.length,i=t.length;++n<r;)t[i+n]=e[n];return t}function ce(t,e,n,r){var i=-1,o=t.length;for(r&&o&&(n=t[++i]);++i<o;)n=e(n,t[i],i,t);return n}function le(t,e,n,r){var i=t.length;for(r&&i&&(n=t[--i]);i--;)n=e(n,t[i],i,t);return n}function fe(t,e){for(var n=-1,r=t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}function de(t,e){for(var n=t.length,r=0;n--;)r+=+e(t[n])||0;return r}function pe(t,e){return t===I?e:t}function ge(t,e,n,r){return t!==I&&ea.call(r,n)?t:e}function ve(t,e,n){for(var r=-1,i=Ws(e),o=i.length;++r<o;){var a=i[r],s=t[a],h=n(s,e[a],a,t,e);(h===h?h===s:s!==s)&&(s!==I||a in t)||(t[a]=h)}return t}function me(t,e){return null==e?t:_e(e,Ws(e),t)}function ye(t,e){for(var n=-1,r=null==t,i=!r&&$n(t),o=i?t.length:0,a=e.length,s=No(a);++n<a;){var h=e[n];i?s[n]=Jn(h,o)?t[h]:I:s[n]=r?I:t[h]}return s}function _e(t,e,n){n||(n={});for(var r=-1,i=e.length;++r<i;){var o=e[r];n[o]=t[o]}return n}function we(t,e,n){var r=typeof t;return"function"==r?e===I?t:an(t,e,n):null==t?Ao:"object"==r?Fe(t):e===I?Mo(t):We(t,e)}function be(t,e,n,r,i,o,a){var s;if(n&&(s=i?n(t,r,i):n(t)),s!==I)return s;if(!Mi(t))return t;var h=Ls(t);if(h){if(s=qn(t),!e)return te(t,s)}else{var u=ra.call(t),c=u==J;if(u!=et&&u!=q&&(!c||i))return Gt[u]?Xn(t,u,e):i?t:{};if(s=Kn(c?{}:t),!e)return me(s,t)}o||(o=[]),a||(a=[]);for(var l=o.length;l--;)if(o[l]==t)return a[l];return o.push(t),a.push(s),(h?ee:Te)(t,function(r,i){s[i]=be(r,e,n,i,t,o,a)}),s}function xe(t,e,n){if("function"!=typeof t)throw new Vo(G);return fa(function(){t.apply(I,n)},e)}function Se(t,e){var n=t?t.length:0,r=[];if(!n)return r;var i=-1,o=Hn(),a=o==s,h=a&&e.length>=j?gn(e):null,u=e.length;h&&(o=$t,a=!1,e=h);t:for(;++i<n;){var c=t[i];if(a&&c===c){for(var l=u;l--;)if(e[l]===c)continue t;r.push(c)}else o(e,c,0)<0&&r.push(c)}return r}function ke(t,e){var n=!0;return Ua(t,function(t,r,i){return n=!!e(t,r,i)}),n}function Ee(t,e,n,r){var i=r,o=i;return Ua(t,function(t,a,s){var h=+e(t,a,s);(n(h,i)||h===r&&h===o)&&(i=h,o=t)}),o}function Ce(t,e,n,r){var i=t.length;for(n=null==n?0:+n||0,0>n&&(n=-n>i?0:i+n),r=r===I||r>i?i:+r||0,0>r&&(r+=i),i=n>r?0:r>>>0,n>>>=0;i>n;)t[n++]=e;return t}function Ie(t,e){var n=[];return Ua(t,function(t,r,i){e(t,r,i)&&n.push(t)}),n}function Ae(t,e,n,r){var i;return n(t,function(t,n,o){return e(t,n,o)?(i=r?n:t,!1):void 0}),i}function Le(t,e,n,r){r||(r=[]);for(var i=-1,o=t.length;++i<o;){var a=t[i];_(a)&&$n(a)&&(n||Ls(a)||Ei(a))?e?Le(a,e,n,r):ue(r,a):n||(r[r.length]=a)}return r}function Re(t,e){return za(t,e,to)}function Te(t,e){return za(t,e,Ws)}function Be(t,e){return Fa(t,e,Ws)}function Oe(t,e){for(var n=-1,r=e.length,i=-1,o=[];++n<r;){var a=e[n];Oi(t[a])&&(o[++i]=a)}return o}function Me(t,e,n){if(null!=t){n!==I&&n in lr(t)&&(e=[n]);for(var r=0,i=e.length;null!=t&&i>r;)t=t[e[r++]];return r&&r==i?t:I}}function De(t,e,n,r,i,o){return t===e?!0:null==t||null==e||!Mi(t)&&!_(e)?t!==t&&e!==e:Ue(t,e,De,n,r,i,o)}function Ue(t,e,n,r,i,o,a){var s=Ls(t),h=Ls(e),u=K,c=K;s||(u=ra.call(t),u==q?u=et:u!=et&&(s=Hi(t))),h||(c=ra.call(e),c==q?c=et:c!=et&&(h=Hi(e)));var l=u==et,f=c==et,d=u==c;if(d&&!s&&!l)return Fn(t,e,u);if(!i){var p=l&&ea.call(t,"__wrapped__"),g=f&&ea.call(e,"__wrapped__");if(p||g)return n(p?t.value():t,g?e.value():e,r,i,o,a)}if(!d)return!1;o||(o=[]),a||(a=[]);for(var v=o.length;v--;)if(o[v]==t)return a[v]==e;o.push(t),a.push(e);var m=(s?zn:Wn)(t,e,n,r,i,o,a);return o.pop(),a.pop(),m}function Pe(t,e,n){var r=e.length,i=r,o=!n;if(null==t)return!i;for(t=lr(t);r--;){var a=e[r];if(o&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++r<i;){a=e[r];var s=a[0],h=t[s],u=a[1];if(o&&a[2]){if(h===I&&!(s in t))return!1}else{var c=n?n(h,u,s):I;if(!(c===I?De(u,h,n,!0):c))return!1}}return!0}function ze(t,e){var n=-1,r=$n(t)?No(t.length):[];return Ua(t,function(t,i,o){r[++n]=e(t,i,o)}),r}function Fe(t){var e=Zn(t);if(1==e.length&&e[0][2]){var n=e[0][0],r=e[0][1];return function(t){return null==t?!1:t[n]===r&&(r!==I||n in lr(t))}}return function(t){return Pe(t,e)}}function We(t,e){var n=Ls(t),r=tr(t)&&rr(e),i=t+"";return t=fr(t),function(o){if(null==o)return!1;var a=i;if(o=lr(o),(n||!r)&&!(a in o)){if(o=1==t.length?o:Me(o,Ke(t,0,-1)),null==o)return!1;a=Cr(t),o=lr(o)}return o[a]===e?e!==I||a in o:De(e,o[a],I,!0)}}function Ne(t,e,n,r,i){if(!Mi(t))return t;var o=$n(e)&&(Ls(e)||Hi(e)),a=o?I:Ws(e);return ee(a||e,function(s,h){if(a&&(h=s,s=e[h]),_(s))r||(r=[]),i||(i=[]),je(t,e,h,Ne,n,r,i);else{var u=t[h],c=n?n(u,s,h,t,e):I,l=c===I;l&&(c=s),c===I&&(!o||h in t)||!l&&(c===c?c===u:u!==u)||(t[h]=c)}}),t}function je(t,e,n,r,i,o,a){for(var s=o.length,h=e[n];s--;)if(o[s]==h)return void(t[n]=a[s]);var u=t[n],c=i?i(u,h,n,t,e):I,l=c===I;l&&(c=h,$n(h)&&(Ls(h)||Hi(h))?c=Ls(u)?u:$n(u)?te(u):[]:Wi(h)||Ei(h)?c=Ei(u)?Ki(u):Wi(u)?u:{}:l=!1),o.push(h),a.push(c),l?t[n]=r(c,h,i,o,a):(c===c?c!==u:u===u)&&(t[n]=c)}function He(t){return function(e){return null==e?I:e[t]}}function Ze(t){var e=t+"";return t=fr(t),function(n){return Me(n,t,e)}}function Ge(t,e){for(var n=t?e.length:0;n--;){var r=e[n];if(r!=i&&Jn(r)){var i=r;da.call(t,r,1)}}return t}function Ye(t,e){return t+ya(Ca()*(e-t+1))}function qe(t,e,n,r,i){return i(t,function(t,i,o){n=r?(r=!1,t):e(n,t,i,o)}),n}function Ke(t,e,n){var r=-1,i=t.length;e=null==e?0:+e||0,0>e&&(e=-e>i?0:i+e),n=n===I||n>i?i:+n||0,0>n&&(n+=i),i=e>n?0:n-e>>>0,e>>>=0;for(var o=No(i);++r<i;)o[r]=t[r+e];return o}function Xe(t,e){var n;return Ua(t,function(t,r,i){return n=e(t,r,i),!n}),!!n}function Ve(t,e){var n=t.length;for(t.sort(e);n--;)t[n]=t[n].value;return t}function $e(t,e,n){var r=Nn(),i=-1;e=he(e,function(t){return r(t)});var o=ze(t,function(t){var n=he(e,function(e){return e(t)});return{criteria:n,index:++i,value:t}});return Ve(o,function(t,e){return d(t,e,n)})}function Je(t,e){var n=0;return Ua(t,function(t,r,i){n+=+e(t,r,i)||0}),n}function Qe(t,e){var n=-1,r=Hn(),i=t.length,o=r==s,a=o&&i>=j,h=a?gn():null,u=[];h?(r=$t,o=!1):(a=!1,h=e?[]:u);t:for(;++n<i;){var c=t[n],l=e?e(c,n,t):c;if(o&&c===c){for(var f=h.length;f--;)if(h[f]===l)continue t;e&&h.push(l),u.push(c)}else r(h,l,0)<0&&((e||a)&&h.push(l),u.push(c))}return u}function tn(t,e){for(var n=-1,r=e.length,i=No(r);++n<r;)i[n]=t[e[n]];return i}function en(t,e,n,r){for(var i=t.length,o=r?i:-1;(r?o--:++o<i)&&e(t[o],o,t););return n?Ke(t,r?0:o,r?o+1:i):Ke(t,r?o+1:0,r?i:o)}function nn(t,e){var n=t;n instanceof i&&(n=n.value());for(var r=-1,o=e.length;++r<o;){var a=e[r];n=a.func.apply(a.thisArg,ue([n],a.args))}return n}function rn(t,e,n){var r=0,i=t?t.length:r;if("number"==typeof e&&e===e&&Ta>=i){for(;i>r;){var o=r+i>>>1,a=t[o];(n?e>=a:e>a)&&null!==a?r=o+1:i=o}return i}return on(t,e,Ao,n)}function on(t,e,n,r){e=n(e);for(var i=0,o=t?t.length:0,a=e!==e,s=null===e,h=e===I;o>i;){var u=ya((i+o)/2),c=n(t[u]),l=c!==I,f=c===c;if(a)var d=f||r;else d=s?f&&l&&(r||null!=c):h?f&&(r||l):null==c?!1:r?e>=c:e>c;d?i=u+1:o=u}return Sa(o,Ra)}function an(t,e,n){if("function"!=typeof t)return Ao;if(e===I)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 3:return function(n,r,i){return t.call(e,n,r,i)};case 4:return function(n,r,i,o){return t.call(e,n,r,i,o)};case 5:return function(n,r,i,o,a){return t.call(e,n,r,i,o,a)}}return function(){return t.apply(e,arguments)}}function sn(t){var e=new aa(t.byteLength),n=new pa(e);return n.set(new pa(t)),e}function hn(t,e,n){for(var r=n.length,i=-1,o=xa(t.length-r,0),a=-1,s=e.length,h=No(s+o);++a<s;)h[a]=e[a];for(;++i<r;)h[n[i]]=t[i];for(;o--;)h[a++]=t[i++];return h}function un(t,e,n){for(var r=-1,i=n.length,o=-1,a=xa(t.length-i,0),s=-1,h=e.length,u=No(a+h);++o<a;)u[o]=t[o];for(var c=o;++s<h;)u[c+s]=e[s];for(;++r<i;)u[c+n[r]]=t[o++];return u}function cn(t,e){return function(n,r,i){var o=e?e():{};if(r=Nn(r,i,3),Ls(n))for(var a=-1,s=n.length;++a<s;){var h=n[a];t(o,h,r(h,a,n),n)}else Ua(n,function(e,n,i){t(o,e,r(e,n,i),i)});return o}}function ln(t){return mi(function(e,n){var r=-1,i=null==e?0:n.length,o=i>2?n[i-2]:I,a=i>2?n[2]:I,s=i>1?n[i-1]:I;for("function"==typeof o?(o=an(o,s,5),i-=2):(o="function"==typeof s?s:I,i-=o?1:0),a&&Qn(n[0],n[1],a)&&(o=3>i?I:o,i=1);++r<i;){var h=n[r];h&&t(e,h,o)}return e})}function fn(t,e){return function(n,r){var i=n?ja(n):0;if(!nr(i))return t(n,r);for(var o=e?i:-1,a=lr(n);(e?o--:++o<i)&&r(a[o],o,a)!==!1;);return n}}function dn(t){return function(e,n,r){for(var i=lr(e),o=r(e),a=o.length,s=t?a:-1;t?s--:++s<a;){var h=o[s];if(n(i[h],h,i)===!1)break}return e}}function pn(t,e){function n(){var i=this&&this!==re&&this instanceof n?r:t;return i.apply(e,arguments)}var r=mn(t);return n}function gn(t){return ma&&la?new Vt(t):null}function vn(t){return function(e){for(var n=-1,r=Eo(co(e)),i=r.length,o="";++n<i;)o=t(o,r[n],n);return o}}function mn(t){return function(){var e=arguments;switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3]);case 5:
return new t(e[0],e[1],e[2],e[3],e[4]);case 6:return new t(e[0],e[1],e[2],e[3],e[4],e[5]);case 7:return new t(e[0],e[1],e[2],e[3],e[4],e[5],e[6])}var n=Da(t.prototype),r=t.apply(n,e);return Mi(r)?r:n}}function yn(t){function e(n,r,i){i&&Qn(n,r,i)&&(r=I);var o=Pn(n,t,I,I,I,I,I,r);return o.placeholder=e.placeholder,o}return e}function _n(t,e){return mi(function(n){var r=n[0];return null==r?r:(n.push(e),t.apply(I,n))})}function wn(t,e){return function(n,r,i){if(i&&Qn(n,r,i)&&(r=I),r=Nn(r,i,3),1==r.length){n=Ls(n)?n:cr(n);var o=ae(n,r,t,e);if(!n.length||o!==e)return o}return Ee(n,r,t,e)}}function bn(t,e){return function(n,r,i){if(r=Nn(r,i,3),Ls(n)){var o=a(n,r,e);return o>-1?n[o]:I}return Ae(n,r,t)}}function xn(t){return function(e,n,r){return e&&e.length?(n=Nn(n,r,3),a(e,n,t)):-1}}function Sn(t){return function(e,n,r){return n=Nn(n,r,3),Ae(e,n,t,!0)}}function kn(t){return function(){for(var e,n=arguments.length,i=t?n:-1,o=0,a=No(n);t?i--:++i<n;){var s=a[o++]=arguments[i];if("function"!=typeof s)throw new Vo(G);!e&&r.prototype.thru&&"wrapper"==jn(s)&&(e=new r([],!0))}for(i=e?-1:n;++i<n;){s=a[i];var h=jn(s),u="wrapper"==h?Na(s):I;e=u&&er(u[0])&&u[1]==(U|B|M|P)&&!u[4].length&&1==u[9]?e[jn(u[0])].apply(e,u[3]):1==s.length&&er(s)?e[h]():e.thru(s)}return function(){var t=arguments,r=t[0];if(e&&1==t.length&&Ls(r)&&r.length>=j)return e.plant(r).value();for(var i=0,o=n?a[i].apply(this,t):r;++i<n;)o=a[i].call(this,o);return o}}}function En(t,e){return function(n,r,i){return"function"==typeof r&&i===I&&Ls(n)?t(n,r):e(n,an(r,i,3))}}function Cn(t){return function(e,n,r){return("function"!=typeof n||r!==I)&&(n=an(n,r,3)),t(e,n,to)}}function In(t){return function(e,n,r){return("function"!=typeof n||r!==I)&&(n=an(n,r,3)),t(e,n)}}function An(t){return function(e,n,r){var i={};return n=Nn(n,r,3),Te(e,function(e,r,o){var a=n(e,r,o);r=t?a:r,e=t?e:a,i[r]=e}),i}}function Ln(t){return function(e,n,r){return e=u(e),(t?e:"")+On(e,n,r)+(t?"":e)}}function Rn(t){var e=mi(function(n,r){var i=b(r,e.placeholder);return Pn(n,t,I,r,i)});return e}function Tn(t,e){return function(n,r,i,o){var a=arguments.length<3;return"function"==typeof r&&o===I&&Ls(n)?t(n,r,i,a):qe(n,Nn(r,o,4),i,a,e)}}function Bn(t,e,n,r,i,o,a,s,h,u){function c(){for(var y=arguments.length,_=y,w=No(y);_--;)w[_]=arguments[_];if(r&&(w=hn(w,r,i)),o&&(w=un(w,o,a)),p||v){var x=c.placeholder,S=b(w,x);if(y-=S.length,u>y){var k=s?te(s):I,E=xa(u-y,0),C=p?S:I,A=p?I:S,T=p?w:I,B=p?I:w;e|=p?M:D,e&=~(p?D:M),g||(e&=~(L|R));var O=[t,e,n,T,C,B,A,k,h,E],U=Bn.apply(I,O);return er(t)&&Ha(U,O),U.placeholder=x,U}}var P=f?n:this,z=d?P[t]:t;return s&&(w=hr(w,s)),l&&h<w.length&&(w.length=h),this&&this!==re&&this instanceof c&&(z=m||mn(t)),z.apply(P,w)}var l=e&U,f=e&L,d=e&R,p=e&B,g=e&T,v=e&O,m=d?I:mn(t);return c}function On(t,e,n){var r=t.length;if(e=+e,r>=e||!wa(e))return"";var i=e-r;return n=null==n?" ":n+"",mo(n,va(i/n.length)).slice(0,i)}function Mn(t,e,n,r){function i(){for(var e=-1,s=arguments.length,h=-1,u=r.length,c=No(u+s);++h<u;)c[h]=r[h];for(;s--;)c[h++]=arguments[++e];var l=this&&this!==re&&this instanceof i?a:t;return l.apply(o?n:this,c)}var o=e&L,a=mn(t);return i}function Dn(t){var e=Go[t];return function(t,n){return n=n===I?0:+n||0,n?(n=ua(10,n),e(t*n)/n):e(t)}}function Un(t){return function(e,n,r,i){var o=Nn(r);return null==r&&o===we?rn(e,n,t):on(e,n,o(r,i,1),t)}}function Pn(t,e,n,r,i,o,a,s){var h=e&R;if(!h&&"function"!=typeof t)throw new Vo(G);var u=r?r.length:0;if(u||(e&=~(M|D),r=i=I),u-=i?i.length:0,e&D){var c=r,l=i;r=i=I}var f=h?I:Na(t),d=[t,e,n,r,i,c,l,o,a,s];if(f&&(ir(d,f),e=d[1],s=d[9]),d[9]=null==s?h?0:t.length:xa(s-u,0)||0,e==L)var p=pn(d[0],d[2]);else p=e!=M&&e!=(L|M)||d[4].length?Bn.apply(I,d):Mn.apply(I,d);var g=f?Wa:Ha;return g(p,d)}function zn(t,e,n,r,i,o,a){var s=-1,h=t.length,u=e.length;if(h!=u&&!(i&&u>h))return!1;for(;++s<h;){var c=t[s],l=e[s],f=r?r(i?l:c,i?c:l,s):I;if(f!==I){if(f)continue;return!1}if(i){if(!fe(e,function(t){return c===t||n(c,t,r,i,o,a)}))return!1}else if(c!==l&&!n(c,l,r,i,o,a))return!1}return!0}function Fn(t,e,n){switch(n){case X:case V:return+t==+e;case $:return t.name==e.name&&t.message==e.message;case tt:return t!=+t?e!=+e:t==+e;case nt:case it:return t==e+""}return!1}function Wn(t,e,n,r,i,o,a){var s=Ws(t),h=s.length,u=Ws(e),c=u.length;if(h!=c&&!i)return!1;for(var l=h;l--;){var f=s[l];if(!(i?f in e:ea.call(e,f)))return!1}for(var d=i;++l<h;){f=s[l];var p=t[f],g=e[f],v=r?r(i?g:p,i?p:g,f):I;if(!(v===I?n(p,g,r,i,o,a):v))return!1;d||(d="constructor"==f)}if(!d){var m=t.constructor,y=e.constructor;if(m!=y&&"constructor"in t&&"constructor"in e&&!("function"==typeof m&&m instanceof m&&"function"==typeof y&&y instanceof y))return!1}return!0}function Nn(t,n,r){var i=e.callback||Co;return i=i===Co?we:i,r?i(t,n,r):i}function jn(t){for(var e=t.name,n=Ma[e],r=n?n.length:0;r--;){var i=n[r],o=i.func;if(null==o||o==t)return i.name}return e}function Hn(t,n,r){var i=e.indexOf||kr;return i=i===kr?s:i,t?i(t,n,r):i}function Zn(t){for(var e=eo(t),n=e.length;n--;)e[n][2]=rr(e[n][1]);return e}function Gn(t,e){var n=null==t?I:t[e];return Pi(n)?n:I}function Yn(t,e,n){for(var r=-1,i=n.length;++r<i;){var o=n[r],a=o.size;switch(o.type){case"drop":t+=a;break;case"dropRight":e-=a;break;case"take":e=Sa(e,t+a);break;case"takeRight":t=xa(t,e-a)}}return{start:t,end:e}}function qn(t){var e=t.length,n=new t.constructor(e);return e&&"string"==typeof t[0]&&ea.call(t,"index")&&(n.index=t.index,n.input=t.input),n}function Kn(t){var e=t.constructor;return"function"==typeof e&&e instanceof e||(e=qo),new e}function Xn(t,e,n){var r=t.constructor;switch(e){case at:return sn(t);case X:case V:return new r(+t);case st:case ht:case ut:case ct:case lt:case ft:case dt:case pt:case gt:var i=t.buffer;return new r(n?sn(i):i,t.byteOffset,t.length);case tt:case it:return new r(t);case nt:var o=new r(t.source,Mt.exec(t));o.lastIndex=t.lastIndex}return o}function Vn(t,e,n){null==t||tr(e,t)||(e=fr(e),t=1==e.length?t:Me(t,Ke(e,0,-1)),e=Cr(e));var r=null==t?t:t[e];return null==r?I:r.apply(t,n)}function $n(t){return null!=t&&nr(ja(t))}function Jn(t,e){return t="number"==typeof t||Pt.test(t)?+t:-1,e=null==e?Ba:e,t>-1&&t%1==0&&e>t}function Qn(t,e,n){if(!Mi(n))return!1;var r=typeof e;if("number"==r?$n(n)&&Jn(e,n.length):"string"==r&&e in n){var i=n[e];return t===t?t===i:i!==i}return!1}function tr(t,e){var n=typeof t;if("string"==n&&It.test(t)||"number"==n)return!0;if(Ls(t))return!1;var r=!Ct.test(t);return r||null!=e&&t in lr(e)}function er(t){var n=jn(t);if(!(n in i.prototype))return!1;var r=e[n];if(t===r)return!0;var o=Na(r);return!!o&&t===o[0]}function nr(t){return"number"==typeof t&&t>-1&&t%1==0&&Ba>=t}function rr(t){return t===t&&!Mi(t)}function ir(t,e){var n=t[1],r=e[1],i=n|r,o=U>i,a=r==U&&n==B||r==U&&n==P&&t[7].length<=e[8]||r==(U|P)&&n==B;if(!o&&!a)return t;r&L&&(t[2]=e[2],i|=n&L?0:T);var s=e[3];if(s){var h=t[3];t[3]=h?hn(h,s,e[4]):te(s),t[4]=h?b(t[3],Y):te(e[4])}return s=e[5],s&&(h=t[5],t[5]=h?un(h,s,e[6]):te(s),t[6]=h?b(t[5],Y):te(e[6])),s=e[7],s&&(t[7]=te(s)),r&U&&(t[8]=null==t[8]?e[8]:Sa(t[8],e[8])),null==t[9]&&(t[9]=e[9]),t[0]=e[0],t[1]=i,t}function or(t,e){return t===I?e:Rs(t,e,or)}function ar(t,e){t=lr(t);for(var n=-1,r=e.length,i={};++n<r;){var o=e[n];o in t&&(i[o]=t[o])}return i}function sr(t,e){var n={};return Re(t,function(t,r,i){e(t,r,i)&&(n[r]=t)}),n}function hr(t,e){for(var n=t.length,r=Sa(e.length,n),i=te(t);r--;){var o=e[r];t[r]=Jn(o,n)?i[o]:I}return t}function ur(t){for(var e=to(t),n=e.length,r=n&&t.length,i=!!r&&nr(r)&&(Ls(t)||Ei(t)),o=-1,a=[];++o<n;){var s=e[o];(i&&Jn(s,r)||ea.call(t,s))&&a.push(s)}return a}function cr(t){return null==t?[]:$n(t)?Mi(t)?t:qo(t):oo(t)}function lr(t){return Mi(t)?t:qo(t)}function fr(t){if(Ls(t))return t;var e=[];return u(t).replace(At,function(t,n,r,i){e.push(r?i.replace(Bt,"$1"):n||t)}),e}function dr(t){return t instanceof i?t.clone():new r(t.__wrapped__,t.__chain__,te(t.__actions__))}function pr(t,e,n){e=(n?Qn(t,e,n):null==e)?1:xa(ya(e)||1,1);for(var r=0,i=t?t.length:0,o=-1,a=No(va(i/e));i>r;)a[++o]=Ke(t,r,r+=e);return a}function gr(t){for(var e=-1,n=t?t.length:0,r=-1,i=[];++e<n;){var o=t[e];o&&(i[++r]=o)}return i}function vr(t,e,n){var r=t?t.length:0;return r?((n?Qn(t,e,n):null==e)&&(e=1),Ke(t,0>e?0:e)):[]}function mr(t,e,n){var r=t?t.length:0;return r?((n?Qn(t,e,n):null==e)&&(e=1),e=r-(+e||0),Ke(t,0,0>e?0:e)):[]}function yr(t,e,n){return t&&t.length?en(t,Nn(e,n,3),!0,!0):[]}function _r(t,e,n){return t&&t.length?en(t,Nn(e,n,3),!0):[]}function wr(t,e,n,r){var i=t?t.length:0;return i?(n&&"number"!=typeof n&&Qn(t,e,n)&&(n=0,r=i),Ce(t,e,n,r)):[]}function br(t){return t?t[0]:I}function xr(t,e,n){var r=t?t.length:0;return n&&Qn(t,e,n)&&(e=!1),r?Le(t,e):[]}function Sr(t){var e=t?t.length:0;return e?Le(t,!0):[]}function kr(t,e,n){var r=t?t.length:0;if(!r)return-1;if("number"==typeof n)n=0>n?xa(r+n,0):n;else if(n){var i=rn(t,e);return r>i&&(e===e?e===t[i]:t[i]!==t[i])?i:-1}return s(t,e,n||0)}function Er(t){return mr(t,1)}function Cr(t){var e=t?t.length:0;return e?t[e-1]:I}function Ir(t,e,n){var r=t?t.length:0;if(!r)return-1;var i=r;if("number"==typeof n)i=(0>n?xa(r+n,0):Sa(n||0,r-1))+1;else if(n){i=rn(t,e,!0)-1;var o=t[i];return(e===e?e===o:o!==o)?i:-1}if(e!==e)return y(t,i,!0);for(;i--;)if(t[i]===e)return i;return-1}function Ar(){var t=arguments,e=t[0];if(!e||!e.length)return e;for(var n=0,r=Hn(),i=t.length;++n<i;)for(var o=0,a=t[n];(o=r(e,a,o))>-1;)da.call(e,o,1);return e}function Lr(t,e,n){var r=[];if(!t||!t.length)return r;var i=-1,o=[],a=t.length;for(e=Nn(e,n,3);++i<a;){var s=t[i];e(s,i,t)&&(r.push(s),o.push(i))}return Ge(t,o),r}function Rr(t){return vr(t,1)}function Tr(t,e,n){var r=t?t.length:0;return r?(n&&"number"!=typeof n&&Qn(t,e,n)&&(e=0,n=r),Ke(t,e,n)):[]}function Br(t,e,n){var r=t?t.length:0;return r?((n?Qn(t,e,n):null==e)&&(e=1),Ke(t,0,0>e?0:e)):[]}function Or(t,e,n){var r=t?t.length:0;return r?((n?Qn(t,e,n):null==e)&&(e=1),e=r-(+e||0),Ke(t,0>e?0:e)):[]}function Mr(t,e,n){return t&&t.length?en(t,Nn(e,n,3),!1,!0):[]}function Dr(t,e,n){return t&&t.length?en(t,Nn(e,n,3)):[]}function Ur(t,e,n,r){var i=t?t.length:0;if(!i)return[];null!=e&&"boolean"!=typeof e&&(r=n,n=Qn(t,e,r)?I:e,e=!1);var o=Nn();return(null!=n||o!==we)&&(n=o(n,r,3)),e&&Hn()==s?x(t,n):Qe(t,n)}function Pr(t){if(!t||!t.length)return[];var e=-1,n=0;t=se(t,function(t){return $n(t)?(n=xa(t.length,n),!0):void 0});for(var r=No(n);++e<n;)r[e]=he(t,He(e));return r}function zr(t,e,n){var r=t?t.length:0;if(!r)return[];var i=Pr(t);return null==e?i:(e=an(e,n,4),he(i,function(t){return ce(t,e,I,!0)}))}function Fr(){for(var t=-1,e=arguments.length;++t<e;){var n=arguments[t];if($n(n))var r=r?ue(Se(r,n),Se(n,r)):n}return r?Qe(r):[]}function Wr(t,e){var n=-1,r=t?t.length:0,i={};for(!r||e||Ls(t[0])||(e=[]);++n<r;){var o=t[n];e?i[o]=e[n]:o&&(i[o[0]]=o[1])}return i}function Nr(t){var n=e(t);return n.__chain__=!0,n}function jr(t,e,n){return e.call(n,t),t}function Hr(t,e,n){return e.call(n,t)}function Zr(){return Nr(this)}function Gr(){return new r(this.value(),this.__chain__)}function Yr(t){for(var e,r=this;r instanceof n;){var i=dr(r);e?o.__wrapped__=i:e=i;var o=i;r=r.__wrapped__}return o.__wrapped__=t,e}function qr(){var t=this.__wrapped__,e=function(t){return n&&n.__dir__<0?t:t.reverse()};if(t instanceof i){var n=t;return this.__actions__.length&&(n=new i(this)),n=n.reverse(),n.__actions__.push({func:Hr,args:[e],thisArg:I}),new r(n,this.__chain__)}return this.thru(e)}function Kr(){return this.value()+""}function Xr(){return nn(this.__wrapped__,this.__actions__)}function Vr(t,e,n){var r=Ls(t)?oe:ke;return n&&Qn(t,e,n)&&(e=I),("function"!=typeof e||n!==I)&&(e=Nn(e,n,3)),r(t,e)}function $r(t,e,n){var r=Ls(t)?se:Ie;return e=Nn(e,n,3),r(t,e)}function Jr(t,e){return is(t,Fe(e))}function Qr(t,e,n,r){var i=t?ja(t):0;return nr(i)||(t=oo(t),i=t.length),n="number"!=typeof n||r&&Qn(e,n,r)?0:0>n?xa(i+n,0):n||0,"string"==typeof t||!Ls(t)&&ji(t)?i>=n&&t.indexOf(e,n)>-1:!!i&&Hn(t,e,n)>-1}function ti(t,e,n){var r=Ls(t)?he:ze;return e=Nn(e,n,3),r(t,e)}function ei(t,e){return ti(t,Mo(e))}function ni(t,e,n){var r=Ls(t)?se:Ie;return e=Nn(e,n,3),r(t,function(t,n,r){return!e(t,n,r)})}function ri(t,e,n){if(n?Qn(t,e,n):null==e){t=cr(t);var r=t.length;return r>0?t[Ye(0,r-1)]:I}var i=-1,o=qi(t),r=o.length,a=r-1;for(e=Sa(0>e?0:+e||0,r);++i<e;){var s=Ye(i,a),h=o[s];o[s]=o[i],o[i]=h}return o.length=e,o}function ii(t){return ri(t,Aa)}function oi(t){var e=t?ja(t):0;return nr(e)?e:Ws(t).length}function ai(t,e,n){var r=Ls(t)?fe:Xe;return n&&Qn(t,e,n)&&(e=I),("function"!=typeof e||n!==I)&&(e=Nn(e,n,3)),r(t,e)}function si(t,e,n){if(null==t)return[];n&&Qn(t,e,n)&&(e=I);var r=-1;e=Nn(e,n,3);var i=ze(t,function(t,n,i){return{criteria:e(t,n,i),index:++r,value:t}});return Ve(i,f)}function hi(t,e,n,r){return null==t?[]:(r&&Qn(e,n,r)&&(n=I),Ls(e)||(e=null==e?[]:[e]),Ls(n)||(n=null==n?[]:[n]),$e(t,e,n))}function ui(t,e){return $r(t,Fe(e))}function ci(t,e){if("function"!=typeof e){if("function"!=typeof t)throw new Vo(G);var n=t;t=e,e=n}return t=wa(t=+t)?t:0,function(){return--t<1?e.apply(this,arguments):void 0}}function li(t,e,n){return n&&Qn(t,e,n)&&(e=I),e=t&&null==e?t.length:xa(+e||0,0),Pn(t,U,I,I,I,I,e)}function fi(t,e){var n;if("function"!=typeof e){if("function"!=typeof t)throw new Vo(G);var r=t;t=e,e=r}return function(){return--t>0&&(n=e.apply(this,arguments)),1>=t&&(e=I),n}}function di(t,e,n){function r(){d&&sa(d),u&&sa(u),g=0,u=d=p=I}function i(e,n){n&&sa(n),u=d=p=I,e&&(g=gs(),c=t.apply(f,h),d||u||(h=f=I))}function o(){var t=e-(gs()-l);0>=t||t>e?i(p,u):d=fa(o,t)}function a(){i(m,d)}function s(){if(h=arguments,l=gs(),f=this,p=m&&(d||!y),v===!1)var n=y&&!d;else{u||y||(g=l);var r=v-(l-g),i=0>=r||r>v;i?(u&&(u=sa(u)),g=l,c=t.apply(f,h)):u||(u=fa(a,r))}return i&&d?d=sa(d):d||e===v||(d=fa(o,e)),n&&(i=!0,c=t.apply(f,h)),!i||d||u||(h=f=I),c}var h,u,c,l,f,d,p,g=0,v=!1,m=!0;if("function"!=typeof t)throw new Vo(G);if(e=0>e?0:+e||0,n===!0){var y=!0;m=!1}else Mi(n)&&(y=!!n.leading,v="maxWait"in n&&xa(+n.maxWait||0,e),m="trailing"in n?!!n.trailing:m);return s.cancel=r,s}function pi(t,e){if("function"!=typeof t||e&&"function"!=typeof e)throw new Vo(G);var n=function(){var r=arguments,i=e?e.apply(this,r):r[0],o=n.cache;if(o.has(i))return o.get(i);var a=t.apply(this,r);return n.cache=o.set(i,a),a};return n.cache=new pi.Cache,n}function gi(t){if("function"!=typeof t)throw new Vo(G);return function(){return!t.apply(this,arguments)}}function vi(t){return fi(2,t)}function mi(t,e){if("function"!=typeof t)throw new Vo(G);return e=xa(e===I?t.length-1:+e||0,0),function(){for(var n=arguments,r=-1,i=xa(n.length-e,0),o=No(i);++r<i;)o[r]=n[e+r];switch(e){case 0:return t.call(this,o);case 1:return t.call(this,n[0],o);case 2:return t.call(this,n[0],n[1],o)}var a=No(e+1);for(r=-1;++r<e;)a[r]=n[r];return a[e]=o,t.apply(this,a)}}function yi(t){if("function"!=typeof t)throw new Vo(G);return function(e){return t.apply(this,e)}}function _i(t,e,n){var r=!0,i=!0;if("function"!=typeof t)throw new Vo(G);return n===!1?r=!1:Mi(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),di(t,e,{leading:r,maxWait:+e,trailing:i})}function wi(t,e){return e=null==e?Ao:e,Pn(e,M,I,[t],[])}function bi(t,e,n,r){return e&&"boolean"!=typeof e&&Qn(t,e,n)?e=!1:"function"==typeof e&&(r=n,n=e,e=!1),"function"==typeof n?be(t,e,an(n,r,1)):be(t,e)}function xi(t,e,n){return"function"==typeof e?be(t,!0,an(e,n,1)):be(t,!0)}function Si(t,e){return t>e}function ki(t,e){return t>=e}function Ei(t){return _(t)&&$n(t)&&ea.call(t,"callee")&&!ca.call(t,"callee")}function Ci(t){return t===!0||t===!1||_(t)&&ra.call(t)==X}function Ii(t){return _(t)&&ra.call(t)==V}function Ai(t){return!!t&&1===t.nodeType&&_(t)&&!Wi(t)}function Li(t){return null==t?!0:$n(t)&&(Ls(t)||ji(t)||Ei(t)||_(t)&&Oi(t.splice))?!t.length:!Ws(t).length}function Ri(t,e,n,r){n="function"==typeof n?an(n,r,3):I;var i=n?n(t,e):I;return i===I?De(t,e,n):!!i}function Ti(t){return _(t)&&"string"==typeof t.message&&ra.call(t)==$}function Bi(t){return"number"==typeof t&&wa(t)}function Oi(t){return Mi(t)&&ra.call(t)==J}function Mi(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Di(t,e,n,r){return n="function"==typeof n?an(n,r,3):I,Pe(t,Zn(e),n)}function Ui(t){return Fi(t)&&t!=+t}function Pi(t){return null==t?!1:Oi(t)?oa.test(ta.call(t)):_(t)&&Ut.test(t)}function zi(t){return null===t}function Fi(t){return"number"==typeof t||_(t)&&ra.call(t)==tt}function Wi(t){var e;if(!_(t)||ra.call(t)!=et||Ei(t)||!ea.call(t,"constructor")&&(e=t.constructor,"function"==typeof e&&!(e instanceof e)))return!1;var n;return Re(t,function(t,e){n=e}),n===I||ea.call(t,n)}function Ni(t){return Mi(t)&&ra.call(t)==nt}function ji(t){return"string"==typeof t||_(t)&&ra.call(t)==it}function Hi(t){return _(t)&&nr(t.length)&&!!Zt[ra.call(t)]}function Zi(t){return t===I}function Gi(t,e){return e>t}function Yi(t,e){return e>=t}function qi(t){var e=t?ja(t):0;return nr(e)?e?te(t):[]:oo(t)}function Ki(t){return _e(t,to(t))}function Xi(t,e,n){var r=Da(t);return n&&Qn(t,e,n)&&(e=I),e?me(r,e):r}function Vi(t){return Oe(t,to(t))}function $i(t,e,n){var r=null==t?I:Me(t,fr(e),e+"");return r===I?n:r}function Ji(t,e){if(null==t)return!1;var n=ea.call(t,e);if(!n&&!tr(e)){if(e=fr(e),t=1==e.length?t:Me(t,Ke(e,0,-1)),null==t)return!1;e=Cr(e),n=ea.call(t,e)}return n||nr(t.length)&&Jn(e,t.length)&&(Ls(t)||Ei(t))}function Qi(t,e,n){n&&Qn(t,e,n)&&(e=I);for(var r=-1,i=Ws(t),o=i.length,a={};++r<o;){var s=i[r],h=t[s];e?ea.call(a,h)?a[h].push(s):a[h]=[s]:a[h]=s}return a}function to(t){if(null==t)return[];Mi(t)||(t=qo(t));var e=t.length;e=e&&nr(e)&&(Ls(t)||Ei(t))&&e||0;for(var n=t.constructor,r=-1,i="function"==typeof n&&n.prototype===t,o=No(e),a=e>0;++r<e;)o[r]=r+"";for(var s in t)a&&Jn(s,e)||"constructor"==s&&(i||!ea.call(t,s))||o.push(s);return o}function eo(t){t=lr(t);for(var e=-1,n=Ws(t),r=n.length,i=No(r);++e<r;){var o=n[e];i[e]=[o,t[o]]}return i}function no(t,e,n){var r=null==t?I:t[e];return r===I&&(null==t||tr(e,t)||(e=fr(e),t=1==e.length?t:Me(t,Ke(e,0,-1)),r=null==t?I:t[Cr(e)]),r=r===I?n:r),Oi(r)?r.call(t):r}function ro(t,e,n){if(null==t)return t;var r=e+"";e=null!=t[r]||tr(e,t)?[r]:fr(e);for(var i=-1,o=e.length,a=o-1,s=t;null!=s&&++i<o;){var h=e[i];Mi(s)&&(i==a?s[h]=n:null==s[h]&&(s[h]=Jn(e[i+1])?[]:{})),s=s[h]}return t}function io(t,e,n,r){var i=Ls(t)||Hi(t);if(e=Nn(e,r,4),null==n)if(i||Mi(t)){var o=t.constructor;n=i?Ls(t)?new o:[]:Da(Oi(o)?o.prototype:I)}else n={};return(i?ee:Te)(t,function(t,r,i){return e(n,t,r,i)}),n}function oo(t){return tn(t,Ws(t))}function ao(t){return tn(t,to(t))}function so(t,e,n){return e=+e||0,n===I?(n=e,e=0):n=+n||0,t>=Sa(e,n)&&t<xa(e,n)}function ho(t,e,n){n&&Qn(t,e,n)&&(e=n=I);var r=null==t,i=null==e;if(null==n&&(i&&"boolean"==typeof t?(n=t,t=1):"boolean"==typeof e&&(n=e,i=!0)),r&&i&&(e=1,i=!1),t=+t||0,i?(e=t,t=0):e=+e||0,n||t%1||e%1){var o=Ca();return Sa(t+o*(e-t+ha("1e-"+((o+"").length-1))),e)}return Ye(t,e)}function uo(t){return t=u(t),t&&t.charAt(0).toUpperCase()+t.slice(1)}function co(t){return t=u(t),t&&t.replace(zt,p).replace(Tt,"")}function lo(t,e,n){t=u(t),e+="";var r=t.length;return n=n===I?r:Sa(0>n?0:+n||0,r),n-=e.length,n>=0&&t.indexOf(e,n)==n}function fo(t){return t=u(t),t&&xt.test(t)?t.replace(wt,g):t}function po(t){return t=u(t),t&&Rt.test(t)?t.replace(Lt,v):t||"(?:)"}function go(t,e,n){t=u(t),e=+e;var r=t.length;if(r>=e||!wa(e))return t;var i=(e-r)/2,o=ya(i),a=va(i);return n=On("",a,n),n.slice(0,o)+t+n}function vo(t,e,n){return(n?Qn(t,e,n):null==e)?e=0:e&&(e=+e),t=wo(t),Ea(t,e||(Dt.test(t)?16:10))}function mo(t,e){var n="";if(t=u(t),e=+e,1>e||!t||!wa(e))return n;do e%2&&(n+=t),e=ya(e/2),t+=t;while(e);return n}function yo(t,e,n){return t=u(t),n=null==n?0:Sa(0>n?0:+n||0,t.length),t.lastIndexOf(e,n)==n}function _o(t,n,r){var i=e.templateSettings;r&&Qn(t,n,r)&&(n=r=I),t=u(t),n=ve(me({},r||n),i,ge);var o,a,s=ve(me({},n.imports),i.imports,ge),h=Ws(s),c=tn(s,h),l=0,f=n.interpolate||Ft,d="__p += '",p=Ko((n.escape||Ft).source+"|"+f.source+"|"+(f===Et?Ot:Ft).source+"|"+(n.evaluate||Ft).source+"|$","g"),g="//# sourceURL="+("sourceURL"in n?n.sourceURL:"lodash.templateSources["+ ++Ht+"]")+"\n";t.replace(p,function(e,n,r,i,s,h){return r||(r=i),d+=t.slice(l,h).replace(Wt,m),n&&(o=!0,d+="' +\n__e("+n+") +\n'"),s&&(a=!0,d+="';\n"+s+";\n__p += '"),r&&(d+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),l=h+e.length,e}),d+="';\n";var v=n.variable;v||(d="with (obj) {\n"+d+"\n}\n"),d=(a?d.replace(vt,""):d).replace(mt,"$1").replace(yt,"$1;"),d="function("+(v||"obj")+") {\n"+(v?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(o?", __e = _.escape":"")+(a?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+d+"return __p\n}";var y=$s(function(){return Zo(h,g+"return "+d).apply(I,c)});if(y.source=d,Ti(y))throw y;return y}function wo(t,e,n){var r=t;return(t=u(t))?(n?Qn(r,e,n):null==e)?t.slice(S(t),k(t)+1):(e+="",t.slice(c(t,e),l(t,e)+1)):t}function bo(t,e,n){var r=t;return t=u(t),t?(n?Qn(r,e,n):null==e)?t.slice(S(t)):t.slice(c(t,e+"")):t}function xo(t,e,n){var r=t;return t=u(t),t?(n?Qn(r,e,n):null==e)?t.slice(0,k(t)+1):t.slice(0,l(t,e+"")+1):t}function So(t,e,n){n&&Qn(t,e,n)&&(e=I);var r=z,i=F;if(null!=e)if(Mi(e)){var o="separator"in e?e.separator:o;r="length"in e?+e.length||0:r,i="omission"in e?u(e.omission):i}else r=+e||0;if(t=u(t),r>=t.length)return t;var a=r-i.length;if(1>a)return i;var s=t.slice(0,a);if(null==o)return s+i;if(Ni(o)){if(t.slice(a).search(o)){var h,c,l=t.slice(0,a);for(o.global||(o=Ko(o.source,(Mt.exec(o)||"")+"g")),o.lastIndex=0;h=o.exec(l);)c=h.index;s=s.slice(0,null==c?a:c)}}else if(t.indexOf(o,a)!=a){var f=s.lastIndexOf(o);f>-1&&(s=s.slice(0,f))}return s+i}function ko(t){return t=u(t),t&&bt.test(t)?t.replace(_t,E):t}function Eo(t,e,n){return n&&Qn(t,e,n)&&(e=I),t=u(t),t.match(e||Nt)||[]}function Co(t,e,n){return n&&Qn(t,e,n)&&(e=I),_(t)?Lo(t):we(t,e)}function Io(t){return function(){return t}}function Ao(t){return t}function Lo(t){return Fe(be(t,!0))}function Ro(t,e){return We(t,be(e,!0))}function To(t,e,n){if(null==n){var r=Mi(e),i=r?Ws(e):I,o=i&&i.length?Oe(e,i):I;(o?o.length:r)||(o=!1,n=e,e=t,t=this)}o||(o=Oe(e,Ws(e)));var a=!0,s=-1,h=Oi(t),u=o.length;n===!1?a=!1:Mi(n)&&"chain"in n&&(a=n.chain);for(;++s<u;){var c=o[s],l=e[c];t[c]=l,h&&(t.prototype[c]=function(e){return function(){var n=this.__chain__;if(a||n){var r=t(this.__wrapped__),i=r.__actions__=te(this.__actions__);return i.push({func:e,args:arguments,thisArg:t}),r.__chain__=n,r}return e.apply(t,ue([this.value()],arguments))}}(l))}return t}function Bo(){return re._=ia,this}function Oo(){}function Mo(t){return tr(t)?He(t):Ze(t)}function Do(t){return function(e){return Me(t,fr(e),e+"")}}function Uo(t,e,n){n&&Qn(t,e,n)&&(e=n=I),t=+t||0,n=null==n?1:+n||0,null==e?(e=t,t=0):e=+e||0;for(var r=-1,i=xa(va((e-t)/(n||1)),0),o=No(i);++r<i;)o[r]=t,t+=n;return o}function Po(t,e,n){if(t=ya(t),1>t||!wa(t))return[];var r=-1,i=No(Sa(t,La));for(e=an(e,n,1);++r<t;)La>r?i[r]=e(r):e(r);return i}function zo(t){var e=++na;return u(t)+e}function Fo(t,e){return(+t||0)+(+e||0)}function Wo(t,e,n){return n&&Qn(t,e,n)&&(e=I),e=Nn(e,n,3),1==e.length?de(Ls(t)?t:cr(t),e):Je(t,e)}t=t?ie.defaults(re.Object(),t,ie.pick(re,jt)):re;var No=t.Array,jo=t.Date,Ho=t.Error,Zo=t.Function,Go=t.Math,Yo=t.Number,qo=t.Object,Ko=t.RegExp,Xo=t.String,Vo=t.TypeError,$o=No.prototype,Jo=qo.prototype,Qo=Xo.prototype,ta=Zo.prototype.toString,ea=Jo.hasOwnProperty,na=0,ra=Jo.toString,ia=re._,oa=Ko("^"+ta.call(ea).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),aa=t.ArrayBuffer,sa=t.clearTimeout,ha=t.parseFloat,ua=Go.pow,ca=Jo.propertyIsEnumerable,la=Gn(t,"Set"),fa=t.setTimeout,da=$o.splice,pa=t.Uint8Array,ga=Gn(t,"WeakMap"),va=Go.ceil,ma=Gn(qo,"create"),ya=Go.floor,_a=Gn(No,"isArray"),wa=t.isFinite,ba=Gn(qo,"keys"),xa=Go.max,Sa=Go.min,ka=Gn(jo,"now"),Ea=t.parseInt,Ca=Go.random,Ia=Yo.NEGATIVE_INFINITY,Aa=Yo.POSITIVE_INFINITY,La=4294967295,Ra=La-1,Ta=La>>>1,Ba=9007199254740991,Oa=ga&&new ga,Ma={};e.support={};e.templateSettings={escape:St,evaluate:kt,interpolate:Et,variable:"",imports:{_:e}};var Da=function(){function t(){}return function(e){if(Mi(e)){t.prototype=e;var n=new t;t.prototype=I}return n||{}}}(),Ua=fn(Te),Pa=fn(Be,!0),za=dn(),Fa=dn(!0),Wa=Oa?function(t,e){return Oa.set(t,e),t}:Ao,Na=Oa?function(t){return Oa.get(t)}:Oo,ja=He("length"),Ha=function(){var t=0,e=0;return function(n,r){var i=gs(),o=N-(i-e);if(e=i,o>0){if(++t>=W)return n}else t=0;return Wa(n,r)}}(),Za=mi(function(t,e){return _(t)&&$n(t)?Se(t,Le(e,!1,!0)):[]}),Ga=xn(),Ya=xn(!0),qa=mi(function(t){for(var e=t.length,n=e,r=No(l),i=Hn(),o=i==s,a=[];n--;){var h=t[n]=$n(h=t[n])?h:[];r[n]=o&&h.length>=120?gn(n&&h):null}var u=t[0],c=-1,l=u?u.length:0,f=r[0];t:for(;++c<l;)if(h=u[c],(f?$t(f,h):i(a,h,0))<0){for(var n=e;--n;){var d=r[n];if((d?$t(d,h):i(t[n],h,0))<0)continue t}f&&f.push(h),a.push(h)}return a}),Ka=mi(function(t,e){e=Le(e);var n=ye(t,e);return Ge(t,e.sort(o)),n}),Xa=Un(),Va=Un(!0),$a=mi(function(t){return Qe(Le(t,!1,!0))}),Ja=mi(function(t,e){return $n(t)?Se(t,e):[]}),Qa=mi(Pr),ts=mi(function(t){var e=t.length,n=e>2?t[e-2]:I,r=e>1?t[e-1]:I;return e>2&&"function"==typeof n?e-=2:(n=e>1&&"function"==typeof r?(--e,r):I,r=I),t.length=e,zr(t,n,r)}),es=mi(function(t){return t=Le(t),this.thru(function(e){return Qt(Ls(e)?e:[lr(e)],t)})}),ns=mi(function(t,e){return ye(t,Le(e))}),rs=cn(function(t,e,n){ea.call(t,n)?++t[n]:t[n]=1}),is=bn(Ua),os=bn(Pa,!0),as=En(ee,Ua),ss=En(ne,Pa),hs=cn(function(t,e,n){ea.call(t,n)?t[n].push(e):t[n]=[e]}),us=cn(function(t,e,n){t[n]=e}),cs=mi(function(t,e,n){var r=-1,i="function"==typeof e,o=tr(e),a=$n(t)?No(t.length):[];return Ua(t,function(t){var s=i?e:o&&null!=t?t[e]:I;a[++r]=s?s.apply(t,n):Vn(t,e,n)}),a}),ls=cn(function(t,e,n){t[n?0:1].push(e)},function(){return[[],[]]}),fs=Tn(ce,Ua),ds=Tn(le,Pa),ps=mi(function(t,e){if(null==t)return[];var n=e[2];return n&&Qn(e[0],e[1],n)&&(e.length=1),$e(t,Le(e),[])}),gs=ka||function(){return(new jo).getTime()},vs=mi(function(t,e,n){var r=L;if(n.length){var i=b(n,vs.placeholder);r|=M}return Pn(t,r,e,n,i)}),ms=mi(function(t,e){e=e.length?Le(e):Vi(t);for(var n=-1,r=e.length;++n<r;){var i=e[n];t[i]=Pn(t[i],L,t)}return t}),ys=mi(function(t,e,n){var r=L|R;if(n.length){var i=b(n,ys.placeholder);r|=M}return Pn(e,r,t,n,i)}),_s=yn(B),ws=yn(O),bs=mi(function(t,e){return xe(t,1,e)}),xs=mi(function(t,e,n){return xe(t,e,n)}),Ss=kn(),ks=kn(!0),Es=mi(function(t,e){if(e=Le(e),"function"!=typeof t||!oe(e,h))throw new Vo(G);var n=e.length;return mi(function(r){for(var i=Sa(r.length,n);i--;)r[i]=e[i](r[i]);return t.apply(this,r)})}),Cs=Rn(M),Is=Rn(D),As=mi(function(t,e){return Pn(t,P,I,I,I,Le(e))}),Ls=_a||function(t){return _(t)&&nr(t.length)&&ra.call(t)==K},Rs=ln(Ne),Ts=ln(function(t,e,n){return n?ve(t,e,n):me(t,e)}),Bs=_n(Ts,pe),Os=_n(Rs,or),Ms=Sn(Te),Ds=Sn(Be),Us=Cn(za),Ps=Cn(Fa),zs=In(Te),Fs=In(Be),Ws=ba?function(t){var e=null==t?I:t.constructor;return"function"==typeof e&&e.prototype===t||"function"!=typeof t&&$n(t)?ur(t):Mi(t)?ba(t):[]}:ur,Ns=An(!0),js=An(),Hs=mi(function(t,e){if(null==t)return{};if("function"!=typeof e[0]){var e=he(Le(e),Xo);return ar(t,Se(to(t),e))}var n=an(e[0],e[1],3);return sr(t,function(t,e,r){return!n(t,e,r)})}),Zs=mi(function(t,e){return null==t?{}:"function"==typeof e[0]?sr(t,an(e[0],e[1],3)):ar(t,Le(e))}),Gs=vn(function(t,e,n){return e=e.toLowerCase(),t+(n?e.charAt(0).toUpperCase()+e.slice(1):e)}),Ys=vn(function(t,e,n){return t+(n?"-":"")+e.toLowerCase()}),qs=Ln(),Ks=Ln(!0),Xs=vn(function(t,e,n){return t+(n?"_":"")+e.toLowerCase()}),Vs=vn(function(t,e,n){return t+(n?" ":"")+(e.charAt(0).toUpperCase()+e.slice(1))}),$s=mi(function(t,e){try{return t.apply(I,e)}catch(n){return Ti(n)?n:new Ho(n)}}),Js=mi(function(t,e){return function(n){return Vn(n,t,e)}}),Qs=mi(function(t,e){return function(n){return Vn(t,n,e)}}),th=Dn("ceil"),eh=Dn("floor"),nh=wn(Si,Ia),rh=wn(Gi,Aa),ih=Dn("round");return e.prototype=n.prototype,r.prototype=Da(n.prototype),r.prototype.constructor=r,i.prototype=Da(n.prototype),i.prototype.constructor=i,ot.prototype["delete"]=Yt,ot.prototype.get=qt,ot.prototype.has=Kt,ot.prototype.set=Xt,Vt.prototype.push=Jt,pi.Cache=ot,e.after=ci,e.ary=li,e.assign=Ts,e.at=ns,e.before=fi,e.bind=vs,e.bindAll=ms,e.bindKey=ys,e.callback=Co,e.chain=Nr,e.chunk=pr,e.compact=gr,e.constant=Io,e.countBy=rs,e.create=Xi,e.curry=_s,e.curryRight=ws,e.debounce=di,e.defaults=Bs,e.defaultsDeep=Os,e.defer=bs,e.delay=xs,e.difference=Za,e.drop=vr,e.dropRight=mr,e.dropRightWhile=yr,e.dropWhile=_r,e.fill=wr,e.filter=$r,e.flatten=xr,e.flattenDeep=Sr,e.flow=Ss,e.flowRight=ks,e.forEach=as,e.forEachRight=ss,e.forIn=Us,e.forInRight=Ps,e.forOwn=zs,e.forOwnRight=Fs,e.functions=Vi,e.groupBy=hs,e.indexBy=us,e.initial=Er,e.intersection=qa,e.invert=Qi,e.invoke=cs,e.keys=Ws,e.keysIn=to,e.map=ti,e.mapKeys=Ns,e.mapValues=js,e.matches=Lo,e.matchesProperty=Ro,e.memoize=pi,e.merge=Rs,e.method=Js,e.methodOf=Qs,e.mixin=To,e.modArgs=Es,e.negate=gi,e.omit=Hs,e.once=vi,e.pairs=eo,e.partial=Cs,e.partialRight=Is,e.partition=ls,e.pick=Zs,e.pluck=ei,e.property=Mo,e.propertyOf=Do,e.pull=Ar,e.pullAt=Ka,e.range=Uo,e.rearg=As,e.reject=ni,e.remove=Lr,e.rest=Rr,e.restParam=mi,e.set=ro,e.shuffle=ii,e.slice=Tr,e.sortBy=si,e.sortByAll=ps,e.sortByOrder=hi,e.spread=yi,e.take=Br,e.takeRight=Or,e.takeRightWhile=Mr,e.takeWhile=Dr,e.tap=jr,e.throttle=_i,e.thru=Hr,e.times=Po,e.toArray=qi,e.toPlainObject=Ki,e.transform=io,e.union=$a,e.uniq=Ur,e.unzip=Pr,e.unzipWith=zr,e.values=oo,e.valuesIn=ao,e.where=ui,e.without=Ja,e.wrap=wi,e.xor=Fr,e.zip=Qa,e.zipObject=Wr,e.zipWith=ts,e.backflow=ks,e.collect=ti,e.compose=ks,e.each=as,e.eachRight=ss,e.extend=Ts,e.iteratee=Co,e.methods=Vi,e.object=Wr,e.select=$r,e.tail=Rr,e.unique=Ur,To(e,e),e.add=Fo,e.attempt=$s,e.camelCase=Gs,e.capitalize=uo,e.ceil=th,e.clone=bi,e.cloneDeep=xi,e.deburr=co,e.endsWith=lo,e.escape=fo,e.escapeRegExp=po,e.every=Vr,e.find=is,e.findIndex=Ga,e.findKey=Ms,e.findLast=os,e.findLastIndex=Ya,e.findLastKey=Ds,e.findWhere=Jr,e.first=br,e.floor=eh,e.get=$i,e.gt=Si,e.gte=ki,e.has=Ji,e.identity=Ao,e.includes=Qr,e.indexOf=kr,e.inRange=so,e.isArguments=Ei,e.isArray=Ls,e.isBoolean=Ci,e.isDate=Ii,e.isElement=Ai,e.isEmpty=Li,e.isEqual=Ri,e.isError=Ti,e.isFinite=Bi,e.isFunction=Oi,e.isMatch=Di,e.isNaN=Ui,e.isNative=Pi,e.isNull=zi,e.isNumber=Fi,e.isObject=Mi,e.isPlainObject=Wi,e.isRegExp=Ni,e.isString=ji,e.isTypedArray=Hi,e.isUndefined=Zi,e.kebabCase=Ys,e.last=Cr,e.lastIndexOf=Ir,e.lt=Gi,e.lte=Yi,e.max=nh,e.min=rh,e.noConflict=Bo,e.noop=Oo,e.now=gs,e.pad=go,e.padLeft=qs,e.padRight=Ks,e.parseInt=vo,e.random=ho,e.reduce=fs,e.reduceRight=ds,e.repeat=mo,e.result=no,e.round=ih,e.runInContext=C,e.size=oi,e.snakeCase=Xs,e.some=ai,e.sortedIndex=Xa,e.sortedLastIndex=Va,e.startCase=Vs,e.startsWith=yo,e.sum=Wo,e.template=_o,e.trim=wo,e.trimLeft=bo,e.trimRight=xo,e.trunc=So,e.unescape=ko,e.uniqueId=zo,e.words=Eo,e.all=Vr,e.any=ai,e.contains=Qr,e.eq=Ri,e.detect=is,e.foldl=fs,e.foldr=ds,e.head=br,e.include=Qr,e.inject=fs,To(e,function(){var t={};return Te(e,function(n,r){e.prototype[r]||(t[r]=n)}),t}(),!1),e.sample=ri,e.prototype.sample=function(t){return this.__chain__||null!=t?this.thru(function(e){return ri(e,t)}):ri(this.value())},e.VERSION=A,ee(["bind","bindKey","curry","curryRight","partial","partialRight"],function(t){e[t].placeholder=e}),ee(["drop","take"],function(t,e){i.prototype[t]=function(n){var r=this.__filtered__;if(r&&!e)return new i(this);n=null==n?1:xa(ya(n)||0,0);var o=this.clone();return r?o.__takeCount__=Sa(o.__takeCount__,n):o.__views__.push({size:n,type:t+(o.__dir__<0?"Right":"")}),o},i.prototype[t+"Right"]=function(e){return this.reverse()[t](e).reverse()}}),ee(["filter","map","takeWhile"],function(t,e){var n=e+1,r=n!=Z;i.prototype[t]=function(t,e){var i=this.clone();return i.__iteratees__.push({iteratee:Nn(t,e,1),type:n}),i.__filtered__=i.__filtered__||r,i}}),ee(["first","last"],function(t,e){var n="take"+(e?"Right":"");i.prototype[t]=function(){return this[n](1).value()[0]}}),ee(["initial","rest"],function(t,e){var n="drop"+(e?"":"Right");i.prototype[t]=function(){return this.__filtered__?new i(this):this[n](1);
}}),ee(["pluck","where"],function(t,e){var n=e?"filter":"map",r=e?Fe:Mo;i.prototype[t]=function(t){return this[n](r(t))}}),i.prototype.compact=function(){return this.filter(Ao)},i.prototype.reject=function(t,e){return t=Nn(t,e,1),this.filter(function(e){return!t(e)})},i.prototype.slice=function(t,e){t=null==t?0:+t||0;var n=this;return n.__filtered__&&(t>0||0>e)?new i(n):(0>t?n=n.takeRight(-t):t&&(n=n.drop(t)),e!==I&&(e=+e||0,n=0>e?n.dropRight(-e):n.take(e-t)),n)},i.prototype.takeRightWhile=function(t,e){return this.reverse().takeWhile(t,e).reverse()},i.prototype.toArray=function(){return this.take(Aa)},Te(i.prototype,function(t,n){var o=/^(?:filter|map|reject)|While$/.test(n),a=/^(?:first|last)$/.test(n),s=e[a?"take"+("last"==n?"Right":""):n];s&&(e.prototype[n]=function(){var e=a?[1]:arguments,n=this.__chain__,h=this.__wrapped__,u=!!this.__actions__.length,c=h instanceof i,l=e[0],f=c||Ls(h);f&&o&&"function"==typeof l&&1!=l.length&&(c=f=!1);var d=function(t){return a&&n?s(t,1)[0]:s.apply(I,ue([t],e))},p={func:Hr,args:[d],thisArg:I},g=c&&!u;if(a&&!n)return g?(h=h.clone(),h.__actions__.push(p),t.call(h)):s.call(I,this.value())[0];if(!a&&f){h=g?h:new i(this);var v=t.apply(h,e);return v.__actions__.push(p),new r(v,n)}return this.thru(d)})}),ee(["join","pop","push","replace","shift","sort","splice","split","unshift"],function(t){var n=(/^(?:replace|split)$/.test(t)?Qo:$o)[t],r=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",i=/^(?:join|pop|replace|shift)$/.test(t);e.prototype[t]=function(){var t=arguments;return i&&!this.__chain__?n.apply(this.value(),t):this[r](function(e){return n.apply(e,t)})}}),Te(i.prototype,function(t,n){var r=e[n];if(r){var i=r.name,o=Ma[i]||(Ma[i]=[]);o.push({name:n,func:r})}}),Ma[Bn(I,R).name]=[{name:"wrapper",func:I}],i.prototype.clone=w,i.prototype.reverse=Q,i.prototype.value=rt,e.prototype.chain=Zr,e.prototype.commit=Gr,e.prototype.concat=es,e.prototype.plant=Yr,e.prototype.reverse=qr,e.prototype.toString=Kr,e.prototype.run=e.prototype.toJSON=e.prototype.valueOf=e.prototype.value=Xr,e.prototype.collect=e.prototype.map,e.prototype.head=e.prototype.first,e.prototype.select=e.prototype.filter,e.prototype.tail=e.prototype.rest,e}var I,A="3.10.1",L=1,R=2,T=4,B=8,O=16,M=32,D=64,U=128,P=256,z=30,F="...",W=150,N=16,j=200,H=1,Z=2,G="Expected a function",Y="__lodash_placeholder__",q="[object Arguments]",K="[object Array]",X="[object Boolean]",V="[object Date]",$="[object Error]",J="[object Function]",Q="[object Map]",tt="[object Number]",et="[object Object]",nt="[object RegExp]",rt="[object Set]",it="[object String]",ot="[object WeakMap]",at="[object ArrayBuffer]",st="[object Float32Array]",ht="[object Float64Array]",ut="[object Int8Array]",ct="[object Int16Array]",lt="[object Int32Array]",ft="[object Uint8Array]",dt="[object Uint8ClampedArray]",pt="[object Uint16Array]",gt="[object Uint32Array]",vt=/\b__p \+= '';/g,mt=/\b(__p \+=) '' \+/g,yt=/(__e\(.*?\)|\b__t\)) \+\n'';/g,_t=/&(?:amp|lt|gt|quot|#39|#96);/g,wt=/[&<>"'`]/g,bt=RegExp(_t.source),xt=RegExp(wt.source),St=/<%-([\s\S]+?)%>/g,kt=/<%([\s\S]+?)%>/g,Et=/<%=([\s\S]+?)%>/g,Ct=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,It=/^\w*$/,At=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,Lt=/^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,Rt=RegExp(Lt.source),Tt=/[\u0300-\u036f\ufe20-\ufe23]/g,Bt=/\\(\\)?/g,Ot=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,Mt=/\w*$/,Dt=/^0[xX]/,Ut=/^\[object .+?Constructor\]$/,Pt=/^\d+$/,zt=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,Ft=/($^)/,Wt=/['\n\r\u2028\u2029\\]/g,Nt=function(){var t="[A-Z\\xc0-\\xd6\\xd8-\\xde]",e="[a-z\\xdf-\\xf6\\xf8-\\xff]+";return RegExp(t+"+(?="+t+e+")|"+t+"?"+e+"|"+t+"+|[0-9]+","g")}(),jt=["Array","ArrayBuffer","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Math","Number","Object","RegExp","Set","String","_","clearTimeout","isFinite","parseFloat","parseInt","setTimeout","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap"],Ht=-1,Zt={};Zt[st]=Zt[ht]=Zt[ut]=Zt[ct]=Zt[lt]=Zt[ft]=Zt[dt]=Zt[pt]=Zt[gt]=!0,Zt[q]=Zt[K]=Zt[at]=Zt[X]=Zt[V]=Zt[$]=Zt[J]=Zt[Q]=Zt[tt]=Zt[et]=Zt[nt]=Zt[rt]=Zt[it]=Zt[ot]=!1;var Gt={};Gt[q]=Gt[K]=Gt[at]=Gt[X]=Gt[V]=Gt[st]=Gt[ht]=Gt[ut]=Gt[ct]=Gt[lt]=Gt[tt]=Gt[et]=Gt[nt]=Gt[it]=Gt[ft]=Gt[dt]=Gt[pt]=Gt[gt]=!0,Gt[$]=Gt[J]=Gt[Q]=Gt[rt]=Gt[ot]=!1;var Yt={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss"},qt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},Kt={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Xt={"function":!0,object:!0},Vt={0:"x30",1:"x31",2:"x32",3:"x33",4:"x34",5:"x35",6:"x36",7:"x37",8:"x38",9:"x39",A:"x41",B:"x42",C:"x43",D:"x44",E:"x45",F:"x46",a:"x61",b:"x62",c:"x63",d:"x64",e:"x65",f:"x66",n:"x6e",r:"x72",t:"x74",u:"x75",v:"x76",x:"x78"},$t={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Jt=Xt[typeof e]&&e&&!e.nodeType&&e,Qt=Xt[typeof t]&&t&&!t.nodeType&&t,te=Jt&&Qt&&"object"==typeof i&&i&&i.Object&&i,ee=Xt[typeof self]&&self&&self.Object&&self,ne=Xt[typeof window]&&window&&window.Object&&window,re=(Qt&&Qt.exports===Jt&&Jt,te||ne!==(this&&this.window)&&ne||ee||this),ie=C();re._=ie,r=function(){return ie}.call(e,n,e,t),!(r!==I&&(t.exports=r))}).call(this)}).call(e,n(8)(t),function(){return this}())},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e,n){"use strict";function r(t,e){var n="normal";return t&&e?n="bolditalics":t?n="bold":e&&(n="italics"),n}function i(t,e){this.fonts={},this.pdfDoc=e,this.fontWrappers={};for(var n in t)if(t.hasOwnProperty(n)){var r=t[n];this.fonts[n]={normal:r.normal,bold:r.bold,italics:r.italics,bolditalics:r.bolditalics}}}var o=n(7),a=n(10);i.prototype.provideFont=function(t,e,n){var i=r(e,n);if(!this.fonts[t]||!this.fonts[t][i])throw new Error("Font '"+t+"' in style '"+i+"' is not defined in the font section of the document definition.");return this.fontWrappers[t]=this.fontWrappers[t]||{},this.fontWrappers[t][i]||(this.fontWrappers[t][i]=new a(this.pdfDoc,this.fonts[t][i],t+"("+i+")")),this.fontWrappers[t][i]},i.prototype.setFontRefsToPdfDoc=function(){var t=this;o.each(t.fontWrappers,function(e){o.each(e,function(e){o.each(e.pdfFonts,function(e){t.pdfDoc.page.fonts[e.id]||(t.pdfDoc.page.fonts[e.id]=e.ref())})})})},t.exports=i},function(t,e,n){"use strict";function r(t,e,n){this.MAX_CHAR_TYPES=92,this.pdfkitDoc=t,this.path=e,this.pdfFonts=[],this.charCatalogue=[],this.name=n,Object.defineProperty(this,"ascender",{get:function(){var t=this.getFont(0);return t.ascender}}),Object.defineProperty(this,"decender",{get:function(){var t=this.getFont(0);return t.decender}})}var i=n(7);r.prototype.getFont=function(t){if(!this.pdfFonts[t]){var e=this.name+t;this.postscriptName&&delete this.pdfkitDoc._fontFamilies[this.postscriptName],this.pdfFonts[t]=this.pdfkitDoc.font(this.path,e)._font,this.postscriptName||(this.postscriptName=this.pdfFonts[t].name)}return this.pdfFonts[t]},r.prototype.widthOfString=function(){var t=this.getFont(0);return t.widthOfString.apply(t,arguments)},r.prototype.lineHeight=function(){var t=this.getFont(0);return t.lineHeight.apply(t,arguments)},r.prototype.ref=function(){var t=this.getFont(0);return t.ref.apply(t,arguments)};var o=function(t){return t.charCodeAt(0)};r.prototype.encode=function(t){var e=this,n=i.chain(t.split("")).map(o).uniq().value();if(n.length>e.MAX_CHAR_TYPES)throw new Error("Inline has more than "+e.MAX_CHAR_TYPES+": "+t+" different character types and therefore cannot be properly embedded into pdf.");var r=function(t){return i.uniq(t.concat(n)).length<=e.MAX_CHAR_TYPES},a=i.findIndex(e.charCatalogue,r);0>a&&(a=e.charCatalogue.length,e.charCatalogue[a]=[]);var s=e.getFont(a);s.use(t),i.each(n,function(t){i.includes(e.charCatalogue[a],t)||e.charCatalogue[a].push(t)});var h=i.map(s.encode(t),function(t){return t.charCodeAt(0).toString(16)}).join("");return{encodedText:h,fontId:s.id}},t.exports=r},function(t,e,n){"use strict";function r(t,e){a.each(e,function(e){t.push(e)})}function i(t,e,n){this.pageSize=t,this.pageMargins=e,this.tracker=new s,this.imageMeasure=n,this.tableLayouts={}}function o(t){var e=t.x,n=t.y;t.positions=[],a.each(t.canvas,function(t){var e=t.x,n=t.y,r=t.x1,i=t.y1,o=t.x2,a=t.y2;t.resetXY=function(){t.x=e,t.y=n,t.x1=r,t.y1=i,t.x2=o,t.y2=a}}),t.resetXY=function(){t.x=e,t.y=n,a.each(t.canvas,function(t){t.resetXY()})}}var a=n(7),s=n(12),h=n(13),u=n(19),c=n(20),l=n(16),f=n(23),d=n(22),p=n(17).pack,g=n(17).offsetVector,v=n(17).fontStringify,m=n(17).isFunction,y=n(14),_=n(15);i.prototype.registerTableLayouts=function(t){this.tableLayouts=p(this.tableLayouts,t)},i.prototype.layoutDocument=function(t,e,n,r,i,o,s,u,c,l){function f(t,e){return m(l)?(t=a.reject(t,function(t){return a.isEmpty(t.positions)}),a.each(t,function(t){var n=a.pick(t,["id","text","ul","ol","table","image","qr","canvas","columns","headlineLevel","style","pageBreak","pageOrientation","width","height"]);n.startPosition=a.first(t.positions),n.pageNumbers=a.chain(t.positions).map("pageNumber").uniq().value(),n.pages=e.length,n.stack=a.isArray(t.stack),t.nodeInfo=n}),a.any(t,function(t,e,n){if("before"!==t.pageBreak&&!t.pageBreakCalculated){t.pageBreakCalculated=!0;var r=a.first(t.nodeInfo.pageNumbers),i=a.chain(n).drop(e+1).filter(function(t){return a.contains(t.nodeInfo.pageNumbers,r)}).value(),o=a.chain(n).drop(e+1).filter(function(t){return a.contains(t.nodeInfo.pageNumbers,r+1)}).value(),s=a.chain(n).take(e).filter(function(t){return a.contains(t.nodeInfo.pageNumbers,r)}).value();if(l(t.nodeInfo,a.map(i,"nodeInfo"),a.map(o,"nodeInfo"),a.map(s,"nodeInfo")))return t.pageBreak="before",!0}})):!1}function d(t){a.each(t.linearNodeList,function(t){t.resetXY()})}this.docMeasure=new h(e,n,r,this.imageMeasure,this.tableLayouts,u);for(var p=this.tryLayoutDocument(t,e,n,r,i,o,s,u,c);f(p.linearNodeList,p.pages);)d(p),p=this.tryLayoutDocument(t,e,n,r,i,o,s,u,c);return p.pages},i.prototype.tryLayoutDocument=function(t,e,n,r,i,o,a,s,h,l){this.linearNodeList=[],t=this.docMeasure.measureDocument(t),this.writer=new c(new u(this.pageSize,this.pageMargins),this.tracker);var f=this;return this.writer.context().tracker.startTracking("pageAdded",function(){f.addBackground(i)}),this.addBackground(i),this.processNode(t),this.addHeadersAndFooters(o,a),null!=h&&this.addWatermark(h,e),{pages:this.writer.context().pages,linearNodeList:this.linearNodeList}},i.prototype.addBackground=function(t){var e=m(t)?t:function(){return t},n=e(this.writer.context().page+1);if(n){var r=this.writer.context().getCurrentPage().pageSize;this.writer.beginUnbreakableBlock(r.width,r.height),this.processNode(this.docMeasure.measureDocument(n)),this.writer.commitUnbreakableBlock(0,0)}},i.prototype.addStaticRepeatable=function(t,e){this.addDynamicRepeatable(function(){return t},e)},i.prototype.addDynamicRepeatable=function(t,e){for(var n=this.writer.context().pages,r=0,i=n.length;i>r;r++){this.writer.context().page=r;var o=t(r+1,i);if(o){var a=e(this.writer.context().getCurrentPage().pageSize,this.pageMargins);this.writer.beginUnbreakableBlock(a.width,a.height),this.processNode(this.docMeasure.measureDocument(o)),this.writer.commitUnbreakableBlock(a.x,a.y)}}},i.prototype.addHeadersAndFooters=function(t,e){var n=function(t,e){return{x:0,y:0,width:t.width,height:e.top}},r=function(t,e){return{x:0,y:t.height-e.bottom,width:t.width,height:e.bottom}};m(t)?this.addDynamicRepeatable(t,n):t&&this.addStaticRepeatable(t,n),m(e)?this.addDynamicRepeatable(e,r):e&&this.addStaticRepeatable(e,r)},i.prototype.addWatermark=function(t,e){function n(t,e,n){for(var r,i=t.width,o=t.height,a=.8*Math.sqrt(i*i+o*o),s=new y(n),h=new _,u=0,c=1e3,l=(u+c)/2;Math.abs(u-c)>1;)h.push({fontSize:l}),r=s.sizeOfString(e,h),r.width>a?(c=l,l=(u+c)/2):r.width<a&&(u=l,l=(u+c)/2),h.pop();return{size:r,fontSize:l}}for(var r=Object.getOwnPropertyNames(e.fonts)[0],i={text:t,font:e.provideFont(e[r],!1,!1),size:n(this.pageSize,t,e)},o=this.writer.context().pages,a=0,s=o.length;s>a;a++)o[a].watermark=i},i.prototype.processNode=function(t){function e(e){var r=t._margin;"before"===t.pageBreak&&n.writer.moveToNextPage(t.pageOrientation),r&&(n.writer.context().moveDown(r[1]),n.writer.context().addMargin(r[0],r[2])),e(),r&&(n.writer.context().addMargin(-r[0],-r[2]),n.writer.context().moveDown(r[3])),"after"===t.pageBreak&&n.writer.moveToNextPage(t.pageOrientation)}var n=this;this.linearNodeList.push(t),o(t),e(function(){var e=t.absolutePosition;if(e&&(n.writer.context().beginDetachedBlock(),n.writer.context().moveTo(e.x||0,e.y||0)),t.stack)n.processVerticalContainer(t);else if(t.columns)n.processColumns(t);else if(t.ul)n.processList(!1,t);else if(t.ol)n.processList(!0,t);else if(t.table)n.processTable(t);else if(void 0!==t.text)n.processLeaf(t);else if(t.image)n.processImage(t);else if(t.canvas)n.processCanvas(t);else if(t.qr)n.processQr(t);else if(!t._span)throw"Unrecognized document structure: "+JSON.stringify(t,v);e&&n.writer.context().endDetachedBlock()})},i.prototype.processVerticalContainer=function(t){var e=this;t.stack.forEach(function(n){e.processNode(n),r(t.positions,n.positions)})},i.prototype.processColumns=function(t){function e(t){if(!t)return null;var e=[];e.push(0);for(var r=n.length-1;r>0;r--)e.push(t);return e}var n=t.columns,i=this.writer.context().availableWidth,o=e(t._gap);o&&(i-=(o.length-1)*t._gap),l.buildColumnWidths(n,i);var a=this.processRow(n,n,o);r(t.positions,a.positions)},i.prototype.processRow=function(t,e,n,i,o){function a(t){for(var e,n=0,r=c.length;r>n;n++){var i=c[n];if(i.prevPage===t.prevPage){e=i;break}}e||(e=t,c.push(e)),e.prevY=Math.max(e.prevY,t.prevY),e.y=Math.min(e.y,t.y)}function s(t){return n&&n.length>t?n[t]:0}function h(t,e){if(t.rowSpan&&t.rowSpan>1){var n=o+t.rowSpan-1;if(n>=i.length)throw"Row span for column "+e+" (with indexes starting from 0) exceeded row count";return i[n][e]}return null}var u=this,c=[],l=[];return this.tracker.auto("pageChanged",a,function(){e=e||t,u.writer.context().beginColumnGroup();for(var i=0,o=t.length;o>i;i++){var a=t[i],c=e[i]._calcWidth,f=s(i);if(a.colSpan&&a.colSpan>1)for(var d=1;d<a.colSpan;d++)c+=e[++i]._calcWidth+n[i];u.writer.context().beginColumn(c,f,h(a,i)),a._span?a._columnEndingContext&&u.writer.context().markEnding(a):(u.processNode(a),r(l,a.positions))}u.writer.context().completeColumnGroup()}),{pageBreaks:c,positions:l}},i.prototype.processList=function(t,e){function n(t){if(s){var e=s;if(s=null,e.canvas){var n=e.canvas[0];g(n,-e._minWidth,0),i.writer.addVector(n)}else{var r=new d(i.pageSize.width);r.addInline(e._inlines[0]),r.x=-e._minWidth,r.y=t.getAscenderHeight()-r.getAscenderHeight(),i.writer.addLine(r,!0)}}}var i=this,o=t?e.ol:e.ul,a=e._gapSize;this.writer.context().addMargin(a.width);var s;this.tracker.auto("lineAdded",n,function(){o.forEach(function(t){s=t.listMarker,i.processNode(t),r(e.positions,t.positions)})}),this.writer.context().addMargin(-a.width)},i.prototype.processTable=function(t){var e=new f(t);e.beginTable(this.writer);for(var n=0,i=t.table.body.length;i>n;n++){e.beginRow(n,this.writer);var o=this.processRow(t.table.body[n],t.table.widths,t._offsets.offsets,t.table.body,n);r(t.positions,o.positions),e.endRow(n,this.writer,o.pageBreaks)}e.endTable(this.writer)},i.prototype.processLeaf=function(t){for(var e=this.buildNextLine(t),n=e?e.getHeight():0,r=t.maxHeight||-1;e&&(-1===r||r>n);){var i=this.writer.addLine(e);t.positions.push(i),e=this.buildNextLine(t),e&&(n+=e.getHeight())}},i.prototype.buildNextLine=function(t){if(!t._inlines||0===t._inlines.length)return null;for(var e=new d(this.writer.context().availableWidth);t._inlines&&t._inlines.length>0&&e.hasEnoughSpaceForInline(t._inlines[0]);)e.addInline(t._inlines.shift());return e.lastLineInParagraph=0===t._inlines.length,e},i.prototype.processImage=function(t){var e=this.writer.addImage(t);t.positions.push(e)},i.prototype.processCanvas=function(t){var e=t._minHeight;this.writer.context().availableHeight<e&&this.writer.moveToNextPage(),t.canvas.forEach(function(e){var n=this.writer.addVector(e);t.positions.push(n)},this),this.writer.context().moveDown(e)},i.prototype.processQr=function(t){var e=this.writer.addQr(t);t.positions.push(e)},t.exports=i},function(t,e){"use strict";function n(){this.events={}}n.prototype.startTracking=function(t,e){var n=this.events[t]||(this.events[t]=[]);n.indexOf(e)<0&&n.push(e)},n.prototype.stopTracking=function(t,e){var n=this.events[t];if(n){var r=n.indexOf(e);r>=0&&n.splice(r,1)}},n.prototype.emit=function(t){var e=Array.prototype.slice.call(arguments,1),n=this.events[t];n&&n.forEach(function(t){t.apply(this,e)})},n.prototype.auto=function(t,e,n){this.startTracking(t,e),n(),this.stopTracking(t,e)},t.exports=n},function(t,e,n){"use strict";function r(t,e,n,r,a,s){this.textTools=new i(t),this.styleStack=new o(e,n),this.imageMeasure=r,this.tableLayouts=a,this.images=s,this.autoImageIndex=1}var i=n(14),o=n(15),a=n(16),s=n(17).fontStringify,h=n(17).pack,u=n(18);r.prototype.measureDocument=function(t){return this.measureNode(t)},r.prototype.measureNode=function(t){function e(t){var e=t._margin;return e&&(t._minWidth+=e[0]+e[2],t._maxWidth+=e[0]+e[2]),t}function n(){function e(t,e){return t.marginLeft||t.marginTop||t.marginRight||t.marginBottom?[t.marginLeft||e[0]||0,t.marginTop||e[1]||0,t.marginRight||e[2]||0,t.marginBottom||e[3]||0]:e}function n(t){for(var e={},n=t.length-1;n>=0;n--){var i=t[n],o=r.styleStack.styleDictionary[i];for(var a in o)o.hasOwnProperty(a)&&(e[a]=o[a])}return e}function i(t){return"number"==typeof t||t instanceof Number?t=[t,t,t,t]:t instanceof Array&&2===t.length&&(t=[t[0],t[1],t[0],t[1]]),t}var o=[void 0,void 0,void 0,void 0];if(t.style){var a=t.style instanceof Array?t.style:[t.style],s=n(a);s&&(o=e(s,o)),s.margin&&(o=i(s.margin))}return o=e(t,o),t.margin&&(o=i(t.margin)),void 0===o[0]&&void 0===o[1]&&void 0===o[2]&&void 0===o[3]?null:o}t instanceof Array?t={stack:t}:("string"==typeof t||t instanceof String)&&(t={text:t}),0===Object.keys(t).length&&(t={text:""});var r=this;return this.styleStack.auto(t,function(){if(t._margin=n(t),t.columns)return e(r.measureColumns(t));if(t.stack)return e(r.measureVerticalContainer(t));if(t.ul)return e(r.measureList(!1,t));if(t.ol)return e(r.measureList(!0,t));if(t.table)return e(r.measureTable(t));if(void 0!==t.text)return e(r.measureLeaf(t));if(t.image)return e(r.measureImage(t));if(t.canvas)return e(r.measureCanvas(t));if(t.qr)return e(r.measureQr(t));throw"Unrecognized document structure: "+JSON.stringify(t,s)})},r.prototype.convertIfBase64Image=function(t){if(/^data:image\/(jpeg|jpg|png);base64,/.test(t.image)){var e="$$pdfmake$$"+this.autoImageIndex++;this.images[e]=t.image,t.image=e}},r.prototype.measureImage=function(t){this.images&&this.convertIfBase64Image(t);var e=this.imageMeasure.measureImage(t.image);if(t.fit){var n=e.width/e.height>t.fit[0]/t.fit[1]?t.fit[0]/e.width:t.fit[1]/e.height;t._width=t._minWidth=t._maxWidth=e.width*n,t._height=e.height*n}else t._width=t._minWidth=t._maxWidth=t.width||e.width,t._height=t.height||e.height*t._width/e.width;return t._alignment=this.styleStack.getProperty("alignment"),t},r.prototype.measureLeaf=function(t){var e=this.styleStack.clone();e.push(t);var n=this.textTools.buildInlines(t.text,e);return t._inlines=n.items,t._minWidth=n.minWidth,t._maxWidth=n.maxWidth,t},r.prototype.measureVerticalContainer=function(t){var e=t.stack;t._minWidth=0,t._maxWidth=0;for(var n=0,r=e.length;r>n;n++)e[n]=this.measureNode(e[n]),t._minWidth=Math.max(t._minWidth,e[n]._minWidth),t._maxWidth=Math.max(t._maxWidth,e[n]._maxWidth);return t},r.prototype.gapSizeForList=function(t,e){if(t){var n=e.length.toString().replace(/./g,"9");return this.textTools.sizeOfString(n+". ",this.styleStack)}return this.textTools.sizeOfString("9. ",this.styleStack)},r.prototype.buildMarker=function(t,e,n,r){var i;if(t)i={_inlines:this.textTools.buildInlines(e,n).items};else{var o=r.fontSize/6;i={canvas:[{x:o,y:r.height/r.lineHeight+r.decender-r.fontSize/3,r1:o,r2:o,type:"ellipse",color:"black"}]}}return i._minWidth=i._maxWidth=r.width,i._minHeight=i._maxHeight=r.height,i},r.prototype.measureList=function(t,e){var n=this.styleStack.clone(),r=t?e.ol:e.ul;e._gapSize=this.gapSizeForList(t,r),e._minWidth=0,e._maxWidth=0;for(var i=1,o=0,a=r.length;a>o;o++){var s=r[o]=this.measureNode(r[o]),h=i++ +". ";s.ol||s.ul||(s.listMarker=this.buildMarker(t,s.counter||h,n,e._gapSize)),e._minWidth=Math.max(e._minWidth,r[o]._minWidth+e._gapSize.width),e._maxWidth=Math.max(e._maxWidth,r[o]._maxWidth+e._gapSize.width)}return e},r.prototype.measureColumns=function(t){var e=t.columns;t._gap=this.styleStack.getProperty("columnGap")||0;for(var n=0,r=e.length;r>n;n++)e[n]=this.measureNode(e[n]);var i=a.measureMinMax(e);return t._minWidth=i.min+t._gap*(e.length-1),t._maxWidth=i.max+t._gap*(e.length-1),t},r.prototype.measureTable=function(t){function e(t,e){return function(){return null!==e&&"object"==typeof e&&(e.fillColor=t.styleStack.getProperty("fillColor")),t.measureNode(e)}}function n(e){var n=t.layout;("string"==typeof t.layout||t instanceof String)&&(n=e[n]);var r={hLineWidth:function(t,e){return 1},vLineWidth:function(t,e){return 1},hLineColor:function(t,e){return"black"},vLineColor:function(t,e){return"black"},paddingLeft:function(t,e){return 4},paddingRight:function(t,e){return 4},paddingTop:function(t,e){return 2},paddingBottom:function(t,e){return 2}};return h(r,n)}function r(e){for(var n=[],r=0,i=0,o=0,a=t.table.widths.length;a>o;o++){var s=i+e.vLineWidth(o,t)+e.paddingLeft(o,t);n.push(s),r+=s,i=e.paddingRight(o,t)}return r+=i+e.vLineWidth(t.table.widths.length,t),{total:r,offsets:n}}function i(){for(var e,n,r=0,i=g.length;i>r;r++){var a=g[r],s=o(a.col,a.span,t._offsets),h=a.minWidth-s.minWidth,u=a.maxWidth-s.maxWidth;if(h>0)for(e=h/a.span,n=0;n<a.span;n++)t.table.widths[a.col+n]._minWidth+=e;if(u>0)for(e=u/a.span,n=0;n<a.span;n++)t.table.widths[a.col+n]._maxWidth+=e}}function o(e,n,r){for(var i={minWidth:0,maxWidth:0},o=0;n>o;o++)i.minWidth+=t.table.widths[e+o]._minWidth+(o?r.offsets[e+o]:0),i.maxWidth+=t.table.widths[e+o]._maxWidth+(o?r.offsets[e+o]:0);return i}function s(t,e,n){for(var r=1;n>r;r++)t[e+r]={_span:!0,_minWidth:0,_maxWidth:0,rowSpan:t[e].rowSpan}}function u(t,e,n,r){for(var i=1;r>i;i++)t.body[e+i][n]={_span:!0,_minWidth:0,_maxWidth:0,fillColor:t.body[e][n].fillColor}}function c(t){if(t.table.widths||(t.table.widths="auto"),"string"==typeof t.table.widths||t.table.widths instanceof String)for(t.table.widths=[t.table.widths];t.table.widths.length<t.table.body[0].length;)t.table.widths.push(t.table.widths[t.table.widths.length-1]);for(var e=0,n=t.table.widths.length;n>e;e++){var r=t.table.widths[e];("number"==typeof r||r instanceof Number||"string"==typeof r||r instanceof String)&&(t.table.widths[e]={width:r})}}c(t),t._layout=n(this.tableLayouts),t._offsets=r(t._layout);var l,f,d,p,g=[];for(l=0,d=t.table.body[0].length;d>l;l++){var v=t.table.widths[l];for(v._minWidth=0,v._maxWidth=0,f=0,p=t.table.body.length;p>f;f++){var m=t.table.body[f],y=m[l];if(!y._span){y=m[l]=this.styleStack.auto(y,e(this,y)),y.colSpan&&y.colSpan>1?(s(m,l,y.colSpan),g.push({col:l,span:y.colSpan,minWidth:y._minWidth,maxWidth:y._maxWidth})):(v._minWidth=Math.max(v._minWidth,y._minWidth),v._maxWidth=Math.max(v._maxWidth,y._maxWidth))}y.rowSpan&&y.rowSpan>1&&u(t.table,f,l,y.rowSpan)}}i();var _=a.measureMinMax(t.table.widths);return t._minWidth=_.min+t._offsets.total,t._maxWidth=_.max+t._offsets.total,t},r.prototype.measureCanvas=function(t){for(var e=0,n=0,r=0,i=t.canvas.length;i>r;r++){var o=t.canvas[r];switch(o.type){case"ellipse":e=Math.max(e,o.x+o.r1),n=Math.max(n,o.y+o.r2);break;case"rect":e=Math.max(e,o.x+o.w),n=Math.max(n,o.y+o.h);break;case"line":e=Math.max(e,o.x1,o.x2),n=Math.max(n,o.y1,o.y2);break;case"polyline":for(var a=0,s=o.points.length;s>a;a++)e=Math.max(e,o.points[a].x),n=Math.max(n,o.points[a].y)}}return t._minWidth=t._maxWidth=e,t._minHeight=t._maxHeight=n,t},r.prototype.measureQr=function(t){return t=u.measure(t),t._alignment=this.styleStack.getProperty("alignment"),t},t.exports=r},function(t,e){"use strict";function n(t){this.fontProvider=t}function r(t,e){var n=[];t=t.replace("	","    ");var r;r=e?[t,""]:t.match(u);for(var i=0,o=r.length;o-1>i;i++){var a=r[i],s=0===a.length;if(s){var h=0===n.length||n[n.length-1].lineEnd;h?n.push({text:"",lineEnd:!0}):n[n.length-1].lineEnd=!0}else n.push({text:a})}return n}function i(t,e){e=e||{},t=t||{};for(var n in t)"text"!=n&&t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function o(t){var e=[];("string"==typeof t||t instanceof String)&&(t=[t]);for(var n=0,o=t.length;o>n;n++){var a,s=t[n],h=null;"string"==typeof s||s instanceof String?a=r(s):(a=r(s.text,s.noWrap),h=i(s));for(var u=0,c=a.length;c>u;u++){var l={text:a[u].text};a[u].lineEnd&&(l.lineEnd=!0),i(h,l),e.push(l)}}return e}function a(t){return t.replace(/[^A-Za-z0-9\[\] ]/g,function(t){return f[t]||t})}function s(t,e,n,r){var i;return void 0!==t[n]&&null!==t[n]?t[n]:e?(e.auto(t,function(){i=e.getProperty(n)}),null!==i&&void 0!==i?i:r):r}function h(t,e,n){var r=o(e);return r.forEach(function(e){var r=s(e,n,"font","Roboto"),i=s(e,n,"fontSize",12),o=s(e,n,"bold",!1),h=s(e,n,"italics",!1),u=s(e,n,"color","black"),f=s(e,n,"decoration",null),d=s(e,n,"decorationColor",null),p=s(e,n,"decorationStyle",null),g=s(e,n,"background",null),v=s(e,n,"lineHeight",1),m=t.provideFont(r,o,h);e.width=m.widthOfString(a(e.text),i),e.height=m.lineHeight(i)*v;var y=e.text.match(c),_=e.text.match(l);y?e.leadingCut=m.widthOfString(y[0],i):e.leadingCut=0,_?e.trailingCut=m.widthOfString(_[0],i):e.trailingCut=0,e.alignment=s(e,n,"alignment","left"),e.font=m,e.fontSize=i,e.color=u,e.decoration=f,e.decorationColor=d,e.decorationStyle=p,e.background=g}),r}var u=/([^ ,\/!.?:;\-\n]*[ ,\/!.?:;\-]*)|\n/g,c=/^(\s)+/g,l=/(\s)+$/g;n.prototype.buildInlines=function(t,e){function n(t){return Math.max(0,t.width-t.leadingCut-t.trailingCut)}var r,i=h(this.fontProvider,t,e),o=0,a=0;return i.forEach(function(t){o=Math.max(o,t.width-t.leadingCut-t.trailingCut),r||(r={width:0,leadingCut:t.leadingCut,trailingCut:0}),r.width+=t.width,r.trailingCut=t.trailingCut,a=Math.max(a,n(r)),t.lineEnd&&(r=null)}),s({},e,"noWrap",!1)&&(o=a),{items:i,minWidth:o,maxWidth:a}},n.prototype.sizeOfString=function(t,e){t=t.replace("	","    ");var n=s({},e,"font","Roboto"),r=s({},e,"fontSize",12),i=s({},e,"bold",!1),o=s({},e,"italics",!1),h=s({},e,"lineHeight",1),u=this.fontProvider.provideFont(n,i,o);return{width:u.widthOfString(a(t),r),height:u.lineHeight(r)*h,fontSize:r,lineHeight:h,ascender:u.ascender/1e3*r,decender:u.decender/1e3*r}};var f={"Ą":"A","Ć":"C","Ę":"E","Ł":"L","Ń":"N","Ó":"O","Ś":"S","Ź":"Z","Ż":"Z","ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ó":"o","ś":"s","ź":"z","ż":"z"};t.exports=n},function(t,e){"use strict";function n(t,e){this.defaultStyle=e||{},this.styleDictionary=t,this.styleOverrides=[]}n.prototype.clone=function(){var t=new n(this.styleDictionary,this.defaultStyle);return this.styleOverrides.forEach(function(e){t.styleOverrides.push(e)}),t},n.prototype.push=function(t){this.styleOverrides.push(t)},n.prototype.pop=function(t){for(t=t||1;t-->0;)this.styleOverrides.pop()},n.prototype.autopush=function(t){if("string"==typeof t||t instanceof String)return 0;var e=[];t.style&&(e=t.style instanceof Array?t.style:[t.style]);for(var n=0,r=e.length;r>n;n++)this.push(e[n]);var i={},o=!1;return["font","fontSize","bold","italics","alignment","color","columnGap","fillColor","decoration","decorationStyle","decorationColor","background","lineHeight","noWrap"].forEach(function(e){void 0!==t[e]&&null!==t[e]&&(i[e]=t[e],o=!0)}),o&&this.push(i),e.length+(o?1:0)},n.prototype.auto=function(t,e){var n=this.autopush(t),r=e();return n>0&&this.pop(n),r},n.prototype.getProperty=function(t){if(this.styleOverrides)for(var e=this.styleOverrides.length-1;e>=0;e--){var n=this.styleOverrides[e];if("string"==typeof n||n instanceof String){var r=this.styleDictionary[n];if(r&&null!==r[t]&&void 0!==r[t])return r[t]}else if(void 0!==n[t]&&null!==n[t])return n[t]}return this.defaultStyle&&this.defaultStyle[t]},t.exports=n},function(t,e){"use strict";function n(t,e){var n=[],o=0,a=0,s=[],h=0,u=0,c=[],l=e;t.forEach(function(t){r(t)?(n.push(t),o+=t._minWidth,a+=t._maxWidth):i(t)?(s.push(t),h=Math.max(h,t._minWidth),u=Math.max(u,t._maxWidth)):c.push(t)}),c.forEach(function(t){"string"==typeof t.width&&/\d+%/.test(t.width)&&(t.width=parseFloat(t.width)*l/100),t.width<t._minWidth&&t.elasticWidth?t._calcWidth=t._minWidth:t._calcWidth=t.width,e-=t._calcWidth});var f=o+h*s.length,d=a+u*s.length;if(f>=e)n.forEach(function(t){t._calcWidth=t._minWidth}),s.forEach(function(t){t._calcWidth=h});else{if(e>d)n.forEach(function(t){t._calcWidth=t._maxWidth,e-=t._calcWidth});else{var p=e-f,g=d-f;n.forEach(function(t){var n=t._maxWidth-t._minWidth;t._calcWidth=t._minWidth+n*p/g,e-=t._calcWidth})}if(s.length>0){var v=e/s.length;s.forEach(function(t){t._calcWidth=v})}}}function r(t){return"auto"===t.width}function i(t){return null===t.width||void 0===t.width||"*"===t.width||"star"===t.width}function o(t){for(var e={min:0,max:0},n={min:0,max:0},o=0,a=0,s=t.length;s>a;a++){var h=t[a];i(h)?(n.min=Math.max(n.min,h._minWidth),n.max=Math.max(n.max,h._maxWidth),o++):r(h)?(e.min+=h._minWidth,e.max+=h._maxWidth):(e.min+=void 0!==h.width&&h.width||h._minWidth,e.max+=void 0!==h.width&&h.width||h._maxWidth)}return o&&(e.min+=o*n.min,e.max+=o*n.max),e}t.exports={buildColumnWidths:n,measureMinMax:o,isAutoColumn:r,isStarColumn:i}},function(t,e){"use strict";function n(){for(var t={},e=0,n=arguments.length;n>e;e++){var r=arguments[e];if(r)for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}return t}function r(t,e,n){switch(t.type){case"ellipse":case"rect":t.x+=e,t.y+=n;break;case"line":t.x1+=e,t.x2+=e,t.y1+=n,t.y2+=n;break;case"polyline":for(var r=0,i=t.points.length;i>r;r++)t.points[r].x+=e,t.points[r].y+=n}}function i(t,e){return"font"===t?"font":e}function o(t){var e={};return t&&"[object Function]"===e.toString.call(t)}t.exports={pack:n,fontStringify:i,offsetVector:r,isFunction:o}},function(t,e){"use strict";function n(t,e){var n={numeric:s,alphanumeric:h,octet:u},r={L:p,M:g,Q:v,H:m};e=e||{};var i=e.version||-1,o=r[(e.eccLevel||"L").toUpperCase()],a=e.mode?n[e.mode.toLowerCase()]:-1,c="mask"in e?e.mask:-1;if(0>a)a="string"==typeof t?t.match(l)?s:t.match(d)?h:u:u;else if(a!=s&&a!=h&&a!=u)throw"invalid or unsupported mode";if(t=U(a,t),null===t)throw"invalid data format";if(0>o||o>3)throw"invalid ECC level";if(0>i){for(i=1;40>=i&&!(t.length<=D(i,a,o));++i);if(i>40)throw"too large data for the Qr format"}else if(1>i||i>40)throw"invalid Qr version! should be between 1 and 40";if(-1!=c&&(0>c||c>8))throw"invalid mask";return Y(t,i,a,o,c)}function r(t,e){var r=[],i=t.background||"#fff",o=t.foreground||"#000",a=n(t,e),s=a.length,h=Math.floor(e.fit?e.fit/s:5),u=s*h;r.push({type:"rect",x:0,y:0,w:u,h:u,lineWidth:0,color:i});for(var c=0;s>c;++c)for(var l=0;s>l;++l)a[c][l]&&r.push({type:"rect",x:h*c,y:h*l,w:h,h:h,lineWidth:0,color:o});return{canvas:r,size:u}}function i(t){var e=r(t.qr,t);return t._canvas=e.canvas,t._width=t._height=t._minWidth=t._maxWidth=t._minHeight=t._maxHeight=e.size,t}for(var o=[null,[[10,7,17,13],[1,1,1,1],[]],[[16,10,28,22],[1,1,1,1],[4,16]],[[26,15,22,18],[1,1,2,2],[4,20]],[[18,20,16,26],[2,1,4,2],[4,24]],[[24,26,22,18],[2,1,4,4],[4,28]],[[16,18,28,24],[4,2,4,4],[4,32]],[[18,20,26,18],[4,2,5,6],[4,20,36]],[[22,24,26,22],[4,2,6,6],[4,22,40]],[[22,30,24,20],[5,2,8,8],[4,24,44]],[[26,18,28,24],[5,4,8,8],[4,26,48]],[[30,20,24,28],[5,4,11,8],[4,28,52]],[[22,24,28,26],[8,4,11,10],[4,30,56]],[[22,26,22,24],[9,4,16,12],[4,32,60]],[[24,30,24,20],[9,4,16,16],[4,24,44,64]],[[24,22,24,30],[10,6,18,12],[4,24,46,68]],[[28,24,30,24],[10,6,16,17],[4,24,48,72]],[[28,28,28,28],[11,6,19,16],[4,28,52,76]],[[26,30,28,28],[13,6,21,18],[4,28,54,80]],[[26,28,26,26],[14,7,25,21],[4,28,56,84]],[[26,28,28,30],[16,8,25,20],[4,32,60,88]],[[26,28,30,28],[17,8,25,23],[4,26,48,70,92]],[[28,28,24,30],[17,9,34,23],[4,24,48,72,96]],[[28,30,30,30],[18,9,30,25],[4,28,52,76,100]],[[28,30,30,30],[20,10,32,27],[4,26,52,78,104]],[[28,26,30,30],[21,12,35,29],[4,30,56,82,108]],[[28,28,30,28],[23,12,37,34],[4,28,56,84,112]],[[28,30,30,30],[25,12,40,34],[4,32,60,88,116]],[[28,30,30,30],[26,13,42,35],[4,24,48,72,96,120]],[[28,30,30,30],[28,14,45,38],[4,28,52,76,100,124]],[[28,30,30,30],[29,15,48,40],[4,24,50,76,102,128]],[[28,30,30,30],[31,16,51,43],[4,28,54,80,106,132]],[[28,30,30,30],[33,17,54,45],[4,32,58,84,110,136]],[[28,30,30,30],[35,18,57,48],[4,28,56,84,112,140]],[[28,30,30,30],[37,19,60,51],[4,32,60,88,116,144]],[[28,30,30,30],[38,19,63,53],[4,28,52,76,100,124,148]],[[28,30,30,30],[40,20,66,56],[4,22,48,74,100,126,152]],[[28,30,30,30],[43,21,70,59],[4,26,52,78,104,130,156]],[[28,30,30,30],[45,22,74,62],[4,30,56,82,108,134,160]],[[28,30,30,30],[47,24,77,65],[4,24,52,80,108,136,164]],[[28,30,30,30],[49,25,81,68],[4,28,56,84,112,140,168]]],a=0,s=1,h=2,u=4,c=8,l=/^\d*$/,f=/^[A-Za-z0-9 $%*+\-./:]*$/,d=/^[A-Z0-9 $%*+\-./:]*$/,p=1,g=0,v=3,m=2,y=[],_=[-1],w=0,b=1;255>w;++w)y.push(b),
_[b]=w,b=2*b^(b>=128?285:0);for(var x=[[]],w=0;30>w;++w){for(var S=x[w],k=[],E=0;w>=E;++E){var C=w>E?y[S[E]]:0,I=y[(w+(S[E-1]||0))%255];k.push(_[C^I])}x.push(k)}for(var A={},w=0;45>w;++w)A["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".charAt(w)]=w;var L=[function(t,e){return(t+e)%2===0},function(t,e){return t%2===0},function(t,e){return e%3===0},function(t,e){return(t+e)%3===0},function(t,e){return((t/2|0)+(e/3|0))%2===0},function(t,e){return t*e%2+t*e%3===0},function(t,e){return(t*e%2+t*e%3)%2===0},function(t,e){return((t+e)%2+t*e%3)%2===0}],R=function(t){return t>6},T=function(t){return 4*t+17},B=function(t){var e=o[t],n=16*t*t+128*t+64;return R(t)&&(n-=36),e[2].length&&(n-=25*e[2].length*e[2].length-10*e[2].length-55),n},O=function(t,e){var n=-8&B(t),r=o[t];return n-=8*r[0][e]*r[1][e]},M=function(t,e){switch(e){case s:return 10>t?10:27>t?12:14;case h:return 10>t?9:27>t?11:13;case u:return 10>t?8:16;case c:return 10>t?8:27>t?10:12}},D=function(t,e,n){var r=O(t,n)-4-M(t,e);switch(e){case s:return 3*(r/10|0)+(4>r%10?0:7>r%10?1:2);case h:return 2*(r/11|0)+(6>r%11?0:1);case u:return r/8|0;case c:return r/13|0}},U=function(t,e){switch(t){case s:return e.match(l)?e:null;case h:return e.match(f)?e.toUpperCase():null;case u:if("string"==typeof e){for(var n=[],r=0;r<e.length;++r){var i=e.charCodeAt(r);128>i?n.push(i):2048>i?n.push(192|i>>6,128|63&i):65536>i?n.push(224|i>>12,128|i>>6&63,128|63&i):n.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|63&i)}return n}return e}},P=function(t,e,n,r){var i=[],o=0,c=8,l=n.length,f=function(t,e){if(e>=c){for(i.push(o|t>>(e-=c));e>=8;)i.push(t>>(e-=8)&255);o=0,c=8}e>0&&(o|=(t&(1<<e)-1)<<(c-=e))},d=M(t,e);switch(f(e,4),f(l,d),e){case s:for(var p=2;l>p;p+=3)f(parseInt(n.substring(p-2,p+1),10),10);f(parseInt(n.substring(p-2),10),[0,4,7][l%3]);break;case h:for(var p=1;l>p;p+=2)f(45*A[n.charAt(p-1)]+A[n.charAt(p)],11);l%2==1&&f(A[n.charAt(p-1)],6);break;case u:for(var p=0;l>p;++p)f(n[p],8)}for(f(a,4),8>c&&i.push(o);i.length+1<r;)i.push(236,17);return i.length<r&&i.push(236),i},z=function(t,e){for(var n=t.slice(0),r=t.length,i=e.length,o=0;i>o;++o)n.push(0);for(var o=0;r>o;){var a=_[n[o++]];if(a>=0)for(var s=0;i>s;++s)n[o+s]^=y[(a+e[s])%255]}return n.slice(r)},F=function(t,e,n){for(var r=[],i=t.length/e|0,o=0,a=e-t.length%e,s=0;a>s;++s)r.push(o),o+=i;for(var s=a;e>s;++s)r.push(o),o+=i+1;r.push(o);for(var h=[],s=0;e>s;++s)h.push(z(t.slice(r[s],r[s+1]),n));for(var u=[],c=t.length/e|0,s=0;c>s;++s)for(var l=0;e>l;++l)u.push(t[r[l]+s]);for(var l=a;e>l;++l)u.push(t[r[l+1]-1]);for(var s=0;s<n.length;++s)for(var l=0;e>l;++l)u.push(h[l][s]);return u},W=function(t,e,n,r){for(var i=t<<r,o=e-1;o>=0;--o)i>>r+o&1&&(i^=n<<o);return t<<r|i},N=function(t){for(var e=o[t],n=T(t),r=[],i=[],a=0;n>a;++a)r.push([]),i.push([]);var s=function(t,e,n,o,a){for(var s=0;n>s;++s)for(var h=0;o>h;++h)r[t+s][e+h]=a[s]>>h&1,i[t+s][e+h]=1};s(0,0,9,9,[127,65,93,93,93,65,383,0,64]),s(n-8,0,8,9,[256,127,65,93,93,93,65,127]),s(0,n-8,9,8,[254,130,186,186,186,130,254,0,0]);for(var a=9;n-8>a;++a)r[6][a]=r[a][6]=1&~a,i[6][a]=i[a][6]=1;for(var h=e[2],u=h.length,a=0;u>a;++a)for(var c=0===a||a===u-1?1:0,l=0===a?u-1:u,f=c;l>f;++f)s(h[a],h[f],5,5,[31,17,21,17,31]);if(R(t))for(var d=W(t,6,7973,12),p=0,a=0;6>a;++a)for(var f=0;3>f;++f)r[a][n-11+f]=r[n-11+f][a]=d>>p++&1,i[a][n-11+f]=i[n-11+f][a]=1;return{matrix:r,reserved:i}},j=function(t,e,n){for(var r=t.length,i=0,o=-1,a=r-1;a>=0;a-=2){6==a&&--a;for(var s=0>o?r-1:0,h=0;r>h;++h){for(var u=a;u>a-2;--u)e[s][u]||(t[s][u]=n[i>>3]>>(7&~i)&1,++i);s+=o}o=-o}return t},H=function(t,e,n){for(var r=L[n],i=t.length,o=0;i>o;++o)for(var a=0;i>a;++a)e[o][a]||(t[o][a]^=r(o,a));return t},Z=function(t,e,n,r){for(var i=t.length,o=21522^W(n<<3|r,5,1335,10),a=0;15>a;++a){var s=[0,1,2,3,4,5,7,8,i-7,i-6,i-5,i-4,i-3,i-2,i-1][a],h=[i-1,i-2,i-3,i-4,i-5,i-6,i-7,i-8,7,5,4,3,2,1,0][a];t[s][8]=t[8][h]=o>>a&1}return t},G=function(t){for(var e=3,n=3,r=40,i=10,o=function(t){for(var n=0,i=0;i<t.length;++i)t[i]>=5&&(n+=e+(t[i]-5));for(var i=5;i<t.length;i+=2){var o=t[i];t[i-1]==o&&t[i-2]==3*o&&t[i-3]==o&&t[i-4]==o&&(t[i-5]>=4*o||t[i+1]>=4*o)&&(n+=r)}return n},a=t.length,s=0,h=0,u=0;a>u;++u){var c,l=t[u];c=[0];for(var f=0;a>f;){var d;for(d=0;a>f&&l[f];++d)++f;for(c.push(d),d=0;a>f&&!l[f];++d)++f;c.push(d)}s+=o(c),c=[0];for(var f=0;a>f;){var d;for(d=0;a>f&&t[f][u];++d)++f;for(c.push(d),d=0;a>f&&!t[f][u];++d)++f;c.push(d)}s+=o(c);var p=t[u+1]||[];h+=l[0];for(var f=1;a>f;++f){var g=l[f];h+=g,l[f-1]==g&&p[f]===g&&p[f-1]===g&&(s+=n)}}return s+=i*(Math.abs(h/a/a-.5)/.05|0)},Y=function(t,e,n,r,i){var a=o[e],s=P(e,n,t,O(e,r)>>3);s=F(s,a[1][r],x[a[0][r]]);var h=N(e),u=h.matrix,c=h.reserved;if(j(u,c,s),0>i){H(u,c,0),Z(u,c,r,0);var l=0,f=G(u);for(H(u,c,0),i=1;8>i;++i){H(u,c,i),Z(u,c,r,i);var d=G(u);f>d&&(f=d,l=i),H(u,c,i)}i=l}return H(u,c,i),Z(u,c,r,i),u};t.exports={measure:i}},function(t,e,n){"use strict";function r(t,e){this.pages=[],this.pageMargins=e,this.x=e.left,this.availableWidth=t.width-e.left-e.right,this.availableHeight=0,this.page=-1,this.snapshots=[],this.endingCell=null,this.tracker=new a,this.addPage(t)}function i(t,e){return void 0===t?e:"landscape"===t?"landscape":"portrait"}function o(t,e){var n;return n=t.page>e.page?t:e.page>t.page?e:t.y>e.y?t:e,{page:n.page,x:n.x,y:n.y,availableHeight:n.availableHeight,availableWidth:n.availableWidth}}var a=n(12);r.prototype.beginColumnGroup=function(){this.snapshots.push({x:this.x,y:this.y,availableHeight:this.availableHeight,availableWidth:this.availableWidth,page:this.page,bottomMost:{y:this.y,page:this.page},endingCell:this.endingCell,lastColumnWidth:this.lastColumnWidth}),this.lastColumnWidth=0},r.prototype.beginColumn=function(t,e,n){var r=this.snapshots[this.snapshots.length-1];this.calculateBottomMost(r),this.endingCell=n,this.page=r.page,this.x=this.x+this.lastColumnWidth+(e||0),this.y=r.y,this.availableWidth=t,this.availableHeight=r.availableHeight,this.lastColumnWidth=t},r.prototype.calculateBottomMost=function(t){this.endingCell?(this.saveContextInEndingCell(this.endingCell),this.endingCell=null):t.bottomMost=o(this,t.bottomMost)},r.prototype.markEnding=function(t){this.page=t._columnEndingContext.page,this.x=t._columnEndingContext.x,this.y=t._columnEndingContext.y,this.availableWidth=t._columnEndingContext.availableWidth,this.availableHeight=t._columnEndingContext.availableHeight,this.lastColumnWidth=t._columnEndingContext.lastColumnWidth},r.prototype.saveContextInEndingCell=function(t){t._columnEndingContext={page:this.page,x:this.x,y:this.y,availableHeight:this.availableHeight,availableWidth:this.availableWidth,lastColumnWidth:this.lastColumnWidth}},r.prototype.completeColumnGroup=function(){var t=this.snapshots.pop();this.calculateBottomMost(t),this.endingCell=null,this.x=t.x,this.y=t.bottomMost.y,this.page=t.bottomMost.page,this.availableWidth=t.availableWidth,this.availableHeight=t.bottomMost.availableHeight,this.lastColumnWidth=t.lastColumnWidth},r.prototype.addMargin=function(t,e){this.x+=t,this.availableWidth-=t+(e||0)},r.prototype.moveDown=function(t){return this.y+=t,this.availableHeight-=t,this.availableHeight>0},r.prototype.initializePage=function(){this.y=this.pageMargins.top,this.availableHeight=this.getCurrentPage().pageSize.height-this.pageMargins.top-this.pageMargins.bottom,this.pageSnapshot().availableWidth=this.getCurrentPage().pageSize.width-this.pageMargins.left-this.pageMargins.right},r.prototype.pageSnapshot=function(){return this.snapshots[0]?this.snapshots[0]:this},r.prototype.moveTo=function(t,e){void 0!==t&&null!==t&&(this.x=t,this.availableWidth=this.getCurrentPage().pageSize.width-this.x-this.pageMargins.right),void 0!==e&&null!==e&&(this.y=e,this.availableHeight=this.getCurrentPage().pageSize.height-this.y-this.pageMargins.bottom)},r.prototype.beginDetachedBlock=function(){this.snapshots.push({x:this.x,y:this.y,availableHeight:this.availableHeight,availableWidth:this.availableWidth,page:this.page,endingCell:this.endingCell,lastColumnWidth:this.lastColumnWidth})},r.prototype.endDetachedBlock=function(){var t=this.snapshots.pop();this.x=t.x,this.y=t.y,this.availableWidth=t.availableWidth,this.availableHeight=t.availableHeight,this.page=t.page,this.endingCell=t.endingCell,this.lastColumnWidth=t.lastColumnWidth};var s=function(t,e){return e=i(e,t.pageSize.orientation),e!==t.pageSize.orientation?{orientation:e,width:t.pageSize.height,height:t.pageSize.width}:{orientation:t.pageSize.orientation,width:t.pageSize.width,height:t.pageSize.height}};r.prototype.moveToNextPage=function(t){var e=this.page+1,n=this.page,r=this.y,i=e>=this.pages.length;return i?this.addPage(s(this.getCurrentPage(),t)):(this.page=e,this.initializePage()),{newPageCreated:i,prevPage:n,prevY:r,y:this.y}},r.prototype.addPage=function(t){var e={items:[],pageSize:t};return this.pages.push(e),this.page=this.pages.length-1,this.initializePage(),this.tracker.emit("pageAdded"),e},r.prototype.getCurrentPage=function(){return this.page<0||this.page>=this.pages.length?null:this.pages[this.page]},r.prototype.getCurrentPosition=function(){var t=this.getCurrentPage().pageSize,e=t.height-this.pageMargins.top-this.pageMargins.bottom,n=t.width-this.pageMargins.left-this.pageMargins.right;return{pageNumber:this.page+1,pageOrientation:t.orientation,pageInnerHeight:e,pageInnerWidth:n,left:this.x,top:this.y,verticalRatio:(this.y-this.pageMargins.top)/e,horizontalRatio:(this.x-this.pageMargins.left)/n}},t.exports=r},function(t,e,n){"use strict";function r(t,e){this.transactionLevel=0,this.repeatables=[],this.tracker=e,this.writer=new o(t,e)}function i(t,e){var n=e(t);return n||(t.moveToNextPage(),n=e(t)),n}var o=n(21);r.prototype.addLine=function(t,e,n){return i(this,function(r){return r.writer.addLine(t,e,n)})},r.prototype.addImage=function(t,e){return i(this,function(n){return n.writer.addImage(t,e)})},r.prototype.addQr=function(t,e){return i(this,function(n){return n.writer.addQr(t,e)})},r.prototype.addVector=function(t,e,n,r){return this.writer.addVector(t,e,n,r)},r.prototype.addFragment=function(t,e,n,r){this.writer.addFragment(t,e,n,r)||(this.moveToNextPage(),this.writer.addFragment(t,e,n,r))},r.prototype.moveToNextPage=function(t){var e=this.writer.context.moveToNextPage(t);e.newPageCreated?this.repeatables.forEach(function(t){this.writer.addFragment(t,!0)},this):this.repeatables.forEach(function(t){this.writer.context.moveDown(t.height)},this),this.writer.tracker.emit("pageChanged",{prevPage:e.prevPage,prevY:e.prevY,y:e.y})},r.prototype.beginUnbreakableBlock=function(t,e){0===this.transactionLevel++&&(this.originalX=this.writer.context.x,this.writer.pushContext(t,e))},r.prototype.commitUnbreakableBlock=function(t,e){if(0===--this.transactionLevel){var n=this.writer.context;this.writer.popContext();var r=n.pages.length;if(r>0){var i=n.pages[0];if(i.xOffset=t,i.yOffset=e,r>1)if(void 0!==t||void 0!==e)i.height=n.getCurrentPage().pageSize.height-n.pageMargins.top-n.pageMargins.bottom;else{i.height=this.writer.context.getCurrentPage().pageSize.height-this.writer.context.pageMargins.top-this.writer.context.pageMargins.bottom;for(var o=0,a=this.repeatables.length;a>o;o++)i.height-=this.repeatables[o].height}else i.height=n.y;void 0!==t||void 0!==e?this.writer.addFragment(i,!0,!0,!0):this.addFragment(i)}}},r.prototype.currentBlockToRepeatable=function(){var t=this.writer.context,e={items:[]};return t.pages[0].items.forEach(function(t){e.items.push(t)}),e.xOffset=this.originalX,e.height=t.y,e},r.prototype.pushToRepeatables=function(t){this.repeatables.push(t)},r.prototype.popFromRepeatables=function(){this.repeatables.pop()},r.prototype.context=function(){return this.writer.context},t.exports=r},function(t,e,n){"use strict";function r(t,e){this.context=t,this.contextStack=[],this.tracker=e}function i(t,e,n){null===n||void 0===n||0>n||n>t.items.length?t.items.push(e):t.items.splice(n,0,e)}function o(t){var e=new a(t.maxWidth);for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var a=n(22),s=n(17).pack,h=n(17).offsetVector,u=n(19);r.prototype.addLine=function(t,e,n){var r=t.getHeight(),o=this.context,a=o.getCurrentPage(),s=this.getCurrentPositionOnPage();return o.availableHeight<r||!a?!1:(t.x=o.x+(t.x||0),t.y=o.y+(t.y||0),this.alignLine(t),i(a,{type:"line",item:t},n),this.tracker.emit("lineAdded",t),e||o.moveDown(r),s)},r.prototype.alignLine=function(t){var e=this.context.availableWidth,n=t.getWidth(),r=t.inlines&&t.inlines.length>0&&t.inlines[0].alignment,i=0;switch(r){case"right":i=e-n;break;case"center":i=(e-n)/2}if(i&&(t.x=(t.x||0)+i),"justify"===r&&!t.newLineForced&&!t.lastLineInParagraph&&t.inlines.length>1)for(var o=(e-n)/(t.inlines.length-1),a=1,s=t.inlines.length;s>a;a++)i=a*o,t.inlines[a].x+=i},r.prototype.addImage=function(t,e){var n=this.context,r=n.getCurrentPage(),o=this.getCurrentPositionOnPage();return n.availableHeight<t._height||!r?!1:(t.x=n.x+(t.x||0),t.y=n.y,this.alignImage(t),i(r,{type:"image",item:t},e),n.moveDown(t._height),o)},r.prototype.addQr=function(t,e){var n=this.context,r=n.getCurrentPage(),i=this.getCurrentPositionOnPage();if(n.availableHeight<t._height||!r)return!1;t.x=n.x+(t.x||0),t.y=n.y,this.alignImage(t);for(var o=0,a=t._canvas.length;a>o;o++){var s=t._canvas[o];s.x+=t.x,s.y+=t.y,this.addVector(s,!0,!0,e)}return n.moveDown(t._height),i},r.prototype.alignImage=function(t){var e=this.context.availableWidth,n=t._minWidth,r=0;switch(t._alignment){case"right":r=e-n;break;case"center":r=(e-n)/2}r&&(t.x=(t.x||0)+r)},r.prototype.addVector=function(t,e,n,r){var o=this.context,a=o.getCurrentPage(),s=this.getCurrentPositionOnPage();return a?(h(t,e?0:o.x,n?0:o.y),i(a,{type:"vector",item:t},r),s):void 0},r.prototype.addFragment=function(t,e,n,r){var i=this.context,a=i.getCurrentPage();return!e&&t.height>i.availableHeight?!1:(t.items.forEach(function(r){switch(r.type){case"line":var u=o(r.item);u.x=(u.x||0)+(e?t.xOffset||0:i.x),u.y=(u.y||0)+(n?t.yOffset||0:i.y),a.items.push({type:"line",item:u});break;case"vector":var c=s(r.item);h(c,e?t.xOffset||0:i.x,n?t.yOffset||0:i.y),a.items.push({type:"vector",item:c});break;case"image":var l=s(r.item);l.x=(l.x||0)+(e?t.xOffset||0:i.x),l.y=(l.y||0)+(n?t.yOffset||0:i.y),a.items.push({type:"image",item:l})}}),r||i.moveDown(t.height),!0)},r.prototype.pushContext=function(t,e){void 0===t&&(e=this.context.getCurrentPage().height-this.context.pageMargins.top-this.context.pageMargins.bottom,t=this.context.availableWidth),("number"==typeof t||t instanceof Number)&&(t=new u({width:t,height:e},{left:0,right:0,top:0,bottom:0})),this.contextStack.push(this.context),this.context=t},r.prototype.popContext=function(){this.context=this.contextStack.pop()},r.prototype.getCurrentPositionOnPage=function(){return(this.contextStack[0]||this.context).getCurrentPosition()},t.exports=r},function(t,e){"use strict";function n(t){this.maxWidth=t,this.leadingCut=0,this.trailingCut=0,this.inlineWidths=0,this.inlines=[]}n.prototype.getAscenderHeight=function(){var t=0;return this.inlines.forEach(function(e){t=Math.max(t,e.font.ascender/1e3*e.fontSize)}),t},n.prototype.hasEnoughSpaceForInline=function(t){return 0===this.inlines.length?!0:this.newLineForced?!1:this.inlineWidths+t.width-this.leadingCut-(t.trailingCut||0)<=this.maxWidth},n.prototype.addInline=function(t){0===this.inlines.length&&(this.leadingCut=t.leadingCut||0),this.trailingCut=t.trailingCut||0,t.x=this.inlineWidths-this.leadingCut,this.inlines.push(t),this.inlineWidths+=t.width,t.lineEnd&&(this.newLineForced=!0)},n.prototype.getWidth=function(){return this.inlineWidths-this.leadingCut-this.trailingCut},n.prototype.getHeight=function(){var t=0;return this.inlines.forEach(function(e){t=Math.max(t,e.height||0)}),t},t.exports=n},function(t,e,n){"use strict";function r(t){this.tableNode=t}var i=n(16);r.prototype.beginTable=function(t){function e(){var t=0;return r.table.widths.forEach(function(e){t+=e._calcWidth}),t}function n(){var t=[],e=0,n=0;t.push({left:0,rowSpan:0});for(var r=0,i=a.tableNode.table.body[0].length;i>r;r++){var o=a.layout.paddingLeft(r,a.tableNode)+a.layout.paddingRight(r,a.tableNode),s=a.layout.vLineWidth(r,a.tableNode);n=o+s+a.tableNode.table.widths[r]._calcWidth,t[t.length-1].width=n,e+=n,t.push({left:e,rowSpan:0,width:0})}return t}var r,o,a=this;r=this.tableNode,this.offsets=r._offsets,this.layout=r._layout,o=t.context().availableWidth-this.offsets.total,i.buildColumnWidths(r.table.widths,o),this.tableWidth=r._offsets.total+e(),this.rowSpanData=n(),this.cleanUpRepeatables=!1,this.headerRows=r.table.headerRows||0,this.rowsWithoutPageBreak=this.headerRows+(r.table.keepWithHeaderRows||0),this.dontBreakRows=r.table.dontBreakRows||!1,this.rowsWithoutPageBreak&&t.beginUnbreakableBlock(),this.drawHorizontalLine(0,t)},r.prototype.onRowBreak=function(t,e){var n=this;return function(){var t=n.rowPaddingTop+(n.headerRows?0:n.topLineWidth);e.context().moveDown(t)}},r.prototype.beginRow=function(t,e){this.topLineWidth=this.layout.hLineWidth(t,this.tableNode),this.rowPaddingTop=this.layout.paddingTop(t,this.tableNode),this.bottomLineWidth=this.layout.hLineWidth(t+1,this.tableNode),this.rowPaddingBottom=this.layout.paddingBottom(t,this.tableNode),this.rowCallback=this.onRowBreak(t,e),e.tracker.startTracking("pageChanged",this.rowCallback),this.dontBreakRows&&e.beginUnbreakableBlock(),this.rowTopY=e.context().y,this.reservedAtBottom=this.bottomLineWidth+this.rowPaddingBottom,e.context().availableHeight-=this.reservedAtBottom,e.context().moveDown(this.rowPaddingTop)},r.prototype.drawHorizontalLine=function(t,e,n){var r=this.layout.hLineWidth(t,this.tableNode);if(r){for(var i=r/2,o=null,a=0,s=this.rowSpanData.length;s>a;a++){var h=this.rowSpanData[a],u=!h.rowSpan;!o&&u&&(o={left:h.left,width:0}),u&&(o.width+=h.width||0);var c=(n||0)+i;u&&a!==s-1||o&&(e.addVector({type:"line",x1:o.left,x2:o.left+o.width,y1:c,y2:c,lineWidth:r,lineColor:"function"==typeof this.layout.hLineColor?this.layout.hLineColor(t,this.tableNode):this.layout.hLineColor},!1,n),o=null)}e.context().moveDown(r)}},r.prototype.drawVerticalLine=function(t,e,n,r,i){var o=this.layout.vLineWidth(r,this.tableNode);0!==o&&i.addVector({type:"line",x1:t+o/2,x2:t+o/2,y1:e,y2:n,lineWidth:o,lineColor:"function"==typeof this.layout.vLineColor?this.layout.vLineColor(r,this.tableNode):this.layout.vLineColor},!1,!0)},r.prototype.endTable=function(t){this.cleanUpRepeatables&&t.popFromRepeatables()},r.prototype.endRow=function(t,e,n){function r(){for(var e=[],n=0,r=0,i=a.tableNode.table.body[t].length;i>r;r++){if(!n){e.push({x:a.rowSpanData[r].left,index:r});var o=a.tableNode.table.body[t][r];n=o._colSpan||o.colSpan||0}n>0&&n--}return e.push({x:a.rowSpanData[a.rowSpanData.length-1].left,index:a.rowSpanData.length-1}),e}var i,o,a=this;e.tracker.stopTracking("pageChanged",this.rowCallback),e.context().moveDown(this.layout.paddingBottom(t,this.tableNode)),e.context().availableHeight+=this.reservedAtBottom;var s=e.context().page,h=e.context().y,u=r(),c=[],l=n&&n.length>0;if(c.push({y0:this.rowTopY,page:l?n[0].prevPage:s}),l)for(o=0,i=n.length;i>o;o++){var f=n[o];c[c.length-1].y1=f.prevY,c.push({y0:f.y,page:f.prevPage+1})}c[c.length-1].y1=h;for(var d=c[0].y1-c[0].y0===this.rowPaddingTop,p=d?1:0,g=c.length;g>p;p++){var v=p<c.length-1,m=p>0&&!this.headerRows,y=m?0:this.topLineWidth,_=c[p].y0,w=c[p].y1;for(v&&(w+=this.rowPaddingBottom),e.context().page!=c[p].page&&(e.context().page=c[p].page,this.reservedAtBottom=0),o=0,i=u.length;i>o;o++)if(this.drawVerticalLine(u[o].x,_-y,w+this.bottomLineWidth,u[o].index,e),i-1>o){var b=u[o].index,x=this.tableNode.table.body[t][b].fillColor;if(x){var S=this.layout.vLineWidth(b,this.tableNode),k=u[o].x+S,E=_-y;e.addVector({type:"rect",x:k,y:E,w:u[o+1].x-k,h:w+this.bottomLineWidth-E,lineWidth:0,color:x},!1,!0,0)}}v&&this.layout.hLineWhenBroken!==!1&&this.drawHorizontalLine(t+1,e,w),m&&this.layout.hLineWhenBroken!==!1&&this.drawHorizontalLine(t,e,_)}e.context().page=s,e.context().y=h;var C=this.tableNode.table.body[t];for(o=0,i=C.length;i>o;o++){if(C[o].rowSpan&&(this.rowSpanData[o].rowSpan=C[o].rowSpan,C[o].colSpan&&C[o].colSpan>1))for(var I=1;I<C[o].rowSpan;I++)this.tableNode.table.body[t+I][o]._colSpan=C[o].colSpan;this.rowSpanData[o].rowSpan>0&&this.rowSpanData[o].rowSpan--}this.drawHorizontalLine(t+1,e),this.headerRows&&t===this.headerRows-1&&(this.headerRepeatable=e.currentBlockToRepeatable()),this.dontBreakRows&&e.tracker.auto("pageChanged",function(){a.drawHorizontalLine(t,e)},function(){e.commitUnbreakableBlock(),a.drawHorizontalLine(t,e)}),!this.headerRepeatable||t!==this.rowsWithoutPageBreak-1&&t!==this.tableNode.table.body.length-1||(e.commitUnbreakableBlock(),e.pushToRepeatables(this.headerRepeatable),this.cleanUpRepeatables=!0,this.headerRepeatable=null)},t.exports=r},function(t,e,n){(function(e){(function(){var r,i,o,a,s,h,u={}.hasOwnProperty,c=function(t,e){function n(){this.constructor=t}for(var r in e)u.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};h=n(25),s=n(44),i=n(45),a=n(46),o=n(64),r=function(t){function r(t){var e,n,i,o;if(this.options=null!=t?t:{},r.__super__.constructor.apply(this,arguments),this.version=1.3,this.compress=null!=(i=this.options.compress)?i:!0,this._pageBuffer=[],this._pageBufferStart=0,this._offsets=[],this._waiting=0,this._ended=!1,this._offset=0,this._root=this.ref({Type:"Catalog",Pages:this.ref({Type:"Pages",Count:0,Kids:[]})}),this.page=null,this.initColor(),this.initVector(),this.initFonts(),this.initText(),this.initImages(),this.info={Producer:"PDFKit",Creator:"PDFKit",CreationDate:new Date},this.options.info){o=this.options.info;for(e in o)n=o[e],this.info[e]=n}this._write("%PDF-"+this.version),this._write("%ÿÿÿÿ"),this.addPage()}var h;return c(r,t),h=function(t){var e,n,i;i=[];for(n in t)e=t[n],i.push(r.prototype[n]=e);return i},h(n(65)),h(n(67)),h(n(69)),h(n(89)),h(n(96)),h(n(101)),r.prototype.addPage=function(t){var e;return null==t&&(t=this.options),this.options.bufferPages||this.flushPages(),this.page=new o(this,t),this._pageBuffer.push(this.page),e=this._root.data.Pages.data,e.Kids.push(this.page.dictionary),e.Count++,this.x=this.page.margins.left,this.y=this.page.margins.top,this._ctm=[1,0,0,1,0,0],this.transform(1,0,0,-1,0,this.page.height),this},r.prototype.bufferedPageRange=function(){return{start:this._pageBufferStart,count:this._pageBuffer.length}},r.prototype.switchToPage=function(t){var e;if(!(e=this._pageBuffer[t-this._pageBufferStart]))throw new Error("switchToPage("+t+") out of bounds, current buffer covers pages "+this._pageBufferStart+" to "+(this._pageBufferStart+this._pageBuffer.length-1));return this.page=e},r.prototype.flushPages=function(){var t,e,n,r;for(e=this._pageBuffer,this._pageBuffer=[],this._pageBufferStart+=e.length,n=0,r=e.length;r>n;n++)t=e[n],t.end()},r.prototype.ref=function(t){var e;return e=new a(this,this._offsets.length+1,t),this._offsets.push(null),this._waiting++,e},r.prototype._read=function(){},r.prototype._write=function(t){return e.isBuffer(t)||(t=new e(t+"\n","binary")),this.push(t),this._offset+=t.length},r.prototype.addContent=function(t){return this.page.write(t),this},r.prototype._refEnd=function(t){return this._offsets[t.id-1]=t.offset,0===--this._waiting&&this._ended?(this._finalize(),this._ended=!1):void 0},r.prototype.write=function(t,e){var n;return n=new Error("PDFDocument#write is deprecated, and will be removed in a future version of PDFKit. Please pipe the document into a Node stream."),this.pipe(s.createWriteStream(t)),this.end(),this.once("end",e)},r.prototype.output=function(t){throw new Error("PDFDocument#output is deprecated, and has been removed from PDFKit. Please pipe the document into a Node stream.")},r.prototype.end=function(){var t,e,n,r,i,o;this.flushPages(),this._info=this.ref(),i=this.info;for(e in i)r=i[e],"string"==typeof r&&(r=new String(r)),this._info.data[e]=r;this._info.end(),o=this._fontFamilies;for(n in o)t=o[n],t.embed();return this._root.end(),this._root.data.Pages.end(),0===this._waiting?this._finalize():this._ended=!0},r.prototype._finalize=function(t){var e,n,r,o,a;for(n=this._offset,this._write("xref"),this._write("0 "+(this._offsets.length+1)),this._write("0000000000 65535 f "),a=this._offsets,r=0,o=a.length;o>r;r++)e=a[r],e=("0000000000"+e).slice(-10),this._write(e+" 00000 n ");return this._write("trailer"),this._write(i.convert({Size:this._offsets.length+1,Root:this._root,Info:this._info})),this._write("startxref"),this._write(""+n),this._write("%%EOF"),this.push(null)},r.prototype.toString=function(){return"[object PDFDocument]"},r}(h.Readable),t.exports=r}).call(this)}).call(e,n(2).Buffer)},function(t,e,n){function r(){i.call(this)}t.exports=r;var i=n(26).EventEmitter,o=n(27);o(r,i),r.Readable=n(28),r.Writable=n(40),r.Duplex=n(41),r.Transform=n(42),r.PassThrough=n(43),r.Stream=r,r.prototype.pipe=function(t,e){function n(e){t.writable&&!1===t.write(e)&&u.pause&&u.pause()}function r(){u.readable&&u.resume&&u.resume()}function o(){c||(c=!0,t.end())}function a(){c||(c=!0,"function"==typeof t.destroy&&t.destroy())}function s(t){if(h(),0===i.listenerCount(this,"error"))throw t}function h(){u.removeListener("data",n),t.removeListener("drain",r),u.removeListener("end",o),u.removeListener("close",a),u.removeListener("error",s),t.removeListener("error",s),u.removeListener("end",h),u.removeListener("close",h),t.removeListener("close",h)}var u=this;u.on("data",n),t.on("drain",r),t._isStdio||e&&e.end===!1||(u.on("end",o),u.on("close",a));var c=!1;return u.on("error",s),t.on("error",s),u.on("end",h),u.on("close",h),t.on("close",h),t.emit("pipe",u),t}},function(t,e){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(t){return"function"==typeof t}function i(t){return"number"==typeof t}function o(t){return"object"==typeof t&&null!==t}function a(t){return void 0===t}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if(!i(t)||0>t||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},n.prototype.emit=function(t){var e,n,i,s,h,u;if(this._events||(this._events={}),"error"===t&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(e=arguments[1],e instanceof Error)throw e;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[t],a(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),n.apply(this,s)}else if(o(n))for(s=Array.prototype.slice.call(arguments,1),u=n.slice(),i=u.length,h=0;i>h;h++)u[h].apply(this,s);return!0},n.prototype.addListener=function(t,e){var i;if(!r(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,r(e.listener)?e.listener:e),this._events[t]?o(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,o(this._events[t])&&!this._events[t].warned&&(i=a(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[t].length>i&&(this._events[t].warned=!0,"function"==typeof console.trace)),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){function n(){this.removeListener(t,n),i||(i=!0,e.apply(this,arguments))}if(!r(e))throw TypeError("listener must be a function");var i=!1;return n.listener=e,this.on(t,n),this},n.prototype.removeListener=function(t,e){var n,i,a,s;if(!r(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(n=this._events[t],a=n.length,i=-1,n===e||r(n.listener)&&n.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(o(n)){for(s=a;s-->0;)if(n[s]===e||n[s].listener&&n[s].listener===e){i=s;break}if(0>i)return this;1===n.length?(n.length=0,delete this._events[t]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[t],r(n))this.removeListener(t,n);else if(n)for(;n.length;)this.removeListener(t,n[n.length-1]);return delete this._events[t],this},n.prototype.listeners=function(t){var e;return e=this._events&&this._events[t]?r(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(r(e))return 1;if(e)return e.length}return 0},n.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e,n){e=t.exports=n(29),e.Stream=n(25),e.Readable=e,e.Writable=n(36),e.Duplex=n(35),e.Transform=n(38),e.PassThrough=n(39)},function(t,e,n){(function(e){function r(t,e){var r=n(35);t=t||{};var i=t.highWaterMark,o=t.objectMode?16:16384;this.highWaterMark=i||0===i?i:o,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.objectMode=!!t.objectMode,e instanceof r&&(this.objectMode=this.objectMode||!!t.readableObjectMode),this.defaultEncoding=t.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,t.encoding&&(A||(A=n(37).StringDecoder),this.decoder=new A(t.encoding),this.encoding=t.encoding)}function i(t){n(35);return this instanceof i?(this._readableState=new r(t,this),this.readable=!0,void C.call(this)):new i(t)}function o(t,e,n,r,i){var o=u(e,n);if(o)t.emit("error",o);else if(I.isNullOrUndefined(n))e.reading=!1,e.ended||c(t,e);else if(e.objectMode||n&&n.length>0)if(e.ended&&!i){var s=new Error("stream.push() after EOF");t.emit("error",s)}else if(e.endEmitted&&i){var s=new Error("stream.unshift() after end event");t.emit("error",s)}else!e.decoder||i||r||(n=e.decoder.write(n)),i||(e.reading=!1),e.flowing&&0===e.length&&!e.sync?(t.emit("data",n),t.read(0)):(e.length+=e.objectMode?1:n.length,i?e.buffer.unshift(n):e.buffer.push(n),e.needReadable&&l(t)),d(t,e);else i||(e.reading=!1);return a(e)}function a(t){return!t.ended&&(t.needReadable||t.length<t.highWaterMark||0===t.length)}function s(t){if(t>=R)t=R;else{t--;for(var e=1;32>e;e<<=1)t|=t>>e;t++}return t}function h(t,e){return 0===e.length&&e.ended?0:e.objectMode?0===t?0:1:isNaN(t)||I.isNull(t)?e.flowing&&e.buffer.length?e.buffer[0].length:e.length:0>=t?0:(t>e.highWaterMark&&(e.highWaterMark=s(t)),t>e.length?e.ended?e.length:(e.needReadable=!0,0):t)}function u(t,e){var n=null;return I.isBuffer(e)||I.isString(e)||I.isNullOrUndefined(e)||t.objectMode||(n=new TypeError("Invalid non-string/buffer chunk")),n}function c(t,e){if(e.decoder&&!e.ended){var n=e.decoder.end();n&&n.length&&(e.buffer.push(n),e.length+=e.objectMode?1:n.length)}e.ended=!0,l(t)}function l(t){var n=t._readableState;n.needReadable=!1,n.emittedReadable||(L("emitReadable",n.flowing),n.emittedReadable=!0,n.sync?e.nextTick(function(){f(t)}):f(t))}function f(t){L("emit readable"),t.emit("readable"),y(t)}function d(t,n){n.readingMore||(n.readingMore=!0,e.nextTick(function(){p(t,n)}))}function p(t,e){for(var n=e.length;!e.reading&&!e.flowing&&!e.ended&&e.length<e.highWaterMark&&(L("maybeReadMore read 0"),t.read(0),n!==e.length);)n=e.length;e.readingMore=!1}function g(t){return function(){var e=t._readableState;
L("pipeOnDrain",e.awaitDrain),e.awaitDrain&&e.awaitDrain--,0===e.awaitDrain&&E.listenerCount(t,"data")&&(e.flowing=!0,y(t))}}function v(t,n){n.resumeScheduled||(n.resumeScheduled=!0,e.nextTick(function(){m(t,n)}))}function m(t,e){e.resumeScheduled=!1,t.emit("resume"),y(t),e.flowing&&!e.reading&&t.read(0)}function y(t){var e=t._readableState;if(L("flow",e.flowing),e.flowing)do var n=t.read();while(null!==n&&e.flowing)}function _(t,e){var n,r=e.buffer,i=e.length,o=!!e.decoder,a=!!e.objectMode;if(0===r.length)return null;if(0===i)n=null;else if(a)n=r.shift();else if(!t||t>=i)n=o?r.join(""):k.concat(r,i),r.length=0;else if(t<r[0].length){var s=r[0];n=s.slice(0,t),r[0]=s.slice(t)}else if(t===r[0].length)n=r.shift();else{n=o?"":new k(t);for(var h=0,u=0,c=r.length;c>u&&t>h;u++){var s=r[0],l=Math.min(t-h,s.length);o?n+=s.slice(0,l):s.copy(n,h,0,l),l<s.length?r[0]=s.slice(l):r.shift(),h+=l}}return n}function w(t){var n=t._readableState;if(n.length>0)throw new Error("endReadable called on non-empty stream");n.endEmitted||(n.ended=!0,e.nextTick(function(){n.endEmitted||0!==n.length||(n.endEmitted=!0,t.readable=!1,t.emit("end"))}))}function b(t,e){for(var n=0,r=t.length;r>n;n++)e(t[n],n)}function x(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n]===e)return n;return-1}t.exports=i;var S=n(31),k=n(2).Buffer;i.ReadableState=r;var E=n(26).EventEmitter;E.listenerCount||(E.listenerCount=function(t,e){return t.listeners(e).length});var C=n(25),I=n(32);I.inherits=n(33);var A,L=n(34);L=L&&L.debuglog?L.debuglog("stream"):function(){},I.inherits(i,C),i.prototype.push=function(t,e){var n=this._readableState;return I.isString(t)&&!n.objectMode&&(e=e||n.defaultEncoding,e!==n.encoding&&(t=new k(t,e),e="")),o(this,n,t,e,!1)},i.prototype.unshift=function(t){var e=this._readableState;return o(this,e,t,"",!0)},i.prototype.setEncoding=function(t){return A||(A=n(37).StringDecoder),this._readableState.decoder=new A(t),this._readableState.encoding=t,this};var R=8388608;i.prototype.read=function(t){L("read",t);var e=this._readableState,n=t;if((!I.isNumber(t)||t>0)&&(e.emittedReadable=!1),0===t&&e.needReadable&&(e.length>=e.highWaterMark||e.ended))return L("read: emitReadable",e.length,e.ended),0===e.length&&e.ended?w(this):l(this),null;if(t=h(t,e),0===t&&e.ended)return 0===e.length&&w(this),null;var r=e.needReadable;L("need readable",r),(0===e.length||e.length-t<e.highWaterMark)&&(r=!0,L("length less than watermark",r)),(e.ended||e.reading)&&(r=!1,L("reading or ended",r)),r&&(L("do read"),e.reading=!0,e.sync=!0,0===e.length&&(e.needReadable=!0),this._read(e.highWaterMark),e.sync=!1),r&&!e.reading&&(t=h(n,e));var i;return i=t>0?_(t,e):null,I.isNull(i)&&(e.needReadable=!0,t=0),e.length-=t,0!==e.length||e.ended||(e.needReadable=!0),n!==t&&e.ended&&0===e.length&&w(this),I.isNull(i)||this.emit("data",i),i},i.prototype._read=function(t){this.emit("error",new Error("not implemented"))},i.prototype.pipe=function(t,n){function r(t){L("onunpipe"),t===l&&o()}function i(){L("onend"),t.end()}function o(){L("cleanup"),t.removeListener("close",h),t.removeListener("finish",u),t.removeListener("drain",v),t.removeListener("error",s),t.removeListener("unpipe",r),l.removeListener("end",i),l.removeListener("end",o),l.removeListener("data",a),!f.awaitDrain||t._writableState&&!t._writableState.needDrain||v()}function a(e){L("ondata");var n=t.write(e);!1===n&&(L("false write response, pause",l._readableState.awaitDrain),l._readableState.awaitDrain++,l.pause())}function s(e){L("onerror",e),c(),t.removeListener("error",s),0===E.listenerCount(t,"error")&&t.emit("error",e)}function h(){t.removeListener("finish",u),c()}function u(){L("onfinish"),t.removeListener("close",h),c()}function c(){L("unpipe"),l.unpipe(t)}var l=this,f=this._readableState;switch(f.pipesCount){case 0:f.pipes=t;break;case 1:f.pipes=[f.pipes,t];break;default:f.pipes.push(t)}f.pipesCount+=1,L("pipe count=%d opts=%j",f.pipesCount,n);var d=(!n||n.end!==!1)&&t!==e.stdout&&t!==e.stderr,p=d?i:o;f.endEmitted?e.nextTick(p):l.once("end",p),t.on("unpipe",r);var v=g(l);return t.on("drain",v),l.on("data",a),t._events&&t._events.error?S(t._events.error)?t._events.error.unshift(s):t._events.error=[s,t._events.error]:t.on("error",s),t.once("close",h),t.once("finish",u),t.emit("pipe",l),f.flowing||(L("pipe resume"),l.resume()),t},i.prototype.unpipe=function(t){var e=this._readableState;if(0===e.pipesCount)return this;if(1===e.pipesCount)return t&&t!==e.pipes?this:(t||(t=e.pipes),e.pipes=null,e.pipesCount=0,e.flowing=!1,t&&t.emit("unpipe",this),this);if(!t){var n=e.pipes,r=e.pipesCount;e.pipes=null,e.pipesCount=0,e.flowing=!1;for(var i=0;r>i;i++)n[i].emit("unpipe",this);return this}var i=x(e.pipes,t);return-1===i?this:(e.pipes.splice(i,1),e.pipesCount-=1,1===e.pipesCount&&(e.pipes=e.pipes[0]),t.emit("unpipe",this),this)},i.prototype.on=function(t,n){var r=C.prototype.on.call(this,t,n);if("data"===t&&!1!==this._readableState.flowing&&this.resume(),"readable"===t&&this.readable){var i=this._readableState;if(!i.readableListening)if(i.readableListening=!0,i.emittedReadable=!1,i.needReadable=!0,i.reading)i.length&&l(this,i);else{var o=this;e.nextTick(function(){L("readable nexttick read 0"),o.read(0)})}}return r},i.prototype.addListener=i.prototype.on,i.prototype.resume=function(){var t=this._readableState;return t.flowing||(L("resume"),t.flowing=!0,t.reading||(L("resume read 0"),this.read(0)),v(this,t)),this},i.prototype.pause=function(){return L("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(L("pause"),this._readableState.flowing=!1,this.emit("pause")),this},i.prototype.wrap=function(t){var e=this._readableState,n=!1,r=this;t.on("end",function(){if(L("wrapped end"),e.decoder&&!e.ended){var t=e.decoder.end();t&&t.length&&r.push(t)}r.push(null)}),t.on("data",function(i){if(L("wrapped data"),e.decoder&&(i=e.decoder.write(i)),i&&(e.objectMode||i.length)){var o=r.push(i);o||(n=!0,t.pause())}});for(var i in t)I.isFunction(t[i])&&I.isUndefined(this[i])&&(this[i]=function(e){return function(){return t[e].apply(t,arguments)}}(i));var o=["error","close","destroy","pause","resume"];return b(o,function(e){t.on(e,r.emit.bind(r,e))}),r._read=function(e){L("wrapped _read",e),n&&(n=!1,t.resume())},r},i._fromList=_}).call(e,n(30))},function(t,e){function n(){u=!1,a.length?h=a.concat(h):c=-1,h.length&&r()}function r(){if(!u){var t=setTimeout(n);u=!0;for(var e=h.length;e;){for(a=h,h=[];++c<e;)a&&a[c].run();c=-1,e=h.length}a=null,u=!1,clearTimeout(t)}}function i(t,e){this.fun=t,this.array=e}function o(){}var a,s=t.exports={},h=[],u=!1,c=-1;s.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new i(t,e)),1!==h.length||u||setTimeout(r,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=o,s.addListener=o,s.once=o,s.off=o,s.removeListener=o,s.removeAllListeners=o,s.emit=o,s.binding=function(t){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(t){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(t,e){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},function(t,e,n){(function(t){function n(t){return Array.isArray(t)}function r(t){return"boolean"==typeof t}function i(t){return null===t}function o(t){return null==t}function a(t){return"number"==typeof t}function s(t){return"string"==typeof t}function h(t){return"symbol"==typeof t}function u(t){return void 0===t}function c(t){return l(t)&&"[object RegExp]"===m(t)}function l(t){return"object"==typeof t&&null!==t}function f(t){return l(t)&&"[object Date]"===m(t)}function d(t){return l(t)&&("[object Error]"===m(t)||t instanceof Error)}function p(t){return"function"==typeof t}function g(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function v(e){return t.isBuffer(e)}function m(t){return Object.prototype.toString.call(t)}e.isArray=n,e.isBoolean=r,e.isNull=i,e.isNullOrUndefined=o,e.isNumber=a,e.isString=s,e.isSymbol=h,e.isUndefined=u,e.isRegExp=c,e.isObject=l,e.isDate=f,e.isError=d,e.isFunction=p,e.isPrimitive=g,e.isBuffer=v}).call(e,n(2).Buffer)},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e){},function(t,e,n){(function(e){function r(t){return this instanceof r?(h.call(this,t),u.call(this,t),t&&t.readable===!1&&(this.readable=!1),t&&t.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,t&&t.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",i)):new r(t)}function i(){this.allowHalfOpen||this._writableState.ended||e.nextTick(this.end.bind(this))}function o(t,e){for(var n=0,r=t.length;r>n;n++)e(t[n],n)}t.exports=r;var a=Object.keys||function(t){var e=[];for(var n in t)e.push(n);return e},s=n(32);s.inherits=n(33);var h=n(29),u=n(36);s.inherits(r,h),o(a(u.prototype),function(t){r.prototype[t]||(r.prototype[t]=u.prototype[t])})}).call(e,n(30))},function(t,e,n){(function(e){function r(t,e,n){this.chunk=t,this.encoding=e,this.callback=n}function i(t,e){var r=n(35);t=t||{};var i=t.highWaterMark,o=t.objectMode?16:16384;this.highWaterMark=i||0===i?i:o,this.objectMode=!!t.objectMode,e instanceof r&&(this.objectMode=this.objectMode||!!t.writableObjectMode),this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var a=t.decodeStrings===!1;this.decodeStrings=!a,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(t){d(e,t)},this.writecb=null,this.writelen=0,this.buffer=[],this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1}function o(t){var e=n(35);return this instanceof o||this instanceof e?(this._writableState=new i(t,this),this.writable=!0,void S.call(this)):new o(t)}function a(t,n,r){var i=new Error("write after end");t.emit("error",i),e.nextTick(function(){r(i)})}function s(t,n,r,i){var o=!0;if(!(x.isBuffer(r)||x.isString(r)||x.isNullOrUndefined(r)||n.objectMode)){var a=new TypeError("Invalid non-string/buffer chunk");t.emit("error",a),e.nextTick(function(){i(a)}),o=!1}return o}function h(t,e,n){return!t.objectMode&&t.decodeStrings!==!1&&x.isString(e)&&(e=new b(e,n)),e}function u(t,e,n,i,o){n=h(e,n,i),x.isBuffer(n)&&(i="buffer");var a=e.objectMode?1:n.length;e.length+=a;var s=e.length<e.highWaterMark;return s||(e.needDrain=!0),e.writing||e.corked?e.buffer.push(new r(n,i,o)):c(t,e,!1,a,n,i,o),s}function c(t,e,n,r,i,o,a){e.writelen=r,e.writecb=a,e.writing=!0,e.sync=!0,n?t._writev(i,e.onwrite):t._write(i,o,e.onwrite),e.sync=!1}function l(t,n,r,i,o){r?e.nextTick(function(){n.pendingcb--,o(i)}):(n.pendingcb--,o(i)),t._writableState.errorEmitted=!0,t.emit("error",i)}function f(t){t.writing=!1,t.writecb=null,t.length-=t.writelen,t.writelen=0}function d(t,n){var r=t._writableState,i=r.sync,o=r.writecb;if(f(r),n)l(t,r,i,n,o);else{var a=m(t,r);a||r.corked||r.bufferProcessing||!r.buffer.length||v(t,r),i?e.nextTick(function(){p(t,r,a,o)}):p(t,r,a,o)}}function p(t,e,n,r){n||g(t,e),e.pendingcb--,r(),_(t,e)}function g(t,e){0===e.length&&e.needDrain&&(e.needDrain=!1,t.emit("drain"))}function v(t,e){if(e.bufferProcessing=!0,t._writev&&e.buffer.length>1){for(var n=[],r=0;r<e.buffer.length;r++)n.push(e.buffer[r].callback);e.pendingcb++,c(t,e,!0,e.length,e.buffer,"",function(t){for(var r=0;r<n.length;r++)e.pendingcb--,n[r](t)}),e.buffer=[]}else{for(var r=0;r<e.buffer.length;r++){var i=e.buffer[r],o=i.chunk,a=i.encoding,s=i.callback,h=e.objectMode?1:o.length;if(c(t,e,!1,h,o,a,s),e.writing){r++;break}}r<e.buffer.length?e.buffer=e.buffer.slice(r):e.buffer.length=0}e.bufferProcessing=!1}function m(t,e){return e.ending&&0===e.length&&!e.finished&&!e.writing}function y(t,e){e.prefinished||(e.prefinished=!0,t.emit("prefinish"))}function _(t,e){var n=m(t,e);return n&&(0===e.pendingcb?(y(t,e),e.finished=!0,t.emit("finish")):y(t,e)),n}function w(t,n,r){n.ending=!0,_(t,n),r&&(n.finished?e.nextTick(r):t.once("finish",r)),n.ended=!0}t.exports=o;var b=n(2).Buffer;o.WritableState=i;var x=n(32);x.inherits=n(33);var S=n(25);x.inherits(o,S),o.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},o.prototype.write=function(t,e,n){var r=this._writableState,i=!1;return x.isFunction(e)&&(n=e,e=null),x.isBuffer(t)?e="buffer":e||(e=r.defaultEncoding),x.isFunction(n)||(n=function(){}),r.ended?a(this,r,n):s(this,r,t,n)&&(r.pendingcb++,i=u(this,r,t,e,n)),i},o.prototype.cork=function(){var t=this._writableState;t.corked++},o.prototype.uncork=function(){var t=this._writableState;t.corked&&(t.corked--,t.writing||t.corked||t.finished||t.bufferProcessing||!t.buffer.length||v(this,t))},o.prototype._write=function(t,e,n){n(new Error("not implemented"))},o.prototype._writev=null,o.prototype.end=function(t,e,n){var r=this._writableState;x.isFunction(t)?(n=t,t=null,e=null):x.isFunction(e)&&(n=e,e=null),x.isNullOrUndefined(t)||this.write(t,e),r.corked&&(r.corked=1,this.uncork()),r.ending||r.finished||w(this,r,n)}}).call(e,n(30))},function(t,e,n){function r(t){if(t&&!h(t))throw new Error("Unknown encoding: "+t)}function i(t){return t.toString(this.encoding)}function o(t){this.charReceived=t.length%2,this.charLength=this.charReceived?2:0}function a(t){this.charReceived=t.length%3,this.charLength=this.charReceived?3:0}var s=n(2).Buffer,h=s.isEncoding||function(t){switch(t&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}},u=e.StringDecoder=function(t){switch(this.encoding=(t||"utf8").toLowerCase().replace(/[-_]/,""),r(t),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=o;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=a;break;default:return void(this.write=i)}this.charBuffer=new s(6),this.charReceived=0,this.charLength=0};u.prototype.write=function(t){for(var e="";this.charLength;){var n=t.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:t.length;if(t.copy(this.charBuffer,this.charReceived,0,n),this.charReceived+=n,this.charReceived<this.charLength)return"";t=t.slice(n,t.length),e=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var r=e.charCodeAt(e.length-1);if(!(r>=55296&&56319>=r)){if(this.charReceived=this.charLength=0,0===t.length)return e;break}this.charLength+=this.surrogateSize,e=""}this.detectIncompleteChar(t);var i=t.length;this.charLength&&(t.copy(this.charBuffer,0,t.length-this.charReceived,i),i-=this.charReceived),e+=t.toString(this.encoding,0,i);var i=e.length-1,r=e.charCodeAt(i);if(r>=55296&&56319>=r){var o=this.surrogateSize;return this.charLength+=o,this.charReceived+=o,this.charBuffer.copy(this.charBuffer,o,0,o),t.copy(this.charBuffer,0,0,o),e.substring(0,i)}return e},u.prototype.detectIncompleteChar=function(t){for(var e=t.length>=3?3:t.length;e>0;e--){var n=t[t.length-e];if(1==e&&n>>5==6){this.charLength=2;break}if(2>=e&&n>>4==14){this.charLength=3;break}if(3>=e&&n>>3==30){this.charLength=4;break}}this.charReceived=e},u.prototype.end=function(t){var e="";if(t&&t.length&&(e=this.write(t)),this.charReceived){var n=this.charReceived,r=this.charBuffer,i=this.encoding;e+=r.slice(0,n).toString(i)}return e}},function(t,e,n){function r(t,e){this.afterTransform=function(t,n){return i(e,t,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null}function i(t,e,n){var r=t._transformState;r.transforming=!1;var i=r.writecb;if(!i)return t.emit("error",new Error("no writecb in Transform class"));r.writechunk=null,r.writecb=null,h.isNullOrUndefined(n)||t.push(n),i&&i(e);var o=t._readableState;o.reading=!1,(o.needReadable||o.length<o.highWaterMark)&&t._read(o.highWaterMark)}function o(t){if(!(this instanceof o))return new o(t);s.call(this,t),this._transformState=new r(t,this);var e=this;this._readableState.needReadable=!0,this._readableState.sync=!1,this.once("prefinish",function(){h.isFunction(this._flush)?this._flush(function(t){a(e,t)}):a(e)})}function a(t,e){if(e)return t.emit("error",e);var n=t._writableState,r=t._transformState;if(n.length)throw new Error("calling transform done when ws.length != 0");if(r.transforming)throw new Error("calling transform done when still transforming");return t.push(null)}t.exports=o;var s=n(35),h=n(32);h.inherits=n(33),h.inherits(o,s),o.prototype.push=function(t,e){return this._transformState.needTransform=!1,s.prototype.push.call(this,t,e)},o.prototype._transform=function(t,e,n){throw new Error("not implemented")},o.prototype._write=function(t,e,n){var r=this._transformState;if(r.writecb=n,r.writechunk=t,r.writeencoding=e,!r.transforming){var i=this._readableState;(r.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},o.prototype._read=function(t){var e=this._transformState;h.isNull(e.writechunk)||!e.writecb||e.transforming?e.needTransform=!0:(e.transforming=!0,this._transform(e.writechunk,e.writeencoding,e.afterTransform))}},function(t,e,n){function r(t){return this instanceof r?void i.call(this,t):new r(t)}t.exports=r;var i=n(38),o=n(32);o.inherits=n(33),o.inherits(r,i),r.prototype._transform=function(t,e,n){n(null,t)}},function(t,e,n){t.exports=n(36)},function(t,e,n){t.exports=n(35)},function(t,e,n){t.exports=n(38)},function(t,e,n){t.exports=n(39)},function(t,e,n){(function(e,n){"use strict";function r(){this.fileSystem={},this.baseSystem={}}function i(t){return 0===t.indexOf(n)&&(t=t.substring(n.length)),0===t.indexOf("/")&&(t=t.substring(1)),t}r.prototype.readFileSync=function(t){t=i(t);var n=this.baseSystem[t];return n?new e(n,"base64"):this.fileSystem[t]},r.prototype.writeFileSync=function(t,e){this.fileSystem[i(t)]=e},r.prototype.bindFS=function(t){this.baseSystem=t},t.exports=new r}).call(e,n(2).Buffer,"/")},function(t,e,n){(function(e){(function(){var r,i;r=function(){function t(){}var n,r,o,a;return o=function(t,e){return(Array(e+1).join("0")+t).slice(-e)},r=/[\n\r\t\b\f\(\)\\]/g,n={"\n":"\\n","\r":"\\r","	":"\\t","\b":"\\b","\f":"\\f","\\":"\\\\","(":"\\(",")":"\\)"},a=function(t){var e,n,r,i,o;if(r=t.length,1&r)throw new Error("Buffer length must be even");for(n=i=0,o=r-1;o>i;n=i+=2)e=t[n],t[n]=t[n+1],t[n+1]=e;return t},t.convert=function(s){var h,u,c,l,f,d,p,g,v,m;if("string"==typeof s)return"/"+s;if(s instanceof String){for(p=s.replace(r,function(t){return n[t]}),c=!1,u=v=0,m=p.length;m>v;u=v+=1)if(p.charCodeAt(u)>127){c=!0;break}return c&&(p=a(new e("\ufeff"+p,"utf16le")).toString("binary")),"("+p+")"}if(e.isBuffer(s))return"<"+s.toString("hex")+">";if(s instanceof i)return s.toString();if(s instanceof Date)return"(D:"+o(s.getUTCFullYear(),4)+o(s.getUTCMonth(),2)+o(s.getUTCDate(),2)+o(s.getUTCHours(),2)+o(s.getUTCMinutes(),2)+o(s.getUTCSeconds(),2)+"Z)";if(Array.isArray(s))return l=function(){var e,n,r;for(r=[],e=0,n=s.length;n>e;e++)h=s[e],r.push(t.convert(h));return r}().join(" "),"["+l+"]";if("[object Object]"==={}.toString.call(s)){d=["<<"];for(f in s)g=s[f],d.push("/"+f+" "+t.convert(g));return d.push(">>"),d.join("\n")}return""+s},t}(),t.exports=r,i=n(46)}).call(this)}).call(e,n(2).Buffer)},function(t,e,n){(function(e){(function(){var r,i,o,a=function(t,e){return function(){return t.apply(e,arguments)}};o=n(47),i=function(){function t(t,e,n){this.document=t,this.id=e,this.data=null!=n?n:{},this.finalize=a(this.finalize,this),this.gen=0,this.deflate=null,this.compress=this.document.compress&&!this.data.Filter,this.uncompressedLength=0,this.chunks=[]}return t.prototype.initDeflate=function(){return this.data.Filter="FlateDecode",this.deflate=o.createDeflate(),this.deflate.on("data",function(t){return function(e){return t.chunks.push(e),t.data.Length+=e.length}}(this)),this.deflate.on("end",this.finalize)},t.prototype.write=function(t){var n;return e.isBuffer(t)||(t=new e(t+"\n","binary")),this.uncompressedLength+=t.length,null==(n=this.data).Length&&(n.Length=0),this.compress?(this.deflate||this.initDeflate(),this.deflate.write(t)):(this.chunks.push(t),this.data.Length+=t.length)},t.prototype.end=function(t){return("string"==typeof t||e.isBuffer(t))&&this.write(t),this.deflate?this.deflate.end():this.finalize()},t.prototype.finalize=function(){var t,e,n,i;if(this.offset=this.document._offset,this.document._write(""+this.id+" "+this.gen+" obj"),this.document._write(r.convert(this.data)),this.chunks.length){for(this.document._write("stream"),i=this.chunks,e=0,n=i.length;n>e;e++)t=i[e],this.document._write(t);this.chunks.length=0,this.document._write("\nendstream")}return this.document._write("endobj"),this.document._refEnd(this)},t.prototype.toString=function(){return""+this.id+" "+this.gen+" R"},t}(),t.exports=i,r=n(45)}).call(this)}).call(e,n(2).Buffer)},function(t,e,n){(function(t,r){function i(e,n,r){function i(){for(var t;null!==(t=e.read());)s.push(t),h+=t.length;e.once("readable",i)}function o(t){e.removeListener("end",a),e.removeListener("readable",i),r(t)}function a(){var n=t.concat(s,h);s=[],r(null,n),e.close()}var s=[],h=0;e.on("error",o),e.on("end",a),e.end(n),i()}function o(e,n){if("string"==typeof n&&(n=new t(n)),!t.isBuffer(n))throw new TypeError("Not a string or buffer");var r=g.Z_FINISH;return e._processChunk(n,r)}function a(t){return this instanceof a?void d.call(this,t,g.DEFLATE):new a(t)}function s(t){return this instanceof s?void d.call(this,t,g.INFLATE):new s(t)}function h(t){return this instanceof h?void d.call(this,t,g.GZIP):new h(t)}function u(t){return this instanceof u?void d.call(this,t,g.GUNZIP):new u(t)}function c(t){return this instanceof c?void d.call(this,t,g.DEFLATERAW):new c(t)}function l(t){return this instanceof l?void d.call(this,t,g.INFLATERAW):new l(t)}function f(t){return this instanceof f?void d.call(this,t,g.UNZIP):new f(t)}function d(n,r){if(this._opts=n=n||{},this._chunkSize=n.chunkSize||e.Z_DEFAULT_CHUNK,p.call(this,n),n.flush&&n.flush!==g.Z_NO_FLUSH&&n.flush!==g.Z_PARTIAL_FLUSH&&n.flush!==g.Z_SYNC_FLUSH&&n.flush!==g.Z_FULL_FLUSH&&n.flush!==g.Z_FINISH&&n.flush!==g.Z_BLOCK)throw new Error("Invalid flush flag: "+n.flush);if(this._flushFlag=n.flush||g.Z_NO_FLUSH,n.chunkSize&&(n.chunkSize<e.Z_MIN_CHUNK||n.chunkSize>e.Z_MAX_CHUNK))throw new Error("Invalid chunk size: "+n.chunkSize);if(n.windowBits&&(n.windowBits<e.Z_MIN_WINDOWBITS||n.windowBits>e.Z_MAX_WINDOWBITS))throw new Error("Invalid windowBits: "+n.windowBits);if(n.level&&(n.level<e.Z_MIN_LEVEL||n.level>e.Z_MAX_LEVEL))throw new Error("Invalid compression level: "+n.level);if(n.memLevel&&(n.memLevel<e.Z_MIN_MEMLEVEL||n.memLevel>e.Z_MAX_MEMLEVEL))throw new Error("Invalid memLevel: "+n.memLevel);if(n.strategy&&n.strategy!=e.Z_FILTERED&&n.strategy!=e.Z_HUFFMAN_ONLY&&n.strategy!=e.Z_RLE&&n.strategy!=e.Z_FIXED&&n.strategy!=e.Z_DEFAULT_STRATEGY)throw new Error("Invalid strategy: "+n.strategy);if(n.dictionary&&!t.isBuffer(n.dictionary))throw new Error("Invalid dictionary: it should be a Buffer instance");this._binding=new g.Zlib(r);var i=this;this._hadError=!1,this._binding.onerror=function(t,n){i._binding=null,i._hadError=!0;var r=new Error(t);r.errno=n,r.code=e.codes[n],i.emit("error",r)};var o=e.Z_DEFAULT_COMPRESSION;"number"==typeof n.level&&(o=n.level);var a=e.Z_DEFAULT_STRATEGY;"number"==typeof n.strategy&&(a=n.strategy),this._binding.init(n.windowBits||e.Z_DEFAULT_WINDOWBITS,o,n.memLevel||e.Z_DEFAULT_MEMLEVEL,a,n.dictionary),this._buffer=new t(this._chunkSize),this._offset=0,this._closed=!1,this._level=o,this._strategy=a,this.once("end",this.close)}var p=n(42),g=n(48),v=n(60),m=n(63).ok;g.Z_MIN_WINDOWBITS=8,g.Z_MAX_WINDOWBITS=15,g.Z_DEFAULT_WINDOWBITS=15,g.Z_MIN_CHUNK=64,g.Z_MAX_CHUNK=1/0,g.Z_DEFAULT_CHUNK=16384,g.Z_MIN_MEMLEVEL=1,g.Z_MAX_MEMLEVEL=9,g.Z_DEFAULT_MEMLEVEL=8,g.Z_MIN_LEVEL=-1,g.Z_MAX_LEVEL=9,g.Z_DEFAULT_LEVEL=g.Z_DEFAULT_COMPRESSION,Object.keys(g).forEach(function(t){t.match(/^Z/)&&(e[t]=g[t])}),e.codes={Z_OK:g.Z_OK,Z_STREAM_END:g.Z_STREAM_END,Z_NEED_DICT:g.Z_NEED_DICT,Z_ERRNO:g.Z_ERRNO,Z_STREAM_ERROR:g.Z_STREAM_ERROR,Z_DATA_ERROR:g.Z_DATA_ERROR,Z_MEM_ERROR:g.Z_MEM_ERROR,Z_BUF_ERROR:g.Z_BUF_ERROR,Z_VERSION_ERROR:g.Z_VERSION_ERROR},Object.keys(e.codes).forEach(function(t){e.codes[e.codes[t]]=t}),e.Deflate=a,e.Inflate=s,e.Gzip=h,e.Gunzip=u,e.DeflateRaw=c,e.InflateRaw=l,e.Unzip=f,e.createDeflate=function(t){return new a(t)},e.createInflate=function(t){return new s(t)},e.createDeflateRaw=function(t){return new c(t)},e.createInflateRaw=function(t){return new l(t)},e.createGzip=function(t){return new h(t)},e.createGunzip=function(t){return new u(t)},e.createUnzip=function(t){return new f(t)},e.deflate=function(t,e,n){return"function"==typeof e&&(n=e,e={}),i(new a(e),t,n)},e.deflateSync=function(t,e){return o(new a(e),t)},e.gzip=function(t,e,n){return"function"==typeof e&&(n=e,e={}),i(new h(e),t,n)},e.gzipSync=function(t,e){return o(new h(e),t)},e.deflateRaw=function(t,e,n){return"function"==typeof e&&(n=e,e={}),i(new c(e),t,n)},e.deflateRawSync=function(t,e){return o(new c(e),t)},e.unzip=function(t,e,n){return"function"==typeof e&&(n=e,e={}),i(new f(e),t,n)},e.unzipSync=function(t,e){return o(new f(e),t)},e.inflate=function(t,e,n){return"function"==typeof e&&(n=e,e={}),i(new s(e),t,n)},e.inflateSync=function(t,e){return o(new s(e),t)},e.gunzip=function(t,e,n){return"function"==typeof e&&(n=e,e={}),i(new u(e),t,n)},e.gunzipSync=function(t,e){return o(new u(e),t)},e.inflateRaw=function(t,e,n){return"function"==typeof e&&(n=e,e={}),i(new l(e),t,n)},e.inflateRawSync=function(t,e){return o(new l(e),t)},v.inherits(d,p),d.prototype.params=function(t,n,i){if(t<e.Z_MIN_LEVEL||t>e.Z_MAX_LEVEL)throw new RangeError("Invalid compression level: "+t);if(n!=e.Z_FILTERED&&n!=e.Z_HUFFMAN_ONLY&&n!=e.Z_RLE&&n!=e.Z_FIXED&&n!=e.Z_DEFAULT_STRATEGY)throw new TypeError("Invalid strategy: "+n);if(this._level!==t||this._strategy!==n){var o=this;this.flush(g.Z_SYNC_FLUSH,function(){o._binding.params(t,n),o._hadError||(o._level=t,o._strategy=n,i&&i())})}else r.nextTick(i)},d.prototype.reset=function(){return this._binding.reset()},d.prototype._flush=function(e){this._transform(new t(0),"",e)},d.prototype.flush=function(e,n){var i=this._writableState;if(("function"==typeof e||void 0===e&&!n)&&(n=e,e=g.Z_FULL_FLUSH),i.ended)n&&r.nextTick(n);else if(i.ending)n&&this.once("end",n);else if(i.needDrain){var o=this;this.once("drain",function(){o.flush(n)})}else this._flushFlag=e,this.write(new t(0),"",n)},d.prototype.close=function(t){if(t&&r.nextTick(t),!this._closed){this._closed=!0,this._binding.close();var e=this;r.nextTick(function(){e.emit("close")})}},d.prototype._transform=function(e,n,r){var i,o=this._writableState,a=o.ending||o.ended,s=a&&(!e||o.length===e.length);if(null===!e&&!t.isBuffer(e))return r(new Error("invalid input"));s?i=g.Z_FINISH:(i=this._flushFlag,e.length>=o.length&&(this._flushFlag=this._opts.flush||g.Z_NO_FLUSH));this._processChunk(e,i,r)},d.prototype._processChunk=function(e,n,r){function i(c,d){if(!h._hadError){var p=a-d;if(m(p>=0,"have should not go down"),p>0){var g=h._buffer.slice(h._offset,h._offset+p);h._offset+=p,u?h.push(g):(l.push(g),f+=g.length)}if((0===d||h._offset>=h._chunkSize)&&(a=h._chunkSize,h._offset=0,h._buffer=new t(h._chunkSize)),0===d){if(s+=o-c,o=c,!u)return!0;var v=h._binding.write(n,e,s,o,h._buffer,h._offset,h._chunkSize);return v.callback=i,void(v.buffer=e)}return u?void r():!1}}var o=e&&e.length,a=this._chunkSize-this._offset,s=0,h=this,u="function"==typeof r;if(!u){var c,l=[],f=0;this.on("error",function(t){c=t});do var d=this._binding.writeSync(n,e,s,o,this._buffer,this._offset,a);while(!this._hadError&&i(d[0],d[1]));if(this._hadError)throw c;var p=t.concat(l,f);return this.close(),p}var g=this._binding.write(n,e,s,o,this._buffer,this._offset,a);g.buffer=e,g.callback=i},v.inherits(a,d),v.inherits(s,d),v.inherits(h,d),v.inherits(u,d),v.inherits(c,d),v.inherits(l,d),v.inherits(f,d)}).call(e,n(2).Buffer,n(30))},function(t,e,n){(function(t,r){function i(t){if(t<e.DEFLATE||t>e.UNZIP)throw new TypeError("Bad argument");this.mode=t,this.init_done=!1,this.write_in_progress=!1,this.pending_close=!1,this.windowBits=0,this.level=0,this.memLevel=0,this.strategy=0,this.dictionary=null}function o(t,e){for(var n=0;n<t.length;n++)this[e+n]=t[n]}var a=n(49),s=n(50),h=n(51),u=n(56),c=n(59);for(var l in c)e[l]=c[l];e.NONE=0,e.DEFLATE=1,e.INFLATE=2,e.GZIP=3,e.GUNZIP=4,e.DEFLATERAW=5,e.INFLATERAW=6,e.UNZIP=7,i.prototype.init=function(t,n,r,i,o){switch(this.windowBits=t,this.level=n,this.memLevel=r,this.strategy=i,(this.mode===e.GZIP||this.mode===e.GUNZIP)&&(this.windowBits+=16),this.mode===e.UNZIP&&(this.windowBits+=32),(this.mode===e.DEFLATERAW||this.mode===e.INFLATERAW)&&(this.windowBits=-this.windowBits),this.strm=new s,this.mode){case e.DEFLATE:case e.GZIP:case e.DEFLATERAW:var a=h.deflateInit2(this.strm,this.level,e.Z_DEFLATED,this.windowBits,this.memLevel,this.strategy);break;case e.INFLATE:case e.GUNZIP:case e.INFLATERAW:case e.UNZIP:var a=u.inflateInit2(this.strm,this.windowBits);break;default:throw new Error("Unknown mode "+this.mode)}return a!==e.Z_OK?void this._error(a):(this.write_in_progress=!1,void(this.init_done=!0))},i.prototype.params=function(){throw new Error("deflateParams Not supported")},i.prototype._writeCheck=function(){if(!this.init_done)throw new Error("write before init");if(this.mode===e.NONE)throw new Error("already finalized");if(this.write_in_progress)throw new Error("write already in progress");if(this.pending_close)throw new Error("close is pending")},i.prototype.write=function(e,n,r,i,o,a,s){this._writeCheck(),this.write_in_progress=!0;var h=this;return t.nextTick(function(){h.write_in_progress=!1;var t=h._write(e,n,r,i,o,a,s);h.callback(t[0],t[1]),h.pending_close&&h.close()}),this},i.prototype.writeSync=function(t,e,n,r,i,o,a){return this._writeCheck(),this._write(t,e,n,r,i,o,a)},i.prototype._write=function(t,n,i,a,s,c,l){if(this.write_in_progress=!0,t!==e.Z_NO_FLUSH&&t!==e.Z_PARTIAL_FLUSH&&t!==e.Z_SYNC_FLUSH&&t!==e.Z_FULL_FLUSH&&t!==e.Z_FINISH&&t!==e.Z_BLOCK)throw new Error("Invalid flush value");null==n&&(n=new r(0),a=0,i=0),s._set?s.set=s._set:s.set=o;var f=this.strm;switch(f.avail_in=a,f.input=n,f.next_in=i,f.avail_out=l,f.output=s,f.next_out=c,this.mode){case e.DEFLATE:case e.GZIP:case e.DEFLATERAW:var d=h.deflate(f,t);break;case e.UNZIP:case e.INFLATE:case e.GUNZIP:case e.INFLATERAW:var d=u.inflate(f,t);break;default:throw new Error("Unknown mode "+this.mode)}return d!==e.Z_STREAM_END&&d!==e.Z_OK&&this._error(d),this.write_in_progress=!1,[f.avail_in,f.avail_out]},i.prototype.close=function(){return this.write_in_progress?void(this.pending_close=!0):(this.pending_close=!1,this.mode===e.DEFLATE||this.mode===e.GZIP||this.mode===e.DEFLATERAW?h.deflateEnd(this.strm):u.inflateEnd(this.strm),void(this.mode=e.NONE))},i.prototype.reset=function(){switch(this.mode){case e.DEFLATE:case e.DEFLATERAW:var t=h.deflateReset(this.strm);break;case e.INFLATE:case e.INFLATERAW:var t=u.inflateReset(this.strm)}t!==e.Z_OK&&this._error(t)},i.prototype._error=function(t){this.onerror(a[t]+": "+this.strm.msg,t),this.write_in_progress=!1,this.pending_close&&this.close()},e.Zlib=i}).call(e,n(30),n(2).Buffer)},function(t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},function(t,e){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=n},function(t,e,n){
"use strict";function r(t,e){return t.msg=B[e],e}function i(t){return(t<<1)-(t>4?9:0)}function o(t){for(var e=t.length;--e>=0;)t[e]=0}function a(t){var e=t.state,n=e.pending;n>t.avail_out&&(n=t.avail_out),0!==n&&(A.arraySet(t.output,e.pending_buf,e.pending_out,n,t.next_out),t.next_out+=n,e.pending_out+=n,t.total_out+=n,t.avail_out-=n,e.pending-=n,0===e.pending&&(e.pending_out=0))}function s(t,e){L._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,a(t.strm)}function h(t,e){t.pending_buf[t.pending++]=e}function u(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function c(t,e,n,r){var i=t.avail_in;return i>r&&(i=r),0===i?0:(t.avail_in-=i,A.arraySet(e,t.input,t.next_in,i,n),1===t.state.wrap?t.adler=R(t.adler,e,i,n):2===t.state.wrap&&(t.adler=T(t.adler,e,i,n)),t.next_in+=i,t.total_in+=i,i)}function l(t,e){var n,r,i=t.max_chain_length,o=t.strstart,a=t.prev_length,s=t.nice_match,h=t.strstart>t.w_size-ut?t.strstart-(t.w_size-ut):0,u=t.window,c=t.w_mask,l=t.prev,f=t.strstart+ht,d=u[o+a-1],p=u[o+a];t.prev_length>=t.good_match&&(i>>=2),s>t.lookahead&&(s=t.lookahead);do if(n=e,u[n+a]===p&&u[n+a-1]===d&&u[n]===u[o]&&u[++n]===u[o+1]){o+=2,n++;do;while(u[++o]===u[++n]&&u[++o]===u[++n]&&u[++o]===u[++n]&&u[++o]===u[++n]&&u[++o]===u[++n]&&u[++o]===u[++n]&&u[++o]===u[++n]&&u[++o]===u[++n]&&f>o);if(r=ht-(f-o),o=f-ht,r>a){if(t.match_start=e,a=r,r>=s)break;d=u[o+a-1],p=u[o+a]}}while((e=l[e&c])>h&&0!==--i);return a<=t.lookahead?a:t.lookahead}function f(t){var e,n,r,i,o,a=t.w_size;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=a+(a-ut)){A.arraySet(t.window,t.window,a,a,0),t.match_start-=a,t.strstart-=a,t.block_start-=a,n=t.hash_size,e=n;do r=t.head[--e],t.head[e]=r>=a?r-a:0;while(--n);n=a,e=n;do r=t.prev[--e],t.prev[e]=r>=a?r-a:0;while(--n);i+=a}if(0===t.strm.avail_in)break;if(n=c(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=n,t.lookahead+t.insert>=st)for(o=t.strstart-t.insert,t.ins_h=t.window[o],t.ins_h=(t.ins_h<<t.hash_shift^t.window[o+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[o+st-1])&t.hash_mask,t.prev[o&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=o,o++,t.insert--,!(t.lookahead+t.insert<st)););}while(t.lookahead<ut&&0!==t.strm.avail_in)}function d(t,e){var n=65535;for(n>t.pending_buf_size-5&&(n=t.pending_buf_size-5);;){if(t.lookahead<=1){if(f(t),0===t.lookahead&&e===O)return yt;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var r=t.block_start+n;if((0===t.strstart||t.strstart>=r)&&(t.lookahead=t.strstart-r,t.strstart=r,s(t,!1),0===t.strm.avail_out))return yt;if(t.strstart-t.block_start>=t.w_size-ut&&(s(t,!1),0===t.strm.avail_out))return yt}return t.insert=0,e===U?(s(t,!0),0===t.strm.avail_out?wt:bt):t.strstart>t.block_start&&(s(t,!1),0===t.strm.avail_out)?yt:yt}function p(t,e){for(var n,r;;){if(t.lookahead<ut){if(f(t),t.lookahead<ut&&e===O)return yt;if(0===t.lookahead)break}if(n=0,t.lookahead>=st&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+st-1])&t.hash_mask,n=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==n&&t.strstart-n<=t.w_size-ut&&(t.match_length=l(t,n)),t.match_length>=st)if(r=L._tr_tally(t,t.strstart-t.match_start,t.match_length-st),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=st){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+st-1])&t.hash_mask,n=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else r=L._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(r&&(s(t,!1),0===t.strm.avail_out))return yt}return t.insert=t.strstart<st-1?t.strstart:st-1,e===U?(s(t,!0),0===t.strm.avail_out?wt:bt):t.last_lit&&(s(t,!1),0===t.strm.avail_out)?yt:_t}function g(t,e){for(var n,r,i;;){if(t.lookahead<ut){if(f(t),t.lookahead<ut&&e===O)return yt;if(0===t.lookahead)break}if(n=0,t.lookahead>=st&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+st-1])&t.hash_mask,n=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=st-1,0!==n&&t.prev_length<t.max_lazy_match&&t.strstart-n<=t.w_size-ut&&(t.match_length=l(t,n),t.match_length<=5&&(t.strategy===Z||t.match_length===st&&t.strstart-t.match_start>4096)&&(t.match_length=st-1)),t.prev_length>=st&&t.match_length<=t.prev_length){i=t.strstart+t.lookahead-st,r=L._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-st),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=i&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+st-1])&t.hash_mask,n=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=st-1,t.strstart++,r&&(s(t,!1),0===t.strm.avail_out))return yt}else if(t.match_available){if(r=L._tr_tally(t,0,t.window[t.strstart-1]),r&&s(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return yt}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(r=L._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<st-1?t.strstart:st-1,e===U?(s(t,!0),0===t.strm.avail_out?wt:bt):t.last_lit&&(s(t,!1),0===t.strm.avail_out)?yt:_t}function v(t,e){for(var n,r,i,o,a=t.window;;){if(t.lookahead<=ht){if(f(t),t.lookahead<=ht&&e===O)return yt;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=st&&t.strstart>0&&(i=t.strstart-1,r=a[i],r===a[++i]&&r===a[++i]&&r===a[++i])){o=t.strstart+ht;do;while(r===a[++i]&&r===a[++i]&&r===a[++i]&&r===a[++i]&&r===a[++i]&&r===a[++i]&&r===a[++i]&&r===a[++i]&&o>i);t.match_length=ht-(o-i),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=st?(n=L._tr_tally(t,1,t.match_length-st),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(n=L._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),n&&(s(t,!1),0===t.strm.avail_out))return yt}return t.insert=0,e===U?(s(t,!0),0===t.strm.avail_out?wt:bt):t.last_lit&&(s(t,!1),0===t.strm.avail_out)?yt:_t}function m(t,e){for(var n;;){if(0===t.lookahead&&(f(t),0===t.lookahead)){if(e===O)return yt;break}if(t.match_length=0,n=L._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,n&&(s(t,!1),0===t.strm.avail_out))return yt}return t.insert=0,e===U?(s(t,!0),0===t.strm.avail_out?wt:bt):t.last_lit&&(s(t,!1),0===t.strm.avail_out)?yt:_t}function y(t){t.window_size=2*t.w_size,o(t.head),t.max_lazy_match=I[t.level].max_lazy,t.good_match=I[t.level].good_length,t.nice_match=I[t.level].nice_length,t.max_chain_length=I[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=st-1,t.match_available=0,t.ins_h=0}function _(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=V,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new A.Buf16(2*ot),this.dyn_dtree=new A.Buf16(2*(2*rt+1)),this.bl_tree=new A.Buf16(2*(2*it+1)),o(this.dyn_ltree),o(this.dyn_dtree),o(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new A.Buf16(at+1),this.heap=new A.Buf16(2*nt+1),o(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new A.Buf16(2*nt+1),o(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function w(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=X,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?lt:vt,t.adler=2===e.wrap?0:1,e.last_flush=O,L._tr_init(e),z):r(t,W)}function b(t){var e=w(t);return e===z&&y(t.state),e}function x(t,e){return t&&t.state?2!==t.state.wrap?W:(t.state.gzhead=e,z):W}function S(t,e,n,i,o,a){if(!t)return W;var s=1;if(e===H&&(e=6),0>i?(s=0,i=-i):i>15&&(s=2,i-=16),1>o||o>$||n!==V||8>i||i>15||0>e||e>9||0>a||a>q)return r(t,W);8===i&&(i=9);var h=new _;return t.state=h,h.strm=t,h.wrap=s,h.gzhead=null,h.w_bits=i,h.w_size=1<<h.w_bits,h.w_mask=h.w_size-1,h.hash_bits=o+7,h.hash_size=1<<h.hash_bits,h.hash_mask=h.hash_size-1,h.hash_shift=~~((h.hash_bits+st-1)/st),h.window=new A.Buf8(2*h.w_size),h.head=new A.Buf16(h.hash_size),h.prev=new A.Buf16(h.w_size),h.lit_bufsize=1<<o+6,h.pending_buf_size=4*h.lit_bufsize,h.pending_buf=new A.Buf8(h.pending_buf_size),h.d_buf=h.lit_bufsize>>1,h.l_buf=3*h.lit_bufsize,h.level=e,h.strategy=a,h.method=n,b(t)}function k(t,e){return S(t,e,V,J,Q,K)}function E(t,e){var n,s,c,l;if(!t||!t.state||e>P||0>e)return t?r(t,W):W;if(s=t.state,!t.output||!t.input&&0!==t.avail_in||s.status===mt&&e!==U)return r(t,0===t.avail_out?j:W);if(s.strm=t,n=s.last_flush,s.last_flush=e,s.status===lt)if(2===s.wrap)t.adler=0,h(s,31),h(s,139),h(s,8),s.gzhead?(h(s,(s.gzhead.text?1:0)+(s.gzhead.hcrc?2:0)+(s.gzhead.extra?4:0)+(s.gzhead.name?8:0)+(s.gzhead.comment?16:0)),h(s,255&s.gzhead.time),h(s,s.gzhead.time>>8&255),h(s,s.gzhead.time>>16&255),h(s,s.gzhead.time>>24&255),h(s,9===s.level?2:s.strategy>=G||s.level<2?4:0),h(s,255&s.gzhead.os),s.gzhead.extra&&s.gzhead.extra.length&&(h(s,255&s.gzhead.extra.length),h(s,s.gzhead.extra.length>>8&255)),s.gzhead.hcrc&&(t.adler=T(t.adler,s.pending_buf,s.pending,0)),s.gzindex=0,s.status=ft):(h(s,0),h(s,0),h(s,0),h(s,0),h(s,0),h(s,9===s.level?2:s.strategy>=G||s.level<2?4:0),h(s,xt),s.status=vt);else{var f=V+(s.w_bits-8<<4)<<8,d=-1;d=s.strategy>=G||s.level<2?0:s.level<6?1:6===s.level?2:3,f|=d<<6,0!==s.strstart&&(f|=ct),f+=31-f%31,s.status=vt,u(s,f),0!==s.strstart&&(u(s,t.adler>>>16),u(s,65535&t.adler)),t.adler=1}if(s.status===ft)if(s.gzhead.extra){for(c=s.pending;s.gzindex<(65535&s.gzhead.extra.length)&&(s.pending!==s.pending_buf_size||(s.gzhead.hcrc&&s.pending>c&&(t.adler=T(t.adler,s.pending_buf,s.pending-c,c)),a(t),c=s.pending,s.pending!==s.pending_buf_size));)h(s,255&s.gzhead.extra[s.gzindex]),s.gzindex++;s.gzhead.hcrc&&s.pending>c&&(t.adler=T(t.adler,s.pending_buf,s.pending-c,c)),s.gzindex===s.gzhead.extra.length&&(s.gzindex=0,s.status=dt)}else s.status=dt;if(s.status===dt)if(s.gzhead.name){c=s.pending;do{if(s.pending===s.pending_buf_size&&(s.gzhead.hcrc&&s.pending>c&&(t.adler=T(t.adler,s.pending_buf,s.pending-c,c)),a(t),c=s.pending,s.pending===s.pending_buf_size)){l=1;break}l=s.gzindex<s.gzhead.name.length?255&s.gzhead.name.charCodeAt(s.gzindex++):0,h(s,l)}while(0!==l);s.gzhead.hcrc&&s.pending>c&&(t.adler=T(t.adler,s.pending_buf,s.pending-c,c)),0===l&&(s.gzindex=0,s.status=pt)}else s.status=pt;if(s.status===pt)if(s.gzhead.comment){c=s.pending;do{if(s.pending===s.pending_buf_size&&(s.gzhead.hcrc&&s.pending>c&&(t.adler=T(t.adler,s.pending_buf,s.pending-c,c)),a(t),c=s.pending,s.pending===s.pending_buf_size)){l=1;break}l=s.gzindex<s.gzhead.comment.length?255&s.gzhead.comment.charCodeAt(s.gzindex++):0,h(s,l)}while(0!==l);s.gzhead.hcrc&&s.pending>c&&(t.adler=T(t.adler,s.pending_buf,s.pending-c,c)),0===l&&(s.status=gt)}else s.status=gt;if(s.status===gt&&(s.gzhead.hcrc?(s.pending+2>s.pending_buf_size&&a(t),s.pending+2<=s.pending_buf_size&&(h(s,255&t.adler),h(s,t.adler>>8&255),t.adler=0,s.status=vt)):s.status=vt),0!==s.pending){if(a(t),0===t.avail_out)return s.last_flush=-1,z}else if(0===t.avail_in&&i(e)<=i(n)&&e!==U)return r(t,j);if(s.status===mt&&0!==t.avail_in)return r(t,j);if(0!==t.avail_in||0!==s.lookahead||e!==O&&s.status!==mt){var p=s.strategy===G?m(s,e):s.strategy===Y?v(s,e):I[s.level].func(s,e);if((p===wt||p===bt)&&(s.status=mt),p===yt||p===wt)return 0===t.avail_out&&(s.last_flush=-1),z;if(p===_t&&(e===M?L._tr_align(s):e!==P&&(L._tr_stored_block(s,0,0,!1),e===D&&(o(s.head),0===s.lookahead&&(s.strstart=0,s.block_start=0,s.insert=0))),a(t),0===t.avail_out))return s.last_flush=-1,z}return e!==U?z:s.wrap<=0?F:(2===s.wrap?(h(s,255&t.adler),h(s,t.adler>>8&255),h(s,t.adler>>16&255),h(s,t.adler>>24&255),h(s,255&t.total_in),h(s,t.total_in>>8&255),h(s,t.total_in>>16&255),h(s,t.total_in>>24&255)):(u(s,t.adler>>>16),u(s,65535&t.adler)),a(t),s.wrap>0&&(s.wrap=-s.wrap),0!==s.pending?z:F)}function C(t){var e;return t&&t.state?(e=t.state.status,e!==lt&&e!==ft&&e!==dt&&e!==pt&&e!==gt&&e!==vt&&e!==mt?r(t,W):(t.state=null,e===vt?r(t,N):z)):W}var I,A=n(52),L=n(53),R=n(54),T=n(55),B=n(49),O=0,M=1,D=3,U=4,P=5,z=0,F=1,W=-2,N=-3,j=-5,H=-1,Z=1,G=2,Y=3,q=4,K=0,X=2,V=8,$=9,J=15,Q=8,tt=29,et=256,nt=et+1+tt,rt=30,it=19,ot=2*nt+1,at=15,st=3,ht=258,ut=ht+st+1,ct=32,lt=42,ft=69,dt=73,pt=91,gt=103,vt=113,mt=666,yt=1,_t=2,wt=3,bt=4,xt=3,St=function(t,e,n,r,i){this.good_length=t,this.max_lazy=e,this.nice_length=n,this.max_chain=r,this.func=i};I=[new St(0,0,0,0,d),new St(4,4,8,4,p),new St(4,5,16,8,p),new St(4,6,32,32,p),new St(4,4,16,16,g),new St(8,16,32,32,g),new St(8,16,128,128,g),new St(8,32,128,256,g),new St(32,128,258,1024,g),new St(32,258,258,4096,g)],e.deflateInit=k,e.deflateInit2=S,e.deflateReset=b,e.deflateResetKeep=w,e.deflateSetHeader=x,e.deflate=E,e.deflateEnd=C,e.deflateInfo="pako deflate (from Nodeca project)"},function(t,e){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;e.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var n=e.shift();if(n){if("object"!=typeof n)throw new TypeError(n+"must be non-object");for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])}}return t},e.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var r={arraySet:function(t,e,n,r,i){if(e.subarray&&t.subarray)return void t.set(e.subarray(n,n+r),i);for(var o=0;r>o;o++)t[i+o]=e[n+o]},flattenChunks:function(t){var e,n,r,i,o,a;for(r=0,e=0,n=t.length;n>e;e++)r+=t[e].length;for(a=new Uint8Array(r),i=0,e=0,n=t.length;n>e;e++)o=t[e],a.set(o,i),i+=o.length;return a}},i={arraySet:function(t,e,n,r,i){for(var o=0;r>o;o++)t[i+o]=e[n+o]},flattenChunks:function(t){return[].concat.apply([],t)}};e.setTyped=function(t){t?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,r)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,i))},e.setTyped(n)},function(t,e,n){"use strict";function r(t){for(var e=t.length;--e>=0;)t[e]=0}function i(t){return 256>t?at[t]:at[256+(t>>>7)]}function o(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function a(t,e,n){t.bi_valid>q-n?(t.bi_buf|=e<<t.bi_valid&65535,o(t,t.bi_buf),t.bi_buf=e>>q-t.bi_valid,t.bi_valid+=n-q):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=n)}function s(t,e,n){a(t,n[2*e],n[2*e+1])}function h(t,e){var n=0;do n|=1&t,t>>>=1,n<<=1;while(--e>0);return n>>>1}function u(t){16===t.bi_valid?(o(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}function c(t,e){var n,r,i,o,a,s,h=e.dyn_tree,u=e.max_code,c=e.stat_desc.static_tree,l=e.stat_desc.has_stree,f=e.stat_desc.extra_bits,d=e.stat_desc.extra_base,p=e.stat_desc.max_length,g=0;for(o=0;Y>=o;o++)t.bl_count[o]=0;for(h[2*t.heap[t.heap_max]+1]=0,n=t.heap_max+1;G>n;n++)r=t.heap[n],o=h[2*h[2*r+1]+1]+1,o>p&&(o=p,g++),h[2*r+1]=o,r>u||(t.bl_count[o]++,a=0,r>=d&&(a=f[r-d]),s=h[2*r],t.opt_len+=s*(o+a),l&&(t.static_len+=s*(c[2*r+1]+a)));if(0!==g){do{for(o=p-1;0===t.bl_count[o];)o--;t.bl_count[o]--,t.bl_count[o+1]+=2,t.bl_count[p]--,g-=2}while(g>0);for(o=p;0!==o;o--)for(r=t.bl_count[o];0!==r;)i=t.heap[--n],i>u||(h[2*i+1]!==o&&(t.opt_len+=(o-h[2*i+1])*h[2*i],h[2*i+1]=o),r--)}}function l(t,e,n){var r,i,o=new Array(Y+1),a=0;for(r=1;Y>=r;r++)o[r]=a=a+n[r-1]<<1;for(i=0;e>=i;i++){var s=t[2*i+1];0!==s&&(t[2*i]=h(o[s]++,s))}}function f(){var t,e,n,r,i,o=new Array(Y+1);for(n=0,r=0;W-1>r;r++)for(ht[r]=n,t=0;t<1<<Q[r];t++)st[n++]=r;for(st[n-1]=r,i=0,r=0;16>r;r++)for(ut[r]=i,t=0;t<1<<tt[r];t++)at[i++]=r;for(i>>=7;H>r;r++)for(ut[r]=i<<7,t=0;t<1<<tt[r]-7;t++)at[256+i++]=r;for(e=0;Y>=e;e++)o[e]=0;for(t=0;143>=t;)it[2*t+1]=8,t++,o[8]++;for(;255>=t;)it[2*t+1]=9,t++,o[9]++;for(;279>=t;)it[2*t+1]=7,t++,o[7]++;for(;287>=t;)it[2*t+1]=8,t++,o[8]++;for(l(it,j+1,o),t=0;H>t;t++)ot[2*t+1]=5,ot[2*t]=h(t,5);ct=new dt(it,Q,N+1,j,Y),lt=new dt(ot,tt,0,H,Y),ft=new dt(new Array(0),et,0,Z,K)}function d(t){var e;for(e=0;j>e;e++)t.dyn_ltree[2*e]=0;for(e=0;H>e;e++)t.dyn_dtree[2*e]=0;for(e=0;Z>e;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*X]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function p(t){t.bi_valid>8?o(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function g(t,e,n,r){p(t),r&&(o(t,n),o(t,~n)),R.arraySet(t.pending_buf,t.window,e,n,t.pending),t.pending+=n}function v(t,e,n,r){var i=2*e,o=2*n;return t[i]<t[o]||t[i]===t[o]&&r[e]<=r[n]}function m(t,e,n){for(var r=t.heap[n],i=n<<1;i<=t.heap_len&&(i<t.heap_len&&v(e,t.heap[i+1],t.heap[i],t.depth)&&i++,!v(e,r,t.heap[i],t.depth));)t.heap[n]=t.heap[i],n=i,i<<=1;t.heap[n]=r}function y(t,e,n){var r,o,h,u,c=0;if(0!==t.last_lit)do r=t.pending_buf[t.d_buf+2*c]<<8|t.pending_buf[t.d_buf+2*c+1],o=t.pending_buf[t.l_buf+c],c++,0===r?s(t,o,e):(h=st[o],s(t,h+N+1,e),u=Q[h],0!==u&&(o-=ht[h],a(t,o,u)),r--,h=i(r),s(t,h,n),u=tt[h],0!==u&&(r-=ut[h],a(t,r,u)));while(c<t.last_lit);s(t,X,e)}function _(t,e){var n,r,i,o=e.dyn_tree,a=e.stat_desc.static_tree,s=e.stat_desc.has_stree,h=e.stat_desc.elems,u=-1;for(t.heap_len=0,t.heap_max=G,n=0;h>n;n++)0!==o[2*n]?(t.heap[++t.heap_len]=u=n,t.depth[n]=0):o[2*n+1]=0;for(;t.heap_len<2;)i=t.heap[++t.heap_len]=2>u?++u:0,o[2*i]=1,t.depth[i]=0,t.opt_len--,s&&(t.static_len-=a[2*i+1]);for(e.max_code=u,n=t.heap_len>>1;n>=1;n--)m(t,o,n);i=h;do n=t.heap[1],t.heap[1]=t.heap[t.heap_len--],m(t,o,1),r=t.heap[1],t.heap[--t.heap_max]=n,t.heap[--t.heap_max]=r,o[2*i]=o[2*n]+o[2*r],t.depth[i]=(t.depth[n]>=t.depth[r]?t.depth[n]:t.depth[r])+1,o[2*n+1]=o[2*r+1]=i,t.heap[1]=i++,m(t,o,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],c(t,e),l(o,u,t.bl_count)}function w(t,e,n){var r,i,o=-1,a=e[1],s=0,h=7,u=4;for(0===a&&(h=138,u=3),e[2*(n+1)+1]=65535,r=0;n>=r;r++)i=a,a=e[2*(r+1)+1],++s<h&&i===a||(u>s?t.bl_tree[2*i]+=s:0!==i?(i!==o&&t.bl_tree[2*i]++,t.bl_tree[2*V]++):10>=s?t.bl_tree[2*$]++:t.bl_tree[2*J]++,s=0,o=i,0===a?(h=138,u=3):i===a?(h=6,u=3):(h=7,u=4))}function b(t,e,n){var r,i,o=-1,h=e[1],u=0,c=7,l=4;for(0===h&&(c=138,l=3),r=0;n>=r;r++)if(i=h,h=e[2*(r+1)+1],!(++u<c&&i===h)){if(l>u){do s(t,i,t.bl_tree);while(0!==--u)}else 0!==i?(i!==o&&(s(t,i,t.bl_tree),u--),s(t,V,t.bl_tree),a(t,u-3,2)):10>=u?(s(t,$,t.bl_tree),a(t,u-3,3)):(s(t,J,t.bl_tree),a(t,u-11,7));u=0,o=i,0===h?(c=138,l=3):i===h?(c=6,l=3):(c=7,l=4)}}function x(t){var e;for(w(t,t.dyn_ltree,t.l_desc.max_code),w(t,t.dyn_dtree,t.d_desc.max_code),_(t,t.bl_desc),e=Z-1;e>=3&&0===t.bl_tree[2*nt[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}function S(t,e,n,r){var i;for(a(t,e-257,5),a(t,n-1,5),a(t,r-4,4),i=0;r>i;i++)a(t,t.bl_tree[2*nt[i]+1],3);b(t,t.dyn_ltree,e-1),b(t,t.dyn_dtree,n-1)}function k(t){var e,n=4093624447;for(e=0;31>=e;e++,n>>>=1)if(1&n&&0!==t.dyn_ltree[2*e])return B;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return O;for(e=32;N>e;e++)if(0!==t.dyn_ltree[2*e])return O;return B}function E(t){gt||(f(),gt=!0),t.l_desc=new pt(t.dyn_ltree,ct),t.d_desc=new pt(t.dyn_dtree,lt),t.bl_desc=new pt(t.bl_tree,ft),t.bi_buf=0,t.bi_valid=0,d(t)}function C(t,e,n,r){a(t,(D<<1)+(r?1:0),3),g(t,e,n,!0)}function I(t){a(t,U<<1,3),s(t,X,it),u(t)}function A(t,e,n,r){var i,o,s=0;t.level>0?(t.strm.data_type===M&&(t.strm.data_type=k(t)),_(t,t.l_desc),_(t,t.d_desc),s=x(t),i=t.opt_len+3+7>>>3,o=t.static_len+3+7>>>3,i>=o&&(i=o)):i=o=n+5,i>=n+4&&-1!==e?C(t,e,n,r):t.strategy===T||o===i?(a(t,(U<<1)+(r?1:0),3),y(t,it,ot)):(a(t,(P<<1)+(r?1:0),3),S(t,t.l_desc.max_code+1,t.d_desc.max_code+1,s+1),y(t,t.dyn_ltree,t.dyn_dtree)),d(t),r&&p(t)}function L(t,e,n){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&n,t.last_lit++,0===e?t.dyn_ltree[2*n]++:(t.matches++,e--,t.dyn_ltree[2*(st[n]+N+1)]++,t.dyn_dtree[2*i(e)]++),t.last_lit===t.lit_bufsize-1}var R=n(52),T=4,B=0,O=1,M=2,D=0,U=1,P=2,z=3,F=258,W=29,N=256,j=N+1+W,H=30,Z=19,G=2*j+1,Y=15,q=16,K=7,X=256,V=16,$=17,J=18,Q=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],tt=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],et=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],nt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],rt=512,it=new Array(2*(j+2));r(it);var ot=new Array(2*H);r(ot);var at=new Array(rt);r(at);var st=new Array(F-z+1);r(st);var ht=new Array(W);r(ht);var ut=new Array(H);r(ut);var ct,lt,ft,dt=function(t,e,n,r,i){this.static_tree=t,this.extra_bits=e,this.extra_base=n,this.elems=r,this.max_length=i,this.has_stree=t&&t.length},pt=function(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e},gt=!1;e._tr_init=E,e._tr_stored_block=C,e._tr_flush_block=A,e._tr_tally=L,e._tr_align=I},function(t,e){"use strict";function n(t,e,n,r){for(var i=65535&t|0,o=t>>>16&65535|0,a=0;0!==n;){a=n>2e3?2e3:n,n-=a;do i=i+e[r++]|0,o=o+i|0;while(--a);i%=65521,o%=65521}return i|o<<16|0}t.exports=n},function(t,e){"use strict";function n(){for(var t,e=[],n=0;256>n;n++){t=n;for(var r=0;8>r;r++)t=1&t?3988292384^t>>>1:t>>>1;e[n]=t}return e}function r(t,e,n,r){var o=i,a=r+n;t=-1^t;for(var s=r;a>s;s++)t=t>>>8^o[255&(t^e[s])];return-1^t}var i=n();t.exports=r},function(t,e,n){"use strict";function r(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function i(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new m.Buf16(320),this.work=new m.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function o(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=U,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new m.Buf32(pt),e.distcode=e.distdyn=new m.Buf32(gt),e.sane=1,e.back=-1,A):T}function a(t){var e;return t&&t.state?(e=t.state,e.wsize=0,e.whave=0,e.wnext=0,o(t)):T}function s(t,e){var n,r;return t&&t.state?(r=t.state,0>e?(n=0,e=-e):(n=(e>>4)+1,48>e&&(e&=15)),e&&(8>e||e>15)?T:(null!==r.window&&r.wbits!==e&&(r.window=null),r.wrap=n,r.wbits=e,a(t))):T}function h(t,e){var n,r;return t?(r=new i,t.state=r,r.window=null,n=s(t,e),n!==A&&(t.state=null),n):T}function u(t){return h(t,mt)}function c(t){if(yt){var e;for(g=new m.Buf32(512),v=new m.Buf32(32),e=0;144>e;)t.lens[e++]=8;for(;256>e;)t.lens[e++]=9;for(;280>e;)t.lens[e++]=7;for(;288>e;)t.lens[e++]=8;for(b(S,t.lens,0,288,g,0,t.work,{bits:9}),e=0;32>e;)t.lens[e++]=5;b(k,t.lens,0,32,v,0,t.work,{bits:5}),yt=!1}t.lencode=g,t.lenbits=9,t.distcode=v,t.distbits=5}function l(t,e,n,r){var i,o=t.state;return null===o.window&&(o.wsize=1<<o.wbits,o.wnext=0,o.whave=0,o.window=new m.Buf8(o.wsize)),r>=o.wsize?(m.arraySet(o.window,e,n-o.wsize,o.wsize,0),o.wnext=0,o.whave=o.wsize):(i=o.wsize-o.wnext,i>r&&(i=r),m.arraySet(o.window,e,n-r,i,o.wnext),r-=i,r?(m.arraySet(o.window,e,n-r,r,0),o.wnext=r,o.whave=o.wsize):(o.wnext+=i,o.wnext===o.wsize&&(o.wnext=0),o.whave<o.wsize&&(o.whave+=i))),0}function f(t,e){var n,i,o,a,s,h,u,f,d,p,g,v,pt,gt,vt,mt,yt,_t,wt,bt,xt,St,kt,Et,Ct=0,It=new m.Buf8(4),At=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return T;n=t.state,n.mode===q&&(n.mode=K),s=t.next_out,o=t.output,u=t.avail_out,a=t.next_in,i=t.input,h=t.avail_in,f=n.hold,d=n.bits,p=h,g=u,St=A;t:for(;;)switch(n.mode){case U:if(0===n.wrap){n.mode=K;break}for(;16>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(2&n.wrap&&35615===f){n.check=0,It[0]=255&f,It[1]=f>>>8&255,n.check=_(n.check,It,2,0),f=0,d=0,n.mode=P;break}if(n.flags=0,n.head&&(n.head.done=!1),!(1&n.wrap)||(((255&f)<<8)+(f>>8))%31){t.msg="incorrect header check",n.mode=lt;break}if((15&f)!==D){t.msg="unknown compression method",n.mode=lt;break}if(f>>>=4,d-=4,xt=(15&f)+8,0===n.wbits)n.wbits=xt;else if(xt>n.wbits){t.msg="invalid window size",n.mode=lt;break}n.dmax=1<<xt,t.adler=n.check=1,n.mode=512&f?G:q,f=0,d=0;break;case P:for(;16>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(n.flags=f,(255&n.flags)!==D){t.msg="unknown compression method",n.mode=lt;break}if(57344&n.flags){t.msg="unknown header flags set",n.mode=lt;break}n.head&&(n.head.text=f>>8&1),512&n.flags&&(It[0]=255&f,It[1]=f>>>8&255,n.check=_(n.check,It,2,0)),f=0,d=0,n.mode=z;case z:for(;32>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}n.head&&(n.head.time=f),512&n.flags&&(It[0]=255&f,It[1]=f>>>8&255,It[2]=f>>>16&255,It[3]=f>>>24&255,n.check=_(n.check,It,4,0)),f=0,d=0,n.mode=F;case F:for(;16>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}n.head&&(n.head.xflags=255&f,n.head.os=f>>8),512&n.flags&&(It[0]=255&f,It[1]=f>>>8&255,n.check=_(n.check,It,2,0)),f=0,d=0,n.mode=W;case W:if(1024&n.flags){for(;16>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}n.length=f,n.head&&(n.head.extra_len=f),512&n.flags&&(It[0]=255&f,It[1]=f>>>8&255,n.check=_(n.check,It,2,0)),f=0,d=0}else n.head&&(n.head.extra=null);n.mode=N;case N:if(1024&n.flags&&(v=n.length,v>h&&(v=h),v&&(n.head&&(xt=n.head.extra_len-n.length,n.head.extra||(n.head.extra=new Array(n.head.extra_len)),m.arraySet(n.head.extra,i,a,v,xt)),512&n.flags&&(n.check=_(n.check,i,v,a)),h-=v,a+=v,n.length-=v),n.length))break t;n.length=0,n.mode=j;case j:if(2048&n.flags){if(0===h)break t;v=0;do xt=i[a+v++],n.head&&xt&&n.length<65536&&(n.head.name+=String.fromCharCode(xt));while(xt&&h>v);if(512&n.flags&&(n.check=_(n.check,i,v,a)),h-=v,a+=v,xt)break t}else n.head&&(n.head.name=null);n.length=0,n.mode=H;case H:if(4096&n.flags){if(0===h)break t;v=0;do xt=i[a+v++],n.head&&xt&&n.length<65536&&(n.head.comment+=String.fromCharCode(xt));while(xt&&h>v);if(512&n.flags&&(n.check=_(n.check,i,v,a)),h-=v,a+=v,xt)break t}else n.head&&(n.head.comment=null);n.mode=Z;case Z:if(512&n.flags){for(;16>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(f!==(65535&n.check)){t.msg="header crc mismatch",n.mode=lt;break}f=0,d=0}n.head&&(n.head.hcrc=n.flags>>9&1,n.head.done=!0),t.adler=n.check=0,n.mode=q;break;case G:for(;32>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}t.adler=n.check=r(f),f=0,d=0,n.mode=Y;case Y:if(0===n.havedict)return t.next_out=s,t.avail_out=u,t.next_in=a,t.avail_in=h,n.hold=f,n.bits=d,R;t.adler=n.check=1,n.mode=q;case q:if(e===C||e===I)break t;case K:if(n.last){f>>>=7&d,d-=7&d,n.mode=ht;break}for(;3>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}switch(n.last=1&f,f>>>=1,d-=1,3&f){case 0:n.mode=X;break;case 1:if(c(n),n.mode=et,e===I){f>>>=2,d-=2;break t}break;case 2:n.mode=J;break;case 3:t.msg="invalid block type",n.mode=lt}f>>>=2,d-=2;break;case X:for(f>>>=7&d,d-=7&d;32>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if((65535&f)!==(f>>>16^65535)){t.msg="invalid stored block lengths",n.mode=lt;break}if(n.length=65535&f,f=0,d=0,n.mode=V,e===I)break t;case V:n.mode=$;case $:if(v=n.length){if(v>h&&(v=h),v>u&&(v=u),0===v)break t;m.arraySet(o,i,a,v,s),h-=v,a+=v,u-=v,s+=v,n.length-=v;break}n.mode=q;break;case J:for(;14>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(n.nlen=(31&f)+257,f>>>=5,d-=5,n.ndist=(31&f)+1,f>>>=5,d-=5,n.ncode=(15&f)+4,f>>>=4,d-=4,n.nlen>286||n.ndist>30){t.msg="too many length or distance symbols",n.mode=lt;break}n.have=0,n.mode=Q;case Q:for(;n.have<n.ncode;){for(;3>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}n.lens[At[n.have++]]=7&f,f>>>=3,d-=3}for(;n.have<19;)n.lens[At[n.have++]]=0;if(n.lencode=n.lendyn,n.lenbits=7,kt={bits:n.lenbits},St=b(x,n.lens,0,19,n.lencode,0,n.work,kt),n.lenbits=kt.bits,St){t.msg="invalid code lengths set",n.mode=lt;break}n.have=0,n.mode=tt;case tt:for(;n.have<n.nlen+n.ndist;){for(;Ct=n.lencode[f&(1<<n.lenbits)-1],vt=Ct>>>24,mt=Ct>>>16&255,yt=65535&Ct,!(d>=vt);){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(16>yt)f>>>=vt,d-=vt,n.lens[n.have++]=yt;else{if(16===yt){for(Et=vt+2;Et>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(f>>>=vt,d-=vt,0===n.have){t.msg="invalid bit length repeat",n.mode=lt;break}xt=n.lens[n.have-1],v=3+(3&f),f>>>=2,d-=2}else if(17===yt){for(Et=vt+3;Et>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}f>>>=vt,d-=vt,xt=0,v=3+(7&f),f>>>=3,d-=3}else{for(Et=vt+7;Et>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}f>>>=vt,d-=vt,xt=0,v=11+(127&f),f>>>=7,d-=7}if(n.have+v>n.nlen+n.ndist){t.msg="invalid bit length repeat",n.mode=lt;break}for(;v--;)n.lens[n.have++]=xt}}if(n.mode===lt)break;if(0===n.lens[256]){t.msg="invalid code -- missing end-of-block",n.mode=lt;break}if(n.lenbits=9,kt={bits:n.lenbits},St=b(S,n.lens,0,n.nlen,n.lencode,0,n.work,kt),n.lenbits=kt.bits,St){t.msg="invalid literal/lengths set",n.mode=lt;break}if(n.distbits=6,n.distcode=n.distdyn,kt={bits:n.distbits},St=b(k,n.lens,n.nlen,n.ndist,n.distcode,0,n.work,kt),n.distbits=kt.bits,St){t.msg="invalid distances set",n.mode=lt;break}if(n.mode=et,e===I)break t;case et:n.mode=nt;case nt:if(h>=6&&u>=258){t.next_out=s,t.avail_out=u,t.next_in=a,t.avail_in=h,n.hold=f,n.bits=d,w(t,g),s=t.next_out,o=t.output,u=t.avail_out,a=t.next_in,i=t.input,h=t.avail_in,f=n.hold,d=n.bits,n.mode===q&&(n.back=-1);break}for(n.back=0;Ct=n.lencode[f&(1<<n.lenbits)-1],vt=Ct>>>24,mt=Ct>>>16&255,yt=65535&Ct,!(d>=vt);){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(mt&&0===(240&mt)){for(_t=vt,wt=mt,bt=yt;Ct=n.lencode[bt+((f&(1<<_t+wt)-1)>>_t)],vt=Ct>>>24,mt=Ct>>>16&255,yt=65535&Ct,!(d>=_t+vt);){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}f>>>=_t,d-=_t,n.back+=_t}if(f>>>=vt,d-=vt,n.back+=vt,n.length=yt,0===mt){n.mode=st;break}if(32&mt){n.back=-1,n.mode=q;break}if(64&mt){t.msg="invalid literal/length code",n.mode=lt;break}n.extra=15&mt,n.mode=rt;case rt:if(n.extra){for(Et=n.extra;Et>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}n.length+=f&(1<<n.extra)-1,f>>>=n.extra,d-=n.extra,n.back+=n.extra}n.was=n.length,n.mode=it;case it:for(;Ct=n.distcode[f&(1<<n.distbits)-1],vt=Ct>>>24,mt=Ct>>>16&255,yt=65535&Ct,!(d>=vt);){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(0===(240&mt)){for(_t=vt,wt=mt,bt=yt;Ct=n.distcode[bt+((f&(1<<_t+wt)-1)>>_t)],vt=Ct>>>24,mt=Ct>>>16&255,yt=65535&Ct,!(d>=_t+vt);){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}f>>>=_t,d-=_t,n.back+=_t}if(f>>>=vt,d-=vt,n.back+=vt,64&mt){t.msg="invalid distance code",n.mode=lt;break}n.offset=yt,n.extra=15&mt,n.mode=ot;case ot:if(n.extra){for(Et=n.extra;Et>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}n.offset+=f&(1<<n.extra)-1,f>>>=n.extra,d-=n.extra,n.back+=n.extra}if(n.offset>n.dmax){t.msg="invalid distance too far back",n.mode=lt;break}n.mode=at;case at:if(0===u)break t;if(v=g-u,n.offset>v){if(v=n.offset-v,v>n.whave&&n.sane){t.msg="invalid distance too far back",n.mode=lt;break}v>n.wnext?(v-=n.wnext,pt=n.wsize-v):pt=n.wnext-v,v>n.length&&(v=n.length),gt=n.window}else gt=o,pt=s-n.offset,v=n.length;v>u&&(v=u),u-=v,n.length-=v;do o[s++]=gt[pt++];while(--v);0===n.length&&(n.mode=nt);break;case st:if(0===u)break t;o[s++]=n.length,u--,n.mode=nt;break;case ht:if(n.wrap){for(;32>d;){if(0===h)break t;h--,f|=i[a++]<<d,d+=8}if(g-=u,t.total_out+=g,n.total+=g,g&&(t.adler=n.check=n.flags?_(n.check,o,g,s-g):y(n.check,o,g,s-g)),g=u,(n.flags?f:r(f))!==n.check){t.msg="incorrect data check",n.mode=lt;break}f=0,d=0}n.mode=ut;case ut:if(n.wrap&&n.flags){for(;32>d;){if(0===h)break t;h--,f+=i[a++]<<d,d+=8}if(f!==(4294967295&n.total)){t.msg="incorrect length check",n.mode=lt;break}f=0,d=0}n.mode=ct;case ct:St=L;break t;case lt:St=B;break t;case ft:return O;case dt:default:return T}return t.next_out=s,t.avail_out=u,
t.next_in=a,t.avail_in=h,n.hold=f,n.bits=d,(n.wsize||g!==t.avail_out&&n.mode<lt&&(n.mode<ht||e!==E))&&l(t,t.output,t.next_out,g-t.avail_out)?(n.mode=ft,O):(p-=t.avail_in,g-=t.avail_out,t.total_in+=p,t.total_out+=g,n.total+=g,n.wrap&&g&&(t.adler=n.check=n.flags?_(n.check,o,g,t.next_out-g):y(n.check,o,g,t.next_out-g)),t.data_type=n.bits+(n.last?64:0)+(n.mode===q?128:0)+(n.mode===et||n.mode===V?256:0),(0===p&&0===g||e===E)&&St===A&&(St=M),St)}function d(t){if(!t||!t.state)return T;var e=t.state;return e.window&&(e.window=null),t.state=null,A}function p(t,e){var n;return t&&t.state?(n=t.state,0===(2&n.wrap)?T:(n.head=e,e.done=!1,A)):T}var g,v,m=n(52),y=n(54),_=n(55),w=n(57),b=n(58),x=0,S=1,k=2,E=4,C=5,I=6,A=0,L=1,R=2,T=-2,B=-3,O=-4,M=-5,D=8,U=1,P=2,z=3,F=4,W=5,N=6,j=7,H=8,Z=9,G=10,Y=11,q=12,K=13,X=14,V=15,$=16,J=17,Q=18,tt=19,et=20,nt=21,rt=22,it=23,ot=24,at=25,st=26,ht=27,ut=28,ct=29,lt=30,ft=31,dt=32,pt=852,gt=592,vt=15,mt=vt,yt=!0;e.inflateReset=a,e.inflateReset2=s,e.inflateResetKeep=o,e.inflateInit=u,e.inflateInit2=h,e.inflate=f,e.inflateEnd=d,e.inflateGetHeader=p,e.inflateInfo="pako inflate (from Nodeca project)"},function(t,e){"use strict";var n=30,r=12;t.exports=function(t,e){var i,o,a,s,h,u,c,l,f,d,p,g,v,m,y,_,w,b,x,S,k,E,C,I,A;i=t.state,o=t.next_in,I=t.input,a=o+(t.avail_in-5),s=t.next_out,A=t.output,h=s-(e-t.avail_out),u=s+(t.avail_out-257),c=i.dmax,l=i.wsize,f=i.whave,d=i.wnext,p=i.window,g=i.hold,v=i.bits,m=i.lencode,y=i.distcode,_=(1<<i.lenbits)-1,w=(1<<i.distbits)-1;t:do{15>v&&(g+=I[o++]<<v,v+=8,g+=I[o++]<<v,v+=8),b=m[g&_];e:for(;;){if(x=b>>>24,g>>>=x,v-=x,x=b>>>16&255,0===x)A[s++]=65535&b;else{if(!(16&x)){if(0===(64&x)){b=m[(65535&b)+(g&(1<<x)-1)];continue e}if(32&x){i.mode=r;break t}t.msg="invalid literal/length code",i.mode=n;break t}S=65535&b,x&=15,x&&(x>v&&(g+=I[o++]<<v,v+=8),S+=g&(1<<x)-1,g>>>=x,v-=x),15>v&&(g+=I[o++]<<v,v+=8,g+=I[o++]<<v,v+=8),b=y[g&w];n:for(;;){if(x=b>>>24,g>>>=x,v-=x,x=b>>>16&255,!(16&x)){if(0===(64&x)){b=y[(65535&b)+(g&(1<<x)-1)];continue n}t.msg="invalid distance code",i.mode=n;break t}if(k=65535&b,x&=15,x>v&&(g+=I[o++]<<v,v+=8,x>v&&(g+=I[o++]<<v,v+=8)),k+=g&(1<<x)-1,k>c){t.msg="invalid distance too far back",i.mode=n;break t}if(g>>>=x,v-=x,x=s-h,k>x){if(x=k-x,x>f&&i.sane){t.msg="invalid distance too far back",i.mode=n;break t}if(E=0,C=p,0===d){if(E+=l-x,S>x){S-=x;do A[s++]=p[E++];while(--x);E=s-k,C=A}}else if(x>d){if(E+=l+d-x,x-=d,S>x){S-=x;do A[s++]=p[E++];while(--x);if(E=0,S>d){x=d,S-=x;do A[s++]=p[E++];while(--x);E=s-k,C=A}}}else if(E+=d-x,S>x){S-=x;do A[s++]=p[E++];while(--x);E=s-k,C=A}for(;S>2;)A[s++]=C[E++],A[s++]=C[E++],A[s++]=C[E++],S-=3;S&&(A[s++]=C[E++],S>1&&(A[s++]=C[E++]))}else{E=s-k;do A[s++]=A[E++],A[s++]=A[E++],A[s++]=A[E++],S-=3;while(S>2);S&&(A[s++]=A[E++],S>1&&(A[s++]=A[E++]))}break}}break}}while(a>o&&u>s);S=v>>3,o-=S,v-=S<<3,g&=(1<<v)-1,t.next_in=o,t.next_out=s,t.avail_in=a>o?5+(a-o):5-(o-a),t.avail_out=u>s?257+(u-s):257-(s-u),i.hold=g,i.bits=v}},function(t,e,n){"use strict";var r=n(52),i=15,o=852,a=592,s=0,h=1,u=2,c=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],f=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(t,e,n,p,g,v,m,y){var _,w,b,x,S,k,E,C,I,A=y.bits,L=0,R=0,T=0,B=0,O=0,M=0,D=0,U=0,P=0,z=0,F=null,W=0,N=new r.Buf16(i+1),j=new r.Buf16(i+1),H=null,Z=0;for(L=0;i>=L;L++)N[L]=0;for(R=0;p>R;R++)N[e[n+R]]++;for(O=A,B=i;B>=1&&0===N[B];B--);if(O>B&&(O=B),0===B)return g[v++]=20971520,g[v++]=20971520,y.bits=1,0;for(T=1;B>T&&0===N[T];T++);for(T>O&&(O=T),U=1,L=1;i>=L;L++)if(U<<=1,U-=N[L],0>U)return-1;if(U>0&&(t===s||1!==B))return-1;for(j[1]=0,L=1;i>L;L++)j[L+1]=j[L]+N[L];for(R=0;p>R;R++)0!==e[n+R]&&(m[j[e[n+R]]++]=R);if(t===s?(F=H=m,k=19):t===h?(F=c,W-=257,H=l,Z-=257,k=256):(F=f,H=d,k=-1),z=0,R=0,L=T,S=v,M=O,D=0,b=-1,P=1<<O,x=P-1,t===h&&P>o||t===u&&P>a)return 1;for(var G=0;;){G++,E=L-D,m[R]<k?(C=0,I=m[R]):m[R]>k?(C=H[Z+m[R]],I=F[W+m[R]]):(C=96,I=0),_=1<<L-D,w=1<<M,T=w;do w-=_,g[S+(z>>D)+w]=E<<24|C<<16|I|0;while(0!==w);for(_=1<<L-1;z&_;)_>>=1;if(0!==_?(z&=_-1,z+=_):z=0,R++,0===--N[L]){if(L===B)break;L=e[n+m[R]]}if(L>O&&(z&x)!==b){for(0===D&&(D=O),S+=T,M=L-D,U=1<<M;B>M+D&&(U-=N[M+D],!(0>=U));)M++,U<<=1;if(P+=1<<M,t===h&&P>o||t===u&&P>a)return 1;b=z&x,g[b]=O<<24|M<<16|S-v|0}}return 0!==z&&(g[S+z]=L-D<<24|64<<16|0),y.bits=O,0}},function(t,e){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},function(t,e,n){(function(t,r){function i(t,n){var r={seen:[],stylize:a};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),g(n)?r.showHidden=n:n&&e._extend(r,n),b(r.showHidden)&&(r.showHidden=!1),b(r.depth)&&(r.depth=2),b(r.colors)&&(r.colors=!1),b(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=o),h(r,t,r.depth)}function o(t,e){var n=i.styles[e];return n?"["+i.colors[n][0]+"m"+t+"["+i.colors[n][1]+"m":t}function a(t,e){return t}function s(t){var e={};return t.forEach(function(t,n){e[t]=!0}),e}function h(t,n,r){if(t.customInspect&&n&&C(n.inspect)&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var i=n.inspect(r,t);return _(i)||(i=h(t,i,r)),i}var o=u(t,n);if(o)return o;var a=Object.keys(n),g=s(a);if(t.showHidden&&(a=Object.getOwnPropertyNames(n)),E(n)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return c(n);if(0===a.length){if(C(n)){var v=n.name?": "+n.name:"";return t.stylize("[Function"+v+"]","special")}if(x(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(k(n))return t.stylize(Date.prototype.toString.call(n),"date");if(E(n))return c(n)}var m="",y=!1,w=["{","}"];if(p(n)&&(y=!0,w=["[","]"]),C(n)){var b=n.name?": "+n.name:"";m=" [Function"+b+"]"}if(x(n)&&(m=" "+RegExp.prototype.toString.call(n)),k(n)&&(m=" "+Date.prototype.toUTCString.call(n)),E(n)&&(m=" "+c(n)),0===a.length&&(!y||0==n.length))return w[0]+m+w[1];if(0>r)return x(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special");t.seen.push(n);var S;return S=y?l(t,n,r,g,a):a.map(function(e){return f(t,n,r,g,e,y)}),t.seen.pop(),d(S,m,w)}function u(t,e){if(b(e))return t.stylize("undefined","undefined");if(_(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}return y(e)?t.stylize(""+e,"number"):g(e)?t.stylize(""+e,"boolean"):v(e)?t.stylize("null","null"):void 0}function c(t){return"["+Error.prototype.toString.call(t)+"]"}function l(t,e,n,r,i){for(var o=[],a=0,s=e.length;s>a;++a)L(e,String(a))?o.push(f(t,e,n,r,String(a),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(f(t,e,n,r,i,!0))}),o}function f(t,e,n,r,i,o){var a,s,u;if(u=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]},u.get?s=u.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):u.set&&(s=t.stylize("[Setter]","special")),L(r,i)||(a="["+i+"]"),s||(t.seen.indexOf(u.value)<0?(s=v(n)?h(t,u.value,null):h(t,u.value,n-1),s.indexOf("\n")>-1&&(s=o?s.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+s.split("\n").map(function(t){return"   "+t}).join("\n"))):s=t.stylize("[Circular]","special")),b(a)){if(o&&i.match(/^\d+$/))return s;a=JSON.stringify(""+i),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=t.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=t.stylize(a,"string"))}return a+": "+s}function d(t,e,n){var r=0,i=t.reduce(function(t,e){return r++,e.indexOf("\n")>=0&&r++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function p(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function v(t){return null===t}function m(t){return null==t}function y(t){return"number"==typeof t}function _(t){return"string"==typeof t}function w(t){return"symbol"==typeof t}function b(t){return void 0===t}function x(t){return S(t)&&"[object RegExp]"===A(t)}function S(t){return"object"==typeof t&&null!==t}function k(t){return S(t)&&"[object Date]"===A(t)}function E(t){return S(t)&&("[object Error]"===A(t)||t instanceof Error)}function C(t){return"function"==typeof t}function I(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function A(t){return Object.prototype.toString.call(t)}function L(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var R=/%[sdj%]/g;e.format=function(t){if(!_(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(i(arguments[n]));return e.join(" ")}for(var n=1,r=arguments,o=r.length,a=String(t).replace(R,function(t){if("%%"===t)return"%";if(n>=o)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return t}}),s=r[n];o>n;s=r[++n])a+=v(s)||!S(s)?" "+s:" "+i(s);return a},e.deprecate=function(n,i){function o(){if(!a){if(r.throwDeprecation)throw new Error(i);r.traceDeprecation,a=!0}return n.apply(this,arguments)}if(b(t.process))return function(){return e.deprecate(n,i).apply(this,arguments)};if(r.noDeprecation===!0)return n;var a=!1;return o};var T,B={};e.debuglog=function(t){if(b(T)&&(T=r.env.NODE_DEBUG||""),t=t.toUpperCase(),!B[t])if(new RegExp("\\b"+t+"\\b","i").test(T)){r.pid;B[t]=function(){e.format.apply(e,arguments)}}else B[t]=function(){};return B[t]},e.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=p,e.isBoolean=g,e.isNull=v,e.isNullOrUndefined=m,e.isNumber=y,e.isString=_,e.isSymbol=w,e.isUndefined=b,e.isRegExp=x,e.isObject=S,e.isDate=k,e.isError=E,e.isFunction=C,e.isPrimitive=I,e.isBuffer=n(61);e.log=function(){},e.inherits=n(62),e._extend=function(t,e){if(!e||!S(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t}}).call(e,function(){return this}(),n(30))},function(t,e){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e,n){function r(t,e){return d.isUndefined(e)?""+e:d.isNumber(e)&&!isFinite(e)?e.toString():d.isFunction(e)||d.isRegExp(e)?e.toString():e}function i(t,e){return d.isString(t)?t.length<e?t:t.slice(0,e):t}function o(t){return i(JSON.stringify(t.actual,r),128)+" "+t.operator+" "+i(JSON.stringify(t.expected,r),128)}function a(t,e,n,r,i){throw new v.AssertionError({message:n,actual:t,expected:e,operator:r,stackStartFunction:i})}function s(t,e){t||a(t,!0,e,"==",v.ok)}function h(t,e){if(t===e)return!0;if(d.isBuffer(t)&&d.isBuffer(e)){if(t.length!=e.length)return!1;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}return d.isDate(t)&&d.isDate(e)?t.getTime()===e.getTime():d.isRegExp(t)&&d.isRegExp(e)?t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase:d.isObject(t)||d.isObject(e)?c(t,e):t==e}function u(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function c(t,e){if(d.isNullOrUndefined(t)||d.isNullOrUndefined(e))return!1;if(t.prototype!==e.prototype)return!1;if(d.isPrimitive(t)||d.isPrimitive(e))return t===e;var n=u(t),r=u(e);if(n&&!r||!n&&r)return!1;if(n)return t=p.call(t),e=p.call(e),h(t,e);var i,o,a=m(t),s=m(e);if(a.length!=s.length)return!1;for(a.sort(),s.sort(),o=a.length-1;o>=0;o--)if(a[o]!=s[o])return!1;for(o=a.length-1;o>=0;o--)if(i=a[o],!h(t[i],e[i]))return!1;return!0}function l(t,e){return t&&e?"[object RegExp]"==Object.prototype.toString.call(e)?e.test(t):t instanceof e?!0:e.call({},t)===!0?!0:!1:!1}function f(t,e,n,r){var i;d.isString(n)&&(r=n,n=null);try{e()}catch(o){i=o}if(r=(n&&n.name?" ("+n.name+").":".")+(r?" "+r:"."),t&&!i&&a(i,n,"Missing expected exception"+r),!t&&l(i,n)&&a(i,n,"Got unwanted exception"+r),t&&i&&n&&!l(i,n)||!t&&i)throw i}var d=n(60),p=Array.prototype.slice,g=Object.prototype.hasOwnProperty,v=t.exports=s;v.AssertionError=function(t){this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=o(this),this.generatedMessage=!0);var e=t.stackStartFunction||a;if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{var n=new Error;if(n.stack){var r=n.stack,i=e.name,s=r.indexOf("\n"+i);if(s>=0){var h=r.indexOf("\n",s+1);r=r.substring(h+1)}this.stack=r}}},d.inherits(v.AssertionError,Error),v.fail=a,v.ok=s,v.equal=function(t,e,n){t!=e&&a(t,e,n,"==",v.equal)},v.notEqual=function(t,e,n){t==e&&a(t,e,n,"!=",v.notEqual)},v.deepEqual=function(t,e,n){h(t,e)||a(t,e,n,"deepEqual",v.deepEqual)},v.notDeepEqual=function(t,e,n){h(t,e)&&a(t,e,n,"notDeepEqual",v.notDeepEqual)},v.strictEqual=function(t,e,n){t!==e&&a(t,e,n,"===",v.strictEqual)},v.notStrictEqual=function(t,e,n){t===e&&a(t,e,n,"!==",v.notStrictEqual)},v["throws"]=function(t,e,n){f.apply(this,[!0].concat(p.call(arguments)))},v.doesNotThrow=function(t,e){f.apply(this,[!1].concat(p.call(arguments)))},v.ifError=function(t){if(t)throw t};var m=Object.keys||function(t){var e=[];for(var n in t)g.call(t,n)&&e.push(n);return e}},function(t,e){(function(){var e;e=function(){function t(t,r){var i;this.document=t,null==r&&(r={}),this.size=r.size||"letter",this.layout=r.layout||"portrait","number"==typeof r.margin?this.margins={top:r.margin,left:r.margin,bottom:r.margin,right:r.margin}:this.margins=r.margins||e,i=Array.isArray(this.size)?this.size:n[this.size.toUpperCase()],this.width=i["portrait"===this.layout?0:1],this.height=i["portrait"===this.layout?1:0],this.content=this.document.ref(),this.resources=this.document.ref({ProcSet:["PDF","Text","ImageB","ImageC","ImageI"]}),Object.defineProperties(this,{fonts:{get:function(t){return function(){var e;return null!=(e=t.resources.data).Font?e.Font:e.Font={}}}(this)},xobjects:{get:function(t){return function(){var e;return null!=(e=t.resources.data).XObject?e.XObject:e.XObject={}}}(this)},ext_gstates:{get:function(t){return function(){var e;return null!=(e=t.resources.data).ExtGState?e.ExtGState:e.ExtGState={}}}(this)},patterns:{get:function(t){return function(){var e;return null!=(e=t.resources.data).Pattern?e.Pattern:e.Pattern={}}}(this)},annotations:{get:function(t){return function(){var e;return null!=(e=t.dictionary.data).Annots?e.Annots:e.Annots=[]}}(this)}}),this.dictionary=this.document.ref({Type:"Page",Parent:this.document._root.data.Pages,MediaBox:[0,0,this.width,this.height],Contents:this.content,Resources:this.resources})}var e,n;return t.prototype.maxY=function(){return this.height-this.margins.bottom},t.prototype.write=function(t){return this.content.write(t)},t.prototype.end=function(){return this.dictionary.end(),this.resources.end(),this.content.end()},e={top:72,left:72,bottom:72,right:72},n={"4A0":[4767.87,6740.79],"2A0":[3370.39,4767.87],A0:[2383.94,3370.39],A1:[1683.78,2383.94],A2:[1190.55,1683.78],A3:[841.89,1190.55],A4:[595.28,841.89],A5:[419.53,595.28],A6:[297.64,419.53],A7:[209.76,297.64],A8:[147.4,209.76],A9:[104.88,147.4],A10:[73.7,104.88],B0:[2834.65,4008.19],B1:[2004.09,2834.65],B2:[1417.32,2004.09],B3:[1000.63,1417.32],B4:[708.66,1000.63],B5:[498.9,708.66],B6:[354.33,498.9],B7:[249.45,354.33],B8:[175.75,249.45],B9:[124.72,175.75],B10:[87.87,124.72],C0:[2599.37,3676.54],C1:[1836.85,2599.37],C2:[1298.27,1836.85],C3:[918.43,1298.27],C4:[649.13,918.43],C5:[459.21,649.13],C6:[323.15,459.21],C7:[229.61,323.15],C8:[161.57,229.61],C9:[113.39,161.57],C10:[79.37,113.39],RA0:[2437.8,3458.27],RA1:[1729.13,2437.8],RA2:[1218.9,1729.13],RA3:[864.57,1218.9],RA4:[609.45,864.57],SRA0:[2551.18,3628.35],SRA1:[1814.17,2551.18],SRA2:[1275.59,1814.17],SRA3:[907.09,1275.59],SRA4:[637.8,907.09],EXECUTIVE:[521.86,756],FOLIO:[612,936],LEGAL:[612,1008],LETTER:[612,792],TABLOID:[792,1224]},t}(),t.exports=e}).call(this)},function(t,e,n){(function(){var e,r,i,o,a;a=n(66),e=a.PDFGradient,r=a.PDFLinearGradient,i=a.PDFRadialGradient,t.exports={initColor:function(){return this._opacityRegistry={},this._opacityCount=0,this._gradCount=0},_normalizeColor:function(t){var n,r;return t instanceof e?t:("string"==typeof t&&("#"===t.charAt(0)?(4===t.length&&(t=t.replace(/#([0-9A-F])([0-9A-F])([0-9A-F])/i,"#$1$1$2$2$3$3")),n=parseInt(t.slice(1),16),t=[n>>16,n>>8&255,255&n]):o[t]&&(t=o[t])),Array.isArray(t)?(3===t.length?t=function(){var e,n,i;for(i=[],e=0,n=t.length;n>e;e++)r=t[e],i.push(r/255);return i}():4===t.length&&(t=function(){var e,n,i;for(i=[],e=0,n=t.length;n>e;e++)r=t[e],i.push(r/100);return i}()),t):null)},_setColor:function(t,n){var r,i,o,a;return(t=this._normalizeColor(t))?(this._sMasked&&(r=this.ref({Type:"ExtGState",SMask:"None"}),r.end(),i="Gs"+ ++this._opacityCount,this.page.ext_gstates[i]=r,this.addContent("/"+i+" gs"),this._sMasked=!1),o=n?"SCN":"scn",t instanceof e?(this._setColorSpace("Pattern",n),t.apply(o)):(a=4===t.length?"DeviceCMYK":"DeviceRGB",this._setColorSpace(a,n),t=t.join(" "),this.addContent(""+t+" "+o)),!0):!1},_setColorSpace:function(t,e){var n;return n=e?"CS":"cs",this.addContent("/"+t+" "+n)},fillColor:function(t,e){var n;return null==e&&(e=1),n=this._setColor(t,!1),n&&this.fillOpacity(e),this._fillColor=[t,e],this},strokeColor:function(t,e){var n;return null==e&&(e=1),n=this._setColor(t,!0),n&&this.strokeOpacity(e),this},opacity:function(t){return this._doOpacity(t,t),this},fillOpacity:function(t){return this._doOpacity(t,null),this},strokeOpacity:function(t){return this._doOpacity(null,t),this},_doOpacity:function(t,e){var n,r,i,o,a;if(null!=t||null!=e)return null!=t&&(t=Math.max(0,Math.min(1,t))),null!=e&&(e=Math.max(0,Math.min(1,e))),i=""+t+"_"+e,this._opacityRegistry[i]?(a=this._opacityRegistry[i],n=a[0],o=a[1]):(n={Type:"ExtGState"},null!=t&&(n.ca=t),null!=e&&(n.CA=e),n=this.ref(n),n.end(),r=++this._opacityCount,o="Gs"+r,this._opacityRegistry[i]=[n,o]),this.page.ext_gstates[o]=n,this.addContent("/"+o+" gs")},linearGradient:function(t,e,n,i){return new r(this,t,e,n,i)},radialGradient:function(t,e,n,r,o,a){return new i(this,t,e,n,r,o,a)}},o={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],grey:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}).call(this)},function(t,e){(function(){var e,n,r,i={}.hasOwnProperty,o=function(t,e){function n(){this.constructor=t}for(var r in e)i.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};e=function(){function t(t){this.doc=t,this.stops=[],this.embedded=!1,this.transform=[1,0,0,1,0,0],this._colorSpace="DeviceRGB"}return t.prototype.stop=function(t,e,n){return null==n&&(n=1),n=Math.max(0,Math.min(1,n)),this.stops.push([t,this.doc._normalizeColor(e),n]),this},t.prototype.embed=function(){var t,e,n,r,i,o,a,s,h,u,c,l,f,d,p,g,v,m,y,_,w,b,x,S,k,E,C,I,A,L,R,T,B,O,M,D;if(!this.embedded&&0!==this.stops.length){for(this.embedded=!0,c=this.stops[this.stops.length-1],c[0]<1&&this.stops.push([1,c[1],c[2]]),t=[],r=[],A=[],u=R=0,O=this.stops.length-1;O>=0?O>R:R>O;u=O>=0?++R:--R)r.push(0,1),u+2!==this.stops.length&&t.push(this.stops[u+1][0]),i=this.doc.ref({FunctionType:2,Domain:[0,1],C0:this.stops[u+0][1],C1:this.stops[u+1][1],N:1}),A.push(i),i.end();if(1===A.length?i=A[0]:(i=this.doc.ref({FunctionType:3,Domain:[0,1],Functions:A,Bounds:t,Encode:r}),i.end()),this.id="Sh"+ ++this.doc._gradCount,l=this.doc._ctm.slice(),f=l[0],d=l[1],v=l[2],_=l[3],w=l[4],b=l[5],M=this.transform,p=M[0],g=M[1],m=M[2],y=M[3],e=M[4],n=M[5],l[0]=f*p+v*g,l[1]=d*p+_*g,l[2]=f*m+v*y,l[3]=d*m+_*y,l[4]=f*e+v*n+w,l[5]=d*e+_*n+b,C=this.shader(i),C.end(),S=this.doc.ref({Type:"Pattern",PatternType:2,Shading:C,Matrix:function(){var t,e,n;for(n=[],t=0,e=l.length;e>t;t++)L=l[t],n.push(+L.toFixed(5));return n}()}),this.doc.page.patterns[this.id]=S,S.end(),this.stops.some(function(t){return t[2]<1})){for(a=this.opacityGradient(),a._colorSpace="DeviceGray",D=this.stops,T=0,B=D.length;B>T;T++)I=D[T],a.stop(I[0],[I[2]]);a=a.embed(),s=this.doc.ref({Type:"Group",S:"Transparency",CS:"DeviceGray"}),s.end(),k=this.doc.ref({ProcSet:["PDF","Text","ImageB","ImageC","ImageI"],Shading:{Sh1:a.data.Shading}}),k.end(),o=this.doc.ref({Type:"XObject",Subtype:"Form",FormType:1,BBox:[0,0,this.doc.page.width,this.doc.page.height],Group:s,Resources:k}),o.end("/Sh1 sh"),E=this.doc.ref({Type:"Mask",S:"Luminosity",G:o}),E.end(),h=this.doc.ref({Type:"ExtGState",SMask:E}),this.opacity_id=++this.doc._opacityCount,x="Gs"+this.opacity_id,this.doc.page.ext_gstates[x]=h,h.end()}return S}},t.prototype.apply=function(t){return this.embedded||this.embed(),this.doc.addContent("/"+this.id+" "+t),this.opacity_id?(this.doc.addContent("/Gs"+this.opacity_id+" gs"),this.doc._sMasked=!0):void 0},t}(),n=function(t){function e(t,n,r,i,o){this.doc=t,this.x1=n,this.y1=r,this.x2=i,this.y2=o,e.__super__.constructor.apply(this,arguments)}return o(e,t),e.prototype.shader=function(t){return this.doc.ref({ShadingType:2,ColorSpace:this._colorSpace,Coords:[this.x1,this.y1,this.x2,this.y2],Function:t,Extend:[!0,!0]})},e.prototype.opacityGradient=function(){return new e(this.doc,this.x1,this.y1,this.x2,this.y2)},e}(e),r=function(t){function e(t,n,r,i,o,a,s){this.doc=t,this.x1=n,this.y1=r,this.r1=i,this.x2=o,this.y2=a,this.r2=s,e.__super__.constructor.apply(this,arguments)}return o(e,t),e.prototype.shader=function(t){return this.doc.ref({ShadingType:3,ColorSpace:this._colorSpace,Coords:[this.x1,this.y1,this.r1,this.x2,this.y2,this.r2],Function:t,Extend:[!0,!0]})},e.prototype.opacityGradient=function(){return new e(this.doc,this.x1,this.y1,this.r1,this.x2,this.y2,this.r2)},e}(e),t.exports={PDFGradient:e,PDFLinearGradient:n,PDFRadialGradient:r}}).call(this)},function(t,e,n){(function(){var e,r,i=[].slice;r=n(68),e=4*((Math.sqrt(2)-1)/3),t.exports={initVector:function(){return this._ctm=[1,0,0,1,0,0],this._ctmStack=[]},save:function(){return this._ctmStack.push(this._ctm.slice()),this.addContent("q")},restore:function(){return this._ctm=this._ctmStack.pop()||[1,0,0,1,0,0],this.addContent("Q")},closePath:function(){return this.addContent("h")},lineWidth:function(t){return this.addContent(""+t+" w")},_CAP_STYLES:{BUTT:0,ROUND:1,SQUARE:2},lineCap:function(t){return"string"==typeof t&&(t=this._CAP_STYLES[t.toUpperCase()]),this.addContent(""+t+" J")},_JOIN_STYLES:{MITER:0,ROUND:1,BEVEL:2},lineJoin:function(t){return"string"==typeof t&&(t=this._JOIN_STYLES[t.toUpperCase()]),this.addContent(""+t+" j")},miterLimit:function(t){return this.addContent(""+t+" M")},dash:function(t,e){var n,r,i;return null==e&&(e={}),null==t?this:(r=null!=(i=e.space)?i:t,n=e.phase||0,this.addContent("["+t+" "+r+"] "+n+" d"))},undash:function(){return this.addContent("[] 0 d")},moveTo:function(t,e){return this.addContent(""+t+" "+e+" m")},lineTo:function(t,e){return this.addContent(""+t+" "+e+" l")},bezierCurveTo:function(t,e,n,r,i,o){return this.addContent(""+t+" "+e+" "+n+" "+r+" "+i+" "+o+" c")},quadraticCurveTo:function(t,e,n,r){return this.addContent(""+t+" "+e+" "+n+" "+r+" v")},rect:function(t,e,n,r){return this.addContent(""+t+" "+e+" "+n+" "+r+" re")},roundedRect:function(t,e,n,r,i){return null==i&&(i=0),this.moveTo(t+i,e),this.lineTo(t+n-i,e),this.quadraticCurveTo(t+n,e,t+n,e+i),this.lineTo(t+n,e+r-i),this.quadraticCurveTo(t+n,e+r,t+n-i,e+r),this.lineTo(t+i,e+r),this.quadraticCurveTo(t,e+r,t,e+r-i),this.lineTo(t,e+i),this.quadraticCurveTo(t,e,t+i,e)},ellipse:function(t,n,r,i){var o,a,s,h,u,c;return null==i&&(i=r),t-=r,n-=i,o=r*e,a=i*e,s=t+2*r,u=n+2*i,h=t+r,c=n+i,this.moveTo(t,c),this.bezierCurveTo(t,c-a,h-o,n,h,n),this.bezierCurveTo(h+o,n,s,c-a,s,c),this.bezierCurveTo(s,c+a,h+o,u,h,u),this.bezierCurveTo(h-o,u,t,c+a,t,c),this.closePath()},circle:function(t,e,n){return this.ellipse(t,e,n)},polygon:function(){var t,e,n,r;for(e=1<=arguments.length?i.call(arguments,0):[],this.moveTo.apply(this,e.shift()),n=0,r=e.length;r>n;n++)t=e[n],this.lineTo.apply(this,t);return this.closePath()},path:function(t){return r.apply(this,t),this},_windingRule:function(t){return/even-?odd/.test(t)?"*":""},fill:function(t,e){return/(even-?odd)|(non-?zero)/.test(t)&&(e=t,t=null),t&&this.fillColor(t),this.addContent("f"+this._windingRule(e))},stroke:function(t){return t&&this.strokeColor(t),this.addContent("S")},fillAndStroke:function(t,e,n){var r;return null==e&&(e=t),r=/(even-?odd)|(non-?zero)/,r.test(t)&&(n=t,t=null),r.test(e)&&(n=e,e=t),t&&(this.fillColor(t),this.strokeColor(e)),this.addContent("B"+this._windingRule(n))},clip:function(t){return this.addContent("W"+this._windingRule(t)+" n")},transform:function(t,e,n,r,i,o){var a,s,h,u,c,l,f,d,p;return a=this._ctm,s=a[0],h=a[1],u=a[2],c=a[3],l=a[4],f=a[5],a[0]=s*t+u*e,a[1]=h*t+c*e,a[2]=s*n+u*r,a[3]=h*n+c*r,a[4]=s*i+u*o+l,a[5]=h*i+c*o+f,p=function(){var a,s,h,u;for(h=[t,e,n,r,i,o],u=[],a=0,s=h.length;s>a;a++)d=h[a],u.push(+d.toFixed(5));return u}().join(" "),this.addContent(""+p+" cm")},translate:function(t,e){return this.transform(1,0,0,1,t,e)},rotate:function(t,e){var n,r,i,o,a,s,h,u;return null==e&&(e={}),r=t*Math.PI/180,n=Math.cos(r),i=Math.sin(r),o=s=0,null!=e.origin&&(u=e.origin,o=u[0],s=u[1],a=o*n-s*i,h=o*i+s*n,o-=a,s-=h),this.transform(n,i,-i,n,o,s)},scale:function(t,e,n){var r,i,o;return null==e&&(e=t),null==n&&(n={}),2===arguments.length&&(e=t,n=e),r=i=0,null!=n.origin&&(o=n.origin,r=o[0],i=o[1],r-=t*r,i-=e*i),this.transform(t,0,0,e,r,i)}}}).call(this)},function(t,e){(function(){var e;e=function(){function t(){}var e,n,r,i,o,a,s,h,u,c,l,f,d;return t.apply=function(t,n){var r;return r=a(n),e(r,t)},o={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:2,t:2,V:1,v:1,Z:0,z:0},a=function(t){var e,n,r,i,a,s,h,u,c;for(h=[],e=[],i="",a=!1,s=0,u=0,c=t.length;c>u;u++)if(n=t[u],null!=o[n])s=o[n],r&&(i.length>0&&(e[e.length]=+i),h[h.length]={cmd:r,args:e},e=[],i="",a=!1),r=n;else if(" "===n||","===n||"-"===n&&i.length>0&&"e"!==i[i.length-1]||"."===n&&a){if(0===i.length)continue;e.length===s?(h[h.length]={cmd:r,args:e},e=[+i],"M"===r&&(r="L"),"m"===r&&(r="l")):e[e.length]=+i,a="."===n,i="-"===n||"."===n?n:""}else i+=n,"."===n&&(a=!0);return i.length>0&&(e.length===s?(h[h.length]={cmd:r,args:e},e=[+i],"M"===r&&(r="L"),"m"===r&&(r="l")):e[e.length]=+i),h[h.length]={cmd:r,args:e},h},r=i=s=h=f=d=0,e=function(t,e){var n,o,a,c,l;for(r=i=s=h=f=d=0,o=a=0,c=t.length;c>a;o=++a)n=t[o],"function"==typeof u[l=n.cmd]&&u[l](e,n.args);return r=i=s=h=0},u={M:function(t,e){return r=e[0],i=e[1],s=h=null,f=r,d=i,t.moveTo(r,i)},m:function(t,e){return r+=e[0],i+=e[1],s=h=null,f=r,d=i,t.moveTo(r,i)},C:function(t,e){return r=e[4],i=e[5],s=e[2],h=e[3],t.bezierCurveTo.apply(t,e)},c:function(t,e){return t.bezierCurveTo(e[0]+r,e[1]+i,e[2]+r,e[3]+i,e[4]+r,e[5]+i),s=r+e[2],h=i+e[3],r+=e[4],i+=e[5]},S:function(t,e){return null===s&&(s=r,h=i),t.bezierCurveTo(r-(s-r),i-(h-i),e[0],e[1],e[2],e[3]),s=e[0],h=e[1],r=e[2],i=e[3]},s:function(t,e){return null===s&&(s=r,h=i),t.bezierCurveTo(r-(s-r),i-(h-i),r+e[0],i+e[1],r+e[2],i+e[3]),s=r+e[0],h=i+e[1],r+=e[2],i+=e[3]},Q:function(t,e){return s=e[0],h=e[1],r=e[2],i=e[3],t.quadraticCurveTo(e[0],e[1],r,i)},q:function(t,e){return t.quadraticCurveTo(e[0]+r,e[1]+i,e[2]+r,e[3]+i),s=r+e[0],h=i+e[1],r+=e[2],i+=e[3]},T:function(t,e){return null===s?(s=r,h=i):(s=r-(s-r),h=i-(h-i)),t.quadraticCurveTo(s,h,e[0],e[1]),s=r-(s-r),h=i-(h-i),r=e[0],i=e[1]},t:function(t,e){return null===s?(s=r,h=i):(s=r-(s-r),h=i-(h-i)),t.quadraticCurveTo(s,h,r+e[0],i+e[1]),r+=e[0],i+=e[1]},A:function(t,e){return l(t,r,i,e),r=e[5],i=e[6]},a:function(t,e){return e[5]+=r,e[6]+=i,l(t,r,i,e),r=e[5],i=e[6]},L:function(t,e){return r=e[0],i=e[1],s=h=null,t.lineTo(r,i)},l:function(t,e){return r+=e[0],i+=e[1],s=h=null,t.lineTo(r,i)},H:function(t,e){return r=e[0],s=h=null,t.lineTo(r,i)},h:function(t,e){return r+=e[0],s=h=null,t.lineTo(r,i);
},V:function(t,e){return i=e[0],s=h=null,t.lineTo(r,i)},v:function(t,e){return i+=e[0],s=h=null,t.lineTo(r,i)},Z:function(t){return t.closePath(),r=f,i=d},z:function(t){return t.closePath(),r=f,i=d}},l=function(t,e,r,i){var o,a,s,h,u,l,f,d,p,g,v,m,y;for(l=i[0],f=i[1],u=i[2],h=i[3],g=i[4],a=i[5],s=i[6],p=n(a,s,l,f,h,g,u,e,r),y=[],v=0,m=p.length;m>v;v++)d=p[v],o=c.apply(null,d),y.push(t.bezierCurveTo.apply(t,o));return y},n=function(t,e,n,r,i,o,a,u,c){var l,f,d,p,g,v,m,y,_,w,b,x,S,k,E,C,I,A,L,R,T,B,O,M,D,U;for(k=a*(Math.PI/180),S=Math.sin(k),g=Math.cos(k),n=Math.abs(n),r=Math.abs(r),s=g*(u-t)*.5+S*(c-e)*.5,h=g*(c-e)*.5-S*(u-t)*.5,y=s*s/(n*n)+h*h/(r*r),y>1&&(y=Math.sqrt(y),n*=y,r*=y),l=g/n,f=S/n,d=-S/r,p=g/r,R=l*u+f*c,O=d*u+p*c,T=l*t+f*e,M=d*t+p*e,v=(T-R)*(T-R)+(M-O)*(M-O),x=1/v-.25,0>x&&(x=0),b=Math.sqrt(x),o===i&&(b=-b),B=.5*(R+T)-b*(M-O),D=.5*(O+M)+b*(T-R),E=Math.atan2(O-D,R-B),C=Math.atan2(M-D,T-B),L=C-E,0>L&&1===o?L+=2*Math.PI:L>0&&0===o&&(L-=2*Math.PI),w=Math.ceil(Math.abs(L/(.5*Math.PI+.001))),_=[],m=U=0;w>=0?w>U:U>w;m=w>=0?++U:--U)I=E+m*L/w,A=E+(m+1)*L/w,_[m]=[B,D,I,A,n,r,S,g];return _},c=function(t,e,n,r,i,o,a,s){var h,u,c,l,f,d,p,g,v,m,y,_;return h=s*i,u=-a*o,c=a*i,l=s*o,d=.5*(r-n),f=8/3*Math.sin(.5*d)*Math.sin(.5*d)/Math.sin(d),p=t+Math.cos(n)-f*Math.sin(n),m=e+Math.sin(n)+f*Math.cos(n),v=t+Math.cos(r),_=e+Math.sin(r),g=v+f*Math.sin(r),y=_-f*Math.cos(r),[h*p+u*m,c*p+l*m,h*g+u*y,c*g+l*y,h*v+u*_,c*v+l*_]},t}(),t.exports=e}).call(this)},function(t,e,n){(function(){var e;e=n(70),t.exports={initFonts:function(){this._fontFamilies={},this._fontCount=0,this._fontSize=12,this._font=null,this._registeredFonts={}},font:function(t,n,r){var i,o,a,s;return"number"==typeof n&&(r=n,n=null),"string"==typeof t&&this._registeredFonts[t]?(i=t,s=this._registeredFonts[t],t=s.src,n=s.family):(i=n||t,"string"!=typeof i&&(i=null)),null!=r&&this.fontSize(r),(o=this._fontFamilies[i])?(this._font=o,this):(a="F"+ ++this._fontCount,this._font=new e(this,t,n,a),(o=this._fontFamilies[this._font.name])?(this._font=o,this):(i&&(this._fontFamilies[i]=this._font),this._fontFamilies[this._font.name]=this._font,this))},fontSize:function(t){return this._fontSize=t,this},currentLineHeight:function(t){return null==t&&(t=!1),this._font.lineHeight(this._fontSize,t)},registerFont:function(t,e,n){return this._registeredFonts[t]={src:e,family:n},this}}}).call(this)},function(t,e,n){(function(e,r){(function(){var i,o,a,s,h;s=n(71),i=n(87),a=n(88),h=n(44),o=function(){function t(t,r,o,h){if(this.document=t,this.id=h,"string"==typeof r){if(r in n)return this.isAFM=!0,this.font=new i(n[r]()),void this.registerAFM(r);if(/\.(ttf|ttc)$/i.test(r))this.font=s.open(r,o);else{if(!/\.dfont$/i.test(r))throw new Error("Not a supported font format or standard PDF font.");this.font=s.fromDFont(r,o)}}else if(e.isBuffer(r))this.font=s.fromBuffer(r,o);else if(r instanceof Uint8Array)this.font=s.fromBuffer(new e(r),o);else{if(!(r instanceof ArrayBuffer))throw new Error("Not a supported font format or standard PDF font.");this.font=s.fromBuffer(new e(new Uint8Array(r)),o)}this.subset=new a(this.font),this.registerTTF()}var n,o;return n={Courier:function(){return h.readFileSync(r+"/font/data/Courier.afm","utf8")},"Courier-Bold":function(){return h.readFileSync(r+"/font/data/Courier-Bold.afm","utf8")},"Courier-Oblique":function(){return h.readFileSync(r+"/font/data/Courier-Oblique.afm","utf8")},"Courier-BoldOblique":function(){return h.readFileSync(r+"/font/data/Courier-BoldOblique.afm","utf8")},Helvetica:function(){return h.readFileSync(r+"/font/data/Helvetica.afm","utf8")},"Helvetica-Bold":function(){return h.readFileSync(r+"/font/data/Helvetica-Bold.afm","utf8")},"Helvetica-Oblique":function(){return h.readFileSync(r+"/font/data/Helvetica-Oblique.afm","utf8")},"Helvetica-BoldOblique":function(){return h.readFileSync(r+"/font/data/Helvetica-BoldOblique.afm","utf8")},"Times-Roman":function(){return h.readFileSync(r+"/font/data/Times-Roman.afm","utf8")},"Times-Bold":function(){return h.readFileSync(r+"/font/data/Times-Bold.afm","utf8")},"Times-Italic":function(){return h.readFileSync(r+"/font/data/Times-Italic.afm","utf8")},"Times-BoldItalic":function(){return h.readFileSync(r+"/font/data/Times-BoldItalic.afm","utf8")},Symbol:function(){return h.readFileSync(r+"/font/data/Symbol.afm","utf8")},ZapfDingbats:function(){return h.readFileSync(r+"/font/data/ZapfDingbats.afm","utf8")}},t.prototype.use=function(t){var e;return null!=(e=this.subset)?e.use(t):void 0},t.prototype.embed=function(){return this.embedded||null==this.dictionary?void 0:(this.isAFM?this.embedAFM():this.embedTTF(),this.embedded=!0)},t.prototype.encode=function(t){var e;return this.isAFM?this.font.encodeText(t):(null!=(e=this.subset)?e.encodeText(t):void 0)||t},t.prototype.ref=function(){return null!=this.dictionary?this.dictionary:this.dictionary=this.document.ref()},t.prototype.registerTTF=function(){var t,e,n,r,i;if(this.name=this.font.name.postscriptName,this.scaleFactor=1e3/this.font.head.unitsPerEm,this.bbox=function(){var e,n,r,i;for(r=this.font.bbox,i=[],e=0,n=r.length;n>e;e++)t=r[e],i.push(Math.round(t*this.scaleFactor));return i}.call(this),this.stemV=0,this.font.post.exists?(r=this.font.post.italic_angle,e=r>>16,n=255&r,e&!0&&(e=-((65535^e)+1)),this.italicAngle=+(""+e+"."+n)):this.italicAngle=0,this.ascender=Math.round(this.font.ascender*this.scaleFactor),this.decender=Math.round(this.font.decender*this.scaleFactor),this.lineGap=Math.round(this.font.lineGap*this.scaleFactor),this.capHeight=this.font.os2.exists&&this.font.os2.capHeight||this.ascender,this.xHeight=this.font.os2.exists&&this.font.os2.xHeight||0,this.familyClass=(this.font.os2.exists&&this.font.os2.familyClass||0)>>8,this.isSerif=1===(i=this.familyClass)||2===i||3===i||4===i||5===i||7===i,this.isScript=10===this.familyClass,this.flags=0,this.font.post.isFixedPitch&&(this.flags|=1),this.isSerif&&(this.flags|=2),this.isScript&&(this.flags|=8),0!==this.italicAngle&&(this.flags|=64),this.flags|=32,!this.font.cmap.unicode)throw new Error("No unicode cmap for font")},t.prototype.embedTTF=function(){var t,e,n,r,i,a,s,h;return r=this.subset.encode(),s=this.document.ref(),s.write(r),s.data.Length1=s.uncompressedLength,s.end(),i=this.document.ref({Type:"FontDescriptor",FontName:this.subset.postscriptName,FontFile2:s,FontBBox:this.bbox,Flags:this.flags,StemV:this.stemV,ItalicAngle:this.italicAngle,Ascent:this.ascender,Descent:this.decender,CapHeight:this.capHeight,XHeight:this.xHeight}),i.end(),a=+Object.keys(this.subset.cmap)[0],t=function(){var t,e;t=this.subset.cmap,e=[];for(n in t)h=t[n],e.push(Math.round(this.font.widthOfGlyph(h)));return e}.call(this),e=this.document.ref(),e.end(o(this.subset.subset)),this.dictionary.data={Type:"Font",BaseFont:this.subset.postscriptName,Subtype:"TrueType",FontDescriptor:i,FirstChar:a,LastChar:a+t.length-1,Widths:t,Encoding:"MacRomanEncoding",ToUnicode:e},this.dictionary.end()},o=function(t){var e,n,r,i,o,a,s;for(o="/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<00><ff>\nendcodespacerange",n=Object.keys(t).sort(function(t,e){return t-e}),r=[],a=0,s=n.length;s>a;a++)e=n[a],r.length>=100&&(o+="\n"+r.length+" beginbfchar\n"+r.join("\n")+"\nendbfchar",r=[]),i=("0000"+t[e].toString(16)).slice(-4),e=(+e).toString(16),r.push("<"+e+"><"+i+">");return r.length&&(o+="\n"+r.length+" beginbfchar\n"+r.join("\n")+"\nendbfchar\n"),o+="endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend"},t.prototype.registerAFM=function(t){var e;return this.name=t,e=this.font,this.ascender=e.ascender,this.decender=e.decender,this.bbox=e.bbox,this.lineGap=e.lineGap,e},t.prototype.embedAFM=function(){return this.dictionary.data={Type:"Font",BaseFont:this.name,Subtype:"Type1",Encoding:"WinAnsiEncoding"},this.dictionary.end()},t.prototype.widthOfString=function(t,e){var n,r,i,o,a,s;for(t=""+t,o=0,r=a=0,s=t.length;s>=0?s>a:a>s;r=s>=0?++a:--a)n=t.charCodeAt(r),o+=this.font.widthOfGlyph(this.font.characterToGlyph(n))||0;return i=e/1e3,o*i},t.prototype.lineHeight=function(t,e){var n;return null==e&&(e=!1),n=e?this.lineGap:0,(this.ascender+n-this.decender)/1e3*t},t}(),t.exports=o}).call(this)}).call(e,n(2).Buffer,"/")},function(t,e,n){(function(){var CmapTable,e,r,i,GlyfTable,HeadTable,HheaTable,HmtxTable,LocaTable,MaxpTable,NameTable,OS2Table,PostTable,o,a;a=n(44),r=n(72),e=n(73),i=n(74),NameTable=n(75),HeadTable=n(78),CmapTable=n(79),HmtxTable=n(80),HheaTable=n(81),MaxpTable=n(82),PostTable=n(83),OS2Table=n(84),LocaTable=n(85),GlyfTable=n(86),o=function(){function t(t,e){var n,i,o,a,s,h,u,c,l;if(this.rawData=t,n=this.contents=new r(this.rawData),"ttcf"===n.readString(4)){if(!e)throw new Error("Must specify a font name for TTC files.");for(h=n.readInt(),o=n.readInt(),s=[],i=u=0;o>=0?o>u:u>o;i=o>=0?++u:--u)s[i]=n.readInt();for(i=c=0,l=s.length;l>c;i=++c)if(a=s[i],n.pos=a,this.parse(),this.name.postscriptName===e)return;throw new Error("Font "+e+" not found in TTC file.")}n.pos=0,this.parse()}return t.open=function(e,n){var r;return r=a.readFileSync(e),new t(r,n)},t.fromDFont=function(n,r){var i;return i=e.open(n),new t(i.getNamedFont(r))},t.fromBuffer=function(n,r){var i,o,a;try{if(a=new t(n,r),!(a.head.exists&&a.name.exists&&a.cmap.exists||(i=new e(n),a=new t(i.getNamedFont(r)),a.head.exists&&a.name.exists&&a.cmap.exists)))throw new Error("Invalid TTF file in DFont");return a}catch(s){throw o=s,new Error("Unknown font format in buffer: "+o.message)}},t.prototype.parse=function(){return this.directory=new i(this.contents),this.head=new HeadTable(this),this.name=new NameTable(this),this.cmap=new CmapTable(this),this.hhea=new HheaTable(this),this.maxp=new MaxpTable(this),this.hmtx=new HmtxTable(this),this.post=new PostTable(this),this.os2=new OS2Table(this),this.loca=new LocaTable(this),this.glyf=new GlyfTable(this),this.ascender=this.os2.exists&&this.os2.ascender||this.hhea.ascender,this.decender=this.os2.exists&&this.os2.decender||this.hhea.decender,this.lineGap=this.os2.exists&&this.os2.lineGap||this.hhea.lineGap,this.bbox=[this.head.xMin,this.head.yMin,this.head.xMax,this.head.yMax]},t.prototype.characterToGlyph=function(t){var e;return(null!=(e=this.cmap.unicode)?e.codeMap[t]:void 0)||0},t.prototype.widthOfGlyph=function(t){var e;return e=1e3/this.head.unitsPerEm,this.hmtx.forGlyph(t).advance*e},t}(),t.exports=o}).call(this)},function(t,e){(function(){var e;e=function(){function t(t){this.data=null!=t?t:[],this.pos=0,this.length=this.data.length}return t.prototype.readByte=function(){return this.data[this.pos++]},t.prototype.writeByte=function(t){return this.data[this.pos++]=t},t.prototype.byteAt=function(t){return this.data[t]},t.prototype.readBool=function(){return!!this.readByte()},t.prototype.writeBool=function(t){return this.writeByte(t?1:0)},t.prototype.readUInt32=function(){var t,e,n,r;return t=16777216*this.readByte(),e=this.readByte()<<16,n=this.readByte()<<8,r=this.readByte(),t+e+n+r},t.prototype.writeUInt32=function(t){return this.writeByte(t>>>24&255),this.writeByte(t>>16&255),this.writeByte(t>>8&255),this.writeByte(255&t)},t.prototype.readInt32=function(){var t;return t=this.readUInt32(),t>=2147483648?t-4294967296:t},t.prototype.writeInt32=function(t){return 0>t&&(t+=4294967296),this.writeUInt32(t)},t.prototype.readUInt16=function(){var t,e;return t=this.readByte()<<8,e=this.readByte(),t|e},t.prototype.writeUInt16=function(t){return this.writeByte(t>>8&255),this.writeByte(255&t)},t.prototype.readInt16=function(){var t;return t=this.readUInt16(),t>=32768?t-65536:t},t.prototype.writeInt16=function(t){return 0>t&&(t+=65536),this.writeUInt16(t)},t.prototype.readString=function(t){var e,n,r;for(n=[],e=r=0;t>=0?t>r:r>t;e=t>=0?++r:--r)n[e]=String.fromCharCode(this.readByte());return n.join("")},t.prototype.writeString=function(t){var e,n,r,i;for(i=[],e=n=0,r=t.length;r>=0?r>n:n>r;e=r>=0?++n:--n)i.push(this.writeByte(t.charCodeAt(e)));return i},t.prototype.stringAt=function(t,e){return this.pos=t,this.readString(e)},t.prototype.readShort=function(){return this.readInt16()},t.prototype.writeShort=function(t){return this.writeInt16(t)},t.prototype.readLongLong=function(){var t,e,n,r,i,o,a,s;return t=this.readByte(),e=this.readByte(),n=this.readByte(),r=this.readByte(),i=this.readByte(),o=this.readByte(),a=this.readByte(),s=this.readByte(),128&t?-1*(72057594037927940*(255^t)+281474976710656*(255^e)+1099511627776*(255^n)+4294967296*(255^r)+16777216*(255^i)+65536*(255^o)+256*(255^a)+(255^s)+1):72057594037927940*t+281474976710656*e+1099511627776*n+4294967296*r+16777216*i+65536*o+256*a+s},t.prototype.writeLongLong=function(t){var e,n;return e=Math.floor(t/4294967296),n=4294967295&t,this.writeByte(e>>24&255),this.writeByte(e>>16&255),this.writeByte(e>>8&255),this.writeByte(255&e),this.writeByte(n>>24&255),this.writeByte(n>>16&255),this.writeByte(n>>8&255),this.writeByte(255&n)},t.prototype.readInt=function(){return this.readInt32()},t.prototype.writeInt=function(t){return this.writeInt32(t)},t.prototype.slice=function(t,e){return this.data.slice(t,e)},t.prototype.read=function(t){var e,n,r;for(e=[],n=r=0;t>=0?t>r:r>t;n=t>=0?++r:--r)e.push(this.readByte());return e},t.prototype.write=function(t){var e,n,r,i;for(i=[],n=0,r=t.length;r>n;n++)e=t[n],i.push(this.writeByte(e));return i},t}(),t.exports=e}).call(this)},function(t,e,n){(function(){var e,r,i,NameTable,o;o=n(44),r=n(72),i=n(74),NameTable=n(75),e=function(){function t(t){this.contents=new r(t),this.parse(this.contents)}return t.open=function(e){var n;return n=o.readFileSync(e),new t(n)},t.prototype.parse=function(t){var e,n,o,a,s,h,u,c,l,f,d,p,g,v,m,y,_,w,b,x,S,k,E,C,I,A,L,R,T;for(h=t.readInt(),_=t.readInt(),s=t.readInt(),y=t.readInt(),this.map={},t.pos=_+24,L=t.readShort()+_,S=t.readShort()+_,t.pos=L,w=t.readShort(),d=R=0;w>=R;d=R+=1){for(A=t.readString(4),b=t.readShort(),I=t.readShort(),this.map[A]={list:[],named:{}},C=t.pos,t.pos=L+I,g=T=0;b>=T;g=T+=1)p=t.readShort(),k=t.readShort(),e=t.readByte(),n=t.readByte()<<16,o=t.readByte()<<8,a=t.readByte(),u=h+(0|n|o|a),f=t.readUInt32(),c={id:p,attributes:e,offset:u,handle:f},E=t.pos,-1!==k&&_+y>S+k?(t.pos=S+k,v=t.readByte(),c.name=t.readString(v)):"sfnt"===A&&(t.pos=c.offset,m=t.readUInt32(),l={},l.contents=new r(t.slice(t.pos,t.pos+m)),l.directory=new i(l.contents),x=new NameTable(l),c.name=x.fontName[0].raw),t.pos=E,this.map[A].list.push(c),c.name&&(this.map[A].named[c.name]=c);t.pos=C}},t.prototype.getNamedFont=function(t){var e,n,r,i,o,a;if(e=this.contents,i=e.pos,n=null!=(a=this.map.sfnt)?a.named[t]:void 0,!n)throw new Error("Font "+t+" not found in DFont file.");return e.pos=n.offset,r=e.readUInt32(),o=e.slice(e.pos,e.pos+r),e.pos=i,o},t}(),t.exports=e}).call(this)},function(t,e,n){(function(e){(function(){var r,i,o=[].slice;r=n(72),i=function(){function t(t){var e,n,r,i;for(this.scalarType=t.readInt(),this.tableCount=t.readShort(),this.searchRange=t.readShort(),this.entrySelector=t.readShort(),this.rangeShift=t.readShort(),this.tables={},n=r=0,i=this.tableCount;i>=0?i>r:r>i;n=i>=0?++r:--r)e={tag:t.readString(4),checksum:t.readInt(),offset:t.readInt(),length:t.readInt()},this.tables[e.tag]=e}var n;return t.prototype.encode=function(t){var i,o,a,s,h,u,c,l,f,d,p,g,v,m;g=Object.keys(t).length,u=Math.log(2),f=16*Math.floor(Math.log(g)/u),s=Math.floor(f/u),l=16*g-f,o=new r,o.writeInt(this.scalarType),o.writeShort(g),o.writeShort(f),o.writeShort(s),o.writeShort(l),a=16*g,c=o.pos+a,h=null,v=[];for(m in t)for(p=t[m],o.writeString(m),o.writeInt(n(p)),o.writeInt(c),o.writeInt(p.length),v=v.concat(p),"head"===m&&(h=c),c+=p.length;c%4;)v.push(0),c++;return o.write(v),d=n(o.data),i=2981146554-d,o.pos=h+8,o.writeUInt32(i),new e(o.data)},n=function(t){var e,n,i,a,s;for(t=o.call(t);t.length%4;)t.push(0);for(i=new r(t),n=0,e=a=0,s=t.length;s>a;e=a+=4)n+=i.readUInt32();return 4294967295&n},t}(),t.exports=i}).call(this)}).call(e,n(2).Buffer)},function(t,e,n){(function(){var e,r,NameTable,i,o,a={}.hasOwnProperty,s=function(t,e){function n(){this.constructor=t}for(var r in e)a.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};i=n(76),e=n(72),o=n(77),NameTable=function(t){function NameTable(){return NameTable.__super__.constructor.apply(this,arguments)}var n;return s(NameTable,t),NameTable.prototype.tag="name",NameTable.prototype.parse=function(t){var e,n,i,o,a,s,h,u,c,l,f,d,p;for(t.pos=this.offset,o=t.readShort(),e=t.readShort(),h=t.readShort(),n=[],a=l=0;e>=0?e>l:l>e;a=e>=0?++l:--l)n.push({platformID:t.readShort(),encodingID:t.readShort(),languageID:t.readShort(),nameID:t.readShort(),length:t.readShort(),offset:this.offset+h+t.readShort()});for(u={},a=f=0,d=n.length;d>f;a=++f)i=n[a],t.pos=i.offset,c=t.readString(i.length),s=new r(c,i),null==u[p=i.nameID]&&(u[p]=[]),u[i.nameID].push(s);return this.strings=u,this.copyright=u[0],this.fontFamily=u[1],this.fontSubfamily=u[2],this.uniqueSubfamily=u[3],this.fontName=u[4],this.version=u[5],this.postscriptName=u[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g,""),this.trademark=u[7],this.manufacturer=u[8],this.designer=u[9],this.description=u[10],this.vendorUrl=u[11],this.designerUrl=u[12],this.license=u[13],this.licenseUrl=u[14],this.preferredFamily=u[15],this.preferredSubfamily=u[17],this.compatibleFull=u[18],this.sampleText=u[19]},n="AAAAAA",NameTable.prototype.encode=function(){var t,i,a,s,h,u,c,l,f,d,p,g,v,m;f={},m=this.strings;for(t in m)p=m[t],f[t]=p;h=new r(""+n+"+"+this.postscriptName,{platformID:1,encodingID:0,languageID:0}),f[6]=[h],n=o.successorOf(n),u=0;for(t in f)i=f[t],null!=i&&(u+=i.length);d=new e,c=new e,d.writeShort(0),d.writeShort(u),d.writeShort(6+12*u);for(a in f)if(i=f[a],null!=i)for(g=0,v=i.length;v>g;g++)l=i[g],d.writeShort(l.platformID),d.writeShort(l.encodingID),d.writeShort(l.languageID),d.writeShort(a),d.writeShort(l.length),d.writeShort(c.pos),c.writeString(l.raw);return s={postscriptName:h.raw,table:d.data.concat(c.data)}},NameTable}(i),t.exports=NameTable,r=function(){function t(t,e){this.raw=t,this.length=this.raw.length,this.platformID=e.platformID,this.encodingID=e.encodingID,this.languageID=e.languageID}return t}()}).call(this)},function(t,e){(function(){var e;e=function(){function t(t){var e;this.file=t,e=this.file.directory.tables[this.tag],this.exists=!!e,e&&(this.offset=e.offset,this.length=e.length,this.parse(this.file.contents))}return t.prototype.parse=function(){},t.prototype.encode=function(){},t.prototype.raw=function(){return this.exists?(this.file.contents.pos=this.offset,this.file.contents.read(this.length)):null},t}(),t.exports=e}).call(this)},function(t,e){(function(){e.successorOf=function(t){var e,n,r,i,o,a,s,h,u,c;for(n="abcdefghijklmnopqrstuvwxyz",h=n.length,c=t,i=t.length;i>=0;){if(s=t.charAt(--i),isNaN(s)){if(o=n.indexOf(s.toLowerCase()),-1===o)u=s,r=!0;else if(u=n.charAt((o+1)%h),a=s===s.toUpperCase(),a&&(u=u.toUpperCase()),r=o+1>=h,r&&0===i){e=a?"A":"a",c=e+u+c.slice(1);break}}else if(u=+s+1,r=u>9,r&&(u=0),r&&0===i){c="1"+u+c.slice(1);break}if(c=c.slice(0,i)+u+c.slice(i+1),!r)break}return c},e.invert=function(t){var e,n,r;n={};for(e in t)r=t[e],n[r]=e;return n}}).call(this)},function(t,e,n){(function(){var e,HeadTable,r,i={}.hasOwnProperty,o=function(t,e){function n(){this.constructor=t}for(var r in e)i.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};r=n(76),e=n(72),HeadTable=function(t){function HeadTable(){return HeadTable.__super__.constructor.apply(this,arguments)}return o(HeadTable,t),HeadTable.prototype.tag="head",HeadTable.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.revision=t.readInt(),this.checkSumAdjustment=t.readInt(),this.magicNumber=t.readInt(),this.flags=t.readShort(),this.unitsPerEm=t.readShort(),this.created=t.readLongLong(),this.modified=t.readLongLong(),this.xMin=t.readShort(),this.yMin=t.readShort(),this.xMax=t.readShort(),this.yMax=t.readShort(),this.macStyle=t.readShort(),this.lowestRecPPEM=t.readShort(),this.fontDirectionHint=t.readShort(),this.indexToLocFormat=t.readShort(),this.glyphDataFormat=t.readShort()},HeadTable.prototype.encode=function(t){var n;return n=new e,n.writeInt(this.version),n.writeInt(this.revision),n.writeInt(this.checkSumAdjustment),n.writeInt(this.magicNumber),n.writeShort(this.flags),n.writeShort(this.unitsPerEm),n.writeLongLong(this.created),n.writeLongLong(this.modified),n.writeShort(this.xMin),n.writeShort(this.yMin),n.writeShort(this.xMax),n.writeShort(this.yMax),n.writeShort(this.macStyle),n.writeShort(this.lowestRecPPEM),n.writeShort(this.fontDirectionHint),n.writeShort(t.type),n.writeShort(this.glyphDataFormat),n.data},HeadTable}(r),t.exports=HeadTable}).call(this)},function(t,e,n){(function(){var e,CmapTable,r,i,o={}.hasOwnProperty,a=function(t,e){function n(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};i=n(76),r=n(72),CmapTable=function(t){function CmapTable(){return CmapTable.__super__.constructor.apply(this,arguments)}return a(CmapTable,t),CmapTable.prototype.tag="cmap",CmapTable.prototype.parse=function(t){var n,r,i,o;for(t.pos=this.offset,this.version=t.readUInt16(),i=t.readUInt16(),this.tables=[],this.unicode=null,r=o=0;i>=0?i>o:o>i;r=i>=0?++o:--o)n=new e(t,this.offset),this.tables.push(n),n.isUnicode&&null==this.unicode&&(this.unicode=n);return!0},CmapTable.encode=function(t,n){var i,o;return null==n&&(n="macroman"),i=e.encode(t,n),o=new r,o.writeUInt16(0),o.writeUInt16(1),i.table=o.data.concat(i.subtable),i},CmapTable}(i),e=function(){function t(t,e){var n,r,i,o,a,s,h,u,c,l,f,d,p,g,v,m,y,_,w;switch(this.platformID=t.readUInt16(),this.encodingID=t.readShort(),this.offset=e+t.readInt(),l=t.pos,t.pos=this.offset,this.format=t.readUInt16(),this.length=t.readUInt16(),this.language=t.readUInt16(),this.isUnicode=3===this.platformID&&1===this.encodingID&&4===this.format||0===this.platformID&&4===this.format,this.codeMap={},this.format){case 0:for(s=m=0;256>m;s=++m)this.codeMap[s]=t.readByte();break;case 4:for(d=t.readUInt16(),f=d/2,t.pos+=6,i=function(){var e,n;for(n=[],s=e=0;f>=0?f>e:e>f;s=f>=0?++e:--e)n.push(t.readUInt16());return n}(),t.pos+=2,g=function(){var e,n;for(n=[],s=e=0;f>=0?f>e:e>f;s=f>=0?++e:--e)n.push(t.readUInt16());return n}(),h=function(){var e,n;for(n=[],s=e=0;f>=0?f>e:e>f;s=f>=0?++e:--e)n.push(t.readUInt16());return n}(),u=function(){var e,n;for(n=[],s=e=0;f>=0?f>e:e>f;s=f>=0?++e:--e)n.push(t.readUInt16());return n}(),r=(this.length-t.pos+this.offset)/2,a=function(){var e,n;for(n=[],s=e=0;r>=0?r>e:e>r;s=r>=0?++e:--e)n.push(t.readUInt16());return n}(),s=y=0,w=i.length;w>y;s=++y)for(v=i[s],p=g[s],n=_=p;v>=p?v>=_:_>=v;n=v>=p?++_:--_)0===u[s]?o=n+h[s]:(c=u[s]/2+(n-p)-(f-s),o=a[c]||0,0!==o&&(o+=h[s])),this.codeMap[n]=65535&o}t.pos=l}return t.encode=function(t,e){var n,i,o,a,s,h,u,c,l,f,d,p,g,v,m,y,_,w,b,x,S,k,E,C,I,A,L,R,T,B,O,M,D,U,P,z,F,W,N,j,H,Z,G,Y,q,K,X;switch(T=new r,a=Object.keys(t).sort(function(t,e){return t-e}),e){case"macroman":for(g=0,v=function(){var t,e;for(e=[],p=t=0;256>t;p=++t)e.push(0);return e}(),y={0:0},o={},B=0,U=a.length;U>B;B++)i=a[B],null==y[Y=t[i]]&&(y[Y]=++g),o[i]={old:t[i],"new":y[t[i]]},v[i]=y[t[i]];return T.writeUInt16(1),T.writeUInt16(0),T.writeUInt32(12),T.writeUInt16(0),T.writeUInt16(262),T.writeUInt16(0),T.write(v),k={charMap:o,subtable:T.data,maxGlyphID:g+1};case"unicode":for(L=[],l=[],_=0,y={},n={},m=u=null,O=0,P=a.length;P>O;O++)i=a[O],b=t[i],null==y[b]&&(y[b]=++_),n[i]={old:b,"new":y[b]},s=y[b]-i,(null==m||s!==u)&&(m&&l.push(m),L.push(i),u=s),m=i;for(m&&l.push(m),l.push(65535),L.push(65535),C=L.length,I=2*C,E=2*Math.pow(Math.log(C)/Math.LN2,2),f=Math.log(E/2)/Math.LN2,S=2*C-E,h=[],x=[],d=[],p=M=0,z=L.length;z>M;p=++M){if(A=L[p],c=l[p],65535===A){h.push(0),x.push(0);break}if(R=n[A]["new"],A-R>=32768)for(h.push(0),x.push(2*(d.length+C-p)),i=D=A;c>=A?c>=D:D>=c;i=c>=A?++D:--D)d.push(n[i]["new"]);else h.push(R-A),x.push(0)}for(T.writeUInt16(3),T.writeUInt16(1),T.writeUInt32(12),T.writeUInt16(4),T.writeUInt16(16+8*C+2*d.length),T.writeUInt16(0),T.writeUInt16(I),T.writeUInt16(E),T.writeUInt16(f),T.writeUInt16(S),Z=0,F=l.length;F>Z;Z++)i=l[Z],T.writeUInt16(i);for(T.writeUInt16(0),G=0,W=L.length;W>G;G++)i=L[G],T.writeUInt16(i);for(q=0,N=h.length;N>q;q++)s=h[q],T.writeUInt16(s);for(K=0,j=x.length;j>K;K++)w=x[K],T.writeUInt16(w);for(X=0,H=d.length;H>X;X++)g=d[X],T.writeUInt16(g);return k={charMap:n,subtable:T.data,maxGlyphID:_+1}}},t}(),t.exports=CmapTable}).call(this)},function(t,e,n){(function(){var e,HmtxTable,r,i={}.hasOwnProperty,o=function(t,e){function n(){this.constructor=t}for(var r in e)i.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};r=n(76),e=n(72),HmtxTable=function(t){function HmtxTable(){return HmtxTable.__super__.constructor.apply(this,arguments)}return o(HmtxTable,t),HmtxTable.prototype.tag="hmtx",HmtxTable.prototype.parse=function(t){var e,n,r,i,o,a,s,h;for(t.pos=this.offset,this.metrics=[],e=o=0,s=this.file.hhea.numberOfMetrics;s>=0?s>o:o>s;e=s>=0?++o:--o)this.metrics.push({advance:t.readUInt16(),lsb:t.readInt16()});for(r=this.file.maxp.numGlyphs-this.file.hhea.numberOfMetrics,this.leftSideBearings=function(){var n,i;for(i=[],e=n=0;r>=0?r>n:n>r;e=r>=0?++n:--n)i.push(t.readInt16());return i}(),this.widths=function(){var t,e,n,r;for(n=this.metrics,r=[],t=0,e=n.length;e>t;t++)i=n[t],r.push(i.advance);return r}.call(this),n=this.widths[this.widths.length-1],h=[],e=a=0;r>=0?r>a:a>r;e=r>=0?++a:--a)h.push(this.widths.push(n));return h},HmtxTable.prototype.forGlyph=function(t){var e;return t in this.metrics?this.metrics[t]:e={advance:this.metrics[this.metrics.length-1].advance,lsb:this.leftSideBearings[t-this.metrics.length]}},HmtxTable.prototype.encode=function(t){var n,r,i,o,a;for(i=new e,o=0,a=t.length;a>o;o++)n=t[o],r=this.forGlyph(n),i.writeUInt16(r.advance),i.writeUInt16(r.lsb);return i.data},HmtxTable}(r),t.exports=HmtxTable}).call(this)},function(t,e,n){(function(){var e,HheaTable,r,i={}.hasOwnProperty,o=function(t,e){function n(){this.constructor=t}for(var r in e)i.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};r=n(76),e=n(72),HheaTable=function(t){function HheaTable(){return HheaTable.__super__.constructor.apply(this,arguments)}return o(HheaTable,t),HheaTable.prototype.tag="hhea",HheaTable.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.ascender=t.readShort(),this.decender=t.readShort(),this.lineGap=t.readShort(),this.advanceWidthMax=t.readShort(),this.minLeftSideBearing=t.readShort(),this.minRightSideBearing=t.readShort(),this.xMaxExtent=t.readShort(),this.caretSlopeRise=t.readShort(),this.caretSlopeRun=t.readShort(),this.caretOffset=t.readShort(),t.pos+=8,this.metricDataFormat=t.readShort(),this.numberOfMetrics=t.readUInt16()},HheaTable.prototype.encode=function(t){var n,r,i,o;for(r=new e,r.writeInt(this.version),r.writeShort(this.ascender),r.writeShort(this.decender),r.writeShort(this.lineGap),r.writeShort(this.advanceWidthMax),r.writeShort(this.minLeftSideBearing),r.writeShort(this.minRightSideBearing),r.writeShort(this.xMaxExtent),r.writeShort(this.caretSlopeRise),r.writeShort(this.caretSlopeRun),r.writeShort(this.caretOffset),n=i=0,o=8;o>=0?o>i:i>o;n=o>=0?++i:--i)r.writeByte(0);return r.writeShort(this.metricDataFormat),r.writeUInt16(t.length),r.data},HheaTable}(r),t.exports=HheaTable}).call(this)},function(t,e,n){(function(){var e,MaxpTable,r,i={}.hasOwnProperty,o=function(t,e){function n(){this.constructor=t}for(var r in e)i.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};r=n(76),e=n(72),MaxpTable=function(t){function MaxpTable(){return MaxpTable.__super__.constructor.apply(this,arguments)}return o(MaxpTable,t),MaxpTable.prototype.tag="maxp",MaxpTable.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.numGlyphs=t.readUInt16(),this.maxPoints=t.readUInt16(),this.maxContours=t.readUInt16(),this.maxCompositePoints=t.readUInt16(),this.maxComponentContours=t.readUInt16(),this.maxZones=t.readUInt16(),this.maxTwilightPoints=t.readUInt16(),this.maxStorage=t.readUInt16(),this.maxFunctionDefs=t.readUInt16(),this.maxInstructionDefs=t.readUInt16(),this.maxStackElements=t.readUInt16(),this.maxSizeOfInstructions=t.readUInt16(),this.maxComponentElements=t.readUInt16(),this.maxComponentDepth=t.readUInt16()},MaxpTable.prototype.encode=function(t){var n;return n=new e,n.writeInt(this.version),n.writeUInt16(t.length),n.writeUInt16(this.maxPoints),n.writeUInt16(this.maxContours),n.writeUInt16(this.maxCompositePoints),n.writeUInt16(this.maxComponentContours),n.writeUInt16(this.maxZones),n.writeUInt16(this.maxTwilightPoints),n.writeUInt16(this.maxStorage),n.writeUInt16(this.maxFunctionDefs),n.writeUInt16(this.maxInstructionDefs),n.writeUInt16(this.maxStackElements),n.writeUInt16(this.maxSizeOfInstructions),n.writeUInt16(this.maxComponentElements),n.writeUInt16(this.maxComponentDepth),n.data},MaxpTable}(r),t.exports=MaxpTable}).call(this)},function(t,e,n){(function(){var e,PostTable,r,i={}.hasOwnProperty,o=function(t,e){function n(){this.constructor=t}for(var r in e)i.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};r=n(76),e=n(72),PostTable=function(t){function PostTable(){return PostTable.__super__.constructor.apply(this,arguments)}var n;return o(PostTable,t),PostTable.prototype.tag="post",PostTable.prototype.parse=function(t){var e,n,r,i,o;switch(t.pos=this.offset,this.format=t.readInt(),this.italicAngle=t.readInt(),this.underlinePosition=t.readShort(),this.underlineThickness=t.readShort(),this.isFixedPitch=t.readInt(),this.minMemType42=t.readInt(),this.maxMemType42=t.readInt(),this.minMemType1=t.readInt(),this.maxMemType1=t.readInt(),this.format){case 65536:break;case 131072:for(r=t.readUInt16(),this.glyphNameIndex=[],e=i=0;r>=0?r>i:i>r;e=r>=0?++i:--i)this.glyphNameIndex.push(t.readUInt16());for(this.names=[],o=[];t.pos<this.offset+this.length;)n=t.readByte(),o.push(this.names.push(t.readString(n)));return o;case 151552:return r=t.readUInt16(),this.offsets=t.read(r);case 196608:break;case 262144:return this.map=function(){var n,r,i;for(i=[],e=n=0,r=this.file.maxp.numGlyphs;r>=0?r>n:n>r;e=r>=0?++n:--n)i.push(t.readUInt32());return i}.call(this)}},PostTable.prototype.glyphFor=function(t){var e;switch(this.format){case 65536:return n[t]||".notdef";case 131072:return e=this.glyphNameIndex[t],257>=e?n[e]:this.names[e-258]||".notdef";case 151552:return n[t+this.offsets[t]]||".notdef";case 196608:return".notdef";case 262144:return this.map[t]||65535}},PostTable.prototype.encode=function(t){var r,i,o,a,s,h,u,c,l,f,d,p,g,v,m;if(!this.exists)return null;if(h=this.raw(),196608===this.format)return h;for(l=new e(h.slice(0,32)),l.writeUInt32(131072),l.pos=32,o=[],c=[],f=0,g=t.length;g>f;f++)r=t[f],s=this.glyphFor(r),a=n.indexOf(s),-1!==a?o.push(a):(o.push(257+c.length),c.push(s));for(l.writeUInt16(Object.keys(t).length),d=0,v=o.length;v>d;d++)i=o[d],l.writeUInt16(i);for(p=0,m=c.length;m>p;p++)u=c[p],l.writeByte(u.length),l.writeString(u);return l.data},n=".notdef .null nonmarkingreturn space exclam quotedbl numbersign dollar percent\nampersand quotesingle parenleft parenright asterisk plus comma hyphen period slash\nzero one two three four five six seven eight nine colon semicolon less equal greater\nquestion at A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\nbracketleft backslash bracketright asciicircum underscore grave\na b c d e f g h i j k l m n o p q r s t u v w x y z\nbraceleft bar braceright asciitilde Adieresis Aring Ccedilla Eacute Ntilde Odieresis\nUdieresis aacute agrave acircumflex adieresis atilde aring ccedilla eacute egrave\necircumflex edieresis iacute igrave icircumflex idieresis ntilde oacute ograve\nocircumflex odieresis otilde uacute ugrave ucircumflex udieresis dagger degree cent\nsterling section bullet paragraph germandbls registered copyright trademark acute\ndieresis notequal AE Oslash infinity plusminus lessequal greaterequal yen mu\npartialdiff summation product pi integral ordfeminine ordmasculine Omega ae oslash\nquestiondown exclamdown logicalnot radical florin approxequal Delta guillemotleft\nguillemotright ellipsis nonbreakingspace Agrave Atilde Otilde OE oe endash emdash\nquotedblleft quotedblright quoteleft quoteright divide lozenge ydieresis Ydieresis\nfraction currency guilsinglleft guilsinglright fi fl daggerdbl periodcentered\nquotesinglbase quotedblbase perthousand Acircumflex Ecircumflex Aacute Edieresis\nEgrave Iacute Icircumflex Idieresis Igrave Oacute Ocircumflex apple Ograve Uacute\nUcircumflex Ugrave dotlessi circumflex tilde macron breve dotaccent ring cedilla\nhungarumlaut ogonek caron Lslash lslash Scaron scaron Zcaron zcaron brokenbar Eth\neth Yacute yacute Thorn thorn minus multiply onesuperior twosuperior threesuperior\nonehalf onequarter threequarters franc Gbreve gbreve Idotaccent Scedilla scedilla\nCacute cacute Ccaron ccaron dcroat".split(/\s+/g),
highStart:919552,errorValue:0}},function(t,e){(function(){var t,n,r,i,o,a,s,h,u,c,l,f,d,p,g,v,m,y,_,w,b,x,S,k,E,C,I,A,L,R,T,B,O,M,D,U,P,z,F,W;e.OP=L=0,e.CL=u=1,e.CP=l=2,e.QU=B=3,e.GL=p=4,e.NS=I=5,e.EX=d=6,e.SY=P=7,e.IS=b=8,e.PR=T=9,e.PO=R=10,e.NU=A=11,e.AL=n=12,e.HL=m=13,e.ID=_=14,e.IN=w=15,e.HY=y=16,e.BA=i=17,e.BB=o=18,e.B2=r=19,e.ZW=W=20,e.CM=c=21,e.WJ=z=22,e.H2=g=23,e.H3=v=24,e.JL=x=25,e.JV=k=26,e.JT=S=27,e.RI=O=28,e.AI=t=29,e.BK=a=30,e.CB=s=31,e.CJ=h=32,e.CR=f=33,e.LF=E=34,e.NL=C=35,e.SA=M=36,e.SG=D=37,e.SP=U=38,e.XX=F=39}).call(this)},function(t,e){(function(){var t,n,r,i,o;e.DI_BRK=r=0,e.IN_BRK=i=1,e.CI_BRK=t=2,e.CP_BRK=n=3,e.PR_BRK=o=4,e.pairTable=[[o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,n,o,o,o,o,o,o,o],[r,o,o,i,i,o,o,o,o,i,i,r,r,r,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[r,o,o,i,i,o,o,o,o,i,i,i,i,i,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[o,o,o,i,i,i,o,o,o,i,i,i,i,i,i,i,i,i,i,i,o,t,o,i,i,i,i,i,i],[i,o,o,i,i,i,o,o,o,i,i,i,i,i,i,i,i,i,i,i,o,t,o,i,i,i,i,i,i],[r,o,o,i,i,i,o,o,o,r,r,r,r,r,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[r,o,o,i,i,i,o,o,o,r,r,r,r,r,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[r,o,o,i,i,i,o,o,o,r,r,i,r,r,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[r,o,o,i,i,i,o,o,o,r,r,i,i,i,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[i,o,o,i,i,i,o,o,o,r,r,i,i,i,i,r,i,i,r,r,o,t,o,i,i,i,i,i,r],[i,o,o,i,i,i,o,o,o,r,r,i,i,i,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[i,o,o,i,i,i,o,o,o,i,i,i,i,i,r,i,i,i,r,r,o,t,o,r,r,r,r,r,r],[i,o,o,i,i,i,o,o,o,r,r,i,i,i,r,i,i,i,r,r,o,t,o,r,r,r,r,r,r],[i,o,o,i,i,i,o,o,o,r,r,i,i,i,r,i,i,i,r,r,o,t,o,r,r,r,r,r,r],[r,o,o,i,i,i,o,o,o,r,i,r,r,r,r,i,i,i,r,r,o,t,o,r,r,r,r,r,r],[r,o,o,i,i,i,o,o,o,r,r,r,r,r,r,i,i,i,r,r,o,t,o,r,r,r,r,r,r],[r,o,o,i,r,i,o,o,o,r,r,i,r,r,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[r,o,o,i,r,i,o,o,o,r,r,r,r,r,r,r,i,i,r,r,o,t,o,r,r,r,r,r,r],[i,o,o,i,i,i,o,o,o,i,i,i,i,i,i,i,i,i,i,i,o,t,o,i,i,i,i,i,i],[r,o,o,i,i,i,o,o,o,r,r,r,r,r,r,r,i,i,r,o,o,t,o,r,r,r,r,r,r],[r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,o,r,r,r,r,r,r,r,r],[i,o,o,i,i,i,o,o,o,r,r,i,i,i,r,i,i,i,r,r,o,t,o,r,r,r,r,r,r],[i,o,o,i,i,i,o,o,o,i,i,i,i,i,i,i,i,i,i,i,o,t,o,i,i,i,i,i,i],[r,o,o,i,i,i,o,o,o,r,i,r,r,r,r,i,i,i,r,r,o,t,o,r,r,r,i,i,r],[r,o,o,i,i,i,o,o,o,r,i,r,r,r,r,i,i,i,r,r,o,t,o,r,r,r,r,i,r],[r,o,o,i,i,i,o,o,o,r,i,r,r,r,r,i,i,i,r,r,o,t,o,i,i,i,i,r,r],[r,o,o,i,i,i,o,o,o,r,i,r,r,r,r,i,i,i,r,r,o,t,o,r,r,r,i,i,r],[r,o,o,i,i,i,o,o,o,r,i,r,r,r,r,i,i,i,r,r,o,t,o,r,r,r,r,i,r],[r,o,o,i,i,i,o,o,o,r,r,r,r,r,r,r,i,i,r,r,o,t,o,r,r,r,r,r,i]]}).call(this)},function(t,e,n){(function(e){(function(){var r;r=n(97),t.exports={initImages:function(){return this._imageRegistry={},this._imageCount=0},image:function(t,n,i,o){var a,s,h,u,c,l,f,d,p,g,v,m,y,_;return null==o&&(o={}),"object"==typeof n&&(o=n,n=null),n=null!=(m=null!=n?n:o.x)?m:this.x,i=null!=(y=null!=i?i:o.y)?y:this.y,e.isBuffer(t)||(l=this._imageRegistry[t]),l||(l=r.open(t,"I"+ ++this._imageCount),l.embed(this),e.isBuffer(t)||(this._imageRegistry[t]=l)),null==(g=this.page.xobjects)[v=l.label]&&(g[v]=l.obj),d=o.width||l.width,u=o.height||l.height,o.width&&!o.height?(p=d/l.width,d=l.width*p,u=l.height*p):o.height&&!o.width?(c=u/l.height,d=l.width*c,u=l.height*c):o.scale?(d=l.width*o.scale,u=l.height*o.scale):o.fit&&(_=o.fit,h=_[0],a=_[1],s=h/a,f=l.width/l.height,f>s?(d=h,u=h/f):(u=a,d=a*f),"center"===o.align?n=n+h/2-d/2:"right"===o.align&&(n=n+h-d),"center"===o.valign?i=i+a/2-u/2:"bottom"===o.valign&&(i=i+a-u)),this.y===i&&(this.y+=u),this.save(),this.transform(d,0,0,-u,n,i+u),this.addContent("/"+l.label+" Do"),this.restore(),this}}}).call(this)}).call(e,n(2).Buffer)},function(t,e,n){(function(e){(function(){var r,i,o,a,s;s=n(44),r=n(72),i=n(98),a=n(99),o=function(){function t(){}return t.open=function(t,n){var r,o;if(e.isBuffer(t))r=t;else if(o=/^data:.+;base64,(.*)$/.exec(t))r=new e(o[1],"base64");else if(r=s.readFileSync(t),!r)return;if(255===r[0]&&216===r[1])return new i(r,n);if(137===r[0]&&"PNG"===r.toString("ascii",1,4))return new a(r,n);throw new Error("Unknown image format.")},t}(),t.exports=o}).call(this)}).call(e,n(2).Buffer)},function(t,e,n){(function(){var e,r,i=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};r=n(44),e=function(){function t(t,n){var r,o,a;if(this.data=t,this.label=n,65496!==this.data.readUInt16BE(0))throw"SOI not found in JPEG";for(a=2;a<this.data.length&&(o=this.data.readUInt16BE(a),a+=2,!(i.call(e,o)>=0));)a+=this.data.readUInt16BE(a);if(i.call(e,o)<0)throw"Invalid JPEG.";a+=2,this.bits=this.data[a++],this.height=this.data.readUInt16BE(a),a+=2,this.width=this.data.readUInt16BE(a),a+=2,r=this.data[a++],this.colorSpace=function(){switch(r){case 1:return"DeviceGray";case 3:return"DeviceRGB";case 4:return"DeviceCMYK"}}(),this.obj=null}var e;return e=[65472,65473,65474,65475,65477,65478,65479,65480,65481,65482,65483,65484,65485,65486,65487],t.prototype.embed=function(t){return this.obj?void 0:(this.obj=t.ref({Type:"XObject",Subtype:"Image",BitsPerComponent:this.bits,Width:this.width,Height:this.height,ColorSpace:this.colorSpace,Filter:"DCTDecode"}),"DeviceCMYK"===this.colorSpace&&(this.obj.data.Decode=[1,0,1,0,1,0,1,0]),this.obj.end(this.data),this.data=null)},t}(),t.exports=e}).call(this)},function(t,e,n){(function(e){(function(){var r,i,o;o=n(47),r=n(100),i=function(){function t(t,e){this.label=e,this.image=new r(t),this.width=this.image.width,this.height=this.image.height,this.imgData=this.image.imgData,this.obj=null}return t.prototype.embed=function(t){var n,r,i,o,a,s,h,u;if(this.document=t,!this.obj){if(this.obj=t.ref({Type:"XObject",Subtype:"Image",BitsPerComponent:this.image.bits,Width:this.width,Height:this.height,Filter:"FlateDecode"}),this.image.hasAlphaChannel||(i=t.ref({Predictor:15,Colors:this.image.colors,BitsPerComponent:this.image.bits,Columns:this.width}),this.obj.data.DecodeParms=i,i.end()),0===this.image.palette.length?this.obj.data.ColorSpace=this.image.colorSpace:(r=t.ref(),r.end(new e(this.image.palette)),this.obj.data.ColorSpace=["Indexed","DeviceRGB",this.image.palette.length/3-1,r]),this.image.transparency.grayscale)return a=this.image.transparency.greyscale,this.obj.data.Mask=[a,a];if(this.image.transparency.rgb){for(o=this.image.transparency.rgb,n=[],h=0,u=o.length;u>h;h++)s=o[h],n.push(s,s);return this.obj.data.Mask=n}return this.image.transparency.indexed?this.loadIndexedAlphaChannel():this.image.hasAlphaChannel?this.splitAlphaChannel():this.finalize()}},t.prototype.finalize=function(){var t;return this.alphaChannel&&(t=this.document.ref({Type:"XObject",Subtype:"Image",Height:this.height,Width:this.width,BitsPerComponent:8,Filter:"FlateDecode",ColorSpace:"DeviceGray",Decode:[0,1]}),t.end(this.alphaChannel),this.obj.data.SMask=t),this.obj.end(this.imgData),this.image=null,this.imgData=null},t.prototype.splitAlphaChannel=function(){return this.image.decodePixels(function(t){return function(n){var r,i,a,s,h,u,c,l,f;for(a=t.image.colors*t.image.bits/8,f=t.width*t.height,u=new e(f*a),i=new e(f),h=l=r=0,c=n.length;c>h;)u[l++]=n[h++],u[l++]=n[h++],u[l++]=n[h++],i[r++]=n[h++];return s=0,o.deflate(u,function(e,n){if(t.imgData=n,e)throw e;return 2===++s?t.finalize():void 0}),o.deflate(i,function(e,n){if(t.alphaChannel=n,e)throw e;return 2===++s?t.finalize():void 0})}}(this))},t.prototype.loadIndexedAlphaChannel=function(t){var n;return n=this.image.transparency.indexed,this.image.decodePixels(function(t){return function(r){var i,a,s,h,u;for(i=new e(t.width*t.height),a=0,s=h=0,u=r.length;u>h;s=h+=1)i[a++]=n[r[s]];return o.deflate(i,function(e,n){if(t.alphaChannel=n,e)throw e;return t.finalize()})}}(this))},t}(),t.exports=i}).call(this)}).call(e,n(2).Buffer)},function(t,e,n){(function(e){(function(){var r,i,o;i=n(44),o=n(47),t.exports=r=function(){function t(t){var n,r,i,o,a,s,h,u,c,l,f;for(this.data=t,this.pos=8,this.palette=[],this.imgData=[],this.transparency={},this.text={};;){switch(n=this.readUInt32(),s=function(){var t,e;for(e=[],i=t=0;4>t;i=++t)e.push(String.fromCharCode(this.data[this.pos++]));return e}.call(this).join("")){case"IHDR":this.width=this.readUInt32(),this.height=this.readUInt32(),this.bits=this.data[this.pos++],this.colorType=this.data[this.pos++],this.compressionMethod=this.data[this.pos++],this.filterMethod=this.data[this.pos++],this.interlaceMethod=this.data[this.pos++];break;case"PLTE":this.palette=this.read(n);break;case"IDAT":for(i=c=0;n>c;i=c+=1)this.imgData.push(this.data[this.pos++]);break;case"tRNS":switch(this.transparency={},this.colorType){case 3:if(this.transparency.indexed=this.read(n),h=255-this.transparency.indexed.length,h>0)for(i=l=0;h>=0?h>l:l>h;i=h>=0?++l:--l)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(n)[0];break;case 2:this.transparency.rgb=this.read(n)}break;case"tEXt":u=this.read(n),o=u.indexOf(0),a=String.fromCharCode.apply(String,u.slice(0,o)),this.text[a]=String.fromCharCode.apply(String,u.slice(o+1));break;case"IEND":return this.colors=function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}.call(this),this.hasAlphaChannel=4===(f=this.colorType)||6===f,r=this.colors+(this.hasAlphaChannel?1:0),this.pixelBitlength=this.bits*r,this.colorSpace=function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}.call(this),void(this.imgData=new e(this.imgData));default:this.pos+=n}if(this.pos+=4,this.pos>this.data.length)throw new Error("Incomplete or corrupt PNG file")}}return t.decode=function(e,n){return i.readFile(e,function(e,r){var i;return i=new t(r),i.decode(function(t){return n(t)})})},t.load=function(e){var n;return n=i.readFileSync(e),new t(n)},t.prototype.read=function(t){var e,n,r;for(r=[],e=n=0;t>=0?t>n:n>t;e=t>=0?++n:--n)r.push(this.data[this.pos++]);return r},t.prototype.readUInt32=function(){var t,e,n,r;return t=this.data[this.pos++]<<24,e=this.data[this.pos++]<<16,n=this.data[this.pos++]<<8,r=this.data[this.pos++],t|e|n|r},t.prototype.readUInt16=function(){var t,e;return t=this.data[this.pos++]<<8,e=this.data[this.pos++],t|e},t.prototype.decodePixels=function(t){var n=this;return o.inflate(this.imgData,function(r,i){var o,a,s,h,u,c,l,f,d,p,g,v,m,y,_,w,b,x,S,k,E,C,I;if(r)throw r;for(v=n.pixelBitlength/8,w=v*n.width,m=new e(w*n.height),c=i.length,_=0,y=0,a=0;c>y;){switch(i[y++]){case 0:for(h=S=0;w>S;h=S+=1)m[a++]=i[y++];break;case 1:for(h=k=0;w>k;h=k+=1)o=i[y++],u=v>h?0:m[a-v],m[a++]=(o+u)%256;break;case 2:for(h=E=0;w>E;h=E+=1)o=i[y++],s=(h-h%v)/v,b=_&&m[(_-1)*w+s*v+h%v],m[a++]=(b+o)%256;break;case 3:for(h=C=0;w>C;h=C+=1)o=i[y++],s=(h-h%v)/v,u=v>h?0:m[a-v],b=_&&m[(_-1)*w+s*v+h%v],m[a++]=(o+Math.floor((u+b)/2))%256;break;case 4:for(h=I=0;w>I;h=I+=1)o=i[y++],s=(h-h%v)/v,u=v>h?0:m[a-v],0===_?b=x=0:(b=m[(_-1)*w+s*v+h%v],x=s&&m[(_-1)*w+(s-1)*v+h%v]),l=u+b-x,f=Math.abs(l-u),p=Math.abs(l-b),g=Math.abs(l-x),d=p>=f&&g>=f?u:g>=p?b:x,m[a++]=(o+d)%256;break;default:throw new Error("Invalid filter algorithm: "+i[y-1])}_++}return t(m)})},t.prototype.decodePalette=function(){var t,n,r,i,o,a,s,h,u,c;for(i=this.palette,s=this.transparency.indexed||[],a=new e(s.length+i.length),o=0,r=i.length,t=0,n=h=0,u=i.length;u>h;n=h+=3)a[o++]=i[n],a[o++]=i[n+1],a[o++]=i[n+2],a[o++]=null!=(c=s[t++])?c:255;return a},t.prototype.copyToImageData=function(t,e){var n,r,i,o,a,s,h,u,c,l,f;if(r=this.colors,c=null,n=this.hasAlphaChannel,this.palette.length&&(c=null!=(f=this._decodedPalette)?f:this._decodedPalette=this.decodePalette(),r=4,n=!0),i=(null!=t?t.data:void 0)||t,u=i.length,a=c||e,o=s=0,1===r)for(;u>o;)h=c?4*e[o/4]:s,l=a[h++],i[o++]=l,i[o++]=l,i[o++]=l,i[o++]=n?a[h++]:255,s=h;else for(;u>o;)h=c?4*e[o/4]:s,i[o++]=a[h++],i[o++]=a[h++],i[o++]=a[h++],i[o++]=n?a[h++]:255,s=h},t.prototype.decode=function(t){var n,r=this;return n=new e(this.width*this.height*4),this.decodePixels(function(e){return r.copyToImageData(n,e),t(n)})},t}()}).call(this)}).call(e,n(2).Buffer)},function(t,e){(function(){t.exports={annotate:function(t,e,n,r,i){var o,a,s;i.Type="Annot",i.Rect=this._convertRect(t,e,n,r),i.Border=[0,0,0],"Link"!==i.Subtype&&null==i.C&&(i.C=this._normalizeColor(i.color||[0,0,0])),delete i.color,"string"==typeof i.Dest&&(i.Dest=new String(i.Dest));for(o in i)s=i[o],i[o[0].toUpperCase()+o.slice(1)]=s;return a=this.ref(i),this.page.annotations.push(a),a.end(),this},note:function(t,e,n,r,i,o){return null==o&&(o={}),o.Subtype="Text",o.Contents=new String(i),o.Name="Comment",null==o.color&&(o.color=[243,223,92]),this.annotate(t,e,n,r,o)},link:function(t,e,n,r,i,o){return null==o&&(o={}),o.Subtype="Link",o.A=this.ref({S:"URI",URI:new String(i)}),o.A.end(),this.annotate(t,e,n,r,o)},_markup:function(t,e,n,r,i){var o,a,s,h,u;return null==i&&(i={}),u=this._convertRect(t,e,n,r),o=u[0],s=u[1],a=u[2],h=u[3],i.QuadPoints=[o,h,a,h,o,s,a,s],i.Contents=new String,this.annotate(t,e,n,r,i)},highlight:function(t,e,n,r,i){return null==i&&(i={}),i.Subtype="Highlight",null==i.color&&(i.color=[241,238,148]),this._markup(t,e,n,r,i)},underline:function(t,e,n,r,i){return null==i&&(i={}),i.Subtype="Underline",this._markup(t,e,n,r,i)},strike:function(t,e,n,r,i){return null==i&&(i={}),i.Subtype="StrikeOut",this._markup(t,e,n,r,i)},lineAnnotation:function(t,e,n,r,i){return null==i&&(i={}),i.Subtype="Line",i.Contents=new String,i.L=[t,this.page.height-e,n,this.page.height-r],this.annotate(t,e,n,r,i)},rectAnnotation:function(t,e,n,r,i){return null==i&&(i={}),i.Subtype="Square",i.Contents=new String,this.annotate(t,e,n,r,i)},ellipseAnnotation:function(t,e,n,r,i){return null==i&&(i={}),i.Subtype="Circle",i.Contents=new String,this.annotate(t,e,n,r,i)},textAnnotation:function(t,e,n,r,i,o){return null==o&&(o={}),o.Subtype="FreeText",o.Contents=new String(i),o.DA=new String,this.annotate(t,e,n,r,o)},_convertRect:function(t,e,n,r){var i,o,a,s,h,u,c,l,f;return l=e,e+=r,c=t+n,f=this._ctm,i=f[0],o=f[1],a=f[2],s=f[3],h=f[4],u=f[5],t=i*t+a*e+h,e=o*t+s*e+u,c=i*c+a*l+h,l=o*c+s*l+u,[t,e,c,l]}}}).call(this)},function(t,e){t.exports={"4A0":[4767.87,6740.79],"2A0":[3370.39,4767.87],A0:[2383.94,3370.39],A1:[1683.78,2383.94],A2:[1190.55,1683.78],A3:[841.89,1190.55],A4:[595.28,841.89],A5:[419.53,595.28],A6:[297.64,419.53],A7:[209.76,297.64],A8:[147.4,209.76],A9:[104.88,147.4],A10:[73.7,104.88],B0:[2834.65,4008.19],B1:[2004.09,2834.65],B2:[1417.32,2004.09],B3:[1000.63,1417.32],B4:[708.66,1000.63],B5:[498.9,708.66],B6:[354.33,498.9],B7:[249.45,354.33],B8:[175.75,249.45],B9:[124.72,175.75],B10:[87.87,124.72],C0:[2599.37,3676.54],C1:[1836.85,2599.37],C2:[1298.27,1836.85],C3:[918.43,1298.27],C4:[649.13,918.43],C5:[459.21,649.13],C6:[323.15,459.21],C7:[229.61,323.15],C8:[161.57,229.61],C9:[113.39,161.57],C10:[79.37,113.39],RA0:[2437.8,3458.27],RA1:[1729.13,2437.8],RA2:[1218.9,1729.13],RA3:[864.57,1218.9],RA4:[609.45,864.57],SRA0:[2551.18,3628.35],SRA1:[1814.17,2551.18],SRA2:[1275.59,1814.17],SRA3:[907.09,1275.59],SRA4:[637.8,907.09],EXECUTIVE:[521.86,756],FOLIO:[612,936],LEGAL:[612,1008],LETTER:[612,792],TABLOID:[792,1224]}},function(t,e,n){(function(e){"use strict";function r(t,e){this.pdfDoc=t,this.imageDictionary=e||{}}var i=(n(24),n(97));r.prototype.measureImage=function(t){function n(t){var n=a.imageDictionary[t];if(!n)return t;var r=n.indexOf("base64,");if(0>r)throw"invalid image format, images dictionary should contain dataURL entries";return new e(n.substring(r+7),"base64")}var r,o,a=this;return this.pdfDoc._imageRegistry[t]?r=this.pdfDoc._imageRegistry[t]:(o="I"+ ++this.pdfDoc._imageCount,r=i.open(n(t),o),r.embed(this.pdfDoc),this.pdfDoc._imageRegistry[t]=r),{width:r.width,height:r.height}},t.exports=r}).call(e,n(2).Buffer)},function(t,e){"use strict";function n(t){for(var e=[],n=null,r=0,i=t.inlines.length;i>r;r++){var o=t.inlines[r],a=o.decoration;if(a){var s=o.decorationColor||o.color||"black",h=o.decorationStyle||"solid";a=Array.isArray(a)?a:[a];for(var u=0,c=a.length;c>u;u++){var l=a[u];n&&l===n.decoration&&h===n.decorationStyle&&s===n.decorationColor&&"lineThrough"!==l?n.inlines.push(o):(n={line:t,decoration:l,decorationColor:s,decorationStyle:h,inlines:[o]},e.push(n))}}else n=null}return e}function r(t,e,n,r){function i(){for(var e=0,n=0,r=t.inlines.length;r>n;n++){var i=t.inlines[n];e=i.fontSize>e?n:e}return t.inlines[e]}function o(){for(var e=0,n=0,r=t.inlines.length;r>n;n++)e+=t.inlines[n].width;return e}var a=t.inlines[0],s=i(),h=o(),u=t.line.getAscenderHeight(),c=s.font.ascender/1e3*s.fontSize,l=s.height,f=l-c,d=.5+.12*Math.floor(Math.max(s.fontSize-8,0)/2);switch(t.decoration){case"underline":n+=u+.45*f;break;case"overline":n+=u-.85*c;break;case"lineThrough":n+=u-.25*c;break;default:throw"Unkown decoration : "+t.decoration}if(r.save(),"double"===t.decorationStyle){var p=Math.max(.5,2*d);r.fillColor(t.decorationColor).rect(e+a.x,n-d/2,h,d/2).fill().rect(e+a.x,n+p-d/2,h,d/2).fill()}else if("dashed"===t.decorationStyle){var g=Math.ceil(h/6.8),v=e+a.x;r.rect(v,n,h,d).clip(),r.fillColor(t.decorationColor);for(var m=0;g>m;m++)r.rect(v,n-d/2,3.96,d).fill(),v+=6.8}else if("dotted"===t.decorationStyle){var y=Math.ceil(h/(3*d)),_=e+a.x;r.rect(_,n,h,d).clip(),r.fillColor(t.decorationColor);for(var w=0;y>w;w++)r.rect(_,n-d/2,d,d).fill(),_+=3*d}else if("wavy"===t.decorationStyle){var b=.7,x=1,S=Math.ceil(h/(2*b))+1,k=e+a.x-1;r.rect(e+a.x,n-x,h,n+x).clip(),r.lineWidth(.24),r.moveTo(k,n);for(var E=0;S>E;E++)r.bezierCurveTo(k+b,n-x,k+2*b,n-x,k+3*b,n).bezierCurveTo(k+4*b,n+x,k+5*b,n+x,k+6*b,n),k+=6*b;r.stroke(t.decorationColor)}else r.fillColor(t.decorationColor).rect(e+a.x,n-d/2,h,d).fill();r.restore()}function i(t,e,i,o){for(var a=n(t),s=0,h=a.length;h>s;s++)r(a[s],e,i,o)}function o(t,e,n,r){for(var i=t.getHeight(),o=0,a=t.inlines.length;a>o;o++){var s=t.inlines[o];s.background&&r.fillColor(s.background).rect(e+s.x,n,s.width,i).fill()}}t.exports={drawBackground:o,drawDecorations:i}},function(t,e,n){var r,i,o=o||function(t){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var e=t.document,n=function(){return t.URL||t.webkitURL||t},r=e.createElementNS("http://www.w3.org/1999/xhtml","a"),i="download"in r,o=function(t){var e=new MouseEvent("click");t.dispatchEvent(e)},a=t.webkitRequestFileSystem,s=t.requestFileSystem||a||t.mozRequestFileSystem,h=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},u="application/octet-stream",c=0,l=500,f=function(e){var r=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()};t.chrome?r():setTimeout(r,l)},d=function(t,e,n){e=[].concat(e);for(var r=e.length;r--;){var i=t["on"+e[r]];if("function"==typeof i)try{i.call(t,n||t)}catch(o){h(o)}}},p=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t},g=function(e,h,l){l||(e=p(e));var g,v,m,y=this,_=e.type,w=!1,b=function(){d(y,"writestart progress write writeend".split(" "))},x=function(){if((w||!g)&&(g=n().createObjectURL(e)),v)v.location.href=g;else{var r=t.open(g,"_blank");void 0==r&&"undefined"!=typeof safari&&(t.location.href=g)}y.readyState=y.DONE,b(),f(g)},S=function(t){return function(){return y.readyState!==y.DONE?t.apply(this,arguments):void 0}},k={create:!0,exclusive:!1};return y.readyState=y.INIT,h||(h="download"),i?(g=n().createObjectURL(e),r.href=g,r.download=h,void setTimeout(function(){o(r),b(),f(g),y.readyState=y.DONE})):(t.chrome&&_&&_!==u&&(m=e.slice||e.webkitSlice,e=m.call(e,0,e.size,u),w=!0),a&&"download"!==h&&(h+=".download"),(_===u||a)&&(v=t),s?(c+=e.size,void s(t.TEMPORARY,c,S(function(t){t.root.getDirectory("saved",k,S(function(t){var n=function(){t.getFile(h,k,S(function(t){t.createWriter(S(function(n){n.onwriteend=function(e){v.location.href=t.toURL(),y.readyState=y.DONE,d(y,"writeend",e),f(t)},n.onerror=function(){var t=n.error;t.code!==t.ABORT_ERR&&x()},"writestart progress write abort".split(" ").forEach(function(t){n["on"+t]=y["on"+t]}),n.write(e),y.abort=function(){n.abort(),y.readyState=y.DONE},y.readyState=y.WRITING}),x)}),x)};t.getFile(h,{create:!1},S(function(t){t.remove(),n()}),S(function(t){t.code===t.NOT_FOUND_ERR?n():x()}))}),x)}),x)):void x())},v=g.prototype,m=function(t,e,n){return new g(t,e,n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return n||(t=p(t)),navigator.msSaveOrOpenBlob(t,e||"download")}:(v.abort=function(){var t=this;t.readyState=t.DONE,d(t,"abort")},v.readyState=v.INIT=0,v.WRITING=1,v.DONE=2,v.error=v.onwritestart=v.onprogress=v.onwrite=v.onabort=v.onerror=v.onwriteend=null,m)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof t&&t.exports?t.exports.saveAs=o:null!==n(106)&&null!=n(107)&&(r=[],i=function(){return o}.apply(e,r),!(void 0!==i&&(t.exports=i)))},function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t,e){(function(e){t.exports=e}).call(e,{})}]);
//# sourceMappingURL=pdfmake.min.js.map
;
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;