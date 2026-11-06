import { music } from '../symbols'
import { solid } from '../solid'

// 音乐：八分音符
export default ({ radius }) => music([12, 12], 2.2, radius)

// 实心：符头填实，符干和符尾照旧是线
export const fill = ({ radius }) => {
  const [head, ...rest] = music([12, 12], 2.2, radius)
  return [solid(head), ...rest]
}
