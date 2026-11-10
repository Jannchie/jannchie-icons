import { polyline } from '../ai'
import { rounded } from '../geometry'
import { dot } from '../scene'

// Hugging Face 任务：时间序列预测。L 形坐标轴里一条折线，折线的后半段不再是实线，而是顺着走势往右上延伸的两个点：还没发生、预测出来的部分
// 库里的 chart-line 整条都是实线，trending-up 没有坐标轴
// 坐标轴外缘：左 3、下 21（线宽变粗时往里长）；折线四个点，最后一段朝右上；两个预测点直径 1.75，顺着最后一段的方向各隔 3.5 左右
// 纯线条图标，实心版和描边版相同，不单独导出 fill
export default ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    rounded([[3 + h, 3 + h], [3 + h, 21 - h], [21 - h, 21 - h]], radius, false),
    polyline([[7.5, 15.75], [10.25, 12], [12.25, 14.25], [14.75, 10.75]], radius),
    dot(17.25, 8.25, 1.75),
    dot(19.75, 5.75, 1.75),
  ]
}
