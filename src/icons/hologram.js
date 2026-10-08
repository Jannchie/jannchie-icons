import { rounded } from '../geometry'

// 全息投影：底部一台投影座（y = 20.5 上的短横线 8.5–15.5），向上张开两道光束，托着一个悬浮的线框立方体
// 立方体：30° 等距，中轴 x = 12，半宽 5（三条竖棱落在 7 / 12 / 17），顶 2.5、底 14
// 光束从投影座两端上方 (9.5, 18.5) / (14.5, 18.5) 斜向外射到 (6, 13.5) / (18, 13.5)，用细线（thin）和立方体的实线区分
const [cx, hw, top, bottom] = [12, 5, 2.5, 14]
const dy = +(hw * Math.tan(Math.PI / 6)).toFixed(3)
export default ({ radius }) => [
  rounded([[cx, top], [cx + hw, top + dy], [cx + hw, bottom - dy], [cx, bottom], [cx - hw, bottom - dy], [cx - hw, top + dy]], Math.min(radius, 1)),
  `M${cx - hw} ${top + dy}L${cx} ${top + 2 * dy}L${cx + hw} ${top + dy}`,
  `M${cx} ${top + 2 * dy}V${bottom}`,
  'M8.5 20.5H15.5',
  { d: 'M9.5 18.5L6 13.5', thin: true },
  { d: 'M14.5 18.5L18 13.5', thin: true },
]
