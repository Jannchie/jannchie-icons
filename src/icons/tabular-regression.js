import { frame } from '../ai'
import { through } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// Hugging Face 任务：表格回归。一张表格（外框 + 表头线），表身里一条斜向上的拟合直线，线的两侧各一个散点：从表里的数据回归出一条线
// time-series-forecasting 是坐标轴 + 折线 + 往后延伸的虚点；库里的 chart-scatter 没有表头
// 外框 3–21；表头线的墨迹 6–7.5（按上缘 6 定，线宽变粗时往下长）
// 拟合线从 (6.5, 17.5) 到 (17.5, 10.5)；两个散点直径 2，一上一下，离线都是 4
const header = (stroke) => {
  const h = stroke / 2
  return [[3 + h, 6 + h], [21 - h, 6 + h]]
}
const fit = ['M6.5 17.5L17.5 10.5', dot(8.5, 11.5), dot(15.5, 16.5)]

export default ({ radius, stroke }) => {
  const [p, q] = header(stroke)
  return [frame(stroke, radius), `M${p[0]} ${p[1]}H${q[0]}`, ...fit]
}

// 实心：外框一块，表头线挖成缝并穿出外框（表头、表身两块），拟合线和散点挖空
export const fill = ({ radius, stroke }) => [solid(frame(stroke, radius)), knock([through(...header(stroke), 2 * stroke), ...fit])]
