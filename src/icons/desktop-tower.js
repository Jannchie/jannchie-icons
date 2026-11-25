import { frame } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 台式机主机（机箱，正面）：竖长的机箱（墨迹 6–18 × 3–21，线宽变粗往里长）+ 上半两道光驱位的横线（6.5 / 9.5）+ 下半一颗电源键（圆点）
const box = (radius, stroke) => frame(stroke, Math.min(radius, 2), [6, 3, 18, 21])
const details = ['M9.5 6.5H14.5', 'M9.5 9.5H14.5', { ...dot(12, 16.5, 2.5), round: true }]

export default ({ radius, stroke }) => [box(radius, stroke), ...details]

// 实心：机箱一块，光驱位和电源键挖空
export const fill = ({ radius, stroke }) => [solid(box(radius, stroke)), knock(details)]
