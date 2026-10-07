// 建筑类图标共用的场景约定：都站在同一条地平线上
// 地平线落在 .5 上（线宽 1 时清晰）
export const GROUND = 20.5
export const groundLine = `M2.5 ${GROUND}H21.5`

// 点（窗户、列表圆点、散点等）：零长度路径，用独立的线宽画成实心点，不跟随全局线宽
// 圆头时是圆点，尖角时是方点；size 是点的直径
export const DOT = 2
export const dot = (x, y, size = DOT) => ({ d: `M${x} ${y}h0`, dot: size })
// 眼睛：尖角模式下也是圆点（round），粗字重下不再变大（eye：直径只跟到常规线宽 DOT_STROKE 为止，细字重照常缩小）
// ——方眼和粗体下的大眼都让角色、动物显得呆
export const eye = (x, y, size = DOT) => ({ d: `M${x} ${y}h0`, dot: size, round: true, eye: true })

// 立在地平线上的门/窗洞：三边，底边落在地平线
// h 仍从 y = 20 量起（地平线下移半格前的位置），顶边坐标不变，门洞随地平线长高半格
export const opening = (cx, w, h) => [
  [cx - w / 2, GROUND],
  [cx - w / 2, 20 - h],
  [cx + w / 2, 20 - h],
  [cx + w / 2, GROUND],
]
