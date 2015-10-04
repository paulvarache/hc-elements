class HcSeries {

  beforeRegister() {
    this.is = 'hc-series';
    this.properties = {
      id: {
        type: String,
        observer: '_optionsChanged'
      },
      name: {
        type: String,
        value: function () {
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

  _optionsChanged() {

    this.set('options', {
      data: this.dataUri ? this.ajaxData : this.data,
      color: this.color,
      id: this.id,
      name: this.name
    });

  }

}

Polymer(HcSeries);
