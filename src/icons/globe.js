import { circle } from '../geometry'

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
