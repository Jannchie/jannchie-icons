import { ring } from '../marks'
import { coin } from '../money'

// 硬币：圆圈 + 缩小到 0.6 倍的英镑符号
export default () => [ring(), ...coin('pound')]
