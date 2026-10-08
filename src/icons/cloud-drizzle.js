import { cloud } from '../symbols'

// 毛毛雨：云 + 三道短雨线（比 cloud-rain 短，上下错开）
export default () => [
  ...cloud([12, 9.5], 2.2),
  'M8 17.5V19',
  'M12 19V20.5',
  'M16 17.5V19',
]
