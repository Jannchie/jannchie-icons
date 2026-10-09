import { crisp, rounded } from '../geometry'

// 点击：比普通光标小一号的箭头（约 0.85 倍，左边竖直、右上边 45°，尾巴斜伸）+ 尖端外三道放射短线
// 普通光标高 17，原样摆进来再加短线会顶到画布边，所以箭头单独画：尖端 (9.5, 7)，左边竖线在 9.5、底边横线在 16.5（细字重下落在像素上），尾巴最低到 21；尾巴宽约 2.6，粗字重下中间也留缝
const [tx, ty] = [9.5, 7]
const pointer = [[0, 0], [0, 12.5], [3, 9.75], [5, 14], [7.5, 13.25], [5.75, 9.5], [9.5, 9.5]].map(([x, y]) => [tx + x, ty + y])
// 三道短线以箭头尖的角平分线方向（-112.5°，往左上偏）为中心，左右各张开 45°；
// 中间那道离尖端 3.25 起（尖角模式下尖端的斜接尖角伸出约 2，也留得出缝），两侧离尖端 3 起，都到 4.75 止
const ray = (deg, from) => {
  const a = deg * Math.PI / 180
  const p = r => `${+(tx + r * Math.cos(a)).toFixed(3)} ${+(ty + r * Math.sin(a)).toFixed(3)}`
  return `M${p(from)}L${p(4.75)}`
}

export default ({ radius }) => [
  rounded(pointer.map((p, i) => (i === 0 ? [...p, crisp(radius)] : p)), Math.min(radius, 1)),
  ray(-112.5, 3.25),
  ray(-67.5, 3),
  ray(-157.5, 3),
]
