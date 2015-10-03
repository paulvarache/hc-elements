'use strict';

Polymer({
  is: 'hc-series',

  properties: {
    name: {
      type: String,
      value: function value() {
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
  _computeOptions: function _computeOptions() {
    return {
      series: {
        id: this._id,
        name: this.name,
        data: this.data,
        color: this.color
      }
    };
  },
  _ajaxChanged: function _ajaxChanged() {
    this.data = this.data || this.ajaxData;
  }
});