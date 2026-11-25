import { circle } from '../geometry'
import { mirror } from '../transform'

// 钳子（钳口朝上）：上面两片合拢的钳口（实心的尖头块，中间留一道缝）+ 钳口底下的轴（小圆，圆心 (12, 11.5)、半径 1.75）
// + 从轴的两侧往下撇开的两根弯把手。钳口在描边版里也是实心的：每片只有 2 宽，画成空心的框里面只剩一条缝，粗字重和小尺寸下会糊死
// 没有单独的实心版，实心变体直接用描边版
const jaw = 'M10.75 9.75L8.75 4.75C8.5 4 9 3.25 9.75 3.25H10.75Z'
const handle = 'M10.75 12.75C9.25 14.5 7.5 16.5 7.5 20.75'

export default () => [
  ...[jaw, mirror(jaw)].map(d => ({ d, fill: true })),
  circle(12, 11.5, 1.75),
  handle,
  mirror(handle),
]
