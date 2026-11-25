import { frame } from '../geometry'
import { knock, solid } from '../solid'

// 护照：竖放的本子（墨迹 4.5–19.5 × 3–21，宽度同 file 的纸张，线宽变粗往里长）+ 封面上的地球徽记（圆心 (12, 10)、半径 3.5：
// 圆 + 赤道 + 中央经线的椭圆，都是缩小的细节线）+ 徽记下面一行字（8.5–15.5 在 17.5）
const [cx, cy, r] = [12, 10, 3.5]
// 徽记的圆从右上 45° 起笔并闭合：起点落在赤道线的端点上的话，圆自己的线头会和赤道的线头叠在一起（尖角模式下冒头）
const k = +(r * Math.SQRT1_2).toFixed(3)
const emblem = [
  `M${cx + k} ${cy - k}A${r} ${r} 0 1 1 ${cx - k} ${cy + k}A${r} ${r} 0 1 1 ${cx + k} ${cy - k}Z`,
  `M${cx} ${cy - r}A1.5 ${r} 0 0 1 ${cx} ${cy + r}A1.5 ${r} 0 0 1 ${cx} ${cy - r}Z`,
  `M${cx - r} ${cy}H${cx + r}`,
].map(d => ({ d, detail: true }))
const title = 'M8.5 17.5H15.5'
const cover = (radius, stroke) => frame(stroke, Math.min(radius, 2), [4.5, 3, 19.5, 21])

export default ({ radius, stroke }) => [cover(radius, stroke), ...emblem, title]

// 实心：封面一块，徽记和那行字挖空
export const fill = ({ radius, stroke }) => [solid(cover(radius, stroke)), knock([...emblem, title])]
