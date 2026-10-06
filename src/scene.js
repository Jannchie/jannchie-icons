// 建筑类图标共用的场景约定：都站在同一条地平线上
export const GROUND = 20
export const groundLine = `M2.5 ${GROUND}H21.5`

// 点（窗户、列表圆点、散点等）：零长度路径，用独立的线宽画成实心点，不跟随全局线宽
// 圆头时是圆点，尖角时是方点；size 是点的直径
export const DOT = 2
export const dot = (x, y, size = DOT) => ({ d: `M${x} ${y}h0`, dot: size })

// 立在地平线上的门/窗洞：三边，底边落在地平线
export const opening = (cx, w, h) => [
  [cx - w / 2, GROUND],
  [cx - w / 2, GROUND - h],
  [cx + w / 2, GROUND - h],
  [cx + w / 2, GROUND],
]
