Polymer({

  is: 'hc-chart',

  properties: {
    title: {
      type: String,
      value: function () {
        return 'Chart title';
      }
    },
    type: {
      type: 'String',
      value: function () {
        return 'line';
      }
    }
  },
  observers: [
    '_computeOptions(title, type)'
  ],

  attached: function () {

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
  _computeOptions: function (title, type) {
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
  _draw: function (callback) {
    console.log('draw', this._options);

    for (var i = 0; i < this._children.length; i++) {
      this._mergeParameters(this._children[i].options);
    }

    this._options.chart.renderTo = this.$.container;
    this._chart = new Highcharts.Chart(this._options, callback);
  },
  _initChildren: function () {
    this._children = Polymer.dom(this).children;

    for (var i = 0; i < this._children.length; i++) {
      if (this._children[i].tagName === 'HC-SERIES') {
        this._children[i]._id = 'series-' + i;
      }
      this._children[i].addEventListener('options-changed', this._childrenChanged.bind(this));
    }
  },
  _mergeParameters: function (parameter) {
    Object.keys(parameter).forEach((key) => {
      if (key === 'series') {
        this._options.series = this._options.series.concat(parameter[key]);
      }
    });
  },
  _childrenChanged: function (event) {
    // Create the chart if not already exists and call the function
    // when ready
    if (!this._chart) {
      return this._draw((chart) => {
        this._onChartReady(chart);
        this._childrenChanged.apply(this, arguments);
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
  _onChartReady: function (chart) {
    this._chart = chart;
    this._options = this._chart.options;
  }

});
