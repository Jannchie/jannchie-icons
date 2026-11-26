import { num as f } from '../geometry'
import { eye } from '../scene'
import { solid } from '../solid'

// 水壶（炉灶上烧水的鸣笛壶，侧视）：穹顶形的壶身（底 4.5–20.5 在 19.5，顶到 9.5）+ 壶顶一颗小盖钮 + 从两肩拱过壶顶的提梁（顶到约 5）
// + 从壶身左下斜伸到左上的壶嘴
// 横跨壶顶的提梁是水壶的记号：茶壶的把手在侧面、洒水壶是方壶身加长嘴；壶身是圆鼓的穹顶而不是梯形，盖钮落在壶顶上，
// 不像一只手提包或挂锁
const bez = ([p0, p1, p2, p3], t) => [0, 1].map(i => f((1 - t) ** 3 * p0[i] + 3 * (1 - t) ** 2 * t * p1[i] + 3 * (1 - t) * t * t * p2[i] + t ** 3 * p3[i]))
const LEFT = [[4.5, 19.5], [4.5, 13], [8.5, 9.5], [12.5, 9.5]]
const RIGHT = [[12.5, 9.5], [16.5, 9.5], [20.5, 13], [20.5, 19.5]]
const curve = ([, ...ps]) => `C${ps.map(p => p.join(' ')).join(' ')}`
const body = `M${LEFT[0].join(' ')}${curve(LEFT)}${curve(RIGHT)}Z`
// 提梁两端落在壶身轮廓（中心线）上：左半 t = 0.55、右半 t = 0.45，左右对称
const [a, b] = [bez(LEFT, 0.55), bez(RIGHT, 0.45)]
const handle = `M${a.join(' ')}C${a[0]} 4 ${b[0]} 4 ${b.join(' ')}`
const knob = eye(12.5, 8, 1.5)
// 壶嘴：根部在壶身左侧 t = 0.3 处，嘴尖在 (2.75, 12.5)
const spout = `M${bez(LEFT, 0.3).join(' ')}L2.75 12.5`

export default () => [body, handle, knob, spout]

// 实心：壶身一块；提梁、壶嘴照旧是线，盖钮照旧是点
export const fill = () => [solid(body), handle, knob, spout]
