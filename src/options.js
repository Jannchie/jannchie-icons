// 图标的可选参数：圆角档位、字重档位。预览站和核心包共用
// 圆角：尖角（方头线帽 + 斜接转角）或 0–3 的圆角半径
export const CORNERS = [
  { label: 'sharp', radius: 0, sharp: true },
  { label: '0', radius: 0 },
  { label: '1', radius: 1 },
  { label: '2', radius: 2 },
  { label: '3', radius: 3 },
]
// 字重：三档，默认「常规」线宽 1.5；1、1.5、2 配合像素对齐在高清屏上横竖线清晰
export const WEIGHTS = [
  { id: 'light', stroke: 1 },
  { id: 'regular', stroke: 1.5 },
  { id: 'bold', stroke: 2 },
]

// 把用户写的参数换成档位：radius 是 'sharp' 或 0–3 的数字，weight 是档位名
export function resolveOptions({ radius = 2, weight = 'regular' } = {}) {
  const corner = CORNERS.find(c => (radius === 'sharp' ? c.sharp : !c.sharp && c.radius === radius))
  const w = WEIGHTS.find(x => x.id === weight)
  if (!corner)
    throw new RangeError(`Unknown radius: ${JSON.stringify(radius)}. Expected 'sharp', 0, 1, 2 or 3.`)
  if (!w)
    throw new RangeError(`Unknown weight: ${JSON.stringify(weight)}. Expected ${WEIGHTS.map(x => `'${x.id}'`).join(', ')}.`)
  return { corner, weight: w }
}
