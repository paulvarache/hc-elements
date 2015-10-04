class HcChart {

  beforeRegister() {

    this.is = 'hc-chart';
    this.properties = {
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
    };
    this.observers = [
      '_computeOptions(title, type)'
    ];

  }

  attached() {

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

  _computeOptions(title, type) {

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

  _draw(callback) {

    for (let i = 0; i < this._children.length; i++) {

      if (this._children[i].tagName === 'HC-SERIES') {
        this._children[i].id = this._children[i].id || `series-${i}`;
      }
      this._mergeParameters(this._children[i].tagName, this._children[i].options);
    }

    this._options.chart.renderTo = this.$.container;
    console.debug('draw', this._options);
    this._chart = new Highcharts.Chart(this._options, callback);

  }

  _initChildren() {

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].addEventListener('options-changed', this._childrenChanged.bind(this));
    }

  }

  _mergeParameters(tagName, parameter) {

    if (tagName === 'HC-SERIES') {
      this._options.series.push(parameter);
    }

  }

  _childrenChanged(event) {

    if (!this._ready) {
      return this.addEventListenerOnce('ready', () => {
        this._childrenChanged.apply(this, arguments);
      });
    }

    let target = event.target || event.path[0];
    if (target.tagName === 'HC-SERIES') {
      let series = this._chart.get(target.options.id);
      if (!series) {
        console.debug ('Add series', target.options);
        return this._chart.addSeries(target.options);
      }
      console.debug ('Update series', target.options);
      series.update(target.options);
    }
  }

  _onChartReady(chart) {

    this._chart = chart;
    this._ready = true;
    this.fire('ready');
    this._options = this._chart.options;
    this._initChildren();

  }

  get chart() {
    return this._chart;
  }

}

Polymer(HcChart);
