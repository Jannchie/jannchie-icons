import { circle, rounded } from '../geometry'

// 货车（侧视、车头朝右，和舰艇、坦克一致）：货箱 2.5–14.5 × 5.5–17.5，驾驶室接在货箱前面、前上方一道斜挡风；
// 两个车轮（半径 2.25）压在底边上，作为遮挡刀（occlude），底边在轮子附近断开、轮子里面的那截整段删掉；两轮之间不画底边（否则只剩一小截，像个点）
export default ({ radius }) => [
  rounded([[2.5, 17.5], [2.5, 5.5], [14.5, 5.5], [14.5, 17.5]], Math.min(radius, 1.5), false),
  rounded([[14.5, 9.5], [18.5, 9.5], [21.5, 13.5], [21.5, 17.5], [14.5, 17.5]], Math.min(radius, 1.5), false),
  'M2.5 17.5H9.5',
  { d: circle(7, 17.5, 2.25), cut: true, occlude: true },
  { d: circle(17.5, 17.5, 2.25), cut: true, occlude: true },
]
