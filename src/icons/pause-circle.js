import { ring } from '../marks'
import { knock, solid } from '../solid'

// 圆圈暂停键：圆 + 两根竖条（9.5 / 14.5，落在 .5 上、和中线对称）
const bars = ['M9.5 8.5V15.5', 'M14.5 8.5V15.5']
export default () => [ring(), ...bars]

// 实心：圆片上挖出两根竖条
export const fill = () => [solid(ring()), knock(bars)]
