import { base, center, centerScale, fillParts } from '../calendar'
import { video, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 日历 + 视频
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(video(center, centerScale * visual.video, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(video(center, centerScale * visual.video, radius)),
])
