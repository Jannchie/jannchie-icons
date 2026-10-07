// 魔法棒：左下到右上的一根棒子，棒头外侧一圈放射状的短光线 + 中心一点
// 光芒中心在 (14.5, 9.5)：横竖光线都落在 .5 上；左下方向留给棒子，不画光线
const [cx, cy] = [14.5, 9.5]
const ray = (dx, dy, from = 3.5, to = 5.5) => `M${cx + dx * from} ${cy + dy * from}L${cx + dx * to} ${cy + dy * to}`
const s = Math.SQRT1_2

export default () => [
  'M3 21L11.5 12.5',
  ray(0, -1),
  ray(0, 1),
  ray(-1, 0),
  ray(1, 0),
  ray(s, -s, 3.25, 5.25),
  ray(s, s, 3.25, 5.25),
  ray(-s, -s, 3.25, 5.25),
  `M${cx} ${cy}h0`,
]
