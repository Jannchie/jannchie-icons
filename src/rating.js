// 各国内容分级：每个体系一种外框，框里是放大的线条字母；长的分级（PG-13、MA15+）拆成上下两行
// 外框只用来区分体系（同样写着 12 的，方框是 PEGI、八边形是韩国），不是照搬各机构的官方标志
import { circle, rounded } from './geometry'
import { line } from './letters'

// 外框：shape(radius) 画框，box 是留给文字的区域 [左, 上, 右, 下]
const FRAMES = {
  square: { shape: r => rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(r, 2.5)), box: [5.5, 6, 18.5, 18] },
  tall: { shape: r => rounded([[5, 2.5], [19, 2.5], [19, 21.5], [5, 21.5]], Math.min(r, 2.5)), box: [6.5, 5, 17.5, 19] },
  // PEGI 式：方框底部隔出一条横栏，数字在上面
  divided: {
    shape: r => [rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(r, 2.5)), 'M3.5 16.5H20.5'],
    box: [5.5, 5.5, 18.5, 14.5],
  },
  circle: { shape: () => circle(12, 12, 9.5), box: [6, 7, 18, 17] },
  wide: { shape: r => rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(r, 2.5)), box: [4.5, 7.5, 19.5, 16.5] },
  hexagon: { shape: r => rounded([[7.25, 3.5], [16.75, 3.5], [21.5, 12], [16.75, 20.5], [7.25, 20.5], [2.5, 12]], Math.min(r, 1.5)), box: [6.5, 6.5, 17.5, 17.5] },
  diamond: { shape: r => rounded([[12, 2], [22, 12], [12, 22], [2, 12]], Math.min(r, 1.5)), box: [8.5, 8.5, 15.5, 15.5] },
  octagon: {
    shape: r => rounded([[8.5, 2.5], [15.5, 2.5], [21.5, 8.5], [21.5, 15.5], [15.5, 21.5], [8.5, 21.5], [2.5, 15.5], [2.5, 8.5]], Math.min(r, 1)),
    box: [5.5, 6.5, 18.5, 17.5],
  },
  // 盾牌：文字放在上半部较宽的地方
  shield: { shape: r => rounded([[4, 3], [20, 3], [20, 12.5], [12, 21.5], [4, 12.5]], Math.min(r, 2)), box: [6, 5.5, 18, 13.5] },
  // 屋形：尖顶朝上，文字在下面方正的部分
  house: { shape: r => rounded([[12, 2.5], [21, 9.5], [21, 20.5], [3, 20.5], [3, 9.5]], Math.min(r, 2)), box: [5.5, 10.5, 18.5, 18.5] },
}

// 体系：外框 + 分级列表（文字里的 / 表示换行）；name 用来生成图标名 rating-<体系>-<分级>
export const SYSTEMS = {
  mpa: { frame: 'square', zh: '美国电影 MPA', ratings: ['G', 'PG', 'PG/13', 'R', 'NC/17'] },
  esrb: { frame: 'tall', zh: '北美游戏 ESRB', ratings: ['E', 'E/10+', 'T', 'M', 'AO', 'RP'] },
  pegi: { frame: 'divided', zh: '欧洲游戏 PEGI', ratings: ['3', '7', '12', '16', '18'] },
  bbfc: { frame: 'circle', zh: '英国 BBFC', ratings: ['U', 'PG', '12A', '12', '15', '18', 'R18'] },
  acb: { frame: 'wide', zh: '澳大利亚 ACB', ratings: ['G', 'PG', 'M', 'MA/15+', 'R/18+', 'X/18+'] },
  eirin: { frame: 'hexagon', zh: '日本电影 映伦', ratings: ['G', 'PG/12', 'R/15+', 'R/18+'] },
  cero: { frame: 'diamond', zh: '日本游戏 CERO', ratings: ['A', 'B', 'C', 'D', 'Z'] },
  kmrb: { frame: 'octagon', zh: '韩国电影 KMRB', ratings: ['ALL', '12', '15', '18'] },
  usk: { frame: 'shield', zh: '德国游戏 USK', ratings: ['0', '6', '12', '16', '18'] },
  cadpa: { frame: 'house', zh: '中国游戏 适龄提示', ratings: ['8+', '12+', '16+'] },
}
export const ratingName = (system, text) => `rating-${system}-${text.replace('/', '').replace('+', '').toLowerCase()}`

// 字间、行间留 2.25：减去细节线宽（封顶 1.5）后还有空隙，字母不粘连
const GAP = 2.25
// 字高、字宽的上限：和画质标识的字一样大，字少时不会撑得过大
const MAX_SY = 1.2
const MAX_SX = 1.2

export function rating(system, text, radius) {
  const { shape, box: [x0, y0, x1, y1] } = FRAMES[SYSTEMS[system].frame]
  const rows = text.split('/')
  const sy = Math.min(MAX_SY, (y1 - y0 - GAP * (rows.length - 1)) / (6 * rows.length))
  const sx = Math.min(MAX_SX, sy * 1.1, ...rows.map(r => (x1 - x0 - GAP * (r.length - 1)) / (3.5 * r.length)))
  const h = 6 * sy
  const top = (y0 + y1) / 2 - (h * rows.length + GAP * (rows.length - 1)) / 2
  return [
    shape(radius),
    ...rows.flatMap((r, i) => line(r, [(x0 + x1) / 2, top + h / 2 + i * (h + GAP)], sx, GAP, sy)).map(d => ({ d, detail: true })),
  ].flat()
}
