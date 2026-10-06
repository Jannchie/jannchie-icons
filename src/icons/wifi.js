import { dot } from '../scene'

// WiFi：底部一个点 + 往上三道同心圆弧（左右各张开 45°）
const [cx, cy] = [12, 18.5]
const arc = (r) => {
  const d = r * Math.SQRT1_2
  return `M${cx - d} ${cy - d}A${r} ${r} 0 0 1 ${cx + d} ${cy - d}`
}

export default () => [arc(3.75), arc(7.5), arc(11.25), dot(cx, cy, 2.5)]
