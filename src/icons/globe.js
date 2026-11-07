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

// 实心：圆一块，赤道和两条纬线挖穿两侧，地球切成四条；经线椭圆只挖在两条纬线之间（两头落进纬线的缝里），
// 上下两顶保持整块——椭圆在两极和圆相切，挖到那里只会剩两道越来越细的尖条；经线用圆线帽，线帽正好收在纬线的缝里
// （尖角模式下方线帽顺着斜的切线伸出纬线的缝，在上下两顶啃出小缺口）
export const fill = ({ stroke }) => {
  const e = 12 + r + stroke
  const x = 4.5 * Math.sqrt(1 - (lat / r) ** 2)
  return [
    solid(circle(12, cy, r)),
    knock([
      ...[cy - lat, cy, cy + lat].map(y => `M${24 - e} ${y}H${e}`),
      ...[`M${12 - x} ${cy - lat}A4.5 ${r} 0 0 0 ${12 - x} ${cy + lat}`, `M${12 + x} ${cy - lat}A4.5 ${r} 0 0 1 ${12 + x} ${cy + lat}`]
        .map(d => ({ d, round: true })),
    ]),
  ]
}
