import { box3d, boxLines, boxSolid, cutLine, polyline } from '../ai'
import { dot } from '../scene'
import { knock } from '../solid'

// Hugging Face 任务：图片到 3D。一张图片（正面：山脊 + 太阳）往右上方「长」出了厚度，成了一个斜二测的盒子
// *-to-3d 一族共用这个盒子（见 ai.js），正面画输入：这里是图片，text-to-3d 是一颗四角星

// 正面上的山脊：两条 45° 斜线，山顶 (7, 15.25)，两端落在正面左边、底边的中心线上；太阳是直径 2 的点
const ridge = (stroke) => {
  const { l, b } = box3d(stroke)
  return [[l, 15.25 + 7 - l], [7, 15.25], [7 + b - 15.25, b]]
}
const sun = dot(11, 13)

export default ({ radius, stroke }) => [...boxLines(stroke, radius), polyline(ridge(stroke), radius), sun]

// 实心：盒子三块；正面上的山脊线两端穿出去，左下的山体自成一块；太阳挖空
export const fill = ({ radius, stroke }) => [...boxSolid(stroke, radius), knock([cutLine(ridge(stroke), stroke), sun])]
