import { cornerCenter } from '../corner'
import { listMark } from '../list'
import { plain } from '../shield'

// 盾为主 + 右下角小列表；小列表作为 cut，盾线在附近断开。小列表按实际墨迹贴到右缘 22、下缘 22（和盾的角标同一个角）
export default ({ radius, stroke }) => {
  const mark = c => listMark(c, stroke)
  return [
    ...plain(stroke),
    ...listMark(cornerCenter(mark, 1, radius, stroke, { right: 22, bottom: 22 }), stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
  ]
}
