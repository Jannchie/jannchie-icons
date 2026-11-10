import { corners, star4 } from '../ai'
import { solid } from '../solid'

// Hugging Face 任务：零样本目标检测。四个取景角（检测框）中间一颗实心四角星：框住的不是预先学过的类别，而是「说什么找什么」
// 和 object-detection（四角 + 中间一个框）、focus（四角 + 圆点）、scan-face（四角 + 脸）靠中间的主体区分；
// zero-shot-* 一族共用这颗星；取景角见 ai.js（外缘 3 / 21，3 的整数倍：细字重和 16px 下四条边都清晰）
// 星：尖到中心 6（连描边 5.25–18.75），四个尖伸进取景角之间的空当；腰略放宽（0.5），大星不显得干瘦
const star = star4(12, 12, 6, 0.5)

export default ({ radius, stroke }) => [...corners(radius, stroke), star]

// 实心：和描边版一样——取景角是线，星是实心块
export const fill = ({ radius, stroke }) => [...corners(radius, stroke), solid(star)]
