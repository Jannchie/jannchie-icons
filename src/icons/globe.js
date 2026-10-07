import { circle } from '../geometry'

// 地球：圆 + 中央经线（椭圆）+ 赤道 + 两条纬线
// 圆心上移半格到 (12, 11.5)，赤道和纬线（间距 5）都落在 .5 上；纬线两端正好落在圆上
const [cy, r, lat] = [11.5, 9, 5]
const half = +Math.sqrt(r * r - lat * lat).toFixed(3)
export default () => [
  circle(12, cy, r),
  `M12 ${cy - r}A4.5 ${r} 0 0 1 12 ${cy + r}A4.5 ${r} 0 0 1 12 ${cy - r}`,
  `M${12 - r} ${cy}H${12 + r}`,
  `M${12 - half} ${cy - lat}H${12 + half}`,
  `M${12 - half} ${cy + lat}H${12 + half}`,
]
