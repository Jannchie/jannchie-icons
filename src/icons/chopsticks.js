import { solid } from '../solid'

// 筷子：一双筷子从右上斜放到左下，每根是一条细长的楔形（后端半宽 0.75，往筷尖收成一点），两根往筷尖收拢
// 后粗前尖的楔形是筷子的记号：两条等粗的平行线会看成等号或斜杠
const f = v => +v.toFixed(3)
// 从后端 a 到筷尖 b、后端半宽 w 的楔形（筷尖收成一点）
const wedge = ([ax, ay], [bx, by], w) => {
  const l = Math.hypot(bx - ax, by - ay)
  const [nx, ny] = [-(by - ay) / l, (bx - ax) / l]
  return `M${f(ax + nx * w)} ${f(ay + ny * w)}L${f(bx)} ${f(by)}L${f(ax - nx * w)} ${f(ay - ny * w)}Z`
}
const sticks = [wedge([18, 3.25], [3, 19.5], 0.75), wedge([20.75, 6], [4.5, 21], 0.75)]

export default () => sticks

// 实心：和描边版一样（筷子本来就细，描边已经是实的）
export const fill = () => [solid(sticks)]
