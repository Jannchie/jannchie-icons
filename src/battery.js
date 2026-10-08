// 电池类图标共用：横放的圆角电池壳 + 右侧正极帽（壳 2.5–19.5，帽到 21.5，整体居中）+ 电量刻度
// 壳的上下边在 7 / 17，上下居中于 12
import { rounded } from './geometry'

export const shell = radius => [rounded([[2.5, 7], [19.5, 7], [19.5, 17], [2.5, 17]], Math.min(radius, 2)), 'M21.5 10.25V13.75']
// 电量：从壳左边一直填到电量位置的实心块，和壳的左半边重合（左侧圆角跟壳一致，填充块也带描边，边缘和壳严丝合缝）；
// 右边界按电量在壳内（2.5–19.5）取比例，再吸到 .5 网格上
export const level = (ratio, radius) => {
  const x = Math.round(2.5 + 17 * ratio - 0.5) + 0.5
  const r = Math.min(radius, 2)
  // 填满时右边就是壳的右边：右侧两个角也跟壳一样圆，不然直角会从壳的圆角外面冒出来
  const rx = x >= 19.5 ? r : 0
  return { d: rounded([[x, 7, rx], [x, 17, rx], [2.5, 17], [2.5, 7]], r), fill: true }
}
