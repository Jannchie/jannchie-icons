import { cloud } from '../symbols'

// 雾：云 + 两道横线
export default () => [
  ...cloud([12, 9.5], 2.2),
  'M5 17.5H19',
  'M8 20.5H16',
]
