import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { music, visual } from '../symbols'
import { accent } from '../tone'

// 音乐文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(music(center, centerScale * visual.music, radius)),
]
