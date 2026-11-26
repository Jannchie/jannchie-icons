import { ray, rounded, through } from '../geometry'
import { knock, solid } from '../solid'
import { rotate, translate } from '../transform'

// 爆竹：一根粗纸筒（6 × 10）斜放，绕筒心 (12, 15) 顺时针转 30°，筒顶朝右上；筒身上下两道纸箍（横线），
// 筒顶正中伸出一根往上弯的引信，引信头上炸开三道火花（细线，从引信头往上、右上、右放射，避开引信来的方向）。
// 纸箍 + 点着的引信是记号：没有引信像电池，竖着放像蜡烛（candle 有火苗和底座），圆的是炸弹（bomb）
const C = [12, 15]
// 转过以后整体偏右上，往左下挪半格居中
const [dx, dy] = [-0.5, 0.25]
const tilt = d => translate(rotate(d, 30, C), dx, dy)
const tube = radius => rounded([[9, 10], [15, 10], [15, 20], [9, 20]], Math.min(radius, 1))
const bands = [12.5, 17.5]
const fuse = 'M12 10C12 8 11.5 6.5 10 5.75'
// 引信头 (10, 5.75) 转过去以后的位置
const a = Math.PI / 6
const tip = [C[0] + dx + (10 - C[0]) * Math.cos(a) - (5.75 - C[1]) * Math.sin(a), C[1] + dy + (10 - C[0]) * Math.sin(a) + (5.75 - C[1]) * Math.cos(a)]
const sparks = [-80, -25, 30].map(deg => ({ d: ray(tip, deg, 1.75, 3.25), detail: true }))

export default ({ radius }) => [
  tilt(tube(radius)),
  ...bands.map(y => tilt(`M9 ${y}H15`)),
  tilt(fuse),
  ...sparks,
]

// 实心：纸筒一块，两道纸箍挖穿（两头伸出筒外），分成三截；引信、火花照旧是线
export const fill = ({ radius, stroke }) => [
  solid(tilt(tube(radius))),
  knock(bands.map(y => tilt(through([9, y], [15, y], stroke * 2)))),
  tilt(fuse),
  ...sparks,
]
