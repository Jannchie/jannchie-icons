import { corners } from '../ai'
import { rounded } from '../geometry'
import { solid } from '../solid'

// Hugging Face 任务：目标检测。四个取景角中间一个方框：在画面里框出了一个目标
// 和 focus（四角 + 圆点）、scan-face（四角 + 脸）、zero-shot-object-detection（四角 + 星）靠中间的主体区分
// 取景角外缘 3 / 21；方框外缘 6–18（12 见方 = 16px 下 8 像素），线宽变粗时往里长：和取景角一样都在 3 的整数倍上，
// 离取景角的内缘 1.5（16px 下 1 像素）
const box = (stroke, radius) => {
  const [a, b] = [6 + stroke / 2, 18 - stroke / 2]
  return rounded([[a, a], [b, a], [b, b], [a, b]], Math.min(radius, 1.5))
}

export default ({ radius, stroke }) => [...corners(radius, stroke), box(stroke, radius)]

// 实心：取景角照旧是线，方框填实
export const fill = ({ radius, stroke }) => [...corners(radius, stroke), solid(box(stroke, radius))]
