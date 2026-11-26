import { rounded } from '../geometry'
import { solid, stacked } from '../solid'

// 冰球：一根冰球杆 + 一枚冰球。球杆一笔画：从刀面顶边 (11, 17.5) 往左到刀尖（两个圆角）、沿刀面底边回到跟部 (9.5, 20.5)，
// 再顺着同一条斜线往右上一直到杆顶 (18.5, 2.5)——刀跟就是杆身的延长，刀面顶边的线头落在杆身中心线上；
// 冰球是右下角一个扁圆柱（顶面椭圆 13.5–20.5 × y 17，侧面高 2.5）。靠"拐成 L 的扁刀杆 + 扁圆饼"认出来。
// 只画冰球；曲棍球（草地）的杆头是圆弯钩、球是小圆球，要另画一个
const shaft = 'M18.5 2.5L11 17.5'
// 刀面的四个角（刀面顶边起点、刀尖两个圆角、跟部）；描边版接着顺杆身画到杆顶，实心版封口成一块
const BLADE = radius => [[11, 17.5], [3.5, 17.5, Math.min(radius, 1.5)], [3.5, 20.5, Math.min(radius, 1.5)], [9.5, 20.5, Math.min(radius, 0.5)]]
const blade = radius => rounded([...BLADE(radius), [18.5, 2.5]], 0, false)
const top = 'M13.5 17A3.5 1.25 0 0 1 20.5 17A3.5 1.25 0 0 1 13.5 17Z'
const side = 'M13.5 17V19.5A3.5 1.25 0 0 0 20.5 19.5V17'

export default ({ radius }) => [blade(radius), top, side]

// 实心：刀面一块，杆身照旧是线；冰球的侧面一块，顶面椭圆完整地压在前面、四周让出 GAP（同 drum 的鼓面）。
// 不从侧面挖一道横穿的缝：缝的线头会伸到杆身上
export const fill = ({ radius }) => [
  solid(rounded(BLADE(radius), 0)),
  shaft,
  ...stacked(`${side}Z`, top),
]
