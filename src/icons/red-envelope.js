import { circle, frame } from '../geometry'
import { knock, solid } from '../solid'

// 红包：竖放的封套（墨迹 4.5–19.5 × 3–21，同 passport，线宽变粗往里长）+ 从两边兜下来的弧形封口 + 封口正中的圆形封签（圆心 (12, 11)、半径 2.5）
// 封口分左右两段，各从封套的侧边弯到封签的圆上
const seal = circle(12, 11, 2.5)
// 封口右半段：从 x0（封套侧边）到封签圆上 (14.35, 10.14)；左半段是它的镜像
const flap = (x0) => {
  const right = `M${x0} 6.5C${x0 - 1.75} 8.5 16.25 9.6 14.35 10.14`
  const left = `M${24 - x0} 6.5C${24 - x0 + 1.75} 8.5 7.75 9.6 9.65 10.14`
  return [left, right]
}
const cover = (radius, stroke) => frame(stroke, Math.min(radius, 2), [4.5, 3, 19.5, 21])

export default ({ radius, stroke }) => [cover(radius, stroke), ...flap(19.5 - stroke / 2), seal]

// 实心：封套一块，封口的弧线从封套外一直挖到封签，封签的圆圈挖空（封签留成实心）
export const fill = ({ radius, stroke }) => [solid(cover(radius, stroke)), knock([...flap(19.5 + stroke), seal])]
