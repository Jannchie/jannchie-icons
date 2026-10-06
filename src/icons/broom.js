import { rounded } from '../geometry'
import { rotate } from '../transform'

// 扫帚：长柄 + 梯形扫帚头 + 头顶一道扎绳 + 两道刷毛；竖着画再逆时针转 45°（柄朝左上，\\ 方向）
const t = d => rotate(d, -45)
export default ({ radius }) => [
  t('M12 1.5V10.5'),
  t(rounded([[10.25, 10.5], [13.75, 10.5], [16.75, 19.5], [7.25, 19.5]], Math.min(radius, 1.5))),
  t('M9.9 12.75H14.1'),
  t('M10.5 15.5L10.1 19.5'),
  t('M13.5 15.5L13.9 19.5'),
]
