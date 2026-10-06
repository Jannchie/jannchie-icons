// 知识共享（Creative Commons）许可元素：和版权 © 一样的圆环（r = 9），里面放各自的符号
// 斜杠（NC、公有领域）是刀：穿过的符号在它两边真正断开，不会叠成一团
import { circle, rounded } from './geometry'
import { glyph } from './letters'
import { ring } from './marks'

const D = 9 * Math.SQRT1_2
// 贯穿圆环的斜杠：左上到右下，两端落在圆环上
const slash = { d: `M${12 - D} ${12 - D}L${12 + D} ${12 + D}`, cut: true }
// 小写 c：半径 2.5，开口朝右（上下各留 45°）
const c = (cx, r = 2.5) => {
  const k = r * Math.SQRT1_2
  return `M${cx + k} ${12 - k}A${r} ${r} 0 1 0 ${cx + k} ${12 + k}`
}
// 圆环里的线条字形：1.5 倍（5.25 × 9），以 (12, 12) 为中心
const small = (ch, dx = 0) => glyph(ch, 12 - 2.625 + dx, 7.5, 1.5)

export const CC = {
  // CC：圆环里两个小写 c
  'cc': { zh: '知识共享 CC', paths: () => [ring(), c(8.85), c(15.15)] },
  // BY 署名：小人（圆头 + 方身 + 一条腿宽的下身）
  'cc-by': {
    zh: '署名 BY',
    paths: radius => [
      ring(),
      circle(12, 7.5, 1.5),
      rounded([[9, 10.5], [15, 10.5], [15, 14.25], [13.5, 14.25], [13.5, 17.5], [10.5, 17.5], [10.5, 14.25], [9, 14.25]], Math.min(radius, 0.75)),
    ],
  },
  // NC 非商业：美元符号被斜杠划掉；欧元、日元版本同理
  'cc-nc': { zh: '非商业 NC', paths: () => [ring(), small('S'), 'M12 5.5V18.5', slash] },
  'cc-nc-eu': { zh: '非商业 NC（欧元）', paths: () => [ring(), small('C', 1), 'M7.5 11H13.5M7.5 13.5H13.5', slash] },
  'cc-nc-jp': { zh: '非商业 NC（日元）', paths: () => [ring(), small('Y'), 'M9 13H15M9 15.75H15', slash] },
  // SA 相同方式共享：开口朝左的圆弧箭头，箭头在上端、朝下
  'cc-sa': {
    zh: '相同方式共享 SA',
    paths: () => {
      const r = 4.25
      const [x, y] = [12 - r * Math.cos(Math.PI / 6), r * Math.sin(Math.PI / 6)]
      return [ring(), `M${x} ${12 - y}A${r} ${r} 0 1 1 ${x} ${12 + y}`, `M${x - 2} ${12 - y - 1.75}L${x} ${12 - y + 0.25}L${x + 2} ${12 - y - 1.75}`]
    },
  },
  // ND 禁止演绎：等号
  'cc-nd': { zh: '禁止演绎 ND', paths: () => [ring(), 'M8 10.25H16M8 13.75H16'] },
  // CC0：放大的 0，中间一道斜线
  'cc-zero': { zh: 'CC0 放弃权利', paths: () => [ring(), glyph('0', 9.375, 7.5, 1.5), 'M13.25 9.75L10.75 14.25'] },
  // 公有领域：版权的 C 被斜杠划掉
  'public-domain': { zh: '公有领域', paths: () => [ring(), 'M14.5 9.75A3.25 3.25 0 1 0 14.5 14.25', slash] },
  // Copyleft：反过来的 ©
  'copyleft': { zh: 'Copyleft', paths: () => [ring(), 'M9.5 9.75A3.25 3.25 0 1 1 9.5 14.25'] },
}
