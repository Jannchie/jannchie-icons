import { ring } from '../marks'
import { coin } from '../money'
import { knock, solid } from '../solid'

// 硬币：圆圈 + 缩小到 0.6 倍的比特币符号
export default () => [ring(), ...coin('bitcoin')]

// 实心：圆面填实，挖掉货币符号
export const fill = () => [solid(ring()), knock(coin('bitcoin'))]
