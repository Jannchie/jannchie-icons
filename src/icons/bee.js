import { circle } from '../geometry'
import { rotate } from '../transform'

// 蜜蜂：俯视。头是实心圆（圆心 (12, 4.5)、半径 2），两根触角沿半径方向从头里伸出（起点藏在填实的头里，尖角时线头不冒出来）；
// 腹部是两侧竖直、底部收成尾针的胶囊（8.5–15.5，顶 8.5，竖边到 16，尾针尖 (12, 20.5)），两道横纹垂直接在竖边的直线段上（12.5 / 14.5，离尾针拐角留开）；
// 两片椭圆翅膀斜向外上张开，离开身体
const wing = (cx, cy, deg) => rotate(`M${cx - 3.5} ${cy}A3.5 2 0 1 0 ${cx + 3.5} ${cy}A3.5 2 0 1 0 ${cx - 3.5} ${cy}Z`, deg, [cx, cy])
const rad = d => d * Math.PI / 180
const antenna = (deg) => {
  const p = r => `${+(12 + r * Math.cos(rad(deg))).toFixed(3)} ${+(4.5 + r * Math.sin(rad(deg))).toFixed(3)}`
  return `M${p(1)}L${p(4)}`
}
export default () => [
  { d: `${circle(12, 4.5, 2)}Z`, fill: true },
  antenna(-130),
  antenna(-50),
  'M8.5 12A3.5 3.5 0 0 1 15.5 12V16L12 20.5L8.5 16Z',
  'M8.5 12.5H15.5',
  'M8.5 14.5H15.5',
  wing(5, 10, -25),
  wing(19, 10, 25),
]
