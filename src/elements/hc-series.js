Polymer({
  is: 'hc-series',

  properties: {
    name: {
      type: String,
      value: function () {
        return 'series';
      }
    },
    data: {
      type: Array
    },
    dataUri: {
      type: String
    },
    ajaxData: {
      type: Array,
      observer: '_ajaxChanged'
    },
    color: {
      type: String
    },
    options: {
      type: Object,
      value: { series: {} },
      computed: '_computeOptions(data, color)',
      notify: true
    }
  },
  _computeOptions: function () {
    return {
      series: {
        id: this._id,
        name: this.name,
        data: this.data,
        color: this.color
      }
    };
  },
  _ajaxChanged: function () {
    this.data = this.data || this.ajaxData;
  }
});
