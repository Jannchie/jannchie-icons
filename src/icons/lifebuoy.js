import { circle, ray } from '../geometry'
import { hole, knock, solid } from '../solid'

// 救生圈：外圈（半径 9）+ 内圈（半径 3.75）+ 四道斜 45° 的箍带（径向线，两头垂直接在内外圈上）
const [R, r] = [9, 3.75]
const band = (deg, a, b) => ray([12, 12], deg, a, b)
const DEGS = [45, 135, 225, 315]

export default () => [circle(12, 12, R), circle(12, 12, r), ...DEGS.map(deg => band(deg, r, R))]

// 实心：圆环一块（内圈的洞开到内圈的中心线，环比描边版的两圈之间略宽一点，不显得臃肿），四道箍带从洞里一直挖穿到环外，圆环分成四段
export const fill = ({ stroke }) => [
  solid(circle(12, 12, R)),
  hole(circle(12, 12, r - stroke / 2)),
  knock(DEGS.map(deg => band(deg, r - stroke, R + stroke * 2))),
]
