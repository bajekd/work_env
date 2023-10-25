/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 856:
/***/ (function(module) {

/*! @license DOMPurify 2.3.10 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.10/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var hasOwnProperty = Object.hasOwnProperty,
      setPrototypeOf = Object.setPrototypeOf,
      isFrozen = Object.isFrozen,
      getPrototypeOf = Object.getPrototypeOf,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var freeze = Object.freeze,
      seal = Object.seal,
      create = Object.create; // eslint-disable-line import/no-mutable-exports

  var _ref = typeof Reflect !== 'undefined' && Reflect,
      apply = _ref.apply,
      construct = _ref.construct;

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }

  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }

  if (!construct) {
    construct = function construct(Func, args) {
      return _construct(Func, _toConsumableArray(args));
    };
  }

  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);
  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);
  var regExpTest = unapply(RegExp.prototype.test);
  var typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return apply(func, thisArg, args);
    };
  }
  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return construct(func, args);
    };
  }
  /* Add properties to a lookup table */

  function addToSet(set, array, transformCaseFunc) {
    transformCaseFunc = transformCaseFunc ? transformCaseFunc : stringToLowerCase;

    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    var l = array.length;

    while (l--) {
      var element = array[l];

      if (typeof element === 'string') {
        var lcElement = transformCaseFunc(element);

        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }
  /* Shallow clone an object */

  function clone(object) {
    var newObject = create(null);
    var property;

    for (property in object) {
      if (apply(hasOwnProperty, object, [property])) {
        newObject[property] = object[property];
      }
    }

    return newObject;
  }
  /* IE10 doesn't support __lookupGetter__ so lets'
   * simulate it. It also automatically checks
   * if the prop is function or getter and behaves
   * accordingly. */

  function lookupGetter(object, prop) {
    while (object !== null) {
      var desc = getOwnPropertyDescriptor(object, prop);

      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }

        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }

      object = getPrototypeOf(object);
    }

    function fallbackValue(element) {
      console.warn('fallback value for', element);
      return null;
    }

    return fallbackValue;
  }

  var html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

  var svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.

  var svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  var mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']); // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.

  var mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  var text = freeze(['#text']);

  var html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
  var svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  var mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

  var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

  var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );
  var DOCTYPE_NAME = seal(/^html$/i);

  var getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };
  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */


  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
    if (_typeof(trustedTypes) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    } // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.


    var suffix = null;
    var ATTR_NAME = 'data-tt-policy-suffix';

    if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
      suffix = document.currentScript.getAttribute(ATTR_NAME);
    }

    var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML: function createHTML(html) {
          return html;
        },
        createScriptURL: function createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    var DOMPurify = function DOMPurify(root) {
      return createDOMPurify(root);
    };
    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */


    DOMPurify.version = '2.3.10';
    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */

    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }

    var originalDocument = window.document;
    var document = window.document;
    var DocumentFragment = window.DocumentFragment,
        HTMLTemplateElement = window.HTMLTemplateElement,
        Node = window.Node,
        Element = window.Element,
        NodeFilter = window.NodeFilter,
        _window$NamedNodeMap = window.NamedNodeMap,
        NamedNodeMap = _window$NamedNodeMap === void 0 ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
        HTMLFormElement = window.HTMLFormElement,
        DOMParser = window.DOMParser,
        trustedTypes = window.trustedTypes;
    var ElementPrototype = Element.prototype;
    var cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    var getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    var getParentNode = lookupGetter(ElementPrototype, 'parentNode'); // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.

    if (typeof HTMLTemplateElement === 'function') {
      var template = document.createElement('template');

      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);

    var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';
    var _document = document,
        implementation = _document.implementation,
        createNodeIterator = _document.createNodeIterator,
        createDocumentFragment = _document.createDocumentFragment,
        getElementsByTagName = _document.getElementsByTagName;
    var importNode = originalDocument.importNode;
    var documentMode = {};

    try {
      documentMode = clone(document).documentMode ? document.documentMode : {};
    } catch (_) {}

    var hooks = {};
    /**
     * Expose whether this browser supports running the full DOMPurify.
     */

    DOMPurify.isSupported = typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;
    var MUSTACHE_EXPR$1 = MUSTACHE_EXPR,
        ERB_EXPR$1 = ERB_EXPR,
        DATA_ATTR$1 = DATA_ATTR,
        ARIA_ATTR$1 = ARIA_ATTR,
        IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
    var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    var ALLOWED_TAGS = null;
    var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
    /* Allowed attribute names */

    var ALLOWED_ATTR = null;
    var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
    /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */

    var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

    var FORBID_TAGS = null;
    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

    var FORBID_ATTR = null;
    /* Decide if ARIA attributes are okay */

    var ALLOW_ARIA_ATTR = true;
    /* Decide if custom data attributes are okay */

    var ALLOW_DATA_ATTR = true;
    /* Decide if unknown protocols are okay */

    var ALLOW_UNKNOWN_PROTOCOLS = false;
    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */

    var SAFE_FOR_TEMPLATES = false;
    /* Decide if document with <html>... should be returned */

    var WHOLE_DOCUMENT = false;
    /* Track whether config is already set on this instance of DOMPurify. */

    var SET_CONFIG = false;
    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */

    var FORCE_BODY = false;
    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */

    var RETURN_DOM = false;
    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */

    var RETURN_DOM_FRAGMENT = false;
    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */

    var RETURN_TRUSTED_TYPE = false;
    /* Output should be free from DOM clobbering attacks? */

    var SANITIZE_DOM = true;
    /* Keep element content when removing element? */

    var KEEP_CONTENT = true;
    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */

    var IN_PLACE = false;
    /* Allow usage of profiles like html, svg and mathMl */

    var USE_PROFILES = {};
    /* Tags to ignore content of when KEEP_CONTENT is true */

    var FORBID_CONTENTS = null;
    var DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
    /* Tags that are safe for data: URIs */

    var DATA_URI_TAGS = null;
    var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
    /* Attributes safe for values like "javascript:" */

    var URI_SAFE_ATTRIBUTES = null;
    var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */

    var NAMESPACE = HTML_NAMESPACE;
    var IS_EMPTY_INPUT = false;
    /* Parsing of strict XHTML documents */

    var PARSER_MEDIA_TYPE;
    var SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    var DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    var transformCaseFunc;
    /* Keep a reference to config to pass to hooks */

    var CONFIG = null;
    /* Ideally, do not touch anything below this line */

    /* ______________________________________________ */

    var formElement = document.createElement('form');

    var isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity


    var _parseConfig = function _parseConfig(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      /* Shield configuration object from tampering */


      if (!cfg || _typeof(cfg) !== 'object') {
        cfg = {};
      }
      /* Shield configuration object from prototype pollution */


      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE; // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? function (x) {
        return x;
      } : stringToLowerCase;
      /* Set configuration parameters */

      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR, // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS, // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

      RETURN_DOM = cfg.RETURN_DOM || false; // Default false

      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

      FORCE_BODY = cfg.FORCE_BODY || false; // Default false

      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

      IN_PLACE = cfg.IN_PLACE || false; // Default false

      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }

      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      /* Parse profile info */


      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, _toConsumableArray(text));
        ALLOWED_ATTR = [];

        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      /* Merge configuration parameters */


      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }

      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }

        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      /* Add #text in case KEEP_CONTENT is set to true */


      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }
      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */


      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }
      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */


      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      } // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.


      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };

    var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    var HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.

    var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */

    var ALL_SVG_TAGS = addToSet({}, svg$1);
    addToSet(ALL_SVG_TAGS, svgFilters);
    addToSet(ALL_SVG_TAGS, svgDisallowed);
    var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
    addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
    /**
     *
     *
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */

    var _checkValidNamespace = function _checkValidNamespace(element) {
      var parent = getParentNode(element); // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.

      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: HTML_NAMESPACE,
          tagName: 'template'
        };
      }

      var tagName = stringToLowerCase(element.tagName);
      var parentTagName = stringToLowerCase(parent.tagName);

      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        } // The only way to switch from MathML to SVG is via
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.


        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        } // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.


        return Boolean(ALL_SVG_TAGS[tagName]);
      }

      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        } // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points


        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        } // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.


        return Boolean(ALL_MATHML_TAGS[tagName]);
      }

      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        } // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace


        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      } // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG or MathML). Return false just in case.


      return false;
    };
    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */


    var _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });

      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        node.parentNode.removeChild(node);
      } catch (_) {
        try {
          node.outerHTML = emptyHTML;
        } catch (_) {
          node.remove();
        }
      }
    };
    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */


    var _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name); // We void attribute values for unremovable "is"" attributes

      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };
    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */


    var _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      var doc;
      var leadingWhitespace;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        var matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }

      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml') {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }

      var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */

      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }
      /* Use createHTMLDocument in case DOMParser is not available */


      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);

        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? '' : dirtyPayload;
        } catch (_) {// Syntax error if dirtyPayload is invalid xml
        }
      }

      var body = doc.body || doc.documentElement;

      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      /* Work on whole document or just its body */


      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }

      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */


    var _createIterator = function _createIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
    };
    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */


    var _isClobbered = function _isClobbered(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function');
    };
    /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */


    var _isNode = function _isNode(object) {
      return _typeof(Node) === 'object' ? object instanceof Node : object && _typeof(object) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
    };
    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */


    var _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      arrayForEach(hooks[entryPoint], function (hook) {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };
    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */


    var _sanitizeElements = function _sanitizeElements(currentNode) {
      var content;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeElements', currentNode, null);
      /* Check if element is clobbered or can clobber */


      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Check if tagname contains Unicode */


      if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Now let's check the element's type and name */


      var tagName = transformCaseFunc(currentNode.nodeName);
      /* Execute a hook if present */

      _executeHook('uponSanitizeElement', currentNode, {
        tagName: tagName,
        allowedTags: ALLOWED_TAGS
      });
      /* Detect mXSS attempts abusing namespace confusion */


      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Mitigate a problem with templates inside select */


      if (tagName === 'select' && regExpTest(/<template/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Remove element if anything forbids its presence */


      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
        }
        /* Keep content except for bad-listed elements */


        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          var parentNode = getParentNode(currentNode) || currentNode.parentNode;
          var childNodes = getChildNodes(currentNode) || currentNode.childNodes;

          if (childNodes && parentNode) {
            var childCount = childNodes.length;

            for (var i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }

        _forceRemove(currentNode);

        return true;
      }
      /* Check whether element has a valid namespace */


      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }

      if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Sanitize element content to be template-safe */


      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        content = stringReplace(content, MUSTACHE_EXPR$1, ' ');
        content = stringReplace(content, ERB_EXPR$1, ' ');

        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };
    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity


    var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }
      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */


      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if ( // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */

      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if (!value) ; else {
        return false;
      }

      return true;
    };
    /**
     * _basicCustomElementCheck
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     * @param {string} tagName name of the tag of the node to sanitize
     */


    var _basicCustomElementTest = function _basicCustomElementTest(tagName) {
      return tagName.indexOf('-') > 0;
    };
    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */


    var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      var attr;
      var value;
      var lcName;
      var l;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeAttributes', currentNode, null);

      var attributes = currentNode.attributes;
      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      var hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      l = attributes.length;
      /* Go backwards over all attributes; safely remove bad ones */

      while (l--) {
        attr = attributes[l];
        var _attr = attr,
            name = _attr.name,
            namespaceURI = _attr.namespaceURI;
        value = name === 'value' ? attr.value : stringTrim(attr.value);
        lcName = transformCaseFunc(name);
        /* Execute a hook if present */

        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);

        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */

        if (hookEvent.forceKeepAttr) {
          continue;
        }
        /* Remove attribute */


        _removeAttribute(name, currentNode);
        /* Did the hooks approve of the attribute? */


        if (!hookEvent.keepAttr) {
          continue;
        }
        /* Work around a security issue in jQuery 3.0 */


        if (regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);

          continue;
        }
        /* Sanitize attribute content to be template-safe */


        if (SAFE_FOR_TEMPLATES) {
          value = stringReplace(value, MUSTACHE_EXPR$1, ' ');
          value = stringReplace(value, ERB_EXPR$1, ' ');
        }
        /* Is `value` valid for this attribute? */


        var lcTag = transformCaseFunc(currentNode.nodeName);

        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        /* Handle attributes that require Trusted Types */


        if (trustedTypesPolicy && _typeof(trustedTypes) === 'object' && typeof trustedTypes.getAttributeType === 'function') {
          if (namespaceURI) ; else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case 'TrustedHTML':
                value = trustedTypesPolicy.createHTML(value);
                break;

              case 'TrustedScriptURL':
                value = trustedTypesPolicy.createScriptURL(value);
                break;
            }
          }
        }
        /* Handle invalid data-* attribute set by try-catching it */


        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeAttributes', currentNode, null);
    };
    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */


    var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      var shadowNode;

      var shadowIterator = _createIterator(fragment);
      /* Execute a hook if present */


      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);
        /* Sanitize tags and elements */


        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        /* Deep shadow DOM detected */


        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(shadowNode);
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };
    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */
    // eslint-disable-next-line complexity


    DOMPurify.sanitize = function (dirty, cfg) {
      var body;
      var importedNode;
      var currentNode;
      var oldNode;
      var returnNode;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */

      IS_EMPTY_INPUT = !dirty;

      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }
      /* Stringify, in case dirty is an object */


      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        // eslint-disable-next-line no-negated-condition
        if (typeof dirty.toString !== 'function') {
          throw typeErrorCreate('toString is not a function');
        } else {
          dirty = dirty.toString();

          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        }
      }
      /* Check we can run. Otherwise fall back or ignore */


      if (!DOMPurify.isSupported) {
        if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
          if (typeof dirty === 'string') {
            return window.toStaticHTML(dirty);
          }

          if (_isNode(dirty)) {
            return window.toStaticHTML(dirty.outerHTML);
          }
        }

        return dirty;
      }
      /* Assign config vars */


      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      /* Clean up removed elements */


      DOMPurify.removed = [];
      /* Check if dirty is correctly typed for IN_PLACE */

      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }

      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes */
        if (dirty.nodeName) {
          var tagName = transformCaseFunc(dirty.nodeName);

          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
      } else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);

        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        /* Initialize the document to work on */


        body = _initDocument(dirty);
        /* Check we have a DOM node from the data */

        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }
      /* Remove first element node (ours) if FORCE_BODY is set */


      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      /* Get node iterator */


      var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
      /* Now start iterating over the created document */


      while (currentNode = nodeIterator.nextNode()) {
        /* Fix IE's strange behavior with manipulated textNodes #89 */
        if (currentNode.nodeType === 3 && currentNode === oldNode) {
          continue;
        }
        /* Sanitize tags and elements */


        if (_sanitizeElements(currentNode)) {
          continue;
        }
        /* Shadow DOM detected, sanitize it */


        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(currentNode);

        oldNode = currentNode;
      }

      oldNode = null;
      /* If we sanitized `dirty` in-place, return it. */

      if (IN_PLACE) {
        return dirty;
      }
      /* Return sanitized string or DOM */


      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (ALLOWED_ATTR.shadowroot) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      /* Serialize doctype if allowed */

      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }
      /* Sanitize final string template-safe */


      if (SAFE_FOR_TEMPLATES) {
        serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, ' ');
        serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, ' ');
      }

      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */


    DOMPurify.setConfig = function (cfg) {
      _parseConfig(cfg);

      SET_CONFIG = true;
    };
    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */


    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };
    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */


    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      var lcTag = transformCaseFunc(tag);
      var lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */


    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };
    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */


    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };
    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */


    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };
    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */


    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ 755:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if (  true && typeof module.exports === "object" ) {

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
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

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

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
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
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

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

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
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
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
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
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
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
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

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
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
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
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

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
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
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
		return ( cache[ key + " " ] = value );
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
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
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
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
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
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
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
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
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
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
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
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

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
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
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
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
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

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
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
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
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
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
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
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
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
		while ( ( elem = results[ i++ ] ) ) {
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
		while ( ( node = elem[ i++ ] ) ) {

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
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
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
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
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

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
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
								while ( ( node = node[ dir ] ) ) {
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
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

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
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

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
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
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
			return !Expr.pseudos[ "empty" ]( elem );
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
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

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
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
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
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
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
		if ( ( elem = unmatched[ i ] ) ) {
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
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

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
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
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
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
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
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
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
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
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
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
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
					if ( ( elem = !matcher && elem ) ) {
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
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
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
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

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
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

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
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




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



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
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
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
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

					// Option to run scripts is true for back-compat
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
							if ( isFunction( this[ match ] ) ) {
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

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
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
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
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
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
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
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
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
	parentsUntil: function( elem, _i, until ) {
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
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
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
			locked = locked || options.once;

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
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

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
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
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


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
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
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
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
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

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
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
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
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
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

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
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

				// Ensure a hooks for this queue
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
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
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


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
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
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
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

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
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

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
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

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
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

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
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

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

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

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

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
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
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
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
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

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
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
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
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

						// Support: Android <=4.0 only, PhantomJS 1 only
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
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
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

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
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

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
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
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
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
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
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

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
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
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

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

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
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


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
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
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
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
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
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

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
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
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
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

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
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

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
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

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
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

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
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

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
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

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
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

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
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

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
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

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
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
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
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
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
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

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
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
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

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

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
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
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
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
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
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
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
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
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

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

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
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
					nodeName( elem, "input" ) ) {
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
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
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
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
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

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

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




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

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

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
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

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

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

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
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




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

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
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

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
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
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

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
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

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

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


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

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

	} else if ( !traditional && toType( obj ) === "object" ) {

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
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

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
	return s.join( "&" );
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
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

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

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

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
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
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
	var key, deep,
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

	var ct, type, finalDataType, firstDataType,
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
					if ( conv && s.throws ) {
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
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
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
			"text json": JSON.parse,

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

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

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

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
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
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
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
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
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
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

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
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

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

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
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

				// Extract error from statusText and normalize for non-aborts
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

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
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

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
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
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

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
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

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

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
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
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
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
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
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

		// Force json dataType
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

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
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


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

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




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

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

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
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
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
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
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
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
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



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

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src-logic/service/s2k-service.js
/* provided dependency */ var $ = __webpack_require__(755);
/**
 * s2k-service.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Service calling object.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */


/**
 * @constructor
 */
const SendToKindleService = function () {};

SendToKindleService.prototype = {
    // ######## Constants ########
    SERVICE_URL: "https://www.amazon.com/sendtokindle",
    S3_HTTP_VERB: "PUT",
        
    // ######## Public Methods ########
    /**
     * Handle an XMLHttpRequest.
     * @param {Object} ajaxRequest  Settings for the AJAX request
     */
    ajax: function (ajaxRequest) {
        // Validate the input data.
        ajaxRequest = ajaxRequest || {};
        ajaxRequest.url = ajaxRequest.url || this.SERVICE_URL;
        ajaxRequest.type = ajaxRequest.type || "GET";
        ajaxRequest.data = ajaxRequest.data || null;
        ajaxRequest.success = ajaxRequest.success || function () {};
        ajaxRequest.error = ajaxRequest.error || function () {};
        ajaxRequest.complete = ajaxRequest.complete || function () {};
        ajaxRequest.timeout = ajaxRequest.timeout || 30000;
        ajaxRequest.async = ajaxRequest.async || true;
        ajaxRequest.cache = ajaxRequest.cache || false;
        ajaxRequest.binary = ajaxRequest.binary || false;
        ajaxRequest.responseType = ajaxRequest.responseType || "";
        ajaxRequest.dataType = ajaxRequest.dataType || "text";
        ajaxRequest.isUploadToS3 = ajaxRequest.isUploadToS3 || false;
        ajaxRequest.isDownloadBinary = ajaxRequest.isDownloadBinary || false;
        ajaxRequest.isJSONContentType = ajaxRequest.isJSONContentType || false;
        ajaxRequest.isCsrfRequired = ajaxRequest.isCsrfRequired || false;

        if (ajaxRequest.data && ajaxRequest.binary === false) {
            if (ajaxRequest.isJSONContentType) {
                ajaxRequest.data = JSON.stringify(ajaxRequest.data);
            } else {
                ajaxRequest.data = $.param(ajaxRequest.data);
            }
        }

        //todo: for better security model, we would better to avoid pass the url directly, instead, we need to
        // pass necessary parameter and generate the url in background page. But in other case, it's not easy to
        // implement that since there are too many kinds of urls.
        this.sendExtensionMessage("service-common-call", {"request": ajaxRequest}, function (message) {
            if (message.success) {
                ajaxRequest.success(message.data, message.contentType);
                ajaxRequest.complete();
            } else {
                ajaxRequest.error(message.xhr, message.statusCode, message.statusText);
                ajaxRequest.complete();
            }
        }.bind(this));
    },
    
    /**
     * Download and BASE64-encode an image.
     * @param url       URL
     * @param success   Success Callback
     * @param error     Error Callback
     */
    downloadAndEncodeImage: function (url, success, error) {
        this.downloadAsBinary(url, function (binaryData, contentType) {
            success(binaryData, contentType);
        }.bind(this), error);
    },
    
    /**
     * Download content in binary format.
     * @param url       URL
     * @param success   Success Callback
     * @param error     Error Callback
     */
    downloadAsBinary: function (url, success, error) {
        this.ajax({
            url: url,
            cache: true,
            responseType: "arraybuffer",
            timeout: 7000,
            isDownloadBinary: true,
            success: function (data, contentType) {
                if (success !== undefined) {
                    if (contentType == null) { // try to fix content type if null
                        var ext = url.split('.').pop().toLowerCase();
                        if (ext === "jpg" || ext === "jpeg") {
                            contentType = "image/jpeg";
                        } else if (ext === "png") {
                            contentType = "image/png";
                        } else if (ext === "gif") {
                            contentType = "image/gif";
                        }
                    }
                    success(data, contentType);
                }
            }.bind(this),
            error: function () {
                if (error !== undefined) {
                    error();
                }
            }
        });
    },
    
    /**
     * Redirect current page to Amazon S2K Viewer.
     * @param {boolean=} isSend             Set a flag to immediately send from reader.
     * @param {boolean=} isSetupRequired    Set a flag that the RWS will force a setup.
     * @param {boolean=} isAuthRequired     Set a flag that the RWS will force authentication.
     */
    redirectToPreview: function (isSend, isSetupRequired, isAuthRequired) {
        const state = getState();
        if (state !== null && state.content !== null) {
            // Update progress information.
            if (!isSend && !isSetupRequired && !isAuthRequired) {
                state.statusMessage.setMessage("preview");
            }

            // Request the browser to open the preview.
            this.sendExtensionMessage("store-content", 
                {"send": isSend, "setup": isSetupRequired, "auth": isAuthRequired, "token": state.content.token, "content": state.content.asStorageJson()}, 
                function (message) {
                    // Terminate metrics session.
                    state.metrics.terminate(function () {
                        // ensure status message is hidden in case if redirect fails
                        state.statusMessage.terminate(false, true);
                        // Redirect to preview. Try multiple times to override user clicks.
                        var forceRedirect = function() {
                            window.console.log("redirect to preview" + message.url);
                            window.location.assign(message.url);
                            setTimeout(forceRedirect, 500);
                        };
                        forceRedirect();
                    });
                }
            );
        }
    },

    /**
     * Convert data to binary representation.
     * @param data  Data
     */
    convertToBinary: function (data) {
        // Encode UCS-2 as UTF-8.
        var utf8Data = unescape(encodeURIComponent(data));
        
        // Create a buffer for UTF-8.
        var buffer = new ArrayBuffer(utf8Data.length);
        
        // Create an array buffer view.
        var udata = new Uint8Array(buffer);
        
        // Store the data in the binary buffer.
        for (var i = 0, len = utf8Data.length; i < len; i++) {
            udata[i] = utf8Data.charCodeAt(i);
        }
        
        return udata;
    },

    /**
     * Fetch an upload URL for the data.
     * @param state     Transfer State
     */
    getUploadUrl: function (state) {
        if (state.binaryData && state.binaryData.byteLength > 0) {
            state.metrics.startTimer(state.metrics.NAMES.t_send_url);

            this.ajax({
                type: "POST",
                dataType: "json",
                url: "https://www.amazon.com/sendtokindle" + "/document-url",
                isJSONContentType: true,
                isCsrfRequired: true,
                data: {
                    "appName": `${"chrome"}_${getState().injectionContext}`,
                    "appVersion": "1.0.1.111",
                    "s2kGuid": getState().s2kGuid,
                    "fileSize": state.binaryData.byteLength,
                    "contentType": "",
                    /*parameters used for falling back to old mason api.*/
                    "extName":`${"chrome"}_${getState().injectionContext}`,
                    "extVersion": "1.0.1.111",
                    "action": "uploadUrl"
                },
                success: function (data) {
                    // the status(false) is added in case of failing to parse response.
                    if (data.status !== false) {
                        state.uploadUrl = data.uploadUrl;
                        state.stkToken = data.stkToken;
                        this.uploadToS3(state);
                    } else {
                        // Emit metrics for error case.
                        if (data.setupRequired) {
                            state.metrics.count(state.metrics.NAMES.c_send_no_auth);
                        }
                        
                        if (data.authRequired) {
                            state.metrics.count(state.metrics.NAMES.c_send_no_auth);
                        }

                        // Redirect the customer to the preview.
                        this.redirectToPreview(true, data.setupRequired, data.authRequired);
                    }
                }.bind(this),
                error: function () {
                    window.console.log("getUploadUrl fail;");
                    if (state.error !== undefined) {
                        state.error();
                    }
                },
                complete: function () {
                    state.metrics.stopTimer(state.metrics.NAMES.t_send_url);
                }
            });
        }
        else if (state.error !== undefined) {
            state.error();
        }
    },
    
    /**
     * Upload data to S3.
     * @param state     Transfer State
     */
    uploadToS3: function (state) {
        state.metrics.startTimer(state.metrics.NAMES.t_send_upload);

        // Upload the pDocs document to S3.
        this.ajax({
            url: state.uploadUrl,
            type: "PUT",
            data: state.content,
            cache: true,
            binary: true,
            isUploadToS3: true,
            success: function () {
                this.sendDocument(state);
            }.bind(this),
            error: function () {
                if (state.error !== undefined) {
                    state.error();
                }
            },
            complete: function () {
                state.metrics.stopTimer(state.metrics.NAMES.t_send_upload);
            }
        });
    },
    
    /**
     * Send document metadata.
     * @param state     Transfer State
     */
    sendDocument: function (state) {
        state.metrics.startTimer(state.metrics.NAMES.t_send_enqueue);
        this.ajax({
            type: "POST",
            dataType: "json",
            url: "https://www.amazon.com/sendtokindle" + "/send",
            isJSONContentType: true,
            isCsrfRequired: true,
            data: {
                "extName": `${"chrome"}_${getState().injectionContext}`,
                "extVersion": "1.0.1.111",
                "s2kGuid": getState().s2kGuid,
                "stkToken": state.stkToken,
                "title": state.title,
                "dataType": state.dataType,
                "author": state.author || state.source,
                "action": "sendtokindle"
            },
            success: function (data) {
                // Emit the metrics.
                state.metrics.stopTimer(state.metrics.NAMES.t_send_enqueue);
                
                // Handle the result.
                if (data.status === true) {
                    state.success();
                }
                else {
                    state.error();
                }
            },
            error: function () {
                // Emit the metrics.
                state.metrics.stopTimer(state.metrics.NAMES.t_send_enqueue);
                
                // Handle the error.
                state.error();
            }
        });
    },    
    
    /**
     * Send the current extraction result to the Send to Kindle Service. 
     */
    sendToKindle: function () {
        const state = getState();
        if (state !== null && state.content !== null) {
            // Update progress information.
            state.statusMessage.setMessage("send");
            state.metrics.count(state.metrics.NAMES.c_send_document);
            state.metrics.startTimer(state.metrics.NAMES.t_send);
            
            // Create a transfer state item for passing through the workflow.
            var transferState = state.content.asStorageJson(true);
            
            // Copy reference to metrics.
            transferState.metrics = state.metrics;
            
            // Load data into a binary buffer, if it contains a HTML document.
            if (transferState.binaryData === null) {
                transferState.binaryData = this.convertToBinary(transferState.content);
            }
            
            // Setup event handler.
            transferState.success = function () {
                // Update status message.
                state.statusMessage.setMessage("success");
                state.statusMessage.terminate(false, false);
                
                // Emit metrics.
                state.metrics.count(state.metrics.NAMES.c_send_success);
                state.metrics.stopTimer(state.metrics.NAMES.t_send);
                
                // Terminate the metrics session.
                state.metrics.terminate();
            }.bind(this);
            
            transferState.error = function () {
                // Update status message.
                state.statusMessage.setMessage("error");
                state.statusMessage.terminate(true, false);

                // Emit metrics.
                state.metrics.count(state.metrics.NAMES.c_send_error);
                state.metrics.stopTimer(state.metrics.NAMES.t_send);
                
                // Terminate the metrics session.
                state.metrics.terminate();
            }.bind(this);
            
            // Push content to history.
            this.sendExtensionMessage("store-content", {"content": state.content.asStorageJson()}, function () {
                if (!state.s2kGuid) {
                    window.console.log("Guid missing, update guid before sendtokindle");
                    this.sendExtensionMessage("extension-metadata", {"refresh": true}, function (message) {
                        state.s2kGuid = message.data.s2kGuid;
                        window.console.log("guid updated to: " + message.data.s2kGuid);
                        this.getUploadUrl(transferState);
                    }.bind(this));
                } else {
                    this.getUploadUrl(transferState);
                }
            }.bind(this));
        } else {
            window.location.console("SendToKindle fail: " + state.content);
            // Update status message.
            state.statusMessage.setMessage("error");
            state.statusMessage.terminate(true, false);
            
            // Emit metrics.
            state.metrics.count(state.metrics.NAMES.c_send_error);
            
            // Terminate the metrics session.
            state.metrics.terminate();
        }
    },
    
    /**
     * Send a RefTag to the service.
     * @param {string} refTag
     */
    sendRefTag: function (refTag) {
        // TODO: add relating api in backend.
        // Format reftag for browser extension.
        refTag = `stk_${"gch"}_ext_${refTag}`;
        var url = "https://www.amazon.com/sendtokindle" + "/reftag";
        
        // Emit a RefTag.
        this.ajax({
            //url:  this.SERVICE_URL + "?action=reftag&ref_=" + refTag,
            // TODO: Migrate to new api
            url: url + "?&ref_=" + refTag,
            type: "GET",
            dataType: "json",
            cache: false,
            timeout: 7000
        });
    },
    
    /**
     * Send preview metrics to remote service.
     * @param metrics Metrics
     * @param callback
     */
    emitMetrics: function (metrics, callback) {
        var url = "https://www.amazon.com/sendtokindle" + "/metrics";
        this.ajax({
            type: "POST",
            // TODO: migrate to new API
            url: url,
            dataType: "json",
            isJSONContentType: true,
            isCsrfRequired: true,
            cache: false,
            timeout: 10000,
            data: {
                "action": "metrics",
                "extName": `${"chrome"}_${getState().injectionContext}`,
                "extVersion": "1.0.1.111",
                "metrics": metrics
            },
            complete: callback
        });
    },
    
    /**
     * Update the customer's account with the default engine action.
     * @param action    Action
     * @param callback  Callback
     */
    setDefaultEngineAction: function (action, callback) {
        // Setup the global engine preferences through the GUID authentication mode.
        // Fire this call as fire and forget as we do not show anything.
        this.ajax({
            type: "POST",
            url: "https://www.amazon.com/sendtokindle"+ "/setup-engine",
            isCsrfRequired: true,
            data: {
                "action": "setup-engine",
                "s2kGuid": getState().s2kGuid,
                "setting": action === "SEND" ? action : "ASK"
            },
            complete: callback
        });
    },
    
    /**
     * Send a message to the extension.
     * This methods needs to be replace in the platform-specific files otherwise
     * it will just loop-back an object containing action and params. 
     * 
     * @param action    Action
     * @param data      Parameter
     */
    sendExtensionMessage(action, data, callback) {
        chrome.runtime.sendMessage({"action": action, "data": data}, function (response) {
            if (typeof callback !== 'undefined') {
                callback(response);
            }
        });
    },
    
    /**
     * Encode an array buffer as Base64 string.
     * @param {Array|string} buffer            Array Buffer / String
     * @returns {string} Base64-encoded String
     */
    encodeArrayBufferBase64: function (buffer) {
        var base64    = '';
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

        var bytes         = new Uint8Array(buffer);
        var byteLength    = bytes.byteLength;
        var byteRemainder = byteLength % 3;
        var mainLength    = byteLength - byteRemainder;

        var a, b, c, d;
        var chunk;

        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048)   >> 12; // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032)     >>  6; // 4032     = (2^6 - 1) << 6
            d = chunk & 63;               // 63       = 2^6 - 1

            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }

        // Deal with the remaining bytes and padding
        if (byteRemainder === 1) {
            chunk = bytes[mainLength];

            a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4; // 3   = 2^2 - 1

            base64 += encodings[a] + encodings[b] + '==';
        } 
        else if (byteRemainder === 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

            a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008)  >>  4; // 1008  = (2^6 - 1) << 4

            // Set the 2 least significant bits to zero
            c = (chunk & 15)    <<  2; // 15    = 2^4 - 1

            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
        }

        return base64;
    }
};



;// CONCATENATED MODULE: ./src-logic/metrics/metrics.js
/**
 * metrics.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Metrics
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */

// ######## Constructor ########
/** @constructor */
const Metrics = function (service) {
    this.sessionTime = undefined;
    this.counters = {};
    this.timers = {};
    this.service = service;

    // Flag set by the compiler to enable/disable metrics.
    this.metricsMode = "emit-metrics";
};
        
/**
 * Initialize a metrics session.
 */
Metrics.prototype = {
    // ######## Constants ########
    NAMES: {
        // -------- Counters (Common) --------
        "c_source": { "ctr": "source." },
        "c_send_document": { "ctr": "send.document", "ref": "sd_doc" },
        "c_send_success": { "ctr": "send.success", "ref": "sd_scs" },
        "c_send_error": { "ctr": "send.error", "ref": "sd_err" },
        "c_send_no_auth": { "ctr": "send.no_auth", "ref": "no_auth" },
        "c_send_no_setup": { "ctr": "send.no_setup", "ref": "no_setup" },
        
        // -------- Counters (Extensions) --------
        "c_ext_ddown_send": { "ctr": "ext.ddown_send", "ref": "snd"},
        "c_ext_ddown_send_text": { "ctr": "ext.ddown_selected", "ref": "snd_txt"},
        "c_ext_ddown_preview": { "ctr": "ext.ddown_preview", "ref": "prvw"},
        "c_ext_ddown_setup": { "ctr": "ext.ddown_setup", "ref": "stp_ddwn"},
        "c_ext_sc_send": { "ctr": "ext.sc_send", "ref": "sc_snd"},
        "c_ext_sc_preview": { "ctr": "ext.sc_preview", "ref": "sc_prvw"},
        "c_extraction_ncrt": { "ctr": "extraction.ncrt", "ref": "et_nrct" },
        "c_extraction_maps": { "ctr": "extraction.maps", "ref": "et_mps" },
        "c_extraction_multipage": { "ctr": "extraction.multipage", "ref": "et_mlp" },
        "c_extraction_result_ncrt": { "ctr": "extraction.result.ncrt", "ref": "et_r_nrct" },
        "c_extraction_result_vlb": { "ctr": "extraction.result.vlb", "ref": "et_r_vlb" },
        "c_extraction_result_atfp": { "ctr": "extraction.result.atfp", "ref": "et_r_atfp" },
        "c_extraction_error": { "ctr": "extraction.error", "ref": "et_err" },
        "c_invalid_page":  { "ctr": "extraction.invalid_page", "ref": "et_ip" },
        "c_invalid_image":  { "ctr": "extraction.invalid_image", "ref": "et_ii" },
        
        // -------- Counters for S2K Preview --------
        "c_preview_show": { "ctr": "preview.show", "ref": "show" },
        "c_preview_close": { "ctr": "preview.close", "ref": "close" },
        "c_preview_send": { "ctr": "preview.document", "ref": "sdd" },
        "c_quality_good": { "ctr": "quality.good", "ref": "qlty_gd" },
        "c_quality_bad": { "ctr": "quality.bad", "ref": "qlty_bd" },
        "c_quality_lowcd": { "ctr": "quality.confidence", "ref": "qlty_lwcd" },
        "c_feedback": { "ctr": "feedback", "ref": "fdbck" },
        "c_ui_resize": { "ctr": "ui.resize", "ref": "rsz" },
        "c_ui_menu_layout": { "ctr": "ui.menu_layout", "ref": "mn_lyt" },
        "c_ui_fsize_1": { "ctr": "ui.font_size_1", "ref": "fnt_sz_1" },
        "c_ui_fsize_2": { "ctr": "ui.font_size_2", "ref": "fnt_sz_2" },
        "c_ui_fsize_3": { "ctr": "ui.font_size_3", "ref": "fnt_sz_3" },
        "c_ui_fsize_4": { "ctr": "ui.font_size_4", "ref": "fnt_sz_4" },
        "c_ui_fsize_5": { "ctr": "ui.font_size_5", "ref": "fnt_sz_5" },
        "c_ui_margin_1": { "ctr": "ui.margin_1", "ref": "mrgn_1" },
        "c_ui_margin_2": { "ctr": "ui.margin_2", "ref": "mrgn_2" },
        "c_ui_margin_3": { "ctr": "ui.margin_3", "ref": "mrgn_3" },
        "c_ui_margin_4": { "ctr": "ui.margin_4", "ref": "mrgn_4" },
        "c_ui_margin_5": { "ctr": "ui.margin_5", "ref": "mrgn_5" },
        "c_ui_line_1": { "ctr": "ui.line_1", "ref": "ln_1" },
        "c_ui_line_2": { "ctr": "ui.line_2", "ref": "ln_2" },
        "c_ui_line_3": { "ctr": "ui.line_3", "ref": "ln_3" },
        "c_ui_line_4": { "ctr": "ui.line_4", "ref": "ln_4" },
        "c_ui_line_5": { "ctr": "ui.line_5", "ref": "ln_5" },
        "c_ui_mode_white": { "ctr": "ui.mode_white", "ref": "md_wht" },
        "c_ui_mode_sepia": { "ctr": "ui.mode_sepia", "ref": "md_sp" },
        "c_ui_mode_black": { "ctr": "ui.mode_black", "ref": "md_blck" },
        "c_ui_face_georgia": { "ctr": "ui.face_georgia", "ref": "fc_grg" },
        "c_ui_face_pt": { "ctr": "ui.face_georgia", "ref": "fc_pt" },
        "c_ui_face_palatino": { "ctr": "ui.face_georgia", "ref": "fc_pltn" },
        "c_ui_scroll": { "ctr": "ui.scroll", "ref": "scr" },
        "c_ui_scroll_small": { "ctr": "ui.scroll_small", "ref": "scr_smll" },
        "c_ui_scroll_medium": { "ctr": "ui.scroll_medium", "ref": "scr_mdm" },
        "c_ui_scroll_large": { "ctr": "ui.scroll_large", "ref": "scr_lrg" },

        // -------- Timers (Common) --------
        "t_send": { "tmr": "send.time_send" },                
        "t_send_url": { "tmr": "send.time_url" },                
        "t_send_upload": { "tmr": "send.time_upload" },                
        "t_send_enqueue": { "tmr": "send.time_enqueue" },                

        // -------- Timers (Extensions) --------
        "t_extraction": {"tmr": "extraction"},
        
        // -------- Timers (S2K Preview) -------- 
        "t_ui_resize": { "tmr": "ui.time_resize" },                
        "t_ui_layout": { "tmr": "ui.time_layout" },
        "t_feedback": { "tmr": "send.time_feedback" }
    },
        
    // ######## Methods ########
    /**
     * Initialize metrics session.
     */
    init: function () {
        this.sessionTime = Date.now();
        this.counters = {};
        this.timers = {};
    },

    /**
     * Terminate a metrics session.
     * @param {function()} callback Callback
     */        
    terminate: function (callback) {
        // Setup callback trigger.
        var invokeCallback = true;
        
        if (this.sessionTime !== undefined) {
            // Stop session timing.   
            this.sessionTime = Date.now() - this.sessionTime;
            
            // Process timer metrics data.
            var perfTimers = {};
            var perfTimersList = [];
            for (var tn in this.timers) {
                var t = this.timers[tn];
                if (t.count > 0) {
                    perfTimers[tn] = {"value": parseInt(t.sum / t.count, 10), "repeat": t.count};
                    perfTimersList.push({"name": tn, "value": parseInt(t.sum / t.count, 10), "repeat": t.count});
                }
            }
    
            // Process counter metrics data.
            var perfCounters = {};
            var perfCountersList = [];
            for (var c in this.counters) {
                perfCounters[c] = {"value" : this.counters[c]};
                perfCountersList.push({"name": c, "value": this.counters[c]});
            }
            
            // Create metrics object.
            var performanceData = {
                "sessionTime": this.sessionTime,
                "counters":  perfCountersList,
                "timers": perfTimersList
            };
            
            if (this.metricsMode === "emit-metrics") {
                // Deactivate callback trigger.
                invokeCallback = false;
                
                // Trigger service request to store metrics.
                this.service.emitMetrics(performanceData, callback);
            }
            else if (window.console !== undefined) {
                // Log metrics to console.
                window.console.log(JSON.stringify(performanceData));
            }
            
            // Reset session data.
            this.init();
        }
        
        // Invoke callback right ways, if not async action was triggered.
        if (invokeCallback === true && callback !== undefined) {
            callback();
        }
    },

    /**
     * Record an out-of-band value in a timer.
     * @param timer  Timer
     * @param value Value
     */
    recordTimer: function (timer, value) {
        if (timer !== undefined && timer.tmr !== undefined) {
            var t = this.timers[timer.tmr];
            if (t === undefined) {
                t = { sum: 0, count: 0 };
                this.timers[timer.tmr] = t; 
            }
            
            t.sum += value;
            t.count++;
        }
    },

    /**
     * Start a timer session.
     * @param timer  Timer
     */
    startTimer: function (timer) {
        if (timer !== undefined && timer.tmr !== undefined) {
            var t = this.timers[timer.tmr];
            if (t !== undefined && t.start === undefined) {
                t.start = Date.now();
            }
            else if (t === undefined) {
                this.timers[timer.tmr] = { sum: 0, count: 0, start: Date.now() };
            }
        }
    },

    /**
     * Stop a timer session.
     * @param timer  Timer
     */        
    stopTimer: function (timer) {
        if (timer !== undefined && timer.tmr !== undefined) {
            var t = this.timers[timer.tmr];
            if (t !== undefined && t.start !== undefined) {
                t.sum += Date.now() - t.start;
                t.count++;
                t.start = undefined;
            }
        }
    },
    
    /**
     * Increase prefix counter.
     * @param prefix Counter Prefix
     * @param value  Value
     */
    countWithPrefix: function (prefix, value) {
        if (prefix !== undefined && prefix.ctr !== undefined) {
            var counter = prefix.ctr + (value || "");
            if (this.counters[counter] !== undefined) {
                this.counters[counter]++;
            }
            else {
                this.counters[counter] = 1;
            }
        }
    },
    
    /**
     * Increase counters.
     * This method uses a variable parameter list.
     */
    count: function () {
        for (var i = 0; i < arguments.length; i++) {
            var counter = arguments[i];
            if (counter !== undefined && counter.ctr !== undefined) {
                // Increase counter.
                this.countWithPrefix(counter, undefined);
                
                // Send a RefTag to the service.
                if (counter.ref !== undefined) {
                    this.service.sendRefTag(counter.ref);
                }
            }
        }
    }
};



;// CONCATENATED MODULE: ./src-logic/state/state.js



/**
 * Fetch the current active window.
 * @return Window
 */
const getActiveWindow = () => {
    return window;
};

/**
 * Fetch the current active document.
 * @return Document
 */
const getActiveDocument = () => {
    return window.document;
};

class State {
    constructor() {
        // Stop re-intialization if this class has already been constructed
        if (this._instance) {
            return this._instance;
        }

        this._instance = this;

        this.stateWindow = getActiveWindow();
        this.stateDocument = getActiveDocument();

        // Always relevant dependencies no matter the injection context
        this.service = new SendToKindleService();
        this.metrics = new Metrics(this.service);

        this.abortWorkflow = false;

        // These dependencies are populated as-need depending on whether the
        // content script is injected as an extractor/preview page helper/
        // history frame helper
        /**
         * @type {import("../preview/s2k-preview").Preview | null}
         */
        this.preview = null;

        /**
         * @type {import("../model/document").SendToKindleDocument | null}
         */
        this.content = null;

        /**
         * @type {import("../status/status-message").StatusMessage | null}
         */
        this.statusMessage = null;

        /**
         * @type {import("../history/history-overlay").History | null}
         */
        this.history = null;
    
        this.abortWorkflow = false;

        /**
         * Session token for KindleDocsWebService
         * @type {string | null}
         */
        this.s2kGuid = null;

        /**
         * Flag raised on initalization
         * @type {boolean}
         */
        this.isInjected = false;

        /**
         * Behavior when the extraction engine predicts a low-quality result
         * @type {"ASK" | "PREVIEW" | "SEND"}
         */
        this.lowQualityAction = "ASK";

        /**
         * Whether the content script is being injected due to
         *  - content extraction (ocs)
         *  - preview (preview) 
         *  - history frame (history)
         * @type {"ocs" | "preview" | "history"}
         */
        this.injectionContext = "ocs";

        /**
         * e.g. chrome-extension://cgdjpilhipecahhcilnafpblkieebhea
         * @type { string | null} 
         */
        this.extensionUrl = null;
    }

    /**
     * 
     * @param {"ocs" | "preview" | "history"} injectionContext
     * @param {string | null | undefined} s2kGuid 
     * @param {string | null | undefined} extensionId
     * @param {"ASK" | "PREVIEW" | "SEND" | undefined} lowQualityAction 
     */
    initalize(injectionContext, s2kGuid, extensionId, lowQualityAction) {
        this.injectionContext = injectionContext;
        
        this.s2kGuid = s2kGuid ?? null;

        if (lowQualityAction) {
            this.lowQualityAction = lowQualityAction;
        }

        if (extensionId) {
            this.extensionUrl = `chrome-extension://${extensionId}`;
        }
        
        this.isInjected = true;
    }
}

const _state = new State();
const getState = () => _state;



;// CONCATENATED MODULE: ./src-logic/status/status-message.js
/* provided dependency */ var status_message_$ = __webpack_require__(755);
/**
 * status-message.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Generic message container.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 * 
 */


/**
 * @constructor
 */
const StatusMessage = function (mode, actionHandler) {
    // ######## Privileged Members ########
    this.stateWindow = status_message_$(getState().stateWindow);
    this.containerMode = "message";
    this.messageMode = mode || "status";
    
    this.containerSettings = undefined;
    this.modeSettings = undefined;
    
    this.container = undefined;
    this.icon = undefined;
    this.message = undefined;
    
    this.actions = undefined;
    this.neverShowAgain = undefined;
    this.actionHandler = actionHandler;
};

StatusMessage.prototype = {
    // ######## Constants ########
    /**
     * Message Container Types
     */
    CONTAINER: {
        /**
         * Standard message container for S2K.
         */
        "message": {
            "layout": '<div id="s2k-status-message"></div>',
            "styles": {
                "#s2k-status-message": {
                    "display": "none",
                    "position": "fixed",
                    "height": "107px",
                    "top": "90px",
                    "padding": "15px",
                    "z-index": 999999999999,
                    "box-shadow": "0px 0px 25px #484848",
                    "text-align": "center",
                    "border-radius": "5px",
                    "background": "#3c3c3c url(_EXTURL_/images/s2k-hsprite.png) repeat-x 0px -115px"
                }
            }
        }
    },
        
    /**
     * Message Modes
     */
    MODE: {
        /**
         * Status Message for processing actions.
         */
        "status": {
            "width": 330,
            "abortSupported": true,
            "layout": 
                '<div class="s2k-icon"></div>' +
                '<div class="s2k-message"></div>',
            "styles": {
                "#s2k-status-message": {
                    "width": "300px",
                    "height": "150px"
                },
                ".s2k-message": {
                    "margin-top": "0px",
                    "font-weight": "bold",
                    "font-size": "12px",
                    "color": "#fff",
                    "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif"
                }
            },
            "messages": {
                "default": "<div style='text-align:center;font-size:1.2em'>Loading Send to Kindle...</div>",
                "analyze": "<div style='text-align:center;font-size:1.2em'>Analyzing website...</div>",
                "preview": "<div style='text-align:center;font-size:1.2em'>Loading preview...</div>",
                "setup": "<div style='text-align:center;font-size:1.2em'>Loading device setup...</div>",
                "send": "<div style='text-align:center;font-size:1.2em'>Sending content...</div>",
                "success": "<div style='text-align:center;font-size:1.2em;margin-bottom:10px'>Upload complete.</div><span style='font-weight:normal'>Give us a few minutes to format and deliver your content.</span>",
                "error": "We're sorry but we are unable to send documents to your Kindle. Please ensure that you are connected to the network and try again.",
                "extraction": "We're sorry but there has been an error while analyzing this page.",
                "preview-plugin": "We're sorry but we are unable to preview documents of this type. Please send the document to your Kindle instead."
            },
            "icons": {
                "default": {
                    "width": "54px",
                    "height": "54px",
                    "margin": "5px auto 10px",
                    "background": "transparent url(_EXTURL_/images/s2k-spinner-large.gif)"        
                },
                "success": {
                    "margin": "0px auto 10px",
                    "width": "25px",
                    "height": "25px",
                    "background": "transparent url(_EXTURL_/images/s2k-sprite.png) no-repeat -221px -78px"        
                },
                "error": {
                    "margin": "0px auto 10px",
                    "width": "25px",
                    "height": "25px",
                    "background": "transparent url(_EXTURL_/images/s2k-sprite.png) no-repeat -247px -52px"
                },
                "extraction": {
                    "margin": "0px auto 10px",
                    "width": "25px",
                    "height": "25px",
                    "background": "transparent url(_EXTURL_/images/s2k-sprite.png) no-repeat -247px -52px"
                },
                "preview-plugin": {
                    "margin": "0px auto 10px",
                    "width": "25px",
                    "height": "25px",
                    "background": "transparent url(_EXTURL_/images/s2k-sprite.png) no-repeat -247px -52px"
                }
            }
        },
        
        /**
         * Message for low quality extractions. 
         */
        "low_quality": {
            "width": 590,
            "abortSupported": false,
            "layout":
                '<style type="text/css">' +
                '    .s2k-action { cursor: pointer; color: #f90; text-decoration: underline }' +                
                '</style>' +
                '<div class="s2k-icon"></div>' +
                '<div class="s2k-message"></div>',
            "styles": {
                "#s2k-status-message": {
                    "height": "120px",
                    "width": "560px"
                },
                ".s2k-message": {
                    "line-height": "1.5em",
                    "margin": "10px 0px",
                    "font-weight": "normal",
                    "font-size": "12px",
                    "color": "#fff",
                    "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif"
                },
                ".s2k-icon": {
                    "margin-top": "-4px"
                }
            },
            "messages": {
                "default": 'We are uncertain about creating a good representation of this webpage for reading later on Kindle. You can ' +
                           'highlight the specific text you wish to read on webpage and send using "Send Selected Text" option.' +
                           '<div style="margin-top:5px">Do you want to ' + 
                           '    <span class="s2k-action" s2k-action="PREVIEW" style="">Preview & Send</span> or ' +
                           '    <span class="s2k-action" s2k-action="SEND">Continue Sending</span>?' + 
                           '</div>' +
                           '<div style="font-size:10px;text-align:left;margin-top:1px">' +
                           '    <input class="s2k-never-show-again" type="checkbox" name="s2k-always-send" />' +
                           '    <label for="s2k-always-send">Do not show this message again.</label>' +
                           '</div>'
            },
            "icons": {
                "default": {
                    "margin": "0px auto 10px",
                    "width": "25px",
                    "height": "25px",
                    "background": "transparent url(_EXTURL_/images/s2k-sprite.png) no-repeat -247px -78px"
                }
            }
        }
    },
    
    // ######## Methods ########
    /**
     * Inject progress information.
     */
    inject: function () {
        // Load state information.
        var body = status_message_$(this.stateWindow[0].document.body);
        
        // Create DOM element for progress information.
        if (this.CONTAINER[this.containerMode] !== undefined) {
            // Set current container settings.
            this.containerSettings = this.CONTAINER[this.containerMode]; 
            
            body.append(this.containerSettings.layout);
    
            // Register container in object.
            this.container = status_message_$("#s2k-status-message");
                
            // Switch mode to initial mode.
            this.switchMode(this.messageMode);
            
            // Register event handler.
            this.stateWindow.on("resize.s2k-status", this.onResize.bind(this));
        }
    },
    
    /**
     * Switch the status message mode.
     */
    switchMode: function (mode) {
        // Fade out container.
        this.container.hide();

        // Update message mode.
        this.messageMode = mode;
        
        // Unregister all registered events.
        if (this.actions !== undefined) {
            this.actions.off("click.s2k-action");
        }
        
        // Unregister abort action.
        this.stateWindow.off("keypress.s2k-status");
        
        // Apply message mode layout.
        if (this.MODE[this.messageMode] !== undefined) {
            // Load settings for selected mode.
            this.modeSettings = this.MODE[this.messageMode];
            
            // Clear container and append mode layout.
            this.container.empty().append(this.modeSettings.layout);

            // Format message container with default style.
            this.format(this.container, this.containerSettings.styles);
            
            // Format message container with mode layout.
            this.format(this.container, this.modeSettings.styles);
            
            // Register new message/icon area.
            this.message = this.container.find(".s2k-message");
            this.icon = this.container.find(".s2k-icon");
            
            // Set default message/icon.
            this.setMessage("default");
            
            // Register actions.
            this.actions = this.container.find(".s2k-action");
            this.actions.on("click.s2k-action", this.onMessageAction.bind(this));

            // Find a never show again message box.
            this.neverShowAgain = this.container.find(".s2k-never-show-again").first();
            
            // Register an abort action, if supported.
            if (this.modeSettings.abortSupported === true) {
                this.stateWindow.on("keypress.s2k-status", this.onAbortAction.bind(this));
            }
            
            // Resize status message and show it.
            this.onResize();
            this.container.show();
        }
    },

    /**
     * Format a node with the provided styles.
     * @param $node     Node
     * @param styles    Hash(Selector, Style)
     */
    format: function ($node, styles) {
        for (var selector in styles) {
            // Load the CSS style.
            var cssStyle = styles[selector];
            
            // Replace a possible sprite URL.
            if (cssStyle.background !== undefined) {
                cssStyle.background = cssStyle.background.replace("_EXTURL_", getState().extensionUrl);
            }
            
            // Format matching elements with the mapped style.
            if ($node.is(selector)) {
                $node.css(cssStyle);
            }
            else {
                $node.find(selector).css(cssStyle);
            }
        }
    },
    
    /**
     * Remove status message container from DOM.
     * @param delay         Delay the termination in favor of a message.
     * @param immediate     Skip delay and remove immediately.
     */
    terminate: function (delay, immediate) {
        setTimeout(function () {
            this.container.fadeOut("fast", function () {
                this.container.remove();
            }.bind(this));
            
            this.stateWindow.off("resize.s2k-status");
            this.stateWindow.off("keyup.s2k-status");
        }.bind(this), 2000 * (immediate ? 0 : (delay ? 2.5 : 1)));
    },
    
    
    /**
     * Set the message that should be displayed.
     * @param messageKey   Key for Message
     */
    setMessage: function (messageKey) {
        var message = this.modeSettings.messages[messageKey];
        var icon = this.modeSettings.icons[messageKey];

        // Set message on view.
        if (message !== undefined) {
            this.message.html(message);
        }
        
        // Set icon on view.
        if (icon !== undefined) {
            // Replace extension URL place holder with the real URL.
            if (icon.background !== undefined) {
                icon.background = icon.background.replace("_EXTURL_", getState().extensionUrl);
            }
            
            if (icon["-webkit-mask-image"] !== undefined) {
                icon["-webkit-mask-image"] = icon["-webkit-mask-image"].replace("_EXTURL_", getState().extensionUrl);
            }
            
            this.icon.css(icon);
        }
    },
    
    // ######## Event Handler ########
    /**
     * Event handler for resize events.
     */
    onResize: function () {
        // Calculate left position for progress information.
        this.container.css("left", ((this.stateWindow.width() - this.modeSettings.width) / 2) + "px");
    },
    
    /**
     * Event handler for abort actions.
     * @param event Event
     */
    onAbortAction: function (event) {
        if (this.actionHandler !== undefined && event.which === 27) {
            this.actionHandler("status.abort");
        }
        return false;
    },
    
    /**
     * Event handler for message actions.
     * @param event Event
     */
    onMessageAction: function (event) {
        var action = status_message_$(event.target).attr("s2k-action");
        var isNeverShowAgain = this.neverShowAgain.is(":checked");
        
        if (action !== undefined && this.actionHandler !== undefined) {
            this.actionHandler(action, isNeverShowAgain);
        }
        return false;
    }
};



// EXTERNAL MODULE: ./node_modules/dompurify/dist/purify.js
var purify = __webpack_require__(856);
;// CONCATENATED MODULE: ./src-logic/model/document.js
/* provided dependency */ var document_$ = __webpack_require__(755);
/**
 * document.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Send To Kindle Document
 * 
 * Copyright (c) 2011 Amazon.com, Inc. All rights reserved.
 */


/**
 * @constructor
 * @param {Object=} dataType
 * @param {jQuery=} $c
 */
const SendToKindleDocument = function (dataType, $c) {
    // ######## Privileged Members ########
    this.token           = undefined;
    this.title           = null;
    this.author          = null;
    this.publicationDate = null;
    this.source          = null;
    this.url             = null;
    this.metadata        = null;
    this.contentNode     = null;
    this.binaryData      = null;
    this.dataType        = dataType;
    this.confidence      = 1.0;

    // --------- Content ---------
    if (this.dataType === "text/html" && $c !== null) {
        this.contentNode = $c;
    }
    else {
        this.binaryData = $c;
    }
    
    // -------- Conversion Format --------
    this.$kindleContent = document_$(
        "<div>" +
        "   <div class='s2k-article'>" +
        "       <div class='s2k-article-header'>" +
        "           <div class='s2k-title'></div>" +
        "           <hr style='background: transparent; color: transparent; border-left: none; border-right: none; border-top: none; border-bottom: 1px dashed #000;' />" +
        "           <div class='s2k-byline'>" +
        "               <span class='s2k-author'></span>" +
        "               <a class='s2k-source-short'></a>" +
        "               <span class='s2k-timestamp'></span>" +
        "           </div>" +
        "       </div>" +
        "       <div class='s2k-article-body'></div>" +
        "       <div class='s2k-article-footer'>" +
        "            <hr style='background: transparent; color: transparent; border-left: none; border-right: none; border-top: none; border-bottom: 1px dashed #000;' />" +
        "            Source: <a class='s2k-source-long'></a>" +
        "       </div>" +
        "   <div>" +
        "</div>");
};

SendToKindleDocument.prototype = {
    // ######## Constants ########
    BYLINE_SEPARATOR: "<span class='byline-separator'>&nbsp;&#149;&nbsp;</span>",
    
    // ######## Methods ########
    /**
     * Set extraction result.
     * @param $c    Content
     */
    setContent: function ($c) {
        // --------- Content ---------
        if (this.dataType === "text/html") {
            this.contentNode = $c.clone(true);
        }
        else {
            this.binaryData = $c;
        }
    },
    
    /**
     * Escape HTML for plain insertion.
     * @param {string} textToEscape Text that should be escaped.
     * @returns {string} Escaped Text
     */
    escapeHTML: function (textToEscape) {
        return textToEscape.replace(/[&"<>]/g, function (ch) {
            return { "&": "&amp;", '"': "&quot", "<": "&lt;", ">": "&gt;" }[ch];
        });
    },
    
    /**
     * Format a content template.
     * @param {jQuery} $ct   Content Template
     * @param {Object} pdoc  Kindle Personal Document
     */
    formatContentTemplate: function ($ct, pdoc) {
        if (this.contentNode !== null) {
            // Set the article content.
            var entry = $ct.find(".s2k-article-body");
            entry.empty().append(this.contentNode.clone(true));
            
            document_$.each(entry.find(".s2k-default-image"), function () {
                document_$(this).wrap("<div class='s2k-image-wrap'></div>");
            });
            
            document_$.each(entry.find("blockquote"), function () {
                var content = document_$(this).contents();
                var $n = document_$("<div class='s2k-blockquote'></div>").append(content);
                document_$(this).replaceWith($n);
            });
            
            entry.find(":header").addClass(".s2k-text-header");
            
            // Set metadata.
            $ct.find(".s2k-title").text(pdoc.title);
            
            // Set author
            if (pdoc.author !== null) {
                $ct.find(".s2k-author")
                    .append("By ")
                    .append(document_$("<span class='fn'></span>").text(pdoc.author))
                    .append(this.BYLINE_SEPARATOR);
            }
    
            // Set publication date.
            if (pdoc.publicationDate !== null) {
                $ct.find(".s2k-timestamp")
                    .append(this.BYLINE_SEPARATOR)
                    .append(pdoc.publicationDate);
            }
                                
            // Set source short link.
            $ct.find(".s2k-source-short").attr("href", pdoc.url);
            $ct.find(".s2k-source-short").text(pdoc.source);

            // Generate the footer URL text.
            var footerUrl = pdoc.url;
            if (footerUrl.length > 140) {
                footerUrl = footerUrl.substring(0, 137) + "...";
            }
            
            // Set the footer URL text.
            $ct.find(".s2k-source-long").attr("href", pdoc.url);
            $ct.find(".s2k-source-long").text(footerUrl);
            
            $ct.each(function () {
                (0,purify.sanitize)(this, { IN_PLACE: true });
            });

            return $ct;
        }
    },
    
    /**
     * Fetch Kindle formatted content.
     * 
     * @return {string} Kindle-formatted Content
     */
    getKindleContent: function () {
        // Format the content template
        this.formatContentTemplate(this.$kindleContent, this, true);
        
        //@preserve Create HTML document for KindleGen, this string will not be displayed parsed into a DOM.
        return "<ht" + "ml>" +
                     "<he" + "ad>" +
                     "  <meta http-equiv='Content-Type' content='text/html;charset=utf-8' />" +
                     "  <title>" + this.escapeHTML(this.title) + "</title>" +
                     "  <style type='text/css'>" +
                     "    .s2k-article-footer { font-size: 0.8em; text-align: left }" +
                     "    .s2k-title { font-size: 1.5em; font-weight: bold; color: black; }" +
                     "    .s2k-byline { font-size: 0.8em; font-style: italic; color: black; margin-bottom: 1em; }" +  
                     "    .s2k-author .fn { font-weight: bold }" +
                     "    .s2k-image-wrap { width: 100%; text-align: center; }" +
                     "    .s2k-default-image { border: #000 solid 1px; line-height: 1em; margin: 0px auto; padding: 0.25em; text-align: center; font-size: 50%; }" +
                     "    .s2k-blockquote { margin: 0em 2em 0em 2em; font-style: italic; }" +
                     "    .s2k-text-header { margin: 1em }" +
                     "    .s2k-table table { width: 100%; }" +
                     "    .s2k-table table, .s2k-table tbody, .s2k-table tr, .s2k-table td, .s2k-table th { margin: 20px 0px; border: none; border-collapse: collapse; border-spacing: 2px; font-size: inherit; }" +
                     "    .s2k-table td, .s2k-table th { border-top: none; border-left: none; border-right: none; border-bottom: 1px solid #111; }" +
                     "    .s2k-maps-table { width: 100%; border-collapse: collapse; font-size: inherit; }" +
                     "    .s2k-maps-table td { vertical-align: middle; padding-bottom: 5px; padding-top: 10px; } " +
                     "    .s2k-waypoint-header .s2k-maps-text { font-weight: bold; }" +
                     "    .s2k-maps-waypoints { margin-top: 20px; }" +
                     "    .s2k-waypoint-header { border-top: 1px solid #000; border-bottom: 1px solid #000; }" +
                     "    .s2k-waypoint-info { font-size: 70%; text-align: right;  border-top: 1px solid #000;}" +
                     "    .s2k-maps-distance { width: 10%; font-size: 80%; text-align: right; }" +
                     "    .s2k-maps-num { width: 5%; font-size: 80%; text-align: center; padding: 0px 10px; }" +
                     "    .s2k-maps-icon { width: 5%; padding: 0px 10px; text-align: center; }" +
                     "    .s2k-maps-text { padding-left: 20px; }" +
                     "    .s2k-maps-step-duration { font-size: 80%; }" +
                     "    .s2k-maps-step-notice { color: #800000; font-size: 80%; }" +
                     "    .s2k-maps-copyright, .s2k-maps-disclosure { margin-top: 20px; line-height: 1.5em; text-align: center; font-size: 70%; }" +
                     "    .s2k-maps-disclosure { margin-top: 50px; }" +
                     "    tr.s2k-darkrow { background-color: #e8e7e3; }" +
                     "    p { margin-bottom: 1em; }" +
                     "  </style>" +
                     "</head>" +
                     "<bo" + "dy>" +
                     "  " + this.$kindleContent.html() +
                     " </bo" + "dy>" +
                     "</ht" + "ml>";
    },

    /**
     * Load content from storage JSON.
     * 
     * @param {Object} data
     */
    fromStorageJson: function (data) {
        this.token = data.token || null;
        this.title = data.title || null;
        this.author = data.author || null;
        this.url = data.url || null;
        this.source = data.source || null;
        this.publicationDate = data.publicationDate || null;
        this.contentNode = data.content !== null ? document_$(data.content) : null;
        this.binaryData = data.binaryData || null;
        this.dataType = data.dataType || null;
        this.metadata = data.metadata || null;
    },
    
    /**
     * Create JSON-formatted document.
     * 
     * @param {boolean=} kindleFormat Flag for conversion into Kindle format.
     * @return {Object} JSON-formatted content.
     */
    asStorageJson: function (kindleFormat) {
        // Load content in correct format.
        var content = null;
        if (this.contentNode) {
            if (kindleFormat) {
                // @preserve Generate and sanitize a HTML document for sending.
                content = this.getKindleContent();
            } else {
                //@preserve Generate a HTML fragment for storage, and sanitize.
                content = (0,purify.sanitize)(document_$("<div />").append(this.contentNode).addBack().html());
            }
        }
        
        // Set empty content to null.
        if (document_$.trim(content) === "<div></div>") {
            content = null;
        }
        
        // Return JSON transfer object.
        return {
            "token": this.token,
            "title": this.title,
            "author": this.author,
            "url": this.url,
            "source": this.source,
            "publicationDate": this.publicationDate,
            "content": content,
            "binaryData": this.binaryData || null,
            "dataType": this.dataType,
            "metadata": this.metadata
        };
    }
};



;// CONCATENATED MODULE: ./src-logic/extractor/extractor-utils.js
/* provided dependency */ var extractor_utils_$ = __webpack_require__(755);
/**
 * 
 * extractor-utils.js
 * 
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Utilities for extractors.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 * 
 */



/**
 * @constructor
 */
const ExtractorUtils = function () {
    // ######## Members ########
    /**
     * Service Instance
     */
    this.service = new SendToKindleService();
};

ExtractorUtils.prototype = {
    // ######## Constants ########
    /**
     * Supported image types.
     */
    SUPPORTED_IMAGE_TYPES: /^(image\/(png|jpeg|jpg|gif|bmp|x-(bmp|bitmap|xbitmap|win-bitmap|windows-bitmap|ms-bmp)|ms-bmp))|(application\/(x-bmp|x-win-bitmap))/i,
        
    /**
     * Supported pagination types.
     */
    SUPPORTED_PAGE_FIELDS: /[\?&]((page\w*|pg|pgno|first|start)=(\d+,)?\d+)|(\/\d+\/$)|(\/\d+$)|(_\d+)(\.\w+)$/i,
    
    // ######## Methods ########
    /**
     * Ensure that a given URL is absolute.
     * @param {string} url      URL
     */
    makeUrlAbsolute: function (url) {
        // Ensure URL is absolute for cross-browser compatibility.
        if (url.match(/^\/\//i) !== null) {
            url = location.protocol + url;
        }
        else if (url.match(/^(http|https|mailto:|#.+)/i) === null) {
            // Set absolute path, if needed.
            if (url.substr(0, 1) !== "/") {
                // Separate dir-path from file-path
                var pathname = location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/";
                url = pathname + url;
            }
            
            // Append the origin.
            url = (location.origin || (location.protocol + "//" + location.host)) + url;
        }
        
        return url;
    },
    
    /**
     * Download and embed all images for offline use.
     * @param images        Images
     * @param index         Image Index
     * @param success       Callback
     * @param task          Active task
     */
    embedImages: function (images, index, success, task) {
        var self = this;
        // Handle all images in the result document.
        if (index < images.length) {
            var img = extractor_utils_$(images[index]);
            
            // Handle ASP.NET MVC lazy loading logic.
            var source = img.attr("src");
            if (source === undefined) {
                // Download next image.
                this.embedImages(images, index + 1, success, task);
                return;
            }
            
            // Ensure a valid URL for the image.
            source = this.makeUrlAbsolute(source);

            if (task && task.isTimedOut()) {
                img.remove();
                this.embedImages(images, index + 1, success, task);
                return;
            }
            // Download image and encode as Base64 string.
            this.service.downloadAndEncodeImage(source, function (encodedData, dataType) {
                if (dataType != null && dataType.match(self.SUPPORTED_IMAGE_TYPES) !== null) {
                    // Replace image with offline version.
                    img.attr("src", "data:" + dataType + ";base64," + encodedData);
                }
                else {
                    // Remove unsupported image.
                    img.remove();
                    
                    // Emit metrics for tracking unsupported images.
                    const state = getState();
                    state.metrics.countWithPrefix(state.metrics.NAMES.c_invalid_image, dataType.replace(/\/|-/g, "_"));
                }
                
                // Download next image.
                self.embedImages(images, index + 1, success, task);
            },
            function () {
                // Remove image from DOM.
                img.remove();
                
                // Download next image.
                self.embedImages(images, index + 1, success, task);
            });            
        }
        else {
            success();
        }
    },      

    /**
     * 
     * Analyze page links for multi-page articles.
     * @param l1    Link for first page.
     * @param l2    Link for second page.
     * 
     * [Find a solution that is faster than O(n), if possible in JS.]
     * 
     */
    analyzePageLinks: function (l1, l2) {
        var pageLink = null;
        
        if (l2 === undefined || l1 === l2) {
            // Find a matching page field.
            var matches = l1.match(this.SUPPORTED_PAGE_FIELDS);
            
            // Match the link.
            if (matches !== null && matches[1] !== undefined) {
                // Match was page query field.
                pageLink = l1.replace(matches[1], matches[2] + "=" + (matches[3] || "") + "_PN_");
            }
            else if (matches !== null && (matches[4] !== undefined || matches[5] !== undefined || matches[6] !== undefined)) {
                // Match was a permlink URL.
                var placeHolder = null;

                // Load the correct placeholder.
                if (matches[4] !== undefined) {
                    placeHolder = "/_PN_/"; 
                }
                else if (matches[5] !== undefined) {
                    placeHolder = "/_PN_";
                }
                else {
                    placeHolder = "__PN_" + matches[7];
                }
                
                pageLink = l1.replace(this.SUPPORTED_PAGE_FIELDS, placeHolder);
            }
        }
        else {
            // Find the length of the smallest string.
            var length = Math.min(l1.length, l2.length);
            
            // Analyze string an replace the page numbers by _PN_.
            var pageNumber = false;
            pageLink = "";
            
            for (var i = 0; i < length; i++) {
                if ((l1.charCodeAt(i) ^ l2.charCodeAt(i)) === 0 && pageNumber === false) {
                    pageLink += l1.charAt(i);
                }
                else if (pageNumber === true) {
                    pageNumber = (pageNumber === true && l1[i].match(/\d/i) !== null);
                    if (pageNumber === false) {
                        pageLink += l1.charAt(i);
                    }
                }
                else {
                    pageLink += "_PN_";
                    pageNumber = true;
                }
            }
        }
        
        return pageLink;
    },

    /**
     * Test a link against the page template link.
     * @param link          Link
     * @param pageLink      Template
     * @param pageParam     Parameter for the URL indicating the page.
     */
    testPageLink: function (link, pageLink, pageParam) {
        var pageNumber = null;
        
        // Fetch page number from original link.
        if (pageParam[0] === "/") {
            pageNumber = link.match(/\/(\d+)\/?$/i);
        }
        else if (pageParam[0] === "_") {
            pageNumber = link.match(/_(\d+)\.\w+$/i);
        }
        else {
            pageNumber = link.match(new RegExp(pageParam.replace("?", "\\?") + "(\\d+)", "i"));
        }
        
        // Test for page number.
        pageNumber = (pageNumber !== null ? pageNumber = pageNumber[1] : "_PN_");
        
        // Create a page link from the template and compare to link.
        // Do a sanity test to make sure that the link at least contain
        // each other.
        return link.indexOf(pageLink.replace(/_PN_/g, pageNumber)) !== -1;
    },
    
    /**
     * Get the path for a node to the body tag.
     * @param $node         Node
     * @return XPath
     */
    getPathForNode: function ($node) {
        var path = "";
        var $n = $node;
        var metrics = $n.data("s2k");
            
        // Traverse to the body node.
        while (metrics.tag_name !== "body") {
            path = "/" + metrics.node_name + path;
            $n = $n.parent();
            metrics = $n.data("s2k");
        }
        
        return path;
    },
    
    /**
     * Get a node from a path or ID.
     * @param $baseNode
     * @param path  Path or ID
     * @return Node
     */
    getNodeFromPath: function ($baseNode, path) {
        if (path[0] === "#") {
            $baseNode = $baseNode.find(path);
        }
        else {
            try {
                // Split path for traversal.
                path = path.substring(1).split("/");
                var $n = $baseNode;

                // Traverse the DOM to the content node(s).
                for (var i = 0, length = path.length; i < length - 1; i++) {
                    if (path[i] !== null) {
                        $n = $n.filter(path[i]);
                        if ($n === undefined || $n.length === 0) {
                            break;
                        }
                        $n = extractor_utils_$($n).children();
                    }
                }

                // Load the matching nodes, if traversal was successful.
                // If there was a problem in the traversal, try to do a
                // greedy load of result nodes.
                if ($n === undefined) {
                    $baseNode = $baseNode.find(path[length - 1]);
                }
                else {
                    $baseNode = $n.filter(path[length - 1]);
                }
            } catch (e) {
                return null;
            }
        }
        return $baseNode;
    }
};



;// CONCATENATED MODULE: ./src-common/utils/formatPublicationDate.js
/**
 * @param {Date} inputDate 
 * @returns {string} Date in format "MMMM dd, yyyy"
 */
 const formatPublicationDate = (inputDate) => {
    const monthName = inputDate.toLocaleDateString('default', { month: "long" });
    const dayInMonth = inputDate.getDate();
    const year = inputDate.getFullYear();

    return `${monthName} ${dayInMonth}, ${year}`;
};



;// CONCATENATED MODULE: ./src-logic/extractor/map-extractor.js
/* provided dependency */ var map_extractor_$ = __webpack_require__(755);
/**
 * map-extraction.js
 * 
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Extractor for map applications.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */






/**
 * @constructor
 */
const MapExtractor = function () {
    // ######## Members #######
    this.mapProviders = [
        {name: "Google Maps", urlScheme: /maps\.google\.\w+/i, handler: this.extractGMaps},
        {name: "Bing Maps", urlScheme: /\w\.bing\.\w+\/maps/i, handler: this.extractBMaps}
    ];
    this.rowFlag = false;
};

MapExtractor.prototype = {
    // ######## Constants ########
    /**
     * Tag to be remove while copying the content.
     */
    REMOVABLE_TAGS: "script,noscript,object,embed,iframe,frame,frameset,noframes,aside,menu,header,footer,source,audio,video,form,ins,del,style,form,cite,.social-media-container",

    /**
     * Template for map results.
     */
    MAP_TEMPLATE: '<div class="s2k-content-map">' +
                  '   <div class="s2k-maps-disclosure"></div>' +
                  '   <div class="s2k-maps-copyright"></div>' +
                  '</div>',
    
    MAP_WAYPOINTS: '<div class="s2k-map-waypoints">' +
                   '    <table class="s2k-maps-table">' +
                   '    </table>' +
                   '</div>',
    MAP_WP_HEADER: '<tr class="s2k-darkrow s2k-waypoint-header">' +
                   '    <td class="s2k-maps-icon"></td>' +
                   '    <td class="s2k-maps-text" colspan="2"></td>' +
                   '    <td class="s2k-maps-distance" style="font-size: 70%">' +
                   '        <div class="s2k-maps-distance s2k-maps-step-distance"></div>' +
                   '        <div class="s2k-maps-distance s2k-maps-total-distance"></div>' +
                   '    </td>' +
                   '</tr>',
                   
    MAP_WP_ENTRY: '<tr class="s2k-waypoint-step">' +
                  '    <td class="s2k-maps-icon"></td>' +
                  '    <td class="s2k-maps-num"></td>' +
                  '    <td class="s2k-maps-text">' +
                  '         <div class="s2k-maps-step-description"></div>' +
                  '         <div class="s2k-maps-step-notice"></div>' +
                  '         <div class="s2k-maps-step-duration"></div>' +
                  '    </td>' +
                  '    <td class="s2k-maps-distance">' +
                  '        <div class="s2k-maps-distance s2k-maps-step-distance"></div>' +
                  '        <div class="s2k-maps-distance s2k-maps-total-distance"></div>' +
                  '    </td>' +
                  '</tr>',
    
    MAP_WP_SUMMARY: '<tr class="s2k-waypoint-info">' +
                    '   <td colspan="4"></td>' +
                    '</tr>',
                  
    MAX_MAP_RETRIES: 10,

    // ######## Methods ########
    /**
     * Format map content.
     * @param mapData   Map Data
     */
    format: function (mapData) {
        // Create a content template.
        var $content = map_extractor_$(this.MAP_TEMPLATE);
        
        // Set legal information.
        if (mapData.disclaimer !== null) {
            $content.find(".s2k-maps-disclosure").text(mapData.disclaimer);
        }
        
        // Set map data copyright.        
        if (mapData.copyright !== null) {
            $content.find(".s2k-maps-copyright").text(mapData.copyright);            
        }            
        
        // Process waypoints.
        if (mapData.waypoints && mapData.waypoints.length > 0) {
            var self = this;
            var waypoints = map_extractor_$(this.MAP_WAYPOINTS);
            var wplist = waypoints.find("table.s2k-maps-table");
            
            // Iterate all waypoints.
            mapData.waypoints.each(function () {
                switch (this.type) {
                case "HEADER":
                    wplist.append(self.formatHeader(this));
                    self.rowFlag = false;
                    break;
                case "STEP":
                    wplist.append(self.formatStep(this));
                    self.rowFlag = !self.rowFlag;
                    break;
                case "SUMMARY":
                    wplist.append(self.formatWpSummary(this));
                }
            });

            // Append waypoint list.
            $content.prepend(waypoints);
        }
        
        // Handle image, if available.
        if (mapData.mapImage && mapData.mapImage.length > 0) {
            // Push the image to the result.
            $content.prepend(map_extractor_$("<div class='s2k-maps-image s2k-default-image'>").append(
                                map_extractor_$("<img>", {"src": mapData.mapImage.attr("src"), "width": "100%" })));
            
            // Set image container width.
            $content.find(".s2k-maps-image").width(
                Math.min(mapData.mapImage[0].naturalWidth || map_extractor_$(mapData.mapImage[0]).width() || 500, 500)
            );
        }
        
        return $content;
    },

    /**
     * Format an image.
     * @param image
     */
    formatImage: function (image) {
        if (image && image.length > 0) {
            // Image is a real image.
            if (typeof(image) === "object" && image.attr("src").match(/(gray|transparent)\.png/i) === null) {
                var width = image.attr("width") || image.width();
                var height = image.attr("height") || image.height();
                return "<img src='" + image.attr("src") + "' " +
                       "   width='" + width + "' " +
                       "   height='" + height + "' " +
                       "   style='width:" + width + "px;height:" + height + "px' />";                
            }
            else if (typeof(image) === "string") {
                return image;
            }
        }
        return "";
    },
    
    /**
     * Format a waypoint header.
     * @param headerData
     */
    formatHeader: function (headerData) {
        var header = map_extractor_$(this.MAP_WP_HEADER);
        var icon = headerData.icon;
        var text = headerData.text;
        var distance = headerData.distance;
        var time = headerData.time;
        
        // Set header icon.
        header.find(".s2k-maps-icon").append(this.formatImage(icon));
        header.find(".s2k-maps-text").text(text);
        header.find(".s2k-maps-distance .s2k-maps-step-distance").text(distance);
        header.find(".s2k-maps-distance .s2k-maps-total-distance").text(time);
        
        return header;
    },

    /**
     * Format a waypoint step
     * @param stepData
     */
    formatStep: function (stepData) {
        // Create a waypoint entry.
        var step = map_extractor_$(this.MAP_WP_ENTRY);
        
        // Alternate row color.
        if (this.rowFlag === true) {
            step.addClass("s2k-darkrow");
        }

        // Set step data.
        step.find(".s2k-maps-icon").append(this.formatImage(stepData.icon));
        step.find(".s2k-maps-num").append(stepData.number);
        step.find(".s2k-maps-step-description").append(stepData.text);
        step.find(".s2k-maps-step-notice").append(stepData.notice);
        step.find(".s2k-maps-step-duration").append(stepData.duration);
        step.find(".s2k-maps-step-distance").append(stepData.stepDistance);
        step.find(".s2k-maps-total-distance").append(stepData.totalDistance);
        
        return step;
    },
    
    /**
     * Format waypoint summary.
     * @param wpsData   Summary Data
     */
    formatWpSummary: function (wpsData) {
        return map_extractor_$(this.MAP_WP_SUMMARY).find("td").append(wpsData.text);
    },
    
    /**
     * Extract directions from Google Maps.
     * @param state     State
     */
    extractGMaps: function (state, extractor, callback) {
        var $baseNode = map_extractor_$(state.stateDocument.body);
        
        if (state.stateDocument.location.href.search("&pw=2") === -1) {
            var permLink = $baseNode.find(".permalink-button").attr("href") + "&pw=2";
            
            // Create iframe for print view.
            $baseNode.append("<iframe id='s2k-print-frame' frameborder='0' " +
                             "    style='position:absolute;top:-800px;left:-800px;width:800px;height:800px;'></iframe>");

            // Load content in iframe.
            var printFrame = $baseNode.find("#s2k-print-frame");
            printFrame.attr("src", permLink);
            printFrame.load(function () {
                // Pass content on for formatting.
                extractor.handleGMapsContent(map_extractor_$(printFrame[0].contentDocument.body), state.stateDocument.location.href, callback);
            });
        }
        else {
            // Pass content on for formatting.
            extractor.handleGMapsContent($baseNode, state.stateDocument.location.href, callback);
        }
    },

    /**
     * Handle Google Maps content.
     * @param $baseNode     Content Node
     * @param permLink      Link to the content.
     * @param callback      Callback
     * @param retries       Retries for map data.
     * @return Formatted Map Data
     */
    handleGMapsContent: function ($baseNode, permLink, callback, retries) {
        // Initialize retries, if necessary.
        retries = retries || 0;

        // Try to load the map image or proceed without, if maximum retries
        // was already hit by the extractor.
        var mapImage = $baseNode.find(".printimage");
        if (mapImage.length === 0 && retries < this.MAX_MAP_RETRIES) {
            // Try to trigger the event that shows the map.
            if ($baseNode.find("#main_map").css("display") === "none") {
                $baseNode.find("#showmap_cb").click();
            }
            
            // Retry in 100ms.
            setTimeout(function () {
                this.handleGMapsContent($baseNode, permLink, callback, (++retries));
            }.bind(this), 200);
        } else {
            // Load page block.
            var $c = $baseNode.find("#page");
            
            // Create map data.
            var mapData = {
                "mapImage": "",
                "disclaimer": map_extractor_$($c.find(".legal")[0]).text(),
                "copyright": map_extractor_$($c.find(".legal")[1]).text(),
                "waypoints": []
            };
            
            // Find the direction information.
            var directions = $c.find("#panel_dir");
            if (directions.length > 0) {
                var waypoints = map_extractor_$(this.MAP_WAYPOINTS);

                directions.children().each(function () {
                    var $n = map_extractor_$(this);
                    if ($n.hasClass("ddwpt") === true) {
                        mapData.waypoints.push({
                            "type": "HEADER",
                            "icon": $n.find(".ddptlnk img"),
                            "text": map_extractor_$.trim($n.find(".ddw-addr").text()),
                            "distance": map_extractor_$.trim($n.find(".ddw-dist").text()),
                            "time": ""
                        });
                    }
                    else if ($n.attr("id") && $n.attr("id").match(/ddr\d+/i) !== null) {
                        // Load steps and format them.
                        $n.find(".segmentdiv").each(function () {
                            // Load segment.
                            var $seg = map_extractor_$(this);
                            
                            // Create map data object for step.
                            var stepData = {
                                "type": "STEP",
                                "icon": $seg.find(".icon img"),
                                "number": map_extractor_$.trim($seg.find(".num").text()),
                                "text":  null,
                                "notice": null,
                                "duration": null,
                                "stepDistance": null,
                                "totalDistance": null
                            };
                            mapData.waypoints.push(stepData);
                            
                            // Load segment data.
                            var info = $seg.find(".dirsegtext");
                            var distance = $seg.find(".sdist").children();
                            
                            // Description for current step.                        
                            stepData.text = map_extractor_$(info.children()[1]).contents().clone(true);
                            stepData.text.remove("div");
                            
                            // Notice for current step.
                            stepData.notice = map_extractor_$.trim(info.find(".dirsegnote").text());
                            
                            // Duration of current step.
                            stepData.duration = map_extractor_$.trim(info.find(".segtime").text());
                            
                            // Distance information for current step.
                            stepData.stepDistance = map_extractor_$.trim(map_extractor_$(distance[0]).text());
                            stepData.totalDistance = map_extractor_$.trim(map_extractor_$(distance[1]).text());
                        });
                    }
                    else if ($n.attr("class") && $n.attr("class").match(/dir-rtesum/i)) {
                        mapData.waypoints.push({
                            "type": "SUMMARY",
                            "text": map_extractor_$.trim($n.text())
                        });
                    }
                });
            }
            
            // Find and append the map.
            mapData.mapImage = $c.find(".printimage");
            
            // Return map data.
            callback(true, permLink, mapData);
        }
    },
    
    /**
     * Extract directions from Bing Maps.
     * @param state     State
     * @param extractor Extractor
     * @param callback  Callback
     */
    extractBMaps: function (state, extractor, callback) {
        var $baseNode = map_extractor_$(state.stateDocument.body);
        var location = state.stateDocument.location;
        var printView = location.href.match(/pt=([a-z]+)/i);
        
        if (printView === null) {
            var printViewType = "pb";
            
            // Ensure that the hash is up to date for directions.
            if ($baseNode.find(".goButton").length > 0) {
                // Execute mapping functionality.
                $baseNode.find(".goButton").click();
                printViewType = "pf";
            }

            // Read mapping query string.
            var queryString = decodeURIComponent(atob(window.location.hash.substring(1)));
            if (queryString === "") {
                callback(false, undefined, undefined, undefined);
            }
            else {
                // Replace coordinates parameter with print version for directions view.
                if (printViewType === "pf") {
                    var coords = queryString.match(/cp=(-?\d+\.\d+)~(-?\d+\.\d+)/i);
                    if (coords !== null) {
                        queryString = queryString.replace(coords[0], "cp=" + coords[1] + "," + coords[2]);
                        queryString = queryString.replace("lvl=", "z=");
                        queryString +=  "&pt=" + printViewType;
                    }
                }
                
                // Create parameters fro 
                if (printViewType === "pb" && queryString !== "") {
                    var poiText = encodeURIComponent(map_extractor_$.trim(map_extractor_$("#searchPageContextContent h2").contents()[0].nodeValue));
                    var poiCoords = map_extractor_$("#searchPageLatLongContent").text().replace(" ", ",");
                    queryString = "mkt=en-us&z=10&s=r&cp=" + poiCoords + "&poi=" + poiText + "&b=1&pt=" + printViewType;
                }
                
                // Build a permlink for the print preview.
                var permLink = location.protocol + "//" + location.host + "/maps/print.aspx?" + queryString;
                
                // Create iframe for print view.
                $baseNode.append("<iframe id='s2k-print-frame' frameborder='0' " +
                                 "    style='position:absolute;top:-800px;left:-800px;width:800px;height:800px;'></iframe>");
    
                // Load content in iframe.
                var printFrame = $baseNode.find("#s2k-print-frame");
                printFrame.attr("src", permLink);
                printFrame.load(function () {
                    // Pass content on for formatting.
                    extractor.handleBMapsContent(map_extractor_$(printFrame[0].contentDocument.body), state.stateDocument.location.href, printViewType, callback);
                });
            }
        }
        else {
            extractor.handleBMapsContent($baseNode, state.stateDocument.location.href, printView[1], callback);
        }
    },
        
    /**
     * Handle the Bing Maps content.
     * @param $baseNode         Base Node
     * @param permLink          Source Link
     * @param pvt               Print View Type
     * @param callback          Callback
     */
    handleBMapsContent: function ($baseNode, permLink, pvt, callback) {
        // Load main content block.
        var $c = $baseNode.find("#mainContents");

        // Create map data.
        var mapData = {
            "mapImage": $c.find((pvt === "pf" ? ".map" : ".map.mapbasic")),
            "disclaimer": $c.find(".disclaimer").text(),
            "copyright": "",
            "waypoints": []
        };        
        
        // Find the direction information.
        var directions = $c.find("#DrivingInstructions");
        if (directions.length > 0) {
            directions.each(function () {
                var $dir = map_extractor_$(this);

                // Find all steps for this waypoint.
                $dir.find("li").each(function () {
                    var $n = map_extractor_$(this);
                    
                    if ($n.attr("id") === undefined && $n.attr("class") === "directionStepList") {
                        // Load waypoint header data.
                        mapData.waypoints.push({
                            "type": "HEADER",
                            "icon": map_extractor_$.trim($n.find(".directionStepImg").text()),
                            "text": map_extractor_$.trim($n.find(".directionHeaderText").text()),
                            "distance": map_extractor_$.trim($n.find(".directionLegDistance").text()),
                            "time": map_extractor_$.trim($n.find(".directionLegTime").text()) 
                        });
                    }
                    else if ($n.attr("id") !== undefined && $n.attr("class") === "directionStepList") {
                        // Create step data.
                        var stepData = {
                            "type": "STEP",
                            "icon": $n.find(".directionStepImg"),
                            "number": map_extractor_$.trim($n.find(".directionStepNumber").text()),
                            "text":  null,
                            "notice": "",
                            "duration": "",
                            "stepDistance": map_extractor_$.trim($n.find(".directionStepDistance").text()),
                            "totalDistance": ""
                        };
                        mapData.waypoints.push(stepData);
                        
                        // Reformat notices.
                        $n.find(".directionStepIncident").each(function () {
                            stepData.notice += "<div>" + map_extractor_$.trim(map_extractor_$(this).text()) + "</div>";
                        });
                        
                        // Reformat step description
                        var description = map_extractor_$("<div></div>").append($n.find(".directionStepInstruction").contents().clone(true));
                        description.find("span.instructionKeyword").replaceWith(function () { 
                            return (map_extractor_$("<strong>").text(map_extractor_$(this).text()));
                        });
                        stepData.text = description;
                    }
                });
            });
        }        
        
        // Create a document title from the addresses.
        var title = "";
        $baseNode.find("#waypointsAddress, .locationText").each(function () { 
            title += map_extractor_$.trim(map_extractor_$(this).text()) + " to ";
        });
        title = title.substring(0, title.length - 4);
        
        // Pass content on for formatting.
        callback(true, permLink, mapData, title);
    },
    
    /**
     * Extract from a map provider.
     * @param task  interface to report progress and check for timeout
     */
    extract: function (task) {
        // Load active document
        var state = getState();
        var d = state.stateDocument;
        
        // Load extractor for map provider.
        var mapProvider;
        for (var i = 0, len = this.mapProviders.length; i < len; i++) {
            if (d.location.href.match(this.mapProviders[i].urlScheme)) {
                mapProvider = this.mapProviders[i];
            }
        }
        
        // Extract map content.
        mapProvider.handler(state, this, function (success, url, mapData, title) {
            if (success === true) {
                // Format map data for Kindle.
                var $content = this.format(mapData);
                
                // Create result object.
                var result = new SendToKindleDocument("text/html", $content);
                result.title = (title || d.title).replace(" - Google Maps", "").replace(" on Bing Maps - Bing Maps", "");
                result.url = url;
                result.metadata = "Send To Kindle, Maps Extractor";
                result.publicationDate = formatPublicationDate(new Date());
                
                // Set source.
                var source = d.location.hostname.match(/.*\.(.*\.\w{3})$/);
                result.source = ((source === null || source.length < 2) ? d.location.hostname : source[1]);

                // Embed all images.
                (new ExtractorUtils()).embedImages(result.contentNode.find("img"), 0, function () {
                    task.progress({"success": true, "data": result});
                }, task);
            }
            else {
                task.progress({"error": true, "data": "EXTRACTION_FAILED"});
            }
        }.bind(this)); 
    }
};


;// CONCATENATED MODULE: ./src-logic/model/node-metrics.js
/* provided dependency */ var node_metrics_$ = __webpack_require__(755);
/**
 * node-metrics.js
 * 
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Metrics for a node.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */


/**
 * @constructor
 */
const NodeMetrics = function ($node, index, depth, layerIndex, isVisible, isLink, isMetadata) {
    // ######## Members ########
    
    // -------- Index / Position --------
    this.index = index;
    this.depth = depth;
    this.layer_index = layerIndex;
    this.node_id = $node.attr("id") || "#unknown_id";
    this.node_style_class = $node.attr("class") || "#unknown_class";

    // -------- Node --------
    this.node = $node;
    this.tag_name = "#invalid";
    this.node_name = "#invalid";
    
    // -------- Visual Layout --------
    this.node_width = 0;
    this.node_height = 0;
    this.node_area = 0;    
    
    // -------- Flags ---------
    this.is_valid_container = false;
    this.is_small_image = false;
    this.is_medium_image = false;
    this.is_large_image = false;
    this.is_skip_image = false;
    this.is_text = false;
    this.is_plain_text = false;
    this.is_link_text = false;
    this.is_link = false;
    this.is_inside_link = isLink;
    this.is_ad_link = false;
    this.is_ad_image = false;
    this.is_ad_node = false;
    this.is_named_node = false;
    this.is_inline_node = false;
    this.is_visible_node = isVisible;
    this.is_skip_node = false;
    this.is_comment_node = false;
    this.is_atf_node = false;
    this.is_btf_node = false;
    
    // -------- Metadata Flags ---------
    this.is_metadata_node = false;
    this.is_inside_metadata = isMetadata;
    this.is_author_node = false;
    this.is_title_node = false;
    this.is_date_node = false;
    
    // -------- Pagination --------
    this.is_pagination = false;
    
    // -------- Counters --------
    this.count_links = 0;
    this.count_texts = 0;
    this.count_plain_texts = 0;
    this.count_link_texts = 0;
    this.count_ad_nodes = 0;
    this.count_ad_links = 0;
    this.count_ad_images = 0;
    this.count_images = 0;
    this.count_small_images = 0;
    this.count_medium_images = 0;
    this.count_large_images = 0;
    this.count_skip_images = 0;
    this.count_lines = 0;
    this.count_words = 0;
    this.count_small_paragraphs = 0;
    this.count_large_paragraphs = 0;
    this.count_valid_containers = 0;
    this.count_inline_nodes = 0;
    this.count_metadata_nodes = 0;
    this.length_link_text =  0;
    this.length_plain_text = 0;
    this.length_text = 0;
    
    // --------- Statistics ---------
    this.link_density = 0;
    this.link_text_density = 0;
    this.ratio_length_plain_text = 0;
    this.ratio_length_link_text = 0;
    this.ratio_length_text = 0;
    this.ratio_node_width = 0;
    this.ratio_node_area = 0;
    this.ratio_node_atf = 0;
    this.ratio_node_btf = 0;
    
    // --------- Sub-Tree Counters --------
    this.subtree_links = 0;
    this.subtree_texts = 0;
    this.subtree_plain_texts = 0;
    this.subtree_link_texts = 0;
    this.subtree_ad_nodes = 0;
    this.subtree_ad_links = 0;
    this.subtree_ad_images = 0;
    this.subtree_images = 0;
    this.subtree_small_images = 0;
    this.subtree_medium_images = 0;
    this.subtree_large_images = 0;
    this.subtree_skip_images = 0;
    this.subtree_lines = 0;
    this.subtree_words = 0;
    this.subtree_small_paragraphs = 0;
    this.subtree_large_paragraphs = 0;
    this.subtree_valid_containers = 0;
    this.subtree_inline_nodes = 0;
    this.subtree_metadata_nodes = 0;    
    this.subtree_length_text = 0;
    this.subtree_length_link_text =  0;
    this.subtree_length_plain_text = 0;
    
    // --------- Sub-Tree Statistics --------
    this.subtree_link_density = 0;
    this.subtree_link_text_density = 0;
    this.subtree_ratio_length_plain_text = 0;
    this.subtree_ratio_length_link_text = 0;

    // --------- Classification --------- 
    this.is_ncrt_candidate = false;
    this.ncrt_content_index = 1;
    this.ncrt_noise_index = Number.MAX_VALUE;
    this.ncrt_score = Number.MAX_VALUE;
    
    this.is_vlb_candidate = false;
    this.vlb_content_index = 1;
    this.vlb_noise_index = Number.MAX_VALUE;
    this.vlb_score = Number.MAX_VALUE;

    // --------- Runtime Metrics ---------
    this.count_child_nodes = this.node[0].childNodes.length;
    
    // ######## Initialization ########
    this.analyzeNode();
};

NodeMetrics.prototype = {
    // ######## Constants ########
    SMALL_IMAGE_AREA: 5500,
    MEDIUM_IMAGE_AREA: 15000,
    LARGE_IMAGE_AREA: 50000,
    
    SMALL_IMAGE_WIDTH: 90,
    SMALL_IMAGE_HEIGHT: 90,
    MEDIUM_IMAGE_WIDTH: 150,
    MEDIUM_IMAGE_HEIGHT: 150,
    LARGE_IMAGE_WIDTH: 400,
    LARGE_IMAGE_HEIGHT: 100,
    
    DEFAULT_LINE_LENGTH: 80,            // 80 characters per line 
    SMALL_PARAGRAPH_WORDS: 50,          // 50 words per paragraph 
    LARGE_PARAGRAPH_WORDS: 80,          // 80 words per paragraph
    
    SKIP_ELEMENT: /^(button|input|select|textarea|optgroup|command|datalist|frame|frameset|iframe|noframes|style|script|noscript|canvas|applet|map|marquee|area|base|details|dir|object|embed|aside|menu|source|audio|video|del|ins|select)$/i,
    CONTAINER_TAGS: /^(body|article|section|div|td|li|dd|center|span|content|table)$/i,
    INLINE_TAGS: /^(h1|h2|h3|h4|h5|h6|b|strong|i|em|p|pre)$/i,

    AD_DOMAINS: /googlesyndication\.com|\.2mdn\.net|de17a\.com|content\.aimatch\.com|doubleclick\.net|adbrite\.com|adbureau\.net|admob\.com|bannersxchange\.com|buysellads\.com|impact\-ad\.jp|atdmt\.com|advertising\.com/i,
    AD_WRAPPER_ATTRS: ["id", "class"],
    AD_WRAPPER: /(^|\s|\w+_)(ad[s]?|advertisement|sponsored|strybtmmorebx|resaudio|articlead)(_\w+|\s|$)/i,
    AD_WRAPPER_EXCLUDE: /ads_backsplashSkin/i,
    
    NAME_ATTRS: ["id", "class", "ref", "prop", "itemprop", "property", "name"],
    NODE_NAMES: /posttext|post_text|postbody|post_body|entry|entry_body|body|storycontent|storybody|story_content|story_body|article\-body|articlebody|story|mainstory|CPLjOe|amabot_center/i,
    NODE_NAMES_EXCLUDE: /[\s\-_]?(date|time|timestamp|tmstmp|title|headline|header|author|byline)[\s\-_]?/i,
    
    COMMENT_NAMES: /disqus|comment|comments|dsqs|cmmnt|disqus_thread|gemAid|share/i,
    COMMENT_NAMES_EXCLUDE: /c_comment/i,
    
    META_DATE_NAMES: /[\s\-_]?(date|time|timestamp|datestamp|posted\-on|tmstmp)[\s\-_]?/i,
    META_TITLE_NAMES: /[\s\-_]?(title|headline|story-header|heading|hed)[\s\-_]?|(^name$)/i,
    META_AUTHOR_NAMES: /[\s\-_]?(author|byline|posted\-by|postFrom|cnnByline|writer)[\s\-_]?/i,
    META_EXCLUDE: /[\s\-_]?(hentry|entry-content|post-body|timeline|twitter|facebook|tw\w+|fb-status|mw-headline|hyper|ignore|captioned|expCaption|authorIdentification|caption|editable|nav|program|subheading|timestamp-\d+)[\s\-_]?/i,
    
    PAGE_NAME_ATTRS: ["id", "class"],
    PAGE_NAMES: /pag|^(nav|controls)$/i,
    PAGE_NAMES_EXCLUDE: /newpage|pagenum|\w+-item/i,
    
    // ######## Methods ########
    /**
     * Analyze tag name.
     */
    analyzeTagName: function () {
        var nodeType = this.node[0].nodeType;
        var nodeName = this.node[0].tagName;
        
        if (nodeType === 3) {
            this.tag_name = "#text";
        }
        else if (nodeType === 1 && nodeName && nodeName > '') {
            this.is_valid_container = (this.CONTAINER_TAGS.test(nodeName) && !this.is_inside_link);
            this.tag_name = nodeName.toLowerCase();

            // Set the full identifying name of the node.
            this.node_name = this.tag_name + 
                             (this.node_id !== "#unknown_id" ? "#" + this.node_id : "") + 
                             (this.node_style_class !== "#unknown_class" ? "." + node_metrics_$.trim(this.node_style_class).replace(/\s/g, ".") : "");
        }
    },

    /**
     * Analyze as text node.
     */
    analyzeTextNode: function () {
        var node = this.node[0];
        
        // Ignore non-text nodes and empty/whitespace nodes.
        if (node.nodeType !== 3 || node.nodeValue.length === 0 || (/^\s+$/.test(node.nodeValue))) {
            return;
        }
        
        var textLength = node.nodeValue.length;

        this.is_text = true;
        this.is_plain_text = !this.is_inside_link;
        this.is_link_text = this.is_inside_link;
        this.length_text = textLength;
        this.length_link_text = (this.is_inside_link ? textLength : 0);
        this.length_plain_text = (!this.is_inside_link ? textLength : 0);
        
        this.count_words = node.nodeValue.split(" ").length;
        this.count_lines = textLength / this.DEFAULT_LINE_LENGTH;
        this.count_small_paragraphs = this.count_words / this.SMALL_PARAGRAPH_WORDS;
        this.count_large_paragraphs = this.count_words / this.LARGE_PARAGRAPH_WORDS; 
    },

    /**
     * Analyze node as link.
     */
    analyzeLinkNode: function () {
        // Load DOM node.
        var node = this.node[0];
        
        // Test the node for a valid link.
        this.is_link = (node.href && node.href !== "");
        
        // Test node 
        if (this.is_link && this.AD_DOMAINS.test(node.href)) {
            this.is_ad_node = true;
            this.is_ad_link = true;
        }
    },
    
    /**
     * Analyze node as image.
     */
    analyzeImageNode: function () {
        var node = this.node[0];
        var width = this.node.width();
        var height = this.node.height();
        
        if ((width * height) > this.LARGE_IMAGE_AREA || ((width >= this.LARGE_IMAGE_WIDTH) && (height >= this.LARGE_IMAGE_HEIGHT))) {
            this.is_large_image = true;
        }
        else if ((width * height) > this.MEDIUM_IMAGE_AREA || ((width >= this.MEDIUM_IMAGE_WIDTH) && (height >= this.MEDIUM_IMAGE_HEIGHT))) {
            this.is_medium_image = true;
        }
        else if ((width * height) < this.SMALL_IMAGE_AREA || (width <= this.SMALL_IMAGE_WIDTH) && (height <= this.SMALL_IMAGE_HEIGHT)) {
            this.is_skip_image = true;
        }
        else {
            this.is_small_image = true;
        }
        
        if (node.src && this.AD_DOMAINS.test(node.src)) {
            this.is_ad_node = true;
            this.is_ad_image = true;
        }        
    },
    
    /**
     * Update metrics with child metrics.
     * @param metrics   Child Metrics
     */
    mergeChild: function (metrics) {
        // Mark the child as processed.
        this.count_child_nodes -= 1;
        
        // Sanity check.
        if (null === metrics || undefined === metrics) {
            return;
        }
        
        // Merge direct node metrics, that are not part of a child container.
        this.count_texts             += (metrics.is_text ? 1 : 0);
        this.count_plain_texts       += (metrics.is_plain_text ? 1 : 0);
        this.count_link_texts        += (metrics.is_link_text ? 1 : 0);
        this.count_links             += (metrics.is_link ? 1 : 0);
        this.count_ad_images         += (metrics.is_ad_image ? 1 : 0);
        this.count_ad_links          += (metrics.is_ad_link ? 1 : 0);
        this.count_ad_nodes          += (metrics.is_ad_node ? 1 : 0);
        this.count_images            += ((metrics.is_small_image || metrics.is_medium_image || metrics.is_large_image) ? 1 : 0);
        this.count_small_images      += (metrics.is_small_image ? 1 : 0);
        this.count_medium_images     += (metrics.is_medium_image ? 1 : 0);
        this.count_large_images      += (metrics.is_large_image ? 1 : 0);
        this.count_skip_images       += (metrics.is_skip_image ? 1 : 0);
        this.count_inline_nodes      += (metrics.is_inline_node ? 1 : 0);
        this.count_valid_containers  += (metrics.is_valid_container ? 1 : 0);

        // Handle container metrics.
        if (false === metrics.is_valid_container) {
            this.length_text         += metrics.length_text;
            this.length_link_text    += metrics.length_link_text;
            this.length_plain_text   += metrics.length_plain_text;
        }

        // Metadata metrics.
        if (false === this.is_metadata_node && false === this.is_inside_metadata) {
            this.count_metadata_nodes    += (metrics.is_metadata_node ? 1 : 0);
            this.subtree_metadata_nodes  += metrics.subtree_metadata_nodes;
        }
        
        // Merge sub-tree metrics with node metrics for a global complexity analysis.
        this.subtree_links             += metrics.subtree_links;
        this.subtree_texts             += metrics.subtree_texts;
        this.subtree_ad_nodes          += metrics.subtree_ad_nodes;
        this.subtree_ad_images         += metrics.subtree_ad_images;
        this.subtree_ad_links          += metrics.subtree_ad_links;
        this.subtree_plain_texts       += metrics.subtree_plain_texts;
        this.subtree_link_texts        += metrics.subtree_link_texts;
        this.subtree_images            += metrics.subtree_images;
        this.subtree_small_images      += metrics.subtree_small_images;
        this.subtree_medium_images     += metrics.subtree_medium_images;
        this.subtree_large_images      += metrics.subtree_large_images;
        this.subtree_skip_images       += metrics.subtree_skip_images;
        this.subtree_lines             += metrics.subtree_lines;
        this.subtree_words             += metrics.subtree_words;
        this.subtree_small_paragraphs  += metrics.subtree_small_paragraphs;
        this.subtree_large_paragraphs  += metrics.subtree_large_paragraphs;
        this.subtree_inline_nodes      += metrics.subtree_inline_nodes;
        this.subtree_valid_containers  += metrics.subtree_valid_containers;
        this.subtree_length_text       += metrics.subtree_length_text;
        this.subtree_length_link_text  += metrics.subtree_length_link_text;
        this.subtree_length_plain_text += metrics.subtree_length_plain_text;
    },
    
    /**
     * Analyze a metadata nodes.
     */
    analyzeMetadataNode: function () {
        // Check exclude quotes from metadata.
        var parent = this.node.parent();
        if (parent.length > 0 && parent[0].nodeName.toLowerCase() !== "blockquote" && this.index !== 0) {
            // Check for author node.
            this.is_author_node = 
                this.analyzeNodeNames(this.NAME_ATTRS, this.META_AUTHOR_NAMES, this.META_EXCLUDE) || 
                (this.tag_name === "cite" && this.analyzeNodeNames(this.NAME_ATTRS, null, this.META_EXCLUDE) && this.node.parent().is("figcaption") === false);
    
            // Check for time nodes.
            this.is_date_node = 
                this.analyzeNodeNames(this.NAME_ATTRS, this.META_DATE_NAMES, this.META_EXCLUDE) ||
                (this.tag_name === "time" && this.analyzeNodeNames(this.NAME_ATTRS, null, this.META_EXCLUDE));
    
            // Check for title node, but only accept headers as valid titles.
            this.is_title_node = 
                (this.node.is(":header") && this.node.parent().is("hgroup")) || 
                (this.analyzeNodeNames(this.NAME_ATTRS, this.META_TITLE_NAMES, this.META_EXCLUDE) && this.node.is(":header"));
        }
        return (this.is_title_node || this.is_author_node || this.is_date_node);
    },
    
    /**
     * Analyze a generic node.
     */
    analyzeGenericNode: function () {
        // Check for an inline tag node.
        if (this.INLINE_TAGS.test(this.tag_name)) {
            this.is_inline_node = true;
        }
        else {
            // Check for a named node.
            this.is_comment_node = this.analyzeNodeNames(this.NAME_ATTRS, this.COMMENT_NAMES, this.COMMENT_NAMES_EXCLUDE) && this.index !== 0;
            this.is_named_node = this.analyzeNodeNames(this.NAME_ATTRS, this.NODE_NAMES, this.NODE_NAMES_EXCLUDE);
        }
        
        // Check for metadata or pagination.
        if (!this.is_comment_node && !this.is_named_node && this.is_visible_node && /^article$/i.test(this.tag_name) === false) {
            this.is_pagination = this.analyzeNodeNames(this.PAGE_NAME_ATTRS, this.PAGE_NAMES, this.PAGE_NAMES_EXCLUDE);
            this.is_metadata_node = this.analyzeMetadataNode();
        }
    },
    
    /**
     * Check attributes for special node names.
     * @param attrs     Attributes
     * @param names     Names
     * @param exclude   Excluded names
     */
    analyzeNodeNames: function (attrs, names, exclude) {
        // Load node into local scope.
        var node = this.node;
        var isNamed = false;
        var isExclude = false;
        
        // Check all attributes.
        node_metrics_$.each(attrs, function () {
            if (!(isExclude || isNamed)) {
                var value = node.attr("" + this);
                isExclude = ((exclude && value) ? exclude.test(value) : false);

                // Handle include/exclude and exclude-only case.
                if (names !== null && value !== null && value !== undefined && names.test(value)) {
                    isNamed = true;
                }
            }
        });
        
        return (names !== null ? (isNamed && !isExclude) : !isExclude);
    },
    
    /**
     * Analyze the node for its basic features.
     */
    analyzeNode: function () {
        // Analyze the tag name.
        this.analyzeTagName();        
        
        // Analyze the node's metrics.
        if (this.tag_name === "#invalid" || this.SKIP_ELEMENT.test(this.tag_name)) {
            this.is_skip_node = true;
        }
        else if (this.analyzeNodeNames(this.AD_WRAPPER_ATTRS, this.AD_WRAPPER, this.AD_WRAPPER_EXCLUDE) && this.index !== 0) {
            this.is_ad_node = true;
        }
        else {
            switch (this.tag_name) {
            case "#text":
                this.analyzeTextNode();
                break;
            case "a":
                this.analyzeLinkNode();
                break;
            case "img":
                this.analyzeImageNode();
                break;
            default:
                this.analyzeGenericNode();
                break;
            }
            
            // Analyze visual information.
            if (this.tag_name !== "#text") {
                this.node_width = Math.min(this.node.parent().width(), this.node.width());
                this.node_height = Math.min(this.node.parent().height(), this.node.height());
                this.node_area = this.node_width * this.node_height;
                
                var offset = this.node.offset();
                var $w = node_metrics_$(getActiveWindow());
                
                // Node ATF or BTF.
                this.is_atf_node = offset.top < $w.height();
                this.is_btf_node = !this.is_atf_node;
                
                // Calculate the area that is ATF.
                var atfHeight = ($w.height() - offset.top);
                atfHeight = (atfHeight < 0 ? 0 : atfHeight);
                
                this.node_atf_area = this.node_width * atfHeight;
                this.ratio_node_atf = this.node_atf_area / this.node_area; 
                
                // Calculate the area that is BTF.
                this.node_btf_area = this.node_width * (this.node_height - atfHeight);
                this.ratio_node_btf = this.node_btf_area / this.node_area;
            }
        }
    },
    
    /**
     * Prepare the final metrics.
     */
    prepare: function () {
        // Finalize subtree metrics.
        this.subtree_links             += this.count_links;
        this.subtree_texts             += this.count_texts;
        this.subtree_ad_nodes          += this.count_ad_nodes;
        this.subtree_ad_images         += this.count_ad_images;
        this.subtree_ad_links          += this.count_ad_links;
        this.subtree_plain_texts       += this.count_plain_texts;
        this.subtree_link_texts        += this.count_link_texts;
        this.subtree_images            += this.count_images;
        this.subtree_small_images      += this.count_small_images;
        this.subtree_medium_images     += this.count_medium_images;
        this.subtree_large_images      += this.count_large_images;
        this.subtree_skip_images       += this.count_skip_images;
        this.subtree_lines             += this.count_lines;
        this.subtree_words             += this.count_words;
        this.subtree_small_paragraphs  += this.count_small_paragraphs;
        this.subtree_large_paragraphs  += this.count_large_paragraphs;
        this.subtree_inline_nodes      += this.count_inline_nodes;
        this.subtree_valid_containers  += this.count_valid_containers;
        this.subtree_metadata_nodes    += this.count_metadata_nodes;
        this.subtree_length_text       += this.length_text;
        this.subtree_length_link_text  += this.length_link_text;
        this.subtree_length_plain_text += this.length_plain_text;        
        
        // Calculate all dynamic statistics data.       
        this.link_density = Math.min((this.count_links / (this.count_plain_texts || 1)), 1);
        this.link_text_density = Math.min((this.length_link_text / (this.length_plain_text || 1)), 1);
        
        this.subtree_link_density = Math.min((this.subtree_links / (this.subtree_plain_texts || 1)), 1);
        this.subtree_link_text_density = Math.min((this.subtree_length_link_text / (this.subtree_length_plain_text || 1)), 1);

        // Calculate ratios of text type to overall text in the subtree.
        this.subtree_ratio_length_link_text = Math.min(this.subtree_length_link_text / (this.subtree_length_text || 1), 1);
        this.subtree_ratio_length_plain_text = Math.min(this.subtree_length_plain_text / (this.subtree_length_text || 1), 1);
        
        // Append information to node.
        this.node.data("s2k", this);
    },

    /**
     * Finalize the node metrics and calculate NCR.
     * @param globalMetrics Global Metrics
     */
    score: function (globalMetrics) {
        this.scoreAsNCRT(globalMetrics, false);
        this.scoreAsVLB(globalMetrics);
    },
        
    /**
     * Score with NCRT parameters.
     * @param globalMetrics     Global Metrics
     * @param ncrOnly           Calculate NCR only.
     */
    scoreAsNCRT: function (globalMetrics, ncrOnly) {
        // Calculate text ratios based on global metrics.
        this.ratio_length_text = this.subtree_length_text / globalMetrics.subtree_length_text;
        this.ratio_length_plain_text = this.subtree_length_plain_text / globalMetrics.subtree_length_plain_text;
        this.ratio_length_link_text = this.subtree_length_link_text / globalMetrics.subtree_length_link_text;

        if (!ncrOnly && (this.ratio_length_plain_text < 0.2 || this.ratio_length_text < 0.11)) {
            // Discard the candidate, if it does not have at least 11% of the text.
            this.ncrt_noise_index = Number.MAX_VALUE;
            this.ncrt_content_index = 1;
        }
        else {
            // Calculate noise index.
            this.ncrt_noise_index = this.ratio_length_link_text +
                                    Math.min((this.subtree_ad_images + this.subtree_skip_images) / ((this.subtree_images + this.subtree_skip_images) || 1), 1) +
                                    Math.min(this.subtree_ad_links / (this.subtree_links || 1), 1) +
                                    Math.min(this.subtree_valid_containers / (globalMetrics.subtree_valid_containers || 1), 1) +
                                    (Math.min(this.subtree_small_images / (this.subtree_images || 1), 1) * 0.2);
                               
            // Calculate content index.
            this.ncrt_content_index = this.ratio_length_plain_text +
                                      Math.min(this.count_inline_nodes / (globalMetrics.subtree_inline_nodes || 1), 1) +
                                      Math.min((this.subtree_large_images + this.subtree_medium_images) / (this.subtree_images || 1), 1) +
                                      Math.min(this.subtree_lines / (globalMetrics.subtree_lines || 1), 1) +
                                      Math.min(this.subtree_small_paragraphs / (globalMetrics.subtree_small_paragraphs || 1), 1) +
                                      Math.min(this.subtree_large_paragraphs / (globalMetrics.subtree_large_paragraphs || 1), 1);
        }
        
        // Calculate NCR.
        this.ncrt_score = Math.min((this.ncrt_noise_index || Number.MAX_VALUE) / (this.ncrt_content_index || 1), 1);
    },
    
    /**
     * Score as VLB.
     * @param globalMetrics Global Metrics
     */
    scoreAsVLB: function (globalMetrics) {
        // Calculate image ratio.
        var imageRatio = Math.min(this.subtree_images / (globalMetrics.subtree_images || 1), 1);
        
        if (this.ratio_length_text < 0.2) {
            if (imageRatio < 0.2) {
                // Discard blocks with little text.
                this.vlb_noise_index = Number.MAX_VALUE;
                this.vlb_content_index = 1;
                return;
            }
        }
        
        // Calculate a noise index for VLB.
        this.vlb_noise_index =
            Math.min(this.subtree_valid_containers / (globalMetrics.subtree_valid_containers || 1), 1);
            
        
        // Calculate a content index for VLB.
        this.vlb_content_index = 
            (this.ratio_length_text * 2.5) +
            (this.ratio_node_area * 2.0) +
            (this.ratio_node_atf * 1.5) +
            (this.subtree_images / (this.subtree_links || 1)) +
            (Math.min(this.subtree_images / (globalMetrics.subtree_images || 1), 1)) +
            (Math.min(this.subtree_inline_nodes / (globalMetrics.subtree_inline_nodes  || 1), 1));
            
        
        // Calculate the VLB score.
        this.vlb_score = Math.min((this.vlb_noise_index || Number.MAX_VALUE) / (this.vlb_content_index || 1), 1);
    },
    
    /**
     * Export node metrics as ARFF record.
     */
    asRecord: function () {
        return this.index + "," +
               this.depth + "," +
               this.layer_index + "," +
               "'" + this.node_name + "'," +
               this.node_area + "," + 
               this.node_atf_area + "," +
               this.node_btf_area + "," +
               this.is_valid_container + "," +
               this.is_named_node + "," +
               this.is_atf_node + "," +
               this.is_btf_node + "," +
               this.count_links + "," +
               this.count_texts + "," +
               this.count_plain_texts + "," +
               this.count_link_texts + "," +
               this.count_ad_links + "," +
               this.count_ad_images + "," +
               this.count_images + "," +
               this.count_small_images + "," +
               this.count_medium_images + "," +
               this.count_large_images + "," +
               this.count_skip_images + "," +
               this.count_lines + "," +
               this.count_words + "," +
               this.count_small_paragraphs + "," +
               this.count_large_paragraphs + "," +
               this.count_valid_containers + "," +
               this.count_inline_nodes + "," +
               this.length_link_text + "," +
               this.length_plain_text + "," +
               this.length_text + "," +
               this.subtree_links + "," +
               this.subtree_texts + "," +
               this.subtree_ad_images + "," +
               this.subtree_ad_links + "," +
               this.subtree_plain_texts + "," +
               this.subtree_link_texts + "," +
               this.subtree_images + "," +
               this.subtree_small_images + "," +
               this.subtree_medium_images + "," +
               this.subtree_large_images + "," +
               this.subtree_skip_images + "," +
               this.subtree_lines + "," +
               this.subtree_words + "," +
               this.subtree_small_paragraphs + "," +
               this.subtree_large_paragraphs + "," +
               this.subtree_inline_nodes + "," +
               this.subtree_valid_containers + "," +
               this.subtree_length_text + "," +
               this.subtree_length_link_text + "," +
               this.subtree_length_plain_text + "," +
               this.link_density + "," +
               this.link_text_density + "," +
               this.ratio_length_plain_text + "," +
               this.ratio_length_link_text + "," +
               this.ratio_length_text + "," +
               this.ratio_node_area + "," +
               this.ratio_node_atf + "," +
               this.ratio_node_btf + "," +
               this.vlb_content_index + "," +
               this.vlb_noise_index + "," +
               this.ncrt_content_index + "," +
               this.ncrt_noise_index + "," +
               this.vlb_score + "," +
               this.ncrt_score;
    }
};


;// CONCATENATED MODULE: ./src-logic/extractor/ncrt-formatter.js
/* provided dependency */ var ncrt_formatter_$ = __webpack_require__(755);
/**
 * ncrt-formatter.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Formatter for Send-to-Kindle documents.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */




/**
 * @constructor
 */
const Formatter = function (extractor, relaxedMode, feedMode) {
    // ######## Privileged Members ########
    /**
     * Extractor
     */
    this.extractor = extractor;
    
    /**
     * Flag for row alteration.
     */
    this.rowFlag = false;
    
    /**
     * Formatting mode flags,
     */
    this.relaxedMode = relaxedMode;
    this.feedMode = feedMode;
    
    /**
     * Extraction Utils
     */
    this.extractorUtils = new ExtractorUtils();
    
    /**
     * Formatting Rules
     */
    this.RULES = {
        ":header": {
            "rules": [ this.preserveFontStyle ],
            "attributes": /^(style)$/i
        },
        "a": {
            "rules" : [ this.makeLinkAbsolute ],
            "attributes": /^(href|title|name)$/i
        },
        "img": {
            "rules": [ this.formatImage ],
            "attributes": /^(width|height|src|alt|style)$/i
        },
        "table": {
            "rules": [ this.formatTable ],
            "attributes": /^(cellspacing|cellpadding)$/i
        },
        "tr,th,td": {
            "rules": [ this.formatTableElement ],
            "attributes": /^(colspan|rowspan|style)$/i
        },
        "font": {
            "attributes": /^(color|face|size)$/i
        },
        "li": {
            "rules": [ this.formatListItem ],
            "attributes": /^(style)$/i
        },
        "p,span": {
            "rules": [ this.preserveFontStyle ],
            "attributes": /^(style)$/i
        },
        "*": {
            "rules": [ this.cleanAttributes ]            
        }
    };
};

Formatter.prototype = {
    // ######## Constants ########
    /**
     * Special tags for exclusion.
     */
    SPECIAL_TAGS: /^br|img|td|th|h[1-6]|code|sub|sup|font|mbp:pageBreak$/i,
    
    /**
     * Text used in advertisement.
     */
    AD_TEXT: /^\s*(advertisement|werbung|anzeige)\s*$/i,
    
    // ######## Methods ########
    
    // -------- Node Information Methods --------
    /**
     * Get the tag name for a node.
     * @param $node Node
     */
    getTagName: function ($node) {
        // Sanity test the node.
        if ($node === null || $node === undefined || $node.length === 0) {
            return "#invalid";
        }

        // Read node properties.
        var nodeType = $node[0].nodeType;
        var nodeName = $node[0].tagName;
        
        // Analyze node.
        if (nodeType === 3) {
            return "#text";
        }
        else if (nodeType === 1 && nodeName && nodeName > '') {
            return nodeName.toLowerCase();
        }
        else {
            return "#invalid";
        }
    },    
    
    // -------- Methods for the DOM Clean-Up --------
    /**
     * Test, if a link is local.
     * @param metrics Node Metrics
     * @return Local Flag
     */
    isLocalLink: function (metrics) {
        var href = metrics.node.attr("href");
        var path = getState().stateDocument.location.pathname;
        return (path !== "/") && (href === undefined || href[0] === "#" || href.search(path) !== -1);
    },
    
    /**
     * Test for removable node.
     * @param metrics   Metrics
     */
    isRemovable: function (metrics) {
        // Test, if node is empty.
        var isSpecialTag = metrics.tag_name.match(this.SPECIAL_TAGS) !== null;
        
        // Global removable constraints.
        var isRemovable = (!metrics.is_visible_node && !isSpecialTag) || metrics.is_skip_image || metrics.is_skip_node ||
                          metrics.is_pagination || metrics.is_ad_link || metrics.is_ad_image || metrics.is_ad_node;
        
        // Strict content formatting constraints.
        if (!isRemovable && !this.relaxedMode) { 
            // Constraint for removal on high link density.
            var isHighLinkDensity = metrics.subtree_link_text_density > 0.5 &&
                                    metrics.subtree_links > 1 &&
                                    metrics.subtree_valid_containers === 0 &&
                                    metrics.node.parent().is(":header") === false &&
                                    (metrics.subtree_links !== metrics.subtree_images || !metrics.is_link ||
                                    !metrics.is_metadata_node || !metrics.is_inside_metadata) &&
                                    metrics.subtree_large_images === 0 && !isSpecialTag;
                                  
            // Unify image flag.
            var isImage = metrics.is_small_image || metrics.is_medium_image || metrics.is_large_image;
            
            // Test, if the node is a DropCap.
            var isDropCap = (metrics.tag_name === "span" && 
                             metrics.node.parent()[0].nodeName.match(/^p$/i) !== null && 
                             metrics.node.text().length === 1);
            
            // Restriction for strict mode.
            isRemovable = isRemovable || isHighLinkDensity || 
                          metrics.is_comment_node || (metrics.is_metadata_node && !this.feedMode) ||
                          (metrics.is_link && this.isLocalLink(metrics)) ||                        
                          (metrics.subtree_length_text < 1 && metrics.subtree_images === 0 && !isImage && !isSpecialTag && !isDropCap);
        }
        
        return isRemovable;
    },
    
    /**
     * Test, if a node is empty.
     * @param $node     Node
     */
    isEmpty: function ($node) {
        if ($node === undefined || $node === null || $node.length === 0 || 
            ($node.attr("class") !== undefined && $node.attr("class").match(/s2k-/i) !== null)) {
            return false;
        }
        else {
            // Gather node information.
            var text = $node.text(),
                textLength = $node.text().length,
                images = $node.find("img").length,
                isAdText = text.match(this.AD_TEXT) !== null;
    
            // Handle whitespace length.
            var whitespace = $node.text().match(/(\s)+/gi);
            var whitespaceLength = (whitespace !== null ? whitespace.join("").length : 0);
    
            // Test node for removal constraints.
            return (($node[0].nodeType === 1 && $node[0].nodeName.match(this.SPECIAL_TAGS) === null &&
                    (whitespaceLength / (textLength || 1) > 0.8 || textLength === 0) && images === 0) || isAdText);
        }
    },

    /**
     * Remove links from images.
     * @param $node         Node
     */
    unlinkImages: function ($node) {
        var self = this;
        var images = $node.find("img");
        
        ncrt_formatter_$.each(images, function () {
            var $n = ncrt_formatter_$(this);
            var metrics = $n.data("s2k");
            
            if (metrics === undefined || metrics.is_ad_image === true || metrics.is_visible_node === false ||
                (metrics.node.width() < 50 || metrics.node.height() < 50) ||
                (metrics.node[0].naturalWidth !== undefined && metrics.node[0].naturalWidth < 50) ||
                (metrics.node[0].naturalHeight !== undefined && metrics.node[0].naturalHeight < 50) ||
                (metrics.is_skip_image && !self.relaxedMode)) {
                
                $n.remove();
            }
            else if (metrics.is_inside_link === true) {
                // Find parent node that is the link for this image.
                var m = metrics, parent = $n;
                while (m !== undefined && m.is_inside_link === true && m.is_link === false) {
                    parent = parent.parent();
                    m = parent.data("s2k");
                }
                
                if (m !== undefined && m.is_link === true) {
                    // Update metrics.
                    metrics.is_inside_link = false;
                    $n.data("s2k", metrics);
                    
                    // Replace link with image.
                    parent.replaceWith($n);
                    
                    // Push image to higher containers, if container only contains image to
                    // reduce DOM complexity and allow text captions.
                    parent = $n.parent();
                    while (parent.children().length === 1 && ncrt_formatter_$.trim(parent.text()).length === 0 && !parent.is("td")) {
                        // Replace link with image.
                        parent.replaceWith($n);

                        // Update to new parent.
                        parent = $n.parent();
                    }
                }
            }
        });
    },
    
    // -------- Methods to format nodes for Kindle --------
    /**
     * Clean attributes on node.
     * @param tagName   Tag NAme
     * @param $node     Node 
     * @param metrics   Metrics
     * @param $baseNode Base Node
     */        
    cleanAttributes: function (tagName, $node, metrics, $baseNode) {
        // Load attribute exclusion.
        var exclude = null;
        if ($node.is(":header")) {
            exclude = this.RULES[":header"].attributes;
        }
        else if ($node.is("tr,th,td")) {
            exclude = this.RULES["tr,th,td"].attributes;
        }
        else if ($node.is("p,span")) {
            exclude = this.RULES["p,span"].attributes;
        }
        else {
            exclude = this.RULES[tagName] ? this.RULES[tagName].attributes : null;
        }   
        
        // Remove attributes.
        var element = $node[0], 
            length = element.attributes.length, 
            current = 0;
        
        while (length > 0 && current < length) {
            var an = element.attributes[current].nodeName;
            if (exclude === null || an.match(exclude) === null) {
                element.removeAttribute(an);
                length--;
            }
            else {
                current++;
            }
        }
    },
    
    /**
     * Format images.
     * @param tagName       Tag Name
     * @param $node         Node
     * @param metrics       Node Metrics
     * @param $baseNode     Base Node
     */
    formatImage: function (tagName, $node, metrics, $baseNode) {
        // Ensure image is not isolated from its content.
        var parent = $node.parent();
        while (parent.children().length === 1 && ncrt_formatter_$.trim(parent.text()).length === 0 && !parent.is("td")) {
            parent.replaceWith($node);
            parent = $node.parent();
        }

        // Load additional parameters for image formatting.
        var parentTag = (parent.length === 1 ? parent[0].nodeName.toLowerCase() : undefined);
        var styleName = "s2k-default-image";
        var imageContainer = parent;
        var isFigure = false;

        // Try to read image width.
        var width = (metrics ? metrics.node[0].naturalWidth || metrics.node.width() : 0);
        width = Math.min(width || $node[0].naturalWidth || $node.width() || 500, 500);
                
        // Update lazy loading images.
        if ($node.attr("src") !== undefined && $node.attr("src").match(/(blank\w*|x)\.(bmp|jpg|jpeg|gif|png)/i) !== null) {
            $node.attr("src", $node.attr("data-src") || $node.attr("data-original") || $node.attr("src"));
            width = Math.min(Math.max(width, metrics.node.width()), 500);
        }

        // Clean node attributes for S2K attributes.
        $node.removeAttr("style").removeAttr("class").removeAttr("height");
        if (parent[0] !== $baseNode[0]) {
            parent.removeAttr("style").removeAttr("class").removeAttr("height");
        }
        
        // Wrap nodes into image wrapper, if required.
        if (parentTag === "div" && parent.length > 0 && parent[0] !== $baseNode[0] && parent.children().length <= 3 && this.feedMode === false) {
            parent.addClass(styleName);
        }
        else if (parentTag === "figure") {
            var content = ncrt_formatter_$("<div>", {"class": styleName}).append(parent.contents().clone(true));
            parent.replaceWith(content);
            
            imageContainer = content;
            $node = content.find("img").first();
            isFigure = true;
        }
        else if (parentTag !== "td") {
            $node.wrap(ncrt_formatter_$("<div>", {"class": styleName}));
            imageContainer = $node.parent();
        }
        
        // Set width, if it is specified.
        if (width > 0) {
            $node.css({"width": width, "max-width": "100%"}).attr("width", width);
            imageContainer.css({"width": width});
            
            if (imageContainer.children().length > 1) {
                $node.css("margin-bottom", "1.0em");
            }
        }
    },
    
    /**
     * Preserve the font style of the element.
     * @param tagName       Tag Name
     * @param $node         Node
     * @param metrics       Node Metrics
     * @param $baseNode     Base Node
     */
    preserveFontStyle: function (tagName, $node, metrics, $baseNode) {
        if (metrics !== undefined && $node !== undefined) {
            // Save preserve-able font styles. 
            var fontWeight = metrics.node.css("font-weight");
            var fontStyle = metrics.node.css("font-style");
            var textDeco = metrics.node.css("text-decoration");
            
            // Set preserved font style.
            $node.removeAttr("style").css({
                "font-style": fontStyle,
                "font-weight": fontWeight,
                "text-decoration": textDeco
            });
        }
    },
    
    /**
     * Format a list item.
     * @param tagName       Tag Name
     * @param $node         Node
     * @param metrics       Node Metrics
     * @param $baseNode     Base Node
     */
    formatListItem: function (tagName, $node, metrics, $baseNode) {
        // Load node information.
        var listStyle = metrics ? metrics.node.css("list-style-type") : "";
        var imageBullet = metrics ? metrics.node.css("background-image") : "";

        // Handle image bullets.
        if (listStyle === "none" && imageBullet !== "") {
            listStyle = "disc";
        }

        // Set list style type.
        $node.removeAttr("style").css("list-style-type", listStyle);
    },

    /**
     * Format a table.
     * @param tagName       Tag Name
     * @param $node         Node
     * @param metrics       Node Metrics
     * @param $baseNode     Base Node
     */
    formatTable: function (tagName, $node, metrics, $baseNode) {
        // Reset row color flag.
        this.rowFlag = false;
        
        // Add style class for table.       
        $node.removeAttr("class").removeAttr("style").addClass("s2k-table");
    },
    
    /**
     * Format a table item.
     * @param tagName       Tag Name
     * @param $node         Node
     * @param metrics       Node Metrics
     * @param $baseNode     Base Node
     */
    formatTableElement: function (tagName, $node, metrics, $baseNode) {
        if (tagName === "tr") {
            this.rowFlag = !this.rowFlag;
            $node.css({"width": "", "height": "", "background": "", "background-color": ""})
                 .attr("class", this.rowFlag ? "s2k-darkrow" : "");
        }
        else if (tagName === "th" || tagName === "td") {
            $node.css({"width": "", "height": "", "background": "", "background-color": ""});
        }
    },
    
    /**
     * Make relative URL absolute.
     * @param tagName       Tag Name
     * @param $node         Node
     * @param metrics       Node Metrics
     * @param $baseNode     Base Node
     */
    makeLinkAbsolute: function (tagName, $node, metrics, $baseNode) {
        var location = getActiveDocument().location;
        var href = $node.attr("href");

        if (href === undefined || href === null || href === "") {
            // Replace a non-link anchor with its text.
            $node.replaceWith("<span class='s2k-no-link'>" + $node.text() + "</span>");
        }
        else if (href !== undefined) {
            var isRelativeLink = (href.match(/^(http|https|mailto:|#.+)/i) === null);
            var isScriptLink = (href.match(/^(#|javascript:.*)$/i) !== null);
        
            // Update link.
            if (isRelativeLink === true && isScriptLink === false) {
                $node.attr("href", this.extractorUtils.makeUrlAbsolute(href));
            } 
            else if (isScriptLink === true) {
                if ($node.parent().is(":header") === true) {
                    // Replace link with a content wrapper.
                    $node.replaceWith(ncrt_formatter_$("<div>").append($node.contents().clone(true)));
                }
                else if ($node.parent().is("p") === true) {
                    // Replace the script link with its text.
                    $node.replaceWith($node.text());
                }
                else {
                    // Fetch parent.
                    var parent = $node.parent();

                    // Remove node.
                    $node.remove();
                    
                    // Remove parent, if it is empty.
                    $node = parent;
                    while (this.isEmpty($node)) {
                        parent = $node.parent();
                        $node.remove();
                        $node = parent;
                    }
                }
            }
        }
    },
    
    /**
     * Create a drop capital for the paragraph.
     * @param tagName   Tag Name
     * @param $node     Node (jQ)
     * @param metrics   Node Metrics
     * @param $baseNode Base Node
     */
    capitalizeParagraph: function (tagName, $node, metrics, $baseNode) {
        // Load first child node.
        var first = $node.contents().first();
        
        // Check, if paragraph starts with a text node.
        if (first[0].nodeType === 3) {
            var text = first.text();

            // Capture the first letter.
            var firstLetter = ncrt_formatter_$('<span class="s2k-capital">' + text[0].toUpperCase() + '</span>');
            text = text.substring(1);

            // Remove the first text node.
            first.remove();
            
            // Prepend the text and first letter.
            $node.prepend(text).prepend(firstLetter);
            $node = firstLetter;
        }
    },
    
    /**
     * Remove an removable node.
     */
    removeNode: function ($node, metrics, globalMetrics) {
        // Check, if node has a header as parent.
        if ($node.prev().is(":header") && !$node.is("p")) {
            $node.prev().remove();
        }

        // Fetch the nodes parent for further testing.
        var parent = $node.parent();
        
        // Remove the node.
        $node.remove();
        
        // Test, if the parent just contains an image after removal and deal with it.
        if (parent.children("img").length > 0 && parent.children("img").length === parent.children().length && 
            (parent.attr("class") !== undefined && parent.attr("class").match(/s2k-/i) === null)) {
            
            // Update recursion step with replacement.
            $node = parent.children("img");
            metrics = $node.data("s2k");
            
            if (metrics !== undefined && globalMetrics !== undefined) {
                metrics.score(globalMetrics);
            }
            
            // Replace the node.
            parent.replaceWith($node);
        }
    },
    
    /**
     * Reformat a table result as standard HTML result.
     * 
     * @param node  Node
     */
    reformatTable: function ($node) {
        // Load table body.
        var table = $node.children().first();

        // Reformat table rows.
        table.children().each(function () {
            var $row = ncrt_formatter_$('<div class="s2k-row-block"></div>');
            $row.data("s2k", ncrt_formatter_$(this).data("s2k"));
            
            // Reformat table columns.
            ncrt_formatter_$(this).children().each(function () {
                var $col = ncrt_formatter_$('<div class="s2k-col-block"></div>')
                                .data("s2k", ncrt_formatter_$(this).data("s2k"))
                                .append(ncrt_formatter_$(this).contents().clone(true));
                
                $row.append($col);
            });
            
            $node.append($row);                
        });
        
        // Remove the original table.
        table.remove();
    },
    
    /**
     * Format and clean content.
     * @param $node         Node
     */
    format: function ($node) {
        // Unlink images.
        this.unlinkImages($node);
        
        // Remove possible title.
        if ($node.children().first().is(":header")) {
            $node.children().first().remove();
        }
        
        // Build a div structure from tables.
        if (this.getTagName($node.children().first()) === "tbody") {
            this.reformatTable($node);
        }
        
        // Apply styling rules.
        var formatter = this;  
        ncrt_formatter_$.each(this.RULES, function (selector, config) {
            // Continue to next set of rules, if no rules where defined.
            if (config.rules === undefined) {
                return;
            }
            
            // Filter nodes for filter.
            $node.find(selector).each(function () {
                // Load current node.
                var globalMetrics;
                var $n = ncrt_formatter_$(this);
                var tagName = formatter.getTagName($n);
                var metrics = $n.data("s2k");
                var $baseNode = $n;
                
                // Find base node.
                while ($baseNode.is(".s2k-page") === false && $baseNode.parent().length > 0) {
                    $baseNode = $baseNode.parent();
                }
                
                // Rebalance node metrics.
                if ($baseNode.is(".s2k-page") && metrics !== undefined) {
                    globalMetrics = $baseNode.data("s2k");
                    metrics.score(globalMetrics);
                }

                // Test, if node can be removed and remove it.
                if (tagName === "#invalid" || $n.attr("id") === "s2k-status-message" || 
                    formatter.isEmpty($n) || (metrics !== undefined && formatter.isRemovable(metrics))) {
                    formatter.removeNode($n, metrics, globalMetrics);
                }
                
                // Apply rules to node.
                for (var i = 0, len = config.rules.length; i < len; i++) {
                    var applyRule = config.rules[i].bind(formatter);
                    applyRule(tagName, $n, metrics, $baseNode);
                }
                
                // Check if node is empty and remove it.
                if ($n !== undefined && $n.length > 0 && formatter.isEmpty($n)) {
                    formatter.removeNode($n, metrics, globalMetrics);
                }
            });
        });

        // Remove empty nodes from final markup.
        $node.find("*").filter(function () {
            return formatter.isEmpty(ncrt_formatter_$(this));
        });
    }
};



;// CONCATENATED MODULE: ./src-logic/extractor/ncrt-metadata.js
/* provided dependency */ var ncrt_metadata_$ = __webpack_require__(755);
/**
 * ncrt-metadata.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Formatter for Send-to-Kindle documents.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */





/**
 * @constructor
 */
const Metadata = function (relaxedMode) {
    // ######## Privileged Members ########
    this.relaxedMode = relaxedMode || false;
    this.extractorUtils = new ExtractorUtils(); 
};

Metadata.prototype = {
    // ######## Constants ########
    /**
     * Title Meta Tags
     */
    META_TITLE: "meta[itemprop='headline'],meta[name='title'],meta[property='og:title'],meta[name='og:title']",
    
    /**
     * Author Meta Tags
     */
    META_AUTHOR: "meta[name='author'],meta[property='og:author'],meta[name='og:author']",
    
    /**
     * Date Meta Tags 
     */
    META_DATE: "meta[name='pubdate'],meta[name='DATE'],meta[name='dat']",
    
    /**
     * Whitespace Test
     */
    WHITESPACE: /^\s*$/i,
    
    
    // ######## Methods ########
    /**
     * Analyze a possible title candidate.
     * @param candidate         Candidate
     * @param documentTitle     Title Node
     * @param metadata          Metadata
     */
    analyzeTitle: function (candidate, documentTitle, metadata) {
        // Test, if title is above the content node or inside the content node.
        var contentOffset = metadata.baseMetrics.node.offset();
        var contentHeight = metadata.baseMetrics.node.height();
        var contentWidth = metadata.baseMetrics.node.width();
        var candidateOffset = candidate.node.offset();
        
        if (candidate.node.width() > 0 && candidate.node.height() > 0 &&
            (candidateOffset.top < (contentOffset.top + contentHeight)) &&
            (candidateOffset.left >= contentOffset.left) && 
            (candidateOffset.left <= contentOffset.left + contentWidth)) {
            
            // Test, if candidate is in the content block.
            var isInBlock = ncrt_metadata_$.contains(metadata.baseMetrics.node[0], candidate.node[0]);
    
            // Test, if candidate and content block share the same parent.
            var isInParent = ncrt_metadata_$.contains(metadata.baseMetrics.node.parent()[0], candidate.node[0]);
            
            // Test, if candidate and content block share the skip level parent.
            var isInSkipParent = ncrt_metadata_$.contains(metadata.baseMetrics.node.parent().parent()[0], candidate.node[0]);
    
            // Test, if candidate and document title share the same text.
            var isSimilar = candidate.node.text() !== "" && documentTitle.substring(0, candidate.node.text().length) === candidate.node.text();
            
            // Parse the header importance.
            var header = 6 - parseInt(candidate.tag_name[1], 10);
            
            // Generate a score for the title node.
            var score = ((isSimilar ? 5 : 0) + (isInBlock ? 5 : 0) + (isInParent ? 3 : 0) + (isInSkipParent ? 2 : 0) + header) / 20;
            
            // Compare with current highest scoring item.
            if (score > 0 && metadata.titleScore < score || metadata.title === null) {
                metadata.title = candidate.node.contents().filter(this.filterInvisible).text();
                metadata.subtitle = ncrt_metadata_$("<div class='s2k-subtitle'></div>");
                
                // Test for whitespace title.
                if (metadata.title.match(this.WHITESPACE) === null) {
                    if (isInBlock === false && metadata.baseMetrics.node.parent()[0] !== candidate.node.parent()[0]) {
                        try {
                            // Get the visual position of the candidate.
                            var contentBottom = contentOffset.top + contentHeight;
                            
                            // Find all headers in the parent without the current header.
                            var subtitle = candidate.node.parent().find(":header").filter(function () {
                                var metrics = ncrt_metadata_$(this).data("s2k");
                                var offset = ncrt_metadata_$(this).offset();
                                
                                return (this !== candidate.node[0] && metrics !== undefined && 
                                        metrics.is_metadata_node === false && metrics.is_inside_metadata === false &&
                                        offset.top > candidateOffset.top && offset.top <= contentBottom);
                            });
                            
                            // Take all visible content and append it as a subtitle.
                            metadata.subtitle.append(ncrt_metadata_$("<p>").text(subtitle.contents().filter(this.filterInvisible).text()));
                            
                            // Test, if the title is followed by an introduction paragraph.
                            var follower = candidate.node.next();
                            var followerData = follower.data("s2k");
                            if (follower.is(":header") === false && followerData !== undefined && (ncrt_metadata_$.contains(follower[0], metadata.baseMetrics.node[0]) === false) && 
                                ((followerData.is_metadata_node === false && followerData.subtree_ratio_length_plain_text > 0.8 && followerData.subtree_lines >= 1) ||
                                 followerData.subtree_large_images > 0)) {
        
                                // Load intro.
                                metadata.subtitle.append(follower.contents().filter(this.filterInvisible).clone(true));
                            }
                        }
                        catch (e) {
                            metadata.subtitle = null;
                        }
                    }
                    else if (candidate.node.next().is(":header")) {
                        // Look at next node for a sub-title.
                        metadata.subtitle.append(ncrt_metadata_$("<p>").text(candidate.node.next().contents().filter(this.filterInvisible).text()));
                    }
                    else {
                        metadata.subtitle = null;
                    }
                    
                    metadata.titleScore = score;
                }
                else {
                    metadata.title = null;
                }
            }
        }
    },
    
    /**
     * Analyze a possible author candidate.
     * @param candidate         Candidate
     * @param metadata          Metadata
     */
    analyzeAuthor: function (candidate, metadata) {
        // Test, if candidate is in the content block.
        var isInBlock = ncrt_metadata_$.contains(metadata.baseMetrics.node[0], candidate.node[0]);

        // Test, if candidate and content block share the same parent.
        var isInParent = ncrt_metadata_$.contains(metadata.baseMetrics.node.parent()[0], candidate.node[0]);
        
        // Test, if candidate and content block share the skip level parent.
        var isInSkipParent = ncrt_metadata_$.contains(metadata.baseMetrics.node.parent().parent()[0], candidate.node[0]);

        // Load text and replace new lines. 
        var author = candidate.node.text().replace(/\n/gi, " ").replace(/[|]/gi, ",");
        
        // Match the author part after 
        var authorMatch = author.match(/(by|from|von):?\s*(.*)/i);
        author = (authorMatch !== null && authorMatch[2] !== undefined) ? authorMatch[2] : author; 

        // Normalize the author field.
        authorMatch = author.match(/(.*)(\s+-|\s+posted|\s+published|\s+updated|\s+on|\s*,)/i);
        while (authorMatch !== null) {
            if (authorMatch[1] !== undefined) {
                author = authorMatch[1];
            }
            authorMatch = author.match(/(.*)(\s+-|\s+posted|\s+published|\s+updated|\s+on|\s*,)/i);
        }

        // If an author was identified score it.
        if (author !== undefined && author !== null && author !== "" && author.length < 50) {
            // Score the author field.
            var score = ((isInBlock ? 5 : 0) + (isInParent ? 3 : 0) + (isInSkipParent ? 2 : 0)) / 10;

            // Set the author and score, if better than current author.
            if (metadata.authorScore < score || metadata.author === null) {
                metadata.authorScore = score;
                metadata.author = ncrt_metadata_$.trim(author);
            }
        }
    },
    
    /**
     * Analyze a candidate for the publication date.
     * @param candidate     Candidate
     * @param metadata      Metadata
     */
    analyzePublicationDate: function (candidate, metadata) {
        // Test, if candidate is in the content block.
        var isInBlock = ncrt_metadata_$.contains(metadata.baseMetrics.node[0], candidate.node[0]);

        // Test, if candidate and content block share the same parent.
        var isInParent = ncrt_metadata_$.contains(metadata.baseMetrics.node.parent()[0], candidate.node[0]);
        
        // Test, if candidate and content block share the skip level parent.
        var isInSkipParent = ncrt_metadata_$.contains(metadata.baseMetrics.node.parent().parent()[0], candidate.node[0]);

        // Try loading the date.
        var date = this.parseDateFromString(undefined, candidate.node.text().replace(/(posted|published|updated|on)(:)?\s*/i, ""));
        
        // If a date was parsed, score it. 
        if (date !== null && date !== undefined) {
            // Score the author field.
            var score = ((isInBlock ? 5 : 0) + (isInParent ? 3 : 0) + (isInSkipParent ? 2 : 0)) / 10;

            // Set the author and score, if better than current author.
            if (metadata.publicationDateScore < score || metadata.publicationDate === null) {
                metadata.publicationDateScore = score;
                metadata.publicationDate = date;
            }
        }
    },
    
    /**
     * Analyze metatags for a given selector.
     * @param $d        HTML Document
     * @param selector  Selector
     * @param parser    Parser Logic
     */
    analyzeMetaTags: function ($d, selector, parser) {
        // Load tags for selector.
        var metaTag = $d.find(selector);
        var content = (metaTag.length > 0 ? metaTag.first().attr("content") : null);
        
        // Parse content, if necessary.
        if (content !== null && parser !== undefined) {
            return parser($d, content);
        }
        
        return content;
    },
    
    /**
     * Try parsing a date from a permanent URL.
     * @param url   URL
     */
    parseDateFromUrl: function (url) {
        var date = url.match(/\d{4}\/\d{1,2}\/\d{1,2}/i);
        return (date !== null) ? this.parseDateFromString(undefined, date[0]) : null;
    },

    /**
     * Parse a date from a string.
     * @param {Document } $d Document
     * @param {string} dateString  Date String
     */
    parseDateFromString: function ($d, dateString) {
        var date = new Date(dateString);
        return ((date && date.getFullYear() <= new Date().getFullYear()) ? formatPublicationDate(date) : null);
    },
    
    /**
     * Filter invisible elements from the selection.
     * <pre>this</pre> is the current element.
     */
    filterInvisible: function () {                
        var metrics = ncrt_metadata_$(this).data("s2k");
        if (metrics !== undefined) {
            return metrics.is_visible_node;
        }
    },
    
    /**
     * Fetch metadata from HTML document.
     * @param result        Extraction Result
     * @param metadata      Metadata identified by the extractor.
     * @param baseMetrics   Metrics of the result.
     */
    fetchMetadata: function (result, metadata, baseMetrics) {
        var $d = ncrt_metadata_$(getState().stateDocument);
        
        // Fetch domain name with TLD, but without any sub-domains.
        var source = $d[0].location.hostname.match(/.*\.(.*\.\w{3})$/);
        result.source = ((source === null || source.length < 2) ? $d[0].location.hostname : source[1]);
        
        // Parse document metadata from source, if result is not
        // created using the relaxed mode for NCRT or VLB.
        if (!this.relaxedMode) {
            var self = this;
            
            // Create metadata holder.
            var documentMetadata = {
                "baseMetrics": baseMetrics,
                "title": null,
                "subtitle": null,
                "titleScore": 0,
                "author": null,
                "authorScore": 0,
                "publicationDate": null,
                "publicationDateScore": 0
            };
            
            // Analyze all metadata for the document.
            ncrt_metadata_$.each(metadata, function () {
                if (this.is_title_node === true) {
                    self.analyzeTitle(this, $d[0].title, documentMetadata);
                }
                else if (this.is_author_node === true) {
                    self.analyzeAuthor(this, documentMetadata);
                }
                if (this.is_date_node === true) {
                    self.analyzePublicationDate(this, documentMetadata);
                }
            });

            // Fallback for title.
            documentMetadata.title = documentMetadata.title || 
                                     this.analyzeMetaTags($d, this.META_TITLE, undefined) ||
                                     $d[0].title;

            // Fallback for author.
            documentMetadata.author = documentMetadata.author || 
                                      this.analyzeMetaTags($d, this.META_AUTHOR, undefined);
            
            // Fallback for publication date.
            documentMetadata.publicationDate = documentMetadata.publicationDate || 
                                               this.analyzeMetaTags($d, this.META_DATE, this.parseDateFromString) ||
                                               this.parseDateFromUrl($d[0].location.href);
            
            // Set document metadata in extraction result.
            result.author = documentMetadata.author || null;
            result.publicationDate = documentMetadata.publicationDate || null;
            result.title = documentMetadata.title ? ncrt_metadata_$.trim(documentMetadata.title.replace(/\s+/g, " ")) : source;

            // Handle a possible subtitle.
            if (documentMetadata.subtitle !== null && documentMetadata.subtitle.children().length > 0) {
                result.contentNode.find(".s2k-page").first().prepend(documentMetadata.subtitle);
            }
        }
        else {
            // Set document metadata.
            result.title = $d[0].title || result.source;
            result.publicationDate = formatPublicationDate(new Date());
        }
    }
};



;// CONCATENATED MODULE: ./src-logic/extractor/ncrt-extractor.js
/* provided dependency */ var ncrt_extractor_$ = __webpack_require__(755);
/**
 * ncrt-extraction.js
 * 
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Extractor based on the NCR-Traversal-Algorithm.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */









/**
 * @constructor
 */
const NcrtExtractor = function () {
    // ######## Members ########
    /**
     * Candidate for NCRT and VLB.
     */
    this.candidates = [];
    
    /**
     * Candidates for NCRT.
     */
    this.ncrt = [];

    /**
     * Candidates for VLB.
     */
    this.vlb = [];
    
    /**
     * Metadata Candidates
     */
    this.metadata = [];
    
    /**
     * Candidates for pagination areas.
     */
    this.pagination = [];

    /**
     * Traversal index.
     */
    this.traversal_index = 0;
    
    /**
     * Page index.
     */
    this.page_index = 0;
    
    /**
     * Area in square pixels of document.
     */
    this.document_base_area = 0;
    
    /**
     * Width of the document in pixels.
     */
    this.document_base_width = 0;
    
    /**
     * Flag for relaxed formatting.
     */
    this.relaxedMode = false;
  
    /**
     * Flag for feed formatting.
     */
    this.feedMode = false;
    
    /**
     * Flag for a low quality result.
     */
    this.lowQualityResult = false;
    
    /**
     * Extractor Utils
     */
    this.extractorUtils = new ExtractorUtils();
    
    /**
     * Service Instance
     */
    this.service = new SendToKindleService();
};

NcrtExtractor.prototype = {
    // ######## Constants ########
    /**
     * Supported data types for plug-ins.
     */
    SUPPORTED_DATA_TYPES: /^(application\/(pdf|msword|rtf)|text\/plain)$/i,
        
    /**
     * Tag to be remove while copying the content.
     */
    REMOVABLE_TAGS: "script,noscript,object,embed,iframe,frame,frameset,noframes,aside,menu,header,footer,source,audio,meta," +
                    "video,form,ins,del,style,form,cite,button,textarea,input,select,.social-media-container,.article-resources",
    
    /**
     * Exclusions from multi-page extraction for
     * technical reason such as JavaScript content fetchers.
     */
    MULTIPAGE_EXCLUDED: /google\.*/i,
    
    /**
     * The maximum number of pages to be extracted.
     */
    MAX_PAGE_INDEX: 10,
    
    // ######## Methods #########
    /**
     * Analyze node visibility.
     * @param $node Node
     * @returns {boolean} if visible or not
     */
    isVisible: function ($node) {
        // Load node type.
        var nt = $node[0].nodeType;
        
        if (nt === 1) {
            // Load node location.
            var offset = $node.offset();
            
            // Extract text-indent.
            var textIndent = $node.css("text-indent");
            textIndent = textIndent ? textIndent.match(/\-\d+/i) : null;
            textIndent = (textIndent ? parseInt(textIndent[0], 10) : 0);
            
            // Extract the padding.
            var paddingLeft = parseInt($node.css("padding-left").replace("px"), 10);
            var paddingTop = parseInt($node.css("padding-top").replace("px"), 10);
            
            return (nt === 3) ||                                                    // Text
                   (nt === 1 &&                                                     // Element
                   ((offset.left + paddingLeft + $node.width()) >= 0 &&             // Node is in visible area of the document.
                    (offset.top  + paddingTop + $node.height()) >= 0) &&
                   //($node.width() > 0 || $node.height() > 0) &&                   // Node uses space
                   (textIndent >= 0) &&                                             // Node content visible.
                   ($node.css("display") !== "none") &&                             // Node is visible
                   ($node.css("visibility") !== "hidden"));                         // Node is visible
        }

        return (nt === 3);
    },
    
    /**
     * Analyze metrics as candidate for NCRT.
     * @param metrics          Metrics
     */
    analyzeNcrtCandidate: function (metrics) {
        // Check for possible pagination, sanity test conducted later.
        if (metrics.is_pagination === true) {
            this.pagination.push(metrics);
        }
        
        // Score with NCRT.        
        if (metrics.is_metadata_node === true) {
            this.metadata.push(metrics);
            return false;
        }
        else {
            // Apply candidate heuristics.
            metrics.is_ncrt_candidate = (metrics.is_inline_node === false &&
                                         metrics.is_link === false &&
                                         metrics.is_inside_link === false &&
                                         metrics.is_inside_metadata === false &&                    
                                         metrics.is_valid_container === true &&
                                         metrics.subtree_link_text_density <= 0.7 && 
                                         metrics.subtree_plain_texts > 0 &&
                                         metrics.node_id !== "s2k-status-message" &&
                                         metrics.node_id.match(/sidebar|inline/i) === null &&
                                         metrics.node_style_class.match(/sidebar|inline/i) === null &&
                                         metrics.tag_name.match(/span/i) === null &&
                                         (metrics.subtree_inline_nodes > 0 || metrics.subtree_large_paragraphs > 1));
            
            return metrics.is_ncrt_candidate;
        }
    },
    
    /**
     * Analyze metrics as candidate for VLB.
     * @param metrics       Metrics
     */
    analyzeVlbCandidate: function (metrics) {
        // Calculate node area ratio.
        metrics.ratio_node_area = (metrics.node_area / this.document_base_area);
        metrics.ratio_node_width = metrics.node_width / this.document_base_width; 
        
        // Apply candidate conditions and heuristics.        
        metrics.is_vlb_candidate = (metrics.is_metadata_node === false &&
                                    metrics.is_inline_node === false &&
                                    metrics.is_link === false &&
                                    metrics.is_inside_link === false &&
                                    metrics.is_valid_container === true &&
                                    metrics.tag_name.match(/span/i) === null &&
                                    metrics.ratio_node_width >= 0.2 &&
                                    metrics.ratio_node_area > 0.05 && 
                                    metrics.ratio_node_area < 0.8);
        
        return metrics.is_vlb_candidate;
    },
    
    /**
     * Analyze a node as candidate for registered algorithms.
     * @param metrics   Metrics
     */
    analyzeCandidate: function (metrics) {
        return (this.analyzeNcrtCandidate(metrics) || this.analyzeVlbCandidate(metrics));
    },
    
    /**
     * Analyze the page for a pagination.
     * @return {Array} Pagination Flag
     */
    analyzeMultiPageArticle: function () {
        var self = this;
        var pages = [];

        // Analyze every item identified as pagination.
        ncrt_extractor_$.each(this.pagination, function () {
            // Find all possible page links.
            var pageLinks = this.node.find("a");
            
            // Analyze, if links are available.
            if (pageLinks.length > 0 && pages.length === 0) {
                // Load the next page link.
                var link = pageLinks[0].href;
                
                // Take next link, if there are more as the first page is currently displayed.
                var linkOverride = ((link === undefined || link === null || link === "") && pageLinks.length > 1);
                
                // Test for a link page instead of permlinks.
                var linkPage = (pageLinks.length > 1 && linkOverride === false && pageLinks[1].href.match(/_\d+\.\w+$/i) !== null);
                
                // Update the page link.
                if (linkOverride === true || linkPage === true) {
                    link = pageLinks[1].href;
                }
                
                // Sanity test for link on existence, link to the same page and text contains a number.
                if (link === undefined || ncrt_extractor_$(pageLinks[0]).text().match(/\d/i) === null) {
                    this.is_pagination = false;
                    return;
                }
                
                // Try to build a page link template for the pages.
                var pageLink = null; 
                if (pageLinks.length > 1 && linkOverride === false && linkPage === false) {
                    pageLink = self.extractorUtils.analyzePageLinks(link, pageLinks[1].href);
                }
                else if (pageLinks.length > 2 && linkOverride === true && linkPage === false) {
                    pageLink = self.extractorUtils.analyzePageLinks(link, pageLinks[2].href);
                }
                else {
                    pageLink = self.extractorUtils.analyzePageLinks(link);
                }

                // Sanity test for page link.
                if (pageLink === null) {
                    this.is_pagination = false;
                    return;
                }
                
                // Fetch name of page parameter and perform a sanity test.
                var pageParam = pageLink.match(/([\?&]\w+=)_PN_|([\?&]\w+=\d+,)_PN_|(\/_PN_\/)|(\/_PN_)|(__PN_)/i);
                if (pageParam === null) {
                    this.is_pagination = false;
                    return;
                }
                pageParam = pageParam[1] || pageParam[2] || pageParam[3] || pageParam[4] || pageParam[5];
                
                // Sanity test all page links and push all passing to the 
                // page link array for extraction.
                for (var i = 0, len = Math.min(pageLinks.length, self.MAX_PAGE_INDEX); i < len; i++) {
                    if (self.extractorUtils.testPageLink(pageLinks[i].href, pageLink, pageParam) === true && 
                            pages.indexOf(pageLinks[i].href) === -1) {
                        
                        pages.push(pageLinks[i].href);
                    }
                }
            }
            else {
                this.is_pagination = false;
            }
        });
        
        return (pages.length > 0 ? pages : null);
    },
    
    /**
     * Traverse the DOM and generate node metrics and candidates.
     * 
     * @param {Object}  $node         Node
     * @param {number}  index         Index of node
     * @param {number}  depth         DOM depth
     * @param {number}  layerIndex    Index of node in current layer.
     * @param {boolean} isLink        Node is a link.
     * @param isMetadata
     * @param {boolean} isGlance      Glance Traversal (needed for multipage extraction)
     * @param {function(result)}      callback      Callback
     */
    traverse: function ($node, index, depth, layerIndex, isLink, isMetadata, isGlance, callback, task) {
        // Abort recursion, if the node is not valid.
        if (undefined === $node || null === $node || $node.length === 0) {
            callback(null);
        }
        
        // Get visibility flag.
        var isVisible = this.isVisible($node) || isGlance;
        
        // Load metrics for node.
        var metrics = new NodeMetrics($node, index, depth, layerIndex, isVisible, isLink, isMetadata);
        
        // Analyze node and decide on further traversal.
        var timeout = task && task.isTimedOut();
        if (!timeout && (metrics.is_visible_node && !metrics.is_skip_node && !metrics.is_comment_node && !metrics.is_ad_node)) {
            if (metrics.count_child_nodes === 0) {
                this.onTraverseComplete(metrics, undefined, isGlance, callback);
            }
            else {
                setTimeout(function () {
                    // Traverse child nodes.
                    for (var i = 0; i < ($node[0].childNodes.length); ++i) {
                        this.traverse(
                            ncrt_extractor_$($node[0].childNodes[i]), 
                            ++(this.traversal_index), depth + 1, i, 
                            metrics.is_link || metrics.is_inside_link,
                            metrics.is_metadata_node || metrics.is_inside_metadata, 
                            isGlance, 
                            function (childMetrics) {                            
                                this.onTraverseComplete(metrics, childMetrics, isGlance, callback);
                            }.bind(this), task);
                    }
                }.bind(this));
            }
        }
        else {
            $node.data("s2k", metrics);
            callback(null);
        }
    },
    
    /**
     * Handler for merging metrics up the tree.
     * @param {NodeMetrics} metrics               Node Metrics
     * @param {NodeMetrics} childMetrics          Child Metrics
     * @param {boolean} isGlance                                Glance Traversal (needed for multipage extraction)
     * @param {(param: NodeMetrics) => void} callback     Callback
     */
    onTraverseComplete: function (metrics, childMetrics, isGlance, callback) {
        // Merge the child metrics.
        if (childMetrics !== undefined) {
            metrics.mergeChild(childMetrics);
        }
        
        // If all children have been process, process the node.
        if (metrics.count_child_nodes === 0) {
            // Prepare the node metrics for analysis.
            metrics.prepare();
            
            // Avoid too large metadata nodes.
            if (metrics.is_metadata_node && metrics.subtree_valid_containers > 3) {
                metrics.is_metadata_node = metrics.is_date_node = metrics.is_author_node = metrics.is_title_node = false;
            }
            
            // Analyze candidate quality.
            if (this.analyzeCandidate(metrics) && !isGlance) {
                this.candidates.push(metrics);
            }
            
            // Push the metrics to the parent.
            callback(metrics);
        }        
    },
        
    /**
     * Handle embedded plug-in cases for browser plug-ins.
     * @param {string} url       URL
     * @param dataType  Data Type
     * @param task      Active task interface
     * @return Document or NULL
     */
    handlePlugInContent: function (url, dataType, task) {
        if (dataType.match(this.SUPPORTED_DATA_TYPES) !== null) {
            this.service.downloadAsBinary(url, function (bd, ct) {
                    this.handlePlugInContentDownload(bd, ct, dataType, task);
                }.bind(this), 
                function () {
                    task.progress({"value": -1, "error": true, "message": "DOWNLOAD_ERROR"});
                }
            );
        }
        else {
            task.progress({"value": -1, "error": true, "message": "UNSUPPORTED_DOCUMENT_TYPE"});
        }
    },
    
    /**
     * Handle plug-in content download results.
     * @param binaryData            Stream
     * @param contentType           Content-Type Header
     * @param expectedContentType   Content from Plug-In
     * @param task                  Task interface
     */
    handlePlugInContentDownload: function (binaryData, contentType, expectedContentType, task) {
        if (contentType === expectedContentType) {
            var result = new SendToKindleDocument(contentType, binaryData);
            
            // Fetch file name as title for document.
            var filename = location.pathname.match(/^[\w\-\/]+\/(.*)$/i);
            result.title = (filename !== null && filename[1] !== undefined ? filename[1] : location.pathname);
            
            // Fetch domain name with TLD, but without any sub-domains as author.
            var source = location.hostname.match(/.*\.(.*\.\w{3})$/);
            source = ((source === null || source.length < 2) ? location.hostname : source[1]);
            result.author = source;
            
            task.progress({"success": true, "plugin": true, "data": result});
        }
        else {
            task.progress({"error": true, "message": "DOCUMENT_TYPE_DOES_NOT_MATCH"});
        }
    },
    
    /**
     * Build a result from the NCRT candidates.
     * @param task Task interface
     */
    buildNcrtResult: function (task) {
        // Select the content node.
        var $content = ncrt_extractor_$("<div id='s2k-result' class='s2k-result-content'></div>");
                
        if (this.ncrt[0].index !== 0) {
            var resultNodes = [];
            
            // Load the result node.
            var ncrtNode = this.ncrt[0];
            
            // Load all styles set on the node.
            var styles = (ncrtNode.node.attr("class") || "").split(" ").join(",.").replace(/^\.,|,\.,|[\.,]+$|^,/gi, "");
            styles = (styles !== "" ? "." : "") + styles;            
            
            // Fetch nodes on the same layer that have the same style class.
            ncrtNode.node.parent().children().each(function () {
                var metrics = ncrt_extractor_$(this).data("s2k");
                
                // Check, if the node is an NCRT candidate or the style class matches.
                if (metrics !== undefined && ((metrics.is_ncrt_candidate && metrics.ncrt_score < 0.7) || 
                    (metrics.node.is(styles) === true && metrics.node_style_class !== "#unknown_class") || 
                    ((metrics.subtree_large_images > 0 || metrics.subtree_medium_images > 0) && metrics.depth > 2))) {
                    resultNodes.push(metrics);
                }
            });

            // Sort the candidate by occurrence in layer.
            resultNodes.sort(function (c1, c2) {
                return c1.layer_index - c2.layer_index;
            });
            
            // Create a result for the first page.
            this.buildContentPage($content, resultNodes, (resultNodes.length > 1 ? this.ncrt[0].node.parent().data("s2k") : this.ncrt[0]));
            
            // Hand control to the multi-page extraction logic.
            this.extractMultiPageArticle($content, this.ncrt[0], task);
        }
        else {
            // Clone the body content and remove unwanted nodes.
            var removableTagsRegEx = new RegExp("^(" + this.REMOVABLE_TAGS.replace(",", "|") + ")$", "i");
            var rs = this.ncrt[0].node.contents().filter(function () {
                return (this.nodeName.match(removableTagsRegEx) === null);
            }).clone(true);
            rs.find(this.REMOVABLE_TAGS).remove();
            
            // Create a content page for the result.
            $content.append('<div id="s2k-page-1" class="s2k-page"></div>');
            $content.find(".s2k-page").append(rs).data("s2k", this.ncrt[0]);
            
            // Prepare the pDocs Document Model.
            this.prepareDocumentModel($content, this.ncrt[0], task);
        }
    },

    /**
     * Build a result with the VLB block.
     * @param task      Task interface
     */
    buildVlbResult: function (task) {
        // Create result container.
        var $content = ncrt_extractor_$("<div id='s2k-result' class='s2k-result-content'></div>");
        
        // Build a page for the content.
        this.buildContentPage($content, [this.vlb[0]], this.vlb[0]);

        // Hand control to the multi-page extraction logic.
        this.extractMultiPageArticle($content, this.vlb[0], task);
    },    
    
    /**
     * Build a result with the "Above the Fold Priority" logic.
     * @param $baseNode     Extraction Base Node
     * @param task          Task interface
     */
    buildAtfpResult: function ($baseNode, task) {
        // Create result container.
        var $content = ncrt_extractor_$("<div id='s2k-result' class='s2k-result-content'></div>"); 
        
        // Clone the body content and remove unwanted nodes.
        var removableTagsRegEx = new RegExp("^(" + this.REMOVABLE_TAGS.replace(",", "|") + ")$", "i");
        var rs = $baseNode.contents().filter(function () {
            return (this.nodeName.match(removableTagsRegEx) === null);
        }).clone(true);
        rs.find(this.REMOVABLE_TAGS).remove();
        
        // Append the nodes to the result.
        $content.append(rs);

        // Prepare the pDocs Document Model.
        this.prepareDocumentModel($content, $baseNode.data("s2k"), task);
    },    
    
    /**
     * Build a result for a page. 
     * @param $content      Content
     * @param resultNodes   Nodes for page.
     * @param pageMetrics   Metrics to append to the page.
     */
    buildContentPage: function ($content, resultNodes, pageMetrics) {
        // Create a page container.
        var pageId = "s2k-page-" + (++this.page_index);
        $content.append(ncrt_extractor_$('<div>', {"id": pageId, "class": "s2k-page"}));

        // Setup page container.
        var $page = $content.find("#" + pageId); 
        $page.data("s2k", pageMetrics);
        
        // Build a continuous result from the result blocks.
        var self = this;
        ncrt_extractor_$.each(resultNodes, function () {
            var $n = this.node;
            
            // Clone a possible header before the content block.
            if ($n.prev().is(":header")) {
                $page.append($n.prev().clone(true));
            }
            
            // Clone the node and remove unwanted tags.
            var rs = $n.clone(true);
            rs.find(self.REMOVABLE_TAGS).remove();
            
            // Append the nodes to the result.
            $page.append((rs.is("table") === true) ? rs : rs.contents());
        });
    },
        
    /**
     * Extraction logic for multi-page articles.
     * @param $content     Result Content
     * @param baseMetrics  Metrics for initial page block.
     * @param task         Task interface
     */
    extractMultiPageArticle: function ($content, baseMetrics, task) {
        // Check for an article that spans over multiple pages and
        // kick off extraction for this article type.
        var pages = this.analyzeMultiPageArticle();

        const state = getState();
        if (state.stateDocument.location.href.match(this.MULTIPAGE_EXCLUDED) === null && pages !== null) {
            // Emit multi-page metric.
            state.metrics.count(state.metrics.NAMES.c_extraction_multipage);
            
            // Analyze logic requirements.
            var path = baseMetrics.node_id;
            if (path === "#unknown_id") {
                path = this.extractorUtils.getPathForNode(baseMetrics.node);
            }
            else {
                path = "#" + path;
            }
            
            this.extractMultiPageContent(pages, 0, path, $content, baseMetrics, task);
        }
        else {
            // Prepare the pDocs Document Model for single-page article.
            this.prepareDocumentModel($content, baseMetrics, task);
        }
    },
    
    /**
     * Extract content from a page.
     * 
     * @param pages         URLs for all pages.
     * @param index         Page Index
     * @param path          Path to Content Node
     * @param $content      Extraction Result
     * @param metrics       Metrics for NCRT result.
     * @param task          Active task interface
     */
    extractMultiPageContent: function (pages, index, path, $content, metrics, task) {
        if (index >= 0 && index < pages.length) {
            var self = this;
            
            // Fetch the requested page.
            this.service.ajax({
                url: self.extractorUtils.makeUrlAbsolute(pages[index]),
                type: "GET",
                dataType: "html",
                timeout: 5000,
                success: function (data) {
                    // Fetch body tag.
                    var bodyTag = data.match(/(.*<\s*body[^>]*>)/i);
                    var startIndex = data.indexOf(bodyTag[0]) + bodyTag[0].length;
                    var endIndex = data.lastIndexOf("</body>");
                    
                    // Load content from result.
                    var $baseNode = ncrt_extractor_$(data.substring(startIndex, endIndex));
                    $baseNode = this.extractorUtils.getNodeFromPath($baseNode, path); 
                    
                    // Page contained content node.
                    if ($baseNode !== undefined && $baseNode.length !== 0) {
                        // Load the number of base nodes.
                        var cntBaseNodes = $baseNode.length;
                        
                        // Generate metrics for result node(s).
                        $baseNode.each(function () {
                            self.traverse(ncrt_extractor_$(this), 1, metrics.depth, 0, false, false, true, function () {
                                if ((--cntBaseNodes) === 0) {
                                    // Create metrics for the page.
                                    var pageMetrics = new NodeMetrics(ncrt_extractor_$("<div></div>"), 0, metrics.depth, 0, true, false, false);
                                    
                                    // Create a page result for the nodes.
                                    var nodeMetrics = $baseNode.map(function () {
                                        pageMetrics.mergeChild(ncrt_extractor_$(this).data("s2k"));
                                        return ncrt_extractor_$(this).data("s2k");
                                    });
                                    
                                    pageMetrics.prepare();
                                    
                                    // Build a page for the extraction result.
                                    self.buildContentPage($content, nodeMetrics, pageMetrics);
                                    
                                    // Fetch the next page.
                                    self.extractMultiPageContent(pages, index + 1, path, $content, metrics, task);
                                }
                            }, task);
                        });
                    }
                    else {
                        // Invoke the extraction one more time to trigger the document generator.
                        this.extractMultiPageContent(pages, -1, path, $content, metrics, task);
                    }
                    
                }.bind(this),
                error: function (xhr, error, errorThrown) {
                    // Emit error metrics for tracking.
                    getState().metrics.count(getState().metrics.NAMES.c_invalid_page);
                    
                    // Invoke the extraction one more time to trigger the document generator.
                    this.extractMultiPageContent(pages, -1, path, $content, metrics, task);
                }.bind(this)
            });
        }
        else {
            // Prepare the pDocs Document Model.
            this.prepareDocumentModel($content, metrics, task);
        }
    },
    
    /**
     * Extract content from DOM.
     * @param $baseNode     Base Node
     * @param task          Task interface
     */
    extractFromDOM: function ($baseNode, task) {
        // Calculate document area.
        const state = getState();
        this.document_base_area = ncrt_extractor_$(state.stateDocument).width() * ncrt_extractor_$(state.stateDocument).height();
        this.document_base_width = ncrt_extractor_$(state.stateDocument).width();
        
        // Traverse and analyze the DOM.
        this.traverse($baseNode, 0, 0, 0, false, false, false, function () {
            // Score NCRT candidates.
            var self = this;
            var globalMetrics = $baseNode.data("s2k");
            ncrt_extractor_$.each(this.candidates, function () {
                if (task.isTimedOut()) {
                    return;
                }
                this.score(globalMetrics);
                
                // NCRT expects a maximum of 60% noise.
                if (this.is_ncrt_candidate === true && this.ncrt_score < 0.6) {
                    self.ncrt.push(this);
                }
                
                // VLB expects at least 10% noise but less than 70%.
                if (this.is_vlb_candidate === true && (this.vlb_score > 0.1 || this.subtree_large_images > 0) && this.vlb_score < 0.7) {
                    self.vlb.push(this);
                }
            });
            
            // Sort NCRT candidates by NCR.
            this.ncrt.sort(function (c1, c2) {
                return c1.ncrt_score - c2.ncrt_score;
            });
            
            // Sort VLB candidates by VLB score.
            this.vlb.sort(function (c1, c2) {
                return c1.vlb_score - c2.vlb_score;
            });
            
            // Build the result HTML document based on the extraction results.
            if (this.ncrt.length > 0) {
                // Emit metrics for an successful NCRT result.
                state.metrics.count(state.metrics.NAMES.c_extraction_result_ncrt);
                
                // Turn on feed node formatting for nodes with high metadata nodes.
                this.feedMode = this.ncrt[0].subtree_metadata_nodes > 5;
                
                // Turn on relaxed formatting for high link text density on NCRT results.
                this.relaxedMode = this.ncrt[0].subtree_link_text_density > 0.45;
                
                // NCRT quality confidence is high.
                this.buildNcrtResult(task);
            }
            else if (this.vlb.length > 0) {
                // Emit metrics for an successful VLB result.
                state.metrics.count(state.metrics.NAMES.c_extraction_result_vlb);
    
                // Set low quality flag for VLB results with score over 0.45.
                this.lowQualityResult = (this.vlb[0].vlb_score > 0.45);
                
                // Turn on feed node formatting for nodes with high metadata nodes.
                this.feedMode = this.vlb[0].subtree_metadata_nodes > 3 && this.vlb[0].subtree_link_text_density < 1;
                
                // Enable relaxed mode for formatting / metadata.
                this.relaxedMode = !this.feedMode;
    
                // VLB quality confidence is high.
                this.buildVlbResult(task);
            }
            else {
                // Emit metrics for an successful VLB result.
                state.metrics.count(state.metrics.NAMES.c_extraction_result_atfp);
    
                // Enable relaxed mode for formatting / metadata.
                this.relaxedMode = true;
                
                // Mark result as low quality result.
                this.lowQualityResult = true;
                
                // Content does not have low NCR block or a VLB (worst case).
                this.buildAtfpResult($baseNode, task);
            }
        }.bind(this), task);
    },
    
    /**
     * Prepare the pDocs Document Model.
     * @param $content      Content
     * @param baseMetrics   Metrics of content node.
     * @param task          Active task interface
     */
    prepareDocumentModel: function ($content, baseMetrics, task) {
        if ($content !== null) {
            // Create a pDocs Document Model
            var result = new SendToKindleDocument("text/html", $content);

            // Extract metadata.
            (new Metadata(this.relaxedMode || this.feedMode)).fetchMetadata(result, this.metadata, baseMetrics);

            // Format the candidates.
            (new Formatter(this, this.relaxedMode, this.feedMode)).format($content);

            // Store extraction location.
            result.url = window.location.href;

            // Store extraction metadata.
            result.metadata = "";
            ncrt_extractor_$.each(this.candidates, function () {
                result.metadata += this.asRecord() + "\n";
            });

           
            // Make images offline available and return result.
            setTimeout(function () {
                this.extractorUtils.embedImages(result.contentNode.find("img"), 0,
                    function () {
                        task.progress({"value": 1.0, "success": !task.isTimedOut(), "data": result, "lowQuality": this.lowQualityResult});
                    }.bind(this), task);
            }.bind(this));
        }
        else {
            task.progress({"error": true, "message": "NO_CONTENT"});
        }
    },
    
    /**
     * Extract content from the DOM for the current
     * active document (S2K State Model).
     * 
     * @param task interface to report progress and check for timeout
     * @return Extraction Result  
     */
    extract: function (task) {
        try {
            const state = getState();
            var $baseNode = ncrt_extractor_$(state.stateDocument.body);
            var chromePlugIn = $baseNode.children("embed[name='plugin']");
    
            if (chromePlugIn.length === 1) {
                // Detected special case for previewer plug-ins in browser.
                this.handlePlugInContent(chromePlugIn.attr("src"), chromePlugIn.attr("type"), task.progress);
            }
            else {
                if (state.isSelectedOnly) {
                    // Fetch selected elements.
                    var $selection = ncrt_extractor_$(document.getSelection().getRangeAt(0).cloneContents()).contents();
                    $selection.find(this.REMOVABLE_TAGS).remove();

                    // Create a content fragment.
                    var $content = ncrt_extractor_$("<div id='s2k-result' class='s2k-result-content'></div>").append($selection);
                    
                    // Traverse content result for formatting.
                    this.traverse($content, 0, 0, 0, false, false, true, function () {
                        // Enable relaxed formatting mode.
                        this.feedMode = this.relaxedMode = true;
                        
                        // Prepare document model.
                        this.prepareDocumentModel($content, $content.data("s2k"),  task);
                    }.bind(this), task);
                }
                else {
                    // Run analyzing algorithms.
                    this.extractFromDOM($baseNode, task);
                }
            }
        } 
        catch (e) {
            task.progress({"error": true, "data": e});
        }
    }
};


;// CONCATENATED MODULE: ./src-logic/extractor/extractor-mapping.js
/**
 * extractor-mapping.js
 * 
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Mapping for extractor types.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */



const EXTRACTORS = [
    {"schema": /(maps\.google\.\w+)|(\w\.bing\.\w+\/maps)/i, "type": MapExtractor, "metrics": "c_extraction_maps"}
];

/**
 * Create an extractor for this type.
 * @param state State
 */
const createExtractor = function (state) {
    var href = state.stateDocument.location.href;

    for (var i = 0, len = EXTRACTORS.length; i < len; i++) {
        if (EXTRACTORS[i].schema.test(href) === true) {
            state.metrics.count(state.metrics.NAMES[EXTRACTORS[i].metrics]);
            return new EXTRACTORS[i].type();
        }
    }

    // Fallback for general cases.
    state.metrics.count(state.metrics.NAMES.c_extraction_ncrt);
    return new NcrtExtractor();
};



;// CONCATENATED MODULE: ./src-logic/preview/s2k-preview.js
/* provided dependency */ var s2k_preview_$ = __webpack_require__(755);
/**
 * s2k-preview.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Connector for preview and extension.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */





/**
 * @constructor
 */
const Preview = function () {
    // ######## Privileged Members ########
    /**
     * Event Dispatcher
     */
    this.dispatcher = null;
    
    /**
     * Content Injection Status
     */
    this.isInjected = false;
    
    /**
     * Preview was opened in GUID refresh mode.
     */
    this.isGuidRefresh = false;
    
    /**
     * S2K Service Client
     */
    this.service = new SendToKindleService();
    
    /**
     * Platform Information
     */
    this.platformInfo = {
        "name": `${"chrome"}_preview`, 
        "version": "1.0.1.111", 
        "versionId": "111",
        "platform": "chrome-1.0.1.111", 
        "ref": "gch",
        "metrics": "emit-metrics",
    };
};

Preview.prototype = {
    // ######## Constants ########
        
    // ######## Methods ########
    /**
     * Connect to the preview.
     */
    connect: function () {
        // Load state.
        const state = getState();
        
        // Connect the event dispatcher.
        this.dispatcher = s2k_preview_$(state.stateDocument).find("#s2k-event-manager");
        
        // Register event handlers.
        this.registerEvents();

        // Search for a refresh request.
        this.isGuidRefresh = /refresh/i.test(state.stateDocument.location.hash);
        
        // Remove the refresh flag from hash.
        if (this.isGuidRefresh === true) {
            // Create the new hashtag without refresh.
            var hash = state.stateDocument.location.hash.replace(/,?refresh,?/gi, "");
            
            // Manipulate the history to remove refresh action.
            state.stateWindow.history.replaceState(null, "", 
                state.stateDocument.location.pathname +
                state.stateDocument.location.search +
                (hash === "#" ? "" : hash)
            );
        }

        // Load the extension metadata.
        this.service.sendExtensionMessage("extension-metadata", 
                {"refresh": this.isGuidRefresh},
                this.onExtensionMetadata.bind(this));
    },

    /**
     * Register the event handlers.
     */
    registerEvents: function () {

        // Register for requests to send documents.
        this.dispatcher.on("s2k-send-to-kindle", this.onSendToKindle.bind(this));
        
        // Register for document injection events.
        this.dispatcher.on("s2k-injected", this.onContentInjected.bind(this));

        // Register for document metadata updates.
        this.dispatcher.on("s2k-metadata-update", this.onMetadataUpdate.bind(this));
    },
    
    /**
     * Inject the document.
     */
    injectDocument: function () {
        // Load token from URL.
        var token = window.location.href.match(/article=(\d+)/i);
        
        // Validate token.
        if (token === null || token[1] === undefined) {
            // Push an empty content message.
            this.onContentLoaded({"data": { "token": null, "timestamp": null, "data": undefined }});
        } else {
            // Load the document from the extension store.
            this.service.sendExtensionMessage("fetch-document", { "token": token[1] }, this.onContentLoaded.bind(this));
        }
    },
    
    // ######## Event Handler ########
    /**
     * Event handler for content requests.
     * @param message   Extension Message
     */
    onContentLoaded: function (message) {
        if (this.isInjected === false) {
            // Create a custom event.
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("s2k-inject", true, true, JSON.stringify({
                "token": message.data.token, 
                "timestamp": message.data.timestamp, 
                "data": message.data.data, 
                "pi": this.platformInfo
            }));
            
            // Set the content in the state, if data was available.
            if (message.data.data) {
                const state = getState();
                state.content = new SendToKindleDocument();
                state.content.fromStorageJson(message.data.data);
            }
            
            // Trigger event on dispatcher.
            this.dispatcher[0].dispatchEvent(event);
            
            // Set a timeout to retry the action. 
            setTimeout(function () {
                this.onContentLoaded(message);
            }.bind(this), 500);
        }
    },

    /**
     * Event handler for content injection.
     */
    onContentInjected: function () {
        this.isInjected = true;
        this.dispatcher.off("s2k-injected");
    },

    /**
     * Event handler for S2K extension URL.
     */
    onExtensionMetadata: function (message) {
        const state = getState();

        // Load metadata into the instance.
        state.extensionUrl = message.data.url;
        state.s2kGuid = message.data.s2kGuid;
        
        // Inject the document.
        this.injectDocument();
    },
    
    onMetadataUpdate: function (message) {
        // Load the data sent to the extension.
        var metadata = message.originalEvent.detail;
        
        // Update the local content.
        const state = getState();
        state.content.title = metadata.title || state.content.title;
        state.content.author = metadata.author || state.content.author;
        
        // Send the update request to the extension.
        this.service.sendExtensionMessage("update-document", metadata, undefined);
    },
    
    /**
     * Event for requests to send to Kindle.
     */
    onSendToKindle: function () {
        // Load the status message into the page and set it to the sending message.
        const state = getState();
        state.statusMessage = state.statusMessage || new StatusMessage("status");
        state.statusMessage.inject();
        state.statusMessage.setMessage("send");
        
        // Initialize the sending process.
        this.service.sendToKindle();
    }
};



;// CONCATENATED MODULE: ./src-logic/history/history-overlay.js
/* provided dependency */ var history_overlay_$ = __webpack_require__(755);
/**
 * history-overlay.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Overlay for history.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */


/**
 * @constructor
 */
const History = function () {
};

History.prototype = {
    // ######## Constants ########
    /**
     * URL for the history.
     * @const
     * @type {string}
     */
    HISTORY_URL: "/send-to-kindle-history.html",
        
    /**
     * History styling information.
     * @const
     * @type {Object}
     */
    HISTORY_STYLE: {
        "#s2k-history-overlay": {
            "position": "fixed",
            "top": "0",
            "left": "0",
            "z-index": "2147483647"
        },
        "#s2k-history-shade": {
            "position": "absolute",
            "opacity": "0.8",
            "background-color": "#000",
            "border-bottom-left-radius": "15px",
            "border-bottom-right-radius": "15px",
            "z-index": "-1"
        },
        "#s2k-history-frame": {
            "margin": "0px 15px 15px 15px"
        }
    },
    
    /**
     * History frame style.
     * @const
     * @type {Object}
     */    
    HISTORY_FRAME_STYLE: {
        "width": "90%"
    },
        
    /**
     * History Overlay
     * @const
     * @type {Object}
     */    
    HISTORY_OVERLAY: 
        history_overlay_$('<div id="s2k-history-overlay" style="display:none">' + 
          '   <div id="s2k-history-shade"></div>' +
          '   <iframe sandbox="allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-popups" id="s2k-history-frame" frameborder="0" scrolling="0" ></iframe>' +
          '   <div id="s2k-history-button-close"></div>' +
          '</div>'
        ),
        
    // ######## Members ########
    /**
     * History Overlay
     * @private
     * @type {Object|undefined}
     */
    history: undefined,
    
    /**
     * History Frame
     * @private
     * @type {Node|undefined}
     */
    historyFrame: undefined,
        
    // ######## Methods ########
    /**
     * Inject the history overlay into the platform.
     */
    inject: function () {
        // Load the state for this window/tab.
        const state = getState();

        // Create the overlay injection HTML.
        this.history = this.HISTORY_OVERLAY.clone();
        this.history.find("#s2k-history-frame").attr("src", state.extensionUrl + this.HISTORY_URL);
        
        // Inject the overlay.
        history_overlay_$(state.stateDocument.body).append(this.history);
        
        // Load injected node.
        this.history = history_overlay_$(state.stateDocument.body).find("#s2k-history-overlay");
        this.historyShade = this.history.find("#s2k-history-shade");
        this.historyFrame = this.history.find("#s2k-history-frame");
                
        // Attach event listener for window events.
        history_overlay_$(state.stateWindow).on("resize", this.onResize.bind(this));
        history_overlay_$(state.stateWindow).on("message", this.onHistoryMessage.bind(this));
        
        // Attach event listener for document clicks.
        history_overlay_$(state.stateDocument).on("click", this.onClose.bind(this));
        
        // Attach event listener for overlay elements.
        this.history.on("click", function (event) {
            event.stopPropagation();
        });
        
        // Attach message listener to window.
        
        // Apply the stylesheet.
        this.history.css(this.HISTORY_STYLE["#s2k-history-overlay"]);
        for (var style in this.HISTORY_STYLE) {
            this.history.find(style).css(this.HISTORY_STYLE[style]);
        }
        
        // Show the history.
        this.onResize();
        this.history.slideDown("fast");
    },
      
    /**
     * Terminate the history overlay.
     */
    terminate: function () {
        this.history.slideUp("fast", function () {
            // Remove history from DOM.
            this.history.remove();
        }.bind(this));
    },
    
    // ######## Event Handler ########
    /**
     * Event handler for window resizes.
     */
    onResize: function () {
        // Load the state for this window/tab.
        var stateWindow = history_overlay_$(getState().stateWindow);
        var width = stateWindow.width();
        var height = stateWindow.height() / 2;

        // Adjust history size.
        this.history.css({"width": width + "px", "height": height + "px"});
        this.historyShade.css({"width": width + "px", "height": height + "px"});
        this.historyFrame.css({"width": (width - 30) + "px", "height": (height - 15) + "px"});
    },
    
    /**
     * Event handler for window message.
     * @param event     Event
     */
    onHistoryMessage: function (event) {
        if (event.originalEvent.data === "history-close") {
            this.onClose();
        }
    },
    
    /**
     * Event handler for closing the history.
     */
    onClose: function () {
        this.terminate();
    }
};



;// CONCATENATED MODULE: ./src-common/constants.js
const EXTRACTION_TIMEOUT_MILLIS = 30 * 1000;

;// CONCATENATED MODULE: ./src-logic/send-to-kindle-logic-launch.js
/**
 * send-to-kindle-launch.js
 * @author: Bernhard Wolkerstorfer
 * 
 * Description: Launch logic for Send-to-Kindle.
 * 
 * Copyright (c) 2012 Amazon.com, Inc. All rights reserved.
 */








// #################################################################### 
// ## Initalization Logic                                            ##
// ####################################################################
const initalizeContentScript = (injectionContext, s2kGuid, extensionId, lowQualityAction) => {
    getState().initalize(injectionContext, s2kGuid, extensionId, lowQualityAction);
};


// #################################################################### 
// ## Extraction Logic                                               ##
// ####################################################################
/**
 * Method to handle extraction progress messages.
 * @param {Object} status Status
 */
const launchProgress = function (status) {
    const state = getState();
    var task = this;
    // Handle the extraction result.
    if (status.success === true && state.abortWorkflow === false) {
        // Stop timer for extraction. 
        state.metrics.stopTimer(state.metrics.NAMES.t_extraction);
        
        // Copy extraction result.
        state.content = status.data;
        
        // Emit source metrics.
        state.metrics.countWithPrefix(state.metrics.NAMES.c_source, state.content.source);
        
        // Handle low quality results based on customer preferences, if the customer
        // has nothing selected or selected to send anyway ignore the LQ flag. This
        // logic only applies to "Send to Kindle" cases.
        status.lowQuality = (state.isPreviewOnly === false && status.lowQuality === true);
        if (status.lowQuality === true && state.lowQualityAction === "ASK") {
            // Low quality message and wait for user action.
            state.statusMessage.switchMode("low_quality");
            return;
        }
        else if (status.lowQuality === true && state.lowQualityAction === "PREVIEW") {
            // Customer wants to preview in low quality cases.
            state.isPreviewOnly = true;
        }
        
        // Redirect customer to preview.
        if (state.isPreviewOnly === true && status.plugin !== true) {
            state.metrics.count(state.isShortcut ? state.metrics.NAMES.c_ext_sc_preview : state.metrics.NAMES.c_ext_ddown_preview);
            state.service.redirectToPreview();
        }
        else if (state.isPreviewOnly === false) {
            state.metrics.count(state.isShortcut ? state.metrics.NAMES.c_ext_sc_send : state.metrics.NAMES.c_ext_ddown_send);
            state.service.sendToKindle();
        }
        else {
            // Show extraction error.
            state.statusMessage.setMessage("preview-plugin");
            state.statusMessage.terminate(true, false);
        }
    }
    else if ((status.error === true && state.abortWorkflow === false) || task.isTimedOut()) {
        // Show extraction error.
        state.statusMessage.setMessage("extraction");
        state.statusMessage.terminate(true, false);
        
        // Emit metrics.
        state.metrics.countWithPrefix(state.metrics.NAMES.c_source, state.stateDocument.location.hostname);
        state.metrics.count(state.metrics.NAMES.c_extraction_error);
        state.metrics.terminate();
    }
};

/**
 * Handler for when the service worker needs to update the low quality action
 * @param {string} lowQualityAction 
 */
const updateLowQualityAction = (lowQualityAction) => {
    const state = getState();
    state.lowQualityAction = lowQualityAction;
};

/**
 * Event handler for messages from the status handler.
 * @param {String} action        Selected Action
 * @param {boolean} alwaysSend    Always send content without asking.
 */
const onStatusAction = function (action, alwaysSend) {
    // Load extension state for current window.
    const state = getState();
    
    if (action === "SEND" || action === "PREVIEW") {
        // Rewrite customer request still send the content.
        state.isPreviewOnly = (action === "PREVIEW");
         
        // Show status message in progress mode.
        state.statusMessage.switchMode("status");
        state.statusMessage.setMessage(action.toLowerCase());
        
        // Handle always send case.
        if (alwaysSend === true) {
            state.lowQualityAction = "SEND";
            state.service.setDefaultEngineAction("SEND", function () {
                // Reactivate workflow at last point.
                launchProgress({"success": true, "data": state.content});
            });
        }
        else {
            launchProgress({"success": true, "data": state.content});
        }
    }
    else if (action === "status.abort") {
        // Remove content.
        state.content = null;
        
        // Stop workflow execution.
        state.abortWorkflow = true;
        
        // Remove status message.
        state.statusMessage.terminate(false, true);
    }
};

/**
 * Entry point for extraction engine.
 * @param {boolean} previewOnly   Preview and Send
 * @param {boolean} selectedOnly  Selected text only.
 * @param {boolean} usedShortcut  Engine was triggered by shortcut.
 */
const launchExtraction = function (previewOnly, selectedOnly, usedShortcut) {
    // Load extension state for current window.
    const state = getState();

    // Somehow, if we're trying to extract content before the
    // content script has been fully injected and the state transition
    // between the SW and the content script has finished, try again in 250ms
    if (!state.isInjected) {
        setTimeout(launchExtraction, 250);
        return;
    }
    
    // Set desired action in state.
    state.isPreviewOnly = previewOnly || false;
    state.isSelectedOnly = selectedOnly || false;
    state.isShortcut = usedShortcut || false;
    
    // Initialize metrics.
    state.metrics.init();

    // Initialize progress information.
    state.statusMessage = state.statusMessage || new StatusMessage("status", onStatusAction);
    state.abortWorkflow = false;

    // Perform action only, if the content has a body and it is not already a preview.    
    if (state.stateDocument.body !== null && state.stateDocument.location.pathname.match(/^\/gp\/sendtokindle\/(reader|setup)/i) === null) {
        // Inject the status message.
        state.statusMessage.inject();

        // Update progress information. 
        state.statusMessage.setMessage("analyze");
        
        // Release UI thread for drawing the spinner.
        setTimeout(function () {
            // Run extraction process, if necessarily.
            if (state.content === null) {
                // Start timer for extraction. 
                state.metrics.startTimer(state.metrics.NAMES.t_extraction);

                var extractor = createExtractor(state);
                var task = {
                    timeoutTimeInMillis: Date.now() + EXTRACTION_TIMEOUT_MILLIS,
                    isTimedOut : function() {return Date.now() > this.timeoutTimeInMillis;}
                };
                task.progress = launchProgress.bind(task);
                extractor.extract(task);
            } else {
                launchProgress({"success": true, "data": state.content, "value": 1.0});
            }
        }, 0);
    }
};

//#################################################################### 
// ## Preview Logic                                                 ##
//#################################################################### 
/**
 * Launch the previewer.
 */
const launchPreview = function () {
    // Load the state.
    var state = getState();
    state.initalize("preview");

    var previewUrl = "https://www.amazon.com/sendtokindle/preview";

    if (state.stateDocument.body !== null && state.stateDocument.location.href.search(previewUrl) !== -1) {
        // Initialize metrics.
        state.metrics.init();
        
        // Connect the preview.
        state.preview = new Preview();
        state.preview.connect();
    }
};

/* We need to launch the prevew window when the scripts start to run, 
but only if we're on the preview page */
launchPreview();

//#################################################################### 
// ## History Logic                                                 ##
//####################################################################
const launchHistory = () => {
    const state = getState();
    state.initalize("history");

    if (!state.history) {
        state.history = new History();
    }

    state.history.inject();
};


// These are the entrypoints for code executed via the service worker
globalThis.updateLowQualityAction = updateLowQualityAction;
globalThis.launchExtraction = launchExtraction;
globalThis.launchHistory = launchHistory;
globalThis.initalizeContentScript = initalizeContentScript;

})();

/******/ })()
;