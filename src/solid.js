// 实心变体（图标文件里的 export const fill）用的路径标记，规则见 fill.js
// 单独成文件、只依赖 clearance.js 的间隙常量：图标文件会打进发布包，不能因为写了 fill 就把 fill.js（Clipper2）带进去
import { GAP } from './clearance'

const mark = props => p => (Array.isArray(p) ? p.map(mark(props)) : typeof p === 'string' ? { d: p, ...props } : { ...p, ...props })

// 实心块：闭合区域 + 沿边外扩半个线宽（外缘和描边版同一条路径的外缘一致）
export const solid = mark({ fill: true })
// 挖掉一条线：减掉这条线描边的形状（线宽规则和描边版一样，detail / badge / thin 都认）
export const knock = mark({ knock: true })
// 挖掉一块区域：减掉闭合区域 + 半个线宽外扩；想要的洞比描边版的内框小时，传一个往里收过的轮廓
export const hole = mark({ knock: true, fill: true })
// 给角标让位：挖掉这些路径的墨迹再外扩 gap，闭合的部分（圆圈、云朵）连内部一起挖。挖完再把角标本身画回去
// sweep：[sx, sy] 时让位区再朝这个外角方向拖到画布外（见 fill.js 的 swept）
export const clear = (paths, gap, sweep) => mark({ knock: true, clear: gap, ...(sweep ? { sweep } : {}) })(paths)

// ---------- 系列图标（文件夹、文件、对话……）的实心版 ----------
// 各系列模块给出 fillParts(radius, stroke) = { body, lines }：body 是实心主体（solid、knock、hole），lines 是要保持完整的线
// （挂环、立杆、提手），最后画，不被角标的留缝、居中符号的挖空切断
export const plainFill = ({ body, lines }) => [...body, ...lines]
// 角标：主体在角标四周让出 GAP 的缝（和描边版断线的间隙一样），再把角标画回去，看起来是角标外面一圈细描边
// corner（'bottom' 右下、'top' 右上）：角标压在主体的外角上时，角标和外角之间的主体整片让掉，不剩细条；不传就只留一圈缝
const SWEEP = { bottom: [1, 1], top: [1, -1] }
export const badgeFill = ({ body, lines }, badge, corner) => [...body, clear(badge, GAP, SWEEP[corner]), ...lines, ...badge]
// 居中符号：从主体里挖掉
export const centerFill = ({ body, lines }, symbol) => [...body, knock(symbol), ...lines]
