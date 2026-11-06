import { solid } from '../solid'
import { cloud } from '../symbols'

// 雨：云 + 三道竖直雨线
export default () => [
  ...cloud([12, 9.5], 2.2),
  'M8 17.5V20.5',
  'M12 17.5V20.5',
  'M16 17.5V20.5',
]

// 实心：云一块，雨线照旧
export const fill = () => [
  ...solid(cloud([12, 9.5], 2.2)),
  'M8 17.5V20.5',
  'M12 17.5V20.5',
  'M16 17.5V20.5',
]
