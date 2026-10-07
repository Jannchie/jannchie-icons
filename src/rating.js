// 各国内容分级：每个体系一种外框，框里是放大的线条字母；长的分级（PG-13、MA15+）拆成上下两行
// 外框只用来区分体系（同样写着 12 的，带横栏的方框是 PEGI、圆是韩国），不是照搬各机构的官方标志
import { circle, rounded } from './geometry'
import { line, textWidth } from './letters'

// 外框：shape(radius) 画框，box 是留给文字的区域 [左, 上, 右, 下]
// 外框都撑到画布边缘附近，文字区离外框中心线至少 3（扣掉两边半个线宽后还空 1.5），字不会贴着框
const sq = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
const FRAMES = {
  square: { shape: r => rounded(sq(2.5, 2.5, 21.5, 21.5), Math.min(r, 2.5)), box: [5.5, 5.5, 18.5, 18.5] },
  tall: { shape: r => rounded(sq(3.5, 2.5, 20.5, 21.5), Math.min(r, 2.5)), box: [7, 5, 17, 19] },
  // PEGI 式：方框底部隔出一条横栏，数字在上面
  divided: { shape: r => [rounded(sq(2.5, 2.5, 21.5, 21.5), Math.min(r, 2.5)), 'M2.5 17.5H21.5'], box: [5.5, 5.5, 18.5, 14] },
  wide: { shape: r => rounded(sq(2.5, 4.5, 21.5, 19.5), Math.min(r, 2.5)), box: [5, 8, 19, 16] },
  // 八边形：斜边切掉 5，文字区的四个角离斜边也有 2 以上
  octagon: {
    shape: r => rounded([[7.5, 2.5], [16.5, 2.5], [21.5, 7.5], [21.5, 16.5], [16.5, 21.5], [7.5, 21.5], [2.5, 16.5], [2.5, 7.5]], Math.min(r, 1)),
    box: [5.5, 5.5, 18.5, 18.5],
  },
  // 平顶六边形
  hexagon: { shape: r => rounded([[7, 3.5], [17, 3.5], [22, 12], [17, 20.5], [7, 20.5], [2, 12]], Math.min(r, 1.5)), box: [7, 6.5, 17, 17.5] },
  diamond: { shape: r => rounded([[12, 1.5], [22.5, 12], [12, 22.5], [1.5, 12]], Math.min(r, 1.5)), box: [9.5, 8.5, 14.5, 15.5] },
  // 圆：只放单行，文字区取半径 7 的圆里高 7 的那条横带
  circle: { shape: () => circle(12, 12, 10), box: [6, 8.5, 18, 15.5] },
  // 盾牌：文字放在上半部较宽的地方
  shield: { shape: r => rounded([[3.5, 2.5], [20.5, 2.5], [20.5, 12.5], [12, 21.5], [3.5, 12.5]], Math.min(r, 2)), box: [6.5, 5.25, 17.5, 12.75] },
  // 屋形：尖顶朝上，文字在下面方正的部分
  house: { shape: r => rounded([[12, 2], [21.5, 9.5], [21.5, 21.5], [2.5, 21.5], [2.5, 9.5]], Math.min(r, 2)), box: [5.5, 11, 18.5, 18.5] },
}

// 体系：外框 + 分级列表（文字里的 / 表示换行）；name 用来生成图标名 rating-<体系>-<分级>
export const SYSTEMS = {
  mpa: { frame: 'square', zh: '美国电影 MPA', ratings: ['G', 'PG', 'PG/13', 'R', 'NC/17'] },
  esrb: { frame: 'tall', zh: '北美游戏 ESRB', ratings: ['E', 'E/10+', 'T', 'M', 'AO', 'RP'] },
  pegi: { frame: 'divided', zh: '欧洲游戏 PEGI', ratings: ['3', '7', '12', '16', '18'] },
  bbfc: { frame: 'wide', zh: '英国 BBFC', ratings: ['U', 'PG', '12A', '12', '15', '18', 'R18'] },
  acb: { frame: 'octagon', zh: '澳大利亚 ACB', ratings: ['G', 'PG', 'M', 'MA/15+', 'R/18+', 'X/18+'] },
  eirin: { frame: 'hexagon', zh: '日本电影 映伦', ratings: ['G', 'PG/12', 'R/15+', 'R/18+'] },
  cero: { frame: 'diamond', zh: '日本游戏 CERO', ratings: ['A', 'B', 'C', 'D', 'Z'] },
  kmrb: { frame: 'circle', zh: '韩国电影 KMRB', ratings: ['ALL', '12', '15', '18'] },
  usk: { frame: 'shield', zh: '德国游戏 USK', ratings: ['0', '6', '12', '16', '18'] },
  cadpa: { frame: 'house', zh: '中国游戏 适龄提示', ratings: ['8+', '12+', '16+'] },
}
export const ratingName = (system, text) => `rating-${system}-${text.replace('/', '').replace('+', '').toLowerCase()}`

// 文字用细线（外框的 0.7 倍），和外框拉开层次；字间、行间留 2，粗字重下也不粘连
const GAP = 2
// 结尾的 + 不占一个字位，缩成右上角的角标：臂长 PLUS，和前面的字隔 PLUS_GAP（和字间距一样）
const PLUS = 3
const PLUS_GAP = 2
// 字高上限 7.2（和画质标识一样大）；字宽最多是字高的 0.95 倍，字形偏瘦长更像标牌字
const MAX_SY = 1.2
const ASPECT = 0.95

// 文字排版：rows 是若干行 { chars, plus }，在 box 里求出能放下的最大字号，整体居中
function layout(rows, [x0, y0, x1, y1]) {
  const extra = r => (r.plus ? PLUS_GAP + PLUS : 0)
  const sy = Math.min(MAX_SY, (y1 - y0 - GAP * (rows.length - 1)) / (6 * rows.length))
  // 每行宽度和 sx 成正比（字间距固定），所以按「去掉间距后剩下的宽度 / 单位字宽」求 sx
  const sx = Math.min(sy * ASPECT, ...rows.map(r => (x1 - x0 - extra(r) - GAP * (r.chars.length - 1)) / (textWidth(r.chars, 1, 0))))
  const h = 6 * sy
  const top = (y0 + y1) / 2 - (h * rows.length + GAP * (rows.length - 1)) / 2
  return rows.flatMap((r, i) => {
    const width = textWidth(r.chars, sx, GAP)
    const left = (x0 + x1) / 2 - (width + extra(r)) / 2
    const y = top + i * (h + GAP)
    const out = line(r.chars, [left + width / 2, y + h / 2], sx, GAP, sy)
    if (r.plus) {
      const [px, py] = [left + width + PLUS_GAP + PLUS / 2, y + PLUS / 2]
      out.push(`M${px - PLUS / 2} ${py}H${px + PLUS / 2}M${px} ${py - PLUS / 2}V${py + PLUS / 2}`)
    }
    return out
  })
}

export function rating(system, text, radius) {
  const { shape, box } = FRAMES[SYSTEMS[system].frame]
  const rows = text.split('/').map(r => ({ chars: r.replace('+', ''), plus: r.endsWith('+') }))
  return [shape(radius), ...layout(rows, box).map(d => ({ d, thin: true }))].flat()
}
