import { oval } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 猕猴桃（切开的半个）：椭圆的果面（半径 9.5 × 8.25）+ 正中一个椭圆的白芯（2.75 × 2.25）+ 贴着白芯的一圈十颗小黑籽（在 5.25 × 4.5 的椭圆上，粗字重下不再变大）
// 白芯 + 紧挨着的一圈籽是猕猴桃的记号：和正圆、大洞、撒彩针的 donut，一半的 orange（半圆 + 放射的瓣）区分开
const [cx, cy] = [12, 12]
const flesh = oval(cx, cy, 9.5, 8.25)
const core = oval(cx, cy, 2.75, 2.25)
const seeds = [...Array(10).keys()].map((i) => {
  const a = (i * 36 - 90) * Math.PI / 180
  return eye(+(cx + 5.25 * Math.cos(a)).toFixed(2), +(cy + 4.5 * Math.sin(a)).toFixed(2), 1.5)
})

export default () => [flesh, core, ...seeds]

// 实心：果面一块，白芯的圈和籽挖空（芯留成实心的一小块）
export const fill = () => [solid(flesh), knock([core, ...seeds])]
