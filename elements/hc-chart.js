'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var HcChart = (function () {
  function HcChart() {
    _classCallCheck(this, HcChart);
  }

  _createClass(HcChart, [{
    key: 'beforeRegister',
    value: function beforeRegister() {

      this.is = 'hc-chart';
      this.properties = {
        title: {
          type: String,
          value: function value() {
            return 'Chart title';
          }
        },
        type: {
          type: 'String',
          value: function value() {
            return 'line';
          }
        }
      };
      this.observers = ['_computeOptions(title, type)'];
    }
  }, {
    key: 'attached',
    value: function attached() {

      this._ready = false;

      this._options = {
        chart: {
          type: this.type
        },
        title: {
          text: this.title
        },
        series: []
      };

      this._children = Polymer.dom(this).children;

      this._draw(this._onChartReady.bind(this));
    }
  }, {
    key: '_computeOptions',
    value: function _computeOptions(title, type) {

      if (!this._options) {
        this._options = {
          chart: {
            type: this.type
          },
          title: {
            text: this.title
          },
          series: []
        };
      }
      this._options.title.text = this.title;
      this._options.chart.type = this.type;
    }
  }, {
    key: '_draw',
    value: function _draw(callback) {

      for (var i = 0; i < this._children.length; i++) {

        if (this._children[i].tagName === 'HC-SERIES') {
          this._children[i].id = this._children[i].id || 'series-' + i;
        }
        this._mergeParameters(this._children[i].tagName, this._children[i].options);
      }

      this._options.chart.renderTo = this.$.container;
      console.debug('draw', this._options);
      this._chart = new Highcharts.Chart(this._options, callback);
    }
  }, {
    key: '_initChildren',
    value: function _initChildren() {

      for (var i = 0; i < this._children.length; i++) {
        this._children[i].addEventListener('options-changed', this._childrenChanged.bind(this));
      }
    }
  }, {
    key: '_mergeParameters',
    value: function _mergeParameters(tagName, parameter) {

      if (tagName === 'HC-SERIES') {
        this._options.series.push(parameter);
      }
    }
  }, {
    key: '_childrenChanged',
    value: function _childrenChanged(event) {
      var _this = this,
          _arguments = arguments;

      if (!this._ready) {
        return this.addEventListenerOnce('ready', function () {
          _this._childrenChanged.apply(_this, _arguments);
        });
      }

      var target = event.target || event.path[0];
      if (target.tagName === 'HC-SERIES') {
        var series = this._chart.get(target.options.id);
        if (!series) {
          console.debug('Add series', target.options);
          return this._chart.addSeries(target.options);
        }
        console.debug('Update series', target.options);
        series.update(target.options);
      }
    }
  }, {
    key: '_onChartReady',
    value: function _onChartReady(chart) {

      this._chart = chart;
      this._ready = true;
      this.fire('ready');
      this._options = this._chart.options;
      this._initChildren();
    }
  }, {
    key: 'chart',
    get: function get() {
      return this._chart;
    }
  }]);

  return HcChart;
})();

Polymer(HcChart);