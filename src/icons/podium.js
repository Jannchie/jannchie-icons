import { crisp, rounded } from '../geometry'

// 领奖台：中间最高、左边次之、右边最低的三级台阶 + 两道分隔线；整体 y 5.5–18.5，上下居中
// 分隔线的上端落在两个内凹拐角上，这两个角只用 crisp 小圆角，否则圆角把角切掉、分隔线会露出一截
export default ({ radius }) => {
  const r = Math.min(radius, 1)
  return [
    rounded([[2.5, 18.5], [2.5, 10.5], [8.5, 10.5, crisp(radius)], [8.5, 5.5], [15.5, 5.5], [15.5, 13.5, crisp(radius)], [21.5, 13.5], [21.5, 18.5]], r),
    'M8.5 10.5V18.5',
    'M15.5 13.5V18.5',
  ]
}
