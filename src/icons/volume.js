import { rounded } from '../geometry'
import { speaker } from '../media'

// 音量：喇叭 + 两道 ±45° 的声波弧
const c = [13, 12]
const wave = r => {
  const d = r * Math.SQRT1_2
  return `M${c[0] + d} ${c[1] - d}A${r} ${r} 0 0 1 ${c[0] + d} ${c[1] + d}`
}

export default ({ radius }) => [
  rounded(speaker, radius),
  wave(3.5),
  wave(7),
]
