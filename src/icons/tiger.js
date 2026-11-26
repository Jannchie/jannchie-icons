import { earedHead, num as f } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'
import { mirror } from '../transform'

// 老虎：正面头像，和 bear 同一种做法：圆脑袋（圆心 (12, 13)、半径 8）和两只小圆耳朵（圆心 (6, 6) / (18, 6)、半径 2.5）是一条闭合轮廓；
// 记号是条纹：额头三道从头顶轮廓往下的短纹，两颊各两道从脸侧轮廓往里的短纹（都从轮廓的中心线上起笔）；两只眼睛、三角鼻头、ω 形嘴
// 和 chinese-zodiac-tiger（额头「王」字、胡须伸到脸外）区分开：这里不写字、没有胡须，条纹长在轮廓上
const [hx, hy, R] = [12, 13, 8]
const [ex, ey, r] = [6, 6, 2.5]
const head = earedHead([hx, hy], R, [ex, ey], r)
// 条纹起点都在大圆上：x 由 y 反算
const edge = y => f(hx - Math.sqrt(R * R - (y - hy) ** 2))
const cheek = [`M${edge(11.5)} 11.5L6.75 12.25`, `M${edge(15)} 15L6.75 14.5`]
// 额头两侧那两道的起点：大圆上 x = 12 ∓ 2.5 处
const brow = f(hy - Math.sqrt(R * R - 2.5 ** 2))
const stripes = ['M12 5V8', `M9.5 ${brow}L9.75 7.25`, `M14.5 ${brow}L14.25 7.25`, ...cheek, ...cheek.map(d => mirror(d))]
const features = [eye(9.25, 11.25), eye(14.75, 11.25), { d: 'M11 14.75H13L12 16Z', fill: true }, 'M10.25 17.25Q11.125 18.25 12 17.25Q12.875 18.25 13.75 17.25']

export default () => [head, ...stripes, ...features]

// 实心：脑袋连耳朵一块；条纹从轮廓上往里挖出缺口（条纹是老虎的记号，挖成从边上切进来的白纹），眼睛、鼻头、嘴挖空（尖角模式下也按圆头挖）
export const fill = () => [solid(head), knock([...stripes, ...features].map(p => (typeof p === 'string' ? { d: p, round: true } : { ...p, round: true })))]
