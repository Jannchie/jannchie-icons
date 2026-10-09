import { rounded } from '../geometry'
import { rotate } from '../transform'

// 图书馆（书架）：底板（墨迹 2–22，中线 y 20.5）上立着两本竖书（3–7、9–12）和一本斜靠的书
// （先竖着画在 14–17，再绕右下脚 (17, 20.5) 顺时针转 18°，靠向右边，右上角墨迹到 22 左右）；书都是闭合矩形，底角是直角、平压在底板上（圆底角会让底板从角下露出一截）
export default ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    `M${2 + h} 20.5H${22 - h}`,
    rounded([[3, 4.5], [7, 4.5], [7, 20.5, 0], [3, 20.5, 0]], Math.min(radius, 1)),
    rounded([[9, 6.5], [12, 6.5], [12, 20.5, 0], [9, 20.5, 0]], Math.min(radius, 1)),
    rotate(rounded([[14, 6.5], [17, 6.5], [17, 20.5, 0], [14, 20.5, 0]], Math.min(radius, 1)), 18, [17, 20.5]),
  ]
}
