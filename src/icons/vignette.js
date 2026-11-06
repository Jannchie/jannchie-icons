import { rounded } from '../geometry'
import { hole, solid } from '../solid'

// 暗角：方框 + 内部椭圆
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)),
  'M6 12A6 4.5 0 0 1 18 12A6 4.5 0 0 1 6 12',
]

// 实心：四周压暗成一整块，中间的椭圆挖成洞（洞外扩半个线宽后正好落在描边版椭圆的中心线上）
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  const [rx, ry] = [6 - h, 4.5 - h]
  return [
    solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5))),
    hole(`M${12 - rx} 12A${rx} ${ry} 0 0 1 ${12 + rx} 12A${rx} ${ry} 0 0 1 ${12 - rx} 12Z`),
  ]
}
