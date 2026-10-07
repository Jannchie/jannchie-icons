import { rounded } from '../geometry'

// 沙盘：从 30° 等距视角看的一块地形切块——台座的左右两个侧面 + 前面两条台面边，
// 台面后半的两条边换成起伏的山脊线：左角 (4.5, 12) 起，主峰 (9.5, 4)、鞍部 (12.5, 8.5)、次峰 (15, 6)，落到右角 (20.5, 12)
// 台座中轴 x = 12.5、半宽 8（三条竖棱落在 4.5 / 12.5 / 20.5），台面前角 (12.5, 16.6)，侧面厚 4
const [cx, hw, cy, t] = [12.5, 8, 12, 4]
const dy = +(hw * Math.tan(Math.PI / 6)).toFixed(3)
export default ({ radius }) => [
  rounded([[cx - hw, cy], [9.5, 4], [12.5, 8.5], [15, 6], [cx + hw, cy], [cx + hw, cy + t], [cx, cy + dy + t], [cx - hw, cy + t]], Math.min(radius, 1)),
  `M${cx - hw} ${cy}L${cx} ${cy + dy}L${cx + hw} ${cy}`,
  `M${cx} ${cy + dy}V${cy + dy + t}`,
]
