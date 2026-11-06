import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 地球：圆 + 中央经线（椭圆）+ 赤道 + 两条纬线
// 圆心在画布中心 (12, 12)，纬线间距 5；纬线两端正好落在圆上
const [cy, r, lat] = [12, 9, 5]
const half = +Math.sqrt(r * r - lat * lat).toFixed(3)
export default () => [
  circle(12, cy, r),
  `M12 ${cy - r}A4.5 ${r} 0 0 1 12 ${cy + r}A4.5 ${r} 0 0 1 12 ${cy - r}`,
  `M${12 - r} ${cy}H${12 + r}`,
  `M${12 - half} ${cy - lat}H${12 + half}`,
  `M${12 - half} ${cy + lat}H${12 + half}`,
]

// 实心：圆一块，经纬线挖空；纬线两端、经线椭圆的上下两头都离外缘一个线宽，地球不被切碎、外缘不被咬缺
export const fill = ({ stroke }) => {
  const ry = r - stroke
  return [
    solid(circle(12, cy, r)),
    knock([
      `M12 ${cy - ry}A4.5 ${ry} 0 0 1 12 ${cy + ry}A4.5 ${ry} 0 0 1 12 ${cy - ry}`,
      `M${12 - r + stroke} ${cy}H${12 + r - stroke}`,
      `M${12 - half + stroke} ${cy - lat}H${12 + half - stroke}`,
      `M${12 - half + stroke} ${cy + lat}H${12 + half - stroke}`,
    ]),
  ]
}
