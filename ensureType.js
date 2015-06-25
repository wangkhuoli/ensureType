/**
 * a simple function for checking type in javascript
 *
 * @author deasel
 * @email   deasel21@gmail.com
 * @date  2015-6-15
 */
(function(win) {

  var Obj2String = {}.toString;

  var isType = function(type) {
    return function(obj) {
      return Obj2String.call(obj) == "[object " + type + "]";
    };
  };


  var typeCharge = {

    isArray: Array.isArray || isType("Array"),

    isObject: isType("Object"),

    isBoolean: isType('Boolean'),

    isNumber: isType('Number'),

    isUndefined: function(o) {
      return typeof(o) === "undefined";
    },

    isNull: function(o) {
      return o === null;
    },

    isFunction: isType("Function"),

    isString: isType("String"),

    isPlainObject: function(obj) {
      //首先应该判断目标是否为对象
      if (!AM.type.isObject(obj)) {
        return false;
      }
      for (var n in obj) {
        return false;
      }
      return true;
    }
  };

  var defaultHandle = function(typeName) {
    return function(target) {
      return typeof target === typeName;
    };
  };



  var transform = function(target, typeName) {
    var transformHandle = {
      //转数组
      '2Array': function(target) {
        var arr = [];

        if (target.length) {
          //类数组对象
          arr = [].slice.call(target);

        } else if (typeCharge.isObject(target)) {
          //枚举类型
          for (var key in target) {
            if (key && target[key]) {
              arr.push(target[key]);
            }
          }
        } else {
          arr = [target];
        }

        return arr;
      },
      //转对象
      '2Object': function(target) {

      }
    };
  };

  var ensureType = function(target, oTypeName, defaultValue) {
    if (!target || !typeName) {
      return;
    }

    var typeName = oTypeName.charAt(0).toUpperCase() + oTypeName.substr(1);

    var chargeHandle = typeCharge['is' + typeName] || defaultHandle(oTypeName);

    defaultValue = defaultValue || (initData[typeName] || target);

    return chargeHandle(target) === true ? target : defaultValue;
  };


  if (typeof module != "undefined" && module !== null && module.exports) {
    module.exports = {
      ensureType: ensureType
    };
  } else if (typeof define === "function" && define.amd) {
    define(function() {
      return {
        ensureType: ensureType
      };
    });
  } else {
    win.ensureType = ensureType;
  }
})(window);