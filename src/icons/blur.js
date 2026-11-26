import { circle } from '../geometry'
import { solid } from '../solid'

// 模糊（修图软件的模糊效果）：圆（圆心 (12, 12)、半径 8.5）+ 竖直径；左半边留白是清晰的部分，右半边换成五道横线（y 6 / 9 / 12 / 15 / 18，行距 3），
// 从直径画到圆周，用细线（thin），右半边比左边的实线轻——实的半圆旁边一半被「打散」成线
// 不用「半圆 + 右边一排横线」（那是车灯的远光标志），也不用点阵（gradient 已经是点阵）；整个圆都在，和半边涂实的 contrast 是一对
const R = 8.5
const rows = [6, 9, 12, 15, 18].map(y => ({ d: `M12 ${y}H${+(12 + Math.sqrt(R * R - (y - 12) ** 2)).toFixed(3)}`, thin: true }))

export default () => [circle(12, 12, R), 'M12 3.5V20.5', ...rows]

// 实心：左半圆填实（清晰的部分），右半圆弧和横线照旧是线
export const fill = () => [
  solid(`M12 3.5A${R} ${R} 0 0 0 12 20.5Z`),
  `M12 3.5A${R} ${R} 0 0 1 12 20.5`,
  ...rows,
]
