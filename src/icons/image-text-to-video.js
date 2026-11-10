import { cornerStar, cutLine, lowRange, notched, notchedSolid, polyline } from '../ai'
import { rounded } from '../geometry'
import { hole, knock, solid } from '../solid'

// Hugging Face 任务：图片 + 文本到视频。image-to-video（相框 + 矮山 + 播放三角）再加一颗实心四角星（提示词）
// 和 image-to-video 只差这颗星——这是和用户确认过的取舍。星放不进天空（和三角挤在一起，间隙不到 0.5），
// 所以和 text-to-video 一样放在右上角、压在相框的角上，相框在星的外面断开；三角让到左边
// 山比 image-to-video 的往右挪 3：右端落在相框右边剩下的那一段上（右边从 14 起才有），离那一段的线头 1 以上
// 相框外缘 3–21；三角：竖边在 7.5（细字重下落在 .5 上），尖在 13，高 6.5，离右下的山顶 3 左右
const play = radius => rounded([[7.5, 9], [13, 12.25], [7.5, 15.5]], Math.min(radius, 1))

export default ({ radius, stroke }) => [notched(stroke, radius, 3), polyline(lowRange(stroke, 3), radius), play(radius), cornerStar]

// 实心：相框一块（右上让给星），山脊线挖空并两端穿出框外，三角挖空，星填实
export const fill = ({ radius, stroke }) => [
  notchedSolid(stroke, radius, 3),
  knock(cutLine(lowRange(stroke, 3), stroke)),
  hole(play(radius)),
  solid(cornerStar),
]
