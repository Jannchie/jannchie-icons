import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 行李箱（拉杆箱，正面）：圆角箱体（墨迹 4.5–19.5 宽 15，线宽变粗往里长；上下 7.5–18.5）+ 顶上的拉杆（9.5–14.5，拉到 3.5）
// + 箱面两道竖棱（和拉杆的两根杆对齐在 9.5 / 14.5）+ 箱底两个轮子（短竖线，落到 21）
const handle = radius => rounded([[9.5, 7.5], [9.5, 3.5], [14.5, 3.5], [14.5, 7.5]], Math.min(radius, 1), false)
const ribs = ['M9.5 10.5V15.5', 'M14.5 10.5V15.5']
const wheels = ['M8.5 18.5V21', 'M15.5 18.5V21']
const body = (radius, stroke) => {
  const h = stroke / 2
  return rounded([[4.5 + h, 7.5], [19.5 - h, 7.5], [19.5 - h, 18.5], [4.5 + h, 18.5]], Math.min(radius, 2))
}

export default ({ radius, stroke }) => [body(radius, stroke), handle(radius), ...ribs, ...wheels]

// 实心：箱体一块，两道竖棱挖空；拉杆、轮子照旧是线
export const fill = ({ radius, stroke }) => [solid(body(radius, stroke)), knock(ribs), handle(radius), ...wheels]
