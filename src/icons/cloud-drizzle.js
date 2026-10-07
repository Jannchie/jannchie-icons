import { cloud } from '../symbols'

// 毛毛雨：云 + 三道短雨线（比 cloud-rain 短，上下错开）
export default () => [
  // 云右移半格，三道雨线落在 8.5 / 12.5 / 16.5 上
  ...cloud([12.5, 9.5], 2.2),
  'M8.5 17.5V19',
  'M12.5 19V20.5',
  'M16.5 17.5V19',
]
