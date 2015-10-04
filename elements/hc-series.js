'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var HcSeries = (function () {
  function HcSeries() {
    _classCallCheck(this, HcSeries);
  }

  _createClass(HcSeries, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'hc-series';
      this.properties = {
        id: {
          type: String,
          observer: '_optionsChanged'
        },
        name: {
          type: String,
          value: function value() {
            return 'series';
          }
        },
        data: {
          type: Array,
          value: [],
          observer: '_optionsChanged'
        },
        dataUri: {
          type: String
        },
        ajaxData: {
          type: Array,
          observer: '_optionsChanged'
        },
        color: {
          type: String,
          observer: '_optionsChanged'
        },
        options: {
          type: Object,
          value: {},
          notify: true
        }
      };
    }
  }, {
    key: '_optionsChanged',
    value: function _optionsChanged() {

      this.set('options', {
        data: this.dataUri ? this.ajaxData : this.data,
        color: this.color,
        id: this.id,
        name: this.name
      });
    }
  }]);

  return HcSeries;
})();

Polymer(HcSeries);