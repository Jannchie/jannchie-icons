import { circle } from '../geometry'
import { rotate, scale } from '../transform'

// 手持话筒（卡拉 OK / 舞台）：球形网罩（中间一道网纹）+ 网罩下的收口 + 往下收窄的手柄；
// 竖着画再逆时针转 45°（网罩朝左上），放大 1.1 倍填满格子
const t = d => scale(rotate(d, -45), 1.1)
export default () => [
  t(circle(12, 6, 4)),
  t('M8.1 6.75H15.9'),
  t('M9.5 9.25L10 11.5H14L14.5 9.25'),
  t('M10 11.5L11 21H13L14 11.5'),
]
