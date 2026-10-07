import { circle } from '../geometry'
import { rotate } from '../transform'

// 蜜蜂：俯视。头是实心圆（圆心 (12, 4.5)、半径 2），两根往外弯的触角从头里伸出（起点藏在填实的头里，尖角时线头不冒出来）；
// 腹部是两侧竖直、底部用软曲线收成尾尖的水滴（8.5–15.5，顶 8.5，竖边到 15，尾尖 (12, 20.5)），两道横纹垂直接在竖边的直线段上（12.5 / 14.5，离尾针拐角留开）；
// 两片椭圆翅膀斜向外上张开，离开身体
const wing = (cx, cy, deg) => rotate(`M${cx - 3.5} ${cy}A3.5 2 0 1 0 ${cx + 3.5} ${cy}A3.5 2 0 1 0 ${cx - 3.5} ${cy}Z`, deg, [cx, cy])
const rad = d => d * Math.PI / 180
const antenna = (deg) => {
  const p = r => `${+(12 + r * Math.cos(rad(deg))).toFixed(3)} ${+(4.5 + r * Math.sin(rad(deg))).toFixed(3)}`
  // 触角微微拱起：二次曲线的控制点在中段、往上抬 0.75
  const c = `${+(12 + 2.5 * Math.cos(rad(deg))).toFixed(3)} ${+(4.5 + 2.5 * Math.sin(rad(deg)) - 0.75).toFixed(3)}`
  return `M${p(1)}Q${c} ${p(4.25)}`
}
export default () => [
  { d: `${circle(12, 4.5, 2)}Z`, fill: true },
  antenna(-130),
  antenna(-50),
  'M8.5 12A3.5 3.5 0 0 1 15.5 12V15C15.5 17.25 13.75 19.25 12 20.5C10.25 19.25 8.5 17.25 8.5 15Z',
  'M8.5 12.5H15.5',
  'M8.5 14.5H15.5',
  wing(5, 10, -25),
  wing(19, 10, 25),
]
