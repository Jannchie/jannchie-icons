// 电池类图标共用：横放的圆角电池壳 + 右侧正极帽（壳 2.5–19.5，帽到 21.5，整体居中）+ 三格电量
import { rounded } from './geometry'

export const shell = radius => [rounded([[2.5, 7], [19.5, 7], [19.5, 17], [2.5, 17]], Math.min(radius, 2)), 'M21.5 10.25V13.75']
// 电量：壳内居中的一条横线，像进度条一样用长度表示电量（1 = 满电，6 → 16）；
// 只用一根普通线宽的线，和外壳之间留足空白，不画内框、不画竖条
export const level = ratio => `M6 12H${6 + 10 * ratio}`
