import { rotate } from '../transform'

// 扳手：一整条外轮廓。圆形扳手头（顶部切出 U 形开口）+ 胶囊形手柄；先竖直画，再顺时针转 45°，扳手头朝右上
const [cx, cy, r] = [12, 6.5, 4.5] // 扳手头
const hw = 1.75 // 手柄半宽
const jaw = 1.5 // 开口半宽
const join = cy + Math.sqrt(r * r - hw * hw) // 手柄与扳手头的交接高度
const lip = cy - Math.sqrt(r * r - jaw * jaw) // 开口两侧落在圆上的高度
const bottom = 19.25

const outline = `M${cx - hw} ${join}`
  + `A${r} ${r} 0 0 1 ${cx - jaw} ${lip}`
  + `L${cx - jaw} ${cy}L${cx + jaw} ${cy}L${cx + jaw} ${lip}`
  + `A${r} ${r} 0 0 1 ${cx + hw} ${join}`
  + `L${cx + hw} ${bottom}A${hw} ${hw} 0 0 1 ${cx - hw} ${bottom}Z`

export default () => [rotate(outline, 45)]
