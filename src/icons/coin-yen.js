import { ring } from '../marks'
import { coin } from '../money'

// 硬币：圆圈 + 缩小到 0.6 倍的人民币 / 日元符号
export default () => [ring(), ...coin('yen')]
