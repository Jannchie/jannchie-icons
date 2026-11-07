import { off, offFill } from '../off'
import { knock, solid } from '../solid'
import { image } from '../symbols'
import base from './image'

// 无图片
export default off(base)

// 实心：方框填实，太阳挖空。山的右坡和斜线平行、只隔 2.6，让出缝以后两者之间剩一根细条：右坡不挖，山体一直填到斜线的缝，
// 读作斜线挡在山的右坡前；左坡挖穿——往左穿出框的左边，往右上顺着方向延长到斜线上（左坡正好垂直于斜线，切口两边平行于缝）
export const fill = offFill(({ radius }) => {
  const [frame, sun] = image([12, 12], 2.4, radius)
  const [x0, y0, px, py] = image([12, 12], 2.4, 0)[2].match(/-?[\d.]+/g).map(Number)
  const foot = (px + py) / 2
  return [solid(frame), knock([`M${x0 - 1.5} ${y0 + 1.5}L${foot} ${foot}`, sun])]
})
