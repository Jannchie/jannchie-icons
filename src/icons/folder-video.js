import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { video, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 视频文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(video(center, centerScale * visual.video, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(video(center, centerScale * visual.video, radius)),
])
