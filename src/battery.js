// 电池类图标共用：横放的圆角电池壳 + 右侧正极帽（壳 2.5–19.5，帽到 21.5，整体居中）+ 电量刻度
// 壳的上下边在 6.5 / 16.5（整体上移半格），壳内居中的横线才能落在 11.5 上
import { rounded } from './geometry'

export const shell = radius => [rounded([[2.5, 6.5], [19.5, 6.5], [19.5, 16.5], [2.5, 16.5]], Math.min(radius, 2)), 'M21.5 9.75V13.25']
// 电量：从壳左边一直填到电量位置的实心块，和壳的左半边重合（左侧圆角跟壳一致，填充块也带描边，边缘和壳严丝合缝）；
// 右边界按电量在壳内（2.5–19.5）取比例，再吸到 .5 网格上
export const level = (ratio, radius) => {
  const x = Math.round(2.5 + 17 * ratio - 0.5) + 0.5
  const r = Math.min(radius, 2)
  return { d: rounded([[x, 6.5, 0], [x, 16.5, 0], [2.5, 16.5], [2.5, 6.5]], r), fill: true }
}
