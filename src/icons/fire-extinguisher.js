import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 灭火器：圆肩的瓶身（9.5–17.5 × 8.5–20.5，肩膀的圆角大一号）+ 瓶身上一道标签线（13.5）+ 瓶口的阀杆（13.5，往上到 5.5）
// + 阀杆顶上往右上翘起的压把 + 往左伸出去再垂下来的软管（落到 12，和瓶身隔开 2.5；瓶身让给软管、略偏右，整体墨迹左右居中）
const body = radius => rounded([[9.5, 8.5, 3], [17.5, 8.5, 3], [17.5, 20.5], [9.5, 20.5]], Math.min(radius, 1.5))
const label = 'M9.5 13.5H17.5'
const valve = 'M13.5 8.5V5.5'
const lever = 'M13.5 5.5L18.5 3.5'
const hose = 'M13.5 5.5H9C6.75 5.5 5.5 6.75 5.5 9V12'

export default ({ radius }) => [body(radius), label, valve, lever, hose]

// 实心：瓶身一块，标签线整条挖穿；阀杆、压把、软管照旧是线
export const fill = ({ radius }) => [solid(body(radius)), knock('M7.5 13.5H19.5'), valve, lever, hose]
