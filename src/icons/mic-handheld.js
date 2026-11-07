import { circle } from '../geometry'
import { knock, solid } from '../solid'
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

// 实心：网罩、收口、手柄填实；网纹挖穿网罩两侧，网罩的上半成了单独的一块；收口和手柄之间挖开一道缝
export const fill = ({ stroke }) => [
  solid([t(circle(12, 6, 4)), t('M9.5 9.25L10 11.5H14L14.5 9.25Z'), t('M10 11.5L11 21H13L14 11.5Z')]),
  knock([t(`M${8.1 - stroke} 6.75H${15.9 + stroke}`), t(`M${10 - 2 * stroke} 11.5H${14 + 2 * stroke}`)]),
]
