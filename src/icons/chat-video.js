import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { video, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 对话 + 视频
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(video(center, centerScale * visual.video, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(video(center, centerScale * visual.video, radius)),
])
