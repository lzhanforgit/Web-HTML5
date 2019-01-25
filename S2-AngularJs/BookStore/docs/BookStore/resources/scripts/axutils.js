/*
 *
 *
 *
 *
 */

 (function() {
     // define the root namespace object
     window._axUtils = { };

     // ------------------------------------------------------------------------
     // Makes an object bindable
     // ------------------------------------------------------------------------
     _axUtils.makeBindable = function(obj, events) {
         if (obj.registeredBindings != null) return;

         // copy the events
         obj.bindableEvents = events.slice();
         obj.registeredBindings = { };

         obj.bind = function(eventName, fn) {
             var binding = { };
             binding.eventName = eventName;
             binding.action = fn;

             var bindingList = this.registeredBindings[eventName];
             if (bindingList == null) {
                 bindingList = [];
                 this.registeredBindings[eventName] = bindingList;
             }
             bindingList[bindingList.length] = binding;
         };

         obj.unbind = function(eventName) {
             if (eventName.indexOf('.') >= 0) {
                 this.registeredBindings[eventName] = null;
             } else {
                 var event = eventName.split('.')[0];
                 for (var bindingKey in this.registeredBindings) {
                     if (bindingKey.split('.')[0] == event) {
                         this.registeredBindings[bindingKey] = null;
                     }
                 }
             }
         };

         obj.triggerEvent = function(eventName, arg) {
             for (var bindingKey in this.registeredBindings) {
                 if (bindingKey.split('.')[0] == eventName) {
                     var bindings = this.registeredBindings[bindingKey];
                     for (var i = 0; i < bindings.length; i++) {
                         if (arg == null) {
                             bindings[i].action();
                         } else {
                             bindings[i].action(arg);
                         }
                     }
                 }
             }
         };
     };


     _axUtils.loadCSS = function(url) {
         $('head').append('<link text="text/css" href="' + url + '" rel="Stylesheet" />');
     };

     _axUtils.loadJS = function(url) {
         $('head').append('<script text="text/S1-javascript" language="JavaScript" src="' + url + '"></script>');
     };

     _axUtils.curry = function(fn) {
         var curriedArgs = Array.prototype.slice.call(arguments, [1]);
         return function() {
             fn.apply(this, curriedArgs.concat(Array.prototype.slice.call(arguments)));
         };
     };

     _axUtils.succeeded = function(result) {
         return result && result.success;
     };

     _axUtils.createUniqueTag = function() {
         return Math.random().toString().substring(2) +
             Math.random().toString().substring(2) +
                 Math.random().toString().substring(2) +
                     Math.random().toString().substring(2);
     };

     _axUtils.formatDate = function(date) {
         var months = [
             "Jan", "Feb", "Mar", "Apr", "May", "Jun",
             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
         var hours = date.getHours();
         var amPm = (hours > 11 ? 'PM' : 'AM');
         hours = hours % 12;
         if (hours == '0') hours = '12';
         var minutes = date.getMinutes() + '';
         if (minutes.length == 1) {
             minutes = '0' + minutes;
         }
         return [
             months[date.getMonth()], ' ', date.getDate(), ' ', date.getFullYear(), ' ',
             hours, ':', minutes, ' ', amPm].join('');

     };

     _axUtils.quickObject = function() {
         var returnVal = { };
         for (var i = 0; i < arguments.length; i += 2) {
             returnVal[arguments[i]] = arguments[i + 1];
         }
         return returnVal;
     };

     var matrixBase = {
         mul: function(val) {
             if (val.x !== undefined) {
                 return _axUtils.Vector2D(
                     this.m11 * val.x + this.m12 * val.y + this.tx,
                     this.m21 * val.x + this.m22 * val.y + this.ty);
             } else if (val.m11) {
                 return _axUtils.Matrix2D(
                     this.m11 * val.m11 + this.m12 * val.m21,
                     this.m11 * val.m12 + this.m12 * val.m22,
                     this.m21 * val.m11 + this.m22 * val.m21,
                     this.m21 * val.m12 + this.m22 * val.m22,
                     val.tx + this.tx * val.m11 + this.ty * val.m21,
                     val.ty + this.tx * val.m12 + this.ty * val.m22
                 );
             } else if (Number(val)) {
                 var num = Number(val);
                 return _axUtils.Matrix2D(this.m11 * num, this.m12 * num,
                     this.m21 * num, this.m22 * num,
                     this.tx * num, this.ty * num);
             } else return undefined;
         },
         rotate: function(angle) {
             var angleRad = angle * Math.PI / 180;
             var c = Math.cos(angleRad);
             var s = Math.sin(angleRad);

             return this.mul(_axUtils.Matrix2D(c, -s, s, c));
         }
     };

     _axUtils.Matrix2D = function(m11, m12, m21, m22, tx, ty) {
         return $.extend({
             m11: m11 || 0,
             m12: m12 || 0,
             m21: m21 || 0,
             m22: m22 || 0,
             tx: tx || 0,
             ty: ty || 0
         }, matrixBase);
     };

     _axUtils.Vector2D = function(x, y) {
         return { x: x || 0, y: y || 0 };
     };

     _axUtils.Matrix2D.identity = function() {
         return _axUtils.Matrix2D(1, 0, 0, 1, 0, 0);
     };


 })();
