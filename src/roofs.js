// 东方建筑共用的飞檐屋顶：上沿是屋脊（横线），下沿是檐口（横线），两端檐角向外上翘一格
// cx 中心，top / bottom 屋脊与檐口的 y，ridge / eave 屋脊与檐口的半宽；檐角的尖不随全局圆角
import { crisp, rounded } from './geometry'

export const eaves = (cx, top, bottom, ridge, eave, radius) => rounded([
  [cx - eave, bottom, crisp(radius)],
  [cx - eave - 1, bottom - 1, crisp(radius)],
  [cx - ridge, top],
  [cx + ridge, top],
  [cx + eave + 1, bottom - 1, crisp(radius)],
  [cx + eave, bottom, crisp(radius)],
], radius)
