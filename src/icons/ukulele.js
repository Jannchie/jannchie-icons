import { circle, rounded } from '../geometry'
import { hole, solid } from '../solid'
import { rotate } from '../transform'

// 尤克里里：小小的 8 字形琴身（y 10.5–21，宽 8.5–15.5，腰在 y 13.85；比 guitar 的琴身矮一截、琴颈显得更长）+ 音孔 + 琴颈
// + 琴头两侧各伸出两根弦轴（四根弦，细线）；竖着画再逆时针转 45°，琴头朝左上（和 guitar 同向）。
// 靠"小琴身 + 长琴颈 + 四根弦轴"和 guitar（大琴身、光琴头、有琴桥）、lute（梨形、折角弦轴箱）区分开。
// 琴身小，放不下琴桥：音孔 (12, 16.5) 离腰和底边都留出 2 以上的中心距，琴桥再加进去就挤了
const t = d => rotate(d, -45)
const body = 'M12 10.5C10.5 10.5 9.5 11.4 9.5 12.6C9.5 13.2 9.75 13.5 9.6 13.85C8.85 14.4 8.5 15.4 8.5 16.9C8.5 19.3 10 21 12 21C14 21 15.5 19.3 15.5 16.9C15.5 15.4 15.15 14.4 14.4 13.85C14.25 13.5 14.5 13.2 14.5 12.6C14.5 11.4 13.5 10.5 12 10.5Z'
const neck = 'M12 10.5V4.75'
const head = radius => rounded([[10.75, 1], [13.25, 1], [13.25, 4.75], [10.75, 4.75]], Math.min(radius, 0.75))
// 弦轴：琴头两侧各两根短横线，间距 1.75（琴头 y 1–4.75，和 guitar 的琴头顶一样高）
const pegs = ['M10.75 2H9.5', 'M10.75 3.75H9.5', 'M13.25 2H14.5', 'M13.25 3.75H14.5'].map(d => ({ d: t(d), detail: true }))

export default ({ radius }) => [t(body), t(circle(12, 16.5, 1.25)), t(neck), t(head(radius)), ...pegs]

// 实心：琴身、琴头各一块；音孔挖成圆洞（外扩半个线宽后和描边版音孔的中心线一样大）；琴颈和弦轴照旧是线
export const fill = ({ radius, stroke }) => [
  solid(t(body)),
  hole(t(circle(12, 16.5, 1.25 - stroke / 2))),
  t(neck),
  solid(t(head(radius))),
  ...pegs,
]
