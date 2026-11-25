import { frame } from '../geometry'
import { knock, solid } from '../solid'

// 巧克力（剥开一半的板状巧克力）：竖放的一板（墨迹 4.5–19.5 × 3–21，宽度同 file 的纸张，线宽变粗往里长）；上半露出来的巧克力被一横一竖分成四小格，
// 下半还裹着包装纸，纸的上沿撕成一道锯齿（13–14.5，两端落在板的两条边上）
const bar = (radius, stroke) => frame(stroke, Math.min(radius, 2), [4.5, 3, 19.5, 21])
const grid = stroke => [`M12 ${3 + stroke / 2}V13`, `M${4.5 + stroke / 2} 8.5H${19.5 - stroke / 2}`]
const tear = (l, r) => `M${l} 14.5L7 13L9.5 14.5L12 13L14.5 14.5L17 13L${r} 14.5`

export default ({ radius, stroke }) => [bar(radius, stroke), ...grid(stroke), tear(4.5 + stroke / 2, 19.5 - stroke / 2)]

// 实心：整板一块，格线和锯齿都挖穿：上半四小格巧克力，下半一整片包装纸
export const fill = ({ radius, stroke }) => [solid(bar(radius, stroke)), knock(['M12 1V13', 'M2 8.5H22', tear(2, 22)])]
