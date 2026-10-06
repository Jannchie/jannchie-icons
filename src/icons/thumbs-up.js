import { crisp, rounded } from '../geometry'

// 点赞：左边袖口小方块（贴手的一侧用 crisp 小圆角，手的线条从角上接出去）
// + 手：拇指斜着竖起、圆头，手掌右上、右下两个圆角，右边略斜
export default ({ radius }) => {
  const r = Math.min(radius, 1.5)
  return [
    rounded([[3, 10.5], [7, 10.5, crisp(radius)], [7, 20.5, crisp(radius)], [3, 20.5]], r),
    'M7 10.5L10.5 4C11 3 13.5 3 14 5L13.5 9.5H19A2 2 0 0 1 21 11.8L19.6 18.8A2 2 0 0 1 17.6 20.5H7',
  ]
}
