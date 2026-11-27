import { GAP } from '../clearance'
import { eye } from '../scene'

// 暖气片（老式的铸铁暖气）：并排的五片（每片宽 3，4.5–19.5），每片顶上是一个半圆的头（拱到 3.5），连成一道波浪形的顶边；
// 片底在 17.5，两边的侧壁接着往下落成两只脚（到 20.5）；左上角一个阀门（一截横管 + 管头上的圆旋钮），右下角一截接出去的水管
// 旋钮画成接在管头上的圆点：画成一道竖线的话离暖气片的侧壁只有 2，粗字重下贴在一起
// 靠「一排圆头的竖片 + 阀门」认出来；air-conditioner 是横的机身 + 吹下来的风
const XS = [4.5, 7.5, 10.5, 13.5, 16.5, 19.5]
const outline = `M4.5 20.5V5${XS.slice(1).map(x => `A1.5 1.5 0 0 1 ${x} 5`).join('')}V20.5`
const bottom = 'M4.5 17.5H19.5'
const fins = XS.slice(1, -1).map(x => `M${x} 5V17.5`)
const valve = ['M4.5 8.5H3.25', eye(3.25, 8.5, 2.5)]
const pipe = 'M19.5 14.5H21.25'

export default () => [outline, bottom, ...fins, ...valve, pipe]

// 实心：五片各一块完整的圆头竖条，片和片之间留 GAP 的缝；两只脚、阀门、水管照旧是线
export const fill = ({ stroke }) => {
  const h = stroke / 2
  // 墨迹总宽 15 + 线宽，减掉四道缝以后五片等宽（不照描边版的分隔线切：那样两头的两片比中间的宽）
  const w = (15 + stroke - GAP * 4) / 5
  const r = w / 2
  const pieces = XS.slice(0, -1).map((_, i) => {
    const a = 4.5 - h + i * (w + GAP)
    return { d: `M${a} ${17.5 + h}V${3.5 - h + r}A${r} ${r} 0 0 1 ${a + w} ${3.5 - h + r}V${17.5 + h}Z`, fill: true, exact: true }
  })
  return [...pieces, 'M4.5 17.5V20.5', 'M19.5 17.5V20.5', ...valve, pipe]
}
