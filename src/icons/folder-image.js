import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { image, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 图片文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(image(center, centerScale * visual.image, radius)),
]

// 实心：主体填实，挖掉居中的符号。太阳和山形线尖角模式下也挖成圆头：山形线两端落在相框的中心线上，
// 方头会从相框挖出的缝外侧冒出一个小尖；方的太阳点在粗字重下贴到相框上
export const fill = ({ radius, stroke }) => {
  const [frame, ...inner] = accent(image(center, centerScale * visual.image, radius))
  return centerFill(fillParts(radius, stroke), [frame, ...inner.map(p => (typeof p === 'string' ? { d: p, round: true } : { ...p, round: true }))])
}
