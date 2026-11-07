import { cornerCenter } from '../corner'
import { listMark } from '../list'
import { fillParts, plain } from '../shield'
import { badgeFill } from '../solid'

// 盾为主 + 右下角小列表；小列表作为 cut，盾线在附近断开。小列表按实际墨迹贴到右缘 22、下缘 22（和盾的角标同一个角）
export default ({ radius, stroke }) => {
  const mark = c => listMark(c, stroke)
  return [
    ...plain(stroke),
    ...listMark(cornerCenter(mark, 1, radius, stroke, { right: 22, bottom: 22 }), stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
  ]
}

// 实心：盾形填实，在小列表四周让出缝、朝右下整片让掉（行和行之间不剩盾的碎条），再画上小列表；
// 小列表墨迹左缘在 14，让位停在底尖右边，底尖完整
export const fill = ({ radius, stroke }) => {
  const mark = c => listMark(c, stroke)
  return badgeFill(fillParts(radius, stroke), listMark(cornerCenter(mark, 1, radius, stroke, { right: 22, bottom: 22 }), stroke), 'bottom')
}
