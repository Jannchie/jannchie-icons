import { polyline } from '../ai'
import { circle } from '../geometry'
import { knock, solid } from '../solid'

// Hugging Face 任务：视觉文档检索。一个大放大镜，镜片里是一行文字和一道山脊：在图文并茂的页面里找东西
// 库里的 file-search-badge 是文件 + 右下角一个小放大镜；这里放大镜是主体，页面内容在镜片里
// 镜片：圆心 (10.5, 10.5)，外缘半径 7.5（墨迹 3–18），线宽变粗时往里长；手柄 45° 伸到右下，墨迹到 21
// 镜片里：一行字（y 7.5，墨迹 7.5–13.5），下面一道 45° 的山脊（两个山头），离镜片内缘 1 以上
const lens = stroke => `${circle(10.5, 10.5, 7.5 - stroke / 2)}Z`
const handle = (stroke) => {
  const h = stroke / 2
  const s = +(10.5 + (7.5 - h) * Math.SQRT1_2).toFixed(3)
  return `M${s} ${s}L${21 - h} ${21 - h}`
}
const page = radius => ['M8.25 7.5H12.75', polyline([[7.75, 13.25], [9.75, 11.25], [11.5, 13], [13.25, 11.25]], radius)]

export default ({ radius, stroke }) => [lens(stroke), handle(stroke), ...page(radius)]

// 实心：镜片填实，里面的字和山脊挖空；手柄照旧是线
export const fill = ({ radius, stroke }) => [solid(lens(stroke)), knock(page(radius)), handle(stroke)]
