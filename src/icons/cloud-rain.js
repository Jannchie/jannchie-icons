import { cloud } from '../symbols'

// 雨：云 + 三道竖直雨线
export default () => [
  ...cloud([12, 9.5], 2.2),
  'M8 17.5V20.5',
  'M12 17.5V20.5',
  'M16 17.5V20.5',
]
