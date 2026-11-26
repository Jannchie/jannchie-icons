import { num as f, rounded } from '../geometry'
import { catHead, dot, eye } from '../scene'
import { knock, stacked } from '../solid'

// 招财猫：坐着的正面全身。头沿用 cat 的造法（扁椭圆 + 两只 softEar 软耳朵），缩小到圆心 (9, 9.5)、半径 5.5 × 4.5，两只眼睛是实心点；
// 头压在身子前面（遮挡刀），身子是上窄下宽的梯形（侧边 4.75 → 3.25、13.25 → 14.75，底边坐在 20.5），胸前一道项圈弧挂一颗铃铛；
// 右边一条粗胳膊从身侧弯上去，举在头旁边（16.5–20.5 × 3.5–17.5，和脸之间隔 2），圆头的上端就是爪子；胳膊画在头后面、被头挡住一截（隔开画的话，一条空心的粗条贴在身侧像杯子把手）。举起的爪子是记号：没有它就是 cat 坐着
const head = catHead([9, 9.5], 5.5, 4.5)
const eyes = [eye(6.75, 9.5, 2), eye(11.25, 9.5, 2)]

// 身子两侧：(4.75, 12) → (3.25, 20.5)、(13.25, 12) → (14.75, 20.5)；side(y) 给出这一高度上左右两侧的 x
const [top, bottom] = [12, 20.5]
const side = y => [4.75 - 1.5 * (y - top) / (bottom - top), 13.25 + 1.5 * (y - top) / (bottom - top)].map(f)
const torso = radius => rounded([[4.75, top], [3.25, bottom], [14.75, bottom], [13.25, top]], Math.min(radius, 1.5), false)
const collar = `M${side(14.5)[0]} 14.5Q9 16.5 ${side(14.5)[1]} 14.5`
const bell = { ...dot(9, 17.75), round: true }
// 举起的胳膊：一条宽 4 的粗条（16.5–20.5），上端圆头是爪子，两条边都接在身子右侧（y = 15.5 / 17.5）；里侧那条边被头挡住一截
const arm = `M${side(15.5)[1]} 15.5C16 15 16.5 13 16.5 11V5.5A2 2 0 0 1 20.5 5.5V12C20.5 15.5 18 17.5 ${side(17.5)[1]} 17.5`

export default ({ radius }) => [
  torso(radius),
  arm,
  collar,
  bell,
  { d: head, cut: true, occlude: true },
  ...eyes.map(e => ({ ...e, cut: true })),
]

// 实心：身子连着举起的胳膊一块在后、头在前（头四周让出 GAP 的缝），眼睛挖空；项圈挖成一道弧、铃铛挖成圆点
export const fill = ({ radius }) => [
  ...stacked([`${torso(radius)}Z`, `${arm}Z`], head),
  knock([...eyes, collar, bell]),
]
