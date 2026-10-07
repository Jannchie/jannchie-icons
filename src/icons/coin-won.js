import { ring } from '../marks'
import { coin } from '../money'

// 硬币：圆圈 + 缩小到 0.6 倍的韩元符号
export default () => [ring(), ...coin('won')]
