import { frame } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 插座（墙上的电源插座面板）：圆角方面板（墨迹 3–21，线宽变粗往里长）+ 上面两道竖的插孔（9.5 / 14.5，8–12）+ 下面正中一个圆的接地孔
const plate = (radius, stroke) => frame(stroke, Math.min(radius * 1.5, 4), [3, 3, 21, 21])
const holes = ['M9.5 8V12', 'M14.5 8V12', { ...dot(12, 16, 2.5), round: true }]

export default ({ radius, stroke }) => [plate(radius, stroke), ...holes]

// 实心：面板一块，三个孔挖空
export const fill = ({ radius, stroke }) => [solid(plate(radius, stroke)), knock(holes)]
