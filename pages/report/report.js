import * as echarts from '../../plugins/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var data1 = {
    "name": "发票池",
    "children": [{
      "name": "增值税专用发票",
      "children": [{
        "name": "总张数:2"
      }, {
        "name": "总金额:100.13"
      }, {
        "name": "总税额:12"
      }, {
        "name": "总合计:112.13"
      }]
    }, {
      "name": "增值税普通发票",
      "children": [{
        "name": "总张数:1"
      }, {
        "name": "总金额:19.01"
      }, {
        "name": "总税额:1.2"
      }, {
        "name": "总合计:20.21"
      }]
    }, {
      "name": "增值税电子普通发票",
      "children": [{
        "name": "总张数:1"
      }, {
        "name": "总金额:99"
      }, {
        "name": "总税额:1.9"
      }, {
        "name": "总合计:109.9"
      }]
    }, {
      "name": "机票",
      "children": [{
        "name": "总张数:1"
      }, {
        "name": "总金额:900"
      }, {
        "name": "总税额:90"
      }, {
        "name": "总合计:990"
      }]
    }]
  };

  var option = {
    series: [{
      type: 'tree',

      initialTreeDepth: -1,

      name: 'tree1',

      data: [data1],

      top: '5%',
      left: '20%',
      bottom: '2%',
      right: '15%',

      symbolSize: 10,
      symbol: 'circle',

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          color: 'black'
        }
      }

    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
