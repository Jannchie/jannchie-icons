// 流程 / 审批状态：同一个圆（圆心 (12, 12)、半径 9，和 check-circle 一样）里放不同的内容，键的顺序就是工作流顺序（预览页据此排序）
// 「还没开始」的几种用虚线圆（积压、草稿、已取消），进行中用实心扇形表示进度（一半 / 四分之三），结论用勾、叉
// 圆里的内容离圆至少留 2（圆的描边内沿到内容外沿），粗字重下也分得开
import { circle, rounded } from './geometry'
import { ring } from './marks'
import { dot } from './scene'
import { check, cross } from './symbols'
import { danger, success, warning } from './tone'
import { rotate } from './transform'

const R = 9
const at = deg => `${+(12 + R * Math.cos(deg * Math.PI / 180)).toFixed(3)} ${+(12 + R * Math.sin(deg * Math.PI / 180)).toFixed(3)}`
// 虚线圆：10 段，每段 20°、段间留 16°（弧长约 2.5：粗字重下段与段之间还空 0.5，尖角时方头也碰不到下一段）
const dashed = () => Array.from({ length: 10 }, (_, i) => `M${at(i * 36 - 82)}A${R} ${R} 0 0 1 ${at(i * 36 - 62)}`)
// 进度扇形：半径 5.5，从正上方顺时针扫过 deg 度，填实
const pie = deg => ({
  d: deg >= 360
    ? `${circle(12, 12, 5.5)}Z`
    : `M12 12V6.5A5.5 5.5 0 ${deg > 180 ? 1 : 0} 1 ${+(12 + 5.5 * Math.sin(deg * Math.PI / 180)).toFixed(3)} ${+(12 - 5.5 * Math.cos(deg * Math.PI / 180)).toFixed(3)}Z`,
  fill: true,
})
// 草稿的铅笔：沿左下—右上的对角线，闭合轮廓（尖 + 笔杆），长 9、粗 2.5
const pencil = radius => rotate(rounded([[7.5, 12], [9.25, 10.75], [16.5, 10.75], [16.5, 13.25], [9.25, 13.25]], Math.min(radius, 0.5)), -45)

export const STATUS = {
  // 积压：只有虚线圆
  'backlog': { zh: '积压', paths: () => dashed() },
  // 草稿：虚线圆 + 斜放的铅笔
  'draft': { zh: '草稿', paths: radius => [...dashed(), pencil(radius)] },
  // 待办：空圆
  'todo': { zh: '待办', paths: () => [ring()] },
  // 待处理：圆 + 三个点（在等）
  'pending': { zh: '待处理', paths: () => [ring(), dot(8, 12), dot(12, 12), dot(16, 12)].map(p => (typeof p === 'string' ? p : warning(p))) },
  // 进行中：圆 + 半边扇形
  'in-progress': { zh: '进行中', paths: () => [ring(), warning(pie(180))] },
  // 审核中：圆 + 四分之三扇形
  'in-review': { zh: '审核中', paths: () => [ring(), warning(pie(270))] },
  // 搁置：圆 + 暂停的两道竖线（9.5 / 14.5，落在 .5 上）
  'on-hold': { zh: '搁置', paths: () => [ring(), 'M9.5 8.5V15.5', 'M14.5 8.5V15.5'] },
  // 受阻：圆 + 横条（禁行标志的白条，闭合的扁矩形 7.5–16.5 × 10.5–13.5）
  'blocked': { zh: '受阻', paths: radius => [ring(), danger(rounded([[7.5, 10.5], [16.5, 10.5], [16.5, 13.5], [7.5, 13.5]], Math.min(radius, 1.5)))] },
  // 已批准：圆 + 勾
  'approved': { zh: '已批准', paths: radius => [ring(), ...success(check([12, 12], 1.4, radius))] },
  // 已驳回：圆 + 叉
  'rejected': { zh: '已驳回', paths: radius => [ring(), ...danger(cross([12, 12], 1.6, radius))] },
  // 已取消：虚线圆 + 叉（和驳回区分：没走完流程就作废）
  'cancelled': { zh: '已取消', paths: radius => [...dashed(), ...cross([12, 12], 1.6, radius)] },
}
