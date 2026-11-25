import { crisp, rounded } from '../geometry'
import { hole, solid } from '../solid'

// 三角尺：直角在左下的等腰直角三角形（直角边 4.5 / 19.5，各长 16）+ 靠近直角的一个同形的三角孔（7.5–13 × 11–16.5）
const outer = radius => rounded([[4.5, 3.5, crisp(radius)], [4.5, 19.5], [20.5, 19.5, crisp(radius)]], Math.min(radius, 1.5))
// 三角孔：直角顶点 (x, y)、直角边长 a；d 是整体往里收的距离
const cutout = (d = 0) => {
  const [x, y, a] = [7.5, 16.5, 5.5]
  const k = d * (1 + Math.SQRT2)
  return [[x + d, y - a + k], [x + d, y - d], [x + a - k, y - d]]
}

export default ({ radius }) => [outer(radius), rounded(cutout(), crisp(radius))]

// 实心：三角尺一块，三角孔挖成洞（和描边版三角孔的内缘一样大；粗字重下孔小，最多收 1.25）
export const fill = ({ radius, stroke }) => [solid(outer(radius)), hole(rounded(cutout(Math.min(stroke, 1.25)), 0))]
