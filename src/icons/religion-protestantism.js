import { HEART } from './heart'

// 新教：路德玫瑰的简化——外圈一环，环里一颗心，心里一个小十字
const fmt = n => String(Math.round(n * 1000) / 1000)
// HEART 是 24 网格上的绝对坐标、数字成对：按 (12, 12.25) 缩放 k 后移到 (cx, cy)
const scaled = (k, cx, cy) => {
  let i = 0
  return HEART.replace(/-?\d+(?:\.\d+)?/g, n => fmt(i++ % 2 ? cy + (n - 12.25) * k : cx + (n - 12) * k))
}

export default () => [
  'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0',
  scaled(0.62, 12, 12.4),
  { d: 'M12 9.5V14.5M10 11.25H14', thin: true },
]
