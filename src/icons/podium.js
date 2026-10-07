import { crisp, rounded } from '../geometry'

// 领奖台：中间最高、左边次之、右边最低的三级台阶 + 两道分隔线
// 分隔线的上端落在两个内凹拐角上，这两个角只用 crisp 小圆角，否则圆角把角切掉、分隔线会露出一截
export default ({ radius }) => {
  const r = Math.min(radius, 1)
  return [
    rounded([[2.5, 20.5], [2.5, 12.5], [8.5, 12.5, crisp(radius)], [8.5, 7.5], [15.5, 7.5], [15.5, 15.5, crisp(radius)], [21.5, 15.5], [21.5, 20.5]], r),
    'M8.5 12.5V20.5',
    'M15.5 15.5V20.5',
  ]
}
