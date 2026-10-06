import { ring } from '../marks'
import { CURRENCIES } from '../money'
import { scale } from '../transform'

// 硬币：圆圈 + 缩小到 0.6 倍的欧元符号
export default () => [ring(), ...CURRENCIES.euro.paths().map(d => scale(d, 0.6))]
