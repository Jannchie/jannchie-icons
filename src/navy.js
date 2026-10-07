// 海军舰艇（侧视、舰首朝右）共用的造型：整组水线都在 y = 19.5，船体是「方舰尾 + 前倾斜切的舰首」的梯形
// 舰种靠船长、甲板高度和甲板上的东西区分：炮塔个数和大小、舰桥高低、烟囱、桅杆、飞行甲板、舰岛
// 甲板上的建筑是从甲板升起、再竖直落回甲板的开放折线（两端垂直接在甲板上）；炮塔是闭合形状，底边和甲板重合——都没有斜着落在甲板上的线头
// 间距按粗字重（线宽 2）留：互不相连的东西之间中心距至少 2.25，炮塔高 3（炮管起点离甲板 3）
import { crisp, rounded } from './geometry'

export const WATER = 19.5

// 船体：舰尾 (x0, deck) 往下略收半格到水线，舰首从 (x1, deck) 斜切回水线 rake 格
export const hull = (x0, x1, deck, radius, rake = 2) =>
  rounded([[x0, deck], [x1, deck], [x1 - rake, WATER], [x0 + 0.5, WATER]], crisp(radius))

// 甲板上的建筑：给一串 [x, y] 轮廓点（不含两端落在甲板上的点），首尾自动补到甲板 deck 上
export const block = (deck, pts, radius) =>
  rounded([[pts[0][0], deck], ...pts, [pts.at(-1)[0], deck]], crisp(radius), false)

// 炮塔：从 x 开始宽 w、高 h 的矮墩（闭合），朝向 dir（1 朝舰首、-1 朝舰尾）那一侧前脸斜切半格；
// 炮管从前上角伸出（仰角 30°，长 len），前上角是硬棱，不随全局圆角——圆角会把炮管接的角削掉
export function turret(x, deck, dir, radius, { w = 2.5, h = 3, len = 2.5 } = {}) {
  const back = x
  const front = x + dir * w
  const top = deck - h
  const [sx, sy] = [front - dir * 0.5, top]
  const body = rounded([[back, deck], [back, top], [sx, sy, 0], [front, deck]], crisp(radius))
  const barrel = `M${sx} ${sy}L${sx + dir * len * Math.cos(Math.PI / 6)} ${sy - len * Math.sin(Math.PI / 6)}`
  return [body, barrel]
}
