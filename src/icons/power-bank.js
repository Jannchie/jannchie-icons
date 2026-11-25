import { frame } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 充电宝：竖放的圆角机身（墨迹 6–18 × 3–21，线宽变粗往里长）+ 机身上半一道闪电 + 底下一排三颗电量指示灯
const body = (radius, stroke) => frame(stroke, Math.min(radius * 1.5, 3), [6, 3, 18, 21])
const bolt = 'M13 6.5L10 11.5H14L11 16'
const leds = [eye(9.5, 18, 1.5), eye(12, 18, 1.5), eye(14.5, 18, 1.5)]

export default ({ radius, stroke }) => [body(radius, stroke), bolt, ...leds]

// 实心：机身一块，闪电和指示灯挖空
export const fill = ({ radius, stroke }) => [solid(body(radius, stroke)), knock([bolt, ...leds])]
