import { crisp, rounded } from '../geometry'

// Hugging Face 任务：强化学习。两段首尾相追的弧形箭头围成一个环（智能体和环境之间一轮一轮的交互），环的中心一颗实心五角星（奖励）
// 库里的 refresh 是一段弧 + 一个箭头，repeat 是方的；这里是两段弧、中间有星
// 环：圆心 (12, 12)、半径 7.75，上下两段各 140°，两段之间各空 40° 放箭头；箭头两翼长 3，和前进方向各成 40°
// 五角星：外径 4、内径 1.9（比标准的胖，角更钝），连描边离环的内缘 2 以上
const R = 7.75
const rad = a => a * Math.PI / 180
const f = n => +n.toFixed(3)
const at = (a, r = R) => [f(12 + r * Math.cos(rad(a))), f(12 + r * Math.sin(rad(a)))]
// 从 a0 顺时针画到 a1 的一段弧，末端带箭头
const arc = (a0, a1, radius) => {
  const [s, e] = [at(a0), at(a1)]
  // 末端的前进方向是切线方向 a1 + 90°；两翼从箭头尖往回、各偏 40°
  const wing = d => [f(e[0] + 3 * Math.cos(rad(a1 + 90 + 180 + d))), f(e[1] + 3 * Math.sin(rad(a1 + 90 + 180 + d)))]
  return [`M${s[0]} ${s[1]}A${R} ${R} 0 0 1 ${e[0]} ${e[1]}`, rounded([wing(40), e, wing(-40)], crisp(radius), false)]
}
const star = {
  d: `M${Array.from({ length: 10 }, (_, i) => at(-90 + i * 36, i % 2 ? 1.9 : 4).join(' ')).join('L')}Z`,
  fill: true,
  round: true,
}

// 星在描边版里已经是实心的，实心版和描边版相同，不单独导出 fill
export default ({ radius }) => [...arc(200, 340, radius), ...arc(20, 160, radius), star]
