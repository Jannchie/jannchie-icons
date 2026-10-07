// 坦克类图标共用：侧视、炮口朝右，履带底边都落在 y = 20.5（和建筑的地平线同高）
// 履带是两头半圆的长条（高 5，顶边 15.5），里面一排负重轮用点画
// 车体、炮塔都是闭合多边形，底边和下面那条线重合——没有落在别的线上的线头，尖角（方头）下也不会冒头；
// 车体底边只占履带的直线段（两端落在端头半圆的起点上），外伸的部分用斜边往上收，不悬在半圆上方留一道窄缝
// 间距按粗字重（线宽 2）留：互不相连的线中心距至少 2.25
import { rounded } from './geometry'
import { dot } from './scene'

export const TRACK_TOP = 15.5
export const TRACK_BOTTOM = 20.5
const R = (TRACK_BOTTOM - TRACK_TOP) / 2

// 履带：x0–x1 是两端的外沿；n 个负重轮在中线上均分（首尾两个落在端头半圆的圆心）
// 负重轮的点直径 WHEEL：点随字重等比放大，粗字重下点和履带之间也要留出 0.75，不然拥挤检测会把整条履带调细
const WHEEL = 1
export function track(x0, x1, n) {
  const [a, b] = [x0 + R, x1 - R]
  const cy = TRACK_TOP + R
  return [
    `M${a} ${TRACK_TOP}H${b}A${R} ${R} 0 0 1 ${b} ${TRACK_BOTTOM}H${a}A${R} ${R} 0 0 1 ${a} ${TRACK_TOP}Z`,
    ...Array.from({ length: n }, (_, i) => dot(a + (b - a) * i / (n - 1), cy, WHEEL)),
  ]
}

// 车体、炮塔：闭合多边形；拐角圆角封顶 1，斜面才不会被削没
// 炮管接在拐角上时，那个点写成 [x, y, 0]：这个角不随全局圆角变圆（炮盾的硬棱），炮管才接得上、不会被吸歪
export const body = (points, radius) => rounded(points, Math.min(radius, 1))
