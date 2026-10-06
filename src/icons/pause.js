import { rounded } from '../geometry'

// 暂停：两根竖条
const bar = x => [[x, 5], [x + 3.5, 5], [x + 3.5, 19], [x, 19]]

export default ({ radius }) => [
  rounded(bar(6.5), radius),
  rounded(bar(14), radius),
]
