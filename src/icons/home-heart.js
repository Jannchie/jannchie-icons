import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'
import { hole, solid } from '../solid'
import { HEART } from './heart'

// 住宅 + 爱心：和 home 同样的屋顶与墙，门换成一颗缩小的爱心
const apex = [12, 4]
const eave = 8.5
const roofY = x => apex[1] + Math.abs(x - apex[0])
const wallL = 6.5
const wallR = 17.5

// HEART 全是绝对坐标、数字成对出现：按 (12, 12.25) 为中心缩放 k 后移到 (cx, cy)
const k = 0.33
const [cx, cy] = [12, 15]
const fmt = n => String(Math.round(n * 1000) / 1000)
const heart = (() => {
  let i = 0
  return HEART.replace(/-?\d+(?:\.\d+)?/g, n => fmt(i++ % 2 ? cy + (n - 12.25) * k : cx + (n - 12) * k))
})()

export default ({ radius }) => [
  groundLine,
  rounded([[apex[0] - eave, roofY(apex[0] - eave)], apex, [apex[0] + eave, roofY(apex[0] + eave)]], radius, false),
  `M${wallL} ${roofY(wallL)}V${GROUND}`,
  `M${wallR} ${roofY(wallR)}V${GROUND}`,
  heart,
]

// 实心：墙和屋顶围成的一块，屋檐照旧是线；爱心挖空（洞是描边版爱心墨迹的外形），地平线最后画
export const fill = ({ radius }) => [
  solid(rounded([[wallL, roofY(wallL)], apex, [wallR, roofY(wallR)], [wallR, GROUND], [wallL, GROUND]], radius)),
  rounded([[apex[0] - eave, roofY(apex[0] - eave)], apex, [apex[0] + eave, roofY(apex[0] + eave)]], radius, false),
  hole(heart),
  groundLine,
]
