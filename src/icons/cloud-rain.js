import { solid } from '../solid'
import { cloud } from '../symbols'

// 雨：云 + 三道竖直雨线
export default () => [
  ...cloud([12, 9.5], 2.2),
  'M8 17.5V20.5',
  'M12 17.5V20.5',
  'M16 17.5V20.5',
]

// 实心：云一块，雨线照旧是线；云底（15.5）和雨线之间至少留 0.5 的缝：雨线顶在 17.5，粗字重下线头会贴上云底，那时往下收
export const fill = ({ stroke }) => {
  const top = Math.max(17.5, 16 + stroke)
  return [
    ...solid(cloud([12, 9.5], 2.2)),
    `M8 ${top}V20.5`,
    `M12 ${top}V20.5`,
    `M16 ${top}V20.5`,
  ]
}
