import { rounded } from '../geometry'
import { fillParts, folder } from '../folder'
import { plainFill } from '../solid'

// 文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
]

export const fill = ({ radius, stroke }) => plainFill(fillParts(radius, stroke))
