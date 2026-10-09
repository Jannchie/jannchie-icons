import { rounded } from '../geometry'
import { mirror } from '../transform'

// 双筒望远镜（平面）：左右两根镜筒，各是窄目镜（4.5–8.5 × 4.5–8.5）+ 向下外扩的梯形镜筒（棱镜望远镜的剪影，
// 顶 3.5–9.5、底 2.5–10.5，8.5–20.5），两筒之间一块铰链。只画左半边，右半边按 x = 12 镜像
// 不画镜片：直筒 + 横线读起来像酒瓶，筒里的小圆像眼睛——外扩的镜筒加目镜本身就够认出是望远镜
const half = radius => [
  rounded([[4.5, 8.5], [4.5, 4.5], [8.5, 4.5], [8.5, 8.5]], Math.min(radius, 1), false),
  rounded([[3.5, 8.5], [9.5, 8.5], [10.5, 20.5], [2.5, 20.5]], Math.min(radius, 1.5)),
]

export default ({ radius }) => {
  const left = half(radius)
  // 铰链：两根横杆（y 11 / 14），两端接在两侧镜筒斜边上（斜边在 y 11 处 x ≈ 9.71、y 14 处 ≈ 9.96），
  // 不画闭合小块：小块的竖边贴着斜边，粗字重下糊成一团、尖角模式下角还会冒出去
  const edge = y => +(9.5 + (y - 8.5) / 12).toFixed(3)
  return [...left, ...left.map(d => mirror(d)), ...[11, 14].map(y => `M${edge(y)} ${y}H${24 - edge(y)}`)]
}
