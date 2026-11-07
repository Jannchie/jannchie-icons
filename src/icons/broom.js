import { rounded, through } from '../geometry'
import { knock, solid } from '../solid'
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

// 实心：扫帚头一块，挖掉扎绳和两道刷毛；扎绳两端横着穿出头的两侧，头顶分出一整截绑带；
// 刷毛顺着自己的方向穿出底边，缝在底边真正敞开（停在底边中线上的线帽只擦到外缘，会留一道细桥）；长柄照旧是线
export const fill = ({ radius }) => [
  solid(t(rounded([[10.25, 10.5], [13.75, 10.5], [16.75, 19.5], [7.25, 19.5]], Math.min(radius, 1.5)))),
  knock([t('M7 12.75H17'), t(through([10.5, 15.5], [10.1, 19.5], 0, 3)), t(through([13.5, 15.5], [13.9, 19.5], 0, 3))]),
  t('M12 1.5V10.5'),
]
