import { rounded } from '../geometry'

// 暂停：两根竖条
// 竖条宽 4、间隔 3，四条竖边都落在 .5 上
const bar = x => [[x, 5], [x + 4, 5], [x + 4, 19], [x, 19]]

export default ({ radius }) => [
  rounded(bar(6.5), radius),
  rounded(bar(13.5), radius),
]
