import * as echart from 'echarts';
import ChinaMapData from '../data/china.json';
echart.registerMap('china', ChinaMapData);

export default function useEchart(el: HTMLElement) {
  const echartInstance = echart.init(el);
  const setOptions = (options: echart.EChartsOption) => {
    echartInstance.setOption(options);
  };
  const setResize = () => {
    echartInstance.resize();
  };
  window.addEventListener('resize', () => {
    echartInstance.resize();
  });
  return {
    echartInstance,
    setResize,
    setOptions,
  };
}
