import { ring } from '../marks'

// 交流电源：圆 + 中间一个周期的正弦波
export default ({ radius }) => [
  ring(),
  'M7.5 12C8.75 9 10.25 9 12 12C13.75 15 15.25 15 16.5 12',
]
