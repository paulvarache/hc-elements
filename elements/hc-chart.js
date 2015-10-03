'use strict';

Polymer({

  is: 'hc-chart',

  properties: {
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
  },
  observers: ['_computeOptions(title, type)'],

  attached: function attached() {

    this._options = {
      chart: {
        type: this.type
      },
      title: {
        text: this.title
      },
      series: []
    };

    this._initChildren();
  },
  _computeOptions: function _computeOptions(title, type) {
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
  },
  _draw: function _draw(callback) {
    console.log('draw', this._options);

    for (var i = 0; i < this._children.length; i++) {
      this._mergeParameters(this._children[i].options);
    }

    this._options.chart.renderTo = this.$.container;
    this._chart = new Highcharts.Chart(this._options, callback);
  },
  _initChildren: function _initChildren() {
    this._children = Polymer.dom(this).children;

    for (var i = 0; i < this._children.length; i++) {
      if (this._children[i].tagName === 'HC-SERIES') {
        this._children[i]._id = 'series-' + i;
      }
      this._children[i].addEventListener('options-changed', this._childrenChanged.bind(this));
    }
  },
  _mergeParameters: function _mergeParameters(parameter) {
    var _this = this;

    Object.keys(parameter).forEach(function (key) {
      if (key === 'series') {
        _this._options.series = _this._options.series.concat(parameter[key]);
      }
    });
  },
  _childrenChanged: function _childrenChanged(event) {
    var _this2 = this,
        _arguments = arguments;

    // Create the chart if not already exists and call the function
    // when ready
    if (!this._chart) {
      return this._draw(function (chart) {
        _this2._onChartReady(chart);
        _this2._childrenChanged.apply(_this2, _arguments);
      });
    }
    console.log('changed', event.detail.value);
    var target = event.path[0];
    if (target.tagName === 'HC-SERIES') {
      var series = this._chart.get(target._id);
      if (!series) {
        return this._chart.addSeries(event.detail.value.series);
      }
      series.update(event.detail.value.series);
    }
  },
  _onChartReady: function _onChartReady(chart) {
    this._chart = chart;
    this._options = this._chart.options;
  }

});