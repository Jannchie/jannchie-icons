import { rounded } from '../geometry'
import { solid } from '../solid'

// 小恶魔的尾巴（万圣节、恶作剧）·箭头尖：尾尖是主角——一枚占了右上小半张画面的箭头形尾尖
// （尖朝上偏右，底边往里凹成两个倒钩），一条 S 形的尾巴从凹口接进去、甩到左下。黑桃尖的版本见 devil-tail-spade
// 尾尖的朝向从正上方往右偏 TILT 度
export const TILT = 20
const [SIN, COS] = [Math.sin(TILT * Math.PI / 180), Math.cos(TILT * Math.PI / 180)]
// 尾尖的坐标系：tip 是尖端，u 从尖端沿朝向往回量，p 垂直于它
export const frame = tip => (u, p = 0) => [+(tip[0] - u * SIN + p * COS).toFixed(3), +(tip[1] + u * COS + p * SIN).toFixed(3)]
// 尾巴：从尾尖的凹口（离尖端 u 处）顺着尾尖的朝向直着接出来一段（lead：起手那段控制柄的长度），往下弯到底、再往左甩上去
export const tail = (at, u, lead) => `M${at(u).join(' ')}C${at(u + lead).join(' ')} 16.5 17.25 13.25 19.6C10.25 21.75 5 21.4 2.75 16.5`

const at = frame([19.6, 2.6])
const [LEN, BARB, HALF] = [7, 9.75, 5.25] // 尖端到凹口、到两个倒钩的距离，倒钩的半宽
const tip = radius => rounded([at(0), at(BARB, HALF), at(LEN), at(BARB, -HALF)], Math.min(radius, 0.5))
const line = tail(at, LEN, 4.25)

export default ({ radius }) => [tip(radius), line]

// 实心：尾尖填实，尾巴照旧是线
export const fill = ({ radius }) => [solid(tip(radius)), line]
