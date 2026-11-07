// 实心变体（图标文件里的 export const fill）用的路径标记，规则见 fill.js
// 单独成文件、只依赖 clearance.js 的间隙常量和 geometry.js：图标文件会打进发布包，不能因为写了 fill 就把 fill.js（Clipper2）带进去
import { GAP } from './clearance'
import { rounded } from './geometry'

const mark = props => p => (Array.isArray(p) ? p.map(mark(props)) : typeof p === 'string' ? { d: p, ...props } : { ...p, ...props })

// 实心块：闭合区域 + 沿边外扩半个线宽（外缘和描边版同一条路径的外缘一致）
export const solid = mark({ fill: true })
// 挖掉一条线：减掉这条线描边的形状（线宽规则和描边版一样，detail / badge / thin 都认）
export const knock = mark({ knock: true })
// 挖掉一块区域：减掉闭合区域 + 半个线宽外扩；想要的洞比描边版的内框小时，传一个往里收过的轮廓
export const hole = mark({ knock: true, fill: true })
// 挖掉一块精确的区域：闭合区域原样挖掉，不外扩（缝的两端要平行于外框、形状自己算好时用）
export const cutout = mark({ knock: true, fill: true, exact: true })
// 给角标让位：挖掉这些路径的墨迹再外扩 gap，闭合的部分（圆圈、云朵）连内部一起挖。挖完再把角标本身画回去
// sweep：[sx, sy] 时让位区再朝这个外角方向拖到画布外（见 fill.js 的 swept）
export const clear = (paths, gap, sweep) => mark({ knock: true, clear: gap, sweep })(paths)
// 叠放的几块（从下往上）：每块先在下面的块上让出 GAP 的缝，再把自己画上去——每块的轮廓完整，缝和交界线平行
// 圆柱的顶面、叠起来的几层用它：顶面是完整的椭圆，下面一层的上沿顺着椭圆让开，而不是挖一道两头带线帽的弧
export const stacked = (...pieces) => pieces.flatMap((p, i) => (i ? [clear(p, GAP), solid(p)] : [solid(p)]))

// ---------- 并排的独立部件（领奖台的三个柱子、九宫格、分栏布局的几个窗格……） ----------
// 描边版里这些部件共用边，实心版不用一道缝把一整块切开（切开那一侧的拐角是直的，外侧却是圆的），
// 而是每个部件各画一块完整的圆角块，块和块之间留 GAP 的缝
// tile：按墨迹范围 [x0, y0, x1, y1] 原样画一块（不外扩），radius 是墨迹拐角的半径——窄条、小格子可以收到半个线宽以下，
// 不会因为外扩半个线宽圆成胶囊
export const tile = ([x0, y0, x1, y1], radius) => mark({ fill: true, exact: true })(rounded([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], radius))
// spans：描边版的外框中心线 from–to 被分割线（中心线 cuts）分成几段，每段的墨迹范围 [a, b]：
// 两头是外框的外缘（中心线外半个线宽），分割线处各让出半个 GAP
export function spans(from, to, cuts, stroke) {
  const edges = [from - stroke / 2, ...cuts.flatMap(c => [c - GAP / 2, c + GAP / 2]), to + stroke / 2]
  return cuts.concat(0).map((_, i) => [edges[2 * i], edges[2 * i + 1]])
}

// ---------- 系列图标（文件夹、文件、对话……）的实心版 ----------
// 各系列模块给出 fillParts(radius, stroke) = { body, lines }：body 是实心主体（solid、knock、hole），lines 是要保持完整的线
// （挂环、立杆、提手），最后画，不被角标的留缝、居中符号的挖空切断
export const plainFill = ({ body, lines }) => [...body, ...lines]
// 角标：主体在角标四周让出 GAP 的缝（和描边版断线的间隙一样），再把角标画回去，看起来是角标外面一圈细描边
// corner（'bottom' 右下、'top' 右上）：角标压在主体的外角上时，角标和外角之间的主体整片让掉，不剩细条；不传就只留一圈缝
const SWEEP = { bottom: [1, 1], top: [1, -1] }
// 角标四周的缝按真实距离外扩（圆角连接）：尖角模式下斜接会在箭头尖、对勾拐角外拉出尖刺
export const badgeFill = ({ body, lines }, badge, corner) => [...body, mark({ round: true })(clear(badge, GAP, SWEEP[corner])), ...lines, ...badge]
// 居中符号：从主体里挖掉
export const centerFill = ({ body, lines }, symbol) => [...body, knock(symbol), ...lines]
