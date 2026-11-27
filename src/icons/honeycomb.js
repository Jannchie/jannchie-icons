import { GAP } from '../clearance'
import { ray, rounded } from '../geometry'
import { solid } from '../solid'

// 蜂巢：七个尖顶朝上的六边形蜂房挨在一起——正中一个，外面围六个（上下各两个、左右各一个）。蜂房对边宽 6（竖边落在 3 / 6 / 9 … 21 上），共用的边只画一次：
// 一圈外轮廓（十八个顶点，外凸的角跟随全局圆角、最多 1，往里凹的角不圆）+ 正中的六边形 + 从它的六个顶点往外伸到外轮廓凹角的六条短边
// 一片挨着的六边形蜂房是蜂巢的记号：和单个的 hexagon、三个圆连成三角的 molecule 区分开
const [cx, cy] = [12, 12]
const W = 6
const R = W / Math.sqrt(3)
const at = (deg, r, [x, y] = [cx, cy]) => [+(x + r * Math.cos(deg * Math.PI / 180)).toFixed(3), +(y + r * Math.sin(deg * Math.PI / 180)).toFixed(3)]
// 外轮廓：外圈第 k 个蜂房（圆心在 60k° 方向、离中心 W）露在外面的两个顶点，接着是它和下一个蜂房之间的凹角（离中心 2R）
const outline = radius => rounded([...Array(6).keys()].flatMap((k) => {
  const c = at(k * 60, W)
  return [at(k * 60 - 30, R, c), at(k * 60 + 30, R, c), [...at(k * 60 + 30, 2 * R), 0]]
}), Math.min(radius, 1))
const core = `M${[...Array(6).keys()].map(k => at(k * 60 - 90, R).join(' ')).join('L')}Z`
const spokes = [...Array(6).keys()].map(k => ray([cx, cy], k * 60 - 90, R, 2 * R))

export default ({ radius }) => [outline(radius), core, ...spokes]

// 实心：七个一样大的正六边形蜂房各画一块，相邻两块之间留 GAP 的缝
// （不是把整片沿共用的边挖开：那样正中的蜂房四周都被挖掉半个线宽、比外圈的小一圈，外圈的又被拉长，像一朵花）
// 蜂房的间距 pitch 取到让最左、最右两块的墨迹外缘和描边版一致（3 − 半个线宽 … 21 + 半个线宽）；
// solid 会沿边外扩半个线宽，所以传进去的六边形先往里收半个线宽
const cell = ([x, y], r, radius) => rounded([...Array(6).keys()].map(k => at(k * 60 - 90, r, [x, y])), radius)
export const fill = ({ radius, stroke }) => {
  const pitch = (3 * W + stroke + GAP) / 3
  const r = (pitch - GAP - stroke) / Math.sqrt(3)
  return solid([[cx, cy], ...[...Array(6).keys()].map(k => at(k * 60, pitch))].map(c => cell(c, r, Math.min(radius, 1))))
}
