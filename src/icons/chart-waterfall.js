import { rounded } from '../geometry'

// 瀑布图：底线 + 首尾两根落地的柱 + 中间两根悬空、上下错开的柱
export default ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    // 底线墨迹 2–22（中线两端 2 + h、22 - h），和其他图表一样
    // 四根柱宽 3、间距 2（间距 1 时相邻柱在常规字重下就粘在一起），柱边 3–21 左右居中、竖边落在整数上，柱顶在 .5 上
    `M${2 + h} 20.5H${22 - h}`,
    rounded([[3, 20.5], [3, 11.5], [6, 11.5], [6, 20.5]], Math.min(radius, 1), false),
    rounded([[8, 6.5], [11, 6.5], [11, 11.5], [8, 11.5]], Math.min(radius, 1)),
    rounded([[13, 6.5], [16, 6.5], [16, 9.5], [13, 9.5]], Math.min(radius, 1)),
    rounded([[18, 20.5], [18, 9.5], [21, 9.5], [21, 20.5]], Math.min(radius, 1), false),
  ]
}
