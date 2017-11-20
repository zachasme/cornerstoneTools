/*! cornerstone-tools - 1.1.0 - 2017-11-20 | (c) 2017 Chris Hafey | https://github.com/chafey/cornerstoneTools */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cornerstone-math"));
	else if(typeof define === 'function' && define.amd)
		define("cornerstoneTools", ["cornerstone-math"], factory);
	else if(typeof exports === 'object')
		exports["cornerstoneTools"] = factory(require("cornerstone-math"));
	else
		root["cornerstoneTools"] = factory(root["cornerstoneMath"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 61);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.external = exports.cornerstoneMath = undefined;

var _cornerstoneMath = __webpack_require__(62);

var cornerstoneMath = _interopRequireWildcard(_cornerstoneMath);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var cornerstone = window.cornerstone;
var $ = window.$;
var Hammer = window.Hammer;

var external = {
  set cornerstone(cs) {
    cornerstone = cs;
  },
  get cornerstone() {
    return cornerstone;
  },
  set $(module) {
    $ = module;
  },
  get $() {
    return $;
  },
  set Hammer(module) {
    Hammer = module;
  },
  get Hammer() {
    return Hammer;
  }
};

exports.cornerstoneMath = cornerstoneMath;
exports.external = external;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementToolStateManager = exports.setElementToolStateManager = exports.clearToolState = exports.removeToolState = exports.getToolState = exports.addToolState = undefined;

var _externalModules = __webpack_require__(0);

var _imageIdSpecificStateManager = __webpack_require__(15);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElementToolStateManager(element) {
  var enabledImage = _externalModules.external.cornerstone.getEnabledElement(element);
  // If the enabledImage has no toolStateManager, create a default one for it
  // NOTE: This makes state management element specific

  if (enabledImage.toolStateManager === undefined) {
    enabledImage.toolStateManager = _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }

  return enabledImage.toolStateManager;
}

// Here we add tool state, this is done by tools as well
// As modules that restore saved state
function addToolState(element, toolType, measurementData) {
  var toolStateManager = getElementToolStateManager(element);

  toolStateManager.add(element, toolType, measurementData);

  var eventType = 'CornerstoneToolsMeasurementAdded';
  var eventData = {
    toolType: toolType,
    element: element,
    measurementData: measurementData
  };

  (0, _triggerEvent2.default)(element, eventType, eventData);
}

// Here you can get state - used by tools as well as modules
// That save state persistently
function getToolState(element, toolType) {
  var toolStateManager = getElementToolStateManager(element);

  return toolStateManager.get(element, toolType);
}

function removeToolState(element, toolType, data) {
  var toolStateManager = getElementToolStateManager(element);
  var toolData = toolStateManager.get(element, toolType);
  // Find this tool data
  var indexOfData = -1;

  for (var i = 0; i < toolData.data.length; i++) {
    if (toolData.data[i] === data) {
      indexOfData = i;
    }
  }

  if (indexOfData !== -1) {
    toolData.data.splice(indexOfData, 1);

    var eventType = 'CornerstoneToolsMeasurementRemoved';
    var eventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, eventData);
  }
}

function clearToolState(element, toolType) {
  var toolStateManager = getElementToolStateManager(element);
  var toolData = toolStateManager.get(element, toolType);

  // If any toolData actually exists, clear it
  if (toolData !== undefined) {
    toolData.data = [];
  }
}

// Sets the tool state manager for an element
function setElementToolStateManager(element, toolStateManager) {
  var enabledImage = _externalModules.external.cornerstone.getEnabledElement(element);

  enabledImage.toolStateManager = toolStateManager;
}

exports.addToolState = addToolState;
exports.getToolState = getToolState;
exports.removeToolState = removeToolState;
exports.clearToolState = clearToolState;
exports.setElementToolStateManager = setElementToolStateManager;
exports.getElementToolStateManager = getElementToolStateManager;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (which, mouseButtonMask) {
  var mouseButton = 1 << which - 1;

  return (mouseButtonMask & mouseButton) !== 0;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = triggerEvent;

var _externalModules = __webpack_require__(0);

/**
 * Trigger a CustomEvent
 *
 * @param {EventTarget} el The element or EventTarget to trigger the event upon
 * @param {String} type The event type name
 * @param {Object|null} detail=null The event data to be sent
 * @returns {boolean} The return value is false if at least one event listener called preventDefault(). Otherwise it returns true.
 */
function triggerEvent(el, type) {
  var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var event = void 0;

  // This check is needed to polyfill CustomEvent on IE11-
  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(type.toLocaleLowerCase(), {
      detail: detail,
      cancelable: true
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type.toLocaleLowerCase(), true, true, detail);
  }

  // TODO: remove jQuery event triggers
  var jqEvent = _externalModules.external.$.Event(type, detail);

  _externalModules.external.$(el).trigger(jqEvent, detail);
  if (jqEvent.isImmediatePropagationStopped()) {
    return false;
  }

  return el.dispatchEvent(event);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultColor = 'white',
    activeColor = 'greenyellow',
    fillColor = 'transparent';

function setFillColor(color) {
  fillColor = color;
}

function getFillColor() {
  return fillColor;
}

function setToolColor(color) {
  defaultColor = color;
}

function getToolColor() {
  return defaultColor;
}

function setActiveColor(color) {
  activeColor = color;
}

function getActiveColor() {
  return activeColor;
}

function getColorIfActive(active) {
  return active ? activeColor : defaultColor;
}

var toolColors = {
  setFillColor: setFillColor,
  getFillColor: getFillColor,
  setToolColor: setToolColor,
  getToolColor: getToolColor,
  setActiveColor: setActiveColor,
  getActiveColor: getActiveColor,
  getColorIfActive: getColorIfActive
};

exports.default = toolColors;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultWidth = 1,
    activeWidth = 2;

function setToolWidth(width) {
  defaultWidth = width;
}

function getToolWidth() {
  return defaultWidth;
}

function setActiveWidth(width) {
  activeWidth = width;
}

function getActiveWidth() {
  return activeWidth;
}

var toolStyle = {
  setToolWidth: setToolWidth,
  getToolWidth: getToolWidth,
  setActiveWidth: setActiveWidth,
  getActiveWidth: getActiveWidth
};

exports.default = toolStyle;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, textLines, x, y, color, options) {
  if (Object.prototype.toString.call(textLines) !== '[object Array]') {
    textLines = [textLines];
  }

  var padding = 5;
  var font = _textStyle2.default.getFont();
  var fontSize = _textStyle2.default.getFontSize();
  var backgroundColor = _textStyle2.default.getBackgroundColor();

  context.save();
  context.font = font;
  context.textBaseline = 'top';
  context.strokeStyle = color;

  // Find the longest text width in the array of text data
  var maxWidth = 0;

  textLines.forEach(function (text) {
    // Get the text width in the current font
    var width = context.measureText(text).width;

    // Find the maximum with for all the text rows;
    maxWidth = Math.max(maxWidth, width);
  });

  // Draw the background box with padding
  context.fillStyle = backgroundColor;

  // Calculate the bounding box for this text box
  var boundingBox = {
    width: maxWidth + padding * 2,
    height: padding + textLines.length * (fontSize + padding)
  };

  if (options && options.centering && options.centering.x === true) {
    x -= boundingBox.width / 2;
  }

  if (options && options.centering && options.centering.y === true) {
    y -= boundingBox.height / 2;
  }

  boundingBox.left = x;
  boundingBox.top = y;

  if (options && options.debug === true) {
    context.fillStyle = '#FF0000';
  }

  context.fillRect(boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height);

  // Draw each of the text lines on top of the background box
  textLines.forEach(function (text, index) {
    context.fillStyle = color;

    /* Var ypos;
        if (index === 0) {
            ypos = y + index * (fontSize + padding);
        } else {
            ypos = y + index * (fontSize + padding * 2);
        }*/

    context.fillText(text, x + padding, y + padding + index * (fontSize + padding));
  });

  context.restore();

  // Return the bounding box so it can be used for pointNearHandle
  return boundingBox;
};

var _textStyle = __webpack_require__(14);

var _textStyle2 = _interopRequireDefault(_textStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseToolInterface) {
  var configuration = {};

  // /////// BEGIN ACTIVE TOOL ///////
  function addNewMeasurement(mouseEventData) {
    var cornerstone = _externalModules.external.cornerstone;
    var element = mouseEventData.element;

    var measurementData = mouseToolInterface.createNewMeasurement(mouseEventData);

    if (!measurementData) {
      return;
    }

    var eventData = {
      mouseButtonMask: mouseEventData.which
    };

    // Associate this data with this imageId so we can render it and manipulate it
    (0, _toolState.addToolState)(mouseEventData.element, mouseToolInterface.toolType, measurementData);

    // Since we are dragging to another place to drop the end point, we can just activate
    // The end point and let the moveHandle move it for us.
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseToolInterface.mouseDownCallback || mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback);

    if (mouseToolInterface.mouseDoubleClickCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDoubleClick', mouseToolInterface.mouseDoubleClickCallback);
    }

    cornerstone.updateImage(element);

    var handleMover = void 0;

    if (Object.keys(measurementData.handles).length === 1) {
      handleMover = _moveHandle2.default;
    } else {
      handleMover = _moveNewHandle2.default;
    }

    var preventHandleOutsideImage = void 0;

    if (mouseToolInterface.options && mouseToolInterface.options.preventHandleOutsideImage !== undefined) {
      preventHandleOutsideImage = mouseToolInterface.options.preventHandleOutsideImage;
    } else {
      preventHandleOutsideImage = false;
    }

    handleMover(mouseEventData, mouseToolInterface.toolType, measurementData, measurementData.handles.end, function () {
      measurementData.active = false;
      measurementData.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, mouseToolInterface.toolType, measurementData);
      }

      _externalModules.external.$(element).on('CornerstoneToolsMouseMove', eventData, mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseToolInterface.mouseDownCallback || mouseDownCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDownActivate', eventData, mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback);

      if (mouseToolInterface.mouseDoubleClickCallback) {
        _externalModules.external.$(element).on('CornerstoneToolsMouseDoubleClick', eventData, mouseToolInterface.mouseDoubleClickCallback);
      }

      cornerstone.updateImage(element);
    }, preventHandleOutsideImage);
  }

  function mouseDownActivateCallback(e, eventData) {
    if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
      if (mouseToolInterface.addNewMeasurement) {
        mouseToolInterface.addNewMeasurement(eventData);
      } else {
        addNewMeasurement(eventData);
      }

      return false; // False = causes jquery to preventDefault() and stopPropagation() this event
    }
  }

  // /////// END ACTIVE TOOL ///////

  // /////// BEGIN DEACTIVE TOOL ///////

  function mouseMoveCallback(e, eventData) {
    _toolCoordinates2.default.setCoords(eventData);
    // If a mouse button is down, do nothing
    if (eventData.which !== 0) {
      return;
    }

    // If we have no tool data for this element, do nothing
    var toolData = (0, _toolState.getToolState)(eventData.element, mouseToolInterface.toolType);

    if (!toolData) {
      return;
    }

    // We have tool data, search through all data
    // And see if we can activate a handle
    var imageNeedsUpdate = false;

    for (var i = 0; i < toolData.data.length; i++) {
      // Get the cursor position in canvas coordinates
      var coords = eventData.currentPoints.canvas;

      var data = toolData.data[i];

      if ((0, _handleActivator2.default)(eventData.element, data.handles, coords) === true) {
        imageNeedsUpdate = true;
      }

      if (mouseToolInterface.pointNearTool(eventData.element, data, coords) && !data.active || !mouseToolInterface.pointNearTool(eventData.element, data, coords) && data.active) {
        data.active = !data.active;
        imageNeedsUpdate = true;
      }
    }

    // Handle activation status changed, redraw the image
    if (imageNeedsUpdate === true) {
      _externalModules.external.cornerstone.updateImage(eventData.element);
    }
  }

  function mouseDownCallback(e, eventData) {
    var data = void 0;
    var element = eventData.element;

    function handleDoneMove() {
      data.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, mouseToolInterface.toolType, data);
      }

      _externalModules.external.cornerstone.updateImage(element);
      _externalModules.external.$(element).on('CornerstoneToolsMouseMove', eventData, mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
    }

    if (!(0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
      return;
    }

    var coords = eventData.startPoints.canvas;
    var toolData = (0, _toolState.getToolState)(e.currentTarget, mouseToolInterface.toolType);

    if (!toolData) {
      return;
    }

    var i = void 0;

    // Now check to see if there is a handle we can move

    var preventHandleOutsideImage = void 0;

    if (mouseToolInterface.options && mouseToolInterface.options.preventHandleOutsideImage !== undefined) {
      preventHandleOutsideImage = mouseToolInterface.options.preventHandleOutsideImage;
    } else {
      preventHandleOutsideImage = false;
    }

    for (i = 0; i < toolData.data.length; i++) {
      data = toolData.data[i];
      var distance = 6;
      var handle = (0, _getHandleNearImagePoint2.default)(element, data.handles, coords, distance);

      if (handle) {
        _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
        data.active = true;
        (0, _moveHandle2.default)(eventData, mouseToolInterface.toolType, data, handle, handleDoneMove, preventHandleOutsideImage);
        e.stopImmediatePropagation();

        return false;
      }
    }

    // Now check to see if there is a line we can move
    // Now check to see if we have a tool that we can move
    if (!mouseToolInterface.pointNearTool) {
      return;
    }

    var options = mouseToolInterface.options || {
      deleteIfHandleOutsideImage: true,
      preventHandleOutsideImage: false
    };

    for (i = 0; i < toolData.data.length; i++) {
      data = toolData.data[i];
      data.active = false;
      if (mouseToolInterface.pointNearTool(element, data, coords)) {
        data.active = true;
        _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
        (0, _moveAllHandles2.default)(e, data, toolData, mouseToolInterface.toolType, options, handleDoneMove);
        e.stopImmediatePropagation();

        return false;
      }
    }
  }
  // /////// END DEACTIVE TOOL ///////

  // Not visible, not interactive
  function disable(element) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseToolInterface.mouseDownCallback || mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback);

    if (mouseToolInterface.mouseDoubleClickCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDoubleClick', mouseToolInterface.mouseDoubleClickCallback);
    }

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Note: This is to maintain compatibility for developers that have
  // Built on top of mouseButtonTool.js
  // TODO: Remove this after we migrate Cornerstone Tools away from jQuery
  function onImageRendered(e) {
    mouseToolInterface.onImageRendered(e, e.detail);
  }

  // Visible but not interactive
  function enable(element) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseToolInterface.mouseDownCallback || mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback);

    if (mouseToolInterface.mouseDoubleClickCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDoubleClick', mouseToolInterface.mouseDoubleClickCallback);
    }

    element.addEventListener('cornerstoneimagerendered', onImageRendered);

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Visible, interactive and can create
  function activate(element, mouseButtonMask) {
    var eventData = {
      mouseButtonMask: mouseButtonMask
    };

    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseToolInterface.mouseDownCallback || mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback);

    element.addEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).on('CornerstoneToolsMouseMove', eventData, mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseToolInterface.mouseDownCallback || mouseDownCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDownActivate', eventData, mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback);

    if (mouseToolInterface.mouseDoubleClickCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDoubleClick', mouseToolInterface.mouseDoubleClickCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDoubleClick', eventData, mouseToolInterface.mouseDoubleClickCallback);
    }

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Visible, interactive
  function deactivate(element, mouseButtonMask) {
    var eventData = {
      mouseButtonMask: mouseButtonMask
    };

    var eventType = 'CornerstoneToolsToolDeactivated';
    var statusChangeEventData = {
      mouseButtonMask: mouseButtonMask,
      toolType: mouseToolInterface.toolType,
      type: eventType
    };

    (0, _triggerEvent2.default)(element, eventType, statusChangeEventData);

    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseToolInterface.mouseDownCallback || mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback);

    element.addEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).on('CornerstoneToolsMouseMove', eventData, mouseToolInterface.mouseMoveCallback || mouseMoveCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseToolInterface.mouseDownCallback || mouseDownCallback);

    if (mouseToolInterface.mouseDoubleClickCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDoubleClick', mouseToolInterface.mouseDoubleClickCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDoubleClick', eventData, mouseToolInterface.mouseDoubleClickCallback);
    }

    if (mouseToolInterface.deactivate) {
      mouseToolInterface.deactivate(element, mouseButtonMask);
    }

    _externalModules.external.cornerstone.updateImage(element);
  }

  function getConfiguration() {
    return configuration;
  }

  function setConfiguration(config) {
    configuration = config;
  }

  var toolInterface = {
    enable: enable,
    disable: disable,
    activate: activate,
    deactivate: deactivate,
    getConfiguration: getConfiguration,
    setConfiguration: setConfiguration,
    mouseDownCallback: mouseDownCallback,
    mouseMoveCallback: mouseMoveCallback,
    mouseDownActivateCallback: mouseDownActivateCallback
  };

  // Expose pointNearTool if available
  if (mouseToolInterface.pointNearTool) {
    toolInterface.pointNearTool = mouseToolInterface.pointNearTool;
  }

  if (mouseToolInterface.mouseDoubleClickCallback) {
    toolInterface.mouseDoubleClickCallback = mouseToolInterface.mouseDoubleClickCallback;
  }

  if (mouseToolInterface.addNewMeasurement) {
    toolInterface.addNewMeasurement = mouseToolInterface.addNewMeasurement;
  }

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

var _toolCoordinates = __webpack_require__(36);

var _toolCoordinates2 = _interopRequireDefault(_toolCoordinates);

var _getHandleNearImagePoint = __webpack_require__(18);

var _getHandleNearImagePoint2 = _interopRequireDefault(_getHandleNearImagePoint);

var _handleActivator = __webpack_require__(37);

var _handleActivator2 = _interopRequireDefault(_handleActivator);

var _moveHandle = __webpack_require__(22);

var _moveHandle2 = _interopRequireDefault(_moveHandle);

var _moveNewHandle = __webpack_require__(23);

var _moveNewHandle2 = _interopRequireDefault(_moveNewHandle);

var _moveAllHandles = __webpack_require__(38);

var _moveAllHandles2 = _interopRequireDefault(_moveAllHandles);

var _anyHandlesOutsideImage = __webpack_require__(12);

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolState = __webpack_require__(1);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, renderData, handles, color, options) {
  context.strokeStyle = color;

  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    if (handle.drawnIndependently === true) {
      return;
    }

    if (options && options.drawHandlesIfActive === true && !handle.active) {
      return;
    }

    context.beginPath();

    if (handle.active) {
      context.lineWidth = _toolStyle2.default.getActiveWidth();
    } else {
      context.lineWidth = _toolStyle2.default.getToolWidth();
    }

    var handleCanvasCoords = _externalModules.external.cornerstone.pixelToCanvas(renderData.element, handle);

    context.arc(handleCanvasCoords.x, handleCanvasCoords.y, handleRadius, 0, 2 * Math.PI);

    if (options && options.fill) {
      context.fillStyle = options.fill;
      context.fill();
    }

    context.stroke();
  });
};

var _externalModules = __webpack_require__(0);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleRadius = 6;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _anyHandlesOutsideImage = __webpack_require__(12);

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _getHandleNearImagePoint = __webpack_require__(18);

var _getHandleNearImagePoint2 = _interopRequireDefault(_getHandleNearImagePoint);

var _touchMoveHandle = __webpack_require__(53);

var _touchMoveHandle2 = _interopRequireDefault(_touchMoveHandle);

var _moveNewHandleTouch = __webpack_require__(25);

var _moveNewHandleTouch2 = _interopRequireDefault(_moveNewHandleTouch);

var _touchMoveAllHandles = __webpack_require__(52);

var _touchMoveAllHandles2 = _interopRequireDefault(_touchMoveAllHandles);

var _toolState = __webpack_require__(1);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deactivateAllHandles(handles) {
  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    handle.active = false;
  });
}

function deactivateAllToolInstances(toolData) {
  if (!toolData) {
    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    var data = toolData.data[i];

    data.active = false;
    if (!data.handles) {
      continue;
    }

    deactivateAllHandles(data.handles);
  }
}

function touchTool(touchToolInterface) {
  // /////// BEGIN ACTIVE TOOL ///////
  function addNewMeasurement(touchEventData) {
    // Console.log('touchTool addNewMeasurement');
    var cornerstone = _externalModules.external.cornerstone;
    var element = touchEventData.element;

    var measurementData = touchToolInterface.createNewMeasurement(touchEventData);

    if (!measurementData) {
      return;
    }

    (0, _toolState.addToolState)(element, touchToolInterface.toolType, measurementData);

    if (Object.keys(measurementData.handles).length === 1 && touchEventData.type === 'CornerstoneToolsTap') {
      measurementData.active = false;
      measurementData.handles.end.active = false;
      measurementData.handles.end.highlight = false;
      measurementData.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, touchToolInterface.toolType, measurementData);
      }

      cornerstone.updateImage(element);

      return;
    }

    _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);

    cornerstone.updateImage(element);
    (0, _moveNewHandleTouch2.default)(touchEventData, touchToolInterface.toolType, measurementData, measurementData.handles.end, function () {
      measurementData.active = false;
      measurementData.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, touchToolInterface.toolType, measurementData);
      }

      _externalModules.external.$(element).on('CornerstoneToolsTouchStartActive', touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
      cornerstone.updateImage(element);
    });
  }

  function touchDownActivateCallback(e, eventData) {
    // Console.log('touchTool touchDownActivateCallback');
    if (touchToolInterface.addNewMeasurement) {
      touchToolInterface.addNewMeasurement(eventData);
    } else {
      addNewMeasurement(eventData);
    }

    e.stopImmediatePropagation();
    e.preventDefault();
  }
  // /////// END ACTIVE TOOL ///////

  // /////// BEGIN INACTIVE TOOL ///////
  function tapCallback(e, eventData) {
    // Console.log('touchTool tapCallback');
    var cornerstone = _externalModules.external.cornerstone;
    var element = eventData.element;
    var coords = eventData.currentPoints.canvas;
    var toolData = (0, _toolState.getToolState)(e.currentTarget, touchToolInterface.toolType);
    var data = void 0;
    var i = void 0;

    // Deactivate everything
    deactivateAllToolInstances(toolData);

    function doneMovingCallback() {
      // Console.log('touchTool tapCallback doneMovingCallback');
      deactivateAllToolInstances(toolData);
      if ((0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, touchToolInterface.toolType, data);
      }

      cornerstone.updateImage(element);
      _externalModules.external.$(element).on('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);
    }

    // Now check to see if there is a handle we can move
    if (toolData) {
      for (i = 0; i < toolData.data.length; i++) {
        data = toolData.data[i];
        var distanceSq = 25; // Should probably make this a settable property later
        var handle = (0, _getHandleNearImagePoint2.default)(element, data.handles, coords, distanceSq);

        if (handle) {
          _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
          _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);
          data.active = true;
          handle.active = true;
          cornerstone.updateImage(element);
          (0, _touchMoveHandle2.default)(e, touchToolInterface.toolType, data, handle, doneMovingCallback);
          e.stopImmediatePropagation();
          e.preventDefault();

          return;
        }
      }
    }

    // Now check to see if we have a tool that we can move
    if (toolData && touchToolInterface.pointNearTool) {
      for (i = 0; i < toolData.data.length; i++) {
        data = toolData.data[i];
        if (touchToolInterface.pointNearTool(element, data, coords)) {
          _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
          _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);
          data.active = true;
          cornerstone.updateImage(element);
          (0, _touchMoveAllHandles2.default)(e, data, toolData, touchToolInterface.toolType, true, doneMovingCallback);
          e.stopImmediatePropagation();
          e.preventDefault();

          return;
        }
      }
    }

    // If there is nothing to move, add a new instance of the tool
    // Need to check here to see if activation is allowed!
    if (touchToolInterface.touchDownActivateCallback) {
      touchToolInterface.touchDownActivateCallback(e, eventData);
    } else {
      touchDownActivateCallback(e, eventData);
    }

    return false;
  }

  function touchStartCallback(e, eventData) {
    // Console.log('touchTool touchStartCallback');
    var cornerstone = _externalModules.external.cornerstone;
    var element = eventData.element;
    var coords = eventData.startPoints.canvas;
    var data = void 0;
    var toolData = (0, _toolState.getToolState)(e.currentTarget, touchToolInterface.toolType);
    var i = void 0;

    function doneMovingCallback(lastEvent, lastEventData) {
      // Console.log('touchTool touchStartCallback doneMovingCallback');
      data.active = false;
      data.invalidated = true;
      if ((0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(eventData.element, touchToolInterface.toolType, data);
      }

      cornerstone.updateImage(eventData.element);
      _externalModules.external.$(element).on('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);

      if (touchToolInterface.pressCallback) {
        _externalModules.external.$(element).on('CornerstoneToolsTouchPress', touchToolInterface.pressCallback);
      }

      if (lastEvent && lastEvent.type === 'CornerstoneToolsTouchPress') {
        (0, _triggerEvent2.default)(element, lastEvent.type, lastEventData);
      }
    }

    // Now check to see if there is a handle we can move

    // Average pixel width of index finger is 45-57 pixels
    // https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/
    var distance = 28;

    if (!toolData) {
      return;
    }

    for (i = 0; i < toolData.data.length; i++) {
      data = toolData.data[i];

      var handle = (0, _getHandleNearImagePoint2.default)(eventData.element, data.handles, coords, distance);

      if (handle) {
        _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
        _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);
        if (touchToolInterface.pressCallback) {
          _externalModules.external.$(element).off('CornerstoneToolsTouchPress', touchToolInterface.pressCallback);
        }

        data.active = true;
        (0, _touchMoveHandle2.default)(e, touchToolInterface.toolType, data, handle, doneMovingCallback);
        e.stopImmediatePropagation();
        e.preventDefault();

        return;
      }
    }

    // Now check to see if we have a tool that we can move
    if (!touchToolInterface.pointNearTool) {
      return;
    }

    for (i = 0; i < toolData.data.length; i++) {
      data = toolData.data[i];

      if (touchToolInterface.pointNearTool(eventData.element, data, coords)) {
        _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
        _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);
        if (touchToolInterface.pressCallback) {
          _externalModules.external.$(element).off('CornerstoneToolsTouchPress', touchToolInterface.pressCallback);
        }

        (0, _touchMoveAllHandles2.default)(e, data, toolData, touchToolInterface.toolType, true, doneMovingCallback);
        e.stopImmediatePropagation();
        e.preventDefault();

        return;
      }
    }
  }
  // /////// END INACTIVE TOOL ///////

  // Not visible, not interactive
  function disable(element) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);

    if (touchToolInterface.doubleTapCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsDoubleTap', touchToolInterface.doubleTapCallback);
    }

    if (touchToolInterface.pressCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsTouchPress', touchToolInterface.pressCallback);
    }

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Visible but not interactive
  function enable(element) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);

    element.addEventListener('cornerstoneimagerendered', onImageRendered);

    if (touchToolInterface.doubleTapCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsDoubleTap', touchToolInterface.doubleTapCallback);
    }

    if (touchToolInterface.pressCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsTouchPress', touchToolInterface.pressCallback);
    }

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Visible, interactive and can create
  function activate(element) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);

    element.addEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).on('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTouchStartActive', touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);

    if (touchToolInterface.doubleTapCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsDoubleTap', touchToolInterface.doubleTapCallback);
      _externalModules.external.$(element).on('CornerstoneToolsDoubleTap', touchToolInterface.doubleTapCallback);
    }

    if (touchToolInterface.pressCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsTouchPress', touchToolInterface.pressCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTouchPress', touchToolInterface.pressCallback);
    }

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Note: This is to maintain compatibility for developers that have
  // Built on top of touchTool.js
  // TODO: Remove this after we migrate Cornerstone Tools away from jQuery
  function onImageRendered(e) {
    touchToolInterface.onImageRendered(e, e.detail);
  }

  // Visible, interactive
  function deactivate(element) {
    var eventType = 'CornerstoneToolsToolDeactivated';
    var statusChangeEventData = {
      toolType: touchToolInterface.toolType,
      type: eventType
    };

    (0, _triggerEvent2.default)(element, eventType, statusChangeEventData);

    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', touchToolInterface.touchDownActivateCallback || touchDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', touchToolInterface.tapCallback || tapCallback);

    element.addEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).on('CornerstoneToolsTouchStart', touchToolInterface.touchStartCallback || touchStartCallback);

    if (touchToolInterface.doubleTapCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsDoubleTap', touchToolInterface.doubleTapCallback);
    }

    if (touchToolInterface.pressCallback) {
      _externalModules.external.$(element).off('CornerstoneToolsTouchPress', touchToolInterface.pressCallback);
    }

    _externalModules.external.cornerstone.updateImage(element);
  }

  var toolInterface = {
    enable: enable,
    disable: disable,
    activate: activate,
    deactivate: deactivate,
    touchStartCallback: touchToolInterface.touchStartCallback || touchStartCallback,
    touchDownActivateCallback: touchToolInterface.touchDownActivateCallback || touchDownActivateCallback,
    tapCallback: touchToolInterface.tapCallback || tapCallback
  };

  // Expose pointNearTool if available
  if (touchToolInterface.pointNearTool) {
    toolInterface.pointNearTool = touchToolInterface.pointNearTool;
  }

  if (touchToolInterface.doubleTapCallback) {
    toolInterface.doubleTapCallback = touchToolInterface.doubleTapCallback;
  }

  if (touchToolInterface.pressCallback) {
    toolInterface.pressCallback = touchToolInterface.pressCallback;
  }

  if (touchToolInterface.addNewMeasurement) {
    toolInterface.addNewMeasurement = touchToolInterface.addNewMeasurement;
  }

  return toolInterface;
}

exports.default = touchTool;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultStartLoadHandler = void 0;
var defaultEndLoadHandler = void 0;
var defaultErrorLoadingHandler = void 0;

function setStartLoadHandler(handler) {
  defaultStartLoadHandler = handler;
}

function getStartLoadHandler() {
  return defaultStartLoadHandler;
}

function setEndLoadHandler(handler) {
  defaultEndLoadHandler = handler;
}

function getEndLoadHandler() {
  return defaultEndLoadHandler;
}

function setErrorLoadingHandler(handler) {
  defaultErrorLoadingHandler = handler;
}

function getErrorLoadingHandler() {
  return defaultErrorLoadingHandler;
}

var loadHandlerManager = {
  setStartLoadHandler: setStartLoadHandler,
  getStartLoadHandler: getStartLoadHandler,
  setEndLoadHandler: setEndLoadHandler,
  getEndLoadHandler: getEndLoadHandler,
  setErrorLoadingHandler: setErrorLoadingHandler,
  getErrorLoadingHandler: getErrorLoadingHandler
};

exports.default = loadHandlerManager;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchDragCallback, options) {
  var events = 'CornerstoneToolsTouchDrag';

  if (options && options.fireOnTouchStart === true) {
    events += ' CornerstoneToolsTouchStart';
  }

  var toolInterface = {
    activate: function activate(element) {
      _externalModules.external.$(element).off(events, touchDragCallback);

      if (options && options.eventData) {
        _externalModules.external.$(element).on(events, options.eventData, touchDragCallback);
      } else {
        _externalModules.external.$(element).on(events, touchDragCallback);
      }

      if (options && options.activateCallback) {
        options.activateCallback(element);
      }
    },
    disable: function disable(element) {
      _externalModules.external.$(element).off(events, touchDragCallback);
      if (options && options.disableCallback) {
        options.disableCallback(element);
      }
    },
    enable: function enable(element) {
      _externalModules.external.$(element).off(events, touchDragCallback);
      if (options && options.enableCallback) {
        options.enableCallback(element);
      }
    },
    deactivate: function deactivate(element) {
      _externalModules.external.$(element).off(events, touchDragCallback);
      if (options && options.deactivateCallback) {
        options.deactivateCallback(element);
      }
    }
  };

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (renderData, handles) {
  var image = renderData.image;
  var imageRect = {
    left: 0,
    top: 0,
    width: image.width,
    height: image.height
  };

  var handleOutsideImage = false;

  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    if (handle.allowedOutsideImage === true) {
      return;
    }

    if (_externalModules.cornerstoneMath.point.insideRect(handle, imageRect) === false) {
      handleOutsideImage = true;
    }
  });

  return handleOutsideImage;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseDownCallback) {
  var configuration = {};

  var toolInterface = {
    activate: function activate(element, mouseButtonMask, options) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownCallback);
      var eventData = {
        mouseButtonMask: mouseButtonMask,
        options: options
      };

      _externalModules.external.$(element).on('CornerstoneToolsMouseDownActivate', eventData, mouseDownCallback);
    },
    disable: function disable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownCallback);
    },
    enable: function enable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownCallback);
    },
    deactivate: function deactivate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownCallback);
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultFontSize = 15,
    defaultFont = defaultFontSize + 'px Arial',
    defaultBackgroundColor = 'transparent';

function setFont(font) {
  defaultFont = font;
}

function getFont() {
  return defaultFont;
}

function setFontSize(fontSize) {
  defaultFontSize = fontSize;
}

function getFontSize() {
  return defaultFontSize;
}

function setBackgroundColor(backgroundColor) {
  defaultBackgroundColor = backgroundColor;
}

function getBackgroundColor() {
  return defaultBackgroundColor;
}

var textStyle = {
  setFont: setFont,
  getFont: getFont,
  setFontSize: setFontSize,
  getFontSize: getFontSize,
  setBackgroundColor: setBackgroundColor,
  getBackgroundColor: getBackgroundColor
};

exports.default = textStyle;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalImageIdSpecificToolStateManager = exports.newImageIdSpecificToolStateManager = undefined;

var _externalModules = __webpack_require__(0);

// This implements an imageId specific tool state management strategy.  This means that
// Measurements data is tied to a specific imageId and only visible for enabled elements
// That are displaying that imageId.

function newImageIdSpecificToolStateManager() {
  var toolState = {};

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state

  function saveImageIdToolState(imageId) {
    return toolState[imageId];
  }

  function restoreImageIdToolState(imageId, imageIdToolState) {
    toolState[imageId] = imageIdToolState;
  }

  function saveToolState() {
    return toolState;
  }

  function restoreToolState(savedToolState) {
    toolState = savedToolState;
  }

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addImageIdSpecificToolState(element, toolType, data) {
    var enabledImage = _externalModules.external.cornerstone.getEnabledElement(element);
    // If we don't have any tool state for this imageId, add an empty object

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      toolState[enabledImage.image.imageId] = {};
    }

    var imageIdToolState = toolState[enabledImage.image.imageId];

    // If we don't have tool state for this type of tool, add an empty object
    if (imageIdToolState.hasOwnProperty(toolType) === false) {
      imageIdToolState[toolType] = {
        data: []
      };
    }

    var toolData = imageIdToolState[toolType];

    // Finally, add this new tool to the state
    toolData.data.push(data);
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getImageIdSpecificToolState(element, toolType) {
    var enabledImage = _externalModules.external.cornerstone.getEnabledElement(element);
    // If we don't have any tool state for this imageId, return undefined

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      return;
    }

    var imageIdToolState = toolState[enabledImage.image.imageId];

    // If we don't have tool state for this type of tool, return undefined
    if (imageIdToolState.hasOwnProperty(toolType) === false) {
      return;
    }

    var toolData = imageIdToolState[toolType];

    return toolData;
  }

  // Clears all tool data from this toolStateManager.
  function clearImageIdSpecificToolStateManager(element) {
    var enabledImage = _externalModules.external.cornerstone.getEnabledElement(element);

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      return;
    }

    delete toolState[enabledImage.image.imageId];
  }

  return {
    get: getImageIdSpecificToolState,
    add: addImageIdSpecificToolState,
    clear: clearImageIdSpecificToolStateManager,
    saveImageIdToolState: saveImageIdToolState,
    restoreImageIdToolState: restoreImageIdToolState,
    saveToolState: saveToolState,
    restoreToolState: restoreToolState,
    toolState: toolState
  };
}

// A global imageIdSpecificToolStateManager - the most common case is to share state between all
// Visible enabled images
var globalImageIdSpecificToolStateManager = newImageIdSpecificToolStateManager();

exports.newImageIdSpecificToolStateManager = newImageIdSpecificToolStateManager;
exports.globalImageIdSpecificToolStateManager = globalImageIdSpecificToolStateManager;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (handle, coords) {
  if (!handle.boundingBox) {
    return;
  }

  return _externalModules.cornerstoneMath.point.insideRect(coords, handle.boundingBox);
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (image, storedPixelValue) {
  var cornerstone = _externalModules.external.cornerstone;
  var patientStudyModule = cornerstone.metaData.get('patientStudyModule', image.imageId);
  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);

  if (!patientStudyModule || !seriesModule) {
    return;
  }

  var modality = seriesModule.modality;

  // Image must be PET
  if (modality !== 'PT') {
    return;
  }

  var modalityPixelValue = storedPixelValue * image.slope + image.intercept;

  var patientWeight = patientStudyModule.patientWeight; // In kg

  if (!patientWeight) {
    return;
  }

  var petSequenceModule = cornerstone.metaData.get('petIsotopeModule', image.imageId);

  if (!petSequenceModule) {
    return;
  }

  var radiopharmaceuticalInfo = petSequenceModule.radiopharmaceuticalInfo;
  var startTime = radiopharmaceuticalInfo.radiopharmaceuticalStartTime;
  var totalDose = radiopharmaceuticalInfo.radionuclideTotalDose;
  var halfLife = radiopharmaceuticalInfo.radionuclideHalfLife;
  var seriesAcquisitionTime = seriesModule.seriesTime;

  if (!startTime || !totalDose || !halfLife || !seriesAcquisitionTime) {
    return;
  }

  var acquisitionTimeInSeconds = fracToDec(seriesAcquisitionTime.fractionalSeconds || 0) + seriesAcquisitionTime.seconds + seriesAcquisitionTime.minutes * 60 + seriesAcquisitionTime.hours * 60 * 60;
  var injectionStartTimeInSeconds = fracToDec(startTime.fractionalSeconds) + startTime.seconds + startTime.minutes * 60 + startTime.hours * 60 * 60;
  var durationInSeconds = acquisitionTimeInSeconds - injectionStartTimeInSeconds;
  var correctedDose = totalDose * Math.exp(-durationInSeconds * Math.log(2) / halfLife);
  var suv = modalityPixelValue * patientWeight / correctedDose * 1000;

  return suv;
};

var _externalModules = __webpack_require__(0);

// Returns a decimal value given a fractional value
function fracToDec(fractionalValue) {
  return parseFloat('.' + fractionalValue);
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, handles, coords, distanceThreshold) {
  var nearbyHandle = void 0;

  if (!handles) {
    return;
  }

  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    if (handle.hasOwnProperty('pointNearHandle')) {
      if (handle.pointNearHandle(element, handle, coords)) {
        nearbyHandle = handle;

        return;
      }
    } else if (handle.hasBoundingBox === true) {
      if ((0, _pointInsideBoundingBox2.default)(handle, coords)) {
        nearbyHandle = handle;

        return;
      }
    } else {
      var handleCanvas = _externalModules.external.cornerstone.pixelToCanvas(element, handle);
      var distance = _externalModules.cornerstoneMath.point.distance(handleCanvas, coords);

      if (distance <= distanceThreshold) {
        nearbyHandle = handle;

        return;
      }
    }
  });

  return nearbyHandle;
};

var _externalModules = __webpack_require__(0);

var _pointInsideBoundingBox = __webpack_require__(16);

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*! cornerstone-core - 1.0.1 - 2017-11-04 | (c) 2016 Chris Hafey | https://github.com/chafey/cornerstone */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("cornerstone-core",[],t):"object"==typeof exports?exports["cornerstone-core"]=t():e.cornerstone=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=34)}([function(e,t,r){"use strict";function n(e){if(void 0===e)throw new Error("getEnabledElement: parameter element must not be undefined");for(var t=0;t<l.length;t++)if(l[t].element===e)return l[t];throw new Error("element not enabled")}function a(e){if(void 0===e)throw new Error("getEnabledElement: enabledElement element must not be undefined");l.push(e)}function i(e){var t=[];return l.forEach(function(r){r.image&&r.image.imageId===e&&t.push(r)}),t}function o(){return l}Object.defineProperty(t,"__esModule",{value:!0}),t.getEnabledElement=n,t.addEnabledElement=a,t.getEnabledElementsByImageId=i,t.getEnabledElements=o;var l=[]},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=window.$,a={set $(e){n=e},get $(){return n}};t.external=a},function(e,t,r){"use strict";function n(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;t=t.toLocaleLowerCase();var n=new CustomEvent(t,{detail:r});e.dispatchEvent(n)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=(0,n.getEnabledElement)(e);if(void 0===r.image&&!r.layers.length)throw new Error("updateImage: image has not been loaded yet");(0,i.default)(r,t)};var n=r(0),a=r(4),i=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){e.needsRedraw=!0,t&&(e.invalid=!0)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(void 0===e)throw new Error("getDefaultViewport: parameter canvas must not be undefined");if(void 0===t)throw new Error("getDefaultViewport: parameter image must not be undefined");var r={scale:1,translation:{x:0,y:0},voi:{windowWidth:t.windowWidth,windowCenter:t.windowCenter},invert:t.invert,pixelReplication:!1,rotation:0,hflip:!1,vflip:!1,modalityLUT:t.modalityLUT,voiLUT:t.voiLUT},n=e.height/t.rows,a=e.width/t.columns;return r.scale=Math.min(a,n),r}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return window.performance?performance.now():Date.now()}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r=e.renderingTools.colorRenderCanvas;r.width=t.width,r.height=t.height;var n=r.getContext("2d");n.fillStyle="white",n.fillRect(0,0,r.width,r.height);var a=n.getImageData(0,0,t.width,t.height);e.renderingTools.colorRenderCanvasContext=n,e.renderingTools.colorRenderCanvasData=a}function i(e,t){return void 0!==e.cachedLut&&e.cachedLut.windowCenter===t.voi.windowCenter&&e.cachedLut.windowWidth===t.voi.windowWidth&&e.cachedLut.invert===t.invert?e.cachedLut.lutArray:((0,f.default)(e,t.voi.windowWidth,t.voi.windowCenter,t.invert),e.cachedLut.windowWidth=t.voi.windowWidth,e.cachedLut.windowCenter=t.voi.windowCenter,e.cachedLut.invert=t.invert,e.cachedLut.lutArray)}function o(e,t){var r=e.renderingTools.lastRenderedImageId,n=e.renderingTools.lastRenderedViewport;return t.imageId!==r||!n||n.windowCenter!==e.viewport.voi.windowCenter||n.windowWidth!==e.viewport.voi.windowWidth||n.invert!==e.viewport.invert||n.rotation!==e.viewport.rotation||n.hflip!==e.viewport.hflip||n.vflip!==e.viewport.vflip}function l(e,t,r){e.renderingTools.colorRenderCanvas||(e.renderingTools.colorRenderCanvas=document.createElement("canvas"));var n=e.renderingTools.colorRenderCanvas;if(255===e.viewport.voi.windowWidth&&128===e.viewport.voi.windowCenter&&!1===e.viewport.invert&&t.getCanvas&&t.getCanvas())return t.getCanvas();if(!1===o(e,t)&&!0!==r)return n;n.width===t.width&&n.height===t.height||a(e,t);var l=window.performance?performance.now():Date.now(),u=i(t,e.viewport);t.stats=t.stats||{},t.stats.lastLutGenerateTime=(window.performance?performance.now():Date.now())-l;var d=e.renderingTools.colorRenderCanvasData,s=e.renderingTools.colorRenderCanvasContext;return t.rgba?(0,v.default)(t,u,d.data):(0,c.default)(t,u,d.data),l=window.performance?performance.now():Date.now(),s.putImageData(d,0,0),t.stats.lastPutImageDataTime=(window.performance?performance.now():Date.now())-l,n}function u(e,t){if(void 0===e)throw new Error("drawImage: enabledElement parameter must not be undefined");var r=e.image;if(void 0===r)throw new Error("drawImage: image must be loaded before it can be drawn");var n=e.canvas.getContext("2d");n.setTransform(1,0,0,1,0,0),n.fillStyle="black",n.fillRect(0,0,e.canvas.width,e.canvas.height),!0===e.viewport.pixelReplication?(n.imageSmoothingEnabled=!1,n.mozImageSmoothingEnabled=!1):(n.imageSmoothingEnabled=!0,n.mozImageSmoothingEnabled=!0),n.save(),(0,p.default)(e,n);var a=void 0;a=e.options&&e.options.renderer&&"webgl"===e.options.renderer.toLowerCase()?b.default.renderer.render(e):l(e,r,t),n.drawImage(a,0,0,r.width,r.height,0,0,r.width,r.height),n.restore(),e.renderingTools.lastRenderedImageId=r.imageId;var i={};i.windowCenter=e.viewport.voi.windowCenter,i.windowWidth=e.viewport.voi.windowWidth,i.invert=e.viewport.invert,i.rotation=e.viewport.rotation,i.hflip=e.viewport.hflip,i.vflip=e.viewport.vflip,e.renderingTools.lastRenderedViewport=i}function d(e,t){if(void 0===e)throw new Error("addColorLayer: layer parameter must not be undefined");var r=e.image;if(r.rgba=!0,void 0===r)throw new Error("addColorLayer: image must be loaded before it can be drawn");e.renderingTools=e.renderingTools||{},e.canvas=l(e,r,t);var n=e.canvas.getContext("2d");!0===e.viewport.pixelReplication?(n.imageSmoothingEnabled=!1,n.mozImageSmoothingEnabled=!1):(n.imageSmoothingEnabled=!0,n.mozImageSmoothingEnabled=!0);var a={windowCenter:e.viewport.voi.windowCenter,windowWidth:e.viewport.voi.windowWidth,invert:e.viewport.invert,rotation:e.viewport.rotation,hflip:e.viewport.hflip,vflip:e.viewport.vflip};e.renderingTools.lastRenderedImageId=r.imageId,e.renderingTools.lastRenderedViewport=a}Object.defineProperty(t,"__esModule",{value:!0}),t.renderColorImage=u,t.addColorLayer=d;var s=r(9),f=n(s),m=r(16),c=n(m),g=r(37),v=n(g),h=r(8),p=n(h),w=r(11),b=n(w)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){if(void 0===e)throw new Error("setToPixelCoordinateSystem: parameter enabledElement must not be undefined");if(void 0===t)throw new Error("setToPixelCoordinateSystem: parameter context must not be undefined");var n=(0,a.default)(e,r);t.setTransform(n.m[0],n.m[1],n.m[2],n.m[3],n.m[4],n.m[5])};var n=r(17),a=function(e){return e&&e.__esModule?e:{default:e}}(n)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n,a,o){if(void 0===e.cachedLut){var u=e.maxPixelValue-Math.min(e.minPixelValue,0)+1;e.cachedLut={},e.cachedLut.lutArray=new Uint8ClampedArray(u)}var d=e.cachedLut.lutArray,s=e.maxPixelValue,f=e.minPixelValue,m=(0,i.default)(e.slope,e.intercept,a),c=(0,l.default)(t,r,o),g=0;if(f<0&&(g=f),!0===n)for(var v=e.minPixelValue;v<=s;v++)d[v+-g]=255-c(m(v));else for(var h=e.minPixelValue;h<=s;h++)d[h+-g]=c(m(h));return d};var a=r(19),i=n(a),o=r(35),l=n(o)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return(0,a.default)(e)};var n=r(17),a=function(e){return e&&e.__esModule?e:{default:e}}(n)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(38),i=r(22),o=n(i),l=r(21),u=n(l),d={createProgramFromString:o.default,renderer:{render:a.render,initRenderer:a.initRenderer,getRenderCanvas:a.getRenderCanvas,isWebGLAvailable:a.isWebGLAvailable},textureCache:u.default};Object.defineProperty(d,"isWebGLInitialized",{enumerable:!0,configurable:!1,get:function(){return a.isWebGLInitialized}}),t.default=d},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(){n(this,e),this.listeners={}}return a(e,[{key:"addEventListener",value:function(e,t){e in this.listeners||(this.listeners[e]=[]),this.listeners[e].push(t)}},{key:"removeEventListener",value:function(e,t){if(e in this.listeners)for(var r=this.listeners[e],n=0,a=r.length;n<a;n++)if(r[n]===t)return void r.splice(n,1)}},{key:"dispatchEvent",value:function(e){if(!(e.type in this.listeners))return!0;for(var t=this.listeners[e.type],r=0,n=t.length;r<n;r++)t[r].call(this,e);return!e.defaultPrevented}}]),e}(),o=new i;t.default=o},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r=e.renderingTools.grayscaleRenderCanvas;r.width=t.width,r.height=t.height;var n=r.getContext("2d");n.fillStyle="white",n.fillRect(0,0,r.width,r.height);var a=n.getImageData(0,0,t.width,t.height);e.renderingTools.grayscaleRenderCanvasContext=n,e.renderingTools.grayscaleRenderCanvasData=a}function i(e,t){return!e&&!t||!(!e||!t)&&e.id===t.id}function o(e,t,r){return void 0!==e.cachedLut&&e.cachedLut.windowCenter===t.voi.windowCenter&&e.cachedLut.windowWidth===t.voi.windowWidth&&i(e.cachedLut.modalityLUT,t.modalityLUT)&&i(e.cachedLut.voiLUT,t.voiLUT)&&e.cachedLut.invert===t.invert&&!0!==r?e.cachedLut.lutArray:((0,m.default)(e,t.voi.windowWidth,t.voi.windowCenter,t.invert,t.modalityLUT,t.voiLUT),e.cachedLut.windowWidth=t.voi.windowWidth,e.cachedLut.windowCenter=t.voi.windowCenter,e.cachedLut.invert=t.invert,e.cachedLut.voiLUT=t.voiLUT,e.cachedLut.modalityLUT=t.modalityLUT,e.cachedLut.lutArray)}function l(e,t){var r=e.renderingTools.lastRenderedImageId,n=e.renderingTools.lastRenderedViewport;return t.imageId!==r||!n||n.windowCenter!==e.viewport.voi.windowCenter||n.windowWidth!==e.viewport.voi.windowWidth||n.invert!==e.viewport.invert||n.rotation!==e.viewport.rotation||n.hflip!==e.viewport.hflip||n.vflip!==e.viewport.vflip||n.modalityLUT!==e.viewport.modalityLUT||n.voiLUT!==e.viewport.voiLUT}function u(e,t,r){e.renderingTools.grayscaleRenderCanvas||(e.renderingTools.grayscaleRenderCanvas=document.createElement("canvas"));var n=e.renderingTools.grayscaleRenderCanvas;if(!1===l(e,t)&&!0!==r)return n;n.width===t.width&&n.height===t.height||a(e,t);var i=(0,w.default)(),u=o(t,e.viewport,r);t.stats=t.stats||{},t.stats.lastLutGenerateTime=(0,w.default)()-i;var d=e.renderingTools.grayscaleRenderCanvasData,s=e.renderingTools.grayscaleRenderCanvasContext;return(0,g.default)(t,u,d.data),i=(0,w.default)(),s.putImageData(d,0,0),t.stats.lastPutImageDataTime=(0,w.default)()-i,n}function d(e,t){if(void 0===e)throw new Error("drawImage: enabledElement parameter must not be undefined");var r=e.image;if(void 0===r)throw new Error("drawImage: image must be loaded before it can be drawn");var n=e.canvas.getContext("2d");n.setTransform(1,0,0,1,0,0),n.fillStyle="black",n.fillRect(0,0,e.canvas.width,e.canvas.height),!0===e.viewport.pixelReplication?(n.imageSmoothingEnabled=!1,n.mozImageSmoothingEnabled=!1):(n.imageSmoothingEnabled=!0,n.mozImageSmoothingEnabled=!0),(0,h.default)(e,n),e.renderingTools||(e.renderingTools={});var a=void 0;a=e.options&&e.options.renderer&&"webgl"===e.options.renderer.toLowerCase()?y.default.renderer.render(e):u(e,r,t),n.drawImage(a,0,0,r.width,r.height,0,0,r.width,r.height),e.renderingTools.lastRenderedImageId=r.imageId;var i={};i.windowCenter=e.viewport.voi.windowCenter,i.windowWidth=e.viewport.voi.windowWidth,i.invert=e.viewport.invert,i.rotation=e.viewport.rotation,i.hflip=e.viewport.hflip,i.vflip=e.viewport.vflip,i.modalityLUT=e.viewport.modalityLUT,i.voiLUT=e.viewport.voiLUT,e.renderingTools.lastRenderedViewport=i}function s(e,t){if(void 0===e)throw new Error("addGrayscaleLayer: layer parameter must not be undefined");var r=e.image;if(void 0===r)throw new Error("addGrayscaleLayer: image must be loaded before it can be drawn");e.renderingTools=e.renderingTools||{},e.canvas=u(e,r,t);var n=e.canvas.getContext("2d");!0===e.viewport.pixelReplication?(n.imageSmoothingEnabled=!1,n.mozImageSmoothingEnabled=!1):(n.imageSmoothingEnabled=!0,n.mozImageSmoothingEnabled=!0);var a={windowCenter:e.viewport.voi.windowCenter,windowWidth:e.viewport.voi.windowWidth,invert:e.viewport.invert,rotation:e.viewport.rotation,hflip:e.viewport.hflip,vflip:e.viewport.vflip};e.renderingTools.lastRenderedImageId=r.imageId,e.renderingTools.lastRenderedViewport=a}Object.defineProperty(t,"__esModule",{value:!0}),t.renderGrayscaleImage=d,t.addGrayscaleLayer=s;var f=r(9),m=n(f),c=r(15),g=n(c),v=r(8),h=n(v),p=r(6),w=n(p),b=r(11),y=n(b)},function(e,t,r){"use strict";function n(e){window.setTimeout(e,1e3/60)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return window.requestAnimationFrame(e)||window.webkitRequestAnimationFrame(e)||window.mozRequestAnimationFrame(e)||window.oRequestAnimationFrame(e)||window.msRequestAnimationFrame(e)||n(e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){var n=(0,a.default)(),i=e.getPixelData();e.stats.lastGetPixelDataTime=(0,a.default)()-n;var o=i.length,l=e.minPixelValue,u=3,d=0;if(n=(0,a.default)(),i instanceof Int16Array)if(l<0)for(;d<o;)r[u]=t[i[d++]+-l],u+=4;else for(;d<o;)r[u]=t[i[d++]],u+=4;else if(i instanceof Uint16Array)for(;d<o;)r[u]=t[i[d++]],u+=4;else if(l<0)for(;d<o;)r[u]=t[i[d++]+-l],u+=4;else for(;d<o;)r[u]=t[i[d++]],u+=4;e.stats.lastStoredPixelDataToCanvasImageDataTime=(0,a.default)()-n};var n=r(6),a=function(e){return e&&e.__esModule?e:{default:e}}(n)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){var n=(0,a.default)(),i=e.getPixelData();e.stats.lastGetPixelDataTime=(0,a.default)()-n;var o=e.minPixelValue,l=0,u=0,d=i.length;if(n=(0,a.default)(),o<0)for(;u<d;)r[l++]=t[i[u++]+-o],r[l++]=t[i[u++]+-o],r[l]=t[i[u]+-o],u+=2,l+=2;else for(;u<d;)r[l++]=t[i[u++]],r[l++]=t[i[u++]],r[l]=t[i[u]],u+=2,l+=2;e.stats.lastStoredPixelDataToCanvasImageDataTime=(0,a.default)()-n};var n=r(6),a=function(e){return e&&e.__esModule?e:{default:e}}(n)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=new n.Transform;r.translate(e.canvas.width/2,e.canvas.height/2);var a=e.viewport.rotation;0!==a&&r.rotate(a*Math.PI/180);var i=e.viewport.scale,o=e.viewport.scale;return e.image.rowPixelSpacing<e.image.columnPixelSpacing?i*=e.image.columnPixelSpacing/e.image.rowPixelSpacing:e.image.columnPixelSpacing<e.image.rowPixelSpacing&&(o*=e.image.rowPixelSpacing/e.image.columnPixelSpacing),r.scale(i,o),0!==a&&r.rotate(-a*Math.PI/180),r.translate(e.viewport.translation.x,e.viewport.translation.y),0!==a&&r.rotate(a*Math.PI/180),void 0!==t&&r.scale(t,t),e.viewport.hflip&&r.scale(-1,1),e.viewport.vflip&&r.scale(1,-1),r.translate(-e.image.width/2,-e.image.height/2),r};var n=r(20)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r){var n=t.element,a={viewport:t.viewport,element:t.element,image:t.image,enabledElement:t,layerId:r};c.external.$(n).trigger(e,a),(0,x.default)(n,e,a)}function i(e,t){var r=e.image,n=t.image;if(r.imageId&&n.imageId){var a=w.default.get("imagePlane",r.imageId),i=w.default.get("imagePlane",n.imageId);if(a&&a.columnPixelSpacing&&i&&i.columnPixelSpacing){var o=i.columnPixelSpacing*n.width/(a.columnPixelSpacing*r.width),l=t.viewport.scale/e.viewport.scale*o;t.viewport.scale=e.viewport.scale*l}}}function o(e,t,r){var n=(0,v.default)(),o=(0,h.getEnabledElement)(e),l=o.layers,u=(0,y.default)(o.canvas,t);r&&r.viewport&&(u=Object.assign(u,r.viewport)),!1!==o.syncViewports&&(o.syncViewports=!0);var d={image:t,layerId:n,viewport:u,options:r||{}};return l.length&&i(l[0],d),l.push(d),1===l.length&&f(e,n),a("CornerstoneLayerAdded",o,n),n}function l(e,t){var r=(0,h.getEnabledElement)(e),n=r.layers,i=r.layers.findIndex(function(e){return e.layerId===t});-1!==i&&(n.splice(i,1),t===r.activeLayerId&&n.length&&f(e,n[0].layerId),a("CornerstoneLayerRemoved",r,t))}function u(e,t){return(0,h.getEnabledElement)(e).layers.find(function(e){return e.layerId===t})}function d(e){return(0,h.getEnabledElement)(e).layers}function s(e){return(0,h.getEnabledElement)(e).layers.filter(function(e){return e.options&&!1!==e.options.visible&&0!==e.options.opacity})}function f(e,t){var r=(0,h.getEnabledElement)(e);if(r.activeLayerId!==t){var n=r.layers.findIndex(function(e){return e.layerId===t});if(-1===n)throw new Error("setActiveLayer: layer not found in layers array");var i=r.layers[n];r.activeLayerId=t,r.image=i.image,r.viewport=i.viewport,(0,C.default)(e),a("CornerstoneActiveLayerChanged",r,t)}}function m(e){var t=(0,h.getEnabledElement)(e);return t.layers.find(function(e){return e.layerId===t.activeLayerId})}Object.defineProperty(t,"__esModule",{value:!0}),t.addLayer=o,t.removeLayer=l,t.getLayer=u,t.getLayers=d,t.getVisibleLayers=s,t.setActiveLayer=f,t.getActiveLayer=m;var c=r(1),g=r(49),v=n(g),h=r(0),p=r(24),w=n(p),b=r(5),y=n(b),I=r(3),C=n(I),_=r(2),x=n(_)},function(e,t,r){"use strict";function n(e,t){var r=e,n=t;return function(e){return e*r+n}}function a(e){var t=e.lut[0],r=e.lut[e.lut.length-1],n=e.firstValueMapped+e.lut.length;return function(a){return a<e.firstValueMapped?t:a>=n?r:e.lut[a]}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){return r?a(r):n(e,t)}},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();t.Transform=function(){function e(){n(this,e),this.reset()}return a(e,[{key:"reset",value:function(){this.m=[1,0,0,1,0,0]}},{key:"clone",value:function(){var t=new e;return t.m[0]=this.m[0],t.m[1]=this.m[1],t.m[2]=this.m[2],t.m[3]=this.m[3],t.m[4]=this.m[4],t.m[5]=this.m[5],t}},{key:"multiply",value:function(e){var t=this.m[0]*e.m[0]+this.m[2]*e.m[1],r=this.m[1]*e.m[0]+this.m[3]*e.m[1],n=this.m[0]*e.m[2]+this.m[2]*e.m[3],a=this.m[1]*e.m[2]+this.m[3]*e.m[3],i=this.m[0]*e.m[4]+this.m[2]*e.m[5]+this.m[4],o=this.m[1]*e.m[4]+this.m[3]*e.m[5]+this.m[5];this.m[0]=t,this.m[1]=r,this.m[2]=n,this.m[3]=a,this.m[4]=i,this.m[5]=o}},{key:"invert",value:function(){var e=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),t=this.m[3]*e,r=-this.m[1]*e,n=-this.m[2]*e,a=this.m[0]*e,i=e*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),o=e*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);this.m[0]=t,this.m[1]=r,this.m[2]=n,this.m[3]=a,this.m[4]=i,this.m[5]=o}},{key:"rotate",value:function(e){var t=Math.cos(e),r=Math.sin(e),n=this.m[0]*t+this.m[2]*r,a=this.m[1]*t+this.m[3]*r,i=this.m[0]*-r+this.m[2]*t,o=this.m[1]*-r+this.m[3]*t;this.m[0]=n,this.m[1]=a,this.m[2]=i,this.m[3]=o}},{key:"translate",value:function(e,t){this.m[4]+=this.m[0]*e+this.m[2]*t,this.m[5]+=this.m[1]*e+this.m[3]*t}},{key:"scale",value:function(e,t){this.m[0]*=e,this.m[1]*=e,this.m[2]*=t,this.m[3]*=t}},{key:"transformPoint",value:function(e,t){var r=e,n=t;return e=r*this.m[0]+n*this.m[2]+this.m[4],t=r*this.m[1]+n*this.m[3]+this.m[5],{x:e,y:t}}}]),e}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(){return{maximumSizeInBytes:w,cacheSizeInBytes:b,numberOfImagesCached:p.length}}function i(){function e(e,t){return e.timeStamp>t.timeStamp?-1:e.timeStamp<t.timeStamp?1:0}if(!(b<=w)){for(p.sort(e);b>w;){var t=p[p.length-1];b-=t.sizeInBytes,delete h[t.imageId],p.pop(),f.external.$(c.default).trigger("CornerstoneWebGLTextureRemoved",{imageId:t.imageId}),(0,v.default)(c.default,"CornerstoneWebGLTextureRemoved",{imageId:t.imageId})}var r=a();f.external.$(c.default).trigger("CornerstoneWebGLTextureCacheFull",r),(0,v.default)(c.default,"CornerstoneWebGLTextureCacheFull",r)}}function o(e){if(void 0===e)throw new Error("setMaximumSizeBytes: parameter numBytes must not be undefined");if(void 0===e.toFixed)throw new Error("setMaximumSizeBytes: parameter numBytes must be a number");w=e,i()}function l(e,t){var r=e.imageId;if(void 0===e)throw new Error("putImageTexture: image must not be undefined");if(void 0===r)throw new Error("putImageTexture: imageId must not be undefined");if(void 0===t)throw new Error("putImageTexture: imageTexture must not be undefined");if(!0===Object.prototype.hasOwnProperty.call(h,r))throw new Error("putImageTexture: imageId already in cache");var n={imageId:r,imageTexture:t,timeStamp:new Date,sizeInBytes:t.sizeInBytes};if(h[r]=n,p.push(n),void 0===t.sizeInBytes)throw new Error("putImageTexture: imageTexture.sizeInBytes must not be undefined");if(void 0===t.sizeInBytes.toFixed)throw new Error("putImageTexture: imageTexture.sizeInBytes is not a number");b+=n.sizeInBytes,i()}function u(e){if(void 0===e)throw new Error("getImageTexture: imageId must not be undefined");var t=h[e];if(void 0!==t)return t.timeStamp=new Date,t.imageTexture}function d(e){if(void 0===e)throw new Error("removeImageTexture: imageId must not be undefined");var t=h[e];if(void 0===t)throw new Error("removeImageTexture: imageId must not be undefined");return p.splice(p.indexOf(t),1),b-=t.sizeInBytes,delete h[e],t.imageTexture}function s(){for(;p.length>0;){var e=p.pop();delete h[e.imageId]}b=0}Object.defineProperty(t,"__esModule",{value:!0});var f=r(1),m=r(12),c=n(m),g=r(2),v=n(g),h={},p=[],w=268435456,b=0;t.default={purgeCache:s,getImageTexture:u,putImageTexture:l,removeImageTexture:d,setMaximumSizeBytes:o}},function(e,t,r){"use strict";function n(e,t,r){var n=e.createShader(r);if(e.shaderSource(n,t),e.compileShader(n),!e.getShaderParameter(n,e.COMPILE_STATUS)&&!e.isContextLost()){var a=e.getShaderInfoLog(n);console.error("Could not compile shader:\n"+a)}return n}function a(e,t,r){var n=e.createProgram();if(e.attachShader(n,t),e.attachShader(n,r),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS)&&!e.isContextLost()){var a=e.getProgramInfoLog(n);console.error("WebGL program filed to link:\n"+a)}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){return a(e,n(e,t,e.VERTEX_SHADER),n(e,r,e.FRAGMENT_SHADER))}},function(e,t,r){"use strict";function n(e,t){if(void 0===e)throw new Error("drawImage: enabledElement parameter must not be undefined");var r=e.image;if(void 0===r)throw new Error("drawImage: image must be loaded before it can be drawn");var n=e.canvas.getContext("2d");n.setTransform(1,0,0,1,0,0),n.fillStyle="black",n.fillRect(0,0,e.canvas.width,e.canvas.height),!0===e.viewport.pixelReplication?(n.imageSmoothingEnabled=!1,n.mozImageSmoothingEnabled=!1):(n.imageSmoothingEnabled=!0,n.mozImageSmoothingEnabled=!0),(0,i.default)(e,n),e.viewport.voi.windowWidth===e.image.windowWidth&&e.viewport.voi.windowCenter===e.image.windowCenter&&!1===e.viewport.invert?n.drawImage(r.getImage(),0,0,r.width,r.height,0,0,r.width,r.height):(0,o.renderColorImage)(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.renderWebImage=n;var a=r(8),i=function(e){return e&&e.__esModule?e:{default:e}}(a),o=r(7)},function(e,t,r){"use strict";function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=void 0;for(r=0;r<o.length&&!(o[r].priority<=t);r++);o.splice(r,0,{priority:t,provider:e})}function a(e){for(var t=0;t<o.length;t++)if(o[t].provider===e){o.splice(t,1);break}}function i(e,t){for(var r=0;r<o.length;r++){var n=o[r].provider(e,t);if(void 0!==n)return n}}Object.defineProperty(t,"__esModule",{value:!0}),t.addProvider=n,t.removeProvider=a;var o=[];t.default={addProvider:n,removeProvider:a,get:i}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){t.width!==e.clientWidth&&(t.width=e.clientWidth,t.style.width=e.clientWidth+"px"),t.height!==e.clientHeight&&(t.height=e.clientHeight,t.style.height=e.clientHeight+"px")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=(0,o.getEnabledElement)(e);a(e,r.canvas);var n={element:e};i.external.$(e).trigger("CornerstoneElementResized",n),(0,m.default)(e,"CornerstoneElementResized",n),void 0!==r.image&&(!0===t?(0,u.default)(e):(0,s.default)(e))};var i=r(1),o=r(0),l=r(26),u=n(l),d=r(3),s=n(d),f=r(2),m=n(f)},function(e,t,r){"use strict";function n(e){return 0===e.viewport.rotation||180===e.viewport.rotation?{width:e.image.width,height:e.image.height}:{width:e.image.height,height:e.image.width}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,a.getEnabledElement)(e),r=n(t),i=t.canvas.height/r.height,l=t.canvas.width/r.width;t.viewport.scale=Math.min(l,i),t.viewport.translation.x=0,t.viewport.translation.y=0,(0,o.default)(e)};var a=r(0),i=r(3),o=function(e){return e&&e.__esModule?e:{default:e}}(i)},function(e,t,r){"use strict";function n(e){for(var t=Number.MAX_VALUE,r=Number.MIN_VALUE,n=e.length,a=void 0,i=0;i<n;i++)a=e[i],t=t<a?t:a,r=r>a?r:a;return{minPixelValue:t,maxPixelValue:r}}function a(e){if(e.restore)return e.restore;var t=e.color,r=e.rgba,n=e.cachedLut,a=e.slope,i=e.windowWidth,o=e.windowCenter,l=e.minPixelValue,u=e.maxPixelValue;return function(){if(e.color=t,e.rgba=r,e.cachedLut=n,e.slope=a,e.windowWidth=i,e.windowCenter=o,e.minPixelValue=l,e.maxPixelValue=u,e.origPixelData){var d=e.origPixelData;e.getPixelData=function(){return d}}e.origPixelData=void 0,e.colormapId=void 0,e.falseColor=void 0}}function i(e){return e&&"string"==typeof e&&(e=(0,m.getColormap)(e)),e}function o(e){return!(!e.restore||"function"!=typeof e.restore)&&(e.restore(),!0)}function l(e,t){if(e.color&&!e.falseColor)throw new Error("Color transforms are not implemented yet");t=i(t);var r=t.getId();if(e.colormapId===r)return!1;if(o(e),r){var l=e.minPixelValue||0,u=e.maxPixelValue||255;e.restore=a(e);var d=t.createLookupTable();d.setTableRange(l,u),(0,f.default)(e,d);var s=n(e.getPixelData());e.minPixelValue=s.minPixelValue,e.maxPixelValue=s.maxPixelValue,e.windowWidth=255,e.windowCenter=128,e.colormapId=r}return!0}function u(e,t){return l((0,d.getEnabledElement)(e).image,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.restoreImage=t.convertToFalseColorImage=t.convertImageToFalseColorImage=void 0;var d=r(0),s=r(28),f=function(e){return e&&e.__esModule?e:{default:e}}(s),m=r(30);t.convertImageToFalseColorImage=l,t.convertToFalseColorImage=u,t.restoreImage=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(e.color&&!e.falseColor)throw new Error("Color transforms are not implemented yet");var r=e.minPixelValue,n=0,i=0,o=e.width*e.height,l=e.origPixelData||e.getPixelData(),u=new Uint8Array(4*o),d=t,s=void 0,f=void 0;if(e.color=!0,e.falseColor=!0,e.origPixelData=l,t instanceof a.default.LookupTable)for(t.build();i<o;)s=l[i++],f=t.mapValue(s),u[n++]=f[0],u[n++]=f[1],u[n++]=f[2],u[n++]=f[3];else if(r<0)for(;i<o;)s=l[i++],u[n++]=d[s+-r][0],u[n++]=d[s+-r][1],u[n++]=d[s+-r][2],u[n++]=d[s+-r][3];else for(;i<o;)s=l[i++],u[n++]=d[s][0],u[n++]=d[s][1],u[n++]=d[s][2],u[n++]=d[s][3];e.rgba=!0,e.cachedLut=void 0,e.render=void 0,e.slope=1,e.intercept=0,e.minPixelValue=0,e.maxPixelValue=255,e.windowWidth=255,e.windowCenter=128,e.getPixelData=function(){return u}};var n=r(29),a=function(e){return e&&e.__esModule?e:{default:e}}(n)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(30),a=r(31),i=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default={getColormap:n.getColormap,getColormapsList:n.getColormapsList,LookupTable:i.default}},function(e,t,r){"use strict";function n(e,t,r){r=null===r?100:r;for(var n=(t-e)/(r-1),a=[];r-- >0;)a.push(e),e+=n;return a[a.length-1]=t,a}function a(e,t){for(var r=0,n=e.length-1;r<=n;){var a=r+Math.floor((n-r)/2),i=e[a];if(i===t)return a;t<i?n=a-1:r=a+1}return r}function i(e,t){var r=void 0,n=[],i=t.length;for(e.sort(function(e,t){return e-t}),r=0;r<i;r++)n[r]=a(e,t[r]);return n}function o(e,t,r){var a=void 0,o=[],l=[],u=[],d=[];for(r=null===r?1:r,a=0;a<t.length;a++){var s=t[a];o.push((e-1)*s[0]),l.push(s[1]),u.push(s[1])}var f=n(0,1,e);for(a=0;a<e;a++)f[a]=(e-1)*Math.pow(f[a],r);var m=i(o,f);for(a=1;a<e-1;a++){var c=m[a],g=(f[a]-o[c-1])/(o[c]-o[c-1]),v=l[c]-u[c-1];d[a]=g*v+u[c-1]}return d[0]=u[0],d[e-1]=l[t.length-1],d}function l(e,t,r){var n=void 0,a=[];t=null===t?256:t,r=null===r?1:r;var i=o(t,e.red,r),l=o(t,e.green,r),u=o(t,e.blue,r);for(n=0;n<t;n++){var d=Math.round(255*i[n]),s=Math.round(255*l[n]),f=Math.round(255*u[n]),m=[d,s,f,255];a.push(m)}return a}function u(){var e=[];return Object.keys(c).forEach(function(t){if(c.hasOwnProperty(t)){var r=c[t];e.push({id:t,name:r.name})}}),e.sort(function(e,t){var r=e.name.toLowerCase(),n=t.name.toLowerCase();return r===n?0:r<n?-1:1}),e}function d(e,t){var r=c[e];return r||(r=c[e]=t||{name:"",colors:[]}),!r.colors&&r.segmentedData&&(r.colors=l(r.segmentedData,r.numColors,r.gamma)),{getId:function(){return e},getColorSchemeName:function(){return r.name},setColorSchemeName:function(e){r.name=e},getNumberOfColors:function(){return r.colors.length},setNumberOfColors:function(e){for(;r.colors.length<e;)r.colors.push(m);r.colors.length=e},getColor:function(e){return this.isValidIndex(e)?r.colors[e]:m},getColorRepeating:function(e){var t=r.colors.length;return e=t?e%t:0,this.getColor(e)},setColor:function(e,t){this.isValidIndex(e)&&(r.colors[e]=t)},addColor:function(e){r.colors.push(e)},insertColor:function(e,t){this.isValidIndex(e)&&r.colors.splice(e,1,t)},removeColor:function(e){this.isValidIndex(e)&&r.colors.splice(e,1)},clearColors:function(){r.colors=[]},buildLookupTable:function(e){if(e){var t=void 0,n=r.colors.length;for(e.setNumberOfTableValues(n),t=0;t<n;t++)e.setTableValue(t,r.colors[t])}},createLookupTable:function(){var e=new f.default;return this.buildLookupTable(e),e},isValidIndex:function(e){return e>=0&&e<r.colors.length}}}Object.defineProperty(t,"__esModule",{value:!0}),t.getColormapsList=u,t.getColormap=d;var s=r(31),f=function(e){return e&&e.__esModule?e:{default:e}}(s),m=[0,0,0,255],c={hotIron:{name:"Hot Iron",numOfColors:256,colors:[[0,0,0,255],[2,0,0,255],[4,0,0,255],[6,0,0,255],[8,0,0,255],[10,0,0,255],[12,0,0,255],[14,0,0,255],[16,0,0,255],[18,0,0,255],[20,0,0,255],[22,0,0,255],[24,0,0,255],[26,0,0,255],[28,0,0,255],[30,0,0,255],[32,0,0,255],[34,0,0,255],[36,0,0,255],[38,0,0,255],[40,0,0,255],[42,0,0,255],[44,0,0,255],[46,0,0,255],[48,0,0,255],[50,0,0,255],[52,0,0,255],[54,0,0,255],[56,0,0,255],[58,0,0,255],[60,0,0,255],[62,0,0,255],[64,0,0,255],[66,0,0,255],[68,0,0,255],[70,0,0,255],[72,0,0,255],[74,0,0,255],[76,0,0,255],[78,0,0,255],[80,0,0,255],[82,0,0,255],[84,0,0,255],[86,0,0,255],[88,0,0,255],[90,0,0,255],[92,0,0,255],[94,0,0,255],[96,0,0,255],[98,0,0,255],[100,0,0,255],[102,0,0,255],[104,0,0,255],[106,0,0,255],[108,0,0,255],[110,0,0,255],[112,0,0,255],[114,0,0,255],[116,0,0,255],[118,0,0,255],[120,0,0,255],[122,0,0,255],[124,0,0,255],[126,0,0,255],[128,0,0,255],[130,0,0,255],[132,0,0,255],[134,0,0,255],[136,0,0,255],[138,0,0,255],[140,0,0,255],[142,0,0,255],[144,0,0,255],[146,0,0,255],[148,0,0,255],[150,0,0,255],[152,0,0,255],[154,0,0,255],[156,0,0,255],[158,0,0,255],[160,0,0,255],[162,0,0,255],[164,0,0,255],[166,0,0,255],[168,0,0,255],[170,0,0,255],[172,0,0,255],[174,0,0,255],[176,0,0,255],[178,0,0,255],[180,0,0,255],[182,0,0,255],[184,0,0,255],[186,0,0,255],[188,0,0,255],[190,0,0,255],[192,0,0,255],[194,0,0,255],[196,0,0,255],[198,0,0,255],[200,0,0,255],[202,0,0,255],[204,0,0,255],[206,0,0,255],[208,0,0,255],[210,0,0,255],[212,0,0,255],[214,0,0,255],[216,0,0,255],[218,0,0,255],[220,0,0,255],[222,0,0,255],[224,0,0,255],[226,0,0,255],[228,0,0,255],[230,0,0,255],[232,0,0,255],[234,0,0,255],[236,0,0,255],[238,0,0,255],[240,0,0,255],[242,0,0,255],[244,0,0,255],[246,0,0,255],[248,0,0,255],[250,0,0,255],[252,0,0,255],[254,0,0,255],[255,0,0,255],[255,2,0,255],[255,4,0,255],[255,6,0,255],[255,8,0,255],[255,10,0,255],[255,12,0,255],[255,14,0,255],[255,16,0,255],[255,18,0,255],[255,20,0,255],[255,22,0,255],[255,24,0,255],[255,26,0,255],[255,28,0,255],[255,30,0,255],[255,32,0,255],[255,34,0,255],[255,36,0,255],[255,38,0,255],[255,40,0,255],[255,42,0,255],[255,44,0,255],[255,46,0,255],[255,48,0,255],[255,50,0,255],[255,52,0,255],[255,54,0,255],[255,56,0,255],[255,58,0,255],[255,60,0,255],[255,62,0,255],[255,64,0,255],[255,66,0,255],[255,68,0,255],[255,70,0,255],[255,72,0,255],[255,74,0,255],[255,76,0,255],[255,78,0,255],[255,80,0,255],[255,82,0,255],[255,84,0,255],[255,86,0,255],[255,88,0,255],[255,90,0,255],[255,92,0,255],[255,94,0,255],[255,96,0,255],[255,98,0,255],[255,100,0,255],[255,102,0,255],[255,104,0,255],[255,106,0,255],[255,108,0,255],[255,110,0,255],[255,112,0,255],[255,114,0,255],[255,116,0,255],[255,118,0,255],[255,120,0,255],[255,122,0,255],[255,124,0,255],[255,126,0,255],[255,128,4,255],[255,130,8,255],[255,132,12,255],[255,134,16,255],[255,136,20,255],[255,138,24,255],[255,140,28,255],[255,142,32,255],[255,144,36,255],[255,146,40,255],[255,148,44,255],[255,150,48,255],[255,152,52,255],[255,154,56,255],[255,156,60,255],[255,158,64,255],[255,160,68,255],[255,162,72,255],[255,164,76,255],[255,166,80,255],[255,168,84,255],[255,170,88,255],[255,172,92,255],[255,174,96,255],[255,176,100,255],[255,178,104,255],[255,180,108,255],[255,182,112,255],[255,184,116,255],[255,186,120,255],[255,188,124,255],[255,190,128,255],[255,192,132,255],[255,194,136,255],[255,196,140,255],[255,198,144,255],[255,200,148,255],[255,202,152,255],[255,204,156,255],[255,206,160,255],[255,208,164,255],[255,210,168,255],[255,212,172,255],[255,214,176,255],[255,216,180,255],[255,218,184,255],[255,220,188,255],[255,222,192,255],[255,224,196,255],[255,226,200,255],[255,228,204,255],[255,230,208,255],[255,232,212,255],[255,234,216,255],[255,236,220,255],[255,238,224,255],[255,240,228,255],[255,242,232,255],[255,244,236,255],[255,246,240,255],[255,248,244,255],[255,250,248,255],[255,252,252,255],[255,255,255,255]]},pet:{name:"PET",numColors:256,colors:[[0,0,0,255],[0,2,1,255],[0,4,3,255],[0,6,5,255],[0,8,7,255],[0,10,9,255],[0,12,11,255],[0,14,13,255],[0,16,15,255],[0,18,17,255],[0,20,19,255],[0,22,21,255],[0,24,23,255],[0,26,25,255],[0,28,27,255],[0,30,29,255],[0,32,31,255],[0,34,33,255],[0,36,35,255],[0,38,37,255],[0,40,39,255],[0,42,41,255],[0,44,43,255],[0,46,45,255],[0,48,47,255],[0,50,49,255],[0,52,51,255],[0,54,53,255],[0,56,55,255],[0,58,57,255],[0,60,59,255],[0,62,61,255],[0,65,63,255],[0,67,65,255],[0,69,67,255],[0,71,69,255],[0,73,71,255],[0,75,73,255],[0,77,75,255],[0,79,77,255],[0,81,79,255],[0,83,81,255],[0,85,83,255],[0,87,85,255],[0,89,87,255],[0,91,89,255],[0,93,91,255],[0,95,93,255],[0,97,95,255],[0,99,97,255],[0,101,99,255],[0,103,101,255],[0,105,103,255],[0,107,105,255],[0,109,107,255],[0,111,109,255],[0,113,111,255],[0,115,113,255],[0,117,115,255],[0,119,117,255],[0,121,119,255],[0,123,121,255],[0,125,123,255],[0,128,125,255],[1,126,127,255],[3,124,129,255],[5,122,131,255],[7,120,133,255],[9,118,135,255],[11,116,137,255],[13,114,139,255],[15,112,141,255],[17,110,143,255],[19,108,145,255],[21,106,147,255],[23,104,149,255],[25,102,151,255],[27,100,153,255],[29,98,155,255],[31,96,157,255],[33,94,159,255],[35,92,161,255],[37,90,163,255],[39,88,165,255],[41,86,167,255],[43,84,169,255],[45,82,171,255],[47,80,173,255],[49,78,175,255],[51,76,177,255],[53,74,179,255],[55,72,181,255],[57,70,183,255],[59,68,185,255],[61,66,187,255],[63,64,189,255],[65,63,191,255],[67,61,193,255],[69,59,195,255],[71,57,197,255],[73,55,199,255],[75,53,201,255],[77,51,203,255],[79,49,205,255],[81,47,207,255],[83,45,209,255],[85,43,211,255],[86,41,213,255],[88,39,215,255],[90,37,217,255],[92,35,219,255],[94,33,221,255],[96,31,223,255],[98,29,225,255],[100,27,227,255],[102,25,229,255],[104,23,231,255],[106,21,233,255],[108,19,235,255],[110,17,237,255],[112,15,239,255],[114,13,241,255],[116,11,243,255],[118,9,245,255],[120,7,247,255],[122,5,249,255],[124,3,251,255],[126,1,253,255],[128,0,255,255],[130,2,252,255],[132,4,248,255],[134,6,244,255],[136,8,240,255],[138,10,236,255],[140,12,232,255],[142,14,228,255],[144,16,224,255],[146,18,220,255],[148,20,216,255],[150,22,212,255],[152,24,208,255],[154,26,204,255],[156,28,200,255],[158,30,196,255],[160,32,192,255],[162,34,188,255],[164,36,184,255],[166,38,180,255],[168,40,176,255],[170,42,172,255],[171,44,168,255],[173,46,164,255],[175,48,160,255],[177,50,156,255],[179,52,152,255],[181,54,148,255],[183,56,144,255],[185,58,140,255],[187,60,136,255],[189,62,132,255],[191,64,128,255],[193,66,124,255],[195,68,120,255],[197,70,116,255],[199,72,112,255],[201,74,108,255],[203,76,104,255],[205,78,100,255],[207,80,96,255],[209,82,92,255],[211,84,88,255],[213,86,84,255],[215,88,80,255],[217,90,76,255],[219,92,72,255],[221,94,68,255],[223,96,64,255],[225,98,60,255],[227,100,56,255],[229,102,52,255],[231,104,48,255],[233,106,44,255],[235,108,40,255],[237,110,36,255],[239,112,32,255],[241,114,28,255],[243,116,24,255],[245,118,20,255],[247,120,16,255],[249,122,12,255],[251,124,8,255],[253,126,4,255],[255,128,0,255],[255,130,4,255],[255,132,8,255],[255,134,12,255],[255,136,16,255],[255,138,20,255],[255,140,24,255],[255,142,28,255],[255,144,32,255],[255,146,36,255],[255,148,40,255],[255,150,44,255],[255,152,48,255],[255,154,52,255],[255,156,56,255],[255,158,60,255],[255,160,64,255],[255,162,68,255],[255,164,72,255],[255,166,76,255],[255,168,80,255],[255,170,85,255],[255,172,89,255],[255,174,93,255],[255,176,97,255],[255,178,101,255],[255,180,105,255],[255,182,109,255],[255,184,113,255],[255,186,117,255],[255,188,121,255],[255,190,125,255],[255,192,129,255],[255,194,133,255],[255,196,137,255],[255,198,141,255],[255,200,145,255],[255,202,149,255],[255,204,153,255],[255,206,157,255],[255,208,161,255],[255,210,165,255],[255,212,170,255],[255,214,174,255],[255,216,178,255],[255,218,182,255],[255,220,186,255],[255,222,190,255],[255,224,194,255],[255,226,198,255],[255,228,202,255],[255,230,206,255],[255,232,210,255],[255,234,214,255],[255,236,218,255],[255,238,222,255],[255,240,226,255],[255,242,230,255],[255,244,234,255],[255,246,238,255],[255,248,242,255],[255,250,246,255],[255,252,250,255],[255,255,255,255]]},hotMetalBlue:{name:"Hot Metal Blue",numColors:256,colors:[[0,0,0,255],[0,0,2,255],[0,0,4,255],[0,0,6,255],[0,0,8,255],[0,0,10,255],[0,0,12,255],[0,0,14,255],[0,0,16,255],[0,0,17,255],[0,0,19,255],[0,0,21,255],[0,0,23,255],[0,0,25,255],[0,0,27,255],[0,0,29,255],[0,0,31,255],[0,0,33,255],[0,0,35,255],[0,0,37,255],[0,0,39,255],[0,0,41,255],[0,0,43,255],[0,0,45,255],[0,0,47,255],[0,0,49,255],[0,0,51,255],[0,0,53,255],[0,0,55,255],[0,0,57,255],[0,0,59,255],[0,0,61,255],[0,0,63,255],[0,0,65,255],[0,0,67,255],[0,0,69,255],[0,0,71,255],[0,0,73,255],[0,0,75,255],[0,0,77,255],[0,0,79,255],[0,0,81,255],[0,0,83,255],[0,0,84,255],[0,0,86,255],[0,0,88,255],[0,0,90,255],[0,0,92,255],[0,0,94,255],[0,0,96,255],[0,0,98,255],[0,0,100,255],[0,0,102,255],[0,0,104,255],[0,0,106,255],[0,0,108,255],[0,0,110,255],[0,0,112,255],[0,0,114,255],[0,0,116,255],[0,0,117,255],[0,0,119,255],[0,0,121,255],[0,0,123,255],[0,0,125,255],[0,0,127,255],[0,0,129,255],[0,0,131,255],[0,0,133,255],[0,0,135,255],[0,0,137,255],[0,0,139,255],[0,0,141,255],[0,0,143,255],[0,0,145,255],[0,0,147,255],[0,0,149,255],[0,0,151,255],[0,0,153,255],[0,0,155,255],[0,0,157,255],[0,0,159,255],[0,0,161,255],[0,0,163,255],[0,0,165,255],[0,0,167,255],[3,0,169,255],[6,0,171,255],[9,0,173,255],[12,0,175,255],[15,0,177,255],[18,0,179,255],[21,0,181,255],[24,0,183,255],[26,0,184,255],[29,0,186,255],[32,0,188,255],[35,0,190,255],[38,0,192,255],[41,0,194,255],[44,0,196,255],[47,0,198,255],[50,0,200,255],[52,0,197,255],[55,0,194,255],[57,0,191,255],[59,0,188,255],[62,0,185,255],[64,0,182,255],[66,0,179,255],[69,0,176,255],[71,0,174,255],[74,0,171,255],[76,0,168,255],[78,0,165,255],[81,0,162,255],[83,0,159,255],[85,0,156,255],[88,0,153,255],[90,0,150,255],[93,2,144,255],[96,4,138,255],[99,6,132,255],[102,8,126,255],[105,9,121,255],[108,11,115,255],[111,13,109,255],[114,15,103,255],[116,17,97,255],[119,19,91,255],[122,21,85,255],[125,23,79,255],[128,24,74,255],[131,26,68,255],[134,28,62,255],[137,30,56,255],[140,32,50,255],[143,34,47,255],[146,36,44,255],[149,38,41,255],[152,40,38,255],[155,41,35,255],[158,43,32,255],[161,45,29,255],[164,47,26,255],[166,49,24,255],[169,51,21,255],[172,53,18,255],[175,55,15,255],[178,56,12,255],[181,58,9,255],[184,60,6,255],[187,62,3,255],[190,64,0,255],[194,66,0,255],[198,68,0,255],[201,70,0,255],[205,72,0,255],[209,73,0,255],[213,75,0,255],[217,77,0,255],[221,79,0,255],[224,81,0,255],[228,83,0,255],[232,85,0,255],[236,87,0,255],[240,88,0,255],[244,90,0,255],[247,92,0,255],[251,94,0,255],[255,96,0,255],[255,98,3,255],[255,100,6,255],[255,102,9,255],[255,104,12,255],[255,105,15,255],[255,107,18,255],[255,109,21,255],[255,111,24,255],[255,113,26,255],[255,115,29,255],[255,117,32,255],[255,119,35,255],[255,120,38,255],[255,122,41,255],[255,124,44,255],[255,126,47,255],[255,128,50,255],[255,130,53,255],[255,132,56,255],[255,134,59,255],[255,136,62,255],[255,137,65,255],[255,139,68,255],[255,141,71,255],[255,143,74,255],[255,145,76,255],[255,147,79,255],[255,149,82,255],[255,151,85,255],[255,152,88,255],[255,154,91,255],[255,156,94,255],[255,158,97,255],[255,160,100,255],[255,162,103,255],[255,164,106,255],[255,166,109,255],[255,168,112,255],[255,169,115,255],[255,171,118,255],[255,173,121,255],[255,175,124,255],[255,177,126,255],[255,179,129,255],[255,181,132,255],[255,183,135,255],[255,184,138,255],[255,186,141,255],[255,188,144,255],[255,190,147,255],[255,192,150,255],[255,194,153,255],[255,196,156,255],[255,198,159,255],[255,200,162,255],[255,201,165,255],[255,203,168,255],[255,205,171,255],[255,207,174,255],[255,209,176,255],[255,211,179,255],[255,213,182,255],[255,215,185,255],[255,216,188,255],[255,218,191,255],[255,220,194,255],[255,222,197,255],[255,224,200,255],[255,226,203,255],[255,228,206,255],[255,229,210,255],[255,231,213,255],[255,233,216,255],[255,235,219,255],[255,237,223,255],[255,239,226,255],[255,240,229,255],[255,242,232,255],[255,244,236,255],[255,246,239,255],[255,248,242,255],[255,250,245,255],[255,251,249,255],[255,253,252,255],[255,255,255,255]]},pet20Step:{name:"PET 20 Step",numColors:256,colors:[[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[96,0,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,80,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[48,48,112,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[80,80,128,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[96,96,176,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[112,112,192,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[128,128,224,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,96,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[48,144,48,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[80,192,80,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[64,224,64,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[224,224,80,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,208,96,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,176,64,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[208,144,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[192,96,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[176,48,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,0,0,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]]},gray:{name:"Gray",numColors:256,gamma:1,segmentedData:{red:[[0,0,0],[1,1,1]],green:[[0,0,0],[1,1,1]],blue:[[0,0,0],[1,1,1]]}},jet:{name:"Jet",numColors:256,gamma:1,segmentedData:{red:[[0,0,0],[.35,0,0],[.66,1,1],[.89,1,1],[1,.5,.5]],green:[[0,0,0],[.125,0,0],[.375,1,1],[.64,1,1],[.91,0,0],[1,0,0]],blue:[[0,.5,.5],[.11,1,1],[.34,1,1],[.65,0,0],[1,0,0]]}},hsv:{name:"HSV",numColors:256,gamma:1,segmentedData:{red:[[0,1,1],[.15873,1,1],[.174603,.96875,.96875],[.333333,.03125,.03125],[.349206,0,0],[.666667,0,0],[.68254,.03125,.03125],[.84127,.96875,.96875],[.857143,1,1],[1,1,1]],green:[[0,0,0],[.15873,.9375,.9375],[.174603,1,1],[.507937,1,1],[.666667,.0625,.0625],[.68254,0,0],[1,0,0]],blue:[[0,0,0],[.333333,0,0],[.349206,.0625,.0625],[.507937,1,1],[.84127,1,1],[.857143,.9375,.9375],[1,.09375,.09375]]}},hot:{name:"Hot",numColors:256,gamma:1,segmentedData:{red:[[0,.0416,.0416],[.365079,1,1],[1,1,1]],green:[[0,0,0],[.365079,0,0],[.746032,1,1],[1,1,1]],blue:[[0,0,0],[.746032,0,0],[1,1,1]]}},cool:{name:"Cool",numColors:256,gamma:1,segmentedData:{red:[[0,0,0],[1,1,1]],green:[[0,1,1],[1,0,0]],blue:[[0,1,1],[1,1,1]]}},spring:{name:"Spring",numColors:256,gamma:1,segmentedData:{red:[[0,1,1],[1,1,1]],green:[[0,0,0],[1,1,1]],blue:[[0,1,1],[1,0,0]]}},summer:{name:"Summer",numColors:256,gamma:1,segmentedData:{red:[[0,0,0],[1,1,1]],green:[[0,.5,.5],[1,1,1]],blue:[[0,.4,.4],[1,.4,.4]]}},autumn:{name:"Autumn",numColors:256,gamma:1,segmentedData:{red:[[0,1,1],[1,1,1]],green:[[0,0,0],[1,1,1]],blue:[[0,0,0],[1,0,0]]}},winter:{name:"Winter",numColors:256,gamma:1,segmentedData:{red:[[0,0,0],[1,0,0]],green:[[0,0,0],[1,1,1]],blue:[[0,1,1],[1,.5,.5]]}},bone:{name:"Bone",numColors:256,gamma:1,segmentedData:{red:[[0,0,0],[.746032,.652778,.652778],[1,1,1]],green:[[0,0,0],[.365079,.319444,.319444],[.746032,.777778,.777778],[1,1,1]],blue:[[0,0,0],[.365079,.444444,.444444],[1,1,1]]}},copper:{name:"Copper",numColors:256,gamma:1,segmentedData:{red:[[0,0,0],[.809524,1,1],[1,1,1]],green:[[0,0,0],[1,.7812,.7812]],blue:[[0,0,0],[1,.4975,.4975]]}},spectral:{name:"Spectral",numColors:256,gamma:1,segmentedData:{red:[[0,0,0],[.05,.4667,.4667],[.1,.5333,.5333],[.15,0,0],[.2,0,0],[.25,0,0],[.3,0,0],[.35,0,0],[.4,0,0],[.45,0,0],[.5,0,0],[.55,0,0],[.6,0,0],[.65,.7333,.7333],[.7,.9333,.9333],[.75,1,1],[.8,1,1],[.85,1,1],[.9,.8667,.8667],[.95,.8,.8],[1,.8,.8]],green:[[0,0,0],[.05,0,0],[.1,0,0],[.15,0,0],[.2,0,0],[.25,.4667,.4667],[.3,.6,.6],[.35,.6667,.6667],[.4,.6667,.6667],[.45,.6,.6],[.5,.7333,.7333],[.55,.8667,.8667],[.6,1,1],[.65,1,1],[.7,.9333,.9333],[.75,.8,.8],[.8,.6,.6],[.85,0,0],[.9,0,0],[.95,0,0],[1,.8,.8]],blue:[[0,0,0],[.05,.5333,.5333],[.1,.6,.6],[.15,.6667,.6667],[.2,.8667,.8667],[.25,.8667,.8667],[.3,.8667,.8667],[.35,.6667,.6667],[.4,.5333,.5333],[.45,0,0],[.5,0,0],[.55,0,0],[.6,0,0],[.65,0,0],[.7,0,0],[.75,0,0],[.8,0,0],[.85,0,0],[.9,0,0],[.95,0,0],[1,.8,.8]]}},coolwarm:{name:"CoolWarm",numColors:256,gamma:1,segmentedData:{red:[[0,.2298057,.2298057],[.03125,.26623388,.26623388],[.0625,.30386891,.30386891],[.09375,.342804478,.342804478],[.125,.38301334,.38301334],[.15625,.424369608,.424369608],[.1875,.46666708,.46666708],[.21875,.509635204,.509635204],[.25,.552953156,.552953156],[.28125,.596262162,.596262162],[.3125,.639176211,.639176211],[.34375,.681291281,.681291281],[.375,.722193294,.722193294],[.40625,.761464949,.761464949],[.4375,.798691636,.798691636],[.46875,.833466556,.833466556],[.5,.865395197,.865395197],[.53125,.897787179,.897787179],[.5625,.924127593,.924127593],[.59375,.944468518,.944468518],[.625,.958852946,.958852946],[.65625,.96732803,.96732803],[.6875,.969954137,.969954137],[.71875,.966811177,.966811177],[.75,.958003065,.958003065],[.78125,.943660866,.943660866],[.8125,.923944917,.923944917],[.84375,.89904617,.89904617],[.875,.869186849,.869186849],[.90625,.834620542,.834620542],[.9375,.795631745,.795631745],[.96875,.752534934,.752534934],[1,.705673158,.705673158]],green:[[0,.298717966,.298717966],[.03125,.353094838,.353094838],[.0625,.406535296,.406535296],[.09375,.458757618,.458757618],[.125,.50941904,.50941904],[.15625,.558148092,.558148092],[.1875,.604562568,.604562568],[.21875,.648280772,.648280772],[.25,.688929332,.688929332],[.28125,.726149107,.726149107],[.3125,.759599947,.759599947],[.34375,.788964712,.788964712],[.375,.813952739,.813952739],[.40625,.834302879,.834302879],[.4375,.849786142,.849786142],[.46875,.860207984,.860207984],[.5,.86541021,.86541021],[.53125,.848937047,.848937047],[.5625,.827384882,.827384882],[.59375,.800927443,.800927443],[.625,.769767752,.769767752],[.65625,.734132809,.734132809],[.6875,.694266682,.694266682],[.71875,.650421156,.650421156],[.75,.602842431,.602842431],[.78125,.551750968,.551750968],[.8125,.49730856,.49730856],[.84375,.439559467,.439559467],[.875,.378313092,.378313092],[.90625,.312874446,.312874446],[.9375,.24128379,.24128379],[.96875,.157246067,.157246067],[1,.01555616,.01555616]],blue:[[0,.753683153,.753683153],[.03125,.801466763,.801466763],[.0625,.84495867,.84495867],[.09375,.883725899,.883725899],[.125,.917387822,.917387822],[.15625,.945619588,.945619588],[.1875,.968154911,.968154911],[.21875,.98478814,.98478814],[.25,.995375608,.995375608],[.28125,.999836203,.999836203],[.3125,.998151185,.998151185],[.34375,.990363227,.990363227],[.375,.976574709,.976574709],[.40625,.956945269,.956945269],[.4375,.931688648,.931688648],[.46875,.901068838,.901068838],[.5,.865395561,.865395561],[.53125,.820880546,.820880546],[.5625,.774508472,.774508472],[.59375,.726736146,.726736146],[.625,.678007945,.678007945],[.65625,.628751763,.628751763],[.6875,.579375448,.579375448],[.71875,.530263762,.530263762],[.75,.481775914,.481775914],[.78125,.434243684,.434243684],[.8125,.387970225,.387970225],[.84375,.343229596,.343229596],[.875,.300267182,.300267182],[.90625,.259301199,.259301199],[.9375,.220525627,.220525627],[.96875,.184115123,.184115123],[1,.150232812,.150232812]]}},blues:{name:"Blues",numColors:256,gamma:1,segmentedData:{red:[[0,.9686274528503418,.9686274528503418],[.125,.8705882430076599,.8705882430076599],[.25,.7764706015586853,.7764706015586853],[.375,.6196078658103943,.6196078658103943],[.5,.41960784792900085,.41960784792900085],[.625,.25882354378700256,.25882354378700256],[.75,.12941177189350128,.12941177189350128],[.875,.0313725508749485,.0313725508749485],[1,.0313725508749485,.0313725508749485]],green:[[0,.9843137264251709,.9843137264251709],[.125,.9215686321258545,.9215686321258545],[.25,.8588235378265381,.8588235378265381],[.375,.7921568751335144,.7921568751335144],[.5,.6823529601097107,.6823529601097107],[.625,.572549045085907,.572549045085907],[.75,.4431372582912445,.4431372582912445],[.875,.3176470696926117,.3176470696926117],[1,.1882352977991104,.1882352977991104]],blue:[[0,1,1],[.125,.9686274528503418,.9686274528503418],[.25,.9372549057006836,.9372549057006836],[.375,.8823529481887817,.8823529481887817],[.5,.8392156958580017,.8392156958580017],[.625,.7764706015586853,.7764706015586853],[.75,.7098039388656616,.7098039388656616],[.875,.6117647290229797,.6117647290229797],[1,.41960784792900085,.41960784792900085]]}}}},function(e,t,r){"use strict";function n(){this.NumberOfColors=256,this.Ramp="linear",this.TableRange=[0,255],this.HueRange=[0,.66667],this.SaturationRange=[1,1],this.ValueRange=[1,1],this.AlphaRange=[1,1],this.NaNColor=[128,0,0,255],this.BelowRangeColor=[0,0,0,255],this.UseBelowRangeColor=!0,this.AboveRangeColor=[255,255,255,255],this.UseAboveRangeColor=!0,this.InputRange=[0,255],this.Table=[],this.setNumberOfTableValues=function(e){this.NumberOfColors=e},this.setRamp=function(e){this.Ramp=e},this.setTableRange=function(e,t){this.TableRange[0]=e,this.TableRange[1]=t},this.setHueRange=function(e,t){this.HueRange[0]=e,this.HueRange[1]=t},this.setSaturationRange=function(e,t){this.SaturationRange[0]=e,this.SaturationRange[1]=t},this.setValueRange=function(e,t){this.ValueRange[0]=e,this.ValueRange[1]=t},this.setRange=function(e,t){this.InputRange[0]=e,this.InputRange[1]=t},this.setAlphaRange=function(e,t){this.AlphaRange[0]=e,this.AlphaRange[1]=t},this.getColor=function(e){return this.mapValue(e)},this.HSVToRGB=function(e,t,r){if(e>1)throw new Error("HSVToRGB expects hue < 1");var n=[];if(0===t)return n[0]=r,n[1]=r,n[2]=r,n;var a=Math.floor(6*e),i=6*e-a,o=r*(1-t),l=r*(1-t*i),u=r*(1-t*(1-i));switch(a){case 0:case 6:n[0]=r,n[1]=u,n[2]=o;break;case 1:n[0]=l,n[1]=r,n[2]=o;break;case 2:n[0]=o,n[1]=r,n[2]=u;break;case 3:n[0]=o,n[1]=l,n[2]=r;break;case 4:n[0]=u,n[1]=o,n[2]=r;break;case 5:n[0]=r,n[1]=o,n[2]=l}return n},this.build=function(e){if(!(this.Table.length>1)||e){this.Table=[];var t=this.NumberOfColors-1,r=void 0,n=void 0,a=void 0,i=void 0;t?(r=(this.HueRange[1]-this.HueRange[0])/t,n=(this.SaturationRange[1]-this.SaturationRange[0])/t,a=(this.ValueRange[1]-this.ValueRange[0])/t,i=(this.AlphaRange[1]-this.AlphaRange[0])/t):r=n=a=i=0;for(var o=0;o<=t;o++){var l=this.HueRange[0]+o*r,u=this.SaturationRange[0]+o*n,d=this.ValueRange[0]+o*a,s=this.AlphaRange[0]+o*i,f=this.HSVToRGB(l,u,d),m=[];switch(this.Ramp){case"scurve":m[0]=Math.floor(127.5*(1+Math.cos((1-f[0])*Math.PI))),m[1]=Math.floor(127.5*(1+Math.cos((1-f[1])*Math.PI))),m[2]=Math.floor(127.5*(1+Math.cos((1-f[2])*Math.PI))),m[3]=Math.floor(255*s);break;case"linear":m[0]=Math.floor(255*f[0]+.5),m[1]=Math.floor(255*f[1]+.5),m[2]=Math.floor(255*f[2]+.5),m[3]=Math.floor(255*s+.5);break;case"sqrt":m[0]=Math.floor(255*Math.sqrt(f[0])+.5),m[1]=Math.floor(255*Math.sqrt(f[1])+.5),m[2]=Math.floor(255*Math.sqrt(f[2])+.5),m[3]=Math.floor(255*Math.sqrt(s)+.5);break;default:throw new Error("Invalid Ramp value ("+this.Ramp+")")}this.Table.push(m)}this.buildSpecialColors()}},this.buildSpecialColors=function(){var e=this.NumberOfColors,t=e+a,r=e+i,n=e+o;this.UseBelowRangeColor||0===e?this.Table[t]=this.BelowRangeColor:this.Table[t]=this.Table[0],this.UseAboveRangeColor||0===e?this.Table[r]=this.AboveRangeColor:this.Table[r]=this.Table[e-1],this.Table[n]=this.NaNColor},this.mapValue=function(e){var t=this.getIndex(e);if(t<0)return this.NaNColor;if(0===t){if(this.UseBelowRangeColor&&e<this.TableRange[0])return this.BelowRangeColor}else if(t===this.NumberOfColors-1&&this.UseAboveRangeColor&&e>this.TableRange[1])return this.AboveRangeColor;return this.Table[t]},this.linearIndexLookupMain=function(e,t){var r=void 0;return r=e<t.Range[0]?t.MaxIndex+a+1.5:e>t.Range[1]?t.MaxIndex+i+1.5:(e+t.Shift)*t.Scale,Math.floor(r)},this.getIndex=function(e){var t={};if(t.Range=[],t.MaxIndex=this.NumberOfColors-1,t.Shift=-this.TableRange[0],this.TableRange[1]<=this.TableRange[0]?t.Scale=Number.MAX_VALUE:t.Scale=t.MaxIndex/(this.TableRange[1]-this.TableRange[0]),t.Range[0]=this.TableRange[0],t.Range[1]=this.TableRange[1],isNaN(e))return-1;var r=this.linearIndexLookupMain(e,t);return r===this.NumberOfColors+a?r=0:r===this.NumberOfColors+i&&(r=this.NumberOfColors-1),r},this.setTableValue=function(e,t){if(5===arguments.length&&(t=Array.prototype.slice.call(arguments,1)),e<0)throw new Error("Can't set the table value for negative index ("+e+")");e>=this.NumberOfColors&&new Error("Index "+e+" is greater than the number of colors "+this.NumberOfColors),this.Table[e]=t,0!==e&&e!==this.NumberOfColors-1||this.buildSpecialColors()}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var a=0,i=1,o=2},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,a,i){if(void 0===e)throw new Error("getStoredPixels: parameter element must not be undefined");t=Math.round(t),r=Math.round(r);for(var o=(0,n.getEnabledElement)(e),l=[],u=0,d=o.image.getPixelData(),s=0;s<i;s++)for(var f=0;f<a;f++){var m=(s+r)*o.image.columns+(f+t);l[u++]=d[m]}return l};var n=r(0)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e){if(void 0===e)throw new Error("setMaximumSizeBytes: parameter numBytes must not be undefined");if(void 0===e.toFixed)throw new Error("setMaximumSizeBytes: parameter numBytes must be a number");w=e,c.external.$(v.default).trigger("CornerstoneImageCacheMaximumSizeChanged"),(0,p.default)(v.default,"CornerstoneImageCacheMaximumSizeChanged"),i()}function i(){function e(e,t){return e.timeStamp>t.timeStamp?-1:e.timeStamp<t.timeStamp?1:0}if(!(b<=w)){for(I.sort(e);b>w;){var t=I[I.length-1],r=t.imageId;u(r),c.external.$(v.default).trigger("CornerstoneImageCachePromiseRemoved",{imageId:r}),(0,p.default)(v.default,"CornerstoneImageCachePromiseRemoved",{imageId:r})}var n=d();c.external.$(v.default).trigger("CornerstoneImageCacheFull",n),(0,p.default)(v.default,"CornerstoneImageCacheFull",n)}}function o(e,t){if(void 0===e)throw new Error("putImagePromise: imageId must not be undefined");if(void 0===t)throw new Error("putImagePromise: imagePromise must not be undefined");if(!0===y.hasOwnProperty(e))throw new Error("putImagePromise: imageId already in cache");var r={loaded:!1,imageId:e,sharedCacheKey:void 0,imagePromise:t,timeStamp:Date.now(),sizeInBytes:0};y[e]=r,I.push(r),t.then(function(e){if(-1!==I.indexOf(r)){if(r.loaded=!0,r.image=e,void 0===e.sizeInBytes)throw new Error("putImagePromise: sizeInBytes must not be undefined");if(void 0===e.sizeInBytes.toFixed)throw new Error("putImagePromise: image.sizeInBytes is not a number");r.sizeInBytes=e.sizeInBytes,b+=r.sizeInBytes;var t={action:"addImage",image:r};c.external.$(v.default).trigger("CornerstoneImageCacheChanged",t),(0,p.default)(v.default,"CornerstoneImageCacheChanged",t),r.sharedCacheKey=e.sharedCacheKey,i()}})}function l(e){if(void 0===e)throw new Error("getImagePromise: imageId must not be undefined");var t=y[e];if(void 0!==t)return t.timeStamp=Date.now(),t.imagePromise}function u(e){if(void 0===e)throw new Error("removeImagePromise: imageId must not be undefined");var t=y[e];if(void 0===t)throw new Error("removeImagePromise: imageId was not present in imageCache");t.imagePromise.reject(),I.splice(I.indexOf(t),1),b-=t.sizeInBytes;var r={action:"deleteImage",image:t};c.external.$(v.default).trigger("CornerstoneImageCacheChanged",r),(0,p.default)(v.default,"CornerstoneImageCacheChanged",r),s(t.imagePromise),delete y[e]}function d(){return{maximumSizeInBytes:w,cacheSizeInBytes:b,numberOfImagesCached:I.length}}function s(e){e.then(function(e){e.decache&&e.decache()})}function f(){for(;I.length>0;){u(I[0].imageId)}}function m(e,t){var r=y[e];r&&r.imagePromise.then(function(e){var n=t-e.sizeInBytes;e.sizeInBytes=t,r.sizeInBytes=t,b+=n;var a={action:"changeImageSize",image:e};c.external.$(v.default).trigger("CornerstoneImageCacheChanged",a),(0,p.default)(v.default,"CornerstoneImageCacheChanged",a)})}Object.defineProperty(t,"__esModule",{value:!0}),t.cachedImages=void 0,t.setMaximumSizeBytes=a,t.putImagePromise=o,t.getImagePromise=l,t.removeImagePromise=u,t.getCacheInfo=d,t.purgeCache=f,t.changeImageIdCacheSize=m;var c=r(1),g=r(12),v=n(g),h=r(2),p=n(h),w=1073741824,b=0,y={},I=t.cachedImages=[];t.default={imageCache:y,cachedImages:I,setMaximumSizeBytes:a,putImagePromise:o,getImagePromise:l,removeImagePromise:u,getCacheInfo:d,purgeCache:f,changeImageIdCacheSize:m}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(4);Object.defineProperty(t,"drawImage",{enumerable:!0,get:function(){return n(a).default}});var i=r(9);Object.defineProperty(t,"generateLut",{enumerable:!0,get:function(){return n(i).default}});var o=r(5);Object.defineProperty(t,"getDefaultViewport",{enumerable:!0,get:function(){return n(o).default}});var l=r(14);Object.defineProperty(t,"requestAnimationFrame",{enumerable:!0,get:function(){return n(l).default}});var u=r(15);Object.defineProperty(t,"storedPixelDataToCanvasImageData",{enumerable:!0,get:function(){return n(u).default}});var d=r(16);Object.defineProperty(t,"storedColorPixelDataToCanvasImageData",{enumerable:!0,get:function(){return n(d).default}});var s=r(36);Object.defineProperty(t,"internal",{enumerable:!0,get:function(){return n(s).default}});var f=r(7);Object.defineProperty(t,"renderColorImage",{enumerable:!0,get:function(){return f.renderColorImage}});var m=r(13);Object.defineProperty(t,"renderGrayscaleImage",{enumerable:!0,get:function(){return m.renderGrayscaleImage}});var c=r(23);Object.defineProperty(t,"renderWebImage",{enumerable:!0,get:function(){return c.renderWebImage}});var g=r(46);Object.defineProperty(t,"canvasToPixel",{enumerable:!0,get:function(){return n(g).default}});var v=r(47);Object.defineProperty(t,"disable",{enumerable:!0,get:function(){return n(v).default}});var h=r(48);Object.defineProperty(t,"displayImage",{enumerable:!0,get:function(){return n(h).default}});var p=r(50);Object.defineProperty(t,"draw",{enumerable:!0,get:function(){return n(p).default}});var w=r(51);Object.defineProperty(t,"drawInvalidated",{enumerable:!0,get:function(){return n(w).default}});var b=r(52);Object.defineProperty(t,"enable",{enumerable:!0,get:function(){return n(b).default}});var y=r(55);Object.defineProperty(t,"getElementData",{enumerable:!0,get:function(){return y.getElementData}}),Object.defineProperty(t,"removeElementData",{enumerable:!0,get:function(){return y.removeElementData}});var I=r(0);Object.defineProperty(t,"getEnabledElement",{enumerable:!0,get:function(){return I.getEnabledElement}}),Object.defineProperty(t,"addEnabledElement",{enumerable:!0,get:function(){return I.addEnabledElement}}),Object.defineProperty(t,"getEnabledElementsByImageId",{enumerable:!0,get:function(){return I.getEnabledElementsByImageId}}),Object.defineProperty(t,"getEnabledElements",{enumerable:!0,get:function(){return I.getEnabledElements}});var C=r(18);Object.defineProperty(t,"addLayer",{enumerable:!0,get:function(){return C.addLayer}}),Object.defineProperty(t,"removeLayer",{enumerable:!0,get:function(){return C.removeLayer}}),Object.defineProperty(t,"getLayer",{enumerable:!0,get:function(){return C.getLayer}}),Object.defineProperty(t,"getLayers",{enumerable:!0,get:function(){return C.getLayers}}),Object.defineProperty(t,"getVisibleLayers",{enumerable:!0,get:function(){return C.getVisibleLayers}}),Object.defineProperty(t,"setActiveLayer",{enumerable:!0,get:function(){return C.setActiveLayer}}),Object.defineProperty(t,"getActiveLayer",{enumerable:!0,get:function(){return C.getActiveLayer}});var _=r(26);Object.defineProperty(t,"fitToWindow",{enumerable:!0,get:function(){return n(_).default}});var x=r(56);Object.defineProperty(t,"getDefaultViewportForImage",{enumerable:!0,get:function(){return n(x).default}});var P=r(57);Object.defineProperty(t,"getImage",{enumerable:!0,get:function(){return n(P).default}});var E=r(58);Object.defineProperty(t,"getPixels",{enumerable:!0,get:function(){return n(E).default}});var T=r(32);Object.defineProperty(t,"getStoredPixels",{enumerable:!0,get:function(){return n(T).default}});var R=r(59);Object.defineProperty(t,"getViewport",{enumerable:!0,get:function(){return n(R).default}});var L=r(60);Object.defineProperty(t,"loadImage",{enumerable:!0,get:function(){return L.loadImage}}),Object.defineProperty(t,"loadAndCacheImage",{enumerable:!0,get:function(){return L.loadAndCacheImage}}),Object.defineProperty(t,"registerImageLoader",{enumerable:!0,get:function(){return L.registerImageLoader}}),Object.defineProperty(t,"registerUnknownImageLoader",{enumerable:!0,get:function(){return L.registerUnknownImageLoader}});var M=r(61);Object.defineProperty(t,"invalidate",{enumerable:!0,get:function(){return n(M).default}});var O=r(62);Object.defineProperty(t,"invalidateImageId",{enumerable:!0,get:function(){return n(O).default}});var S=r(63);Object.defineProperty(t,"pageToPixel",{enumerable:!0,get:function(){return n(S).default}});var D=r(64);Object.defineProperty(t,"pixelToCanvas",{enumerable:!0,get:function(){return n(D).default}});var j=r(65);Object.defineProperty(t,"reset",{enumerable:!0,get:function(){return n(j).default}});var A=r(25);Object.defineProperty(t,"resize",{enumerable:!0,get:function(){return n(A).default}});var U=r(8);Object.defineProperty(t,"setToPixelCoordinateSystem",{enumerable:!0,get:function(){return n(U).default}});var V=r(66);Object.defineProperty(t,"setViewport",{enumerable:!0,get:function(){return n(V).default}});var B=r(3);Object.defineProperty(t,"updateImage",{enumerable:!0,get:function(){return n(B).default}});var W=r(28);Object.defineProperty(t,"pixelDataToFalseColorData",{enumerable:!0,get:function(){return n(W).default}});var F=r(67);Object.defineProperty(t,"rendering",{enumerable:!0,get:function(){return n(F).default}});var z=r(33);Object.defineProperty(t,"imageCache",{enumerable:!0,get:function(){return n(z).default}});var G=r(24);Object.defineProperty(t,"metaData",{enumerable:!0,get:function(){return n(G).default}});var N=r(11);Object.defineProperty(t,"webGL",{enumerable:!0,get:function(){return n(N).default}});var k=r(29);Object.defineProperty(t,"colors",{enumerable:!0,get:function(){return n(k).default}});var H=r(27);Object.defineProperty(t,"convertImageToFalseColorImage",{enumerable:!0,get:function(){return H.convertImageToFalseColorImage}}),Object.defineProperty(t,"convertToFalseColorImage",{enumerable:!0,get:function(){return H.convertToFalseColorImage}}),Object.defineProperty(t,"restoreImage",{enumerable:!0,get:function(){return H.restoreImage}});var $=r(12);Object.defineProperty(t,"events",{enumerable:!0,get:function(){return n($).default}});var X=r(1);Object.defineProperty(t,"external",{enumerable:!0,get:function(){return X.external}})},function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t){return function(r){return 255*((r-t)/e+.5)}}function i(e){var t=Math.max.apply(Math,n(e.lut)).toString(2).length,r=t-8,a=e.lut[0]>>r,i=e.lut[e.lut.length-1]>>r,o=e.firstValueMapped+e.lut.length-1;return function(t){return t<e.firstValueMapped?a:t>=o?i:e.lut[t-e.firstValueMapped]>>r}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){return r?i(r):a(e,t)}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(4),i=n(a),o=r(9),l=n(o),u=r(5),d=n(u),s=r(14),f=n(s),m=r(15),c=n(m),g=r(16),v=n(g),h=r(10),p=n(h),w=r(17),b=n(w),y=r(20);t.default={drawImage:i.default,generateLut:l.default,getDefaultViewport:d.default,requestAnimationFrame:f.default,storedPixelDataToCanvasImageData:c.default,storedColorPixelDataToCanvasImageData:v.default,getTransform:p.default,calculateTransform:b.default,Transform:y.Transform}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){var n=(0,a.default)(),i=e.getPixelData();e.stats.lastGetPixelDataTime=(0,a.default)()-n;var o=e.minPixelValue,l=0,u=0,d=i.length;if(n=(0,a.default)(),o<0)for(;u<d;)r[l++]=t[i[u++]+-o],r[l++]=t[i[u++]+-o],r[l++]=t[i[u++]+-o],r[l++]=i[u++];else for(;u<d;)r[l++]=t[i[u++]],r[l++]=t[i[u++]],r[l++]=t[i[u++]],r[l++]=i[u++];e.stats.lastStoredPixelDataToCanvasImageDataTime=(0,a.default)()-n};var n=r(6),a=function(e){return e&&e.__esModule?e:{default:e}}(n)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(){return P}function i(){for(var e in b.shaders){var t=b.shaders[e];t.attributes={},t.uniforms={},t.vert=y.vertexShader,t.program=(0,x.default)(E,t.vert,t.frag),t.attributes.texCoordLocation=E.getAttribLocation(t.program,"a_texCoord"),E.enableVertexAttribArray(t.attributes.texCoordLocation),t.attributes.positionLocation=E.getAttribLocation(t.program,"a_position"),E.enableVertexAttribArray(t.attributes.positionLocation),t.uniforms.resolutionLocation=E.getUniformLocation(t.program,"u_resolution")}}function o(){!0!==L&&s(P)&&(v(),i(),t.isWebGLInitialized=L=!0)}function l(e,t,r){e.bufferData(e.ARRAY_BUFFER,new Float32Array([t,r,0,r,t,0,0,0]),e.STATIC_DRAW)}function u(e){e.preventDefault(),console.warn("WebGL Context Lost!")}function d(e){e.preventDefault(),t.isWebGLInitialized=L=!1,C.default.purgeCache(),o()}function s(e){E=null;try{var t={preserveDrawingBuffer:!0};E=e.getContext("webgl",t)||e.getContext("experimental-webgl",t),e.removeEventListener("webglcontextlost",u,!1),e.addEventListener("webglcontextlost",u,!1),e.removeEventListener("webglcontextrestored",d,!1),e.addEventListener("webglcontextrestored",d,!1)}catch(e){throw new Error("Error creating WebGL context")}return E||(console.error("Unable to initialize WebGL. Your browser may not support it."),E=null),E}function f(e){if(e.color)return"rgb";var t="int";return e.minPixelValue>=0&&(t="u"+t),e.maxPixelValue>255?t+="16":t+="8",t}function m(e){var t=f(e);return b.shaders.hasOwnProperty(t)?b.shaders[t]:b.shaders.rgb}function c(e){var t={uint8:E.LUMINANCE,int8:E.LUMINANCE_ALPHA,uint16:E.LUMINANCE_ALPHA,int16:E.RGB,rgb:E.RGB},r={int8:1,uint16:2,int16:3,rgb:3},n=f(e),a=t[n],i=E.createTexture();E.bindTexture(E.TEXTURE_2D,i),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MIN_FILTER,E.NEAREST),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MAG_FILTER,E.NEAREST),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_S,E.CLAMP_TO_EDGE),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_T,E.CLAMP_TO_EDGE),E.pixelStorei(E.UNPACK_ALIGNMENT,1);var o=b.dataUtilities[n].storedPixelDataToImageData(e,e.width,e.height);return E.texImage2D(E.TEXTURE_2D,0,a,e.width,e.height,0,a,E.UNSIGNED_BYTE,o),{texture:i,sizeInBytes:e.width*e.height*r[n]}}function g(e){var t=C.default.getImageTexture(e.imageId);return t||(t=c(e),C.default.putImageTexture(e,t)),t.texture}function v(){R=E.createBuffer(),E.bindBuffer(E.ARRAY_BUFFER,R),E.bufferData(E.ARRAY_BUFFER,new Float32Array([1,1,0,1,1,0,0,0]),E.STATIC_DRAW),T=E.createBuffer(),E.bindBuffer(E.ARRAY_BUFFER,T),E.bufferData(E.ARRAY_BUFFER,new Float32Array([1,1,0,1,1,0,0,0]),E.STATIC_DRAW)}function h(e,t,r,n,a){E.clearColor(1,0,0,1),E.viewport(0,0,n,a),E.clear(E.COLOR_BUFFER_BIT|E.DEPTH_BUFFER_BIT),E.useProgram(e.program),E.bindBuffer(E.ARRAY_BUFFER,T),E.vertexAttribPointer(e.attributes.texCoordLocation,2,E.FLOAT,!1,0,0),E.bindBuffer(E.ARRAY_BUFFER,R),E.vertexAttribPointer(e.attributes.positionLocation,2,E.FLOAT,!1,0,0);for(var i in t){var o=E.getUniformLocation(e.program,i);if(o){var u=t[i],d=u.type,s=u.value;"i"===d?E.uniform1i(o,s):"f"===d?E.uniform1f(o,s):"2f"===d&&E.uniform2f(o,s[0],s[1])}}l(E,n,a),E.activeTexture(E.TEXTURE0),E.bindTexture(E.TEXTURE_2D,r),E.drawArrays(E.TRIANGLE_STRIP,0,4)}function p(e){var t=e.image;P.width=t.width,P.height=t.height;var r=e.viewport,n=m(t),a=g(t);return h(n,{u_resolution:{type:"2f",value:[t.width,t.height]},wc:{type:"f",value:r.voi.windowCenter},ww:{type:"f",value:r.voi.windowWidth},slope:{type:"f",value:t.slope},intercept:{type:"f",value:t.intercept},minPixelValue:{type:"f",value:t.minPixelValue},invert:{type:"i",value:r.invert?1:0}},a,t.width,t.height),P}function w(){var e={failIfMajorPerformanceCaveat:!0};try{var t=document.createElement("canvas");return Boolean(window.WebGLRenderingContext)&&(t.getContext("webgl",e)||t.getContext("experimental-webgl",e))}catch(e){return!1}}Object.defineProperty(t,"__esModule",{value:!0}),t.isWebGLInitialized=void 0,t.getRenderCanvas=a,t.initRenderer=o,t.render=p,t.isWebGLAvailable=w;var b=r(39),y=r(45),I=r(21),C=n(I),_=r(22),x=n(_),P=document.createElement("canvas"),E=void 0,T=void 0,R=void 0,L=!1;t.isWebGLInitialized=L},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.dataUtilities=t.shaders=void 0;var n=r(40),a=r(41),i=r(42),o=r(43),l=r(44),u={int16:n.int16Shader,int8:a.int8Shader,rgb:i.rgbShader,uint16:o.uint16Shader,uint8:l.uint8Shader},d={int16:n.int16DataUtilities,int8:a.int8DataUtilities,rgb:i.rgbDataUtilities,uint16:o.uint16DataUtilities,uint8:l.uint8DataUtilities};t.shaders=u,t.dataUtilities=d},function(e,t,r){"use strict";function n(e){for(var t=e.getPixelData(),r=new Uint8Array(e.width*e.height*3),n=0,a=0;a<t.length;a++){var i=Math.abs(t[a]);r[n++]=255&i,r[n++]=i>>8,r[n++]=t[a]<0?0:1}return r}Object.defineProperty(t,"__esModule",{value:!0});var a={};t.int16DataUtilities={storedPixelDataToImageData:n};a.frag="precision mediump float;uniform sampler2D u_image;uniform float ww;uniform float wc;uniform float slope;uniform float intercept;uniform int invert;varying vec2 v_texCoord;void main() {vec4 color = texture2D(u_image, v_texCoord);float intensity = color.r*256.0 + color.g*65536.0;if (color.b == 0.0)intensity = -intensity;intensity = intensity * slope + intercept;float center0 = wc - 0.5;float width0 = max(ww, 1.0);intensity = (intensity - center0) / width0 + 0.5;intensity = clamp(intensity, 0.0, 1.0);gl_FragColor = vec4(intensity, intensity, intensity, 1.0);if (invert == 1)gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;}",t.int16Shader=a},function(e,t,r){"use strict";function n(e){for(var t=e.getPixelData(),r=new Uint8Array(e.width*e.height*2),n=0,a=0;a<t.length;a++)r[n++]=t[a],r[n++]=t[a]<0?0:1;return r}Object.defineProperty(t,"__esModule",{value:!0});var a={};t.int8DataUtilities={storedPixelDataToImageData:n};a.frag="precision mediump float;uniform sampler2D u_image;uniform float ww;uniform float wc;uniform float slope;uniform float intercept;uniform int invert;varying vec2 v_texCoord;void main() {vec4 color = texture2D(u_image, v_texCoord);float intensity = color.r*256.;if (color.a == 0.0)intensity = -intensity;intensity = intensity * slope + intercept;float center0 = wc - 0.5;float width0 = max(ww, 1.0);intensity = (intensity - center0) / width0 + 0.5;intensity = clamp(intensity, 0.0, 1.0);gl_FragColor = vec4(intensity, intensity, intensity, 1.0);if (invert == 1)gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;}",t.int8Shader=a},function(e,t,r){"use strict";function n(e){var t=e.minPixelValue,r=0,n=0,a=e.width*e.height*4,i=e.width*e.height*3,o=e.getPixelData(),l=new Uint8Array(i);if(t<0)for(;n<a;)l[r++]=o[n++]+-t,l[r++]=o[n++]+-t,l[r++]=o[n++]+-t,n+=1;else for(;n<a;)l[r++]=o[n++],l[r++]=o[n++],l[r++]=o[n++],n+=1;return l}Object.defineProperty(t,"__esModule",{value:!0});var a={};t.rgbDataUtilities={storedPixelDataToImageData:n};a.frag="precision mediump float;uniform sampler2D u_image;uniform float ww;uniform float wc;uniform float slope;uniform float intercept;uniform float minPixelValue;uniform int invert;varying vec2 v_texCoord;void main() {vec3 color = texture2D(u_image, v_texCoord).xyz;color = color * 256.0 * slope + intercept;float center0 = wc - 0.5 - minPixelValue;float width0 = max(ww, 1.0);color = (color - center0) / width0 + 0.5;gl_FragColor = vec4(color, 1);if (invert == 1)gl_FragColor.rgb = 1. - gl_FragColor.rgb;}",t.rgbShader=a},function(e,t,r){"use strict";function n(e){for(var t=e.getPixelData(),r=new Uint8Array(e.width*e.height*2),n=0,a=0;a<t.length;a++){var i=t[a];r[n++]=255&i,r[n++]=i>>8}return r}Object.defineProperty(t,"__esModule",{value:!0});var a={};t.uint16DataUtilities={storedPixelDataToImageData:n};a.frag="precision mediump float;uniform sampler2D u_image;uniform float ww;uniform float wc;uniform float slope;uniform float intercept;uniform int invert;varying vec2 v_texCoord;void main() {vec4 color = texture2D(u_image, v_texCoord);float intensity = color.r*256.0 + color.a*65536.0;intensity = intensity * slope + intercept;float center0 = wc - 0.5;float width0 = max(ww, 1.0);intensity = (intensity - center0) / width0 + 0.5;intensity = clamp(intensity, 0.0, 1.0);gl_FragColor = vec4(intensity, intensity, intensity, 1.0);if (invert == 1)gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;}",t.uint16Shader=a},function(e,t,r){"use strict";function n(e){return e.getPixelData()}Object.defineProperty(t,"__esModule",{value:!0});var a={};t.uint8DataUtilities={storedPixelDataToImageData:n};a.frag="precision mediump float;uniform sampler2D u_image;uniform float ww;uniform float wc;uniform float slope;uniform float intercept;uniform int invert;varying vec2 v_texCoord;void main() {vec4 color = texture2D(u_image, v_texCoord);float intensity = color.r*256.0;intensity = intensity * slope + intercept;float center0 = wc - 0.5;float width0 = max(ww, 1.0);intensity = (intensity - center0) / width0 + 0.5;intensity = clamp(intensity, 0.0, 1.0);gl_FragColor = vec4(intensity, intensity, intensity, 1.0);if (invert == 1)gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;}",t.uint8Shader=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.vertexShader="attribute vec2 a_position;attribute vec2 a_texCoord;uniform vec2 u_resolution;varying vec2 v_texCoord;void main() {vec2 zeroToOne = a_position / u_resolution;vec2 zeroToTwo = zeroToOne * 2.0;vec2 clipSpace = zeroToTwo - 1.0;gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);v_texCoord = a_texCoord;}"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=(0,n.getEnabledElement)(e),a=(0,i.default)(r);return a.invert(),a.transformPoint(t.x,t.y)};var n=r(0),a=r(10),i=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(void 0===e)throw new Error("disable: element must not be undefined");for(var t=(0,a.getEnabledElements)(),r=0;r<t.length;r++)if(t[r].element===e){var i={element:e};n.external.$(e).trigger("CornerstoneElementDisabled",i),$(e).trigger("CornerstoneElementDisabled",i),(0,o.default)(e,"CornerstoneElementDisabled",i),t[r].element.removeChild(t[r].canvas),t[r].canvas=void 0,t.splice(r,1);break}};var n=r(1),a=r(0),i=r(2),o=function(e){return e&&e.__esModule?e:{default:e}}(i)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){if(void 0===e)throw new Error("displayImage: parameter element must not be undefined");if(void 0===t)throw new Error("displayImage: parameter image must not be undefined");var n=(0,i.getEnabledElement)(e),o=n.image;if(n.image=t,n.layers&&n.layers.length){(0,m.getActiveLayer)(e).image=t}if(void 0===n.viewport&&(n.viewport=(0,l.default)(n.canvas,t)),r)for(var u in r)null!==r[u]&&(n.viewport[u]=r[u]);var s=void 0;if(void 0!==n.lastImageTimeStamp){s=(1e3/((0,f.default)()-n.lastImageTimeStamp)).toFixed()}n.lastImageTimeStamp=(0,f.default)();var c={viewport:n.viewport,element:n.element,image:n.image,oldImage:o,enabledElement:n,frameRate:s};a.external.$(n.element).trigger("CornerstoneNewImage",c),(0,g.default)(n.element,"CornerstoneNewImage",c),(0,d.default)(e)};var a=r(1),i=r(0),o=r(5),l=n(o),u=r(3),d=n(u),s=r(6),f=n(s),m=r(18),c=r(2),g=n(c)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,n.getEnabledElement)(e);if(void 0===t.image)throw new Error("draw: image has not been loaded yet");(0,i.default)(t)};var n=r(0),a=r(4),i=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){for(var e=(0,n.getEnabledElements)(),t=0;t<e.length;t++){var r=e[t];!0===r.invalid&&(0,i.default)(r,!0)}};var n=r(0),a=r(4),i=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e){return void 0!==e.image||e.layers.length}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){function r(e){if(void 0!==l.canvas){var t={enabledElement:l,timestamp:e};i.external.$(l.element).trigger("CornerstonePreRender",t),(0,h.default)(l.element,"CornerstonePreRender",t),l.needsRedraw&&a(l)&&(0,s.default)(l,l.invalid),(0,m.default)(r)}}if(void 0===e)throw new Error("enable: parameter element cannot be undefined");t&&t.renderer&&"webgl"===t.renderer.toLowerCase()&&(g.default.renderer.isWebGLAvailable()?(g.default.renderer.initRenderer(),t.renderer="webgl"):(console.error("WebGL not available, falling back to Canvas renderer"),delete t.renderer));var n=document.createElement("canvas");e.appendChild(n);var l={element:e,canvas:n,image:void 0,invalid:!1,needsRedraw:!0,options:t,layers:[],data:{},renderingTools:{}};(0,o.addEnabledElement)(l),(0,u.default)(e,!0),r()};var i=r(1),o=r(0),l=r(25),u=n(l),d=r(53),s=n(d),f=r(14),m=n(f),c=r(11),g=n(c),v=r(2),h=n(v)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=e.image,n=e.element,i=e.layers||[];if(e.canvas&&(e.image||i.length)){var l=(0,o.default)();if(r.stats={lastGetPixelDataTime:-1,lastStoredPixelDataToCanvasImageDataTime:-1,lastPutImageDataTime:-1,lastRenderTime:-1,lastLutGenerateTime:-1},i&&i.length)(0,u.default)(e,t);else if(r){var f=r.render;f||(f=r.color?d.renderColorImage:s.renderGrayscaleImage),f(e,t)}var c=(0,o.default)()-l,g={viewport:e.viewport,element:n,image:r,enabledElement:e,canvasContext:e.canvas.getContext("2d"),renderTimeInMs:c};r.stats.lastRenderTime=c,e.invalid=!1,e.needsRedraw=!1,a.external.$(n).trigger("CornerstoneImageRendered",g),(0,m.default)(n,"CornerstoneImageRendered",g)}};var a=r(1),i=r(6),o=n(i),l=r(54),u=n(l),d=r(7),s=r(13),f=r(2),m=n(f)},function(e,t,r){"use strict";function n(e){return{rotation:e.rotation,scale:e.scale,translation:{x:e.translation.x,y:e.translation.y},hflip:e.hflip,vflip:e.vflip}}function a(e,t){e.forEach(function(e){if(e!==t){var r=m[t.layerId],n=m[e.layerId]||e.viewport,a=n.scale/r.scale;e.viewport.scale=t.viewport.scale*a,e.viewport.rotation=t.viewport.rotation,e.viewport.translation={x:t.viewport.translation.x/a,y:t.viewport.translation.y/a},e.viewport.hflip=t.viewport.hflip,e.viewport.vflip=t.viewport.vflip}})}function i(e,t,r,n){var a=e.canvas;r.forEach(function(t){if(e.save(),t.image){t.canvas=a,(0,f.default)(t,e);var r=void 0;t.options.colormap&&t.image.colormapId!==t.options.colormap?(r=(0,d.convertImageToFalseColorImage)(t.image,t.options.colormap),t.viewport.voi={windowWidth:t.image.windowWidth,windowCenter:t.image.windowCenter}):!t.options.colormap&&t.image.colormapId&&(r=(0,d.restoreImage)(t.image),t.viewport.voi={windowWidth:t.image.windowWidth,windowCenter:t.image.windowCenter}),n=n||r,!0===t.image.color?(0,l.addColorLayer)(t,n):(0,u.addGrayscaleLayer)(t,n),t.options&&t.options.opacity?e.globalAlpha=t.options.opacity:e.globalAlpha=1,t.options&&t.options.fillStyle&&(e.fillStyle=t.options.fillStyle),!0===t.viewport.pixelReplication?(e.imageSmoothingEnabled=!1,e.mozImageSmoothingEnabled=!1):(e.imageSmoothingEnabled=!0,e.mozImageSmoothingEnabled=!0),e.drawImage(t.canvas,0,0,t.image.width,t.image.height,0,0,t.image.width,t.image.height),e.restore()}})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=e.element,l=(0,o.getLayers)(r),u=(0,o.getActiveLayer)(r),d=(0,o.getVisibleLayers)(r),s=!e.lastSyncViewportsState&&e.syncViewports;e.lastSyncViewportsState=e.syncViewports,s&&l.forEach(function(e){m[e.layerId]=n(e.viewport)}),!0===e.syncViewports&&a(d,u);var f=e.canvas.getContext("2d");f.setTransform(1,0,0,1,0,0),f.fillStyle="black",f.fillRect(0,0,e.canvas.width,e.canvas.height),i(f,u,d,t)};var o=r(18),l=r(7),u=r(13),d=r(27),s=r(8),f=function(e){return e&&e.__esModule?e:{default:e}}(s),m={}},function(e,t,r){"use strict";function n(e,t){var r=(0,i.getEnabledElement)(e);return!1===r.data.hasOwnProperty(t)&&(r.data[t]={}),r.data[t]}function a(e,t){delete(0,i.getEnabledElement)(e).data[t]}Object.defineProperty(t,"__esModule",{value:!0}),t.getElementData=n,t.removeElementData=a;var i=r(0)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=(0,n.getEnabledElement)(e);return(0,i.default)(r.canvas,t)};var n=r(0),a=r(5),i=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return(0,n.getEnabledElement)(e).image};var n=r(0)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n,i){var l=(0,o.default)(e,t,r,n,i),d=(0,a.getEnabledElement)(e),s=(0,u.default)(d.image.slope,d.image.intercept,d.viewport.modalityLUT);return l.map(s)};var a=r(0),i=r(32),o=n(i),l=r(19),u=n(l)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,n.getEnabledElement)(e),r=t.viewport;if(void 0!==r)return{scale:r.scale,translation:{x:r.translation.x,y:r.translation.y},voi:{windowWidth:r.voi.windowWidth,windowCenter:r.voi.windowCenter},invert:r.invert,pixelReplication:r.pixelReplication,rotation:r.rotation,hflip:r.hflip,vflip:r.vflip,modalityLUT:r.modalityLUT,voiLUT:r.voiLUT}};var n=r(0)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r=e.indexOf(":"),n=e.substring(0,r),a=v[n],i=void 0;if(void 0===a||null===a){if(void 0!==h)return i=h(e);throw new Error("loadImageFromImageLoader: no image loader for imageId")}return i=a(e,t),i.then(function(e){d.external.$(m.default).trigger("CornerstoneImageLoaded",{image:e}),(0,g.default)(m.default,"CornerstoneImageLoaded",{image:e})}),i}function i(e,t){if(void 0===e)throw new Error("loadImage: parameter imageId must not be undefined");var r=(0,s.getImagePromise)(e);return void 0!==r?r:r=a(e,t)}function o(e,t){if(void 0===e)throw new Error("loadAndCacheImage: parameter imageId must not be undefined");var r=(0,s.getImagePromise)(e);return void 0!==r?r:(r=a(e,t),(0,s.putImagePromise)(e,r),r)}function l(e,t){v[e]=t}function u(e){var t=h;return h=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.loadImage=i,t.loadAndCacheImage=o,t.registerImageLoader=l,t.registerUnknownImageLoader=u;var d=r(1),s=r(33),f=r(12),m=n(f),c=r(2),g=n(c),v={},h=void 0},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,a.getEnabledElement)(e);t.invalid=!0,t.needsRedraw=!0;var r={element:e};n.external.$(e).trigger("CornerstoneInvalidated",r),(0,o.default)(e,"CornerstoneInvalidated",r)};var n=r(1),a=r(0),i=r(2),o=function(e){return e&&e.__esModule?e:{default:e}}(i)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){(0,n.getEnabledElementsByImageId)(e).forEach(function(e){(0,i.default)(e,!0)})};var n=r(0),a=r(4),i=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){var a=(0,n.getEnabledElement)(e);if(void 0===a.image)throw new Error("image has not been loaded yet");var o=e.getBoundingClientRect(),l=t-o.left-window.pageXOffset,u=r-o.top-window.pageYOffset,d={x:l,y:u},s=(0,i.default)(a);return s.invert(),s.transformPoint(d.x,d.y)};var n=r(0),a=r(10),i=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=(0,n.getEnabledElement)(e);return(0,i.default)(r).transformPoint(t.x,t.y)};var n=r(0),a=r(10),i=function(e){return e&&e.__esModule?e:{default:e}}(a)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,a.getEnabledElement)(e);t.viewport=(0,o.default)(t.canvas,t.image),(0,u.default)(e)};var a=r(0),i=r(5),o=n(i),l=r(3),u=n(l)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=(0,n.getEnabledElement)(e);r.viewport.scale=t.scale,r.viewport.translation.x=t.translation.x,r.viewport.translation.y=t.translation.y,r.viewport.voi.windowWidth=t.voi.windowWidth,r.viewport.voi.windowCenter=t.voi.windowCenter,r.viewport.invert=t.invert,r.viewport.pixelReplication=t.pixelReplication,r.viewport.rotation=t.rotation,r.viewport.hflip=t.hflip,r.viewport.vflip=t.vflip,r.viewport.modalityLUT=t.modalityLUT,r.viewport.voiLUT=t.voiLUT,r.viewport.voi.windowWidth=Math.max(r.viewport.voi.windowWidth,o),r.viewport.scale=Math.max(r.viewport.scale,l),r.viewport.rotation%=360,r.viewport.rotation<0&&(r.viewport.rotation+=360),(0,i.default)(e)};var n=r(0),a=r(3),i=function(e){return e&&e.__esModule?e:{default:e}}(a),o=1e-6,l=1e-4},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(7),a=r(13),i=r(23);t.default={colorImage:n.renderColorImage,grayscaleImage:a.renderGrayscaleImage,webImage:i.renderWebImage}}])});
//# sourceMappingURL=cornerstone.min.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var configMaxSimultaneousRequests = void 0;

// Maximum concurrent connections to the same server
// Information from http://sgdev-blog.blogspot.fr/2014/01/maximum-concurrent-connection-to-same.html
var maxSimultaneousRequests = {
  default: 6,
  IE: {
    9: 6,
    10: 8,
    default: 8
  },
  Firefox: {
    default: 6
  },
  Opera: {
    10: 8,
    11: 6,
    12: 6,
    default: 6
  },
  Chrome: {
    default: 6
  },
  Safari: {
    default: 6
  }
};

// Browser name / version detection
// http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
function getBrowserInfo() {
  var ua = navigator.userAgent;
  var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  var tem = void 0;

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

    return 'IE ' + (tem[1] || '');
  }

  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem !== null) {
      return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
    M.splice(1, 1, tem[1]);
  }

  return M.join(' ');
}

function setMaxSimultaneousRequests(newMaxSimultaneousRequests) {
  configMaxSimultaneousRequests = newMaxSimultaneousRequests;
}

function getMaxSimultaneousRequests() {
  if (configMaxSimultaneousRequests) {
    return configMaxSimultaneousRequests;
  }

  return getDefaultSimultaneousRequests();
}

function getDefaultSimultaneousRequests() {
  var infoString = getBrowserInfo();
  var info = infoString.split(' ');
  var browserName = info[0];
  var browserVersion = info[1];
  var browserData = maxSimultaneousRequests[browserName];

  if (!browserData) {
    return maxSimultaneousRequests.default;
  }

  if (!browserData[browserVersion]) {
    return browserData.default;
  }

  return browserData[browserVersion];
}

function isMobileDevice() {
  var pattern = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini');

  return pattern.test(navigator.userAgent);
}

exports.getDefaultSimultaneousRequests = getDefaultSimultaneousRequests;
exports.getMaxSimultaneousRequests = getMaxSimultaneousRequests;
exports.setMaxSimultaneousRequests = setMaxSimultaneousRequests;
exports.getBrowserInfo = getBrowserInfo;
exports.isMobileDevice = isMobileDevice;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseWheelCallback) {
  var toolInterface = {
    activate: function activate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseWheel', mouseWheelCallback);
      var eventData = {};

      _externalModules.external.$(element).on('CornerstoneToolsMouseWheel', eventData, mouseWheelCallback);
    },
    disable: function disable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseWheel', mouseWheelCallback);
    },
    enable: function enable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseWheel', mouseWheelCallback);
    },
    deactivate: function deactivate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseWheel', mouseWheelCallback);
    }
  };

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseEventData, toolType, data, handle, doneMovingCallback, preventHandleOutsideImage) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = mouseEventData.element;
  var distanceFromTool = {
    x: handle.x - mouseEventData.currentPoints.image.x,
    y: handle.y - mouseEventData.currentPoints.image.y
  };

  function mouseDragCallback(e, eventData) {
    if (handle.hasMoved === false) {
      handle.hasMoved = true;
    }

    handle.active = true;
    handle.x = eventData.currentPoints.image.x + distanceFromTool.x;
    handle.y = eventData.currentPoints.image.y + distanceFromTool.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);

    var eventType = 'CornerstoneToolsMeasurementModified';
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);
  }

  _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', mouseDragCallback);

  function mouseUpCallback() {
    handle.active = false;
    _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseClick', mouseUpCallback);
    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback();
    }
  }

  _externalModules.external.$(element).on('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(element).on('CornerstoneToolsMouseClick', mouseUpCallback);
};

var _externalModules = __webpack_require__(0);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseEventData, toolType, data, handle, doneMovingCallback, preventHandleOutsideImage) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = mouseEventData.element;

  function moveCallback(e, eventData) {
    handle.active = true;
    handle.x = eventData.currentPoints.image.x;
    handle.y = eventData.currentPoints.image.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);

    var eventType = 'CornerstoneToolsMeasurementModified';
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);
  }

  function whichMovement(e) {
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', whichMovement);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', whichMovement);

    _externalModules.external.$(element).on('CornerstoneToolsMouseMove', moveCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', moveCallback);

    _externalModules.external.$(element).on('CornerstoneToolsMouseClick', moveEndCallback);
    if (e.type === 'CornerstoneToolsMouseDrag') {
      _externalModules.external.$(element).on('CornerstoneToolsMouseUp', moveEndCallback);
    }
  }

  function measurementRemovedCallback(e, eventData) {
    if (eventData.measurementData === data) {
      moveEndCallback();
    }
  }

  function toolDeactivatedCallback(e, eventData) {
    if (eventData.toolType === toolType) {
      _externalModules.external.$(element).off('CornerstoneToolsMouseMove', moveCallback);
      _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', moveCallback);
      _externalModules.external.$(element).off('CornerstoneToolsMouseClick', moveEndCallback);
      _externalModules.external.$(element).off('CornerstoneToolsMouseUp', moveEndCallback);
      _externalModules.external.$(element).off('CornerstoneToolsMeasurementRemoved', measurementRemovedCallback);
      _externalModules.external.$(element).off('CornerstoneToolsToolDeactivated', toolDeactivatedCallback);

      handle.active = false;
      cornerstone.updateImage(element);
    }
  }

  _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', whichMovement);
  _externalModules.external.$(element).on('CornerstoneToolsMouseMove', whichMovement);
  _externalModules.external.$(element).on('CornerstoneToolsMeasurementRemoved', measurementRemovedCallback);
  _externalModules.external.$(element).on('CornerstoneToolsToolDeactivated', toolDeactivatedCallback);

  function moveEndCallback() {
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', moveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', moveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseClick', moveEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseUp', moveEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMeasurementRemoved', measurementRemovedCallback);
    _externalModules.external.$(element).off('CornerstoneToolsToolDeactivated', toolDeactivatedCallback);

    handle.active = false;
    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback();
    }
  }
};

var _externalModules = __webpack_require__(0);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (onImageRendered) {
  var configuration = {};

  // Note: This is to maintain compatibility for developers that have
  // Built on top of mouseButtonRectangleTool.js
  // TODO: Remove this after we migrate Cornerstone Tools away from jQuery
  function customEventOnImageRendered(e) {
    onImageRendered(e, e.detail);
  }

  var toolInterface = {
    disable: function disable(element) {
      element.removeEventListener('cornerstoneimagerendered', customEventOnImageRendered);
    },
    enable: function enable(element) {
      element.removeEventListener('cornerstoneimagerendered', customEventOnImageRendered);
      element.addEventListener('cornerstoneimagerendered', customEventOnImageRendered);
      _externalModules.external.cornerstone.updateImage(element);
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (eventData, toolType, data, handle, doneMovingCallback, preventHandleOutsideImage) {
  // Console.log('moveNewHandleTouch');
  var cornerstone = _externalModules.external.cornerstone;
  var element = eventData.element;
  var imageCoords = cornerstone.pageToPixel(element, eventData.currentPoints.page.x, eventData.currentPoints.page.y + 50);
  var distanceFromTouch = {
    x: handle.x - imageCoords.x,
    y: handle.y - imageCoords.y
  };

  handle.active = true;
  data.active = true;

  function moveCallback(e, eventData) {
    handle.x = eventData.currentPoints.image.x + distanceFromTouch.x;
    handle.y = eventData.currentPoints.image.y + distanceFromTouch.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);

    var eventType = 'CornerstoneToolsMeasurementModified';
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);
  }

  function moveEndCallback(e, eventData) {
    _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', moveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchPinch', moveEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchEnd', moveEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', moveEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', stopImmediatePropagation);
    _externalModules.external.$(element).off('CornerstoneToolsToolDeactivated', toolDeactivatedCallback);

    if (e.type === 'CornerstoneToolsTouchPinch' || e.type === 'CornerstoneToolsTouchPress') {
      handle.active = false;
      cornerstone.updateImage(element);
      doneMovingCallback();

      return;
    }

    handle.active = false;
    data.active = false;
    handle.x = eventData.currentPoints.image.x + distanceFromTouch.x;
    handle.y = eventData.currentPoints.image.y + distanceFromTouch.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback();
    }
  }

  function stopImmediatePropagation(e) {
    // Stop the CornerstoneToolsTouchStart event from
    // Become a CornerstoneToolsTouchStartActive event when
    // MoveNewHandleTouch ends
    e.stopImmediatePropagation();

    return false;
  }

  _externalModules.external.$(element).on('CornerstoneToolsTouchDrag', moveCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTouchPinch', moveEndCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTouchEnd', moveEndCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTap', moveEndCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTouchStart', stopImmediatePropagation);

  function toolDeactivatedCallback() {
    _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', moveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchPinch', moveEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchEnd', moveEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', moveEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', stopImmediatePropagation);
    _externalModules.external.$(element).off('CornerstoneToolsToolDeactivated', toolDeactivatedCallback);

    handle.active = false;
    data.active = false;
    handle.x = eventData.currentPoints.image.x + distanceFromTouch.x;
    handle.y = eventData.currentPoints.image.y + distanceFromTouch.y;

    if (preventHandleOutsideImage) {
      handle.x = Math.max(handle.x, 0);
      handle.x = Math.min(handle.x, eventData.image.width);

      handle.y = Math.max(handle.y, 0);
      handle.y = Math.min(handle.y, eventData.image.height);
    }

    cornerstone.updateImage(element);
  }

  _externalModules.external.$(element).on('CornerstoneToolsToolDeactivated', toolDeactivatedCallback);
};

var _externalModules = __webpack_require__(0);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastElement = getLastElement;
exports.update = update;
exports.createUndoStep = createUndoStep;
exports.getConfiguration = getConfiguration;
exports.setConfiguration = setConfiguration;

var _cornerstoneCore = __webpack_require__(19);

var cornerstone = _interopRequireWildcard(_cornerstoneCore);

var _toolState = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// UNUSED const toolType = 'thresholding';

var LASTELEMENT = null;

function getLastElement() {
  return LASTELEMENT;
}

var LABEL_SIZE_BYTES = 1;

var configuration = {
  historySize: 4,
  historyPosition: 0,
  toolRegionValue: 2,
  calciumThresholdHu: '-', // placeholder until it gets set ('-' shows up nicely in text input)
  layersAbove: 0,
  layersBelow: 0,
  drawAlpha: 1,
  regionColorsRGB: [[255, 0, 255], [246, 193, 91], [237, 148, 69], [230, 103, 49], [184, 74, 41], [106, 58, 45]],
  kvpToMultiplier: {
    150: 1.06,
    140: 1.04,
    130: 1.02,
    120: 1,
    110: 0.98,
    100: 0.96,
    90: 0.93,
    80: 0.89,
    70: 0.85
  },
  growIterationsPerChunk: 2
};

console.log("CONFIGURATION");
configuration.calciumThresholdHuParsed = parseInt(configuration.calciumThresholdHu);

/**
 * Perform the thresholding on a stack
 */
function performThresholding(stack, afterwards) {
  console.log("PERFORM_THRESHOLDING");
  var width = void 0,
      height = void 0;
  var imageIds = stack.imageIds;
  var slices = imageIds.length;

  // Get slope and intercept
  return cornerstone.loadImage(imageIds[0]).then(function (image) {
    width = image.width;
    height = image.height;

    var length = width * height * slices * LABEL_SIZE_BYTES;
    var buffer = new ArrayBuffer(length);
    var view = new Uint8Array(buffer);

    // Thresholding promises
    var promises = imageIds.map(function (imageId, imageIdx) {

      return cornerstone.loadImage(imageId).then(function (image) {
        var slope = image.slope;
        var intercept = image.intercept;
        var pixelData = image.getPixelData();
        var n = width * height;

        for (var i = 0; i < n; i++) {
          var pixel = pixelData[i];
          var hu = pixel * slope + intercept;
          var label = hu >= configuration.calciumThresholdHu ? 1 : 0;
          var viewIdx = imageIdx * n + i;

          view[viewIdx] = label;
        }
      });
    });

    // Callback with buffer
    return Promise.all(promises).then(function () {
      var result = {
        buffer: buffer,
        width: width,
        height: height
      };

      if (afterwards) {
        afterwards(result);
      }

      return result;
    });
  });
}

var imgdata = null;

/**
 * Draw regions on image
 */
function onImageRendered(e, eventData) {
  console.log("onImageRendered");
  var element = eventData.element;
  var stackData = (0, _toolState.getToolState)(element, 'stack');
  var thresholdingData = (0, _toolState.getToolState)(element, 'regions');

  if (!thresholdingData || !thresholdingData.data || !thresholdingData.data.length) {
    return;
  }

  var slice = stackData.data[0].currentImageIdIndex;
  var buffer = thresholdingData.data[0].buffer;
  var context = eventData.canvasContext;
  var enabledElement = eventData.enabledElement;
  var image = eventData.image;
  var width = image.width;
  var height = image.height;

  var doubleBuffer = document.createElement('canvas');
  var doubleBufferContext = doubleBuffer.getContext('2d');

  doubleBuffer.width = width;
  doubleBuffer.height = height;
  imgdata = imgdata || doubleBufferContext.createImageData(width, height);

  var pixels = imgdata.data;
  var sliceSize = width * height;
  var sliceOffset = slice * sliceSize;
  var view = new Uint8Array(buffer, sliceOffset, sliceSize);

  for (var i = 0; i < view.length; i += 1) {
    var label = view[i];
    var pi = i * 4;

    if (label) {
      var color = configuration.regionColorsRGB[label - 1];

      pixels[pi + 0] = color[0];
      pixels[pi + 1] = color[1];
      pixels[pi + 2] = color[2];
      pixels[pi + 3] = configuration.drawAlpha * 255;
    } else {
      pixels[pi + 3] = 0;
    }
  }
  doubleBufferContext.putImageData(imgdata, 0, 0);

  cornerstone.setToPixelCoordinateSystem(enabledElement, context);
  context.drawImage(doubleBuffer, 0, 0);
}

function enable(element, doneCallback) {
  // Check if tool is already enabled. If so, don't reenable
  var thresholdingData = (0, _toolState.getToolState)(element, 'regions');
  if (thresholdingData.data[0] && thresholdingData.data[0].enabled) {
    return;
  }
  console.log('*** ENABLING regionsThreshold ***');

  LASTELEMENT = element;
  // First check that there is stack data available
  var stackData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  var initialThresholdingData = {
    enabled: 1,
    buffer: null,
    width: null,
    height: null,
    history: []
  };

  (0, _toolState.addToolState)(element, 'regions', initialThresholdingData);

  var stack = stackData.data[0];

  setTimeout(function () {
    performThresholding(stack, function (regions) {
      // Add threshold data to tool state
      var thresholdingData = (0, _toolState.getToolState)(element, 'regions');

      thresholdingData.data[0].buffer = regions.buffer;
      thresholdingData.data[0].width = regions.width;
      thresholdingData.data[0].height = regions.height;
      // Draw regions on image
      element.addEventListener('CornerstoneImageRendered', onImageRendered);

      // Update the element to apply the viewport and tool changes
      cornerstone.updateImage(element);

      typeof doneCallback === 'function' && doneCallback();
    });
  }, 100);
}

function disable(element) {
  var thresholdingData = (0, _toolState.getToolState)(element, 'regions');

  // If there is actually something to disable, disable it
  if (thresholdingData && thresholdingData.data.length) {
    thresholdingData.data[0].enabled = false;
  }
}

function update(element) {
  var enabledElement = element || LASTELEMENT;

  return new Promise(function (resolve, reject) {
    disable(enabledElement);
    enable(enabledElement, function () {
      resolve();
    });
  });
}

function createUndoStep(element) {
  console.log("CREATE UNDO STEP");
  var thresholdingData = (0, _toolState.getToolState)(element, 'regions');

  var state = thresholdingData.data[0];
  // Make a copy using .slice()
  var current = state.buffer.slice();

  // Put at end of history
  state.history.push(current);
  // Remove oldest if too much history
  if (state.history.length > configuration.historySize) {
    state.history.shift();
  }
}

function getConfiguration() {
  console.log("GETCONFIGURATION");
  return configuration;
}

function setConfiguration(config) {
  console.log("SETCONFIGURATION");
  configuration = config;
}

// Module/private exports
exports.default = {
  activate: enable,
  deactivate: disable,
  update: update,
  enable: enable,
  disable: disable,
  getConfiguration: getConfiguration,
  setConfiguration: setConfiguration
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectPatientPointToImagePlane = projectPatientPointToImagePlane;
exports.imagePointToPatientPoint = imagePointToPatientPoint;
exports.planePlaneIntersection = planePlaneIntersection;

var _externalModules = __webpack_require__(0);

// Projects a patient point to an image point
function projectPatientPointToImagePlane(patientPoint, imagePlane) {
  var point = patientPoint.clone().sub(imagePlane.imagePositionPatient);
  var x = imagePlane.rowCosines.dot(point) / imagePlane.columnPixelSpacing;
  var y = imagePlane.columnCosines.dot(point) / imagePlane.rowPixelSpacing;

  return {
    x: x,
    y: y
  };
}

// Projects an image point to a patient point
function imagePointToPatientPoint(imagePoint, imagePlane) {
  var x = imagePlane.rowCosines.clone().multiplyScalar(imagePoint.x);

  x.multiplyScalar(imagePlane.columnPixelSpacing);
  var y = imagePlane.columnCosines.clone().multiplyScalar(imagePoint.y);

  y.multiplyScalar(imagePlane.rowPixelSpacing);
  var patientPoint = x.add(y);

  patientPoint.add(imagePlane.imagePositionPatient);

  return patientPoint;
}

function getRectangleFromImagePlane(imagePlane) {
  // Get the points
  var topLeft = imagePointToPatientPoint({
    x: 0,
    y: 0
  }, imagePlane);
  var topRight = imagePointToPatientPoint({
    x: imagePlane.columns,
    y: 0
  }, imagePlane);
  var bottomLeft = imagePointToPatientPoint({
    x: 0,
    y: imagePlane.rows
  }, imagePlane);
  var bottomRight = imagePointToPatientPoint({
    x: imagePlane.columns,
    y: imagePlane.rows
  }, imagePlane);

  // Get each side as a vector
  var rect = {
    top: new _externalModules.cornerstoneMath.Line3(topLeft, topRight),
    left: new _externalModules.cornerstoneMath.Line3(topLeft, bottomLeft),
    right: new _externalModules.cornerstoneMath.Line3(topRight, bottomRight),
    bottom: new _externalModules.cornerstoneMath.Line3(bottomLeft, bottomRight)
  };

  return rect;
}

function lineRectangleIntersection(line, rect) {
  var intersections = [];

  Object.keys(rect).forEach(function (side) {
    var segment = rect[side];
    var intersection = line.intersectLine(segment);

    if (intersection) {
      intersections.push(intersection);
    }
  });

  return intersections;
}

function planePlaneIntersection(targetImagePlane, referenceImagePlane) {
  // Gets the line of intersection between two planes in patient space

  // First, get the normals of each image plane
  var targetNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
  var targetPlane = new _externalModules.cornerstoneMath.Plane();

  targetPlane.setFromNormalAndCoplanarPoint(targetNormal, targetImagePlane.imagePositionPatient);

  var referenceNormal = referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);
  var referencePlane = new _externalModules.cornerstoneMath.Plane();

  referencePlane.setFromNormalAndCoplanarPoint(referenceNormal, referenceImagePlane.imagePositionPatient);

  var originDirection = referencePlane.clone().intersectPlane(targetPlane);
  var origin = originDirection.origin;
  var direction = originDirection.direction;

  // Calculate the longest possible length in the reference image plane (the length of the diagonal)
  var bottomRight = imagePointToPatientPoint({
    x: referenceImagePlane.columns,
    y: referenceImagePlane.rows
  }, referenceImagePlane);
  var distance = referenceImagePlane.imagePositionPatient.distanceTo(bottomRight);

  // Use this distance to bound the ray intersecting the two planes
  var line = new _externalModules.cornerstoneMath.Line3();

  line.start = origin;
  line.end = origin.clone().add(direction.multiplyScalar(distance));

  // Find the intersections between this line and the reference image plane's four sides
  var rect = getRectangleFromImagePlane(referenceImagePlane);
  var intersections = lineRectangleIntersection(line, rect);

  // Return the intersections between this line and the reference image plane's sides
  // In order to draw the reference line from the target image.
  if (intersections.length !== 2) {
    return;
  }

  return {
    start: intersections[0],
    end: intersections[1]
  };
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _getMaxSimultaneousRequests = __webpack_require__(20);

var requestPool = {
  interaction: [],
  thumbnail: [],
  prefetch: []
};

var numRequests = {
  interaction: 0,
  thumbnail: 0,
  prefetch: 0
};

var maxNumRequests = {
  interaction: 6,
  thumbnail: 6,
  prefetch: 5
};

var awake = false;
var grabDelay = 20;

function addRequest(element, imageId, type, preventCache, doneCallback, failCallback) {
  if (!requestPool.hasOwnProperty(type)) {
    throw new Error('Request type must be one of interaction, thumbnail, or prefetch');
  }

  if (!element || !imageId) {
    return;
  }

  // Describe the request
  var requestDetails = {
    type: type,
    imageId: imageId,
    preventCache: preventCache,
    doneCallback: doneCallback,
    failCallback: failCallback
  };

  // If this imageId is in the cache, resolve it immediately
  var imagePromise = _externalModules.external.cornerstone.imageCache.getImagePromise(imageId);

  if (imagePromise) {
    imagePromise.then(function (image) {
      doneCallback(image);
    }, function (error) {
      failCallback(error);
    });

    return;
  }

  // Add it to the end of the stack
  requestPool[type].push(requestDetails);
}

function clearRequestStack(type) {
  // Console.log('clearRequestStack');
  if (!requestPool.hasOwnProperty(type)) {
    throw new Error('Request type must be one of interaction, thumbnail, or prefetch');
  }

  requestPool[type] = [];
}

function startAgain() {
  if (!awake) {
    return;
  }

  setTimeout(function () {
    startGrabbing();
  }, grabDelay);
}

function sendRequest(requestDetails) {
  var cornerstone = _externalModules.external.cornerstone;
  // Increment the number of current requests of this type
  var type = requestDetails.type;

  numRequests[type]++;

  awake = true;
  var imageId = requestDetails.imageId;
  var doneCallback = requestDetails.doneCallback;
  var failCallback = requestDetails.failCallback;

  // Check if we already have this image promise in the cache
  var imagePromise = cornerstone.imageCache.getImagePromise(imageId);

  if (imagePromise) {
    // If we do, remove from list (when resolved, as we could have
    // Pending prefetch requests) and stop processing this iteration
    imagePromise.then(function (image) {
      numRequests[type]--;
      // Console.log(numRequests);

      doneCallback(image);
      startAgain();
    }, function (error) {
      numRequests[type]--;
      // Console.log(numRequests);
      failCallback(error);
      startAgain();
    });

    return;
  }

  function requestTypeToLoadPriority(requestDetails) {
    if (requestDetails.type === 'prefetch') {
      return -5;
    } else if (requestDetails.type === 'interactive') {
      return 0;
    } else if (requestDetails.type === 'thumbnail') {
      return 5;
    }
  }

  var priority = requestTypeToLoadPriority(requestDetails);

  var loader = void 0;

  if (requestDetails.preventCache === true) {
    loader = cornerstone.loadImage(imageId, {
      priority: priority,
      type: requestDetails.type
    });
  } else {
    loader = cornerstone.loadAndCacheImage(imageId, {
      priority: priority,
      type: requestDetails.type
    });
  }

  // Load and cache the image
  loader.then(function (image) {
    numRequests[type]--;
    // Console.log(numRequests);
    doneCallback(image);
    startAgain();
  }, function (error) {
    numRequests[type]--;
    // Console.log(numRequests);
    failCallback(error);
    startAgain();
  });
}

function startGrabbing() {
  // Begin by grabbing X images
  var maxSimultaneousRequests = (0, _getMaxSimultaneousRequests.getMaxSimultaneousRequests)();

  maxNumRequests = {
    interaction: Math.max(maxSimultaneousRequests, 1),
    thumbnail: Math.max(maxSimultaneousRequests - 2, 1),
    prefetch: Math.max(maxSimultaneousRequests - 1, 1)
  };

  var currentRequests = numRequests.interaction + numRequests.thumbnail + numRequests.prefetch;
  var requestsToSend = maxSimultaneousRequests - currentRequests;

  for (var i = 0; i < requestsToSend; i++) {
    var requestDetails = getNextRequest();

    if (requestDetails) {
      sendRequest(requestDetails);
    }
  }
}

function getNextRequest() {
  if (requestPool.interaction.length && numRequests.interaction < maxNumRequests.interaction) {
    return requestPool.interaction.shift();
  }

  if (requestPool.thumbnail.length && numRequests.thumbnail < maxNumRequests.thumbnail) {
    return requestPool.thumbnail.shift();
  }

  if (requestPool.prefetch.length && numRequests.prefetch < maxNumRequests.prefetch) {
    return requestPool.prefetch.shift();
  }

  if (!requestPool.interaction.length && !requestPool.thumbnail.length && !requestPool.prefetch.length) {
    awake = false;
  }

  return false;
}

function getRequestPool() {
  return requestPool;
}

exports.default = {
  addRequest: addRequest,
  clearRequestStack: clearRequestStack,
  startGrabbing: startGrabbing,
  getRequestPool: getRequestPool
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchDragCallback, options) {
  var configuration = {};
  var events = 'CornerstoneToolsMultiTouchDrag';

  if (options && options.fireOnTouchStart === true) {
    events += ' CornerstoneToolsMultiTouchStart';
  }

  var toolInterface = {
    activate: function activate(element) {
      _externalModules.external.$(element).off(events, touchDragCallback);

      if (options && options.eventData) {
        _externalModules.external.$(element).on(events, options.eventData, touchDragCallback);
      } else {
        _externalModules.external.$(element).on(events, touchDragCallback);
      }

      if (options && options.activateCallback) {
        options.activateCallback(element);
      }
    },
    disable: function disable(element) {
      _externalModules.external.$(element).off(events, touchDragCallback);
      if (options && options.disableCallback) {
        options.disableCallback(element);
      }
    },
    enable: function enable(element) {
      _externalModules.external.$(element).off(events, touchDragCallback);
      if (options && options.enableCallback) {
        options.enableCallback(element);
      }
    },
    deactivate: function deactivate(element) {
      _externalModules.external.$(element).off(events, touchDragCallback);
      if (options && options.deactivateCallback) {
        options.deactivateCallback(element);
      }
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, images) {
  var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var toolData = (0, _toolState.getToolState)(element, 'stack');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var stackData = toolData.data[0];

  var newImageIdIndex = stackData.currentImageIdIndex + images;

  if (loop) {
    var nbImages = stackData.imageIds.length;

    newImageIdIndex %= nbImages;
  } else {
    newImageIdIndex = Math.min(stackData.imageIds.length - 1, newImageIdIndex);
    newImageIdIndex = Math.max(0, newImageIdIndex);
  }

  (0, _scrollToIndex2.default)(element, newImageIdIndex);
};

var _scrollToIndex = __webpack_require__(44);

var _scrollToIndex2 = _interopRequireDefault(_scrollToIndex);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value, precision) {
  var multiplier = Math.pow(10, precision);

  return Math.round(value * multiplier) / multiplier;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ellipse, location) {
  var xRadius = ellipse.width / 2;
  var yRadius = ellipse.height / 2;

  if (xRadius <= 0.0 || yRadius <= 0.0) {
    return false;
  }

  var center = {
    x: ellipse.left + xRadius,
    y: ellipse.top + yRadius
  };

  /* This is a more general form of the circle equation
   *
   * X^2/a^2 + Y^2/b^2 <= 1
   */

  var normalized = {
    x: location.x - center.x,
    y: location.y - center.y
  };

  var inEllipse = normalized.x * normalized.x / (xRadius * xRadius) + normalized.y * normalized.y / (yRadius * yRadius) <= 1.0;

  return inEllipse;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (e.preventDefault) {
    e.preventDefault();
  }

  e.cancelBubble = true;
  e.returnValue = false;

  return false;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, x, y, width, height) {
  if (!element) {
    throw new Error('getRGBPixels: parameter element must not be undefined');
  }

  x = Math.round(x);
  y = Math.round(y);
  var enabledElement = _externalModules.external.cornerstone.getEnabledElement(element);
  var storedPixelData = [];
  var index = 0;
  var pixelData = enabledElement.image.getPixelData();
  var spIndex = void 0,
      row = void 0,
      column = void 0;

  if (enabledElement.image.color) {
    for (row = 0; row < height; row++) {
      for (column = 0; column < width; column++) {
        spIndex = ((row + y) * enabledElement.image.columns + (column + x)) * 4;
        var red = pixelData[spIndex];
        var green = pixelData[spIndex + 1];
        var blue = pixelData[spIndex + 2];
        var alpha = pixelData[spIndex + 3];

        storedPixelData[index++] = red;
        storedPixelData[index++] = green;
        storedPixelData[index++] = blue;
        storedPixelData[index++] = alpha;
      }
    }
  }

  return storedPixelData;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (points) {
  var page = _externalModules.cornerstoneMath.point.copy(points.page);
  var image = _externalModules.cornerstoneMath.point.copy(points.image);
  var client = _externalModules.cornerstoneMath.point.copy(points.client);
  var canvas = _externalModules.cornerstoneMath.point.copy(points.canvas);

  return {
    page: page,
    image: image,
    client: client,
    canvas: canvas
  };
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var coordsData = void 0;

function setCoords(eventData) {
  coordsData = eventData.currentPoints.canvas;
}

function getCoords() {
  return coordsData;
}

var toolCoordinates = {
  setCoords: setCoords,
  getCoords: getCoords
};

exports.default = toolCoordinates;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, handles, canvasPoint, distanceThreshold) {
  if (!distanceThreshold) {
    distanceThreshold = 6;
  }

  var activeHandle = getActiveHandle(handles);
  var nearbyHandle = (0, _getHandleNearImagePoint2.default)(element, handles, canvasPoint, distanceThreshold);

  if (activeHandle !== nearbyHandle) {
    if (nearbyHandle !== undefined) {
      nearbyHandle.active = true;
    }

    if (activeHandle !== undefined) {
      activeHandle.active = false;
    }

    return true;
  }

  return false;
};

var _getHandleNearImagePoint = __webpack_require__(18);

var _getHandleNearImagePoint2 = _interopRequireDefault(_getHandleNearImagePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getActiveHandle(handles) {
  var activeHandle = void 0;

  Object.keys(handles).forEach(function (name) {
    var handle = handles[name];

    if (handle.active === true) {
      activeHandle = handle;

      return;
    }
  });

  return activeHandle;
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseEventData, data, toolData, toolType, options, doneMovingCallback) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = mouseEventData.element;

  function mouseDragCallback(e, eventData) {
    data.active = true;

    Object.keys(data.handles).forEach(function (name) {
      var handle = data.handles[name];

      if (handle.movesIndependently === true) {
        return;
      }

      handle.x += eventData.deltaPoints.image.x;
      handle.y += eventData.deltaPoints.image.y;

      if (options.preventHandleOutsideImage === true) {
        handle.x = Math.max(handle.x, 0);
        handle.x = Math.min(handle.x, eventData.image.width);

        handle.y = Math.max(handle.y, 0);
        handle.y = Math.min(handle.y, eventData.image.height);
      }
    });

    cornerstone.updateImage(element);

    var eventType = 'CornerstoneToolsMeasurementModified';
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }

  _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', mouseDragCallback);

  function mouseUpCallback(e, eventData) {
    data.invalidated = true;

    _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseClick', mouseUpCallback);

    // If any handle is outside the image, delete the tool data
    if (options.deleteIfHandleOutsideImage === true && (0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
      (0, _toolState.removeToolState)(element, toolType, data);
    }

    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback();
    }
  }

  _externalModules.external.$(element).on('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(element).on('CornerstoneToolsMouseClick', mouseUpCallback);

  return true;
};

var _externalModules = __webpack_require__(0);

var _anyHandlesOutsideImage = __webpack_require__(12);

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _toolState = __webpack_require__(1);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, timePoints, wrap) {
  var toolData = (0, _toolState.getToolState)(element, 'timeSeries');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var timeSeriesData = toolData.data[0];
  var currentStack = timeSeriesData.stacks[timeSeriesData.currentStackIndex];
  var currentImageIdIndex = currentStack.currentImageIdIndex;
  var newStackIndex = timeSeriesData.currentStackIndex + timePoints;

  // Loop around if we go outside the stack
  if (wrap) {
    if (newStackIndex >= timeSeriesData.stacks.length) {
      newStackIndex = 0;
    }

    if (newStackIndex < 0) {
      newStackIndex = timeSeriesData.stacks.length - 1;
    }
  } else {
    newStackIndex = Math.min(timeSeriesData.stacks.length - 1, newStackIndex);
    newStackIndex = Math.max(0, newStackIndex);
  }

  if (newStackIndex !== timeSeriesData.currentStackIndex) {
    var viewport = cornerstone.getViewport(element);
    var newStack = timeSeriesData.stacks[newStackIndex];

    var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
    var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
    var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

    if (startLoadingHandler) {
      startLoadingHandler(element);
    }

    var loader = void 0;

    if (newStack.preventCache === true) {
      loader = cornerstone.loadImage(newStack.imageIds[currentImageIdIndex]);
    } else {
      loader = cornerstone.loadAndCacheImage(newStack.imageIds[currentImageIdIndex]);
    }

    loader.then(function (image) {
      if (timeSeriesData.currentImageIdIndex !== currentImageIdIndex) {
        newStack.currentImageIdIndex = currentImageIdIndex;
        timeSeriesData.currentStackIndex = newStackIndex;
        cornerstone.displayImage(element, image, viewport);
        if (endLoadingHandler) {
          endLoadingHandler(element, image);
        }
      }
    }, function (error) {
      var imageId = newStack.imageIds[currentImageIdIndex];

      if (errorLoadingHandler) {
        errorLoadingHandler(element, imageId, error);
      }
    });
  }
};

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (targetImagePlane, referenceImagePlane) {
  var points = (0, _pointProjector.planePlaneIntersection)(targetImagePlane, referenceImagePlane);

  if (!points) {
    return;
  }

  return {
    start: (0, _pointProjector.projectPatientPointToImagePlane)(points.start, targetImagePlane),
    end: (0, _pointProjector.projectPatientPointToImagePlane)(points.end, targetImagePlane)
  };
};

var _pointProjector = __webpack_require__(27);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, eventData, targetElement, referenceElement) {
  var cornerstone = _externalModules.external.cornerstone;
  var targetImage = cornerstone.getEnabledElement(targetElement).image;
  var referenceImage = cornerstone.getEnabledElement(referenceElement).image;

  // Make sure the images are actually loaded for the target and reference
  if (!targetImage || !referenceImage) {
    return;
  }

  var targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImage.imageId);
  var referenceImagePlane = cornerstone.metaData.get('imagePlaneModule', referenceImage.imageId);

  // Make sure the target and reference actually have image plane metadata
  if (!targetImagePlane || !referenceImagePlane || !targetImagePlane.rowCosines || !targetImagePlane.columnCosines || !targetImagePlane.imagePositionPatient || !referenceImagePlane.rowCosines || !referenceImagePlane.columnCosines || !referenceImagePlane.imagePositionPatient) {
    return;
  }

  // The image planes must be in the same frame of reference
  if (targetImagePlane.frameOfReferenceUID !== referenceImagePlane.frameOfReferenceUID) {
    return;
  }

  // The image plane normals must be > 30 degrees apart
  var targetNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
  var referenceNormal = referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);
  var angleInRadians = targetNormal.angleTo(referenceNormal);

  angleInRadians = Math.abs(angleInRadians);
  if (angleInRadians < 0.5) {
    // 0.5 radians = ~30 degrees
    return;
  }

  var referenceLine = (0, _calculateReferenceLine2.default)(targetImagePlane, referenceImagePlane);

  if (!referenceLine) {
    return;
  }

  var refLineStartCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.start);
  var refLineEndCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.end);

  var color = _toolColors2.default.getActiveColor();
  var lineWidth = _toolStyle2.default.getToolWidth();

  // Draw the referenceLines
  context.setTransform(1, 0, 0, 1, 0, 0);

  context.save();
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.moveTo(refLineStartCanvas.x, refLineStartCanvas.y);
  context.lineTo(refLineEndCanvas.x, refLineEndCanvas.y);
  context.stroke();
  context.restore();
};

var _externalModules = __webpack_require__(0);

var _calculateReferenceLine = __webpack_require__(40);

var _calculateReferenceLine2 = _interopRequireDefault(_calculateReferenceLine);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOrientationString = __webpack_require__(65);

var _getOrientationString2 = _interopRequireDefault(_getOrientationString);

var _invertOrientationString = __webpack_require__(66);

var _invertOrientationString2 = _interopRequireDefault(_invertOrientationString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orientation = {
  getOrientationString: _getOrientationString2.default,
  invertOrientationString: _invertOrientationString2.default
};

exports.default = orientation;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (enabledElement, context, fontSize) {
  var fontScale = 0.1;

  _externalModules.external.cornerstone.setToPixelCoordinateSystem(enabledElement, context, fontScale);
  // Return the font size to use
  var scaledFontSize = fontSize / enabledElement.viewport.scale / fontScale;
  // TODO: actually calculate this?
  var lineHeight = fontSize / enabledElement.viewport.scale / fontScale;

  return {
    fontSize: scaledFontSize,
    lineHeight: lineHeight,
    fontScale: fontScale
  };
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, newImageIdIndex) {
  var toolData = (0, _toolState.getToolState)(element, 'stack');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // If we have more than one stack, check if we have a stack renderer defined
  var stackRenderer = void 0;

  if (toolData.data.length > 1) {
    var stackRendererData = (0, _toolState.getToolState)(element, 'stackRenderer');

    if (stackRendererData && stackRendererData.data && stackRendererData.data.length) {
      stackRenderer = stackRendererData.data[0];
    }
  }

  var stackData = toolData.data[0];

  // Allow for negative indexing
  if (newImageIdIndex < 0) {
    newImageIdIndex += stackData.imageIds.length;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  function doneCallback(image) {
    if (stackData.currentImageIdIndex !== newImageIdIndex) {
      return;
    }

    // Check if the element is still enabled in Cornerstone,
    // If an error is thrown, stop here.
    try {
      // TODO: Add 'isElementEnabled' to Cornerstone?
      cornerstone.getEnabledElement(element);
    } catch (error) {
      return;
    }

    if (stackRenderer) {
      stackRenderer.currentImageIdIndex = newImageIdIndex;
      stackRenderer.render(element, toolData.data);
    } else {
      cornerstone.displayImage(element, image);
    }

    if (endLoadingHandler) {
      endLoadingHandler(element, image);
    }
  }

  function failCallback(error) {
    var imageId = stackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(element, imageId, error);
    }
  }

  if (newImageIdIndex === stackData.currentImageIdIndex) {
    return;
  }

  if (startLoadingHandler) {
    startLoadingHandler(element);
  }

  var eventData = {
    newImageIdIndex: newImageIdIndex,
    direction: newImageIdIndex - stackData.currentImageIdIndex
  };

  stackData.currentImageIdIndex = newImageIdIndex;
  var newImageId = stackData.imageIds[newImageIdIndex];

  // Retry image loading in cases where previous image promise
  // Was rejected, if the option is set
  var config = _stackScroll.stackScroll.getConfiguration();

  if (config && config.retryLoadOnScroll === true) {
    var newImagePromise = cornerstone.imageCache.getImagePromise(newImageId);

    if (newImagePromise && newImagePromise.state() === 'rejected') {
      cornerstone.imageCache.removeImagePromise(newImageId);
    }
  }

  // Convert the preventCache value in stack data to a boolean
  var preventCache = Boolean(stackData.preventCache);

  var imagePromise = void 0;

  if (preventCache) {
    imagePromise = cornerstone.loadImage(newImageId);
  } else {
    imagePromise = cornerstone.loadAndCacheImage(newImageId);
  }

  imagePromise.then(doneCallback, failCallback);
  // Make sure we kick off any changed download request pools
  _requestPoolManager2.default.startGrabbing();

  (0, _triggerEvent2.default)(element, 'CornerstoneStackScroll', eventData);
};

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _requestPoolManager = __webpack_require__(28);

var _requestPoolManager2 = _interopRequireDefault(_requestPoolManager);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _stackScroll = __webpack_require__(45);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stackScrollMultiTouch = exports.stackScrollTouchDrag = exports.stackScrollWheel = exports.stackScroll = undefined;

var _externalModules = __webpack_require__(0);

var _touchDragTool = __webpack_require__(11);

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _multiTouchDragTool = __webpack_require__(29);

var _multiTouchDragTool2 = _interopRequireDefault(_multiTouchDragTool);

var _simpleMouseButtonTool = __webpack_require__(13);

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _mouseWheelTool = __webpack_require__(21);

var _mouseWheelTool2 = _interopRequireDefault(_mouseWheelTool);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _scroll = __webpack_require__(30);

var _scroll2 = _interopRequireDefault(_scroll);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mouseUpCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    var mouseDragEventData = {
      deltaY: 0
    };

    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', mouseDragEventData, dragCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);
    e.stopImmediatePropagation();

    return false;
  }
}

function mouseWheelCallback(e, eventData) {
  var images = -eventData.direction;

  var config = stackScroll.getConfiguration();

  var loop = false;

  if (config && config.loop) {
    loop = config.loop;
  }

  (0, _scroll2.default)(eventData.element, images, loop);
}

function dragCallback(e, eventData) {
  var element = eventData.element;

  var toolData = (0, _toolState.getToolState)(element, 'stack');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var stackData = toolData.data[0];

  var config = stackScroll.getConfiguration();

  // The Math.max here makes it easier to mouseDrag-scroll small or really large image stacks
  var pixelsPerImage = Math.max(2, _externalModules.external.$(element).height() / Math.max(stackData.imageIds.length, 8));

  if (config && config.stackScrollSpeed) {
    pixelsPerImage = config.stackScrollSpeed;
  }

  e.data.deltaY = e.data.deltaY || 0;
  e.data.deltaY += eventData.deltaPoints.page.y;
  if (Math.abs(e.data.deltaY) >= pixelsPerImage) {
    var imageDelta = e.data.deltaY / pixelsPerImage;
    var imageIdIndexOffset = Math.round(imageDelta);
    var imageDeltaMod = e.data.deltaY % pixelsPerImage;

    e.data.deltaY = imageDeltaMod;
    (0, _scroll2.default)(element, imageIdIndexOffset);
  }

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

// Module/private exports
var stackScroll = (0, _simpleMouseButtonTool2.default)(mouseDownCallback);
var stackScrollWheel = (0, _mouseWheelTool2.default)(mouseWheelCallback);

var options = {
  eventData: {
    deltaY: 0
  }
};
var stackScrollTouchDrag = (0, _touchDragTool2.default)(dragCallback, options);

function multiTouchDragCallback(e, eventData) {
  var config = stackScrollMultiTouch.getConfiguration();

  if (config && config.testPointers(eventData)) {
    dragCallback(e, eventData);
  }
}

var configuration = {
  testPointers: function testPointers(eventData) {
    return eventData.numPointers >= 3;
  }
};

var stackScrollMultiTouch = (0, _multiTouchDragTool2.default)(multiTouchDragCallback, options);

stackScrollMultiTouch.setConfiguration(configuration);

exports.stackScroll = stackScroll;
exports.stackScrollWheel = stackScrollWheel;
exports.stackScrollTouchDrag = stackScrollTouchDrag;
exports.stackScrollMultiTouch = stackScrollMultiTouch;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, x, y, width, height) {
  if (!element) {
    throw new Error('getLuminance: parameter element must not be undefined');
  }

  x = Math.round(x);
  y = Math.round(y);
  var enabledElement = _externalModules.external.cornerstone.getEnabledElement(element);
  var image = enabledElement.image;
  var luminance = [];
  var index = 0;
  var pixelData = image.getPixelData();
  var spIndex = void 0,
      row = void 0,
      column = void 0;

  if (image.color) {
    for (row = 0; row < height; row++) {
      for (column = 0; column < width; column++) {
        spIndex = ((row + y) * image.columns + (column + x)) * 4;
        var red = pixelData[spIndex];
        var green = pixelData[spIndex + 1];
        var blue = pixelData[spIndex + 2];

        luminance[index++] = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      }
    }
  } else {
    for (row = 0; row < height; row++) {
      for (column = 0; column < width; column++) {
        spIndex = (row + y) * image.columns + (column + x);
        luminance[index++] = pixelData[spIndex] * image.slope + image.intercept;
      }
    }
  }

  return luminance;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, x, y, w, h) {
  var kappa = 0.5522848,
      ox = w / 2 * kappa,
      // Control point offset horizontal
  oy = h / 2 * kappa,
      // Control point offset vertical
  xe = x + w,
      // X-end
  ye = y + h,
      // Y-end
  xm = x + w / 2,
      // X-middle
  ym = y + h / 2; // Y-middle

  context.beginPath();
  context.moveTo(x, ym);
  context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  context.closePath();
  context.stroke();
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, start, color, lineWidth) {
  var handleRadius = 6;

  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.arc(start.x, start.y, handleRadius, 0, 2 * Math.PI);
  context.stroke();
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, start, end, color, lineWidth) {
  // Variables to be used when creating the arrow
  var headLength = 10;

  var angle = Math.atan2(end.y - start.y, end.x - start.x);

  // Starting path of the arrow from the start square to the end square and drawing the stroke
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();

  // Starting a new path from the head of the arrow to one of the sides of the point
  context.beginPath();
  context.moveTo(end.x, end.y);
  context.lineTo(end.x - headLength * Math.cos(angle - Math.PI / 7), end.y - headLength * Math.sin(angle - Math.PI / 7));

  // Path from the side point of the arrow, to the other side point
  context.lineTo(end.x - headLength * Math.cos(angle + Math.PI / 7), end.y - headLength * Math.sin(angle + Math.PI / 7));

  // Path from the side point back to the tip of the arrow, and then again to the opposite side point
  context.lineTo(end.x, end.y);
  context.lineTo(end.x - headLength * Math.cos(angle - Math.PI / 7), end.y - headLength * Math.sin(angle - Math.PI / 7));

  // Draws the paths created above
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
  context.fillStyle = color;
  context.fill();
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sp, ellipse) {
  // TODO: Get a real statistics library here that supports large counts

  var sum = 0;
  var sumSquared = 0;
  var count = 0;
  var index = 0;

  for (var y = ellipse.top; y < ellipse.top + ellipse.height; y++) {
    for (var x = ellipse.left; x < ellipse.left + ellipse.width; x++) {
      var point = {
        x: x,
        y: y
      };

      if ((0, _pointInEllipse2.default)(ellipse, point)) {
        sum += sp[index];
        sumSquared += sp[index] * sp[index];
        count++;
      }

      index++;
    }
  }

  if (count === 0) {
    return {
      count: count,
      mean: 0.0,
      variance: 0.0,
      stdDev: 0.0
    };
  }

  var mean = sum / count;
  var variance = sumSquared / count - mean * mean;

  return {
    count: count,
    mean: mean,
    variance: variance,
    stdDev: Math.sqrt(variance)
  };
};

var _pointInEllipse = __webpack_require__(32);

var _pointInEllipse2 = _interopRequireDefault(_pointInEllipse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (keyDownCallback) {
  var configuration = {};

  var toolInterface = {
    activate: function activate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsKeyDown', keyDownCallback);
      _externalModules.external.$(element).on('CornerstoneToolsKeyDown', keyDownCallback);
    },
    disable: function disable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsKeyDown', keyDownCallback);
    },
    enable: function enable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsKeyDown', keyDownCallback);
    },
    deactivate: function deactivate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsKeyDown', keyDownCallback);
    },
    getConfiguration: function getConfiguration() {
      return configuration;
    },
    setConfiguration: function setConfiguration(config) {
      configuration = config;
    }
  };

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchEventData, data, toolData, toolType, deleteIfHandleOutsideImage, doneMovingCallback) {
  var element = touchEventData.element;
  var cornerstone = _externalModules.external.cornerstone;

  function touchDragCallback(e, eventData) {
    data.active = true;

    Object.keys(data.handles).forEach(function (name) {
      var handle = data.handles[name];

      if (handle.movesIndependently === true) {
        return;
      }

      handle.x += eventData.deltaPoints.image.x;
      handle.y += eventData.deltaPoints.image.y;
    });
    cornerstone.updateImage(element);

    var eventType = 'CornerstoneToolsMeasurementModified';
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }

  _externalModules.external.$(element).on('CornerstoneToolsTouchDrag', touchDragCallback);

  function touchEndCallback(e, eventData) {
    // Console.log('touchMoveAllHandles touchEndCallback: ' + e.type);
    data.active = false;
    data.invalidated = false;

    _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', touchDragCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchPinch', touchEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchPress', touchEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchEnd', touchEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsDragEnd', touchEndCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', touchEndCallback);

    // If any handle is outside the image, delete the tool data
    if (deleteIfHandleOutsideImage === true && (0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
      (0, _toolState.removeToolState)(element, toolType, data);
    }

    cornerstone.updateImage(element);

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback(e, eventData);
    }
  }

  _externalModules.external.$(element).on('CornerstoneToolsTouchPinch', touchEndCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTouchPress', touchEndCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTouchEnd', touchEndCallback);
  _externalModules.external.$(element).on('CornerstoneToolsDragEnd', touchEndCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTap', touchEndCallback);

  return true;
};

var _externalModules = __webpack_require__(0);

var _anyHandlesOutsideImage = __webpack_require__(12);

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _toolState = __webpack_require__(1);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchEventData, toolType, data, handle, doneMovingCallback) {
  // Console.log('touchMoveHandle');
  runAnimation.value = true;

  var cornerstone = _externalModules.external.cornerstone;
  var element = touchEventData.element;
  var enabledElement = cornerstone.getEnabledElement(element);

  var time = new Date().getTime();

  // Average pixel width of index finger is 45-57 pixels
  // https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/
  var fingerDistance = -57;

  var aboveFinger = {
    x: touchEventData.currentPoints.page.x,
    y: touchEventData.currentPoints.page.y + fingerDistance
  };

  var targetLocation = cornerstone.pageToPixel(element, aboveFinger.x, aboveFinger.y);

  function touchDragCallback(e, eventData) {
    // Console.log('touchMoveHandle touchDragCallback: ' + e.type);
    runAnimation.value = false;

    if (handle.hasMoved === false) {
      handle.hasMoved = true;
    }

    handle.active = true;

    var currentPoints = eventData.currentPoints;
    var aboveFinger = {
      x: currentPoints.page.x,
      y: currentPoints.page.y + fingerDistance
    };

    targetLocation = cornerstone.pageToPixel(element, aboveFinger.x, aboveFinger.y);
    handle.x = targetLocation.x;
    handle.y = targetLocation.y;

    cornerstone.updateImage(element);

    var eventType = 'CornerstoneToolsMeasurementModified';
    var modifiedEventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, modifiedEventData);
  }

  _externalModules.external.$(element).on('CornerstoneToolsTouchDrag', touchDragCallback);

  function touchEndCallback(e, eventData) {
    // Console.log('touchMoveHandle touchEndCallback: ' + e.type);
    runAnimation.value = false;

    handle.active = false;
    _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', touchDragCallback);
    _externalModules.external.$(element).off(touchEndEvents, touchEndCallback);

    cornerstone.updateImage(element);

    if (e.type === 'CornerstoneToolsTouchPress') {
      eventData.handlePressed = data;

      handle.x = touchEventData.currentPoints.image.x;
      handle.y = touchEventData.currentPoints.image.y;
    }

    if (typeof doneMovingCallback === 'function') {
      doneMovingCallback(e, eventData);
    }
  }

  _externalModules.external.$(element).on(touchEndEvents, touchEndCallback);

  animate(time, handle, runAnimation, enabledElement, targetLocation);
};

var _externalModules = __webpack_require__(0);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Define the runAnimation boolean as an object
 * so that it can be modified by reference
 */
var runAnimation = {
  value: false
};

var touchEndEvents = ['CornerstoneToolsTouchEnd', 'CornerstoneToolsDragEnd', 'CornerstoneToolsTouchPinch', 'CornerstoneToolsTouchPress', 'CornerstoneToolsTap'].join(' ');

function animate(lastTime, handle, runAnimation, enabledElement, targetLocation) {
  // See http://www.html5canvastutorials.com/advanced/html5-canvas-start-and-stop-an-animation/
  if (!runAnimation.value) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // Update
  var time = new Date().getTime();
  // Var timeDiff = time - lastTime;

  // Pixels / second
  var distanceRemaining = Math.abs(handle.y - targetLocation.y);
  var linearDistEachFrame = distanceRemaining / 10;

  console.log('distanceRemaining: ' + distanceRemaining);
  if (distanceRemaining < 1) {
    handle.y = targetLocation.y;
    runAnimation.value = false;

    return;
  }

  if (handle.y > targetLocation.y) {
    handle.y -= linearDistEachFrame;
  } else if (handle.y < targetLocation.y) {
    handle.y += linearDistEachFrame;
  }

  // Update the image
  cornerstone.updateImage(enabledElement.element);

  // Request a new frame
  cornerstone.requestAnimationFrame(function () {
    animate(time, handle, runAnimation, enabledElement, targetLocation);
  });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

// Functions to prevent ghost clicks following a touch
// All credit to @kosich
// https://gist.github.com/kosich/23188dd86633b6c2efb7

var antiGhostDelay = 2000,
    pointerType = {
  mouse: 0,
  touch: 1
};

var lastInteractionType = void 0,
    lastInteractionTime = void 0;

function handleTap(type, e) {
  var now = Date.now();

  if (type !== lastInteractionType) {
    if (now - lastInteractionTime <= antiGhostDelay) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      return false;
    }

    lastInteractionType = type;
  }

  lastInteractionTime = now;
}

// Cacheing the function references
// Necessary because a new function reference is created after .bind() is called
// http://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind
var handleTapMouse = handleTap.bind(null, pointerType.mouse);
var handleTapTouch = handleTap.bind(null, pointerType.touch);

function attachEvents(element, eventList, interactionType) {
  var tapHandler = interactionType ? handleTapMouse : handleTapTouch;

  eventList.forEach(function (eventName) {
    _externalModules.external.$(element).on(eventName, tapHandler);
  });
}

function removeEvents(element, eventList, interactionType) {
  var tapHandler = interactionType ? handleTapMouse : handleTapTouch;

  eventList.forEach(function (eventName) {
    _externalModules.external.$(element).off(eventName, tapHandler);
  });
}

var mouseEvents = ['mousedown', 'mouseup'];
var touchEvents = ['touchstart', 'touchend'];

function disable(element) {
  removeEvents(element, mouseEvents, pointerType.mouse);
  removeEvents(element, touchEvents, pointerType.touch);
}

function enable(element) {
  disable(element);
  attachEvents(element, mouseEvents, pointerType.mouse);
  attachEvents(element, touchEvents, pointerType.touch);
}

var preventGhostClick = {
  enable: enable,
  disable: disable
};

exports.default = preventGhostClick;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (doubleTapCallback) {
  return {
    activate: function activate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsDoubleTap', doubleTapCallback);
      var eventData = {};

      _externalModules.external.$(element).on('CornerstoneToolsDoubleTap', eventData, doubleTapCallback);
    },
    disable: function disable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsDoubleTap', doubleTapCallback);
    },
    enable: function enable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsDoubleTap', doubleTapCallback);
    },
    deactivate: function deactivate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsDoubleTap', doubleTapCallback);
    }
  };
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mouseToolInterface, preventHandleOutsideImage) {
  // /////// BEGIN ACTIVE TOOL ///////
  function addNewMeasurement(mouseEventData) {
    var measurementData = mouseToolInterface.createNewMeasurement(mouseEventData);

    // Prevent adding new measurement if tool returns nill
    if (!measurementData) {
      return;
    }

    // Associate this data with this imageId so we can render it and manipulate it
    (0, _toolState.addToolState)(mouseEventData.element, mouseToolInterface.toolType, measurementData);

    // Since we are dragging to another place to drop the end point, we can just activate
    // The end point and let the moveHandle move it for us.
    _externalModules.external.$(mouseEventData.element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
    (0, _moveHandle2.default)(mouseEventData, mouseToolInterface.toolType, measurementData, measurementData.handles.end, function () {
      measurementData.active = false;
      if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(mouseEventData.element, mouseToolInterface.toolType, measurementData);
      }

      _externalModules.external.$(mouseEventData.element).on('CornerstoneToolsMouseMove', mouseMoveCallback);
    }, preventHandleOutsideImage);
  }

  function mouseDownActivateCallback(e, eventData) {
    if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
      addNewMeasurement(eventData);

      return false; // False = cases jquery to preventDefault() and stopPropagation() this event
    }
  }
  // /////// END ACTIVE TOOL ///////

  // /////// BEGIN DEACTIVE TOOL ///////

  function mouseMoveCallback(e, eventData) {
    _toolCoordinates2.default.setCoords(eventData);
    // If a mouse button is down, do nothing
    if (eventData.which !== 0) {
      return;
    }

    // If we have no tool data for this element, do nothing
    var toolData = (0, _toolState.getToolState)(eventData.element, mouseToolInterface.toolType);

    if (toolData === undefined) {
      return;
    }

    // We have tool data, search through all data
    // And see if we can activate a handle
    var imageNeedsUpdate = false;
    var coords = eventData.currentPoints.canvas;

    for (var i = 0; i < toolData.data.length; i++) {
      // Get the cursor position in image coordinates
      var data = toolData.data[i];

      if ((0, _handleActivator2.default)(eventData.element, data.handles, coords) === true) {
        imageNeedsUpdate = true;
      }

      if (mouseToolInterface.pointInsideRect(eventData.element, data, coords) && !data.active || !mouseToolInterface.pointInsideRect(eventData.element, data, coords) && data.active) {
        data.active = !data.active;
        imageNeedsUpdate = true;
      }
    }

    // Handle activation status changed, redraw the image
    if (imageNeedsUpdate === true) {
      _externalModules.external.cornerstone.updateImage(eventData.element);
    }
  }

  function mouseDownCallback(e, eventData) {
    var cornerstone = _externalModules.external.cornerstone;
    var data = void 0;

    function handleDoneMove() {
      data.active = false;
      if ((0, _anyHandlesOutsideImage2.default)(eventData, data.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(eventData.element, mouseToolInterface.toolType, data);
      }

      cornerstone.updateImage(eventData.element);
      _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseMove', mouseMoveCallback);
    }

    if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
      var coords = eventData.startPoints.canvas;
      var toolData = (0, _toolState.getToolState)(e.currentTarget, mouseToolInterface.toolType);

      var i = void 0;

      // Now check to see if there is a handle we can move
      var distanceSq = 25;

      if (toolData !== undefined) {
        for (i = 0; i < toolData.data.length; i++) {
          data = toolData.data[i];
          var handle = (0, _getHandleNearImagePoint2.default)(eventData.element, data.handles, coords, distanceSq);

          if (handle !== undefined) {
            _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
            data.active = true;
            (0, _moveHandle2.default)(eventData, mouseToolInterface.toolType, data, handle, handleDoneMove, preventHandleOutsideImage);
            e.stopImmediatePropagation();

            return false;
          }
        }
      }

      // Now check to see if there is a line we can move
      // Now check to see if we have a tool that we can move
      var options = {
        deleteIfHandleOutsideImage: true,
        preventHandleOutsideImage: preventHandleOutsideImage
      };

      if (toolData !== undefined && mouseToolInterface.pointInsideRect !== undefined) {
        for (i = 0; i < toolData.data.length; i++) {
          data = toolData.data[i];
          if (mouseToolInterface.pointInsideRect(eventData.element, data, coords)) {
            _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
            (0, _moveAllHandles2.default)(e, data, toolData, mouseToolInterface.toolType, options, handleDoneMove);
            _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseMove', mouseMoveCallback);
            e.stopImmediatePropagation();

            return false;
          }
        }
      }
    }
  }
  // /////// END DEACTIVE TOOL ///////

  // Note: This is to maintain compatibility for developers that have
  // Built on top of mouseButtonRectangleTool.js
  // TODO: Remove this after we migrate Cornerstone Tools away from jQuery
  function onImageRendered(e) {
    mouseToolInterface.onImageRendered(e, e.detail);
  }

  // Not visible, not interactive
  function disable(element) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownActivateCallback);

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Visible but not interactive
  function enable(element) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownActivateCallback);

    element.addEventListener('cornerstoneimagerendered', onImageRendered);

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Visible, interactive and can create
  function activate(element, mouseButtonMask) {
    var eventData = {
      mouseButtonMask: mouseButtonMask
    };

    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownActivateCallback);

    element.addEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).on('CornerstoneToolsMouseMove', eventData, mouseMoveCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseDownCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDownActivate', eventData, mouseDownActivateCallback);

    _externalModules.external.cornerstone.updateImage(element);
  }

  // Visible, interactive
  function deactivate(element, mouseButtonMask) {
    var eventData = {
      mouseButtonMask: mouseButtonMask
    };

    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownActivateCallback);

    element.addEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).on('CornerstoneToolsMouseMove', eventData, mouseMoveCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseDownCallback);

    _externalModules.external.cornerstone.updateImage(element);
  }

  var toolInterface = {
    enable: enable,
    disable: disable,
    activate: activate,
    deactivate: deactivate
  };

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

var _toolCoordinates = __webpack_require__(36);

var _toolCoordinates2 = _interopRequireDefault(_toolCoordinates);

var _getHandleNearImagePoint = __webpack_require__(18);

var _getHandleNearImagePoint2 = _interopRequireDefault(_getHandleNearImagePoint);

var _handleActivator = __webpack_require__(37);

var _handleActivator2 = _interopRequireDefault(_handleActivator);

var _moveHandle = __webpack_require__(22);

var _moveHandle2 = _interopRequireDefault(_moveHandle);

var _moveAllHandles = __webpack_require__(38);

var _moveAllHandles2 = _interopRequireDefault(_moveAllHandles);

var _anyHandlesOutsideImage = __webpack_require__(12);

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (touchPinchCallback) {
  var toolInterface = {
    activate: function activate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsTouchPinch', touchPinchCallback);
      var eventData = {};

      _externalModules.external.$(element).on('CornerstoneToolsTouchPinch', eventData, touchPinchCallback);
    },
    disable: function disable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsTouchPinch', touchPinchCallback);
    },
    enable: function enable(element) {
      _externalModules.external.$(element).off('CornerstoneToolsTouchPinch', touchPinchCallback);
    },
    deactivate: function deactivate(element) {
      _externalModules.external.$(element).off('CornerstoneToolsTouchPinch', touchPinchCallback);
    }
  };

  return toolInterface;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (brushToolInterface) {
  function mouseMoveCallback(e, eventData) {
    brushToolInterface.onMouseMove(e, eventData);
  }

  function mouseUpCallback(e, eventData) {
    brushToolInterface.onMouseUp(e, eventData);

    _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', mouseMoveCallback);
    _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);
    _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
  }

  function dragCallback(e, eventData) {
    brushToolInterface.onDrag(e, eventData);

    return false;
  }

  function mouseDownActivateCallback(e, eventData) {
    if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
      _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', dragCallback);
      _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
      _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);
      brushToolInterface.onMouseDown(e, eventData);

      return false;
    }

    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', mouseMoveCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
  }

  function onImageRendered(e) {
    var eventData = e.detail;
    var element = eventData.element;
    var toolData = (0, _toolState.getToolState)(element, TOOL_STATE_TOOL_TYPE);
    var pixelData = void 0;

    if (toolData) {
      pixelData = toolData.data[0].pixelData;
    } else {
      pixelData = new Uint8ClampedArray(eventData.image.width * eventData.image.height);
      (0, _toolState.addToolState)(element, TOOL_STATE_TOOL_TYPE, { pixelData: pixelData });
    }

    var layer = _externalModules.external.cornerstone.getLayer(eventData.element, brushLayerId);

    layer.image.setPixelData(pixelData);
    layer.invalid = true;

    _externalModules.external.cornerstone.updateImage(element);

    // Note: This is to maintain compatibility with jQuery event handlers.
    // On our next migration this should just be onImageRendered(e)
    brushToolInterface.onImageRendered(e, eventData);
  }

  function activate(element, mouseButtonMask) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    element.addEventListener('cornerstoneimagerendered', onImageRendered);

    var eventData = {
      mouseButtonMask: mouseButtonMask
    };

    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownActivateCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDownActivate', eventData, mouseDownActivateCallback);

    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseMove', mouseMoveCallback);

    var enabledElement = _externalModules.external.cornerstone.getEnabledElement(element);
    var _enabledElement$image = enabledElement.image,
        width = _enabledElement$image.width,
        height = _enabledElement$image.height;

    var pixelData = new Uint8ClampedArray(width * height);

    var configuration = brushTool.getConfiguration();
    var colormapId = configuration.colormapId;

    if (!colormapId) {
      colormapId = 'BrushColorMap';

      var colormap = _externalModules.external.cornerstone.colors.getColormap(colormapId);

      colormap.setNumberOfColors(2);
      colormap.setColor(0, [0, 0, 0, 0]);
      colormap.setColor(1, [255, 0, 0, 255]);
    }

    var labelMapImage = {
      minPixelValue: 0,
      maxPixelValue: 1,
      slope: 1.0,
      intercept: 0,
      getPixelData: function getPixelData() {
        return pixelData;
      },
      rows: enabledElement.image.height,
      columns: enabledElement.image.width,
      height: height,
      width: width,
      pixelData: pixelData,
      setPixelData: function setPixelData(data) {
        pixelData = data;
      },
      colormap: colormapId,
      color: false,
      rgba: false,
      labelmap: true,
      invert: false,
      columnPixelSpacing: 1.0,
      rowPixelSpacing: 1.0,
      sizeInBytes: enabledElement.image.width * enabledElement.image.height
    };

    var layer = void 0;
    var options = {
      viewport: {
        pixelReplication: true
      }
    };

    if (brushLayerId) {
      layer = _externalModules.external.cornerstone.getLayer(element, brushLayerId);
    }

    if (!layer) {
      brushLayerId = _externalModules.external.cornerstone.addLayer(element, labelMapImage, options);
    }

    (0, _toolState.addToolState)(element, TOOL_STATE_TOOL_TYPE, { pixelData: pixelData });

    configuration.brushLayerId = brushLayerId;
    brushTool.setConfiguration(configuration);

    _externalModules.external.cornerstone.updateImage(element);
  }

  function deactivate(element) {
    element.removeEventListener('cornerstoneimagerendered', onImageRendered);
    _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', mouseDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
  }

  var brushTool = (0, _mouseButtonTool2.default)({
    mouseMoveCallback: mouseMoveCallback,
    mouseDownActivateCallback: mouseDownActivateCallback,
    onImageRendered: onImageRendered,
    deactivate: deactivate
  });

  brushTool.activate = activate;

  return brushTool;
};

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOOL_STATE_TOOL_TYPE = 'brush';
var brushLayerId = void 0;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCircle;
function getCircle(radius, rows, columns) {
  var xCoord = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var yCoord = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var x0 = Math.round(xCoord);
  var y0 = Math.round(yCoord);

  if (radius === 1) {
    return [[x0, y0]];
  }

  var circleArray = [];
  var index = 0;

  for (var y = -radius; y <= radius; y++) {
    var _yCoord = y0 + y;

    if (_yCoord > rows || _yCoord < 0) {
      continue;
    }

    for (var x = -radius; x <= radius; x++) {
      var _xCoord = x0 + x;

      if (_xCoord > columns || _xCoord < 0) {
        continue;
      }

      if (x * x + y * y < radius * radius) {
        circleArray[index++] = [x0 + x, y0 + y];
      }
    }
  }

  return circleArray;
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBrushOnCanvas = exports.drawBrushPixels = undefined;

var _externalModules = __webpack_require__(0);

function drawBrushPixels(pointerArray, storedPixels, brushPixelValue, columns) {
  var getPixelIndex = function getPixelIndex(x, y) {
    return y * columns + x;
  };

  pointerArray.forEach(function (point) {
    var spIndex = getPixelIndex(point[0], point[1]);

    storedPixels[spIndex] = brushPixelValue;
  });
}

function drawBrushOnCanvas(pointerArray, canvasContext, color, element) {
  var canvasPtTL = _externalModules.external.cornerstone.pixelToCanvas(element, { x: 0,
    y: 0 });
  var canvasPtBR = _externalModules.external.cornerstone.pixelToCanvas(element, { x: 1,
    y: 1 });
  var sizeX = canvasPtBR.x - canvasPtTL.x;
  var sizeY = canvasPtBR.y - canvasPtTL.y;

  canvasContext.save();
  canvasContext.fillStyle = color;

  pointerArray.forEach(function (point) {
    var canvasPt = _externalModules.external.cornerstone.pixelToCanvas(element, {
      x: point[0],
      y: point[1]
    });

    canvasContext.fillRect(canvasPt.x, canvasPt.y, sizeX, sizeY);
  });

  canvasContext.restore();
}

exports.drawBrushPixels = drawBrushPixels;
exports.drawBrushOnCanvas = drawBrushOnCanvas;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

Object.defineProperty(exports, 'external', {
  enumerable: true,
  get: function get() {
    return _externalModules.external;
  }
});

var _index = __webpack_require__(63);

Object.defineProperty(exports, 'referenceLines', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _index2 = __webpack_require__(42);

Object.defineProperty(exports, 'orientation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index2).default;
  }
});

var _requestPoolManager = __webpack_require__(28);

Object.defineProperty(exports, 'requestPoolManager', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_requestPoolManager).default;
  }
});

var _setContextToDisplayFontSize = __webpack_require__(43);

Object.defineProperty(exports, 'setContextToDisplayFontSize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_setContextToDisplayFontSize).default;
  }
});

var _scrollToIndex = __webpack_require__(44);

Object.defineProperty(exports, 'scrollToIndex', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scrollToIndex).default;
  }
});

var _scroll = __webpack_require__(30);

Object.defineProperty(exports, 'scroll', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scroll).default;
  }
});

var _roundToDecimal = __webpack_require__(31);

Object.defineProperty(exports, 'roundToDecimal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_roundToDecimal).default;
  }
});

var _pointProjector = __webpack_require__(27);

Object.defineProperty(exports, 'projectPatientPointToImagePlane', {
  enumerable: true,
  get: function get() {
    return _pointProjector.projectPatientPointToImagePlane;
  }
});
Object.defineProperty(exports, 'imagePointToPatientPoint', {
  enumerable: true,
  get: function get() {
    return _pointProjector.imagePointToPatientPoint;
  }
});
Object.defineProperty(exports, 'planePlaneIntersection', {
  enumerable: true,
  get: function get() {
    return _pointProjector.planePlaneIntersection;
  }
});

var _pointInsideBoundingBox = __webpack_require__(16);

Object.defineProperty(exports, 'pointInsideBoundingBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pointInsideBoundingBox).default;
  }
});

var _pointInEllipse = __webpack_require__(32);

Object.defineProperty(exports, 'pointInEllipse', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pointInEllipse).default;
  }
});

var _pauseEvent = __webpack_require__(33);

Object.defineProperty(exports, 'pauseEvent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pauseEvent).default;
  }
});

var _isMouseButtonEnabled = __webpack_require__(2);

Object.defineProperty(exports, 'isMouseButtonEnabled', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isMouseButtonEnabled).default;
  }
});

var _getRGBPixels = __webpack_require__(34);

Object.defineProperty(exports, 'getRGBPixels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getRGBPixels).default;
  }
});

var _getMaxSimultaneousRequests = __webpack_require__(20);

Object.defineProperty(exports, 'getDefaultSimultaneousRequests', {
  enumerable: true,
  get: function get() {
    return _getMaxSimultaneousRequests.getDefaultSimultaneousRequests;
  }
});
Object.defineProperty(exports, 'getMaxSimultaneousRequests', {
  enumerable: true,
  get: function get() {
    return _getMaxSimultaneousRequests.getMaxSimultaneousRequests;
  }
});
Object.defineProperty(exports, 'getBrowserInfo', {
  enumerable: true,
  get: function get() {
    return _getMaxSimultaneousRequests.getBrowserInfo;
  }
});
Object.defineProperty(exports, 'isMobileDevice', {
  enumerable: true,
  get: function get() {
    return _getMaxSimultaneousRequests.isMobileDevice;
  }
});

var _getLuminance = __webpack_require__(46);

Object.defineProperty(exports, 'getLuminance', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getLuminance).default;
  }
});

var _drawTextBox = __webpack_require__(6);

Object.defineProperty(exports, 'drawTextBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawTextBox).default;
  }
});

var _drawEllipse = __webpack_require__(47);

Object.defineProperty(exports, 'drawEllipse', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawEllipse).default;
  }
});

var _drawCircle = __webpack_require__(48);

Object.defineProperty(exports, 'drawCircle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawCircle).default;
  }
});

var _drawArrow = __webpack_require__(49);

Object.defineProperty(exports, 'drawArrow', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawArrow).default;
  }
});

var _copyPoints = __webpack_require__(35);

Object.defineProperty(exports, 'copyPoints', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_copyPoints).default;
  }
});

var _calculateSUV = __webpack_require__(17);

Object.defineProperty(exports, 'calculateSUV', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_calculateSUV).default;
  }
});

var _calculateEllipseStatistics = __webpack_require__(50);

Object.defineProperty(exports, 'calculateEllipseStatistics', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_calculateEllipseStatistics).default;
  }
});

var _probeTool4D = __webpack_require__(67);

Object.defineProperty(exports, 'probeTool4D', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_probeTool4D).default;
  }
});

var _incrementTimePoint = __webpack_require__(39);

Object.defineProperty(exports, 'incrementTimePoint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_incrementTimePoint).default;
  }
});

var _timeSeriesPlayer = __webpack_require__(70);

Object.defineProperty(exports, 'timeSeriesPlayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timeSeriesPlayer).default;
  }
});

var _timeSeriesScroll = __webpack_require__(71);

Object.defineProperty(exports, 'timeSeriesScroll', {
  enumerable: true,
  get: function get() {
    return _timeSeriesScroll.timeSeriesScroll;
  }
});
Object.defineProperty(exports, 'timeSeriesScrollWheel', {
  enumerable: true,
  get: function get() {
    return _timeSeriesScroll.timeSeriesScrollWheel;
  }
});
Object.defineProperty(exports, 'timeSeriesScrollTouchDrag', {
  enumerable: true,
  get: function get() {
    return _timeSeriesScroll.timeSeriesScrollTouchDrag;
  }
});

var _wwwcSynchronizer = __webpack_require__(72);

Object.defineProperty(exports, 'wwwcSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_wwwcSynchronizer).default;
  }
});

var _updateImageSynchronizer = __webpack_require__(73);

Object.defineProperty(exports, 'updateImageSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_updateImageSynchronizer).default;
  }
});

var _Synchronizer = __webpack_require__(74);

Object.defineProperty(exports, 'Synchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Synchronizer).default;
  }
});

var _stackScrollSynchronizer = __webpack_require__(75);

Object.defineProperty(exports, 'stackScrollSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackScrollSynchronizer).default;
  }
});

var _stackImagePositionSynchronizer = __webpack_require__(76);

Object.defineProperty(exports, 'stackImagePositionSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackImagePositionSynchronizer).default;
  }
});

var _stackImagePositionOffsetSynchronizer = __webpack_require__(77);

Object.defineProperty(exports, 'stackImagePositionOffsetSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackImagePositionOffsetSynchronizer).default;
  }
});

var _stackImageIndexSynchronizer = __webpack_require__(78);

Object.defineProperty(exports, 'stackImageIndexSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackImageIndexSynchronizer).default;
  }
});

var _panZoomSynchronizer = __webpack_require__(79);

Object.defineProperty(exports, 'panZoomSynchronizer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_panZoomSynchronizer).default;
  }
});

var _toolStyle = __webpack_require__(5);

Object.defineProperty(exports, 'toolStyle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toolStyle).default;
  }
});

var _toolState = __webpack_require__(1);

Object.defineProperty(exports, 'addToolState', {
  enumerable: true,
  get: function get() {
    return _toolState.addToolState;
  }
});
Object.defineProperty(exports, 'getToolState', {
  enumerable: true,
  get: function get() {
    return _toolState.getToolState;
  }
});
Object.defineProperty(exports, 'removeToolState', {
  enumerable: true,
  get: function get() {
    return _toolState.removeToolState;
  }
});
Object.defineProperty(exports, 'clearToolState', {
  enumerable: true,
  get: function get() {
    return _toolState.clearToolState;
  }
});
Object.defineProperty(exports, 'setElementToolStateManager', {
  enumerable: true,
  get: function get() {
    return _toolState.setElementToolStateManager;
  }
});
Object.defineProperty(exports, 'getElementToolStateManager', {
  enumerable: true,
  get: function get() {
    return _toolState.getElementToolStateManager;
  }
});

var _toolCoordinates = __webpack_require__(36);

Object.defineProperty(exports, 'toolCoordinates', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toolCoordinates).default;
  }
});

var _toolColors = __webpack_require__(4);

Object.defineProperty(exports, 'toolColors', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toolColors).default;
  }
});

var _timeSeriesSpecificStateManager = __webpack_require__(80);

Object.defineProperty(exports, 'addTimeSeriesStateManager', {
  enumerable: true,
  get: function get() {
    return _timeSeriesSpecificStateManager.addTimeSeriesStateManager;
  }
});
Object.defineProperty(exports, 'newTimeSeriesSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _timeSeriesSpecificStateManager.newTimeSeriesSpecificToolStateManager;
  }
});

var _textStyle = __webpack_require__(14);

Object.defineProperty(exports, 'textStyle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_textStyle).default;
  }
});

var _stackSpecificStateManager = __webpack_require__(81);

Object.defineProperty(exports, 'stackSpecificStateManager', {
  enumerable: true,
  get: function get() {
    return _stackSpecificStateManager.stackSpecificStateManager;
  }
});
Object.defineProperty(exports, 'newStackSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _stackSpecificStateManager.newStackSpecificToolStateManager;
  }
});
Object.defineProperty(exports, 'addStackStateManager', {
  enumerable: true,
  get: function get() {
    return _stackSpecificStateManager.addStackStateManager;
  }
});

var _loadHandlerManager = __webpack_require__(10);

Object.defineProperty(exports, 'loadHandlerManager', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_loadHandlerManager).default;
  }
});

var _imageIdSpecificStateManager = __webpack_require__(15);

Object.defineProperty(exports, 'newImageIdSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _imageIdSpecificStateManager.newImageIdSpecificToolStateManager;
  }
});
Object.defineProperty(exports, 'globalImageIdSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }
});

var _frameOfReferenceStateManager = __webpack_require__(82);

Object.defineProperty(exports, 'newFrameOfReferenceSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _frameOfReferenceStateManager.newFrameOfReferenceSpecificToolStateManager;
  }
});
Object.defineProperty(exports, 'globalFrameOfReferenceSpecificToolStateManager', {
  enumerable: true,
  get: function get() {
    return _frameOfReferenceStateManager.globalFrameOfReferenceSpecificToolStateManager;
  }
});

var _appState = __webpack_require__(83);

Object.defineProperty(exports, 'appState', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_appState).default;
  }
});

var _stackScrollKeyboard = __webpack_require__(84);

Object.defineProperty(exports, 'stackScrollKeyboard', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackScrollKeyboard).default;
  }
});

var _stackScroll = __webpack_require__(45);

Object.defineProperty(exports, 'stackScroll', {
  enumerable: true,
  get: function get() {
    return _stackScroll.stackScroll;
  }
});
Object.defineProperty(exports, 'stackScrollWheel', {
  enumerable: true,
  get: function get() {
    return _stackScroll.stackScrollWheel;
  }
});
Object.defineProperty(exports, 'stackScrollTouchDrag', {
  enumerable: true,
  get: function get() {
    return _stackScroll.stackScrollTouchDrag;
  }
});
Object.defineProperty(exports, 'stackScrollMultiTouch', {
  enumerable: true,
  get: function get() {
    return _stackScroll.stackScrollMultiTouch;
  }
});

var _stackPrefetch = __webpack_require__(85);

Object.defineProperty(exports, 'stackPrefetch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackPrefetch).default;
  }
});

var _scrollIndicator = __webpack_require__(86);

Object.defineProperty(exports, 'scrollIndicator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scrollIndicator).default;
  }
});

var _stackRenderers = __webpack_require__(87);

Object.defineProperty(exports, 'stackRenderers', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stackRenderers).default;
  }
});

var _playClip = __webpack_require__(89);

Object.defineProperty(exports, 'playClip', {
  enumerable: true,
  get: function get() {
    return _playClip.playClip;
  }
});
Object.defineProperty(exports, 'stopClip', {
  enumerable: true,
  get: function get() {
    return _playClip.stopClip;
  }
});

var _anyHandlesOutsideImage = __webpack_require__(12);

Object.defineProperty(exports, 'anyHandlesOutsideImage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_anyHandlesOutsideImage).default;
  }
});

var _drawHandles = __webpack_require__(8);

Object.defineProperty(exports, 'drawHandles', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawHandles).default;
  }
});

var _getHandleNearImagePoint = __webpack_require__(18);

Object.defineProperty(exports, 'getHandleNearImagePoint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getHandleNearImagePoint).default;
  }
});

var _handleActivator = __webpack_require__(37);

Object.defineProperty(exports, 'handleActivator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_handleActivator).default;
  }
});

var _moveAllHandles = __webpack_require__(38);

Object.defineProperty(exports, 'moveAllHandles', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveAllHandles).default;
  }
});

var _moveHandle = __webpack_require__(22);

Object.defineProperty(exports, 'moveHandle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveHandle).default;
  }
});

var _moveNewHandle = __webpack_require__(23);

Object.defineProperty(exports, 'moveNewHandle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveNewHandle).default;
  }
});

var _moveNewHandleTouch = __webpack_require__(25);

Object.defineProperty(exports, 'moveNewHandleTouch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveNewHandleTouch).default;
  }
});

var _touchMoveAllHandles = __webpack_require__(52);

Object.defineProperty(exports, 'touchMoveAllHandles', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchMoveAllHandles).default;
  }
});

var _touchMoveHandle = __webpack_require__(53);

Object.defineProperty(exports, 'touchMoveHandle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchMoveHandle).default;
  }
});

var _keyboardInput = __webpack_require__(90);

Object.defineProperty(exports, 'keyboardInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_keyboardInput).default;
  }
});

var _mouseInput = __webpack_require__(91);

Object.defineProperty(exports, 'mouseInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseInput).default;
  }
});

var _mouseWheelInput = __webpack_require__(92);

Object.defineProperty(exports, 'mouseWheelInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseWheelInput).default;
  }
});

var _preventGhostClick = __webpack_require__(54);

Object.defineProperty(exports, 'preventGhostClick', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_preventGhostClick).default;
  }
});

var _touchInput = __webpack_require__(93);

Object.defineProperty(exports, 'touchInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchInput).default;
  }
});

var _angleTool = __webpack_require__(94);

Object.defineProperty(exports, 'angle', {
  enumerable: true,
  get: function get() {
    return _angleTool.angle;
  }
});
Object.defineProperty(exports, 'angleTouch', {
  enumerable: true,
  get: function get() {
    return _angleTool.angleTouch;
  }
});

var _arrowAnnotate = __webpack_require__(95);

Object.defineProperty(exports, 'arrowAnnotate', {
  enumerable: true,
  get: function get() {
    return _arrowAnnotate.arrowAnnotate;
  }
});
Object.defineProperty(exports, 'arrowAnnotateTouch', {
  enumerable: true,
  get: function get() {
    return _arrowAnnotate.arrowAnnotateTouch;
  }
});

var _crosshairs = __webpack_require__(96);

Object.defineProperty(exports, 'crosshairs', {
  enumerable: true,
  get: function get() {
    return _crosshairs.crosshairs;
  }
});
Object.defineProperty(exports, 'crosshairsTouch', {
  enumerable: true,
  get: function get() {
    return _crosshairs.crosshairsTouch;
  }
});

var _displayTool = __webpack_require__(24);

Object.defineProperty(exports, 'displayTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_displayTool).default;
  }
});

var _doubleTapTool = __webpack_require__(55);

Object.defineProperty(exports, 'doubleTapTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doubleTapTool).default;
  }
});

var _doubleTapZoom = __webpack_require__(97);

Object.defineProperty(exports, 'doubleTapZoom', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_doubleTapZoom).default;
  }
});

var _dragProbe = __webpack_require__(98);

Object.defineProperty(exports, 'dragProbe', {
  enumerable: true,
  get: function get() {
    return _dragProbe.dragProbe;
  }
});
Object.defineProperty(exports, 'dragProbeTouch', {
  enumerable: true,
  get: function get() {
    return _dragProbe.dragProbeTouch;
  }
});

var _ellipticalRoi = __webpack_require__(99);

Object.defineProperty(exports, 'ellipticalRoi', {
  enumerable: true,
  get: function get() {
    return _ellipticalRoi.ellipticalRoi;
  }
});
Object.defineProperty(exports, 'ellipticalRoiTouch', {
  enumerable: true,
  get: function get() {
    return _ellipticalRoi.ellipticalRoiTouch;
  }
});

var _freehand = __webpack_require__(100);

Object.defineProperty(exports, 'freehand', {
  enumerable: true,
  get: function get() {
    return _freehand.freehand;
  }
});

var _highlight = __webpack_require__(101);

Object.defineProperty(exports, 'highlight', {
  enumerable: true,
  get: function get() {
    return _highlight.highlight;
  }
});
Object.defineProperty(exports, 'highlightTouch', {
  enumerable: true,
  get: function get() {
    return _highlight.highlightTouch;
  }
});

var _imageStats = __webpack_require__(102);

Object.defineProperty(exports, 'imageStats', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_imageStats).default;
  }
});

var _keyboardTool = __webpack_require__(51);

Object.defineProperty(exports, 'keyboardTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_keyboardTool).default;
  }
});

var _length = __webpack_require__(103);

Object.defineProperty(exports, 'length', {
  enumerable: true,
  get: function get() {
    return _length.length;
  }
});
Object.defineProperty(exports, 'lengthTouch', {
  enumerable: true,
  get: function get() {
    return _length.lengthTouch;
  }
});

var _magnify = __webpack_require__(104);

Object.defineProperty(exports, 'magnify', {
  enumerable: true,
  get: function get() {
    return _magnify.magnify;
  }
});
Object.defineProperty(exports, 'magnifyTouchDrag', {
  enumerable: true,
  get: function get() {
    return _magnify.magnifyTouchDrag;
  }
});

var _mouseButtonRectangleTool = __webpack_require__(56);

Object.defineProperty(exports, 'mouseButtonRectangleTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseButtonRectangleTool).default;
  }
});

var _mouseButtonTool = __webpack_require__(7);

Object.defineProperty(exports, 'mouseButtonTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseButtonTool).default;
  }
});

var _mouseWheelTool = __webpack_require__(21);

Object.defineProperty(exports, 'mouseWheelTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseWheelTool).default;
  }
});

var _multiTouchDragTool = __webpack_require__(29);

Object.defineProperty(exports, 'multiTouchDragTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_multiTouchDragTool).default;
  }
});

var _orientationMarkers = __webpack_require__(105);

Object.defineProperty(exports, 'orientationMarkers', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_orientationMarkers).default;
  }
});

var _pan = __webpack_require__(106);

Object.defineProperty(exports, 'pan', {
  enumerable: true,
  get: function get() {
    return _pan.pan;
  }
});
Object.defineProperty(exports, 'panTouchDrag', {
  enumerable: true,
  get: function get() {
    return _pan.panTouchDrag;
  }
});

var _panMultiTouch = __webpack_require__(107);

Object.defineProperty(exports, 'panMultiTouch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_panMultiTouch).default;
  }
});

var _probe = __webpack_require__(108);

Object.defineProperty(exports, 'probe', {
  enumerable: true,
  get: function get() {
    return _probe.probe;
  }
});
Object.defineProperty(exports, 'probeTouch', {
  enumerable: true,
  get: function get() {
    return _probe.probeTouch;
  }
});

var _rectangleRoi = __webpack_require__(109);

Object.defineProperty(exports, 'rectangleRoi', {
  enumerable: true,
  get: function get() {
    return _rectangleRoi.rectangleRoi;
  }
});
Object.defineProperty(exports, 'rectangleRoiTouch', {
  enumerable: true,
  get: function get() {
    return _rectangleRoi.rectangleRoiTouch;
  }
});

var _rotate = __webpack_require__(110);

Object.defineProperty(exports, 'rotate', {
  enumerable: true,
  get: function get() {
    return _rotate.rotate;
  }
});
Object.defineProperty(exports, 'rotateTouchDrag', {
  enumerable: true,
  get: function get() {
    return _rotate.rotateTouchDrag;
  }
});

var _rotateTouch = __webpack_require__(111);

Object.defineProperty(exports, 'rotateTouch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_rotateTouch).default;
  }
});

var _saveAs = __webpack_require__(112);

Object.defineProperty(exports, 'saveAs', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_saveAs).default;
  }
});

var _seedAnnotate = __webpack_require__(113);

Object.defineProperty(exports, 'seedAnnotate', {
  enumerable: true,
  get: function get() {
    return _seedAnnotate.seedAnnotate;
  }
});
Object.defineProperty(exports, 'seedAnnotateTouch', {
  enumerable: true,
  get: function get() {
    return _seedAnnotate.seedAnnotateTouch;
  }
});

var _simpleAngle = __webpack_require__(114);

Object.defineProperty(exports, 'simpleAngle', {
  enumerable: true,
  get: function get() {
    return _simpleAngle.simpleAngle;
  }
});
Object.defineProperty(exports, 'simpleAngleTouch', {
  enumerable: true,
  get: function get() {
    return _simpleAngle.simpleAngleTouch;
  }
});

var _simpleMouseButtonTool = __webpack_require__(13);

Object.defineProperty(exports, 'simpleMouseButtonTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_simpleMouseButtonTool).default;
  }
});

var _textMarker = __webpack_require__(115);

Object.defineProperty(exports, 'textMarker', {
  enumerable: true,
  get: function get() {
    return _textMarker.textMarker;
  }
});
Object.defineProperty(exports, 'textMarkerTouch', {
  enumerable: true,
  get: function get() {
    return _textMarker.textMarkerTouch;
  }
});

var _touchDragTool = __webpack_require__(11);

Object.defineProperty(exports, 'touchDragTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchDragTool).default;
  }
});

var _touchPinchTool = __webpack_require__(57);

Object.defineProperty(exports, 'touchPinchTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchPinchTool).default;
  }
});

var _touchTool = __webpack_require__(9);

Object.defineProperty(exports, 'touchTool', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_touchTool).default;
  }
});

var _wwwc = __webpack_require__(116);

Object.defineProperty(exports, 'wwwc', {
  enumerable: true,
  get: function get() {
    return _wwwc.wwwc;
  }
});
Object.defineProperty(exports, 'wwwcTouchDrag', {
  enumerable: true,
  get: function get() {
    return _wwwc.wwwcTouchDrag;
  }
});

var _wwwcRegion = __webpack_require__(117);

Object.defineProperty(exports, 'wwwcRegion', {
  enumerable: true,
  get: function get() {
    return _wwwcRegion.wwwcRegion;
  }
});
Object.defineProperty(exports, 'wwwcRegionTouch', {
  enumerable: true,
  get: function get() {
    return _wwwcRegion.wwwcRegionTouch;
  }
});

var _zoom = __webpack_require__(118);

Object.defineProperty(exports, 'zoom', {
  enumerable: true,
  get: function get() {
    return _zoom.zoom;
  }
});
Object.defineProperty(exports, 'zoomWheel', {
  enumerable: true,
  get: function get() {
    return _zoom.zoomWheel;
  }
});
Object.defineProperty(exports, 'zoomTouchPinch', {
  enumerable: true,
  get: function get() {
    return _zoom.zoomTouchPinch;
  }
});
Object.defineProperty(exports, 'zoomTouchDrag', {
  enumerable: true,
  get: function get() {
    return _zoom.zoomTouchDrag;
  }
});

var _brush = __webpack_require__(119);

Object.defineProperty(exports, 'brush', {
  enumerable: true,
  get: function get() {
    return _brush.brush;
  }
});

var _adaptiveBrush = __webpack_require__(120);

Object.defineProperty(exports, 'adaptiveBrush', {
  enumerable: true,
  get: function get() {
    return _adaptiveBrush.adaptiveBrush;
  }
});

var _index3 = __webpack_require__(121);

Object.defineProperty(exports, 'regionsThreshold', {
  enumerable: true,
  get: function get() {
    return _index3.regionsThreshold;
  }
});
Object.defineProperty(exports, 'regionsGrow', {
  enumerable: true,
  get: function get() {
    return _index3.regionsGrow;
  }
});
Object.defineProperty(exports, 'regionsDraw', {
  enumerable: true,
  get: function get() {
    return _index3.regionsDraw;
  }
});
Object.defineProperty(exports, 'regionsScore', {
  enumerable: true,
  get: function get() {
    return _index3.regionsScore;
  }
});
Object.defineProperty(exports, 'regionsUndo', {
  enumerable: true,
  get: function get() {
    return _index3.regionsUndo;
  }
});

var _version = __webpack_require__(126);

Object.defineProperty(exports, 'version', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_version).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calculateReferenceLine = __webpack_require__(40);

var _calculateReferenceLine2 = _interopRequireDefault(_calculateReferenceLine);

var _referenceLinesTool = __webpack_require__(64);

var _referenceLinesTool2 = _interopRequireDefault(_referenceLinesTool);

var _renderActiveReferenceLine = __webpack_require__(41);

var _renderActiveReferenceLine2 = _interopRequireDefault(_renderActiveReferenceLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var referenceLines = {
  calculateReferenceLine: _calculateReferenceLine2.default,
  tool: _referenceLinesTool2.default,
  renderActiveReferenceLine: _renderActiveReferenceLine2.default
};

exports.default = referenceLines;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _renderActiveReferenceLine = __webpack_require__(41);

var _renderActiveReferenceLine2 = _interopRequireDefault(_renderActiveReferenceLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'referenceLines';

function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  // Get the enabled elements associated with this synchronization context and draw them
  var syncContext = toolData.data[0].synchronizationContext;
  var enabledElements = syncContext.getSourceElements();

  var renderer = toolData.data[0].renderer;

  // Create the canvas context and reset it to the pixel coordinate system
  var context = eventData.canvasContext.canvas.getContext('2d');

  _externalModules.external.cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);

  // Iterate over each referenced element
  enabledElements.forEach(function (referenceEnabledElement) {

    // Don't draw ourselves
    if (referenceEnabledElement === e.currentTarget) {
      return;
    }

    // Render it
    renderer(context, eventData, e.currentTarget, referenceEnabledElement);
  });
}

// Enables the reference line tool for a given element.  Note that a custom renderer
// Can be provided if you want different rendering (e.g. all reference lines, first/last/active, etc)
function enable(element, synchronizationContext, renderer) {
  renderer = renderer || _renderActiveReferenceLine2.default;

  (0, _toolState.addToolState)(element, toolType, {
    synchronizationContext: synchronizationContext,
    renderer: renderer
  });

  element.removeEventListener('cornerstoneimagerendered', onImageRendered);
  element.addEventListener('cornerstoneimagerendered', onImageRendered);
  _externalModules.external.cornerstone.updateImage(element);
}

// Disables the reference line tool for the given element
function disable(element) {
  element.removeEventListener('cornerstoneimagerendered', onImageRendered);
  _externalModules.external.cornerstone.updateImage(element);
}

// Module/private exports
var tool = {
  enable: enable,
  disable: disable
};

exports.default = tool;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vector) {
  // Thanks to David Clunie
  // https://sites.google.com/site/dicomnotes/

  var orientation = '';
  var orientationX = vector.x < 0 ? 'R' : 'L';
  var orientationY = vector.y < 0 ? 'A' : 'P';
  var orientationZ = vector.z < 0 ? 'F' : 'H';

  // Should probably make this a function vector3.abs
  var abs = new _externalModules.cornerstoneMath.Vector3(Math.abs(vector.x), Math.abs(vector.y), Math.abs(vector.z));

  for (var i = 0; i < 3; i++) {
    if (abs.x > 0.0001 && abs.x > abs.y && abs.x > abs.z) {
      orientation += orientationX;
      abs.x = 0;
    } else if (abs.y > 0.0001 && abs.y > abs.x && abs.y > abs.z) {
      orientation += orientationY;
      abs.y = 0;
    } else if (abs.z > 0.0001 && abs.z > abs.x && abs.z > abs.y) {
      orientation += orientationZ;
      abs.z = 0;
    } else {
      break;
    }
  }

  return orientation;
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  var inverted = string.replace('H', 'f');

  inverted = inverted.replace('F', 'h');
  inverted = inverted.replace('R', 'l');
  inverted = inverted.replace('L', 'r');
  inverted = inverted.replace('A', 'p');
  inverted = inverted.replace('P', 'a');
  inverted = inverted.toUpperCase();

  return inverted;
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _setContextToDisplayFontSize = __webpack_require__(43);

var _setContextToDisplayFontSize2 = _interopRequireDefault(_setContextToDisplayFontSize);

var _toolState = __webpack_require__(1);

var _measurementManager = __webpack_require__(68);

var _measurementManager2 = _interopRequireDefault(_measurementManager);

var _lineSampleMeasurement = __webpack_require__(69);

var _lineSampleMeasurement2 = _interopRequireDefault(_lineSampleMeasurement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'probe4D';

function updateLineSample(measurementData) {
  var cornerstone = _externalModules.external.cornerstone;
  var samples = [];

  measurementData.timeSeries.stacks.forEach(function (stack) {
    var loader = void 0;

    if (stack.preventCache === true) {
      loader = cornerstone.loadImage(stack.imageIds[measurementData.imageIdIndex]);
    } else {
      loader = cornerstone.loadAndCacheImage(stack.imageIds[measurementData.imageIdIndex]);
    }

    loader.then(function (image) {
      var offset = Math.round(measurementData.handles.end.x) + Math.round(measurementData.handles.end.y) * image.width;
      var sample = image.getPixelData()[offset];

      samples.push(sample);
    });
  });
  measurementData.lineSample.set(samples);
}

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  var timeSeriestoolData = (0, _toolState.getToolState)(mouseEventData.element, 'timeSeries');

  if (timeSeriestoolData === undefined || timeSeriestoolData.data === undefined || timeSeriestoolData.data.length === 0) {
    return;
  }

  var timeSeries = timeSeriestoolData.data[0];

  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    timeSeries: timeSeries,
    lineSample: new _lineSampleMeasurement2.default(),
    imageIdIndex: timeSeries.stacks[timeSeries.currentStackIndex].currentImageIdIndex,
    visible: true,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      }
    }
  };

  updateLineSample(measurementData);
  _measurementManager2.default.add(measurementData);

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////

function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  _externalModules.external.cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);
  var color = 'white';

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();
    var data = toolData.data[i];

    // Draw the handles
    context.beginPath();
    (0, _drawHandles2.default)(context, eventData, data.handles, color);
    context.stroke();

    // Draw text
    var fontParameters = (0, _setContextToDisplayFontSize2.default)(eventData.enabledElement, eventData.canvasContext, 15);

    context.font = fontParameters.fontSize + 'px Arial';

    // Translate the x/y away from the cursor
    var x = Math.round(data.handles.end.x);
    var y = Math.round(data.handles.end.y);
    var textX = data.handles.end.x + 3;
    var textY = data.handles.end.y - 3;

    context.fillStyle = color;

    context.fillText(x + ',' + y, textX, textY);

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var probeTool4D = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  toolType: toolType
});

exports.default = probeTool4D;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This object manages a collection of measurements
function MeasurementManager() {
  var that = this;

  that.measurements = [];

  // Adds an element as both a source and a target
  this.add = function (measurement) {
    var index = that.measurements.push(measurement);
    // Fire event
    var eventDetail = {
      index: index,
      measurement: measurement
    };

    (0, _triggerEvent2.default)(that, 'CornerstoneMeasurementAdded', eventDetail);
  };

  this.remove = function (index) {
    var measurement = that.measurements[index];

    that.measurements.splice(index, 1);
    // Fire event
    var eventDetail = {
      index: index,
      measurement: measurement
    };

    (0, _triggerEvent2.default)(that, 'CornerstoneMeasurementRemoved', eventDetail);
  };
}

// Module/private exports
var manager = new MeasurementManager();

exports.default = manager;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  var that = this;

  that.samples = [];

  // Adds an element as both a source and a target
  this.set = function (samples) {
    that.samples = samples;
    // Fire event
    (0, _triggerEvent2.default)(that, 'CornerstoneLineSampleUpdated');
  };
};

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toolState = __webpack_require__(1);

var _incrementTimePoint = __webpack_require__(39);

var _incrementTimePoint2 = _interopRequireDefault(_incrementTimePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'timeSeriesPlayer';

/**
 * Starts playing a clip of different time series of the same image or adjusts the frame rate of an
 * already playing clip. framesPerSecond is optional and defaults to 30 if not specified. A negative
 * framesPerSecond will play the clip in reverse.
 * The element must have time series
 * @param element
 * @param framesPerSecond
 */
function playClip(element, framesPerSecond) {
  if (element === undefined) {
    throw new Error('playClip: element must not be undefined');
  }

  if (framesPerSecond === undefined) {
    framesPerSecond = 30;
  }

  var timeSeriesToolData = (0, _toolState.getToolState)(element, 'timeSeries');

  if (timeSeriesToolData === undefined || timeSeriesToolData.data === undefined || timeSeriesToolData.data.length === 0) {
    return;
  }

  var playClipToolData = (0, _toolState.getToolState)(element, toolType);
  var playClipData = void 0;

  if (playClipToolData === undefined || playClipToolData.data.length === 0) {
    playClipData = {
      intervalId: undefined,
      framesPerSecond: framesPerSecond,
      lastFrameTimeStamp: undefined,
      frameRate: 0
    };
    (0, _toolState.addToolState)(element, toolType, playClipData);
  } else {
    playClipData = playClipToolData.data[0];
    playClipData.framesPerSecond = framesPerSecond;
  }

  // If already playing, do not set a new interval
  if (playClipData.intervalId !== undefined) {
    return;
  }

  playClipData.intervalId = setInterval(function () {
    if (playClipData.framesPerSecond > 0) {
      (0, _incrementTimePoint2.default)(element, 1, true);
    } else {
      (0, _incrementTimePoint2.default)(element, -1, true);
    }
  }, 1000 / Math.abs(playClipData.framesPerSecond));
}

/**
 * Stops an already playing clip.
 * * @param element
 */
function stopClip(element) {
  var playClipToolData = (0, _toolState.getToolState)(element, toolType);

  if (!playClipToolData || !playClipToolData.data || !playClipToolData.data.length) {
    return;
  }
  var playClipData = playClipToolData.data[0];

  clearInterval(playClipData.intervalId);
  playClipData.intervalId = undefined;
}

// Module/private exports
var timeSeriesPlayer = {
  start: playClip,
  stop: stopClip
};

exports.default = timeSeriesPlayer;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeSeriesScrollTouchDrag = exports.timeSeriesScrollWheel = exports.timeSeriesScroll = undefined;

var _externalModules = __webpack_require__(0);

var _simpleMouseButtonTool = __webpack_require__(13);

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(11);

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _mouseWheelTool = __webpack_require__(21);

var _mouseWheelTool2 = _interopRequireDefault(_mouseWheelTool);

var _incrementTimePoint = __webpack_require__(39);

var _incrementTimePoint2 = _interopRequireDefault(_incrementTimePoint);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mouseUpCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {

    var mouseDragEventData = {
      deltaY: 0,
      options: e.data.options
    };

    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', mouseDragEventData, mouseDragCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);
    e.stopImmediatePropagation();

    return false;
  }
}

function mouseDragCallback(e, eventData) {
  e.data.deltaY += eventData.deltaPoints.page.y;

  var toolData = (0, _toolState.getToolState)(eventData.element, 'timeSeries');

  if (toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
    return;
  }

  var timeSeriesData = toolData.data[0];

  var pixelsPerTimeSeries = _externalModules.external.$(eventData.element).height() / timeSeriesData.stacks.length;

  if (e.data.options !== undefined && e.data.options.timeSeriesScrollSpeed !== undefined) {
    pixelsPerTimeSeries = e.data.options.timeSeriesScrollSpeed;
  }

  if (e.data.deltaY >= pixelsPerTimeSeries || e.data.deltaY <= -pixelsPerTimeSeries) {
    var timeSeriesDelta = Math.round(e.data.deltaY / pixelsPerTimeSeries);
    var timeSeriesDeltaMod = e.data.deltaY % pixelsPerTimeSeries;

    (0, _incrementTimePoint2.default)(eventData.element, timeSeriesDelta);
    e.data.deltaY = timeSeriesDeltaMod;
  }

  return false; // False = cases jquery to preventDefault() and stopPropagation() this event
}

function mouseWheelCallback(e, eventData) {
  var images = -eventData.direction;

  (0, _incrementTimePoint2.default)(eventData.element, images);
}

function onDrag(e) {
  var mouseMoveData = e.originalEvent.detail;
  var eventData = {
    deltaY: 0
  };

  eventData.deltaY += mouseMoveData.deltaPoints.page.y;

  var toolData = (0, _toolState.getToolState)(mouseMoveData.element, 'stack');

  if (toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
    return;
  }

  if (eventData.deltaY >= 3 || eventData.deltaY <= -3) {
    var timeSeriesDelta = eventData.deltaY / 3;
    var timeSeriesDeltaMod = eventData.deltaY % 3;

    (0, _incrementTimePoint2.default)(eventData.element, timeSeriesDelta);
    eventData.deltaY = timeSeriesDeltaMod;
  }

  return false; // False = cases jquery to preventDefault() and stopPropagation() this event
}

// Module/private exports
var timeSeriesScroll = (0, _simpleMouseButtonTool2.default)(mouseDownCallback);
var timeSeriesScrollWheel = (0, _mouseWheelTool2.default)(mouseWheelCallback);
var timeSeriesScrollTouchDrag = (0, _touchDragTool2.default)(onDrag);

exports.timeSeriesScroll = timeSeriesScroll;
exports.timeSeriesScrollWheel = timeSeriesScrollWheel;
exports.timeSeriesScrollTouchDrag = timeSeriesScrollTouchDrag;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // Get the source and target viewports
  var sourceViewport = cornerstone.getViewport(sourceElement);
  var targetViewport = cornerstone.getViewport(targetElement);

  // Do nothing if the ww/wc already match
  if (targetViewport.voi.windowWidth === sourceViewport.voi.windowWidth && targetViewport.voi.windowCenter === sourceViewport.voi.windowCenter && targetViewport.invert === sourceViewport.invert) {
    return;
  }

  // Www/wc are different, sync them
  targetViewport.voi.windowWidth = sourceViewport.voi.windowWidth;
  targetViewport.voi.windowCenter = sourceViewport.voi.windowCenter;
  targetViewport.invert = sourceViewport.invert;
  synchronizer.setViewport(targetElement, targetViewport);
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  _externalModules.external.cornerstone.updateImage(targetElement);
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

// This object is responsible for synchronizing target elements when an event fires on a source
// Element
function Synchronizer(event, handler) {

  var cornerstone = _externalModules.external.cornerstone;
  var that = this;
  var sourceElements = []; // Source elements fire the events we want to synchronize to
  var targetElements = []; // Target elements we want to synchronize to source elements

  var ignoreFiredEvents = false;
  var initialData = {};
  var eventHandler = handler;

  this.setHandler = function (handler) {
    eventHandler = handler;
  };

  this.getHandler = function () {
    return eventHandler;
  };

  this.getDistances = function () {
    if (!sourceElements.length || !targetElements.length) {
      return;
    }

    initialData.distances = {};
    initialData.imageIds = {
      sourceElements: [],
      targetElements: []
    };

    sourceElements.forEach(function (sourceElement) {
      var sourceEnabledElement = cornerstone.getEnabledElement(sourceElement);

      if (!sourceEnabledElement || !sourceEnabledElement.image) {
        return;
      }

      var sourceImageId = sourceEnabledElement.image.imageId;
      var sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceImageId);

      if (!sourceImagePlane || !sourceImagePlane.imagePositionPatient) {
        return;
      }

      var sourceImagePosition = sourceImagePlane.imagePositionPatient;

      if (initialData.hasOwnProperty(sourceEnabledElement)) {
        return;
      }
      initialData.distances[sourceImageId] = {};

      initialData.imageIds.sourceElements.push(sourceImageId);

      targetElements.forEach(function (targetElement) {
        var targetEnabledElement = cornerstone.getEnabledElement(targetElement);

        if (!targetEnabledElement || !targetEnabledElement.image) {
          return;
        }

        var targetImageId = targetEnabledElement.image.imageId;

        initialData.imageIds.targetElements.push(targetImageId);

        if (sourceElement === targetElement) {
          return;
        }

        if (sourceImageId === targetImageId) {
          return;
        }

        if (initialData.distances[sourceImageId].hasOwnProperty(targetImageId)) {
          return;
        }

        var targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImageId);

        if (!targetImagePlane || !targetImagePlane.imagePositionPatient) {
          return;
        }

        var targetImagePosition = targetImagePlane.imagePositionPatient;

        initialData.distances[sourceImageId][targetImageId] = targetImagePosition.clone().sub(sourceImagePosition);
      });

      if (!Object.keys(initialData.distances[sourceImageId]).length) {
        delete initialData.distances[sourceImageId];
      }
    });
  };

  function fireEvent(sourceElement, eventData) {
    // Broadcast an event that something changed
    if (!sourceElements.length || !targetElements.length) {
      return;
    }

    ignoreFiredEvents = true;
    targetElements.forEach(function (targetElement) {
      var targetIndex = targetElements.indexOf(targetElement);

      if (targetIndex === -1) {
        return;
      }

      var targetImageId = initialData.imageIds.targetElements[targetIndex];
      var sourceIndex = sourceElements.indexOf(sourceElement);

      if (sourceIndex === -1) {
        return;
      }

      var sourceImageId = initialData.imageIds.sourceElements[sourceIndex];

      var positionDifference = void 0;

      if (sourceImageId === targetImageId) {
        positionDifference = 0;
      } else if (initialData.distances[sourceImageId] !== undefined) {
        positionDifference = initialData.distances[sourceImageId][targetImageId];
      }

      eventHandler(that, sourceElement, targetElement, eventData, positionDifference);
    });
    ignoreFiredEvents = false;
  }

  function onEvent(e, eventData) {
    if (ignoreFiredEvents === true) {
      return;
    }

    fireEvent(e.currentTarget, eventData);
  }

  // Adds an element as a source
  this.addSource = function (element) {
    // Return if this element was previously added
    var index = sourceElements.indexOf(element);

    if (index !== -1) {
      return;
    }

    // Add to our list of enabled elements
    sourceElements.push(element);

    // Subscribe to the event
    _externalModules.external.$(element).on(event, onEvent);

    // Update the inital distances between elements
    that.getDistances();

    that.updateDisableHandlers();
  };

  // Adds an element as a target
  this.addTarget = function (element) {
    // Return if this element was previously added
    var index = targetElements.indexOf(element);

    if (index !== -1) {
      return;
    }

    // Add to our list of enabled elements
    targetElements.push(element);

    // Update the inital distances between elements
    that.getDistances();

    // Invoke the handler for this new target element
    eventHandler(that, element, element, 0);

    that.updateDisableHandlers();
  };

  // Adds an element as both a source and a target
  this.add = function (element) {
    that.addSource(element);
    that.addTarget(element);
  };

  // Removes an element as a source
  this.removeSource = function (element) {
    // Find the index of this element
    var index = sourceElements.indexOf(element);

    if (index === -1) {
      return;
    }

    // Remove this element from the array
    sourceElements.splice(index, 1);

    // Stop listening for the event
    _externalModules.external.$(element).off(event, onEvent);

    // Update the inital distances between elements
    that.getDistances();

    // Update everyone listening for events
    fireEvent(element);
    that.updateDisableHandlers();
  };

  // Removes an element as a target
  this.removeTarget = function (element) {
    // Find the index of this element
    var index = targetElements.indexOf(element);

    if (index === -1) {
      return;
    }

    // Remove this element from the array
    targetElements.splice(index, 1);

    // Update the inital distances between elements
    that.getDistances();

    // Invoke the handler for the removed target
    eventHandler(that, element, element, 0);
    that.updateDisableHandlers();
  };

  // Removes an element as both a source and target
  this.remove = function (element) {
    that.removeTarget(element);
    that.removeSource(element);
  };

  // Returns the source elements
  this.getSourceElements = function () {
    return sourceElements;
  };

  // Returns the target elements
  this.getTargetElements = function () {
    return targetElements;
  };

  this.displayImage = function (element, image, viewport) {
    ignoreFiredEvents = true;
    cornerstone.displayImage(element, image, viewport);
    ignoreFiredEvents = false;
  };

  this.setViewport = function (element, viewport) {
    ignoreFiredEvents = true;
    cornerstone.setViewport(element, viewport);
    ignoreFiredEvents = false;
  };

  function disableHandler(e) {
    var element = e.detail.element;

    that.remove(element);
  }

  this.updateDisableHandlers = function () {
    var elements = _externalModules.external.$.unique(sourceElements.concat(targetElements));

    elements.forEach(function (element) {
      element.removeEventListener('cornerstoneelementdisabled', disableHandler);
      element.addEventListener('cornerstoneelementdisabled', disableHandler);
    });
  };

  this.destroy = function () {
    var elements = _externalModules.external.$.unique(sourceElements.concat(targetElements));

    elements.forEach(function (element) {
      that.remove(element);
    });
  };
}

exports.default = Synchronizer;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement, eventData) {
  // If the target and source are the same, stop
  if (sourceElement === targetElement) {
    return;
  }

  // If there is no event, or direction is 0, stop
  if (!eventData || !eventData.direction) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // Get the stack of the target viewport
  var stackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');
  var stackData = stackToolDataSource.data[0];

  // Get the new index for the stack
  var newImageIdIndex = stackData.currentImageIdIndex + eventData.direction;

  // Ensure the index does not exceed the bounds of the stack
  newImageIdIndex = Math.min(Math.max(newImageIdIndex, 0), stackData.imageIds.length - 1);

  // If the index has not changed, stop here
  if (stackData.currentImageIdIndex === newImageIdIndex) {
    return;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  var loader = void 0;

  if (stackData.preventCache === true) {
    loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
  } else {
    loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
  }

  loader.then(function (image) {
    var viewport = cornerstone.getViewport(targetElement);

    stackData.currentImageIdIndex = newImageIdIndex;
    synchronizer.displayImage(targetElement, image, viewport);
    if (endLoadingHandler) {
      endLoadingHandler(targetElement, image);
    }
  }, function (error) {
    var imageId = stackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(targetElement, imageId, error);
    }
  });
};

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var sourceImage = cornerstone.getEnabledElement(sourceElement).image;
  var sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceImage.imageId);
  var sourceImagePosition = sourceImagePlane.imagePositionPatient;

  var stackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');
  var stackData = stackToolDataSource.data[0];

  var minDistance = Number.MAX_VALUE;
  var newImageIdIndex = -1;

  stackData.imageIds.forEach(function (imageId, index) {
    var imagePlane = cornerstone.metaData.get('imagePlaneModule', imageId);
    var imagePosition = imagePlane.imagePositionPatient;
    var distance = imagePosition.distanceToSquared(sourceImagePosition);
    // Console.log(index + '=' + distance);

    if (distance < minDistance) {
      minDistance = distance;
      newImageIdIndex = index;
    }
  });

  if (newImageIdIndex === stackData.currentImageIdIndex) {
    return;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  if (newImageIdIndex !== -1) {
    var loader = void 0;

    if (stackData.preventCache === true) {
      loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
    } else {
      loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
    }

    loader.then(function (image) {
      var viewport = cornerstone.getViewport(targetElement);

      stackData.currentImageIdIndex = newImageIdIndex;
      synchronizer.displayImage(targetElement, image, viewport);
      if (endLoadingHandler) {
        endLoadingHandler(targetElement, image);
      }
    }, function (error) {
      var imageId = stackData.imageIds[newImageIdIndex];

      if (errorLoadingHandler) {
        errorLoadingHandler(targetElement, imageId, error);
      }
    });
  }
};

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement, eventData, positionDifference) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var sourceEnabledElement = cornerstone.getEnabledElement(sourceElement);
  var sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceEnabledElement.image.imageId);
  var sourceImagePosition = sourceImagePlane.imagePositionPatient;

  var stackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');
  var stackData = stackToolDataSource.data[0];

  var minDistance = Number.MAX_VALUE;
  var newImageIdIndex = -1;

  if (!positionDifference) {
    return;
  }

  var finalPosition = sourceImagePosition.clone().add(positionDifference);

  stackData.imageIds.forEach(function (imageId, index) {
    var imagePlane = cornerstone.metaData.get('imagePlaneModule', imageId);
    var imagePosition = imagePlane.imagePositionPatient;
    var distance = finalPosition.distanceToSquared(imagePosition);

    if (distance < minDistance) {
      minDistance = distance;
      newImageIdIndex = index;
    }
  });

  if (newImageIdIndex === stackData.currentImageIdIndex || newImageIdIndex === -1) {
    return;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  var loader = void 0;

  if (stackData.preventCache === true) {
    loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
  } else {
    loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
  }

  loader.then(function (image) {
    var viewport = cornerstone.getViewport(targetElement);

    stackData.currentImageIdIndex = newImageIdIndex;
    synchronizer.displayImage(targetElement, image, viewport);
    if (endLoadingHandler) {
      endLoadingHandler(targetElement, image);
    }
  }, function (error) {
    var imageId = stackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(targetElement, imageId, error);
    }
  });
};

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var sourceStackToolDataSource = (0, _toolState.getToolState)(sourceElement, 'stack');
  var sourceStackData = sourceStackToolDataSource.data[0];
  var targetStackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');
  var targetStackData = targetStackToolDataSource.data[0];

  var newImageIdIndex = sourceStackData.currentImageIdIndex;

  // Clamp the index
  newImageIdIndex = Math.min(Math.max(newImageIdIndex, 0), targetStackData.imageIds.length - 1);

  // Do nothing if the index has not changed
  if (newImageIdIndex === targetStackData.currentImageIdIndex) {
    return;
  }

  var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
  var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  var loader = void 0;

  if (targetStackData.preventCache === true) {
    loader = cornerstone.loadImage(targetStackData.imageIds[newImageIdIndex]);
  } else {
    loader = cornerstone.loadAndCacheImage(targetStackData.imageIds[newImageIdIndex]);
  }

  loader.then(function (image) {
    var viewport = cornerstone.getViewport(targetElement);

    targetStackData.currentImageIdIndex = newImageIdIndex;
    synchronizer.displayImage(targetElement, image, viewport);
    if (endLoadingHandler) {
      endLoadingHandler(targetElement, image);
    }
  }, function (error) {
    var imageId = targetStackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(targetElement, imageId, error);
    }
  });
};

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (synchronizer, sourceElement, targetElement) {

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // Get the source and target viewports
  var sourceViewport = cornerstone.getViewport(sourceElement);
  var targetViewport = cornerstone.getViewport(targetElement);

  // Do nothing if the scale and translation are the same
  if (targetViewport.scale === sourceViewport.scale && targetViewport.translation.x === sourceViewport.translation.x && targetViewport.translation.y === sourceViewport.translation.y) {
    return;
  }

  // Scale and/or translation are different, sync them
  targetViewport.scale = sourceViewport.scale;
  targetViewport.translation.x = sourceViewport.translation.x;
  targetViewport.translation.y = sourceViewport.translation.y;
  synchronizer.setViewport(targetElement, targetViewport);
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newTimeSeriesSpecificToolStateManager = exports.addTimeSeriesStateManager = undefined;

var _imageIdSpecificStateManager = __webpack_require__(15);

var _toolState = __webpack_require__(1);

// This implements an Stack specific tool state management strategy.  This means
// That tool data is shared between all imageIds in a given stack
function newTimeSeriesSpecificToolStateManager(toolTypes, oldStateManager) {
  var toolState = {};

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addStackSpecificToolState(element, toolType, data) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf(toolType) >= 0) {

      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty(toolType) === false) {
        toolState[toolType] = {
          data: []
        };
      }

      var toolData = toolState[toolType];

      // Finally, add this new tool to the state
      toolData.data.push(data);
    } else {
      // Call the imageId specific tool state manager
      return oldStateManager.add(element, toolType, data);
    }
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getStackSpecificToolState(element, toolType) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf(toolType) >= 0) {
      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty(toolType) === false) {
        toolState[toolType] = {
          data: []
        };
      }

      return toolState[toolType];
    }

    // Call the imageId specific tool state manager
    return oldStateManager.get(element, toolType);
  }

  var imageIdToolStateManager = {
    get: getStackSpecificToolState,
    add: addStackSpecificToolState
  };

  return imageIdToolStateManager;
}

var timeSeriesStateManagers = [];

function addTimeSeriesStateManager(element, tools) {
  tools = tools || ['timeSeries'];
  var oldStateManager = (0, _toolState.getElementToolStateManager)(element);

  if (oldStateManager === undefined) {
    oldStateManager = _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }

  var timeSeriesSpecificStateManager = newTimeSeriesSpecificToolStateManager(tools, oldStateManager);

  timeSeriesStateManagers.push(timeSeriesSpecificStateManager);
  (0, _toolState.setElementToolStateManager)(element, timeSeriesSpecificStateManager);
}

exports.addTimeSeriesStateManager = addTimeSeriesStateManager;
exports.newTimeSeriesSpecificToolStateManager = newTimeSeriesSpecificToolStateManager;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addStackStateManager = exports.newStackSpecificToolStateManager = exports.stackSpecificStateManager = undefined;

var _imageIdSpecificStateManager = __webpack_require__(15);

var _toolState = __webpack_require__(1);

// This implements an Stack specific tool state management strategy.  This means
// That tool data is shared between all imageIds in a given stack
function newStackSpecificToolStateManager(toolTypes, oldStateManager) {
  var toolState = {};

  function saveToolState() {
    return toolState;
  }

  function restoreToolState(stackToolState) {
    toolState = stackToolState;
  }

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addStackSpecificToolState(element, toolType, data) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf(toolType) >= 0) {

      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty(toolType) === false) {
        toolState[toolType] = {
          data: []
        };
      }

      var toolData = toolState[toolType];

      // Finally, add this new tool to the state
      toolData.data.push(data);
    } else {
      // Call the imageId specific tool state manager
      return oldStateManager.add(element, toolType, data);
    }
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getStackSpecificToolState(element, toolType) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf(toolType) >= 0) {
      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty(toolType) === false) {
        toolState[toolType] = {
          data: []
        };
      }

      return toolState[toolType];
    }

    // Call the imageId specific tool state manager
    return oldStateManager.get(element, toolType);
  }

  var stackSpecificToolStateManager = {
    get: getStackSpecificToolState,
    add: addStackSpecificToolState,
    saveToolState: saveToolState,
    restoreToolState: restoreToolState,
    toolState: toolState
  };

  return stackSpecificToolStateManager;
}

var stackStateManagers = [];

function addStackStateManager(element, otherTools) {
  var oldStateManager = (0, _toolState.getElementToolStateManager)(element);

  if (!oldStateManager) {
    oldStateManager = _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }

  var stackTools = ['stack', 'stackPrefetch', 'playClip', 'volume', 'slab', 'referenceLines', 'crosshairs', 'stackRenderer'];

  if (otherTools) {
    stackTools = stackTools.concat(otherTools);
  }

  var stackSpecificStateManager = newStackSpecificToolStateManager(stackTools, oldStateManager);

  stackStateManagers.push(stackSpecificStateManager);
  (0, _toolState.setElementToolStateManager)(element, stackSpecificStateManager);
}

var stackSpecificStateManager = {
  newStackSpecificToolStateManager: newStackSpecificToolStateManager,
  addStackStateManager: addStackStateManager
};

exports.stackSpecificStateManager = stackSpecificStateManager;
exports.newStackSpecificToolStateManager = newStackSpecificToolStateManager;
exports.addStackStateManager = addStackStateManager;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// This implements a frame-of-reference specific tool state management strategy.  This means that
// Measurement data are tied to a specific frame of reference UID and only visible to objects using
// That frame-of-reference UID

function newFrameOfReferenceSpecificToolStateManager() {
  var toolState = {};

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addFrameOfReferenceSpecificToolState(frameOfReference, toolType, data) {
    // If we don't have any tool state for this frameOfReference, add an empty object
    if (toolState.hasOwnProperty(frameOfReference) === false) {
      toolState[frameOfReference] = {};
    }

    var frameOfReferenceToolState = toolState[frameOfReference];

    // If we don't have tool state for this type of tool, add an empty object
    if (frameOfReferenceToolState.hasOwnProperty(toolType) === false) {
      frameOfReferenceToolState[toolType] = {
        data: []
      };
    }

    var toolData = frameOfReferenceToolState[toolType];

    // Finally, add this new tool to the state
    toolData.data.push(data);
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getFrameOfReferenceSpecificToolState(frameOfReference, toolType) {
    // If we don't have any tool state for this frame of reference, return undefined
    if (toolState.hasOwnProperty(frameOfReference) === false) {
      return;
    }

    var frameOfReferenceToolState = toolState[frameOfReference];

    // If we don't have tool state for this type of tool, return undefined
    if (frameOfReferenceToolState.hasOwnProperty(toolType) === false) {
      return;
    }

    var toolData = frameOfReferenceToolState[toolType];

    return toolData;
  }

  function removeFrameOfReferenceSpecificToolState(frameOfReference, toolType, data) {
    // If we don't have any tool state for this frame of reference, return undefined
    if (toolState.hasOwnProperty(frameOfReference) === false) {
      return;
    }

    var frameOfReferenceToolState = toolState[frameOfReference];

    // If we don't have tool state for this type of tool, return undefined
    if (frameOfReferenceToolState.hasOwnProperty(toolType) === false) {
      return;
    }

    var toolData = frameOfReferenceToolState[toolType];
    // Find this tool data
    var indexOfData = -1;

    for (var i = 0; i < toolData.data.length; i++) {
      if (toolData.data[i] === data) {
        indexOfData = i;
      }
    }

    if (indexOfData !== -1) {
      toolData.data.splice(indexOfData, 1);
    }
  }

  return {
    get: getFrameOfReferenceSpecificToolState,
    add: addFrameOfReferenceSpecificToolState,
    remove: removeFrameOfReferenceSpecificToolState
  };
}

// A global frameOfReferenceSpecificToolStateManager - the most common case is to share 3d information
// Between stacks of images
var globalFrameOfReferenceSpecificToolStateManager = newFrameOfReferenceSpecificToolStateManager();

exports.newFrameOfReferenceSpecificToolStateManager = newFrameOfReferenceSpecificToolStateManager;
exports.globalFrameOfReferenceSpecificToolStateManager = globalFrameOfReferenceSpecificToolStateManager;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _imageIdSpecificStateManager = __webpack_require__(15);

var _toolState = __webpack_require__(1);

function saveApplicationState(elements) {
  // Save imageId-specific tool state data
  var appState = {
    imageIdToolState: _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager.saveToolState(),
    elementToolState: {},
    elementViewport: {}
  };

  // For each of the given elements, save the viewport and any stack-specific tool data
  elements.forEach(function (element) {
    var toolStateManager = (0, _toolState.getElementToolStateManager)(element);

    if (toolStateManager === _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager) {
      return;
    }

    appState.elementToolState[element.id] = toolStateManager.saveToolState();

    appState.elementViewport[element.id] = _externalModules.external.cornerstone.getViewport(element);
  });

  return appState;
}

function restoreApplicationState(appState) {
  if (!appState.hasOwnProperty('imageIdToolState') || !appState.hasOwnProperty('elementToolState') || !appState.hasOwnProperty('elementViewport')) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;

  // Restore all the imageId specific tool data
  _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager.restoreToolState(appState.imageIdToolState);

  Object.keys(appState.elementViewport).forEach(function (elementId) {
    // Restore any stack specific tool data
    var element = document.getElementById(elementId);

    if (!element) {
      return;
    }

    if (!appState.elementToolState.hasOwnProperty(elementId)) {
      return;
    }

    var toolStateManager = (0, _toolState.getElementToolStateManager)(element);

    if (toolStateManager === _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager) {
      return;
    }

    toolStateManager.restoreToolState(appState.elementToolState[elementId]);

    // Restore the saved viewport information
    var savedViewport = appState.elementViewport[elementId];

    cornerstone.setViewport(element, savedViewport);

    // Update the element to apply the viewport and tool changes
    cornerstone.updateImage(element);
  });

  return appState;
}

var appState = {
  save: saveApplicationState,
  restore: restoreApplicationState
};

exports.default = appState;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scroll = __webpack_require__(30);

var _scroll2 = _interopRequireDefault(_scroll);

var _keyboardTool = __webpack_require__(51);

var _keyboardTool2 = _interopRequireDefault(_keyboardTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = {
  UP: 38,
  DOWN: 40
};

function keyDownCallback(e, eventData) {
  var keyCode = eventData.keyCode;

  if (keyCode !== keys.UP && keyCode !== keys.DOWN) {
    return;
  }

  var images = 1;

  if (keyCode === keys.DOWN) {
    images = -1;
  }

  (0, _scroll2.default)(eventData.element, images);
}

// Module/private exports
var stackScrollKeyboard = (0, _keyboardTool2.default)(keyDownCallback);

exports.default = stackScrollKeyboard;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _requestPoolManager = __webpack_require__(28);

var _requestPoolManager2 = _interopRequireDefault(_requestPoolManager);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _toolState = __webpack_require__(1);

var _getMaxSimultaneousRequests = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'stackPrefetch';
var requestType = 'prefetch';

var configuration = {
  maxImagesToPrefetch: Infinity
};

var resetPrefetchTimeout = void 0;
var resetPrefetchDelay = 10;

function range(lowEnd, highEnd) {
  // Javascript version of Python's range function
  // http://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
  lowEnd = Math.round(lowEnd) || 0;
  highEnd = Math.round(highEnd) || 0;

  var arr = [];
  var c = highEnd - lowEnd + 1;

  if (c <= 0) {
    return arr;
  }

  while (c--) {
    arr[c] = highEnd--;
  }

  return arr;
}

var max = function max(arr) {
  return Math.max.apply(null, arr);
};

var min = function min(arr) {
  return Math.min.apply(null, arr);
};

function nearestIndex(arr, x) {
  // Return index of nearest values in array
  // http://stackoverflow.com/questions/25854212/return-index-of-nearest-values-in-an-array
  var l = [];
  var h = [];

  arr.forEach(function (v) {
    if (v < x) {
      l.push(v);
    } else if (v > x) {
      h.push(v);
    }
  });

  return {
    low: arr.indexOf(max(l)),
    high: arr.indexOf(min(h))
  };
}

function prefetch(element) {
  // Check to make sure stack data exists
  var stackData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  var stack = stackData.data[0];

  // Get the stackPrefetch tool data
  var stackPrefetchData = (0, _toolState.getToolState)(element, toolType);

  if (!stackPrefetchData) {
    return;
  }

  var stackPrefetch = stackPrefetchData.data[0] || {};

  // If all the requests are complete, disable the stackPrefetch tool
  if (!stackPrefetch.indicesToRequest || !stackPrefetch.indicesToRequest.length) {
    stackPrefetch.enabled = false;
  }

  // Make sure the tool is still enabled
  if (stackPrefetch.enabled === false) {
    return;
  }

  // Remove an imageIdIndex from the list of indices to request
  // This fires when the individual image loading deferred is resolved
  function removeFromList(imageIdIndex) {
    var index = stackPrefetch.indicesToRequest.indexOf(imageIdIndex);

    if (index > -1) {
      // Don't remove last element if imageIdIndex not found
      stackPrefetch.indicesToRequest.splice(index, 1);
    }
  }

  // Remove all already cached images from the
  // IndicesToRequest array
  stackPrefetchData.data[0].indicesToRequest.sort(function (a, b) {
    return a - b;
  });
  var indicesToRequestCopy = stackPrefetch.indicesToRequest.slice();

  indicesToRequestCopy.forEach(function (imageIdIndex) {
    var imageId = stack.imageIds[imageIdIndex];

    if (!imageId) {
      return;
    }

    var imagePromise = _externalModules.external.cornerstone.imageCache.getImagePromise(imageId);

    if (imagePromise && imagePromise.state() === 'resolved') {
      removeFromList(imageIdIndex);
    }
  });

  // Stop here if there are no images left to request
  // After those in the cache have been removed
  if (!stackPrefetch.indicesToRequest.length) {
    return;
  }

  // Clear the requestPool of prefetch requests
  _requestPoolManager2.default.clearRequestStack(requestType);

  // Identify the nearest imageIdIndex to the currentImageIdIndex
  var nearest = nearestIndex(stackPrefetch.indicesToRequest, stack.currentImageIdIndex);

  var imageId = void 0;
  var nextImageIdIndex = void 0;
  var preventCache = false;

  function doneCallback(image) {
    // Console.log('prefetch done: ' + image.imageId);
    var imageIdIndex = stack.imageIds.indexOf(image.imageId);

    removeFromList(imageIdIndex);
  }

  // Retrieve the errorLoadingHandler if one exists
  var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

  function failCallback(error) {
    console.log('prefetch errored: ' + error);
    if (errorLoadingHandler) {
      errorLoadingHandler(element, imageId, error, 'stackPrefetch');
    }
  }

  // Prefetch images around the current image (before and after)
  var lowerIndex = nearest.low;
  var higherIndex = nearest.high;

  while (lowerIndex >= 0 || higherIndex < stackPrefetch.indicesToRequest.length) {
    var currentIndex = stack.currentImageIdIndex;
    var shouldSkipLower = currentIndex - stackPrefetch.indicesToRequest[lowerIndex] > configuration.maxImagesToPrefetch;
    var shouldSkipHigher = stackPrefetch.indicesToRequest[higherIndex] - currentIndex > configuration.maxImagesToPrefetch;

    var shouldLoadLower = !shouldSkipLower && lowerIndex >= 0;
    var shouldLoadHigher = !shouldSkipHigher && higherIndex < stackPrefetch.indicesToRequest.length;

    if (!shouldLoadHigher && !shouldLoadLower) {
      break;
    }

    if (shouldLoadLower) {
      nextImageIdIndex = stackPrefetch.indicesToRequest[lowerIndex--];
      imageId = stack.imageIds[nextImageIdIndex];
      _requestPoolManager2.default.addRequest(element, imageId, requestType, preventCache, doneCallback, failCallback);
    }

    if (shouldLoadHigher) {
      nextImageIdIndex = stackPrefetch.indicesToRequest[higherIndex++];
      imageId = stack.imageIds[nextImageIdIndex];
      _requestPoolManager2.default.addRequest(element, imageId, requestType, preventCache, doneCallback, failCallback);
    }
  }

  // Try to start the requestPool's grabbing procedure
  // In case it isn't already running
  _requestPoolManager2.default.startGrabbing();
}

function getPromiseRemovedHandler(element) {
  return function (e) {
    var eventData = e.detail;

    // When an imagePromise has been pushed out of the cache, re-add its index
    // It to the indicesToRequest list so that it will be retrieved later if the
    // CurrentImageIdIndex is changed to an image nearby
    var stackData = void 0;

    try {
      // It will throw an exception in some cases (eg: thumbnails)
      stackData = (0, _toolState.getToolState)(element, 'stack');
    } catch (error) {
      return;
    }

    if (!stackData || !stackData.data || !stackData.data.length) {
      return;
    }

    var stack = stackData.data[0];
    var imageIdIndex = stack.imageIds.indexOf(eventData.imageId);

    // Make sure the image that was removed is actually in this stack
    // Before adding it to the indicesToRequest array
    if (imageIdIndex < 0) {
      return;
    }

    var stackPrefetchData = (0, _toolState.getToolState)(element, toolType);

    if (!stackPrefetchData || !stackPrefetchData.data || !stackPrefetchData.data.length) {
      return;
    }

    stackPrefetchData.data[0].indicesToRequest.push(imageIdIndex);
  };
}

function onImageUpdated(e) {
  // Start prefetching again (after a delay)
  // When the user has scrolled to a new image
  clearTimeout(resetPrefetchTimeout);
  resetPrefetchTimeout = setTimeout(function () {
    var element = e.target;

    // If playClip is enabled and the user loads a different series in the viewport
    // An exception will be thrown because the element will not be enabled anymore
    try {
      prefetch(element);
    } catch (error) {
      return;
    }
  }, resetPrefetchDelay);
}

function enable(element) {
  // Clear old prefetch data. Skipping this can cause problems when changing the series inside an element
  var stackPrefetchDataArray = (0, _toolState.getToolState)(element, toolType);

  stackPrefetchDataArray.data = [];

  // First check that there is stack data available
  var stackData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  var stack = stackData.data[0];

  // Check if we are allowed to cache images in this stack
  if (stack.preventCache === true) {
    console.warn('A stack that should not be cached was given the stackPrefetch');

    return;
  }

  // Use the currentImageIdIndex from the stack as the initalImageIdIndex
  var stackPrefetchData = {
    indicesToRequest: range(0, stack.imageIds.length - 1),
    enabled: true,
    direction: 1
  };

  // Remove the currentImageIdIndex from the list to request
  var indexOfCurrentImage = stackPrefetchData.indicesToRequest.indexOf(stack.currentImageIdIndex);

  stackPrefetchData.indicesToRequest.splice(indexOfCurrentImage, 1);

  (0, _toolState.addToolState)(element, toolType, stackPrefetchData);

  prefetch(element);

  element.removeEventListener('cornerstonenewimage', onImageUpdated);
  element.addEventListener('cornerstonenewimage', onImageUpdated);

  var promiseRemovedHandler = getPromiseRemovedHandler(element);

  _externalModules.external.cornerstone.events.removeEventListener('cornerstoneimagecachepromiseremoved', promiseRemovedHandler);
  _externalModules.external.cornerstone.events.addEventListener('cornerstoneimagecachepromiseremoved', promiseRemovedHandler);
}

function disable(element) {
  clearTimeout(resetPrefetchTimeout);
  element.removeEventListener('cornerstonenewimage', onImageUpdated);

  var promiseRemovedHandler = getPromiseRemovedHandler(element);

  _externalModules.external.cornerstone.events.removeEventListener('cornerstoneimagecachepromiseremoved', promiseRemovedHandler);

  var stackPrefetchData = (0, _toolState.getToolState)(element, toolType);
  // If there is actually something to disable, disable it

  if (stackPrefetchData && stackPrefetchData.data.length) {
    stackPrefetchData.data[0].enabled = false;

    // Clear current prefetch requests from the requestPool
    _requestPoolManager2.default.clearRequestStack(requestType);
  }
}

function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;

  if (config.maxSimultaneousRequests) {
    (0, _getMaxSimultaneousRequests.setMaxSimultaneousRequests)(config.maxSimultaneousRequests);
  }
}

// Module/private exports
var stackPrefetch = {
  enable: enable,
  disable: disable,
  getConfiguration: getConfiguration,
  setConfiguration: setConfiguration
};

exports.default = stackPrefetch;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _displayTool = __webpack_require__(24);

var _displayTool2 = _interopRequireDefault(_displayTool);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Display scroll progress bar across bottom of image.
 */
var scrollBarHeight = 6;

var configuration = {
  backgroundColor: 'rgb(19, 63, 141)',
  fillColor: 'white',
  orientation: 'horizontal'
};

function onImageRendered(e, eventData) {
  var element = eventData.element;
  var width = eventData.enabledElement.canvas.width;
  var height = eventData.enabledElement.canvas.height;

  if (!width || !height) {
    return false;
  }

  var context = eventData.enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.save();

  var config = scrollIndicator.getConfiguration();

  // Draw indicator background
  context.fillStyle = config.backgroundColor;
  if (config.orientation === 'horizontal') {
    context.fillRect(0, height - scrollBarHeight, width, scrollBarHeight);
  } else {
    context.fillRect(0, 0, scrollBarHeight, height);
  }

  // Get current image index
  var stackData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackData || !stackData.data || !stackData.data.length) {
    return;
  }

  var imageIds = stackData.data[0].imageIds;
  var currentImageIdIndex = stackData.data[0].currentImageIdIndex;

  // Draw current image cursor
  var cursorWidth = width / imageIds.length;
  var cursorHeight = height / imageIds.length;
  var xPosition = cursorWidth * currentImageIdIndex;
  var yPosition = cursorHeight * currentImageIdIndex;

  context.fillStyle = config.fillColor;
  if (config.orientation === 'horizontal') {
    context.fillRect(xPosition, height - scrollBarHeight, cursorWidth, scrollBarHeight);
  } else {
    context.fillRect(0, yPosition, scrollBarHeight, cursorHeight);
  }

  context.restore();
}

var scrollIndicator = (0, _displayTool2.default)(onImageRendered);

scrollIndicator.setConfiguration(configuration);

exports.default = scrollIndicator;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fusionRenderer = __webpack_require__(88);

var _fusionRenderer2 = _interopRequireDefault(_fusionRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stackRenderers = {};

stackRenderers.FusionRenderer = _fusionRenderer2.default;

exports.default = stackRenderers;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FusionRenderer = function () {
  function FusionRenderer() {
    _classCallCheck(this, FusionRenderer);

    this.currentImageIdIndex = 0;
    this.layerIds = [];
    this.findImageFn = undefined;
  }

  _createClass(FusionRenderer, [{
    key: 'render',
    value: function render(element, imageStacks) {
      var _this = this;

      // Move this to base Renderer class
      if (!Number.isInteger(this.currentImageIdIndex)) {
        throw new Error('FusionRenderer: render - Image ID Index is not an integer');
      }

      if (!this.findImageFn) {
        throw new Error('No findImage function has been defined');
      }

      if (!imageStacks) {
        var toolData = (0, _toolState.getToolState)(element, 'stack');

        imageStacks = toolData.data;
      }
      // TODO: Figure out what to do with LoadHandlers in this scenario...

      var cornerstone = _externalModules.external.cornerstone;

      // For the base layer, go to the currentImageIdIndex
      var baseImageObject = imageStacks[0];
      var currentImageId = baseImageObject.imageIds[this.currentImageIdIndex];
      var overlayImageStacks = imageStacks.slice(1, imageStacks.length);

      cornerstone.loadAndCacheImage(currentImageId).then(function (baseImage) {
        var baseLayerId = _this.layerIds[0];

        // Get the base layer if one exists
        if (baseLayerId) {
          cornerstone.setLayerImage(element, baseImage, baseLayerId);
        } else {
          // Otherwise, create a new layer with the base layer's image
          baseLayerId = cornerstone.addLayer(element, baseImage, baseImageObject.options);
          _this.layerIds.push(baseLayerId);
        }

        // Display the image immediately while the overlay images are identified
        cornerstone.displayImage(element, baseImage);

        // Loop through the remaining 'overlay' image stacks
        overlayImageStacks.forEach(function (imgObj, overlayLayerIndex) {
          var imageId = _this.findImageFn(imgObj.imageIds, currentImageId);
          var layerIndex = overlayLayerIndex + 1;
          var currentLayerId = _this.layerIds[layerIndex];

          // If no layer exists yet for this overlaid stack, create
          // One and add it to the layerIds property for this instance
          // Of the fusion renderer.
          if (!currentLayerId) {
            currentLayerId = cornerstone.addLayer(element, undefined, imgObj.options);
            _this.layerIds.push(currentLayerId);
          }

          if (imageId) {
            // If an imageId was returned from the findImage function,
            // Load it, make sure it's visible and update the layer
            // With the new image object.
            cornerstone.loadAndCacheImage(imageId).then(function (image) {
              cornerstone.setLayerImage(element, image, currentLayerId);
              cornerstone.updateImage(element);
            });
          } else {
            // If no imageId was returned from the findImage function.
            // This means that there is no relevant image to display.
            cornerstone.setLayerImage(element, undefined, currentLayerId);
            cornerstone.setActiveLayer(element, baseLayerId);
            cornerstone.updateImage(element);
          }
        });
      });
    }
  }]);

  return FusionRenderer;
}();

exports.default = FusionRenderer;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopClip = exports.playClip = undefined;

var _externalModules = __webpack_require__(0);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _toolState = __webpack_require__(1);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-bitwise:0 */
var toolType = 'playClip';

/**
 * [private] Turns a Frame Time Vector (0018,1065) array into a normalized array of timeouts. Each element
 * ... of the resulting array represents the amount of time each frame will remain on the screen.
 * @param {Array} vector A Frame Time Vector (0018,1065) as specified in section C.7.6.5.1.2 of DICOM standard.
 * @param {Number} speed A speed factor which will be applied to each element of the resulting array.
 * @return {Array} An array with timeouts for each animation frame.
 */
function getPlayClipTimeouts(vector, speed) {

  var i = void 0;
  var sample = void 0;
  var delay = void 0;
  var sum = 0;
  var limit = vector.length;
  var timeouts = [];

  // Initialize time varying to false
  timeouts.isTimeVarying = false;

  if (typeof speed !== 'number' || speed <= 0) {
    speed = 1;
  }

  // First element of a frame time vector must be discarded
  for (i = 1; i < limit; i++) {
    delay = Number(vector[i]) / speed | 0; // Integral part only
    timeouts.push(delay);
    if (i === 1) {
      // Use first item as a sample for comparison
      sample = delay;
    } else if (delay !== sample) {
      timeouts.isTimeVarying = true;
    }

    sum += delay;
  }

  if (timeouts.length > 0) {
    if (timeouts.isTimeVarying) {
      // If it's a time varying vector, make the last item an average...
      delay = sum / timeouts.length | 0;
    } else {
      delay = timeouts[0];
    }

    timeouts.push(delay);
  }

  return timeouts;
}

/**
 * [private] Performs the heavy lifting of stopping an ongoing animation.
 * @param {Object} playClipData The data from playClip that needs to be stopped.
 * @return void
 */
function stopClipWithData(playClipData) {
  var id = playClipData.intervalId;

  if (typeof id !== 'undefined') {
    playClipData.intervalId = undefined;
    if (playClipData.usingFrameTimeVector) {
      clearTimeout(id);
    } else {
      clearInterval(id);
    }
  }
}

/**
 * [private] Trigger playClip tool stop event.
 * @param element
 * @return void
 */
function triggerStopEvent(element) {
  var eventDetail = {
    element: element
  };

  (0, _triggerEvent2.default)(element, 'CornerstoneToolsClipStopped', eventDetail);
}

/**
 * Starts playing a clip or adjusts the frame rate of an already playing clip.  framesPerSecond is
 * optional and defaults to 30 if not specified.  A negative framesPerSecond will play the clip in reverse.
 * The element must be a stack of images
 * @param element
 * @param framesPerSecond
 */
function playClip(element, framesPerSecond) {
  var playClipData = void 0;
  var playClipTimeouts = void 0;

  if (element === undefined) {
    throw new Error('playClip: element must not be undefined');
  }

  var stackToolData = (0, _toolState.getToolState)(element, 'stack');

  if (!stackToolData || !stackToolData.data || !stackToolData.data.length) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // If we have more than one stack, check if we have a stack renderer defined
  var stackRenderer = void 0;

  if (stackToolData.data.length > 1) {
    var stackRendererData = (0, _toolState.getToolState)(element, 'stackRenderer');

    if (stackRendererData && stackRendererData.data && stackRendererData.data.length) {
      stackRenderer = stackRendererData.data[0];
    }
  }

  var stackData = stackToolData.data[0];

  var playClipToolData = (0, _toolState.getToolState)(element, toolType);

  if (!playClipToolData || !playClipToolData.data || !playClipToolData.data.length) {
    playClipData = {
      intervalId: undefined,
      framesPerSecond: 30,
      lastFrameTimeStamp: undefined,
      frameRate: 0,
      frameTimeVector: undefined,
      ignoreFrameTimeVector: false,
      usingFrameTimeVector: false,
      speed: 1,
      reverse: false,
      loop: true
    };
    (0, _toolState.addToolState)(element, toolType, playClipData);
  } else {
    playClipData = playClipToolData.data[0];
    // Make sure the specified clip is not running before any property update
    stopClipWithData(playClipData);
  }

  // If a framesPerSecond is specified and is valid, update the playClipData now
  if (framesPerSecond < 0 || framesPerSecond > 0) {
    playClipData.framesPerSecond = Number(framesPerSecond);
    playClipData.reverse = playClipData.framesPerSecond < 0;
    // If framesPerSecond is given, frameTimeVector will be ignored...
    playClipData.ignoreFrameTimeVector = true;
  }

  // Determine if frame time vector should be used instead of a fixed frame rate...
  if (playClipData.ignoreFrameTimeVector !== true && playClipData.frameTimeVector && playClipData.frameTimeVector.length === stackData.imageIds.length) {
    playClipTimeouts = getPlayClipTimeouts(playClipData.frameTimeVector, playClipData.speed);
  }

  // This function encapsulates the frame rendering logic...
  var playClipAction = function playClipAction() {

    // Hoisting of context variables
    var loader = void 0,
        startLoadingHandler = void 0,
        endLoadingHandler = void 0,
        errorLoadingHandler = void 0,
        newImageIdIndex = stackData.currentImageIdIndex;

    var imageCount = stackData.imageIds.length;

    if (playClipData.reverse) {
      newImageIdIndex--;
    } else {
      newImageIdIndex++;
    }

    if (!playClipData.loop && (newImageIdIndex < 0 || newImageIdIndex >= imageCount)) {
      stopClipWithData(playClipData);
      triggerStopEvent(element);

      return;
    }

    // Loop around if we go outside the stack
    if (newImageIdIndex >= imageCount) {
      newImageIdIndex = 0;
    }

    if (newImageIdIndex < 0) {
      newImageIdIndex = imageCount - 1;
    }

    if (newImageIdIndex !== stackData.currentImageIdIndex) {

      startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
      endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
      errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

      if (startLoadingHandler) {
        startLoadingHandler(element);
      }

      if (stackData.preventCache === true) {
        loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
      } else {
        loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
      }

      loader.then(function (image) {
        try {
          stackData.currentImageIdIndex = newImageIdIndex;
          if (stackRenderer) {
            stackRenderer.currentImageIdIndex = newImageIdIndex;
            stackRenderer.render(element, stackToolData.data);
          } else {
            cornerstone.displayImage(element, image);
          }
          if (endLoadingHandler) {
            endLoadingHandler(element, image);
          }
        } catch (error) {
          return;
        }
      }, function (error) {
        var imageId = stackData.imageIds[newImageIdIndex];

        if (errorLoadingHandler) {
          errorLoadingHandler(element, imageId, error);
        }
      });
    }
  };

  // If playClipTimeouts array is available, not empty and its elements are NOT uniform ...
  // ... (at least one timeout is different from the others), use alternate setTimeout implementation
  if (playClipTimeouts && playClipTimeouts.length > 0 && playClipTimeouts.isTimeVarying) {
    playClipData.usingFrameTimeVector = true;
    playClipData.intervalId = setTimeout(function playClipTimeoutHandler() {
      playClipData.intervalId = setTimeout(playClipTimeoutHandler, playClipTimeouts[stackData.currentImageIdIndex]);
      playClipAction();
    }, 0);
  } else {
    // ... otherwise user setInterval implementation which is much more efficient.
    playClipData.usingFrameTimeVector = false;
    playClipData.intervalId = setInterval(playClipAction, 1000 / Math.abs(playClipData.framesPerSecond));
  }
}

/**
 * Stops an already playing clip.
 * * @param element
 */
function stopClip(element) {

  var playClipToolData = (0, _toolState.getToolState)(element, toolType);

  if (!playClipToolData || !playClipToolData.data || !playClipToolData.data.length) {
    return;
  }

  stopClipWithData(playClipToolData.data[0]);
}

exports.playClip = playClip;
exports.stopClip = stopClip;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mouseX = void 0;
var mouseY = void 0;

function keyPress(e) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = e.currentTarget;

  var keyPressData = {
    event: window.event || e, // Old IE support
    element: element,
    viewport: cornerstone.getViewport(element),
    image: cornerstone.getEnabledElement(element).image,
    currentPoints: {
      page: {
        x: mouseX,
        y: mouseY
      },
      image: cornerstone.pageToPixel(element, mouseX, mouseY)
    },
    keyCode: e.keyCode,
    which: e.which
  };

  keyPressData.currentPoints.canvas = cornerstone.pixelToCanvas(element, keyPressData.currentPoints.image);

  var keyPressEvents = {
    keydown: 'CornerstoneToolsKeyDown',
    keypress: 'CornerstoneToolsKeyPress',
    keyup: 'CornerstoneToolsKeyUp'

  };

  (0, _triggerEvent2.default)(element, keyPressEvents[e.type], keyPressData);
}

function mouseMove(e) {
  mouseX = e.pageX || e.originalEvent.pageX;
  mouseY = e.pageY || e.originalEvent.pageY;
}

var keyboardEvent = 'keydown keypress keyup';

function enable(element) {
  // Prevent handlers from being attached multiple times
  disable(element);

  _externalModules.external.$(element).on(keyboardEvent, keyPress);
  _externalModules.external.$(element).on('mousemove', mouseMove);
}

function disable(element) {
  _externalModules.external.$(element).off(keyboardEvent, keyPress);
  _externalModules.external.$(element).off('mousemove', mouseMove);
}

// Module exports
var keyboardInput = {
  enable: enable,
  disable: disable
};

exports.default = keyboardInput;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _copyPoints = __webpack_require__(35);

var _copyPoints2 = _interopRequireDefault(_copyPoints);

var _pauseEvent = __webpack_require__(33);

var _pauseEvent2 = _interopRequireDefault(_pauseEvent);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isClickEvent = true;
var preventClickTimeout = void 0;
var clickDelay = 200;

function getEventWhich(event) {
  if (typeof event.buttons !== 'number') {
    return event.which;
  }

  if (event.buttons === 0) {
    return 0;
  } else if (event.buttons % 2 === 1) {
    return 1;
  } else if (event.buttons % 4 === 2) {
    return 3;
  } else if (event.buttons % 8 === 4) {
    return 2;
  }

  return 0;
}

function preventClickHandler() {
  isClickEvent = false;
}

function mouseDoubleClick(e) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = e.currentTarget;
  var eventType = 'CornerstoneToolsMouseDoubleClick';

  var startPoints = {
    page: _externalModules.cornerstoneMath.point.pageToPoint(e),
    image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
    client: {
      x: e.clientX,
      y: e.clientY
    }
  };

  startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

  var lastPoints = (0, _copyPoints2.default)(startPoints);
  var eventData = {
    event: e,
    which: getEventWhich(e),
    viewport: cornerstone.getViewport(element),
    image: cornerstone.getEnabledElement(element).image,
    element: element,
    startPoints: startPoints,
    lastPoints: lastPoints,
    currentPoints: startPoints,
    deltaPoints: {
      x: 0,
      y: 0
    },
    type: eventType
  };

  (0, _triggerEvent2.default)(eventData.element, eventType, eventData);
}

function mouseDown(e) {
  preventClickTimeout = setTimeout(preventClickHandler, clickDelay);

  var cornerstone = _externalModules.external.cornerstone;
  var element = e.currentTarget;
  var eventType = 'CornerstoneToolsMouseDown';

  // Prevent CornerstoneToolsMouseMove while mouse is down
  _externalModules.external.$(element).off('mousemove', mouseMove);

  var startPoints = {
    page: _externalModules.cornerstoneMath.point.pageToPoint(e),
    image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
    client: {
      x: e.clientX,
      y: e.clientY
    }
  };

  startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

  var lastPoints = (0, _copyPoints2.default)(startPoints);
  var eventData = {
    event: e,
    which: getEventWhich(e),
    viewport: cornerstone.getViewport(element),
    image: cornerstone.getEnabledElement(element).image,
    element: element,
    startPoints: startPoints,
    lastPoints: lastPoints,
    currentPoints: startPoints,
    deltaPoints: {
      x: 0,
      y: 0
    },
    type: eventType
  };

  var eventPropagated = (0, _triggerEvent2.default)(eventData.element, eventType, eventData);

  if (eventPropagated) {
    // No tools responded to this event, create a new tool
    eventData.type = 'CornerstoneToolsMouseDownActivate';
    (0, _triggerEvent2.default)(eventData.element, 'CornerstoneToolsMouseDownActivate', eventData);
  }

  var whichMouseButton = getEventWhich(e);

  function onMouseMove(e) {
    // Calculate our current points in page and image coordinates
    var eventType = 'CornerstoneToolsMouseDrag';
    var currentPoints = {
      page: _externalModules.cornerstoneMath.point.pageToPoint(e),
      image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
      client: {
        x: e.clientX,
        y: e.clientY
      }
    };

    currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

    // Calculate delta values in page and image coordinates
    var deltaPoints = {
      page: _externalModules.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
      image: _externalModules.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
      client: _externalModules.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
      canvas: _externalModules.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
    };

    var eventData = {
      which: whichMouseButton,
      viewport: cornerstone.getViewport(element),
      image: cornerstone.getEnabledElement(element).image,
      element: element,
      startPoints: startPoints,
      lastPoints: lastPoints,
      currentPoints: currentPoints,
      deltaPoints: deltaPoints,
      type: eventType,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      shiftKey: e.shiftKey
    };

    (0, _triggerEvent2.default)(eventData.element, eventType, eventData);

    // Update the last points
    lastPoints = (0, _copyPoints2.default)(currentPoints);

    // Prevent left click selection of DOM elements
    return (0, _pauseEvent2.default)(e);
  }

  // Hook mouseup so we can unbind our event listeners
  // When they stop dragging
  function onMouseUp(e) {
    // Cancel the timeout preventing the click event from triggering
    clearTimeout(preventClickTimeout);

    var eventType = 'CornerstoneToolsMouseUp';

    if (isClickEvent) {
      eventType = 'CornerstoneToolsMouseClick';
    }

    // Calculate our current points in page and image coordinates
    var currentPoints = {
      page: _externalModules.cornerstoneMath.point.pageToPoint(e),
      image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
      client: {
        x: e.clientX,
        y: e.clientY
      }
    };

    currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

    // Calculate delta values in page and image coordinates
    var deltaPoints = {
      page: _externalModules.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
      image: _externalModules.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
      client: _externalModules.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
      canvas: _externalModules.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
    };

    var eventData = {
      event: e,
      which: whichMouseButton,
      viewport: cornerstone.getViewport(element),
      image: cornerstone.getEnabledElement(element).image,
      element: element,
      startPoints: startPoints,
      lastPoints: lastPoints,
      currentPoints: currentPoints,
      deltaPoints: deltaPoints,
      type: eventType
    };

    (0, _triggerEvent2.default)(eventData.element, eventType, eventData);

    _externalModules.external.$(document).off('mousemove', onMouseMove);
    _externalModules.external.$(document).off('mouseup', onMouseUp);

    _externalModules.external.$(eventData.element).on('mousemove', mouseMove);

    isClickEvent = true;
  }

  _externalModules.external.$(document).on('mousemove', onMouseMove);
  _externalModules.external.$(document).on('mouseup', onMouseUp);

  return (0, _pauseEvent2.default)(e);
}

function mouseMove(e) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = e.currentTarget;
  var eventType = 'CornerstoneToolsMouseMove';

  var startPoints = {
    page: _externalModules.cornerstoneMath.point.pageToPoint(e),
    image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
    client: {
      x: e.clientX,
      y: e.clientY
    }
  };

  startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

  var lastPoints = (0, _copyPoints2.default)(startPoints);

  var whichMouseButton = getEventWhich(e);

  // Calculate our current points in page and image coordinates
  var currentPoints = {
    page: _externalModules.cornerstoneMath.point.pageToPoint(e),
    image: cornerstone.pageToPixel(element, e.pageX, e.pageY),
    client: {
      x: e.clientX,
      y: e.clientY
    }
  };

  currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

  // Calculate delta values in page and image coordinates
  var deltaPoints = {
    page: _externalModules.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
    image: _externalModules.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
    client: _externalModules.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
    canvas: _externalModules.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
  };

  var eventData = {
    which: whichMouseButton,
    viewport: cornerstone.getViewport(element),
    image: cornerstone.getEnabledElement(element).image,
    element: element,
    startPoints: startPoints,
    lastPoints: lastPoints,
    currentPoints: currentPoints,
    deltaPoints: deltaPoints,
    type: eventType
  };

  (0, _triggerEvent2.default)(element, eventType, eventData);

  // Update the last points
  lastPoints = (0, _copyPoints2.default)(currentPoints);
}

function disable(element) {
  _externalModules.external.$(element).off('mousedown', mouseDown);
  _externalModules.external.$(element).off('mousemove', mouseMove);
  _externalModules.external.$(element).off('dblclick', mouseDoubleClick);
}

function enable(element) {
  // Prevent handlers from being attached multiple times
  disable(element);

  _externalModules.external.$(element).on('mousedown', mouseDown);
  _externalModules.external.$(element).on('mousemove', mouseMove);
  _externalModules.external.$(element).on('dblclick', mouseDoubleClick);
}

// Module exports
var mouseInput = {
  enable: enable,
  disable: disable
};

exports.default = mouseInput;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mouseWheel(e) {
  // !!!HACK/NOTE/WARNING!!!
  // For some reason I am getting mousewheel and DOMMouseScroll events on my
  // Mac os x mavericks system when middle mouse button dragging.
  // I couldn't find any info about this so this might break other systems
  // Webkit hack
  if (e.originalEvent.type === 'mousewheel' && e.originalEvent.wheelDeltaY === 0) {
    return;
  }
  // Firefox hack
  if (e.originalEvent.type === 'DOMMouseScroll' && e.originalEvent.axis === 1) {
    return;
  }

  e.preventDefault();

  var cornerstone = _externalModules.external.cornerstone;
  var element = e.currentTarget;

  var x = void 0;
  var y = void 0;

  if (e.pageX !== undefined && e.pageY !== undefined) {
    x = e.pageX;
    y = e.pageY;
  } else if (e.originalEvent && e.originalEvent.pageX !== undefined && e.originalEvent.pageY !== undefined) {
    x = e.originalEvent.pageX;
    y = e.originalEvent.pageY;
  } else {
    // IE9 & IE10
    x = e.x;
    y = e.y;
  }

  var startingCoords = cornerstone.pageToPixel(element, x, y);

  e = window.event && window.event.wheelDelta ? window.event : e; // Old IE support

  var wheelDelta = void 0;

  if (e.originalEvent && e.originalEvent.wheelDelta) {
    wheelDelta = -e.originalEvent.wheelDelta;
  } else if (e.originalEvent && e.originalEvent.deltaY) {
    wheelDelta = -e.originalEvent.deltaY;
  } else if (e.originalEvent && e.originalEvent.detail) {
    wheelDelta = -e.originalEvent.detail;
  } else {
    wheelDelta = e.wheelDelta;
  }

  var direction = wheelDelta < 0 ? -1 : 1;

  var mouseWheelData = {
    element: element,
    viewport: cornerstone.getViewport(element),
    image: cornerstone.getEnabledElement(element).image,
    direction: direction,
    pageX: x,
    pageY: y,
    imageX: startingCoords.x,
    imageY: startingCoords.y
  };

  (0, _triggerEvent2.default)(element, 'CornerstoneToolsMouseWheel', mouseWheelData);
}

var mouseWheelEvents = 'mousewheel DOMMouseScroll';

function enable(element) {
  // Prevent handlers from being attached multiple times
  disable(element);

  _externalModules.external.$(element).on(mouseWheelEvents, mouseWheel);
}

function disable(element) {
  _externalModules.external.$(element).unbind(mouseWheelEvents, mouseWheel);
}

// Module exports
var mouseWheelInput = {
  enable: enable,
  disable: disable
};

exports.default = mouseWheelInput;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _copyPoints = __webpack_require__(35);

var _copyPoints2 = _interopRequireDefault(_copyPoints);

var _pauseEvent = __webpack_require__(33);

var _pauseEvent2 = _interopRequireDefault(_pauseEvent);

var _preventGhostClick = __webpack_require__(54);

var _preventGhostClick2 = _interopRequireDefault(_preventGhostClick);

var _triggerEvent = __webpack_require__(3);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startPoints = void 0,
    currentPoints = void 0,
    lastPoints = void 0,
    deltaPoints = void 0,
    eventData = void 0,
    touchStartDelay = void 0,
    pressTimeout = void 0,
    pageDistanceMoved = void 0;

var lastScale = 1.0,
    lastRotation = 0.0,
    preventNextPinch = false,
    isPress = false,
    lastDelta = void 0;

var pressDelay = 700,
    pressMaxDistance = 5;

function onTouch(e) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = e.currentTarget || e.srcEvent.currentTarget;
  var eventType = void 0,
      scaleChange = void 0,
      delta = void 0,
      remainingPointers = void 0,
      rotation = void 0;

  // Prevent mouse events from occurring alongside touch events
  e.preventDefault();

  // If more than one finger is placed on the element, stop the press timeout
  if (e.pointers && e.pointers.length > 1 || e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length > 1) {
    isPress = false;
    clearTimeout(pressTimeout);
  }

  switch (e.type) {
    case 'tap':
      isPress = false;
      clearTimeout(pressTimeout);

      // Calculate our current points in page and image coordinates
      currentPoints = {
        page: _externalModules.cornerstoneMath.point.pageToPoint(e.pointers[0]),
        image: cornerstone.pageToPixel(element, e.pointers[0].pageX, e.pointers[0].pageY),
        client: {
          x: e.pointers[0].clientX,
          y: e.pointers[0].clientY
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

      eventType = 'CornerstoneToolsTap';
      eventData = {
        event: e,
        viewport: cornerstone.getViewport(element),
        image: cornerstone.getEnabledElement(element).image,
        element: element,
        currentPoints: currentPoints,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);
      break;

    case 'doubletap':
      isPress = false;
      clearTimeout(pressTimeout);

      // Calculate our current points in page and image coordinates
      currentPoints = {
        page: _externalModules.cornerstoneMath.point.pageToPoint(e.pointers[0]),
        image: cornerstone.pageToPixel(element, e.pointers[0].pageX, e.pointers[0].pageY),
        client: {
          x: e.pointers[0].clientX,
          y: e.pointers[0].clientY
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

      eventType = 'CornerstoneToolsDoubleTap';
      eventData = {
        event: e,
        viewport: cornerstone.getViewport(element),
        image: cornerstone.getEnabledElement(element).image,
        element: element,
        currentPoints: currentPoints,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);
      break;

    case 'pinchstart':
      isPress = false;
      clearTimeout(pressTimeout);

      lastScale = 1.0;
      break;

    case 'pinchmove':
      isPress = false;
      clearTimeout(pressTimeout);

      if (preventNextPinch === true) {
        lastScale = e.scale;
        preventNextPinch = false;
        break;
      }

      scaleChange = (e.scale - lastScale) / lastScale;

      startPoints = {
        page: e.center,
        image: cornerstone.pageToPixel(element, e.center.x, e.center.y)
      };
      startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

      eventType = 'CornerstoneToolsTouchPinch';
      eventData = {
        event: e,
        startPoints: startPoints,
        viewport: cornerstone.getViewport(element),
        image: cornerstone.getEnabledElement(element).image,
        element: element,
        direction: e.scale < 1 ? 1 : -1,
        scaleChange: scaleChange,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);

      lastScale = e.scale;
      break;

    case 'touchstart':
      lastScale = 1.0;

      clearTimeout(pressTimeout);

      clearTimeout(touchStartDelay);
      touchStartDelay = setTimeout(function () {
        startPoints = {
          page: _externalModules.cornerstoneMath.point.pageToPoint(e.originalEvent.touches[0]),
          image: cornerstone.pageToPixel(element, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY),
          client: {
            x: e.originalEvent.touches[0].clientX,
            y: e.originalEvent.touches[0].clientY
          }
        };
        startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

        eventType = 'CornerstoneToolsTouchStart';
        if (e.originalEvent.touches.length > 1) {
          eventType = 'CornerstoneToolsMultiTouchStart';
        }

        eventData = {
          event: e,
          viewport: cornerstone.getViewport(element),
          image: cornerstone.getEnabledElement(element).image,
          element: element,
          startPoints: startPoints,
          currentPoints: startPoints,
          type: eventType,
          isTouchEvent: true
        };

        var eventPropagated = (0, _triggerEvent2.default)(element, eventType, eventData);

        if (eventPropagated === true) {
          // IsPress = false;
          // ClearTimeout(pressTimeout);

          // No current tools responded to the drag action.
          // Create new tool measurement
          eventType = 'CornerstoneToolsTouchStartActive';
          if (e.originalEvent.touches.length > 1) {
            eventType = 'CornerstoneToolsMultiTouchStartActive';
          }

          eventData.type = eventType;
          (0, _triggerEvent2.default)(element, eventType, eventData);
        }

        // Console.log(eventType);
        lastPoints = (0, _copyPoints2.default)(startPoints);
      }, 50);

      isPress = true;
      pageDistanceMoved = 0;
      pressTimeout = setTimeout(function () {
        if (!isPress) {
          return;
        }

        currentPoints = {
          page: _externalModules.cornerstoneMath.point.pageToPoint(e.originalEvent.touches[0]),
          image: cornerstone.pageToPixel(element, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY),
          client: {
            x: e.originalEvent.touches[0].clientX,
            y: e.originalEvent.touches[0].clientY
          }
        };
        currentPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

        eventType = 'CornerstoneToolsTouchPress';
        eventData = {
          event: e,
          viewport: cornerstone.getViewport(element),
          image: cornerstone.getEnabledElement(element).image,
          element: element,
          currentPoints: currentPoints,
          type: eventType,
          isTouchEvent: true
        };

        (0, _triggerEvent2.default)(element, eventType, eventData);

        // Console.log(eventType);
      }, pressDelay);
      break;

    case 'touchend':
      lastScale = 1.0;

      isPress = false;
      clearTimeout(pressTimeout);

      setTimeout(function () {
        startPoints = {
          page: _externalModules.cornerstoneMath.point.pageToPoint(e.originalEvent.changedTouches[0]),
          image: cornerstone.pageToPixel(element, e.originalEvent.changedTouches[0].pageX, e.originalEvent.changedTouches[0].pageY),
          client: {
            x: e.originalEvent.changedTouches[0].clientX,
            y: e.originalEvent.changedTouches[0].clientY
          }
        };
        startPoints.canvas = cornerstone.pixelToCanvas(element, startPoints.image);

        eventType = 'CornerstoneToolsTouchEnd';

        eventData = {
          event: e,
          viewport: cornerstone.getViewport(element),
          image: cornerstone.getEnabledElement(element).image,
          element: element,
          startPoints: startPoints,
          currentPoints: startPoints,
          type: eventType,
          isTouchEvent: true
        };

        (0, _triggerEvent2.default)(element, eventType, eventData);
      }, 50);
      break;

    case 'panmove':
      // Using the delta-value of HammerJS, because it takes all pointers into account
      // This is very important when using panning in combination with pinch-zooming
      // But HammerJS' delta is relative to the start of the pan event
      // So it needs to be converted to a per-event-delta for CornerstoneTools
      delta = {
        x: e.deltaX - lastDelta.x,
        y: e.deltaY - lastDelta.y
      };

      lastDelta = {
        x: e.deltaX,
        y: e.deltaY
      };

      // Calculate our current points in page and image coordinates
      currentPoints = {
        page: {
          x: lastPoints.page.x + delta.x,
          y: lastPoints.page.y + delta.y
        },
        image: cornerstone.pageToPixel(element, lastPoints.page.x + delta.x, lastPoints.page.y + delta.y),
        client: {
          x: lastPoints.client.x + delta.x,
          y: lastPoints.client.y + delta.y
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

      // Calculate delta values in page and image coordinates
      deltaPoints = {
        page: _externalModules.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
        image: _externalModules.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
        client: _externalModules.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
        canvas: _externalModules.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
      };

      pageDistanceMoved += Math.sqrt(deltaPoints.page.x * deltaPoints.page.x + deltaPoints.page.y * deltaPoints.page.y);
      // Console.log("pageDistanceMoved: " + pageDistanceMoved);
      if (pageDistanceMoved > pressMaxDistance) {
        // Console.log('Press event aborted due to movement');
        isPress = false;
        clearTimeout(pressTimeout);
      }

      eventType = 'CornerstoneToolsTouchDrag';
      if (e.pointers.length > 1) {
        eventType = 'CornerstoneToolsMultiTouchDrag';
      }

      eventData = {
        viewport: cornerstone.getViewport(element),
        image: cornerstone.getEnabledElement(element).image,
        element: element,
        startPoints: startPoints,
        lastPoints: lastPoints,
        currentPoints: currentPoints,
        deltaPoints: deltaPoints,
        numPointers: e.pointers.length,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);

      lastPoints = (0, _copyPoints2.default)(currentPoints);
      break;

    case 'panstart':
      lastDelta = {
        x: e.deltaX,
        y: e.deltaY
      };

      currentPoints = {
        page: _externalModules.cornerstoneMath.point.pageToPoint(e.pointers[0]),
        image: cornerstone.pageToPixel(element, e.pointers[0].pageX, e.pointers[0].pageY),
        client: {
          x: e.pointers[0].clientX,
          y: e.pointers[0].clientY
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);
      lastPoints = (0, _copyPoints2.default)(currentPoints);
      break;

    case 'panend':
      isPress = false;
      clearTimeout(pressTimeout);

      // If lastPoints is not yet set, it means panend fired without panstart or pan,
      // So we can ignore this event
      if (!lastPoints) {
        return false;
      }

      currentPoints = {
        page: _externalModules.cornerstoneMath.point.pageToPoint(e.pointers[0]),
        image: cornerstone.pageToPixel(element, e.pointers[0].pageX, e.pointers[0].pageY),
        client: {
          x: e.pointers[0].clientX,
          y: e.pointers[0].clientY
        }
      };
      currentPoints.canvas = cornerstone.pixelToCanvas(element, currentPoints.image);

      // Calculate delta values in page and image coordinates
      deltaPoints = {
        page: _externalModules.cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page),
        image: _externalModules.cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image),
        client: _externalModules.cornerstoneMath.point.subtract(currentPoints.client, lastPoints.client),
        canvas: _externalModules.cornerstoneMath.point.subtract(currentPoints.canvas, lastPoints.canvas)
      };

      eventType = 'CornerstoneToolsDragEnd';

      eventData = {
        event: e.srcEvent,
        viewport: cornerstone.getViewport(element),
        image: cornerstone.getEnabledElement(element).image,
        element: element,
        startPoints: startPoints,
        lastPoints: lastPoints,
        currentPoints: currentPoints,
        deltaPoints: deltaPoints,
        type: eventType,
        isTouchEvent: true
      };

      (0, _triggerEvent2.default)(element, eventType, eventData);

      remainingPointers = e.pointers.length - e.changedPointers.length;

      if (remainingPointers === 2) {
        preventNextPinch = true;
      }

      return (0, _pauseEvent2.default)(e);

    case 'rotatemove':
      isPress = false;
      clearTimeout(pressTimeout);

      rotation = e.rotation - lastRotation;

      lastRotation = e.rotation;

      eventType = 'CornerstoneToolsTouchRotate';
      eventData = {
        event: e.srcEvent,
        viewport: cornerstone.getViewport(element),
        image: cornerstone.getEnabledElement(element).image,
        element: element,
        rotation: rotation,
        type: eventType
      };
      (0, _triggerEvent2.default)(element, eventType, eventData);
      break;
  }

  return false;
}

function enable(element) {
  disable(element);
  var Hammer = _externalModules.external.Hammer;

  var hammerOptions = {
    inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
  };

  var mc = new Hammer.Manager(element, hammerOptions);

  var panOptions = {
    pointers: 0,
    direction: Hammer.DIRECTION_ALL,
    threshold: 0
  };

  var pan = new Hammer.Pan(panOptions);
  var pinch = new Hammer.Pinch({
    threshold: 0
  });
  var rotate = new Hammer.Rotate({
    threshold: 0
  });

  // We want to detect both the same time
  pinch.recognizeWith(pan);
  pinch.recognizeWith(rotate);
  rotate.recognizeWith(pan);

  var doubleTap = new Hammer.Tap({
    event: 'doubletap',
    taps: 2,
    interval: 1500,
    threshold: 50,
    posThreshold: 50
  });

  doubleTap.recognizeWith(pan);

  // Add to the Manager
  mc.add([doubleTap, pan, rotate, pinch]);
  mc.on('tap doubletap panstart panmove panend pinchstart pinchmove rotatemove', onTouch);

  _preventGhostClick2.default.enable(element);
  _externalModules.external.$(element).on('touchstart touchend', onTouch);
  _externalModules.external.$(element).data('hammer', mc);
}

function disable(element) {
  _preventGhostClick2.default.disable(element);
  _externalModules.external.$(element).off('touchstart touchend', onTouch);
  var mc = _externalModules.external.$(element).data('hammer');

  if (mc) {
    mc.off('tap doubletap panstart panmove panend pinchmove rotatemove', onTouch);
  }
}

// Module exports
var touchInput = {
  enable: enable,
  disable: disable
};

exports.default = touchInput;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.angleTouch = exports.angle = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _roundToDecimal = __webpack_require__(31);

var _roundToDecimal2 = _interopRequireDefault(_roundToDecimal);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _textStyle = __webpack_require__(14);

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'angle';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var angleData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x - 20,
        y: mouseEventData.currentPoints.image.y + 10,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      start2: {
        x: mouseEventData.currentPoints.image.x - 20,
        y: mouseEventData.currentPoints.image.y + 10,
        highlight: true,
        active: false
      },
      end2: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y + 20,
        highlight: true,
        active: false
      }
    }
  };

  return angleData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  var cornerstone = _externalModules.external.cornerstone;

  var lineSegment = {
    start: cornerstone.pixelToCanvas(element, data.handles.start),
    end: cornerstone.pixelToCanvas(element, data.handles.end)
  };

  var distanceToPoint = _externalModules.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  if (distanceToPoint < 5) {
    return true;
  }

  lineSegment.start = cornerstone.pixelToCanvas(element, data.handles.start2);
  lineSegment.end = cornerstone.pixelToCanvas(element, data.handles.end2);

  distanceToPoint = _externalModules.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  return distanceToPoint < 5;
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e, eventData) {

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Activation color
  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var font = _textStyle2.default.getFont();
  var config = angle.getConfiguration();
  var cornerstone = _externalModules.external.cornerstone;

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    // Configurable shadow
    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    // Differentiate the color of activation tool
    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    // Draw the line
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    context.moveTo(handleStartCanvas.x, handleStartCanvas.y);
    context.lineTo(handleEndCanvas.x, handleEndCanvas.y);

    handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start2);
    handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end2);

    context.moveTo(handleStartCanvas.x, handleStartCanvas.y);
    context.lineTo(handleEndCanvas.x, handleEndCanvas.y);
    context.stroke();

    // Draw the handles
    (0, _drawHandles2.default)(context, eventData, data.handles);

    // Draw the text
    context.fillStyle = color;

    // Need to work on correct angle to measure.  This is a cobb angle and we need to determine
    // Where lines cross to measure angle. For now it will show smallest angle.
    var dx1 = (Math.ceil(data.handles.start.x) - Math.ceil(data.handles.end.x)) * eventData.image.columnPixelSpacing;
    var dy1 = (Math.ceil(data.handles.start.y) - Math.ceil(data.handles.end.y)) * eventData.image.rowPixelSpacing;
    var dx2 = (Math.ceil(data.handles.start2.x) - Math.ceil(data.handles.end2.x)) * eventData.image.columnPixelSpacing;
    var dy2 = (Math.ceil(data.handles.start2.y) - Math.ceil(data.handles.end2.y)) * eventData.image.rowPixelSpacing;

    var _angle = Math.acos(Math.abs((dx1 * dx2 + dy1 * dy2) / (Math.sqrt(dx1 * dx1 + dy1 * dy1) * Math.sqrt(dx2 * dx2 + dy2 * dy2))));

    _angle *= 180 / Math.PI;

    var rAngle = (0, _roundToDecimal2.default)(_angle, 2);
    var str = '00B0'; // Degrees symbol
    var text = rAngle.toString() + String.fromCharCode(parseInt(str, 16));

    var textX = (handleStartCanvas.x + handleEndCanvas.x) / 2;
    var textY = (handleStartCanvas.y + handleEndCanvas.y) / 2;

    context.font = font;
    (0, _drawTextBox2.default)(context, text, textX, textY, color);
    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var angle = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var angleTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.angle = angle;
exports.angleTouch = angleTouch;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrowAnnotateTouch = exports.arrowAnnotate = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _textStyle = __webpack_require__(14);

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawArrow = __webpack_require__(49);

var _drawArrow2 = _interopRequireDefault(_drawArrow);

var _moveNewHandle = __webpack_require__(23);

var _moveNewHandle2 = _interopRequireDefault(_moveNewHandle);

var _moveNewHandleTouch = __webpack_require__(25);

var _moveNewHandleTouch2 = _interopRequireDefault(_moveNewHandleTouch);

var _anyHandlesOutsideImage = __webpack_require__(12);

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _pointInsideBoundingBox = __webpack_require__(16);

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'arrowAnnotate';

// Define a callback to get your text annotation
// This could be used, e.g. to open a modal
/* eslint no-alert:0 */
function getTextCallback(doneChangingTextCallback) {
  doneChangingTextCallback(prompt('Enter your annotation:'));
}

function changeTextCallback(data, eventData, doneChangingTextCallback) {
  doneChangingTextCallback(prompt('Change your annotation:'));
}

var configuration = {
  getTextCallback: getTextCallback,
  changeTextCallback: changeTextCallback,
  drawHandles: false,
  drawHandlesOnHover: true,
  arrowFirst: true
};

// / --- Mouse Tool --- ///

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurement(mouseEventData) {
  var measurementData = createNewMeasurement(mouseEventData);
  var cornerstone = _externalModules.external.cornerstone;

  var eventData = {
    mouseButtonMask: mouseEventData.which
  };

  function doneChangingTextCallback(text) {
    if (text === null) {
      (0, _toolState.removeToolState)(mouseEventData.element, toolType, measurementData);
    } else {
      measurementData.text = text;
    }

    measurementData.active = false;
    cornerstone.updateImage(mouseEventData.element);

    _externalModules.external.$(mouseEventData.element).on('CornerstoneToolsMouseMove', eventData, arrowAnnotate.mouseMoveCallback);
    _externalModules.external.$(mouseEventData.element).on('CornerstoneToolsMouseDown', eventData, arrowAnnotate.mouseDownCallback);
    _externalModules.external.$(mouseEventData.element).on('CornerstoneToolsMouseDownActivate', eventData, arrowAnnotate.mouseDownActivateCallback);
    _externalModules.external.$(mouseEventData.element).on('CornerstoneToolsMouseDoubleClick', eventData, arrowAnnotate.mouseDoubleClickCallback);
  }

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(mouseEventData.element, toolType, measurementData);

  // Since we are dragging to another place to drop the end point, we can just activate
  // The end point and let the moveHandle move it for us.
  _externalModules.external.$(mouseEventData.element).off('CornerstoneToolsMouseMove', arrowAnnotate.mouseMoveCallback);
  _externalModules.external.$(mouseEventData.element).off('CornerstoneToolsMouseDown', arrowAnnotate.mouseDownCallback);
  _externalModules.external.$(mouseEventData.element).off('CornerstoneToolsMouseDownActivate', arrowAnnotate.mouseDownActivateCallback);
  _externalModules.external.$(mouseEventData.element).off('CornerstoneToolsMouseDoubleClick', arrowAnnotate.mouseDoubleClickCallback);

  cornerstone.updateImage(mouseEventData.element);
  (0, _moveNewHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.end, function () {
    if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(mouseEventData.element, toolType, measurementData);
    }

    var config = arrowAnnotate.getConfiguration();

    if (measurementData.text === undefined) {
      config.getTextCallback(doneChangingTextCallback);
    }

    cornerstone.updateImage(mouseEventData.element);
  });
}

function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  var cornerstone = _externalModules.external.cornerstone;

  var lineSegment = {
    start: cornerstone.pixelToCanvas(element, data.handles.start),
    end: cornerstone.pixelToCanvas(element, data.handles.end)
  };

  var distanceToPoint = _externalModules.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  return distanceToPoint < 25;
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var enabledElement = eventData.enabledElement;
  var cornerstone = _externalModules.external.cornerstone;

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var font = _textStyle2.default.getFont();
  var config = arrowAnnotate.getConfiguration();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    // Draw the arrow
    var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    // Config.arrowFirst = false;
    if (config.arrowFirst) {
      (0, _drawArrow2.default)(context, handleEndCanvas, handleStartCanvas, color, lineWidth);
    } else {
      (0, _drawArrow2.default)(context, handleStartCanvas, handleEndCanvas, color, lineWidth);
    }

    var handleOptions = {
      drawHandlesIfActive: config && config.drawHandlesOnHover
    };

    if (config.drawHandles) {
      (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);
    }

    // Draw the text
    if (data.text && data.text !== '') {
      context.font = font;

      // Calculate the text coordinates.
      var textWidth = context.measureText(data.text).width + 10;
      var textHeight = _textStyle2.default.getFontSize() + 10;

      var distance = Math.max(textWidth, textHeight) / 2 + 5;

      if (handleEndCanvas.x < handleStartCanvas.x) {
        distance = -distance;
      }

      var textCoords = void 0;

      if (!data.handles.textBox.hasMoved) {
        if (config.arrowFirst) {
          textCoords = {
            x: handleEndCanvas.x - textWidth / 2 + distance,
            y: handleEndCanvas.y - textHeight / 2
          };
        } else {
          // If the arrow is at the End position, the text should
          // Be placed near the Start position
          textCoords = {
            x: handleStartCanvas.x - textWidth / 2 - distance,
            y: handleStartCanvas.y - textHeight / 2
          };
        }

        var transform = cornerstone.internal.getTransform(enabledElement);

        transform.invert();

        var coords = transform.transformPoint(textCoords.x, textCoords.y);

        data.handles.textBox.x = coords.x;
        data.handles.textBox.y = coords.y;
      }

      textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);

      var boundingBox = (0, _drawTextBox2.default)(context, data.text, textCoords.x, textCoords.y, color);

      data.handles.textBox.boundingBox = boundingBox;

      if (data.handles.textBox.hasMoved) {
        // Draw dashed link line between tool and text
        var link = {
          start: {},
          end: {}
        };

        var midpointCanvas = {
          x: (handleStartCanvas.x + handleEndCanvas.x) / 2,
          y: (handleStartCanvas.y + handleEndCanvas.y) / 2
        };

        var points = [handleStartCanvas, handleEndCanvas, midpointCanvas];

        link.end.x = textCoords.x;
        link.end.y = textCoords.y;

        link.start = _externalModules.cornerstoneMath.point.findClosestPoint(points, link.end);

        var boundingBoxPoints = [{
          // Top middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top
        }, {
          // Left middle point of bounding box
          x: boundingBox.left,
          y: boundingBox.top + boundingBox.height / 2
        }, {
          // Bottom middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top + boundingBox.height
        }, {
          // Right middle point of bounding box
          x: boundingBox.left + boundingBox.width,
          y: boundingBox.top + boundingBox.height / 2
        }];

        link.end = _externalModules.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.setLineDash([2, 3]);
        context.moveTo(link.start.x, link.start.y);
        context.lineTo(link.end.x, link.end.y);
        context.stroke();
      }
    }

    context.restore();
  }
}
// ---- Touch tool ----

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurementTouch(touchEventData) {
  var element = touchEventData.element;
  var measurementData = createNewMeasurement(touchEventData);
  var cornerstone = _externalModules.external.cornerstone;

  function doneChangingTextCallback(text) {
    if (text === null) {
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    } else {
      measurementData.text = text;
    }

    measurementData.active = false;
    cornerstone.updateImage(element);

    _externalModules.external.$(element).on('CornerstoneToolsTouchPress', arrowAnnotateTouch.pressCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTouchStartActive', arrowAnnotateTouch.touchDownActivateCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTap', arrowAnnotateTouch.tapCallback);
  }

  (0, _toolState.addToolState)(element, toolType, measurementData);
  _externalModules.external.$(element).off('CornerstoneToolsTouchPress', arrowAnnotateTouch.pressCallback);
  _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', arrowAnnotateTouch.touchDownActivateCallback);
  _externalModules.external.$(element).off('CornerstoneToolsTap', arrowAnnotateTouch.tapCallback);
  cornerstone.updateImage(element);

  (0, _moveNewHandleTouch2.default)(touchEventData, toolType, measurementData, measurementData.handles.end, function () {
    cornerstone.updateImage(element);

    if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    }

    var config = arrowAnnotate.getConfiguration();

    if (measurementData.text === undefined) {
      config.getTextCallback(doneChangingTextCallback);
    }
  });
}

function doubleClickCallback(e, eventData) {
  var element = eventData.element;
  var cornerstone = _externalModules.external.cornerstone;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);
  }

  if (e.data && e.data.mouseButtonMask && !(0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    return;
  }

  var config = arrowAnnotate.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords) || (0, _pointInsideBoundingBox2.default)(data.handles.textBox, coords)) {
      data.active = true;
      cornerstone.updateImage(element);
      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }
}

function pressCallback(e, eventData) {
  var element = eventData.element;
  var cornerstone = _externalModules.external.cornerstone;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    console.log('pressCallback doneChangingTextCallback');
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);

    _externalModules.external.$(element).on('CornerstoneToolsTouchStart', arrowAnnotateTouch.touchStartCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTouchStartActive', arrowAnnotateTouch.touchDownActivateCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTap', arrowAnnotateTouch.tapCallback);
  }

  if (e.data && e.data.mouseButtonMask && !(0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    return;
  }

  var config = arrowAnnotate.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return;
  }

  if (eventData.handlePressed) {
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', arrowAnnotateTouch.touchStartCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', arrowAnnotateTouch.touchDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', arrowAnnotateTouch.tapCallback);

    // Allow relabelling via a callback
    config.changeTextCallback(eventData.handlePressed, eventData, doneChangingTextCallback);

    e.stopImmediatePropagation();

    return false;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords) || (0, _pointInsideBoundingBox2.default)(data.handles.textBox, coords)) {
      data.active = true;
      cornerstone.updateImage(element);

      _externalModules.external.$(element).off('CornerstoneToolsTouchStart', arrowAnnotateTouch.touchStartCallback);
      _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', arrowAnnotateTouch.touchDownActivateCallback);
      _externalModules.external.$(element).off('CornerstoneToolsTap', arrowAnnotateTouch.tapCallback);

      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

var arrowAnnotate = (0, _mouseButtonTool2.default)({
  addNewMeasurement: addNewMeasurement,
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  mouseDoubleClickCallback: doubleClickCallback
});

arrowAnnotate.setConfiguration(configuration);

var arrowAnnotateTouch = (0, _touchTool2.default)({
  addNewMeasurement: addNewMeasurementTouch,
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  pressCallback: pressCallback
});

exports.arrowAnnotate = arrowAnnotate;
exports.arrowAnnotateTouch = arrowAnnotateTouch;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crosshairsTouch = exports.crosshairs = undefined;

var _externalModules = __webpack_require__(0);

var _loadHandlerManager = __webpack_require__(10);

var _loadHandlerManager2 = _interopRequireDefault(_loadHandlerManager);

var _toolState = __webpack_require__(1);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _pointProjector = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'crosshairs';

function chooseLocation(e, eventData) {
  e.stopImmediatePropagation(); // Prevent CornerstoneToolsTouchStartActive from killing any press events

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  // Get current element target information
  var cornerstone = _externalModules.external.cornerstone;
  var sourceElement = e.currentTarget;
  var sourceEnabledElement = cornerstone.getEnabledElement(sourceElement);
  var sourceImageId = sourceEnabledElement.image.imageId;
  var sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceImageId);

  // Get currentPoints from mouse cursor on selected element
  var sourceImagePoint = eventData.currentPoints.image;

  // Transfer this to a patientPoint given imagePlane metadata
  var patientPoint = (0, _pointProjector.imagePointToPatientPoint)(sourceImagePoint, sourceImagePlane);

  // Get the enabled elements associated with this synchronization context
  var syncContext = toolData.data[0].synchronizationContext;
  var enabledElements = syncContext.getSourceElements();

  // Iterate over each synchronized element
  enabledElements.forEach(function (targetElement) {
    // Don't do anything if the target is the same as the source
    if (targetElement === sourceElement) {
      return;
    }

    var minDistance = Number.MAX_VALUE;
    var newImageIdIndex = -1;

    var stackToolDataSource = (0, _toolState.getToolState)(targetElement, 'stack');

    if (stackToolDataSource === undefined) {
      return;
    }

    var stackData = stackToolDataSource.data[0];

    // Find within the element's stack the closest image plane to selected location
    stackData.imageIds.forEach(function (imageId, index) {
      var imagePlane = cornerstone.metaData.get('imagePlaneModule', imageId);
      var imagePosition = imagePlane.imagePositionPatient;
      var row = imagePlane.rowCosines.clone();
      var column = imagePlane.columnCosines.clone();
      var normal = column.clone().cross(row.clone());
      var distance = Math.abs(normal.clone().dot(imagePosition) - normal.clone().dot(patientPoint));
      // Console.log(index + '=' + distance);

      if (distance < minDistance) {
        minDistance = distance;
        newImageIdIndex = index;
      }
    });

    if (newImageIdIndex === stackData.currentImageIdIndex) {
      return;
    }

    // Switch the loaded image to the required image
    if (newImageIdIndex !== -1 && stackData.imageIds[newImageIdIndex] !== undefined) {
      var startLoadingHandler = _loadHandlerManager2.default.getStartLoadHandler();
      var endLoadingHandler = _loadHandlerManager2.default.getEndLoadHandler();
      var errorLoadingHandler = _loadHandlerManager2.default.getErrorLoadingHandler();

      if (startLoadingHandler) {
        startLoadingHandler(targetElement);
      }

      var loader = void 0;

      if (stackData.preventCache === true) {
        loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
      } else {
        loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
      }

      loader.then(function (image) {
        var viewport = cornerstone.getViewport(targetElement);

        stackData.currentImageIdIndex = newImageIdIndex;
        cornerstone.displayImage(targetElement, image, viewport);
        if (endLoadingHandler) {
          endLoadingHandler(targetElement, image);
        }
      }, function (error) {
        var imageId = stackData.imageIds[newImageIdIndex];

        if (errorLoadingHandler) {
          errorLoadingHandler(targetElement, imageId, error);
        }
      });
    }
  });
}

function mouseUpCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', mouseDragCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    chooseLocation(e, eventData);

    return false; // False = cases jquery to preventDefault() and stopPropagation() this event
  }
}

function mouseDragCallback(e, eventData) {
  chooseLocation(e, eventData);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

function enable(element, mouseButtonMask, synchronizationContext) {
  var eventData = {
    mouseButtonMask: mouseButtonMask
  };

  // Clear any currently existing toolData
  (0, _toolState.clearToolState)(element, toolType);

  (0, _toolState.addToolState)(element, toolType, {
    synchronizationContext: synchronizationContext
  });

  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);

  _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseDownCallback);
}

// Disables the reference line tool for the given element
function disable(element) {
  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
}

// Module/private exports
var crosshairs = {
  activate: enable,
  deactivate: disable,
  enable: enable,
  disable: disable
};

function dragEndCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsTouchDrag', dragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsDragEnd', dragEndCallback);
}

function dragStartCallback(e, eventData) {
  _externalModules.external.$(eventData.element).on('CornerstoneToolsTouchDrag', dragCallback);
  _externalModules.external.$(eventData.element).on('CornerstoneToolsDragEnd', dragEndCallback);
  chooseLocation(e, eventData);

  return false;
}

function dragCallback(e, eventData) {
  chooseLocation(e, eventData);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

function enableTouch(element, synchronizationContext) {
  // Clear any currently existing toolData
  (0, _toolState.clearToolState)(element, toolType);

  (0, _toolState.addToolState)(element, toolType, {
    synchronizationContext: synchronizationContext
  });

  _externalModules.external.$(element).off('CornerstoneToolsTouchStart', dragStartCallback);

  _externalModules.external.$(element).on('CornerstoneToolsTouchStart', dragStartCallback);
}

// Disables the reference line tool for the given element
function disableTouch(element) {
  _externalModules.external.$(element).off('CornerstoneToolsTouchStart', dragStartCallback);
}

var crosshairsTouch = {
  activate: enableTouch,
  deactivate: disableTouch,
  enable: enableTouch,
  disable: disableTouch
};

exports.crosshairs = crosshairs;
exports.crosshairsTouch = crosshairsTouch;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _doubleTapTool = __webpack_require__(55);

var _doubleTapTool2 = _interopRequireDefault(_doubleTapTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fitToWindowStrategy(eventData) {
  _externalModules.external.cornerstone.fitToWindow(eventData.element);
}

function doubleTapCallback(e, eventData) {
  doubleTapZoom.strategy(eventData);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

var doubleTapZoom = (0, _doubleTapTool2.default)(doubleTapCallback);

doubleTapZoom.strategies = {
  default: fitToWindowStrategy
};

doubleTapZoom.strategy = fitToWindowStrategy;

exports.default = doubleTapZoom;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragProbeTouch = exports.dragProbe = undefined;

var _externalModules = __webpack_require__(0);

var _simpleMouseButtonTool = __webpack_require__(13);

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(11);

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _textStyle = __webpack_require__(14);

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _getRGBPixels = __webpack_require__(34);

var _getRGBPixels2 = _interopRequireDefault(_getRGBPixels);

var _calculateSUV = __webpack_require__(17);

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dragEventData = void 0;

function defaultStrategy(eventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var enabledElement = cornerstone.getEnabledElement(eventData.element);

  var context = enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = _toolColors2.default.getActiveColor();
  var font = _textStyle2.default.getFont();
  var fontHeight = _textStyle2.default.getFontSize();
  var config = dragProbe.getConfiguration();

  context.save();

  if (config && config.shadow) {
    context.shadowColor = config.shadowColor || '#000000';
    context.shadowOffsetX = config.shadowOffsetX || 1;
    context.shadowOffsetY = config.shadowOffsetY || 1;
  }

  var x = Math.round(eventData.currentPoints.image.x);
  var y = Math.round(eventData.currentPoints.image.y);

  var storedPixels = void 0;
  var text = void 0,
      str = void 0;

  if (x < 0 || y < 0 || x >= eventData.image.columns || y >= eventData.image.rows) {
    return;
  }

  if (eventData.image.color) {
    storedPixels = (0, _getRGBPixels2.default)(eventData.element, x, y, 1, 1);
    text = x + ', ' + y;
    str = 'R: ' + storedPixels[0] + ' G: ' + storedPixels[1] + ' B: ' + storedPixels[2] + ' A: ' + storedPixels[3];
  } else {
    storedPixels = cornerstone.getStoredPixels(eventData.element, x, y, 1, 1);
    var sp = storedPixels[0];
    var mo = sp * eventData.image.slope + eventData.image.intercept;
    var suv = (0, _calculateSUV2.default)(eventData.image, sp);

    // Draw text
    text = x + ', ' + y;
    str = 'SP: ' + sp + ' MO: ' + parseFloat(mo.toFixed(3));
    if (suv) {
      str += ' SUV: ' + parseFloat(suv.toFixed(3));
    }
  }

  // Draw text
  var coords = {
    // Translate the x/y away from the cursor
    x: eventData.currentPoints.image.x + 3,
    y: eventData.currentPoints.image.y - 3
  };
  var textCoords = cornerstone.pixelToCanvas(eventData.element, coords);

  context.font = font;
  context.fillStyle = color;

  (0, _drawTextBox2.default)(context, str, textCoords.x, textCoords.y + fontHeight + 5, color);
  (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color);
  context.restore();
}

function minimalStrategy(eventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = eventData.element;
  var enabledElement = cornerstone.getEnabledElement(element);
  var image = enabledElement.image;

  var context = enabledElement.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = _toolColors2.default.getActiveColor();
  var font = _textStyle2.default.getFont();
  var config = dragProbe.getConfiguration();

  context.save();

  if (config && config.shadow) {
    context.shadowColor = config.shadowColor || '#000000';
    context.shadowOffsetX = config.shadowOffsetX || 1;
    context.shadowOffsetY = config.shadowOffsetY || 1;
  }

  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);
  var modality = void 0;

  if (seriesModule) {
    modality = seriesModule.modality;
  }

  var toolCoords = void 0;

  if (eventData.isTouchEvent === true) {
    toolCoords = cornerstone.pageToPixel(element, eventData.currentPoints.page.x, eventData.currentPoints.page.y - _textStyle2.default.getFontSize() * 4);
  } else {
    toolCoords = cornerstone.pageToPixel(element, eventData.currentPoints.page.x, eventData.currentPoints.page.y - _textStyle2.default.getFontSize() / 2);
  }

  var storedPixels = void 0;
  var text = '';

  if (toolCoords.x < 0 || toolCoords.y < 0 || toolCoords.x >= image.columns || toolCoords.y >= image.rows) {
    return;
  }

  if (image.color) {
    storedPixels = (0, _getRGBPixels2.default)(element, toolCoords.x, toolCoords.y, 1, 1);
    text = 'R: ' + storedPixels[0] + ' G: ' + storedPixels[1] + ' B: ' + storedPixels[2];
  } else {
    storedPixels = cornerstone.getStoredPixels(element, toolCoords.x, toolCoords.y, 1, 1);
    var sp = storedPixels[0];
    var mo = sp * eventData.image.slope + eventData.image.intercept;

    var modalityPixelValueText = parseFloat(mo.toFixed(2));

    if (modality === 'CT') {
      text += 'HU: ' + modalityPixelValueText;
    } else if (modality === 'PT') {
      text += modalityPixelValueText;
      var suv = (0, _calculateSUV2.default)(eventData.image, sp);

      if (suv) {
        text += ' SUV: ' + parseFloat(suv.toFixed(2));
      }
    } else {
      text += modalityPixelValueText;
    }
  }

  // Prepare text
  var textCoords = cornerstone.pixelToCanvas(element, toolCoords);

  context.font = font;
  context.fillStyle = color;

  // Translate the x/y away from the cursor
  var translation = void 0;
  var handleRadius = 6;
  var width = context.measureText(text).width;

  if (eventData.isTouchEvent === true) {
    translation = {
      x: -width / 2 - 5,
      y: -_textStyle2.default.getFontSize() - 10 - 2 * handleRadius
    };
  } else {
    translation = {
      x: 12,
      y: -(_textStyle2.default.getFontSize() + 10) / 2
    };
  }

  context.beginPath();
  context.strokeStyle = color;
  context.arc(textCoords.x, textCoords.y, handleRadius, 0, 2 * Math.PI);
  context.stroke();

  (0, _drawTextBox2.default)(context, text, textCoords.x + translation.x, textCoords.y + translation.y, color);
  context.restore();
}

function mouseUpCallback(e, eventData) {
  var element = eventData.element;

  element.removeEventListener('cornerstoneimagerendered', imageRenderedCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', dragCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseClick', mouseUpCallback);
  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function mouseDownCallback(e, eventData) {
  var element = eventData.element;

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    element.addEventListener('cornerstoneimagerendered', imageRenderedCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', dragCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseClick', mouseUpCallback);
    dragProbe.strategy(eventData);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }
}

function imageRenderedCallback() {
  if (dragEventData) {
    dragProbe.strategy(dragEventData);
    dragEventData = null;
  }
}

// The strategy can't be execute at this moment because the image is rendered asynchronously
// (requestAnimationFrame). Then the eventData that contains all information needed is being
// Cached and the strategy will be executed once cornerstoneimagerendered is triggered.
function dragCallback(e, eventData) {
  var element = eventData.element;

  dragEventData = eventData;
  _externalModules.external.cornerstone.updateImage(element);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

var dragProbe = (0, _simpleMouseButtonTool2.default)(mouseDownCallback);

dragProbe.strategies = {
  default: defaultStrategy,
  minimal: minimalStrategy
};

dragProbe.strategy = defaultStrategy;

var options = {
  fireOnTouchStart: true
};

var dragProbeTouch = (0, _touchDragTool2.default)(dragCallback, options);

exports.dragProbe = dragProbe;
exports.dragProbeTouch = dragProbeTouch;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ellipticalRoiTouch = exports.ellipticalRoi = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _drawEllipse = __webpack_require__(47);

var _drawEllipse2 = _interopRequireDefault(_drawEllipse);

var _pointInEllipse = __webpack_require__(32);

var _pointInEllipse2 = _interopRequireDefault(_pointInEllipse);

var _calculateEllipseStatistics = __webpack_require__(50);

var _calculateEllipseStatistics2 = _interopRequireDefault(_calculateEllipseStatistics);

var _calculateSUV = __webpack_require__(17);

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'ellipticalRoi';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    invalidated: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////
function pointNearEllipse(element, data, coords, distance) {
  var cornerstone = _externalModules.external.cornerstone;
  var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
  var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

  var minorEllipse = {
    left: Math.min(startCanvas.x, endCanvas.x) + distance / 2,
    top: Math.min(startCanvas.y, endCanvas.y) + distance / 2,
    width: Math.abs(startCanvas.x - endCanvas.x) - distance,
    height: Math.abs(startCanvas.y - endCanvas.y) - distance
  };

  var majorEllipse = {
    left: Math.min(startCanvas.x, endCanvas.x) - distance / 2,
    top: Math.min(startCanvas.y, endCanvas.y) - distance / 2,
    width: Math.abs(startCanvas.x - endCanvas.x) + distance,
    height: Math.abs(startCanvas.y - endCanvas.y) + distance
  };

  var pointInMinorEllipse = (0, _pointInEllipse2.default)(minorEllipse, coords);
  var pointInMajorEllipse = (0, _pointInEllipse2.default)(majorEllipse, coords);

  if (pointInMajorEllipse && !pointInMinorEllipse) {
    return true;
  }

  return false;
}

function pointNearTool(element, data, coords) {
  return pointNearEllipse(element, data, coords, 15);
}

function pointNearToolTouch(element, data, coords) {
  return pointNearEllipse(element, data, coords, 25);
}

function numberWithCommas(x) {
  // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  var parts = x.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var image = eventData.image;
  var element = eventData.element;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var config = ellipticalRoi.getConfiguration();
  var context = eventData.canvasContext.canvas.getContext('2d');
  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);
  var modality = void 0;

  if (seriesModule) {
    modality = seriesModule.modality;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);

  // If we have tool data for this element - iterate over each set and draw it
  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    var data = toolData.data[i];

    // Apply any shadow settings defined in the tool configuration
    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    // Check which color the rendered tool should be
    var color = _toolColors2.default.getColorIfActive(data.active);

    // Convert Image coordinates to Canvas coordinates given the element
    var handleStartCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

    // Retrieve the bounds of the ellipse (left, top, width, and height)
    // In Canvas coordinates
    var leftCanvas = Math.min(handleStartCanvas.x, handleEndCanvas.x);
    var topCanvas = Math.min(handleStartCanvas.y, handleEndCanvas.y);
    var widthCanvas = Math.abs(handleStartCanvas.x - handleEndCanvas.x);
    var heightCanvas = Math.abs(handleStartCanvas.y - handleEndCanvas.y);

    // Draw the ellipse on the canvas
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    (0, _drawEllipse2.default)(context, leftCanvas, topCanvas, widthCanvas, heightCanvas);
    context.closePath();

    // If the tool configuration specifies to only draw the handles on hover / active,
    // Follow this logic
    if (config && config.drawHandlesOnHover) {
      // Draw the handles if the tool is active
      if (data.active === true) {
        (0, _drawHandles2.default)(context, eventData, data.handles, color);
      } else {
        // If the tool is inactive, draw the handles only if each specific handle is being
        // Hovered over
        var handleOptions = {
          drawHandlesIfActive: true
        };

        (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);
      }
    } else {
      // If the tool has no configuration settings, always draw the handles
      (0, _drawHandles2.default)(context, eventData, data.handles, color);
    }

    // Define variables for the area and mean/standard deviation
    var area = void 0,
        meanStdDev = void 0,
        meanStdDevSUV = void 0;

    // Perform a check to see if the tool has been invalidated. This is to prevent
    // Unnecessary re-calculation of the area, mean, and standard deviation if the
    // Image is re-rendered but the tool has not moved (e.g. during a zoom)
    if (data.invalidated === false) {
      // If the data is not invalidated, retrieve it from the toolData
      meanStdDev = data.meanStdDev;
      meanStdDevSUV = data.meanStdDevSUV;
      area = data.area;
    } else {
      // If the data has been invalidated, we need to calculate it again

      // Retrieve the bounds of the ellipse in image coordinates
      var ellipse = {
        left: Math.round(Math.min(data.handles.start.x, data.handles.end.x)),
        top: Math.round(Math.min(data.handles.start.y, data.handles.end.y)),
        width: Math.round(Math.abs(data.handles.start.x - data.handles.end.x)),
        height: Math.round(Math.abs(data.handles.start.y - data.handles.end.y))
      };

      // First, make sure this is not a color image, since no mean / standard
      // Deviation will be calculated for color images.
      if (!image.color) {
        // Retrieve the array of pixels that the ellipse bounds cover
        var pixels = cornerstone.getPixels(element, ellipse.left, ellipse.top, ellipse.width, ellipse.height);

        // Calculate the mean & standard deviation from the pixels and the ellipse details
        meanStdDev = (0, _calculateEllipseStatistics2.default)(pixels, ellipse);

        if (modality === 'PT') {
          // If the image is from a PET scan, use the DICOM tags to
          // Calculate the SUV from the mean and standard deviation.

          // Note that because we are using modality pixel values from getPixels, and
          // The calculateSUV routine also rescales to modality pixel values, we are first
          // Returning the values to storedPixel values before calcuating SUV with them.
          // TODO: Clean this up? Should we add an option to not scale in calculateSUV?
          meanStdDevSUV = {
            mean: (0, _calculateSUV2.default)(image, (meanStdDev.mean - image.intercept) / image.slope),
            stdDev: (0, _calculateSUV2.default)(image, (meanStdDev.stdDev - image.intercept) / image.slope)
          };
        }

        // If the mean and standard deviation values are sane, store them for later retrieval
        if (meanStdDev && !isNaN(meanStdDev.mean)) {
          data.meanStdDev = meanStdDev;
          data.meanStdDevSUV = meanStdDevSUV;
        }
      }

      // Retrieve the pixel spacing values, and if they are not
      // Real non-zero values, set them to 1
      var columnPixelSpacing = image.columnPixelSpacing || 1;
      var rowPixelSpacing = image.rowPixelSpacing || 1;

      // Calculate the image area from the ellipse dimensions and pixel spacing
      area = Math.PI * (ellipse.width * columnPixelSpacing / 2) * (ellipse.height * rowPixelSpacing / 2);

      // If the area value is sane, store it for later retrieval
      if (!isNaN(area)) {
        data.area = area;
      }

      // Set the invalidated flag to false so that this data won't automatically be recalculated
      data.invalidated = false;
    }

    // Define an array to store the rows of text for the textbox
    var textLines = [];

    // If the mean and standard deviation values are present, display them
    if (meanStdDev && meanStdDev.mean !== undefined) {
      // If the modality is CT, add HU to denote Hounsfield Units
      var moSuffix = '';

      if (modality === 'CT') {
        moSuffix = ' HU';
      }

      // Create a line of text to display the mean and any units that were specified (i.e. HU)
      var meanText = 'Mean: ' + numberWithCommas(meanStdDev.mean.toFixed(2)) + moSuffix;
      // Create a line of text to display the standard deviation and any units that were specified (i.e. HU)
      var stdDevText = 'StdDev: ' + numberWithCommas(meanStdDev.stdDev.toFixed(2)) + moSuffix;

      // If this image has SUV values to display, concatenate them to the text line
      if (meanStdDevSUV && meanStdDevSUV.mean !== undefined) {
        var SUVtext = ' SUV: ';

        meanText += SUVtext + numberWithCommas(meanStdDevSUV.mean.toFixed(2));
        stdDevText += SUVtext + numberWithCommas(meanStdDevSUV.stdDev.toFixed(2));
      }

      // Add these text lines to the array to be displayed in the textbox
      textLines.push(meanText);
      textLines.push(stdDevText);
    }

    // If the area is a sane value, display it
    if (area) {
      // Determine the area suffix based on the pixel spacing in the image.
      // If pixel spacing is present, use millimeters. Otherwise, use pixels.
      // This uses Char code 178 for a superscript 2
      var suffix = ' mm' + String.fromCharCode(178);

      if (!image.rowPixelSpacing || !image.columnPixelSpacing) {
        suffix = ' pixels' + String.fromCharCode(178);
      }

      // Create a line of text to display the area and its units
      var areaText = 'Area: ' + numberWithCommas(area.toFixed(2)) + suffix;

      // Add this text line to the array to be displayed in the textbox
      textLines.push(areaText);
    }

    // If the textbox has not been moved by the user, it should be displayed on the right-most
    // Side of the tool.
    if (!data.handles.textBox.hasMoved) {
      // Find the rightmost side of the ellipse at its vertical center, and place the textbox here
      // Note that this calculates it in image coordinates
      data.handles.textBox.x = Math.max(data.handles.start.x, data.handles.end.x);
      data.handles.textBox.y = (data.handles.start.y + data.handles.end.y) / 2;
    }

    // Convert the textbox Image coordinates into Canvas coordinates
    var textCoords = cornerstone.pixelToCanvas(element, data.handles.textBox);

    // Set options for the textbox drawing function
    var options = {
      centering: {
        x: false,
        y: true
      }
    };

    // Draw the textbox and retrieves it's bounding box for mouse-dragging and highlighting
    var boundingBox = (0, _drawTextBox2.default)(context, textLines, textCoords.x, textCoords.y, color, options);

    // Store the bounding box data in the handle for mouse-dragging and highlighting
    data.handles.textBox.boundingBox = boundingBox;

    // If the textbox has moved, we would like to draw a line linking it with the tool
    // This section decides where to draw this line to on the Ellipse based on the location
    // Of the textbox relative to the ellipse.
    if (data.handles.textBox.hasMoved) {
      // Draw dashed link line between tool and text

      // The initial link position is at the center of the
      // Textbox.
      var link = {
        start: {},
        end: {
          x: textCoords.x,
          y: textCoords.y
        }
      };

      // First we calculate the ellipse points (top, left, right, and bottom)
      var ellipsePoints = [{
        // Top middle point of ellipse
        x: leftCanvas + widthCanvas / 2,
        y: topCanvas
      }, {
        // Left middle point of ellipse
        x: leftCanvas,
        y: topCanvas + heightCanvas / 2
      }, {
        // Bottom middle point of ellipse
        x: leftCanvas + widthCanvas / 2,
        y: topCanvas + heightCanvas
      }, {
        // Right middle point of ellipse
        x: leftCanvas + widthCanvas,
        y: topCanvas + heightCanvas / 2
      }];

      // We obtain the link starting point by finding the closest point on the ellipse to the
      // Center of the textbox
      link.start = _externalModules.cornerstoneMath.point.findClosestPoint(ellipsePoints, link.end);

      // Next we calculate the corners of the textbox bounding box
      var boundingBoxPoints = [{
        // Top middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top
      }, {
        // Left middle point of bounding box
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height / 2
      }, {
        // Bottom middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height
      }, {
        // Right middle point of bounding box
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height / 2
      }];

      // Now we recalculate the link endpoint by identifying which corner of the bounding box
      // Is closest to the start point we just calculated.
      link.end = _externalModules.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

      // Finally we draw the dashed linking line
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.setLineDash([2, 3]);
      context.moveTo(link.start.x, link.start.y);
      context.lineTo(link.end.x, link.end.y);
      context.stroke();
    }

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var ellipticalRoi = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var ellipticalRoiTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearToolTouch,
  toolType: toolType
});

exports.ellipticalRoi = ellipticalRoi;
exports.ellipticalRoiTouch = ellipticalRoiTouch;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.freehand = undefined;

var _externalModules = __webpack_require__(0);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'freehand';
var configuration = {
  mouseLocation: {
    handles: {
      start: {
        highlight: true,
        active: true
      }
    }
  },
  freehand: false,
  modifying: false,
  currentHandle: 0,
  currentTool: -1
};

// /////// BEGIN ACTIVE TOOL ///////
function addPoint(eventData) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData === undefined) {
    return;
  }

  var config = freehand.getConfiguration();

  // Get the toolData from the last-drawn drawing
  // (this should change when modification is added)
  var data = toolData.data[config.currentTool];

  var handleData = {
    x: eventData.currentPoints.image.x,
    y: eventData.currentPoints.image.y,
    highlight: true,
    active: true,
    lines: []
  };

  // If this is not the first handle
  if (data.handles.length) {
    // Add the line from the current handle to the new handle
    data.handles[config.currentHandle - 1].lines.push(eventData.currentPoints.image);
  }

  // Add the new handle
  data.handles.push(handleData);

  // Increment the current handle value
  config.currentHandle += 1;

  // Reset freehand value
  config.freehand = false;

  // Force onImageRendered to fire
  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function pointNearHandle(eventData, toolIndex) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData === undefined) {
    return;
  }

  var data = toolData.data[toolIndex];

  if (data.handles === undefined) {
    return;
  }

  var mousePoint = eventData.currentPoints.canvas;

  for (var i = 0; i < data.handles.length; i++) {
    var handleCanvas = _externalModules.external.cornerstone.pixelToCanvas(eventData.element, data.handles[i]);

    if (_externalModules.cornerstoneMath.point.distance(handleCanvas, mousePoint) < 5) {
      return i;
    }
  }

  return;
}

function pointNearHandleAllTools(eventData) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData) {
    return;
  }

  var handleNearby = void 0;

  for (var toolIndex = 0; toolIndex < toolData.data.length; toolIndex++) {
    handleNearby = pointNearHandle(eventData, toolIndex);
    if (handleNearby !== undefined) {
      return {
        handleNearby: handleNearby,
        toolIndex: toolIndex
      };
    }
  }
}

// --- Drawing loop ---
// On first click, add point
// After first click, on mouse move, record location
// If mouse comes close to previous point, snap to it
// On next click, add another point -- continuously
// On each click, if it intersects with a current point, end drawing loop

function mouseUpCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);

  // Check if drawing is finished
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData === undefined) {
    return;
  }

  var config = freehand.getConfiguration();

  if (!eventData.event.shiftKey) {
    config.freehand = false;
  }

  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function mouseMoveCallback(e, eventData) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData) {
    return;
  }

  var config = freehand.getConfiguration();

  var data = toolData.data[config.currentTool];

  // Set the mouseLocation handle
  var x = Math.max(eventData.currentPoints.image.x, 0);

  x = Math.min(x, eventData.image.width);
  config.mouseLocation.handles.start.x = x;

  var y = Math.max(eventData.currentPoints.image.y, 0);

  y = Math.min(y, eventData.image.height);
  config.mouseLocation.handles.start.y = y;

  var currentHandle = config.currentHandle;

  if (config.modifying) {
    // Move the handle
    data.active = true;
    data.highlight = true;
    data.handles[currentHandle].x = config.mouseLocation.handles.start.x;
    data.handles[currentHandle].y = config.mouseLocation.handles.start.y;
    if (currentHandle) {
      var lastLineIndex = data.handles[currentHandle - 1].lines.length - 1;
      var lastLine = data.handles[currentHandle - 1].lines[lastLineIndex];

      lastLine.x = config.mouseLocation.handles.start.x;
      lastLine.y = config.mouseLocation.handles.start.y;
    }
  }

  if (config.freehand) {
    data.handles[currentHandle - 1].lines.push(eventData.currentPoints.image);
  } else {
    // No snapping in freehand mode
    var handleNearby = pointNearHandle(eventData, config.currentTool);

    // If there is a handle nearby to snap to
    // (and it's not the actual mouse handle)
    if (handleNearby !== undefined && handleNearby < data.handles.length - 1) {
      config.mouseLocation.handles.start.x = data.handles[handleNearby].x;
      config.mouseLocation.handles.start.y = data.handles[handleNearby].y;
    }
  }

  // Force onImageRendered
  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function startDrawing(eventData) {
  _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseMove', mouseMoveCallback);
  _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);

  var measurementData = {
    visible: true,
    active: true,
    handles: []
  };

  var config = freehand.getConfiguration();

  config.mouseLocation.handles.start.x = eventData.currentPoints.image.x;
  config.mouseLocation.handles.start.y = eventData.currentPoints.image.y;

  (0, _toolState.addToolState)(eventData.element, toolType, measurementData);

  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  config.currentTool = toolData.data.length - 1;
}

function endDrawing(eventData, handleNearby) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData) {
    return;
  }

  var config = freehand.getConfiguration();

  var data = toolData.data[config.currentTool];

  data.active = false;
  data.highlight = false;

  // Connect the end of the drawing to the handle nearest to the click
  if (handleNearby !== undefined) {
    // Only save x,y params from nearby handle to prevent circular reference
    data.handles[config.currentHandle - 1].lines.push({
      x: data.handles[handleNearby].x,
      y: data.handles[handleNearby].y
    });
  }

  if (config.modifying) {
    config.modifying = false;
  }

  // Reset the current handle
  config.currentHandle = 0;
  config.currentTool = -1;

  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseMove', mouseMoveCallback);

  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

    var handleNearby = void 0,
        toolIndex = void 0;

    var config = freehand.getConfiguration();
    var currentTool = config.currentTool;

    if (config.modifying) {
      endDrawing(eventData);

      return;
    }

    if (currentTool < 0) {
      var nearby = pointNearHandleAllTools(eventData);

      if (nearby) {
        handleNearby = nearby.handleNearby;
        toolIndex = nearby.toolIndex;
        // This means the user is trying to modify a point
        if (handleNearby !== undefined) {
          _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseMove', mouseMoveCallback);
          _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
          config.modifying = true;
          config.currentHandle = handleNearby;
          config.currentTool = toolIndex;
        }
      } else {
        startDrawing(eventData);
        addPoint(eventData);
      }
    } else if (currentTool >= 0 && toolData.data[currentTool].active) {
      handleNearby = pointNearHandle(eventData, currentTool);
      if (handleNearby !== undefined) {
        endDrawing(eventData, handleNearby);
      } else if (eventData.event.shiftKey) {
        config.freehand = true;
      } else {
        addPoint(eventData);
      }
    }

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }
}

// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var config = freehand.getConfiguration();

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var fillColor = _toolColors2.default.getFillColor();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    var data = toolData.data[i];

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
      fillColor = _toolColors2.default.getFillColor();
    } else {
      color = _toolColors2.default.getToolColor();
      fillColor = _toolColors2.default.getToolColor();
    }

    var handleStart = void 0;

    if (data.handles.length) {
      for (var j = 0; j < data.handles.length; j++) {
        // Draw a line between handle j and j+1
        handleStart = data.handles[j];
        var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, handleStart);

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.moveTo(handleStartCanvas.x, handleStartCanvas.y);

        for (var k = 0; k < data.handles[j].lines.length; k++) {
          var lineCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles[j].lines[k]);

          context.lineTo(lineCanvas.x, lineCanvas.y);
          context.stroke();
        }

        var mouseLocationCanvas = cornerstone.pixelToCanvas(eventData.element, config.mouseLocation.handles.start);

        if (j === data.handles.length - 1) {
          if (data.active && !config.freehand && !config.modifying) {
            // If it's still being actively drawn, keep the last line to
            // The mouse location
            context.lineTo(mouseLocationCanvas.x, mouseLocationCanvas.y);
            context.stroke();
          }
        }
      }
    }

    // If the tool is active, draw a handle at the cursor location
    var options = {
      fill: fillColor
    };

    if (data.active) {
      (0, _drawHandles2.default)(context, eventData, config.mouseLocation.handles, color, options);
    }
    // Draw the handles
    (0, _drawHandles2.default)(context, eventData, data.handles, color, options);

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////
function enable(element) {
  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
  element.removeEventListener('cornerstoneimagerendered', onImageRendered);

  element.addEventListener('cornerstoneimagerendered', onImageRendered);
  _externalModules.external.cornerstone.updateImage(element);
}

// Disables the reference line tool for the given element
function disable(element) {
  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
  element.removeEventListener('cornerstoneimagerendered', onImageRendered);
  _externalModules.external.cornerstone.updateImage(element);
}

// Visible and interactive
function activate(element, mouseButtonMask) {
  var eventData = {
    mouseButtonMask: mouseButtonMask
  };

  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', eventData, mouseDownCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
  element.removeEventListener('cornerstoneimagerendered', onImageRendered);

  element.addEventListener('cornerstoneimagerendered', onImageRendered);
  _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseDownCallback);

  _externalModules.external.cornerstone.updateImage(element);
}

// Visible, but not interactive
function deactivate(element) {
  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseMove', mouseMoveCallback);
  element.removeEventListener('cornerstoneimagerendered', onImageRendered);

  element.addEventListener('cornerstoneimagerendered', onImageRendered);

  _externalModules.external.cornerstone.updateImage(element);
}

function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;
}

// Module/private exports
var freehand = {
  enable: enable,
  disable: disable,
  activate: activate,
  deactivate: deactivate,
  getConfiguration: getConfiguration,
  setConfiguration: setConfiguration
};

exports.freehand = freehand;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlightTouch = exports.highlight = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonRectangleTool = __webpack_require__(56);

var _mouseButtonRectangleTool2 = _interopRequireDefault(_mouseButtonRectangleTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'highlight';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // If already a highlight measurement, creating a new one will be useless
  var existingToolData = (0, _toolState.getToolState)(mouseEventData.event.currentTarget, toolType);

  if (existingToolData && existingToolData.data && existingToolData.data.length > 0) {
    return;
  }

  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointInsideRect(element, data, coords) {
  var cornerstone = _externalModules.external.cornerstone;
  var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
  var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

  var rect = {
    left: Math.min(startCanvas.x, endCanvas.x),
    top: Math.min(startCanvas.y, endCanvas.y),
    width: Math.abs(startCanvas.x - endCanvas.x),
    height: Math.abs(startCanvas.y - endCanvas.y)
  };

  var insideBox = false;

  if (coords.x >= rect.left && coords.x <= rect.left + rect.width && coords.y >= rect.top && coords.y <= rect.top + rect.height) {
    insideBox = true;
  }

  return insideBox;
}

function pointNearTool(element, data, coords) {
  var cornerstone = _externalModules.external.cornerstone;
  var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
  var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

  var rect = {
    left: Math.min(startCanvas.x, endCanvas.x),
    top: Math.min(startCanvas.y, endCanvas.y),
    width: Math.abs(startCanvas.x - endCanvas.x),
    height: Math.abs(startCanvas.y - endCanvas.y)
  };

  var distanceToPoint = _externalModules.cornerstoneMath.rect.distanceToPoint(rect, coords);

  return distanceToPoint < 5;
}

// /////// BEGIN IMAGE RENDERING ///////

function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // We have tool data for this elemen
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();

  context.save();

  var data = toolData.data[0];

  if (!data) {
    return;
  }

  if (data.active) {
    color = _toolColors2.default.getActiveColor();
  } else {
    color = _toolColors2.default.getToolColor();
  }

  var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start);
  var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

  var rect = {
    left: Math.min(handleStartCanvas.x, handleEndCanvas.x),
    top: Math.min(handleStartCanvas.y, handleEndCanvas.y),
    width: Math.abs(handleStartCanvas.x - handleEndCanvas.x),
    height: Math.abs(handleStartCanvas.y - handleEndCanvas.y)
  };

  // Draw dark fill outside the rectangle
  context.beginPath();
  context.strokeStyle = 'transparent';

  context.rect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

  context.rect(rect.width + rect.left, rect.top, -rect.width, rect.height);
  context.stroke();
  context.fillStyle = 'rgba(0,0,0,0.7)';
  context.fill();
  context.closePath();

  // Draw dashed stroke rectangle
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.setLineDash([4]);
  context.strokeRect(rect.left, rect.top, rect.width, rect.height);

  // Strange fix, but restore doesn't seem to reset the line dashes?
  context.setLineDash([]);

  // Draw the handles last, so they will be on top of the overlay
  (0, _drawHandles2.default)(context, eventData, data.handles, color);
  context.restore();
}
// /////// END IMAGE RENDERING ///////

// Module exports
var preventHandleOutsideImage = true;

var highlight = (0, _mouseButtonRectangleTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  pointInsideRect: pointInsideRect,
  toolType: toolType
}, preventHandleOutsideImage);

var highlightTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  pointInsideRect: pointInsideRect,
  toolType: toolType
}, preventHandleOutsideImage);

exports.highlight = highlight;
exports.highlightTouch = highlightTouch;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _displayTool = __webpack_require__(24);

var _displayTool2 = _interopRequireDefault(_displayTool);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onImageRendered(e, eventData) {
  var image = eventData.image;
  var stats = image.stats;

  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var textLines = [];

  Object.keys(stats).forEach(function (key) {
    var text = key + ' : ' + stats[key];

    textLines.push(text);
  });

  (0, _drawTextBox2.default)(context, textLines, 0, 0, 'orange');

  textLines.forEach(function (text) {
    console.log(text);
  });
}

var imageStats = (0, _displayTool2.default)(onImageRendered);

exports.default = imageStats;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lengthTouch = exports.length = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'length';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  var cornerstone = _externalModules.external.cornerstone;
  var lineSegment = {
    start: cornerstone.pixelToCanvas(element, data.handles.start),
    end: cornerstone.pixelToCanvas(element, data.handles.end)
  };
  var distanceToPoint = _externalModules.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  return distanceToPoint < 25;
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');
  var image = eventData.image,
      element = eventData.element;


  context.setTransform(1, 0, 0, 1, 0, 0);

  var lineWidth = _toolStyle2.default.getToolWidth();
  var config = length.getConfiguration();
  var imagePlane = cornerstone.metaData.get('imagePlaneModule', image.imageId);
  var rowPixelSpacing = void 0;
  var colPixelSpacing = void 0;

  if (imagePlane) {
    rowPixelSpacing = imagePlane.rowPixelSpacing || imagePlane.rowImagePixelSpacing;
    colPixelSpacing = imagePlane.columnPixelSpacing || imagePlane.colImagePixelSpacing;
  } else {
    rowPixelSpacing = image.rowPixelSpacing;
    colPixelSpacing = image.columnPixelSpacing;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    // Configurable shadow
    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];
    var color = _toolColors2.default.getColorIfActive(data.active);

    // Get the handle positions in canvas coordinates
    var handleStartCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

    // Draw the measurement line
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(handleStartCanvas.x, handleStartCanvas.y);
    context.lineTo(handleEndCanvas.x, handleEndCanvas.y);
    context.stroke();

    // Draw the handles
    var handleOptions = {
      drawHandlesIfActive: config && config.drawHandlesOnHover
    };

    (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);

    // Draw the text
    context.fillStyle = color;

    // Set rowPixelSpacing and columnPixelSpacing to 1 if they are undefined (or zero)
    var dx = (data.handles.end.x - data.handles.start.x) * (rowPixelSpacing || 1);
    var dy = (data.handles.end.y - data.handles.start.y) * (colPixelSpacing || 1);

    // Calculate the length, and create the text variable with the millimeters or pixels suffix
    var _length = Math.sqrt(dx * dx + dy * dy);

    // Store the length inside the tool for outside access
    data.length = _length;

    // Set the length text suffix depending on whether or not pixelSpacing is available
    var suffix = ' mm';

    if (!rowPixelSpacing || !colPixelSpacing) {
      suffix = ' pixels';
    }

    // Store the length measurement text
    var text = '' + _length.toFixed(2) + suffix;

    if (!data.handles.textBox.hasMoved) {
      var coords = {
        x: Math.max(data.handles.start.x, data.handles.end.x)
      };

      // Depending on which handle has the largest x-value,
      // Set the y-value for the text box
      if (coords.x === data.handles.start.x) {
        coords.y = data.handles.start.y;
      } else {
        coords.y = data.handles.end.y;
      }

      data.handles.textBox.x = coords.x;
      data.handles.textBox.y = coords.y;
    }

    var textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);

    // Move the textbox slightly to the right and upwards
    // So that it sits beside the length tool handle
    textCoords.x += 10;

    var options = {
      centering: {
        x: false,
        y: true
      }
    };

    // Draw the textbox
    var boundingBox = (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color, options);

    data.handles.textBox.boundingBox = boundingBox;

    if (data.handles.textBox.hasMoved) {
      // Draw dashed link line between ellipse and text
      var link = {
        start: {},
        end: {}
      };

      var midpointCanvas = {
        x: (handleStartCanvas.x + handleEndCanvas.x) / 2,
        y: (handleStartCanvas.y + handleEndCanvas.y) / 2
      };

      var points = [handleStartCanvas, handleEndCanvas, midpointCanvas];

      link.end.x = textCoords.x;
      link.end.y = textCoords.y;

      link.start = _externalModules.cornerstoneMath.point.findClosestPoint(points, link.end);

      var boundingBoxPoints = [{
        // Top middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top
      }, {
        // Left middle point of bounding box
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height / 2
      }, {
        // Bottom middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height
      }, {
        // Right middle point of bounding box
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height / 2
      }];

      link.end = _externalModules.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.setLineDash([2, 3]);
      context.moveTo(link.start.x, link.start.y);
      context.lineTo(link.end.x, link.end.y);
      context.stroke();
    }

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var length = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var lengthTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.length = length;
exports.lengthTouch = lengthTouch;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.magnifyTouchDrag = exports.magnify = undefined;

var _externalModules = __webpack_require__(0);

var _touchDragTool = __webpack_require__(11);

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _getMaxSimultaneousRequests = __webpack_require__(20);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configuration = {
  magnifySize: 100,
  magnificationLevel: 2
};

var browserName = void 0;

var currentPoints = void 0;

/** Remove the magnifying glass when the mouse event ends */
function mouseUpCallback(e, eventData) {
  var element = eventData.element;

  _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', dragCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseClick', mouseUpCallback);
  element.removeEventListener('cornerstonenewimage', newImageCallback);
  hideTool(eventData);
}

function hideTool(eventData) {
  _externalModules.external.$(eventData.element).find('.magnifyTool').hide();
  // Re-enable the mouse cursor
  document.body.style.cursor = 'default';
}

/** Draw the magnifying glass on mouseDown, and begin tracking mouse movements */
function mouseDownCallback(e, eventData) {
  var element = eventData.element;

  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', eventData, dragCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseUp', eventData, mouseUpCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseClick', eventData, mouseUpCallback);

    currentPoints = eventData.currentPoints;
    element.addEventListener('cornerstonenewimage', newImageCallback);
    drawMagnificationTool(eventData);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }
}

function newImageCallback(e) {
  var eventData = e.detail;

  eventData.currentPoints = currentPoints;
  drawMagnificationTool(eventData);
}

function dragEndCallback(e, eventData) {
  var element = eventData.element;

  _externalModules.external.$(eventData.element).off('CornerstoneToolsDragEnd', dragEndCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsTouchEnd', dragEndCallback);
  element.removeEventListener('cornerstonenewimage', newImageCallback);
  hideTool(eventData);
}

/** Drag callback is triggered by both the touch and mouse magnify tools */
function dragCallback(e, eventData) {
  currentPoints = eventData.currentPoints;

  drawMagnificationTool(eventData);
  if (eventData.isTouchEvent === true) {
    _externalModules.external.$(eventData.element).on('CornerstoneToolsDragEnd', dragEndCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsTouchEnd', dragEndCallback);
  }

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

/** Draws the magnifying glass */
function drawMagnificationTool(eventData) {
  var magnifyCanvas = _externalModules.external.$(eventData.element).find('.magnifyTool').get(0);

  if (!magnifyCanvas) {
    createMagnificationCanvas(eventData.element);
  }

  var config = magnify.getConfiguration();

  var magnifySize = config.magnifySize;
  var magnificationLevel = config.magnificationLevel;

  // The 'not' magnifyTool class here is necessary because cornerstone places
  // No classes of it's own on the canvas we want to select
  var canvas = _externalModules.external.$(eventData.element).find('canvas').not('.magnifyTool').get(0);
  var context = canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var zoomCtx = magnifyCanvas.getContext('2d');

  zoomCtx.setTransform(1, 0, 0, 1, 0, 0);

  var getSize = magnifySize / magnificationLevel;

  // Calculate the on-canvas location of the mouse pointer / touch
  var canvasLocation = _externalModules.external.cornerstone.pixelToCanvas(eventData.element, eventData.currentPoints.image);

  if (eventData.isTouchEvent === true) {
    canvasLocation.y -= 1.25 * getSize;
  }

  canvasLocation.x = Math.max(canvasLocation.x, 0);
  canvasLocation.x = Math.min(canvasLocation.x, canvas.width);

  canvasLocation.y = Math.max(canvasLocation.y, 0);
  canvasLocation.y = Math.min(canvasLocation.y, canvas.height);

  // Clear the rectangle
  zoomCtx.clearRect(0, 0, magnifySize, magnifySize);
  zoomCtx.fillStyle = 'transparent';

  // Fill it with the pixels that the mouse is clicking on
  zoomCtx.fillRect(0, 0, magnifySize, magnifySize);

  var copyFrom = {
    x: canvasLocation.x - 0.5 * getSize,
    y: canvasLocation.y - 0.5 * getSize
  };

  if (browserName === 'Safari') {
    // Safari breaks when trying to copy pixels with negative indices
    // This prevents proper Magnify usage
    copyFrom.x = Math.max(copyFrom.x, 0);
    copyFrom.y = Math.max(copyFrom.y, 0);
  }

  copyFrom.x = Math.min(copyFrom.x, canvas.width);
  copyFrom.y = Math.min(copyFrom.y, canvas.height);

  var scaledMagnify = {
    x: (canvas.width - copyFrom.x) * magnificationLevel,
    y: (canvas.height - copyFrom.y) * magnificationLevel
  };

  zoomCtx.drawImage(canvas, copyFrom.x, copyFrom.y, canvas.width - copyFrom.x, canvas.height - copyFrom.y, 0, 0, scaledMagnify.x, scaledMagnify.y);

  // Place the magnification tool at the same location as the pointer
  magnifyCanvas.style.top = canvasLocation.y - 0.5 * magnifySize + 'px';
  magnifyCanvas.style.left = canvasLocation.x - 0.5 * magnifySize + 'px';

  magnifyCanvas.style.display = 'block';

  // Hide the mouse cursor, so the user can see better
  document.body.style.cursor = 'none';
}

/** Creates the magnifying glass canvas */
function createMagnificationCanvas(element) {
  // If the magnifying glass canvas doesn't already exist
  if (_externalModules.external.$(element).find('.magnifyTool').length === 0) {
    // Create a canvas and append it as a child to the element
    var magnifyCanvas = document.createElement('canvas');
    // The magnifyTool class is used to find the canvas later on

    magnifyCanvas.classList.add('magnifyTool');

    var config = magnify.getConfiguration();

    magnifyCanvas.width = config.magnifySize;
    magnifyCanvas.height = config.magnifySize;

    // Make sure position is absolute so the canvas can follow the mouse / touch
    magnifyCanvas.style.position = 'absolute';
    element.appendChild(magnifyCanvas);
  }
}

/** Find the magnifying glass canvas and remove it */
function removeMagnificationCanvas(element) {
  _externalModules.external.$(element).find('.magnifyTool').remove();
}

// --- Mouse tool activate / disable --- //
function disable(element) {
  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);
  removeMagnificationCanvas(element);
}

function enable(element) {
  if (!browserName) {
    var infoString = (0, _getMaxSimultaneousRequests.getBrowserInfo)();
    var info = infoString.split(' ');

    browserName = info[0];
  }

  createMagnificationCanvas(element);
}

function activate(element, mouseButtonMask) {
  var eventData = {
    mouseButtonMask: mouseButtonMask
  };

  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);

  _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseDownCallback);
  createMagnificationCanvas(element);
}

// --- Touch tool activate / disable --- //
function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;
}

// Module exports
var magnify = {
  enable: enable,
  activate: activate,
  deactivate: disable,
  disable: disable,
  getConfiguration: getConfiguration,
  setConfiguration: setConfiguration
};

var options = {
  fireOnTouchStart: true,
  activateCallback: createMagnificationCanvas,
  disableCallback: removeMagnificationCanvas
};

var magnifyTouchDrag = (0, _touchDragTool2.default)(dragCallback, options);

exports.magnify = magnify;
exports.magnifyTouchDrag = magnifyTouchDrag;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _index = __webpack_require__(42);

var _index2 = _interopRequireDefault(_index);

var _displayTool = __webpack_require__(24);

var _displayTool2 = _interopRequireDefault(_displayTool);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOrientationMarkers(element) {
  var cornerstone = _externalModules.external.cornerstone;
  var enabledElement = cornerstone.getEnabledElement(element);
  var imagePlaneMetaData = cornerstone.metaData.get('imagePlaneModule', enabledElement.image.imageId);

  if (!imagePlaneMetaData || !imagePlaneMetaData.rowCosines || !imagePlaneMetaData.columnCosines) {
    return;
  }

  var rowString = _index2.default.getOrientationString(imagePlaneMetaData.rowCosines);
  var columnString = _index2.default.getOrientationString(imagePlaneMetaData.columnCosines);

  var oppositeRowString = _index2.default.invertOrientationString(rowString);
  var oppositeColumnString = _index2.default.invertOrientationString(columnString);

  return {
    top: oppositeColumnString,
    bottom: columnString,
    left: oppositeRowString,
    right: rowString
  };
}

function getOrientationMarkerPositions(element) {
  var cornerstone = _externalModules.external.cornerstone;
  var enabledElement = cornerstone.getEnabledElement(element);
  var coords = void 0;

  coords = {
    x: enabledElement.image.width / 2,
    y: 5
  };
  var top = cornerstone.pixelToCanvas(element, coords);

  coords = {
    x: enabledElement.image.width / 2,
    y: enabledElement.image.height - 5
  };
  var bottom = cornerstone.pixelToCanvas(element, coords);

  coords = {
    x: 5,
    y: enabledElement.image.height / 2
  };
  var left = cornerstone.pixelToCanvas(element, coords);

  coords = {
    x: enabledElement.image.width - 10,
    y: enabledElement.image.height / 2
  };
  var right = cornerstone.pixelToCanvas(element, coords);

  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right
  };
}

function onImageRendered(e, eventData) {
  var element = eventData.element;

  var markers = getOrientationMarkers(element);

  if (!markers) {
    return;
  }

  var coords = getOrientationMarkerPositions(element, markers);

  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = _toolColors2.default.getToolColor();

  var textWidths = {
    top: context.measureText(markers.top).width,
    left: context.measureText(markers.left).width,
    right: context.measureText(markers.right).width,
    bottom: context.measureText(markers.bottom).width
  };

  (0, _drawTextBox2.default)(context, markers.top, coords.top.x - textWidths.top / 2, coords.top.y, color);
  (0, _drawTextBox2.default)(context, markers.left, coords.left.x - textWidths.left / 2, coords.left.y, color);

  var config = orientationMarkers.getConfiguration();

  if (config && config.drawAllMarkers) {
    (0, _drawTextBox2.default)(context, markers.right, coords.right.x - textWidths.right / 2, coords.right.y, color);
    (0, _drawTextBox2.default)(context, markers.bottom, coords.bottom.x - textWidths.bottom / 2, coords.bottom.y, color);
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var orientationMarkers = (0, _displayTool2.default)(onImageRendered);

exports.default = orientationMarkers;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.panTouchDrag = exports.pan = undefined;

var _externalModules = __webpack_require__(0);

var _simpleMouseButtonTool = __webpack_require__(13);

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(11);

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mouseUpCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', dragCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }
}

function dragCallback(e, eventData) {

  // FIXME: Copied from Cornerstone src/internal/calculateTransform.js, should be exposed from there.
  var widthScale = eventData.viewport.scale;
  var heightScale = eventData.viewport.scale;

  if (eventData.image.rowPixelSpacing < eventData.image.columnPixelSpacing) {
    widthScale *= eventData.image.columnPixelSpacing / eventData.image.rowPixelSpacing;
  } else if (eventData.image.columnPixelSpacing < eventData.image.rowPixelSpacing) {
    heightScale *= eventData.image.rowPixelSpacing / eventData.image.columnPixelSpacing;
  }

  eventData.viewport.translation.x += eventData.deltaPoints.page.x / widthScale;
  eventData.viewport.translation.y += eventData.deltaPoints.page.y / heightScale;
  _externalModules.external.cornerstone.setViewport(eventData.element, eventData.viewport);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

var pan = (0, _simpleMouseButtonTool2.default)(mouseDownCallback);
var panTouchDrag = (0, _touchDragTool2.default)(dragCallback);

exports.pan = pan;
exports.panTouchDrag = panTouchDrag;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

var _multiTouchDragTool = __webpack_require__(29);

var _multiTouchDragTool2 = _interopRequireDefault(_multiTouchDragTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function touchPanCallback(e, eventData) {
  var config = panMultiTouch.getConfiguration();

  if (config && config.testPointers(eventData)) {
    eventData.viewport.translation.x += eventData.deltaPoints.page.x / eventData.viewport.scale;
    eventData.viewport.translation.y += eventData.deltaPoints.page.y / eventData.viewport.scale;
    _externalModules.external.cornerstone.setViewport(eventData.element, eventData.viewport);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }
}

var configuration = {
  testPointers: function testPointers(eventData) {
    return eventData.numPointers >= 2;
  }
};

var panMultiTouch = (0, _multiTouchDragTool2.default)(touchPanCallback);

panMultiTouch.setConfiguration(configuration);

exports.default = panMultiTouch;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.probeTouch = exports.probe = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _textStyle = __webpack_require__(14);

var _textStyle2 = _interopRequireDefault(_textStyle);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _getRGBPixels = __webpack_require__(34);

var _getRGBPixels2 = _interopRequireDefault(_getRGBPixels);

var _calculateSUV = __webpack_require__(17);

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'probe';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////
function pointNearTool(element, data, coords) {
  var endCanvas = _externalModules.external.cornerstone.pixelToCanvas(element, data.handles.end);

  return _externalModules.cornerstoneMath.point.distance(endCanvas, coords) < 5;
}

function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var color = void 0;
  var font = _textStyle2.default.getFont();
  var fontHeight = _textStyle2.default.getFontSize();

  for (var i = 0; i < toolData.data.length; i++) {

    context.save();
    var data = toolData.data[i];

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    // Draw the handles
    (0, _drawHandles2.default)(context, eventData, data.handles, color);

    var x = Math.round(data.handles.end.x);
    var y = Math.round(data.handles.end.y);
    var storedPixels = void 0;

    var text = void 0,
        str = void 0;

    if (x < 0 || y < 0 || x >= eventData.image.columns || y >= eventData.image.rows) {
      return;
    }

    if (eventData.image.color) {
      text = x + ', ' + y;
      storedPixels = (0, _getRGBPixels2.default)(eventData.element, x, y, 1, 1);
      str = 'R: ' + storedPixels[0] + ' G: ' + storedPixels[1] + ' B: ' + storedPixels[2];
    } else {
      storedPixels = cornerstone.getStoredPixels(eventData.element, x, y, 1, 1);
      var sp = storedPixels[0];
      var mo = sp * eventData.image.slope + eventData.image.intercept;
      var suv = (0, _calculateSUV2.default)(eventData.image, sp);

      // Draw text
      text = x + ', ' + y;
      str = 'SP: ' + sp + ' MO: ' + parseFloat(mo.toFixed(3));
      if (suv) {
        str += ' SUV: ' + parseFloat(suv.toFixed(3));
      }
    }

    var coords = {
      // Translate the x/y away from the cursor
      x: data.handles.end.x + 3,
      y: data.handles.end.y - 3
    };
    var textCoords = cornerstone.pixelToCanvas(eventData.element, coords);

    context.font = font;
    context.fillStyle = color;

    (0, _drawTextBox2.default)(context, str, textCoords.x, textCoords.y + fontHeight + 5, color);
    (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color);
    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var probe = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var probeTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.probe = probe;
exports.probeTouch = probeTouch;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rectangleRoiTouch = exports.rectangleRoi = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _calculateSUV = __webpack_require__(17);

var _calculateSUV2 = _interopRequireDefault(_calculateSUV);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'rectangleRoi';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    invalidated: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  var cornerstone = _externalModules.external.cornerstone;
  var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
  var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

  var rect = {
    left: Math.min(startCanvas.x, endCanvas.x),
    top: Math.min(startCanvas.y, endCanvas.y),
    width: Math.abs(startCanvas.x - endCanvas.x),
    height: Math.abs(startCanvas.y - endCanvas.y)
  };

  var distanceToPoint = _externalModules.cornerstoneMath.rect.distanceToPoint(rect, coords);

  return distanceToPoint < 5;
}

// /////// BEGIN IMAGE RENDERING ///////

function calculateMeanStdDev(sp, ellipse) {
  // TODO: Get a real statistics library here that supports large counts

  var sum = 0;
  var sumSquared = 0;
  var count = 0;
  var index = 0;

  for (var y = ellipse.top; y < ellipse.top + ellipse.height; y++) {
    for (var x = ellipse.left; x < ellipse.left + ellipse.width; x++) {
      sum += sp[index];
      sumSquared += sp[index] * sp[index];
      count++;
      index++;
    }
  }

  if (count === 0) {
    return {
      count: count,
      mean: 0.0,
      variance: 0.0,
      stdDev: 0.0
    };
  }

  var mean = sum / count;
  var variance = sumSquared / count - mean * mean;

  return {
    count: count,
    mean: mean,
    variance: variance,
    stdDev: Math.sqrt(variance)
  };
}

function numberWithCommas(x) {
  // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  var parts = x.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var image = eventData.image;
  var element = eventData.element;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var config = rectangleRoi.getConfiguration();
  var context = eventData.canvasContext.canvas.getContext('2d');
  var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId);
  var modality = void 0;

  if (seriesModule) {
    modality = seriesModule.modality;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);

  // If we have tool data for this element - iterate over each set and draw it
  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    var data = toolData.data[i];

    // Apply any shadow settings defined in the tool configuration
    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    // Check which color the rendered tool should be
    var color = _toolColors2.default.getColorIfActive(data.active);

    // Convert Image coordinates to Canvas coordinates given the element
    var handleStartCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
    var handleEndCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

    // Retrieve the bounds of the ellipse (left, top, width, and height)
    // In Canvas coordinates
    var leftCanvas = Math.min(handleStartCanvas.x, handleEndCanvas.x);
    var topCanvas = Math.min(handleStartCanvas.y, handleEndCanvas.y);
    var widthCanvas = Math.abs(handleStartCanvas.x - handleEndCanvas.x);
    var heightCanvas = Math.abs(handleStartCanvas.y - handleEndCanvas.y);

    // Draw the rectangle on the canvas
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.rect(leftCanvas, topCanvas, widthCanvas, heightCanvas);
    context.stroke();

    // If the tool configuration specifies to only draw the handles on hover / active,
    // Follow this logic
    if (config && config.drawHandlesOnHover) {
      // Draw the handles if the tool is active
      if (data.active === true) {
        (0, _drawHandles2.default)(context, eventData, data.handles, color);
      } else {
        // If the tool is inactive, draw the handles only if each specific handle is being
        // Hovered over
        var handleOptions = {
          drawHandlesIfActive: true
        };

        (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);
      }
    } else {
      // If the tool has no configuration settings, always draw the handles
      (0, _drawHandles2.default)(context, eventData, data.handles, color);
    }

    // Define variables for the area and mean/standard deviation
    var area = void 0,
        meanStdDev = void 0,
        meanStdDevSUV = void 0;

    // Perform a check to see if the tool has been invalidated. This is to prevent
    // Unnecessary re-calculation of the area, mean, and standard deviation if the
    // Image is re-rendered but the tool has not moved (e.g. during a zoom)
    if (data.invalidated === false) {
      // If the data is not invalidated, retrieve it from the toolData
      meanStdDev = data.meanStdDev;
      meanStdDevSUV = data.meanStdDevSUV;
      area = data.area;
    } else {
      // If the data has been invalidated, we need to calculate it again

      // Retrieve the bounds of the ellipse in image coordinates
      var ellipse = {
        left: Math.min(data.handles.start.x, data.handles.end.x),
        top: Math.min(data.handles.start.y, data.handles.end.y),
        width: Math.abs(data.handles.start.x - data.handles.end.x),
        height: Math.abs(data.handles.start.y - data.handles.end.y)
      };

      // First, make sure this is not a color image, since no mean / standard
      // Deviation will be calculated for color images.
      if (!image.color) {
        // Retrieve the array of pixels that the ellipse bounds cover
        var pixels = cornerstone.getPixels(element, ellipse.left, ellipse.top, ellipse.width, ellipse.height);

        // Calculate the mean & standard deviation from the pixels and the ellipse details
        meanStdDev = calculateMeanStdDev(pixels, ellipse);

        if (modality === 'PT') {
          // If the image is from a PET scan, use the DICOM tags to
          // Calculate the SUV from the mean and standard deviation.

          // Note that because we are using modality pixel values from getPixels, and
          // The calculateSUV routine also rescales to modality pixel values, we are first
          // Returning the values to storedPixel values before calcuating SUV with them.
          // TODO: Clean this up? Should we add an option to not scale in calculateSUV?
          meanStdDevSUV = {
            mean: (0, _calculateSUV2.default)(image, (meanStdDev.mean - image.intercept) / image.slope),
            stdDev: (0, _calculateSUV2.default)(image, (meanStdDev.stdDev - image.intercept) / image.slope)
          };
        }

        // If the mean and standard deviation values are sane, store them for later retrieval
        if (meanStdDev && !isNaN(meanStdDev.mean)) {
          data.meanStdDev = meanStdDev;
          data.meanStdDevSUV = meanStdDevSUV;
        }
      }

      // Retrieve the pixel spacing values, and if they are not
      // Real non-zero values, set them to 1
      var columnPixelSpacing = image.columnPixelSpacing || 1;
      var rowPixelSpacing = image.rowPixelSpacing || 1;

      // Calculate the image area from the ellipse dimensions and pixel spacing
      area = ellipse.width * columnPixelSpacing * (ellipse.height * rowPixelSpacing);

      // If the area value is sane, store it for later retrieval
      if (!isNaN(area)) {
        data.area = area;
      }

      // Set the invalidated flag to false so that this data won't automatically be recalculated
      data.invalidated = false;
    }

    // Define an array to store the rows of text for the textbox
    var textLines = [];

    // If the mean and standard deviation values are present, display them
    if (meanStdDev && meanStdDev.mean) {
      // If the modality is CT, add HU to denote Hounsfield Units
      var moSuffix = '';

      if (modality === 'CT') {
        moSuffix = ' HU';
      }

      // Create a line of text to display the mean and any units that were specified (i.e. HU)
      var meanText = 'Mean: ' + numberWithCommas(meanStdDev.mean.toFixed(2)) + moSuffix;
      // Create a line of text to display the standard deviation and any units that were specified (i.e. HU)
      var stdDevText = 'StdDev: ' + numberWithCommas(meanStdDev.stdDev.toFixed(2)) + moSuffix;

      // If this image has SUV values to display, concatenate them to the text line
      if (meanStdDevSUV && meanStdDevSUV.mean !== undefined) {
        var SUVtext = ' SUV: ';

        meanText += SUVtext + numberWithCommas(meanStdDevSUV.mean.toFixed(2));
        stdDevText += SUVtext + numberWithCommas(meanStdDevSUV.stdDev.toFixed(2));
      }

      // Add these text lines to the array to be displayed in the textbox
      textLines.push(meanText);
      textLines.push(stdDevText);
    }

    // If the area is a sane value, display it
    if (area) {
      // Determine the area suffix based on the pixel spacing in the image.
      // If pixel spacing is present, use millimeters. Otherwise, use pixels.
      // This uses Char code 178 for a superscript 2
      var suffix = ' mm' + String.fromCharCode(178);

      if (!image.rowPixelSpacing || !image.columnPixelSpacing) {
        suffix = ' pixels' + String.fromCharCode(178);
      }

      // Create a line of text to display the area and its units
      var areaText = 'Area: ' + numberWithCommas(area.toFixed(2)) + suffix;

      // Add this text line to the array to be displayed in the textbox
      textLines.push(areaText);
    }

    // If the textbox has not been moved by the user, it should be displayed on the right-most
    // Side of the tool.
    if (!data.handles.textBox.hasMoved) {
      // Find the rightmost side of the ellipse at its vertical center, and place the textbox here
      // Note that this calculates it in image coordinates
      data.handles.textBox.x = Math.max(data.handles.start.x, data.handles.end.x);
      data.handles.textBox.y = (data.handles.start.y + data.handles.end.y) / 2;
    }

    // Convert the textbox Image coordinates into Canvas coordinates
    var textCoords = cornerstone.pixelToCanvas(element, data.handles.textBox);

    // Set options for the textbox drawing function
    var options = {
      centering: {
        x: false,
        y: true
      }
    };

    // Draw the textbox and retrieves it's bounding box for mouse-dragging and highlighting
    var boundingBox = (0, _drawTextBox2.default)(context, textLines, textCoords.x, textCoords.y, color, options);

    // Store the bounding box data in the handle for mouse-dragging and highlighting
    data.handles.textBox.boundingBox = boundingBox;

    // If the textbox has moved, we would like to draw a line linking it with the tool
    // This section decides where to draw this line to on the Ellipse based on the location
    // Of the textbox relative to the ellipse.
    if (data.handles.textBox.hasMoved) {
      // Draw dashed link line between tool and text

      // The initial link position is at the center of the
      // Textbox.
      var link = {
        start: {},
        end: {
          x: textCoords.x,
          y: textCoords.y
        }
      };

      // First we calculate the ellipse points (top, left, right, and bottom)
      var ellipsePoints = [{
        // Top middle point of ellipse
        x: leftCanvas + widthCanvas / 2,
        y: topCanvas
      }, {
        // Left middle point of ellipse
        x: leftCanvas,
        y: topCanvas + heightCanvas / 2
      }, {
        // Bottom middle point of ellipse
        x: leftCanvas + widthCanvas / 2,
        y: topCanvas + heightCanvas
      }, {
        // Right middle point of ellipse
        x: leftCanvas + widthCanvas,
        y: topCanvas + heightCanvas / 2
      }];

      // We obtain the link starting point by finding the closest point on the ellipse to the
      // Center of the textbox
      link.start = _externalModules.cornerstoneMath.point.findClosestPoint(ellipsePoints, link.end);

      // Next we calculate the corners of the textbox bounding box
      var boundingBoxPoints = [{
        // Top middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top
      }, {
        // Left middle point of bounding box
        x: boundingBox.left,
        y: boundingBox.top + boundingBox.height / 2
      }, {
        // Bottom middle point of bounding box
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height
      }, {
        // Right middle point of bounding box
        x: boundingBox.left + boundingBox.width,
        y: boundingBox.top + boundingBox.height / 2
      }];

      // Now we recalculate the link endpoint by identifying which corner of the bounding box
      // Is closest to the start point we just calculated.
      link.end = _externalModules.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

      // Finally we draw the dashed linking line
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.setLineDash([2, 3]);
      context.moveTo(link.start.x, link.start.y);
      context.lineTo(link.end.x, link.end.y);
      context.stroke();
    }

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// Module exports
var rectangleRoi = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var rectangleRoiTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.rectangleRoi = rectangleRoi;
exports.rectangleRoiTouch = rectangleRoiTouch;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotateTouchDrag = exports.rotate = undefined;

var _externalModules = __webpack_require__(0);

var _simpleMouseButtonTool = __webpack_require__(13);

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(11);

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// --- Strategies --- //
function defaultStrategy(eventData) {
  // Calculate distance from the center of the image
  var rect = eventData.element.getBoundingClientRect(eventData.element);

  var points = {
    x: eventData.currentPoints.client.x,
    y: eventData.currentPoints.client.y
  };

  var width = eventData.element.clientWidth;
  var height = eventData.element.clientHeight;

  var pointsFromCenter = {
    x: points.x - rect.left - width / 2,
    // Invert the coordinate system so that up is positive
    y: -1 * (points.y - rect.top - height / 2)
  };

  var rotationRadians = Math.atan2(pointsFromCenter.y, pointsFromCenter.x);
  var rotationDegrees = rotationRadians * (180 / Math.PI);
  var rotation = -1 * rotationDegrees + 90;

  eventData.viewport.rotation = rotation;
  _externalModules.external.cornerstone.setViewport(eventData.element, eventData.viewport);
}

function horizontalStrategy(eventData) {
  eventData.viewport.rotation += eventData.deltaPoints.page.x / eventData.viewport.scale;
  _externalModules.external.cornerstone.setViewport(eventData.element, eventData.viewport);
}

function verticalStrategy(eventData) {
  eventData.viewport.rotation += eventData.deltaPoints.page.y / eventData.viewport.scale;
  _externalModules.external.cornerstone.setViewport(eventData.element, eventData.viewport);
}

// --- Mouse event callbacks --- //
function mouseUpCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', dragCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }
}

function dragCallback(e, eventData) {
  rotate.strategy(eventData);
  _externalModules.external.cornerstone.setViewport(eventData.element, eventData.viewport);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

var rotate = (0, _simpleMouseButtonTool2.default)(mouseDownCallback);

rotate.strategies = {
  default: defaultStrategy,
  horizontal: horizontalStrategy,
  vertical: verticalStrategy
};

rotate.strategy = defaultStrategy;

var rotateTouchDrag = (0, _touchDragTool2.default)(dragCallback);

exports.rotate = rotate;
exports.rotateTouchDrag = rotateTouchDrag;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _externalModules = __webpack_require__(0);

function touchRotateCallback(e, eventData) {
  eventData.viewport.rotation += eventData.rotation;
  _externalModules.external.cornerstone.setViewport(eventData.element, eventData.viewport);

  return false;
}

function disable(element) {
  _externalModules.external.$(element).off('CornerstoneToolsTouchRotate', touchRotateCallback);
}

function activate(element) {
  _externalModules.external.$(element).off('CornerstoneToolsTouchRotate', touchRotateCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTouchRotate', touchRotateCallback);
}

var rotateTouch = {
  activate: activate,
  disable: disable
};

exports.default = rotateTouch;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, filename, mimetype) {
  // Setting the default value for mimetype to image/png
  mimetype = mimetype || 'image/png';
  var canvas = _externalModules.external.$(element).find('canvas').get(0);

  // Thanks to Ken Fyrstenber
  // http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
  var lnk = document.createElement('a');

  // / the key here is to set the download attribute of the a tag
  lnk.download = filename;

  // / convert canvas content to data-uri for link. When download
  // / attribute is set the content pointed to by link will be
  // / pushed as 'download' in HTML5 capable browsers
  lnk.href = canvas.toDataURL(mimetype);

  // / create a 'fake' click-event to trigger the download
  if (document.createEvent) {

    var e = document.createEvent('MouseEvents');

    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {

    lnk.fireEvent('onclick');
  }
};

var _externalModules = __webpack_require__(0);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedAnnotateTouch = exports.seedAnnotate = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _textStyle = __webpack_require__(14);

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _anyHandlesOutsideImage = __webpack_require__(12);

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _moveHandle = __webpack_require__(22);

var _moveHandle2 = _interopRequireDefault(_moveHandle);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _drawCircle = __webpack_require__(48);

var _drawCircle2 = _interopRequireDefault(_drawCircle);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _pointInsideBoundingBox = __webpack_require__(16);

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-alert:0 */
var toolType = 'seedAnnotate';

// Define a callback to get your text annotation
// This could be used, e.g. to open a modal
function getTextCallback(doneGetTextCallback) {
  doneGetTextCallback(prompt('Enter your annotation:'));
}

function changeTextCallback(data, eventData, doneChangingTextCallback) {
  doneChangingTextCallback(prompt('Change your annotation:'));
}

var configuration = {
  getTextCallback: getTextCallback,
  changeTextCallback: changeTextCallback,
  drawHandles: false,
  drawHandlesOnHover: true,
  currentLetter: 'A',
  currentNumber: 0,
  showCoordinates: true,
  countUp: true
};
// / --- Mouse Tool --- ///

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurement(mouseEventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = mouseEventData.element;
  var config = seedAnnotate.getConfiguration();
  var measurementData = createNewMeasurement(mouseEventData);

  function doneGetTextCallback(text) {
    if (text === null) {
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    } else {
      measurementData.text = text;
    }

    measurementData.active = false;
    cornerstone.updateImage(element);
  }

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  cornerstone.updateImage(element);
  (0, _moveHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.end, function () {
    if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    }

    if (measurementData.text === undefined) {
      config.getTextCallback(doneGetTextCallback);
    }

    cornerstone.updateImage(element);
  });
}

function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  if (!data.handles.end) {
    return;
  }

  var realCoords = _externalModules.external.cornerstone.pixelToCanvas(element, data.handles.end);
  var distanceToPoint = _externalModules.cornerstoneMath.point.distance(realCoords, coords);

  return distanceToPoint < 25;
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var enabledElement = eventData.enabledElement;

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // We need the canvas width
  var canvasWidth = eventData.canvasContext.canvas.width;

  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var font = _textStyle2.default.getFont();
  var config = seedAnnotate.getConfiguration();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    // Draw
    var handleCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    // Draw the circle always at the end of the handle
    (0, _drawCircle2.default)(context, handleCanvas, color, lineWidth);

    var handleOptions = {
      drawHandlesIfActive: config && config.drawHandlesOnHover
    };

    if (config.drawHandles) {
      (0, _drawHandles2.default)(context, eventData, handleCanvas, color, handleOptions);
    }

    // Draw the text
    if (data.text && data.text !== '') {
      context.font = font;

      var textPlusCoords = '';

      if (config.showCoordinates) {
        textPlusCoords = data.text + ' x: ' + Math.round(data.handles.end.x) + ' y: ' + Math.round(data.handles.end.y);
      } else {
        textPlusCoords = data.text;
      }

      // Calculate the text coordinates.
      var textWidth = context.measureText(textPlusCoords).width + 10;
      var textHeight = _textStyle2.default.getFontSize() + 10;

      var distance = Math.max(textWidth, textHeight) / 2 + 5;

      if (handleCanvas.x > canvasWidth / 2) {
        distance = -distance;
      }

      var textCoords = void 0;

      if (!data.handles.textBox.hasMoved) {
        textCoords = {
          x: handleCanvas.x - textWidth / 2 + distance,
          y: handleCanvas.y - textHeight / 2
        };

        var transform = cornerstone.internal.getTransform(enabledElement);

        transform.invert();

        var coords = transform.transformPoint(textCoords.x, textCoords.y);

        data.handles.textBox.x = coords.x;
        data.handles.textBox.y = coords.y;
      }

      textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);

      var boundingBox = (0, _drawTextBox2.default)(context, textPlusCoords, textCoords.x, textCoords.y, color);

      data.handles.textBox.boundingBox = boundingBox;

      if (data.handles.textBox.hasMoved) {
        // Draw dashed link line between tool and text
        var link = {
          start: {},
          end: {}
        };

        link.end.x = textCoords.x;
        link.end.y = textCoords.y;

        link.start = handleCanvas;

        var boundingBoxPoints = [{
          // Top middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top
        }, {
          // Left middle point of bounding box
          x: boundingBox.left,
          y: boundingBox.top + boundingBox.height / 2
        }, {
          // Bottom middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top + boundingBox.height
        }, {
          // Right middle point of bounding box
          x: boundingBox.left + boundingBox.width,
          y: boundingBox.top + boundingBox.height / 2
        }];

        link.end = _externalModules.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.setLineDash([2, 3]);
        context.moveTo(link.start.x, link.start.y);
        context.lineTo(link.end.x, link.end.y);
        context.stroke();
      }
    }

    context.restore();
  }
}
// ---- Touch tool ----

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurementTouch(touchEventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = touchEventData.element;
  var config = seedAnnotate.getConfiguration();
  var measurementData = createNewMeasurement(touchEventData);

  function doneGetTextCallback(text) {
    if (text === null) {
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    } else {
      measurementData.text = text;
    }

    measurementData.active = false;
    cornerstone.updateImage(element);
  }

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  cornerstone.updateImage(element);
  (0, _moveHandle2.default)(touchEventData, toolType, measurementData, measurementData.handles.end, function () {
    if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
    }

    if (measurementData.text === undefined) {
      config.getTextCallback(doneGetTextCallback);
    }

    cornerstone.updateImage(element);
  });
}

function doubleClickCallback(e, eventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = eventData.element;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);
  }

  if (e.data && e.data.mouseButtonMask && !(0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    return;
  }

  var config = seedAnnotate.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords) || (0, _pointInsideBoundingBox2.default)(data.handles.textBox, coords)) {

      data.active = true;
      cornerstone.updateImage(element);
      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

function pressCallback(e, eventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = eventData.element;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    console.log('pressCallback doneChangingTextCallback');
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);

    _externalModules.external.$(element).on('CornerstoneToolsTouchStart', seedAnnotateTouch.touchStartCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTouchStartActive', seedAnnotateTouch.touchDownActivateCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTap', seedAnnotateTouch.tapCallback);
  }

  if (e.data && e.data.mouseButtonMask && !(0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    return false;
  }

  var config = seedAnnotate.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return false;
  }

  if (eventData.handlePressed) {
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', seedAnnotateTouch.touchStartCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', seedAnnotateTouch.touchDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', seedAnnotateTouch.tapCallback);

    // Allow relabelling via a callback
    config.changeTextCallback(eventData.handlePressed, eventData, doneChangingTextCallback);

    e.stopImmediatePropagation();

    return false;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords) || (0, _pointInsideBoundingBox2.default)(data.handles.textBox, coords)) {
      data.active = true;
      cornerstone.updateImage(element);

      _externalModules.external.$(element).off('CornerstoneToolsTouchStart', seedAnnotateTouch.touchStartCallback);
      _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', seedAnnotateTouch.touchDownActivateCallback);
      _externalModules.external.$(element).off('CornerstoneToolsTap', seedAnnotateTouch.tapCallback);

      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

var seedAnnotate = (0, _mouseButtonTool2.default)({
  addNewMeasurement: addNewMeasurement,
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  mouseDoubleClickCallback: doubleClickCallback
});

seedAnnotate.setConfiguration(configuration);

var seedAnnotateTouch = (0, _touchTool2.default)({
  addNewMeasurement: addNewMeasurementTouch,
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  pressCallback: pressCallback
});

exports.seedAnnotate = seedAnnotate;
exports.seedAnnotateTouch = seedAnnotateTouch;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleAngleTouch = exports.simpleAngle = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _roundToDecimal = __webpack_require__(31);

var _roundToDecimal2 = _interopRequireDefault(_roundToDecimal);

var _textStyle = __webpack_require__(14);

var _textStyle2 = _interopRequireDefault(_textStyle);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _anyHandlesOutsideImage = __webpack_require__(12);

var _anyHandlesOutsideImage2 = _interopRequireDefault(_anyHandlesOutsideImage);

var _moveNewHandle = __webpack_require__(23);

var _moveNewHandle2 = _interopRequireDefault(_moveNewHandle);

var _moveNewHandleTouch = __webpack_require__(25);

var _moveNewHandleTouch2 = _interopRequireDefault(_moveNewHandleTouch);

var _drawHandles = __webpack_require__(8);

var _drawHandles2 = _interopRequireDefault(_drawHandles);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'simpleAngle';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  // Create the measurement data for this tool with the end handle activated
  var angleData = {
    visible: true,
    active: true,
    handles: {
      start: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      middle: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true
      },
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: false
      },
      textBox: {
        active: false,
        hasMoved: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true
      }
    }
  };

  return angleData;
}
// /////// END ACTIVE TOOL ///////

function pointNearTool(element, data, coords) {
  var cornerstone = _externalModules.external.cornerstone;
  var lineSegment = {
    start: cornerstone.pixelToCanvas(element, data.handles.start),
    end: cornerstone.pixelToCanvas(element, data.handles.middle)
  };

  var distanceToPoint = _externalModules.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  if (distanceToPoint < 25) {
    return true;
  }

  lineSegment.start = cornerstone.pixelToCanvas(element, data.handles.middle);
  lineSegment.end = cornerstone.pixelToCanvas(element, data.handles.end);

  distanceToPoint = _externalModules.cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);

  return distanceToPoint < 25;
}

function length(vector) {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

// /////// BEGIN IMAGE RENDERING ///////
function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var cornerstone = _externalModules.external.cornerstone;
  var enabledElement = eventData.enabledElement;

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Activation color
  var color = void 0;
  var lineWidth = _toolStyle2.default.getToolWidth();
  var font = _textStyle2.default.getFont();
  var config = simpleAngle.getConfiguration();

  for (var i = 0; i < toolData.data.length; i++) {
    context.save();

    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    var data = toolData.data[i];

    // Differentiate the color of activation tool
    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    } else {
      color = _toolColors2.default.getToolColor();
    }

    var handleStartCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.start);
    var handleMiddleCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.middle);
    var handleEndCanvas = cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    // Draw the line
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(handleStartCanvas.x, handleStartCanvas.y);
    context.lineTo(handleMiddleCanvas.x, handleMiddleCanvas.y);
    context.lineTo(handleEndCanvas.x, handleEndCanvas.y);
    context.stroke();

    // Draw the handles
    var handleOptions = {
      drawHandlesIfActive: config && config.drawHandlesOnHover
    };

    (0, _drawHandles2.default)(context, eventData, data.handles, color, handleOptions);

    // Draw the text
    context.fillStyle = color;

    // Default to isotropic pixel size, update suffix to reflect this
    var columnPixelSpacing = eventData.image.columnPixelSpacing || 1;
    var rowPixelSpacing = eventData.image.rowPixelSpacing || 1;
    var suffix = '';

    if (!eventData.image.rowPixelSpacing || !eventData.image.columnPixelSpacing) {
      suffix = ' (isotropic)';
    }

    var sideA = {
      x: (Math.ceil(data.handles.middle.x) - Math.ceil(data.handles.start.x)) * columnPixelSpacing,
      y: (Math.ceil(data.handles.middle.y) - Math.ceil(data.handles.start.y)) * rowPixelSpacing
    };

    var sideB = {
      x: (Math.ceil(data.handles.end.x) - Math.ceil(data.handles.middle.x)) * columnPixelSpacing,
      y: (Math.ceil(data.handles.end.y) - Math.ceil(data.handles.middle.y)) * rowPixelSpacing
    };

    var sideC = {
      x: (Math.ceil(data.handles.end.x) - Math.ceil(data.handles.start.x)) * columnPixelSpacing,
      y: (Math.ceil(data.handles.end.y) - Math.ceil(data.handles.start.y)) * rowPixelSpacing
    };

    var sideALength = length(sideA);
    var sideBLength = length(sideB);
    var sideCLength = length(sideC);

    // Cosine law
    var angle = Math.acos((Math.pow(sideALength, 2) + Math.pow(sideBLength, 2) - Math.pow(sideCLength, 2)) / (2 * sideALength * sideBLength));

    angle *= 180 / Math.PI;

    var rAngle = (0, _roundToDecimal2.default)(angle, 2);

    if (rAngle) {
      var str = '00B0'; // Degrees symbol
      var text = rAngle.toString() + String.fromCharCode(parseInt(str, 16)) + suffix;

      var distance = 15;

      var textCoords = void 0;

      if (data.handles.textBox.hasMoved) {
        textCoords = cornerstone.pixelToCanvas(eventData.element, data.handles.textBox);
      } else {
        textCoords = {
          x: handleMiddleCanvas.x,
          y: handleMiddleCanvas.y
        };

        context.font = font;
        var textWidth = context.measureText(text).width;

        if (handleMiddleCanvas.x < handleStartCanvas.x) {
          textCoords.x -= distance + textWidth + 10;
        } else {
          textCoords.x += distance;
        }

        var transform = cornerstone.internal.getTransform(enabledElement);

        transform.invert();

        var coords = transform.transformPoint(textCoords.x, textCoords.y);

        data.handles.textBox.x = coords.x;
        data.handles.textBox.y = coords.y;
      }

      var options = {
        centering: {
          x: false,
          y: true
        }
      };

      var boundingBox = (0, _drawTextBox2.default)(context, text, textCoords.x, textCoords.y, color, options);

      data.handles.textBox.boundingBox = boundingBox;

      if (data.handles.textBox.hasMoved) {
        // Draw dashed link line between tool and text
        var link = {
          start: {},
          end: {}
        };

        var points = [handleStartCanvas, handleEndCanvas, handleMiddleCanvas];

        link.end.x = textCoords.x;
        link.end.y = textCoords.y;

        link.start = _externalModules.cornerstoneMath.point.findClosestPoint(points, link.end);

        var boundingBoxPoints = [{
          // Top middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top
        }, {
          // Left middle point of bounding box
          x: boundingBox.left,
          y: boundingBox.top + boundingBox.height / 2
        }, {
          // Bottom middle point of bounding box
          x: boundingBox.left + boundingBox.width / 2,
          y: boundingBox.top + boundingBox.height
        }, {
          // Right middle point of bounding box
          x: boundingBox.left + boundingBox.width,
          y: boundingBox.top + boundingBox.height / 2
        }];

        link.end = _externalModules.cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.setLineDash([2, 3]);
        context.moveTo(link.start.x, link.start.y);
        context.lineTo(link.end.x, link.end.y);
        context.stroke();
      }
    }

    context.restore();
  }
}
// /////// END IMAGE RENDERING ///////

// /////// BEGIN ACTIVE TOOL ///////
function addNewMeasurement(mouseEventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var measurementData = createNewMeasurement(mouseEventData);
  var element = mouseEventData.element;

  var eventData = {
    mouseButtonMask: mouseEventData.which
  };

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  // Since we are dragging to another place to drop the end point, we can just activate
  // The end point and let the moveHandle move it for us.
  _externalModules.external.$(element).off('CornerstoneToolsMouseMove', simpleAngle.mouseMoveCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', simpleAngle.mouseMoveCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', simpleAngle.mouseDownCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', simpleAngle.mouseDownActivateCallback);
  cornerstone.updateImage(element);

  (0, _moveNewHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.middle, function () {
    measurementData.active = false;
    if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);

      _externalModules.external.$(element).on('CornerstoneToolsMouseMove', simpleAngle.mouseMoveCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', simpleAngle.mouseMoveCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, simpleAngle.mouseDownCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDownActivate', eventData, simpleAngle.mouseDownActivateCallback);
      cornerstone.updateImage(element);

      return;
    }

    measurementData.handles.end.active = true;
    cornerstone.updateImage(element);

    (0, _moveNewHandle2.default)(mouseEventData, toolType, measurementData, measurementData.handles.end, function () {
      measurementData.active = false;
      if ((0, _anyHandlesOutsideImage2.default)(mouseEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, toolType, measurementData);
      }

      _externalModules.external.$(element).on('CornerstoneToolsMouseMove', simpleAngle.mouseMoveCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', simpleAngle.mouseMoveCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, simpleAngle.mouseDownCallback);
      _externalModules.external.$(element).on('CornerstoneToolsMouseDownActivate', eventData, simpleAngle.mouseDownActivateCallback);
      cornerstone.updateImage(element);
    });
  });
}

function addNewMeasurementTouch(touchEventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var measurementData = createNewMeasurement(touchEventData);
  var element = touchEventData.element;

  // Associate this data with this imageId so we can render it and manipulate it
  (0, _toolState.addToolState)(element, toolType, measurementData);

  // Since we are dragging to another place to drop the end point, we can just activate
  // The end point and let the moveHandle move it for us.
  _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', simpleAngleTouch.touchMoveCallback);
  _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', simpleAngleTouch.touchDownActivateCallback);
  _externalModules.external.$(element).off('CornerstoneToolsTouchStart', simpleAngleTouch.touchStartCallback);
  _externalModules.external.$(element).off('CornerstoneToolsTap', simpleAngleTouch.tapCallback);
  cornerstone.updateImage(element);

  (0, _moveNewHandleTouch2.default)(touchEventData, toolType, measurementData, measurementData.handles.middle, function () {
    if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
      // Delete the measurement
      (0, _toolState.removeToolState)(element, toolType, measurementData);
      _externalModules.external.$(element).on('CornerstoneToolsTouchDrag', simpleAngleTouch.touchMoveCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTouchStart', simpleAngleTouch.touchStartCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTouchStartActive', simpleAngleTouch.touchDownActivateCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTap', simpleAngleTouch.tapCallback);
      cornerstone.updateImage(element);

      return;
    }

    (0, _moveNewHandleTouch2.default)(touchEventData, toolType, measurementData, measurementData.handles.end, function () {
      if ((0, _anyHandlesOutsideImage2.default)(touchEventData, measurementData.handles)) {
        // Delete the measurement
        (0, _toolState.removeToolState)(element, toolType, measurementData);
        cornerstone.updateImage(element);
      }

      _externalModules.external.$(element).on('CornerstoneToolsTouchDrag', simpleAngleTouch.touchMoveCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTouchStart', simpleAngleTouch.touchStartCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTouchStartActive', simpleAngleTouch.touchDownActivateCallback);
      _externalModules.external.$(element).on('CornerstoneToolsTap', simpleAngleTouch.tapCallback);
    });
  });
}

var simpleAngle = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  addNewMeasurement: addNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

var simpleAngleTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  addNewMeasurement: addNewMeasurementTouch,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType
});

exports.simpleAngle = simpleAngle;
exports.simpleAngleTouch = simpleAngleTouch;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textMarkerTouch = exports.textMarker = undefined;

var _externalModules = __webpack_require__(0);

var _mouseButtonTool = __webpack_require__(7);

var _mouseButtonTool2 = _interopRequireDefault(_mouseButtonTool);

var _touchTool = __webpack_require__(9);

var _touchTool2 = _interopRequireDefault(_touchTool);

var _pointInsideBoundingBox = __webpack_require__(16);

var _pointInsideBoundingBox2 = _interopRequireDefault(_pointInsideBoundingBox);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _drawTextBox = __webpack_require__(6);

var _drawTextBox2 = _interopRequireDefault(_drawTextBox);

var _toolState = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'textMarker';

// /////// BEGIN ACTIVE TOOL ///////
function createNewMeasurement(mouseEventData) {
  var config = textMarker.getConfiguration();

  if (!config.current) {
    return;
  }

  // Create the measurement data for this tool with the end handle activated
  var measurementData = {
    visible: true,
    active: true,
    text: config.current,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true,
        hasBoundingBox: true
      }
    }
  };

  // Create a rectangle representing the image
  var imageRect = {
    left: 0,
    top: 0,
    width: mouseEventData.image.width,
    height: mouseEventData.image.height
  };

  // Check if the current handle is outside the image,
  // If it is, prevent the handle creation
  if (!_externalModules.cornerstoneMath.point.insideRect(measurementData.handles.end, imageRect)) {
    return;
  }

  // Update the current marker for the next marker
  var currentIndex = config.markers.indexOf(config.current);

  if (config.ascending) {
    currentIndex += 1;
    if (currentIndex >= config.markers.length) {
      if (config.loop) {
        currentIndex -= config.markers.length;
      } else {
        currentIndex = -1;
      }
    }
  } else {
    currentIndex -= 1;
    if (currentIndex < 0) {
      if (config.loop) {
        currentIndex += config.markers.length;
      } else {
        currentIndex = -1;
      }
    }
  }

  config.current = config.markers[currentIndex];

  return measurementData;
}
// /////// END ACTIVE TOOL ///////

// /////// BEGIN IMAGE RENDERING ///////
function pointNearTool(element, data, coords) {
  if (!data.handles.end.boundingBox) {
    return;
  }

  var distanceToPoint = _externalModules.cornerstoneMath.rect.distanceToPoint(data.handles.end.boundingBox, coords);
  var insideBoundingBox = (0, _pointInsideBoundingBox2.default)(data.handles.end, coords);

  return distanceToPoint < 10 || insideBoundingBox;
}

function onImageRendered(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData) {
    return;
  }

  // We have tool data for this element - iterate over each one and draw it
  var context = eventData.canvasContext.canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  var config = textMarker.getConfiguration();

  for (var i = 0; i < toolData.data.length; i++) {
    var data = toolData.data[i];

    var color = _toolColors2.default.getToolColor();

    if (data.active) {
      color = _toolColors2.default.getActiveColor();
    }

    context.save();

    if (config && config.shadow) {
      context.shadowColor = config.shadowColor || '#000000';
      context.shadowOffsetX = config.shadowOffsetX || 1;
      context.shadowOffsetY = config.shadowOffsetY || 1;
    }

    // Draw text
    context.fillStyle = color;
    var measureText = context.measureText(data.text);

    data.textWidth = measureText.width + 10;

    var textCoords = _externalModules.external.cornerstone.pixelToCanvas(eventData.element, data.handles.end);

    var options = {
      centering: {
        x: true,
        y: true
      }
    };

    var boundingBox = (0, _drawTextBox2.default)(context, data.text, textCoords.x, textCoords.y - 10, color, options);

    data.handles.end.boundingBox = boundingBox;

    context.restore();
  }
}

function doubleClickCallback(e, eventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = eventData.element;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);

    var mouseButtonData = {
      mouseButtonMask: e.data.mouseButtonMask
    };

    _externalModules.external.$(element).on('CornerstoneToolsMouseMove', mouseButtonData, textMarker.mouseMoveCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDown', mouseButtonData, textMarker.mouseDownCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDownActivate', mouseButtonData, textMarker.mouseDownActivateCallback);
    _externalModules.external.$(element).on('CornerstoneToolsMouseDoubleClick', mouseButtonData, textMarker.mouseDoubleClickCallback);
  }

  if (e.data && e.data.mouseButtonMask && !(0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    return;
  }

  var config = textMarker.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords)) {
      data.active = true;
      cornerstone.updateImage(element);

      _externalModules.external.$(element).off('CornerstoneToolsMouseMove', textMarker.mouseMoveCallback);
      _externalModules.external.$(element).off('CornerstoneToolsMouseDown', textMarker.mouseDownCallback);
      _externalModules.external.$(element).off('CornerstoneToolsMouseDownActivate', textMarker.mouseDownActivateCallback);
      _externalModules.external.$(element).off('CornerstoneToolsMouseDoubleClick', textMarker.mouseDoubleClickCallback);
      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

function touchPressCallback(e, eventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = eventData.element;
  var data = void 0;

  function doneChangingTextCallback(data, updatedText, deleteTool) {
    if (deleteTool === true) {
      (0, _toolState.removeToolState)(element, toolType, data);
    } else {
      data.text = updatedText;
    }

    data.active = false;
    cornerstone.updateImage(element);

    _externalModules.external.$(element).on('CornerstoneToolsTouchDrag', textMarkerTouch.touchMoveCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTouchStartActive', textMarkerTouch.touchDownActivateCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTouchStart', textMarkerTouch.touchStartCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTap', textMarkerTouch.tapCallback);
    _externalModules.external.$(element).on('CornerstoneToolsTouchPress', textMarkerTouch.pressCallback);
  }

  var config = textMarker.getConfiguration();

  var coords = eventData.currentPoints.canvas;
  var toolData = (0, _toolState.getToolState)(element, toolType);

  // Now check to see if there is a handle we can move
  if (!toolData) {
    return false;
  }

  if (eventData.handlePressed) {
    eventData.handlePressed.active = true;
    cornerstone.updateImage(element);

    _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', textMarkerTouch.touchMoveCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', textMarkerTouch.touchDownActivateCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchStart', textMarkerTouch.touchStartCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTap', textMarkerTouch.tapCallback);
    _externalModules.external.$(element).off('CornerstoneToolsTouchPress', textMarkerTouch.pressCallback);

    // Allow relabelling via a callback
    config.changeTextCallback(eventData.handlePressed, eventData, doneChangingTextCallback);

    e.stopImmediatePropagation();

    return false;
  }

  for (var i = 0; i < toolData.data.length; i++) {
    data = toolData.data[i];
    if (pointNearTool(element, data, coords)) {
      data.active = true;
      cornerstone.updateImage(element);

      _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', textMarkerTouch.touchMoveCallback);
      _externalModules.external.$(element).off('CornerstoneToolsTouchStartActive', textMarkerTouch.touchDownActivateCallback);
      _externalModules.external.$(element).off('CornerstoneToolsTouchStart', textMarkerTouch.touchStartCallback);
      _externalModules.external.$(element).off('CornerstoneToolsTap', textMarkerTouch.tapCallback);
      _externalModules.external.$(element).off('CornerstoneToolsTouchPress', textMarkerTouch.pressCallback);
      // Allow relabelling via a callback
      config.changeTextCallback(data, eventData, doneChangingTextCallback);

      e.stopImmediatePropagation();

      return false;
    }
  }

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

var textMarker = (0, _mouseButtonTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  mouseDoubleClickCallback: doubleClickCallback
});

var textMarkerTouch = (0, _touchTool2.default)({
  createNewMeasurement: createNewMeasurement,
  onImageRendered: onImageRendered,
  pointNearTool: pointNearTool,
  toolType: toolType,
  pressCallback: touchPressCallback
});

exports.textMarker = textMarker;
exports.textMarkerTouch = textMarkerTouch;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wwwcTouchDrag = exports.wwwc = undefined;

var _externalModules = __webpack_require__(0);

var _simpleMouseButtonTool = __webpack_require__(13);

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _touchDragTool = __webpack_require__(11);

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mouseUpCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', mouseDragCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);

    return false; // False = causes jquery to preventDefault() and stopPropagation() this event
  }
}

function defaultStrategy(eventData) {
  // Here we normalize the ww/wc adjustments so the same number of on screen pixels
  // Adjusts the same percentage of the dynamic range of the image.  This is needed to
  // Provide consistency for the ww/wc tool regardless of the dynamic range (e.g. an 8 bit
  // Image will feel the same as a 16 bit image would)
  var maxVOI = eventData.image.maxPixelValue * eventData.image.slope + eventData.image.intercept;
  var minVOI = eventData.image.minPixelValue * eventData.image.slope + eventData.image.intercept;
  var imageDynamicRange = maxVOI - minVOI;
  var multiplier = imageDynamicRange / 1024;

  var deltaX = eventData.deltaPoints.page.x * multiplier;
  var deltaY = eventData.deltaPoints.page.y * multiplier;

  eventData.viewport.voi.windowWidth += deltaX;
  eventData.viewport.voi.windowCenter += deltaY;
}

function mouseDragCallback(e, eventData) {
  wwwc.strategy(eventData);
  _externalModules.external.cornerstone.setViewport(eventData.element, eventData.viewport);

  return false; // False = cases jquery to preventDefault() and stopPropagation() this event
}

function touchDragCallback(e, eventData) {
  e.stopImmediatePropagation(); // Prevent CornerstoneToolsTouchStartActive from killing any press events
  var dragData = eventData;

  var maxVOI = dragData.image.maxPixelValue * dragData.image.slope + dragData.image.intercept;
  var minVOI = dragData.image.minPixelValue * dragData.image.slope + dragData.image.intercept;
  var imageDynamicRange = maxVOI - minVOI;
  var multiplier = imageDynamicRange / 1024;
  var deltaX = dragData.deltaPoints.page.x * multiplier;
  var deltaY = dragData.deltaPoints.page.y * multiplier;

  var config = wwwc.getConfiguration();

  if (config.orientation) {
    if (config.orientation === 0) {
      dragData.viewport.voi.windowWidth += deltaX;
      dragData.viewport.voi.windowCenter += deltaY;
    } else {
      dragData.viewport.voi.windowWidth += deltaY;
      dragData.viewport.voi.windowCenter += deltaX;
    }
  } else {
    dragData.viewport.voi.windowWidth += deltaX;
    dragData.viewport.voi.windowCenter += deltaY;
  }

  _externalModules.external.cornerstone.setViewport(dragData.element, dragData.viewport);
}

var wwwc = (0, _simpleMouseButtonTool2.default)(mouseDownCallback);

wwwc.strategies = {
  default: defaultStrategy
};

wwwc.strategy = defaultStrategy;

var wwwcTouchDrag = (0, _touchDragTool2.default)(touchDragCallback);

exports.wwwc = wwwc;
exports.wwwcTouchDrag = wwwcTouchDrag;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wwwcRegionTouch = exports.wwwcRegion = undefined;

var _externalModules = __webpack_require__(0);

var _toolStyle = __webpack_require__(5);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _toolColors = __webpack_require__(4);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _toolState = __webpack_require__(1);

var _getLuminance = __webpack_require__(46);

var _getLuminance2 = _interopRequireDefault(_getLuminance);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'wwwcRegion';

var configuration = {
  minWindowWidth: 10
};

var currentMouseButtonMask = void 0;

/** Calculates the minimum, maximum, and mean value in the given pixel array */
function calculateMinMaxMean(storedPixelLuminanceData, globalMin, globalMax) {
  var numPixels = storedPixelLuminanceData.length;

  if (numPixels < 2) {
    return {
      min: globalMin,
      max: globalMax,
      mean: (globalMin + globalMax) / 2
    };
  }

  var min = globalMax;
  var max = globalMin;
  var sum = 0;

  for (var index = 0; index < numPixels; index++) {
    var spv = storedPixelLuminanceData[index];

    min = Math.min(min, spv);
    max = Math.max(max, spv);
    sum += spv;
  }

  return {
    min: min,
    max: max,
    mean: sum / numPixels
  };
}

/* Erases the toolData and rebinds the handlers when the image changes */
function newImageCallback(e) {
  var eventData = e.detail;
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData && toolData.data) {
    toolData.data = [];
  }

  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseMove', dragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);

  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', dragEndCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', dragEndCallback);

  var mouseData = {
    mouseButtonMask: currentMouseButtonMask
  };

  _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDown', mouseData, mouseDownCallback);
}

/* Applies the windowing procedure when the mouse drag ends */
function dragEndCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseMove', dragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);

  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', dragEndCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', dragEndCallback);

  var mouseData = {
    mouseButtonMask: currentMouseButtonMask
  };

  _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDown', mouseData, mouseDownCallback);

  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  // Update the endpoint as the mouse/touch is dragged
  toolData.data[0].endPoint = {
    x: eventData.currentPoints.image.x,
    y: eventData.currentPoints.image.y
  };

  applyWWWCRegion(eventData);
}

/** Calculates the minimum and maximum value in the given pixel array */
function applyWWWCRegion(eventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var startPoint = toolData.data[0].startPoint;
  var endPoint = toolData.data[0].endPoint;

  // Get the rectangular region defined by the handles
  var width = Math.abs(startPoint.x - endPoint.x);
  var height = Math.abs(startPoint.y - endPoint.y);

  var left = Math.min(startPoint.x, endPoint.x);
  var top = Math.min(startPoint.y, endPoint.y);

  // Bound the rectangle so we don't get undefined pixels
  left = Math.max(left, 0);
  left = Math.min(left, eventData.image.width);
  top = Math.max(top, 0);
  top = Math.min(top, eventData.image.height);
  width = Math.floor(Math.min(width, Math.abs(eventData.image.width - left)));
  height = Math.floor(Math.min(height, Math.abs(eventData.image.height - top)));

  // Get the pixel data in the rectangular region
  var pixelLuminanceData = (0, _getLuminance2.default)(eventData.element, left, top, width, height);

  // Calculate the minimum and maximum pixel values
  var minMaxMean = calculateMinMaxMean(pixelLuminanceData, eventData.image.minPixelValue, eventData.image.maxPixelValue);

  // Adjust the viewport window width and center based on the calculated values
  var config = wwwcRegion.getConfiguration();
  var viewport = cornerstone.getViewport(eventData.element);

  if (config.minWindowWidth === undefined) {
    config.minWindowWidth = 10;
  }

  viewport.voi.windowWidth = Math.max(Math.abs(minMaxMean.max - minMaxMean.min), config.minWindowWidth);
  viewport.voi.windowCenter = minMaxMean.mean;
  cornerstone.setViewport(eventData.element, viewport);

  // Clear the toolData
  toolData.data = [];

  cornerstone.updateImage(eventData.element);
}

function whichMovement(e, eventData) {
  var element = eventData.element;

  _externalModules.external.$(element).off('CornerstoneToolsMouseMove');
  _externalModules.external.$(element).off('CornerstoneToolsMouseDrag');

  _externalModules.external.$(element).on('CornerstoneToolsMouseMove', dragCallback);
  _externalModules.external.$(element).on('CornerstoneToolsMouseDrag', dragCallback);

  _externalModules.external.$(element).on('CornerstoneToolsMouseClick', dragEndCallback);
  if (e.type === 'CornerstoneToolsMouseDrag') {
    _externalModules.external.$(element).on('CornerstoneToolsMouseUp', dragEndCallback);
  }
}

/** Records the start point and attaches the drag event handler */
function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', eventData, whichMovement);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseMove', eventData, whichMovement);

    _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDown', mouseDownCallback);
    recordStartPoint(eventData);

    return false;
  }
}

/** Records the start point of the click or touch */
function recordStartPoint(eventData) {
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (toolData && toolData.data) {
    toolData.data = [];
  }

  var measurementData = {
    startPoint: {
      x: eventData.currentPoints.image.x,
      y: eventData.currentPoints.image.y
    }
  };

  (0, _toolState.addToolState)(eventData.element, toolType, measurementData);
}

/** Draws the rectangular region while the touch or mouse event drag occurs */
function dragCallback(e, eventData) {
  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  // Update the endpoint as the mouse/touch is dragged
  var endPoint = {
    x: eventData.currentPoints.image.x,
    y: eventData.currentPoints.image.y
  };

  toolData.data[0].endPoint = endPoint;
  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function onImageRendered(e) {
  var eventData = e.detail;
  var cornerstone = _externalModules.external.cornerstone;
  var toolData = (0, _toolState.getToolState)(eventData.element, toolType);

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  var startPoint = toolData.data[0].startPoint;
  var endPoint = toolData.data[0].endPoint;

  if (!startPoint || !endPoint) {
    return;
  }

  // Get the current element's canvas
  var canvas = _externalModules.external.$(eventData.element).find('canvas').get(0);
  var context = canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  // Set to the active tool color
  var color = _toolColors2.default.getActiveColor();

  // Calculate the rectangle parameters
  var startPointCanvas = cornerstone.pixelToCanvas(eventData.element, startPoint);
  var endPointCanvas = cornerstone.pixelToCanvas(eventData.element, endPoint);

  var left = Math.min(startPointCanvas.x, endPointCanvas.x);
  var top = Math.min(startPointCanvas.y, endPointCanvas.y);
  var width = Math.abs(startPointCanvas.x - endPointCanvas.x);
  var height = Math.abs(startPointCanvas.y - endPointCanvas.y);

  var lineWidth = _toolStyle2.default.getToolWidth();
  var config = wwwcRegion.getConfiguration();

  // Draw the rectangle
  context.save();

  if (config && config.shadow) {
    context.shadowColor = config.shadowColor || '#000000';
    context.shadowOffsetX = config.shadowOffsetX || 1;
    context.shadowOffsetY = config.shadowOffsetY || 1;
  }

  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.rect(left, top, width, height);
  context.stroke();

  context.restore();
}

// --- Mouse tool enable / disable --- ///
function disable(element) {
  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);

  _externalModules.external.$(element).off('CornerstoneToolsMouseUp', dragEndCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseClick', dragEndCallback);

  _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', dragCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseMove', dragCallback);

  element.removeEventListener('cornerstoneimagerendered', onImageRendered);
  element.removeEventListener('cornerstonenewimage', newImageCallback);

  _externalModules.external.cornerstone.updateImage(element);
}

function activate(element, mouseButtonMask) {
  var eventData = {
    mouseButtonMask: mouseButtonMask
  };

  currentMouseButtonMask = mouseButtonMask;

  var toolData = (0, _toolState.getToolState)(element, toolType);

  if (!toolData) {
    var data = [];

    (0, _toolState.addToolState)(element, toolType, data);
  }

  _externalModules.external.$(element).off('CornerstoneToolsMouseDown', mouseDownCallback);

  _externalModules.external.$(element).off('CornerstoneToolsMouseUp', dragEndCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseClick', dragEndCallback);

  _externalModules.external.$(element).off('CornerstoneToolsMouseDrag', dragCallback);
  _externalModules.external.$(element).off('CornerstoneToolsMouseMove', dragCallback);

  element.removeEventListener('cornerstoneimagerendered', onImageRendered);
  element.removeEventListener('cornerstonenewimage', newImageCallback);

  _externalModules.external.$(element).on('CornerstoneToolsMouseDown', eventData, mouseDownCallback);
  element.addEventListener('cornerstoneimagerendered', onImageRendered);

  // If the displayed image changes after the user has started clicking, we should
  // Cancel the handlers and prepare for another click
  element.addEventListener('cornerstonenewimage', newImageCallback);

  _externalModules.external.cornerstone.updateImage(element);
}

// --- Touch tool enable / disable --- //
function disableTouchDrag(element) {
  _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', dragCallback);
  _externalModules.external.$(element).off('CornerstoneToolsTouchStart', recordStartPoint);
  _externalModules.external.$(element).off('CornerstoneToolsDragEnd', applyWWWCRegion);
  element.removeEventListener('cornerstoneimagerendered', onImageRendered);
}

function activateTouchDrag(element) {
  var toolData = (0, _toolState.getToolState)(element, toolType);

  if (!toolData) {
    var data = [];

    (0, _toolState.addToolState)(element, toolType, data);
  }

  _externalModules.external.$(element).off('CornerstoneToolsTouchDrag', dragCallback);
  _externalModules.external.$(element).off('CornerstoneToolsTouchStart', recordStartPoint);
  _externalModules.external.$(element).off('CornerstoneToolsDragEnd', applyWWWCRegion);
  element.removeEventListener('cornerstoneimagerendered', onImageRendered);

  _externalModules.external.$(element).on('CornerstoneToolsTouchDrag', dragCallback);
  _externalModules.external.$(element).on('CornerstoneToolsTouchStart', recordStartPoint);
  _externalModules.external.$(element).on('CornerstoneToolsDragEnd', applyWWWCRegion);
  element.addEventListener('cornerstoneimagerendered', onImageRendered);
}

function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;
}

// Module exports
var wwwcRegion = {
  activate: activate,
  deactivate: disable,
  disable: disable,
  setConfiguration: setConfiguration,
  getConfiguration: getConfiguration
};

var wwwcRegionTouch = {
  activate: activateTouchDrag,
  deactivate: disableTouchDrag,
  disable: disableTouchDrag
};

exports.wwwcRegion = wwwcRegion;
exports.wwwcRegionTouch = wwwcRegionTouch;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoomTouchDrag = exports.zoomTouchPinch = exports.zoomWheel = exports.zoom = undefined;

var _externalModules = __webpack_require__(0);

var _simpleMouseButtonTool = __webpack_require__(13);

var _simpleMouseButtonTool2 = _interopRequireDefault(_simpleMouseButtonTool);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _mouseWheelTool = __webpack_require__(21);

var _mouseWheelTool2 = _interopRequireDefault(_mouseWheelTool);

var _touchPinchTool = __webpack_require__(57);

var _touchPinchTool2 = _interopRequireDefault(_touchPinchTool);

var _touchDragTool = __webpack_require__(11);

var _touchDragTool2 = _interopRequireDefault(_touchDragTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startPoints = void 0;

function changeViewportScale(viewport, ticks) {
  var config = zoom.getConfiguration();
  var pow = 1.7;

  var oldFactor = Math.log(viewport.scale) / Math.log(pow);
  var factor = oldFactor + ticks;

  var scale = Math.pow(pow, factor);

  if (config.maxScale && scale > config.maxScale) {
    viewport.scale = config.maxScale;
  } else if (config.minScale && scale < config.minScale) {
    viewport.scale = config.minScale;
  } else {
    viewport.scale = scale;
  }

  return viewport;
}

function boundPosition(position, width, height) {
  position.x = Math.max(position.x, 0);
  position.y = Math.max(position.y, 0);
  position.x = Math.min(position.x, width);
  position.y = Math.min(position.y, height);

  return position;
}

function correctShift(shift, viewport) {
  // Apply Flips
  if (viewport.hflip) {
    shift.x *= -1;
  }

  if (viewport.vflip) {
    shift.y *= -1;
  }

  // Apply rotations
  if (viewport.rotation !== 0) {
    var angle = viewport.rotation * Math.PI / 180;

    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);

    var newX = shift.x * cosA - shift.y * sinA;
    var newY = shift.x * sinA + shift.y * cosA;

    shift.x = newX;
    shift.y = newY;
  }

  return shift;
}

function defaultStrategy(eventData, ticks) {
  var cornerstone = _externalModules.external.cornerstone;
  var element = eventData.element;

  // Calculate the new scale factor based on how far the mouse has changed
  var viewport = changeViewportScale(eventData.viewport, ticks);

  cornerstone.setViewport(element, viewport);

  // Now that the scale has been updated, determine the offset we need to apply to the center so we can
  // Keep the original start location in the same position
  var newCoords = cornerstone.pageToPixel(element, eventData.startPoints.page.x, eventData.startPoints.page.y);

  // The shift we will use is the difference between the original image coordinates of the point we've selected
  // And the image coordinates of the same point on the page after the viewport scaling above has been performed
  // This shift is in image coordinates, and is designed to keep the target location fixed on the page.
  var shift = {
    x: eventData.startPoints.image.x - newCoords.x,
    y: eventData.startPoints.image.y - newCoords.y
  };

  // Correct the required shift using the viewport rotation and flip parameters
  shift = correctShift(shift, viewport);

  // Apply the shift to the Viewport's translation setting
  viewport.translation.x -= shift.x;
  viewport.translation.y -= shift.y;

  // Update the Viewport with the new translation value
  cornerstone.setViewport(element, viewport);
}

function translateStrategy(eventData, ticks) {
  var element = eventData.element;
  var image = eventData.image;
  var config = zoom.getConfiguration();

  // Calculate the new scale factor based on how far the mouse has changed
  // Note that in this case we don't need to update the viewport after the initial
  // Zoom step since we aren't don't intend to keep the target position static on
  // The page
  var viewport = changeViewportScale(eventData.viewport, ticks);

  // Define the default shift to take place during this zoom step
  var shift = {
    x: 0,
    y: 0
  };

  // Define the parameters for the translate strategy
  var translateSpeed = 8;
  var outwardsMinScaleToTranslate = 3;
  var minTranslation = 0.01;

  if (ticks < 0) {
    // Zoom outwards from the image center
    if (viewport.scale < outwardsMinScaleToTranslate) {
      // If the current translation is smaller than the minimum desired translation,
      // Set the translation to zero
      if (Math.abs(viewport.translation.x) < minTranslation) {
        viewport.translation.x = 0;
      } else {
        shift.x = viewport.translation.x / translateSpeed;
      }

      // If the current translation is smaller than the minimum desired translation,
      // Set the translation to zero
      if (Math.abs(viewport.translation.y) < minTranslation) {
        viewport.translation.y = 0;
      } else {
        shift.y = viewport.translation.y / translateSpeed;
      }
    }
  } else {
    // Zoom inwards to the current image point

    // Identify the coordinates of the point the user is trying to zoom into
    // If we are not allowed to zoom outside the image, bound the user-selected position to
    // A point inside the image
    if (config && config.preventZoomOutsideImage) {
      startPoints.image = boundPosition(startPoints.image, image.width, image.height);
    }

    // Calculate the translation value that would place the desired image point in the center
    // Of the viewport
    var desiredTranslation = {
      x: image.width / 2 - startPoints.image.x,
      y: image.height / 2 - startPoints.image.y
    };

    // Correct the target location using the viewport rotation and flip parameters
    desiredTranslation = correctShift(desiredTranslation, viewport);

    // Calculate the difference between the current viewport translation value and the
    // Final desired translation values
    var distanceToDesired = {
      x: viewport.translation.x - desiredTranslation.x,
      y: viewport.translation.y - desiredTranslation.y
    };

    // If the current translation is smaller than the minimum desired translation,
    // Stop translating in the x-direction
    if (Math.abs(distanceToDesired.x) < minTranslation) {
      viewport.translation.x = desiredTranslation.x;
    } else {
      // Otherwise, shift the viewport by one step
      shift.x = distanceToDesired.x / translateSpeed;
    }

    // If the current translation is smaller than the minimum desired translation,
    // Stop translating in the y-direction
    if (Math.abs(distanceToDesired.y) < minTranslation) {
      viewport.translation.y = desiredTranslation.y;
    } else {
      // Otherwise, shift the viewport by one step
      shift.y = distanceToDesired.y / translateSpeed;
    }
  }

  // Apply the shift to the Viewport's translation setting
  viewport.translation.x -= shift.x;
  viewport.translation.y -= shift.y;

  // Update the Viewport with the new translation value
  _externalModules.external.cornerstone.setViewport(element, viewport);
}

function zoomToCenterStrategy(eventData, ticks) {
  var element = eventData.element;

  // Calculate the new scale factor based on how far the mouse has changed
  var viewport = changeViewportScale(eventData.viewport, ticks);

  _externalModules.external.cornerstone.setViewport(element, viewport);
}

function mouseUpCallback(e, eventData) {
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
  _externalModules.external.$(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    startPoints = eventData.startPoints; // Used for translateStrategy
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseDrag', dragCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
    _externalModules.external.$(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);

    return false; // False = cases jquery to preventDefault() and stopPropagation() this event
  }
}

function dragCallback(e, eventData) {
  if (!eventData.deltaPoints.page.y) {
    return false;
  }

  var ticks = eventData.deltaPoints.page.y / 100;

  zoom.strategy(eventData, ticks);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

function mouseWheelCallback(e, eventData) {
  var ticks = -eventData.direction / 4;

  // Allow inversion of the mouse wheel scroll via a configuration option
  var config = zoom.getConfiguration();

  if (config && config.invert) {
    ticks *= -1;
  }

  var viewport = changeViewportScale(eventData.viewport, ticks);

  _externalModules.external.cornerstone.setViewport(eventData.element, viewport);
}

function touchPinchCallback(e, eventData) {
  var cornerstone = _externalModules.external.cornerstone;
  var config = zoom.getConfiguration();
  var viewport = eventData.viewport;
  var element = eventData.element;

  // Change the scale based on the pinch gesture's scale change
  viewport.scale += eventData.scaleChange * viewport.scale;
  if (config.maxScale && viewport.scale > config.maxScale) {
    viewport.scale = config.maxScale;
  } else if (config.minScale && viewport.scale < config.minScale) {
    viewport.scale = config.minScale;
  }

  cornerstone.setViewport(element, viewport);

  // Now that the scale has been updated, determine the offset we need to apply to the center so we can
  // Keep the original start location in the same position
  var newCoords = cornerstone.pageToPixel(element, eventData.startPoints.page.x, eventData.startPoints.page.y);
  var shift = {
    x: eventData.startPoints.image.x - newCoords.x,
    y: eventData.startPoints.image.y - newCoords.y
  };

  shift = correctShift(shift, viewport);
  viewport.translation.x -= shift.x;
  viewport.translation.y -= shift.y;
  cornerstone.setViewport(element, viewport);
}

var zoom = (0, _simpleMouseButtonTool2.default)(mouseDownCallback);

zoom.strategies = {
  default: defaultStrategy,
  translate: translateStrategy,
  zoomToCenter: zoomToCenterStrategy
};

zoom.strategy = defaultStrategy;

var zoomWheel = (0, _mouseWheelTool2.default)(mouseWheelCallback);
var zoomTouchPinch = (0, _touchPinchTool2.default)(touchPinchCallback);
var zoomTouchDrag = (0, _touchDragTool2.default)(dragCallback);

exports.zoom = zoom;
exports.zoomWheel = zoomWheel;
exports.zoomTouchPinch = zoomTouchPinch;
exports.zoomTouchDrag = zoomTouchDrag;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.brush = undefined;

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _brushTool = __webpack_require__(58);

var _brushTool2 = _interopRequireDefault(_brushTool);

var _getCircle = __webpack_require__(59);

var _getCircle2 = _interopRequireDefault(_getCircle);

var _drawBrush = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module is for creating segmentation overlays
var TOOL_STATE_TOOL_TYPE = 'brush';
var toolType = 'brush';
var configuration = {
  draw: 1,
  radius: 3,
  hoverColor: 'green',
  dragColor: 'yellow'
};

var lastImageCoords = void 0;
var dragging = false;

function paint(eventData) {
  var configuration = brush.getConfiguration();
  var element = eventData.element;
  var layer = _externalModules.external.cornerstone.getLayer(element, configuration.brushLayerId);
  var _layer$image = layer.image,
      rows = _layer$image.rows,
      columns = _layer$image.columns;
  var _eventData$currentPoi = eventData.currentPoints.image,
      x = _eventData$currentPoi.x,
      y = _eventData$currentPoi.y;

  var toolData = (0, _toolState.getToolState)(element, TOOL_STATE_TOOL_TYPE);
  var pixelData = toolData.data[0].pixelData;
  var brushPixelValue = configuration.draw;
  var radius = configuration.radius;

  if (x < 0 || x > columns || y < 0 || y > rows) {
    return;
  }

  var pointerArray = (0, _getCircle2.default)(radius, rows, columns, x, y);

  (0, _drawBrush.drawBrushPixels)(pointerArray, pixelData, brushPixelValue, columns);

  layer.invalid = true;

  _externalModules.external.cornerstone.updateImage(element);
}

function onMouseUp(e, eventData) {
  lastImageCoords = eventData.currentPoints.image;
  dragging = false;
}

function onMouseDown(e, eventData) {
  paint(eventData);
  dragging = true;
  lastImageCoords = eventData.currentPoints.image;
}

function onMouseMove(e, eventData) {
  lastImageCoords = eventData.currentPoints.image;
  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function onDrag(e, eventData) {
  paint(eventData);
  dragging = true;
  lastImageCoords = eventData.currentPoints.image;
}

function onImageRendered(e, eventData) {
  if (!lastImageCoords) {
    return;
  }

  var _eventData$image = eventData.image,
      rows = _eventData$image.rows,
      columns = _eventData$image.columns;
  var _lastImageCoords = lastImageCoords,
      x = _lastImageCoords.x,
      y = _lastImageCoords.y;


  if (x < 0 || x > columns || y < 0 || y > rows) {
    return;
  }

  // Draw the hover overlay on top of the pixel data
  var configuration = brush.getConfiguration();
  var radius = configuration.radius;
  var context = eventData.canvasContext;
  var color = dragging ? configuration.dragColor : configuration.hoverColor;
  var element = eventData.element;

  context.setTransform(1, 0, 0, 1, 0, 0);
  var pointerArray = (0, _getCircle2.default)(radius, rows, columns, x, y);

  (0, _drawBrush.drawBrushOnCanvas)(pointerArray, context, color, element);
}

var brush = (0, _brushTool2.default)({
  onMouseMove: onMouseMove,
  onMouseDown: onMouseDown,
  onMouseUp: onMouseUp,
  onDrag: onDrag,
  toolType: toolType,
  onImageRendered: onImageRendered
});

brush.setConfiguration(configuration);

exports.brush = brush;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptiveBrush = undefined;

var _externalModules = __webpack_require__(0);

var _toolState = __webpack_require__(1);

var _brushTool = __webpack_require__(58);

var _brushTool2 = _interopRequireDefault(_brushTool);

var _getCircle = __webpack_require__(59);

var _getCircle2 = _interopRequireDefault(_getCircle);

var _drawBrush = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module is for creating segmentation overlays
var TOOL_STATE_TOOL_TYPE = 'brush';
var toolType = 'adaptiveBrush';
var configuration = {
  draw: 1,
  radius: 3,
  tolerance: 5,
  minRadius: 1,
  hoverColor: 'green',
  dragColor: 'yellow'
};

var lastImageCoords = void 0;
var thrMax = void 0;
var thrMin = void 0;
var currentRadius = void 0;
var dragging = void 0;

function getGreyValues(pointerArray, pixelData, imageColumns) {
  var configuration = adaptiveBrush.getConfiguration();
  var tolerance = configuration.tolerance;
  var minValue = Number.MAX_VALUE;
  var maxValue = -Number.MAX_VALUE;

  pointerArray.forEach(function (point) {
    var pixelIndex = point[1] * imageColumns + point[0];
    var greyValue = pixelData[pixelIndex];

    minValue = Math.min(greyValue, minValue);
    maxValue = Math.max(greyValue, maxValue);
  });

  thrMin = minValue - tolerance;
  thrMax = maxValue + tolerance;
}

// Draws the pointer with overlap calculation - Used on mouse clicked
function paintAdaptiveBrush(imagePixelData, brushPixelData, rows, columns) {
  var configuration = adaptiveBrush.getConfiguration();
  var brushPixelValue = configuration.draw;
  var mouseX = Math.round(lastImageCoords.x);
  var mouseY = Math.round(lastImageCoords.y);
  var numPixelsOutsideThresholdWindow = null;
  var pointerArray = [];
  var radius = configuration.radius;

  /*
   * Find pixels within the brush area. If within the brush area there are pixels outside the threshold min / max,
   * decrease the brush radius until there are no sub/supra threshold pixels left (or until you reach the minimum radius).
   */
  while (numPixelsOutsideThresholdWindow !== 0 && radius > configuration.minRadius) {
    numPixelsOutsideThresholdWindow = 0;
    pointerArray = (0, _getCircle2.default)(radius, rows, columns, mouseX, mouseY);

    // Loop through each of the relative pixel coordinates for the brush
    for (var j = 0; j < pointerArray.length; j++) {
      // Calculate the x / y image coordinates using the brush and the current mouse position
      var xCoord = pointerArray[j][0];
      var yCoord = pointerArray[j][1];

      // Otherwise, retrieve the image pixel value in this location
      var pixelIndex = yCoord * columns + xCoord;
      var pixelValue = imagePixelData[pixelIndex];

      /*
        If the image pixel value is outside of the thresholds,
        increase the numPixelsOutsideThresholdWindow counter
      */
      if (pixelValue > thrMax || pixelValue < thrMin) {
        numPixelsOutsideThresholdWindow++;
        break;
      }
    }

    radius--;
  }

  if (numPixelsOutsideThresholdWindow === 0) {
    (0, _drawBrush.drawBrushPixels)(pointerArray, brushPixelData, brushPixelValue, columns);
  }

  return radius;
}

function paint(eventData) {
  var configuration = adaptiveBrush.getConfiguration();
  var element = eventData.element;
  var layer = _externalModules.external.cornerstone.getLayer(element, configuration.brushLayerId);
  var baseLayer = _externalModules.external.cornerstone.getLayers(element)[0];
  var _layer$image = layer.image,
      rows = _layer$image.rows,
      columns = _layer$image.columns;

  var toolData = (0, _toolState.getToolState)(element, TOOL_STATE_TOOL_TYPE);
  var brushData = toolData.data[0];

  currentRadius = paintAdaptiveBrush(baseLayer.image.getPixelData(), brushData.pixelData, rows, columns);
  layer.invalid = true;

  _externalModules.external.cornerstone.updateImage(element);
}

function erase(eventData) {
  var configuration = adaptiveBrush.getConfiguration();
  var element = eventData.element;
  var layer = _externalModules.external.cornerstone.getLayer(element, configuration.brushLayerId);
  var _layer$image2 = layer.image,
      rows = _layer$image2.rows,
      columns = _layer$image2.columns;
  var _eventData$currentPoi = eventData.currentPoints.image,
      x = _eventData$currentPoi.x,
      y = _eventData$currentPoi.y;

  var toolData = (0, _toolState.getToolState)(element, TOOL_STATE_TOOL_TYPE);
  var pixelData = toolData.data[0].pixelData;
  var brushPixelValue = configuration.draw;
  var radius = configuration.radius;

  if (x < 0 || x > columns || y < 0 || y > rows) {
    return;
  }

  var pointerArray = (0, _getCircle2.default)(radius, rows, columns, x, y);

  (0, _drawBrush.drawBrushPixels)(pointerArray, pixelData, brushPixelValue, columns);

  layer.invalid = true;

  _externalModules.external.cornerstone.updateImage(element);
}

function onMouseUp(e, eventData) {
  lastImageCoords = eventData.currentPoints.image;
  var configuration = adaptiveBrush.getConfiguration();

  dragging = false;
  currentRadius = configuration.radius;
  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function onMouseDown(e, eventData) {
  var element = eventData.element;
  var configuration = adaptiveBrush.getConfiguration();
  var layer = _externalModules.external.cornerstone.getLayer(element, configuration.brushLayerId);
  var baseLayer = _externalModules.external.cornerstone.getLayers(element)[0];
  var _eventData$currentPoi2 = eventData.currentPoints.image,
      x = _eventData$currentPoi2.x,
      y = _eventData$currentPoi2.y;
  var _layer$image3 = layer.image,
      rows = _layer$image3.rows,
      columns = _layer$image3.columns;

  var pointerArray = (0, _getCircle2.default)(configuration.radius, rows, columns, x, y);

  if (configuration.draw === 0) {
    erase(eventData);
  } else {
    getGreyValues(pointerArray, baseLayer.image.getPixelData(), columns);
    paint(eventData);
  }

  dragging = true;
  lastImageCoords = eventData.currentPoints.image;
}

function onMouseMove(e, eventData) {
  lastImageCoords = eventData.currentPoints.image;
  _externalModules.external.cornerstone.updateImage(eventData.element);
}

function onDrag(e, eventData) {
  if (configuration.draw === 0) {
    erase(eventData);
  } else {
    paint(eventData);
  }

  dragging = true;
  lastImageCoords = eventData.currentPoints.image;
}

function onImageRendered(e, eventData) {
  if (!lastImageCoords) {
    return;
  }

  var _eventData$image = eventData.image,
      rows = _eventData$image.rows,
      columns = _eventData$image.columns;
  var _lastImageCoords = lastImageCoords,
      x = _lastImageCoords.x,
      y = _lastImageCoords.y;


  if (x < 0 || x > columns || y < 0 || y > rows) {
    return;
  }

  // Draw the hover overlay on top of the pixel data
  var configuration = adaptiveBrush.getConfiguration();
  var context = eventData.canvasContext;
  var color = dragging ? configuration.dragColor : configuration.hoverColor;
  var element = eventData.element;

  currentRadius = currentRadius || configuration.radius;

  context.setTransform(1, 0, 0, 1, 0, 0);

  var pointerArray = (0, _getCircle2.default)(currentRadius, rows, columns, x, y);

  (0, _drawBrush.drawBrushOnCanvas)(pointerArray, context, color, element);
}

var adaptiveBrush = (0, _brushTool2.default)({
  onMouseMove: onMouseMove,
  onMouseDown: onMouseDown,
  onMouseUp: onMouseUp,
  onDrag: onDrag,
  toolType: toolType,
  onImageRendered: onImageRendered
});

adaptiveBrush.setConfiguration(configuration);

exports.adaptiveBrush = adaptiveBrush;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _thresholding = __webpack_require__(26);

Object.defineProperty(exports, 'regionsThreshold', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_thresholding).default;
  }
});

var _grow = __webpack_require__(122);

Object.defineProperty(exports, 'regionsGrow', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_grow).default;
  }
});

var _draw = __webpack_require__(123);

Object.defineProperty(exports, 'regionsDraw', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_draw).default;
  }
});

var _score = __webpack_require__(124);

Object.defineProperty(exports, 'regionsScore', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_score).default;
  }
});

var _undo = __webpack_require__(125);

Object.defineProperty(exports, 'regionsUndo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_undo).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _cornerstoneCore = __webpack_require__(19);

var cornerstone = _interopRequireWildcard(_cornerstoneCore);

var _toolState = __webpack_require__(1);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _thresholding = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// UNUSED const toolType = 'regionsGrow';

// Get neighbour linear indices within slice bounds
function linearNeighbours(width, height, highSlice, lowSlice, index) {
  var sliceSize = width * height;
  var neighbours = [index - 1, index + 1, index - width, index + width];

  // Stay within bounds
  var sliceIndex = Math.floor(index / sliceSize);

  if (sliceIndex < highSlice) {
    neighbours.push(index + sliceSize);
  }
  if (sliceIndex > lowSlice) {
    neighbours.push(index - sliceSize);
  }

  return neighbours;
}

function regionGrowing(element, regions, slices, point) {
  return new Promise(function (resolve) {
    var _getConfiguration = (0, _thresholding.getConfiguration)(),
        growIterationsPerChunk = _getConfiguration.growIterationsPerChunk,
        toolRegionValue = _getConfiguration.toolRegionValue,
        layersAbove = _getConfiguration.layersAbove,
        layersBelow = _getConfiguration.layersBelow;

    var width = regions.width,
        height = regions.height,
        buffer = regions.buffer;

    var _point = _slicedToArray(point, 3),
        x = _point[0],
        y = _point[1],
        slice = _point[2];

    var highSlice = slice + layersBelow;
    var lowSlice = slice - layersAbove;

    var view = new Uint8Array(buffer);

    // Calculate linear indices and offsets
    var sliceSize = width * height;
    var sliceOffset = sliceSize * slice;
    var clickIndex = y * width + x;
    var linearIndex = sliceOffset + clickIndex;
    var fromValue = view[linearIndex];

    // Only continue if we clicked in thresholded area in different color
    if (fromValue === 0 || fromValue === toolRegionValue) {
      return;
    }

    // Growing starts at clicked voxel
    var activeVoxels = [linearIndex];

    function chunk() {
      for (var i = 0; i < growIterationsPerChunk; i++) {
        // While activeVoxels is not empty
        if (activeVoxels.length === 0) {
          return resolve();
        }

        // Set the active voxels to nextValue
        activeVoxels.forEach(function (i) {
          view[i] = toolRegionValue;
        });

        // The new active voxels are neighbours of curent active voxels
        var nextVoxels = activeVoxels.map(function (i) {
          return linearNeighbours(width, height, highSlice, lowSlice, i);
        }).reduce( // Flatten the array of arrays to array of indices
        function (acc, cur) {
          return acc.concat(cur);
        }, []).filter( // Remove duplicates
        function (value, index, self) {
          return self.indexOf(value) === index;
        }).filter( // Remove voxels that does not have the correct fromValue
        function (i) {
          return view[i] === fromValue;
        });

        activeVoxels = nextVoxels;
      }
      cornerstone.updateImage(element);
      setTimeout(chunk, 0);
    }

    chunk();
  });
}

function onMouseDown(e, eventData) {
  var element = eventData.element;


  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    (0, _thresholding.createUndoStep)(element);

    var _getToolState$data = _slicedToArray((0, _toolState.getToolState)(element, 'stack').data, 1),
        stackData = _getToolState$data[0];

    var _getToolState$data2 = _slicedToArray((0, _toolState.getToolState)(element, 'regions').data, 1),
        regionsData = _getToolState$data2[0];

    var currentImageIdIndex = stackData.currentImageIdIndex,
        imageIds = stackData.imageIds;
    var _eventData$currentPoi = eventData.currentPoints.image,
        x = _eventData$currentPoi.x,
        y = _eventData$currentPoi.y;


    var point = [Math.round(x), Math.round(y), currentImageIdIndex];

    regionGrowing(element, regionsData, imageIds.length, point);
  }
}

function enable(element, mouseButtonMask) {
  var stackData = (0, _toolState.getToolState)(element, 'stack');
  var regionsData = (0, _toolState.getToolState)(element, 'regions');

  // First check that there is stack/regions data available
  if (!stackData || !stackData.data || !stackData.data.length || !regionsData || !regionsData.data || !regionsData.data.length) {
    return;
  }

  element.addEventListener('CornerstoneToolsMouseDown', { mouseButtonMask: mouseButtonMask }, onMouseDown);
}

function disable(element) {
  element.removeEventListener('CornerstoneToolsMouseDown', onMouseDown);
}

exports.default = {
  enable: enable,
  disable: disable,
  activate: enable,
  deactivate: disable
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getConfiguration = getConfiguration;
exports.setConfiguration = setConfiguration;

var _cornerstoneCore = __webpack_require__(19);

var cornerstone = _interopRequireWildcard(_cornerstoneCore);

var _toolState = __webpack_require__(1);

var _isMouseButtonEnabled = __webpack_require__(2);

var _isMouseButtonEnabled2 = _interopRequireDefault(_isMouseButtonEnabled);

var _thresholding = __webpack_require__(26);

var regionsThreshold = _interopRequireWildcard(_thresholding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var toolType = 'drawing';

var configuration = {
  snap: false // snap to thresholded region or not
};

// Determine if a point is inside a polygon
function isInside(point, vs) {
  var _point = _slicedToArray(point, 2),
      x = _point[0],
      y = _point[1];

  var inside = false;

  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var _vs$i = _slicedToArray(vs[i], 2),
        xi = _vs$i[0],
        yi = _vs$i[1];

    var _vs$j = _slicedToArray(vs[j], 2),
        xj = _vs$j[0],
        yj = _vs$j[1];

    var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

// Draw regions on the canvas
function onImageRendered(e, eventData) {
  var canvasContext = eventData.canvasContext,
      enabledElement = eventData.enabledElement,
      element = eventData.element;

  // Set the canvas context to the image coordinate system

  cornerstone.setToPixelCoordinateSystem(enabledElement, canvasContext);

  // Points
  var drawingData = (0, _toolState.getToolState)(element, toolType);
  var context = eventData.canvasContext;
  var points = drawingData.data[0].points;

  if (points.length < 2) {
    return;
  }

  var first = points[0];
  var xFirst = first[0];
  var yFirst = first[1];

  context.fillStyle = 'rgba(255,255,255,.2)';
  context.strokeStyle = 'white';
  context.beginPath();
  context.moveTo(xFirst, yFirst);
  points.slice(1).forEach(function (point) {
    context.lineTo(point[0], point[1]);
  });
  context.closePath();
  context.stroke();
  context.fill();
}

function updateRegions(element) {
  var _regionsThreshold$get = regionsThreshold.getConfiguration(),
      toolRegionValue = _regionsThreshold$get.toolRegionValue,
      layersAbove = _regionsThreshold$get.layersAbove,
      layersBelow = _regionsThreshold$get.layersBelow;

  regionsThreshold.createUndoStep(element);

  // Get tool data
  var stackData = (0, _toolState.getToolState)(element, 'stack');
  var thresholdingData = (0, _toolState.getToolState)(element, 'regions');
  var drawingData = (0, _toolState.getToolState)(element, toolType);

  // Extract tool data
  var slice = stackData.data[0].currentImageIdIndex;
  var numSlices = stackData.data[0].imageIds.length;
  var regions = thresholdingData.data[0];
  var points = drawingData.data[0].points;

  // Extract region data
  var buffer = regions.buffer;
  var width = regions.width;
  var height = regions.height;

  // Find operation bounds
  var startSlice = Math.max(0, slice - layersAbove);
  var endSlice = Math.min(numSlices, slice + layersBelow);

  // Setup view into buffer
  var sliceSize = width * height;
  var sliceOffset = startSlice * sliceSize;
  var view = new Uint8Array(buffer, sliceOffset);

  // Mark points inside
  for (var dslice = 0; dslice <= endSlice - startSlice; dslice += 1) {
    for (var x = 0; x < width; x += 1) {
      for (var y = 0; y < height; y += 1) {
        var index = x + y * width + dslice * sliceSize;
        var prevValue = view[index];

        var snapBool = void 0;
        if (configuration.snap) {
          snapBool = prevValue > 0;
        } else {
          snapBool = true;
        }
        if (snapBool && isInside([x, y], points)) {
          view[index] = toolRegionValue;
        }
      }
    }
  }
}

// Disable drawing and tracking on mouse up also update regions
function mouseUpCallback(e, eventData) {
  eventData.element.removeEventListener('CornerstoneToolsMouseDrag', mouseDragCallback);
  eventData.element.removeEventListener('CornerstoneToolsMouseUp', mouseUpCallback);
  eventData.element.removeEventListener('CornerstoneImageRendered', onImageRendered);
  updateRegions(eventData.element);
  cornerstone.updateImage(eventData.element);
}

function mouseDownCallback(e, eventData) {
  if ((0, _isMouseButtonEnabled2.default)(eventData.which, e.data.mouseButtonMask)) {
    var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

    toolData.data[0].points = [];

    eventData.element.addEventListener('CornerstoneToolsMouseDrag', mouseDragCallback);
    eventData.element.addEventListener('CornerstoneToolsMouseUp', mouseUpCallback);
    eventData.element.addEventListener('CornerstoneImageRendered', onImageRendered);

    return mouseDragCallback(e, eventData);
  }
}

function mouseDragCallback(e, eventData) {
  e.stopImmediatePropagation(); // Prevent CornerstoneToolsTouchStartActive from killing any press events

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (!toolData) {
    return;
  }

  var point = eventData.currentPoints.image;

  toolData.data[0].points.push([point.x, point.y]);

  cornerstone.updateImage(eventData.element);

  return false; // False = causes jquery to preventDefault() and stopPropagation() this event
}

function enable(element, mouseButtonMask) {
  var eventData = {
    mouseButtonMask: mouseButtonMask
  };

  // Clear any currently existing toolData
  (0, _toolState.clearToolState)(element, toolType);

  (0, _toolState.addToolState)(element, toolType, {
    points: []
  });

  element.removeEventListener('CornerstoneToolsMouseDown', mouseDownCallback);
  element.addEventListener('CornerstoneToolsMouseDown', eventData, mouseDownCallback);
}

function disable(element) {
  element.removeEventListener('CornerstoneToolsMouseDown', mouseDownCallback);
}

function getConfiguration() {
  return configuration;
}

function setConfiguration(config) {
  configuration = config;
}

// Module/private exports

exports.default = {
  enable: enable,
  disable: disable,
  activate: enable,
  deactivate: disable,
  getConfiguration: getConfiguration,
  setConfiguration: setConfiguration
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.score = score;

var _cornerstoneCore = __webpack_require__(19);

var cornerstone = _interopRequireWildcard(_cornerstoneCore);

var _thresholding = __webpack_require__(26);

var _toolState = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getDensityFactor(hu) {
  if (hu < 200) {
    return 1;
  } else if (hu < 300) {
    return 2;
  } else if (hu < 400) {
    return 3;
  }
  return 4;
}

// Finds the value with the most occurrences in array
// Should be O(n)
function mode(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
      maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

function score() {
  console.log("SCORE");
  var element = (0, _thresholding.getLastElement)();
  var thresholdingData = (0, _toolState.getToolState)(element, 'regions');
  var stackData = (0, _toolState.getToolState)(element, 'stack');
  var imageIds = stackData.data[0].imageIds;

  var _getConfiguration = (0, _thresholding.getConfiguration)(),
      regionColorsRGB = _getConfiguration.regionColorsRGB,
      kvpToMultiplier = _getConfiguration.kvpToMultiplier;

  // Extract and group region-voxels


  var voxelsEachRegion = regionColorsRGB.slice(1).map(function () {
    return [];
  });
  var maxHUEachRegion = regionColorsRGB.slice(1).map(function () {
    return -Infinity;
  });

  var regionBuffer = thresholdingData.data[0].buffer;
  var view = new Uint8Array(regionBuffer);

  var zLength = void 0;
  var xLength = void 0;
  var yLength = void 0;
  var voxelSize = void 0;
  var kvpMultiplier = void 0;
  var prevSliceLocation = void 0;
  var overlapFactor = void 0;
  var modeOverlapFactor = void 0;
  var overlapFactors = [];

  var promises = imageIds.map(function (imageId, imageIndex) {
    return cornerstone.loadImage(imageId).then(function (image) {
      var dataSet = image.data;
      var sliceLocation = dataSet.floatString('x00201041');
      // TODO: use these as attributes instead of the ones from Viewers
      // Test that it is indeed the same values    const sliceThickness = dataSet.floatString('x00180050');
      var sliceThickness = dataSet.floatString('x00180050');
      var pixelSpacing = dataSet.string('x00280030').split('\\').map(parseFloat);
      var kVP = dataSet.floatString('x00180060');
      var rescaleSlope = dataSet.floatString('x00281053');
      var rescaleIntercept = dataSet.floatString('x00281052');

      // Ca score is compute with slice thickness of 3 mm (jvf. mail from Axel)
      zLength = sliceThickness / 3;
      xLength = pixelSpacing[0];
      yLength = pixelSpacing[1];
      voxelSize = zLength * xLength * yLength; // In mm
      kvpMultiplier = kvpToMultiplier[kVP];
      // TODO: display these in application before score calculation
      // const scanLocation = dataSet.string('x00080080');
      // const patientId = dataSet.string('x00100020');
      // const patientBirthDate = dataSet.string('x00100030');
      // const studyDate = dataSet.string('x00080020');

      // If you want to see all the metadata on image
      // for (let property in dataSet.elements) {
      //   if (dataSet.elements.hasOwnProperty(property)) {
      //     console.log(property.toString() + ': ' + dataSet.string(property.toString()))
      //   }
      // }
      // const collimation = dataSet.floatString('x00189307')
      // console.log('collimation: ', collimation)

      if (prevSliceLocation) {
        var absPrevLocation = Math.abs(prevSliceLocation);
        var absCurrentLocation = Math.abs(sliceLocation);
        var overlap = absPrevLocation > absCurrentLocation ? absPrevLocation - absCurrentLocation : absCurrentLocation - absPrevLocation;
        // console.log(absPrevLocation)
        // console.log("overlap", overlap)
        // console.log("sliceThickness", sliceThickness)
        // overlapFactor = overlap <= 3 ? (3 - overlap) / 3 : 1;
        overlapFactor = overlap < sliceThickness ? (sliceThickness - overlap) / sliceThickness : 1;
        // console.log(overlapFactor)
        overlapFactors.push(overlapFactor);
        modeOverlapFactor = mode(overlapFactors);
        prevSliceLocation = sliceLocation;
      } else {
        prevSliceLocation = sliceLocation;
      }

      var width = image.width;
      var height = image.height;
      var sliceSize = width * height;
      var pixelData = image.getPixelData();
      var offset = imageIndex * sliceSize;

      for (var i = 0; i < pixelData.length; i += 1) {
        var label = view[offset + i];

        if (label > 1) {
          var value = pixelData[i];
          var hu = value * parseInt(rescaleSlope) + parseInt(rescaleIntercept);
          var currentMax = maxHUEachRegion[label - 2];

          voxelsEachRegion[label - 2].push(hu);
          if (hu > currentMax) {
            maxHUEachRegion[label - 2] = hu;
          }
        }
      }
    });
  });

  return Promise.all(promises).then(function () {
    return voxelsEachRegion.map(function (voxels, i) {
      console.log("SCORE -> voxelsEachRegion");
      // UNUSED??    const mean_HU = sum / region.length
      var maxHU = maxHUEachRegion[i];

      var densityFactor = getDensityFactor(maxHU);
      var area = voxels.length * voxelSize;

      var cascore = area * densityFactor * kvpMultiplier;
      //
      // console.log("modeOverlapFactor", modeOverlapFactor)
      // console.log("voxels.length: " + voxels.length);
      // console.log("voxelSize: " + voxelSize);
      // console.log("Area: " + area);
      // console.log("Max HU: " + maxHU);
      // console.log("densityFactor: " + densityFactor);
      // console.log("kvpMultiplier: " + kvpMultiplier);
      // console.log("CAscore: " + cascore);

      // If modeOverlapFactor factor is undefined it is because there is only one slice in the series.
      // In this case obviously modeOverlapFactor is meaningless and should not be multiplied with cascore.
      if (modeOverlapFactor) {
        return cascore * modeOverlapFactor;
      } else {
        return cascore;
      }
    });
  });
}

exports.default = score;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cornerstoneCore = __webpack_require__(19);

var cornerstone = _interopRequireWildcard(_cornerstoneCore);

var _toolState = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function enable(element) {
  console.log("ENABLE UNDO");
  var thresholdingData = (0, _toolState.getToolState)(element, 'regions');
  var state = thresholdingData.data[0];

  if (state.history.length < 1) {
    return;
  }

  var replacement = state.history.pop();
  console.log("HIST", state.history);

  state.buffer = replacement;
  cornerstone.updateImage(element);
}

function disable(element) {}
// pass


// Module/private exports
exports.default = {
  activate: enable,
  deactivate: disable,
  enable: enable,
  disable: disable
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '1.1.0';

/***/ })
/******/ ]);
});
//# sourceMappingURL=cornerstoneTools.js.map