import { crisp, rounded } from '../geometry'

// 点赞：左边袖口小方块（贴手的一侧用 crisp 小圆角，手的线条从角上接出去）
// + 手：拇指斜着竖起、圆头，手掌顶边和袖口顶边对齐在 10.5，右边略斜，右上、右下两个圆角跟随圆角设置
// 手掌用 rounded() 生成，圆角和两边相切；整体左右 3.5–20.5 对称
export default ({ radius }) => {
  const r = Math.min(radius, 1.5)
  const thumb = 'M7.5 10.5L10.5 4C11 3 13.5 3 14 5L13.5 10.5'
  const palm = rounded([[13.5, 10.5], [20.5, 10.5], [19, 20.5], [7.5, 20.5]], Math.min(radius, 2), false)
  return [
    rounded([[3.5, 10.5], [7.5, 10.5, crisp(radius)], [7.5, 20.5, crisp(radius)], [3.5, 20.5]], r),
    thumb + palm.replace(/^M[^A-Z]+/i, ''),
  ]
}
