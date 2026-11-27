import { rounded } from '../geometry'
import { rotate } from '../transform'

// 耙子（园艺钉耙）：长柄 + 垂直于柄的横梁 + 横梁下面一排五根短齿（间距 3，粗字重下齿缝还剩 1）；
// 竖着画（柄在 x = 12，横梁 6–18 在 y = 14，齿尖到 18.5），再顺时针转 45°：耙头在左下、柄朝右上（和 shovel 同一个方向）
// 横梁和两头的齿是一笔（冂 形），柄一直穿到中间那根齿的齿尖；靠「一根横梁 + 一排朝前的短齿」认出来：
// 扫帚是一整块梯形的扫帚头，梳子是横放的、没有长柄
const t = d => rotate(d, 45)
const head = radius => t(rounded([[6, 18.5], [6, 14], [18, 14], [18, 18.5]], Math.min(radius, 1), false))
const shaft = t('M12 0V18.5')
const tines = [t('M9 14V18.5'), t('M15 14V18.5')]

// 都是线，没有实心版
export default ({ radius }) => [head(radius), shaft, ...tines]
