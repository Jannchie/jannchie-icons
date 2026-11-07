import { solid } from '../solid'
import { cloud } from '../symbols'

// 毛毛雨：云 + 三道短雨线（比 cloud-rain 短，上下错开）
export default () => [
  ...cloud([12, 9.5], 2.2),
  'M8 17.5V19',
  'M12 19V20.5',
  'M16 17.5V19',
]

// 实心：云一块，雨线照旧是线；云底（15.5）和雨线之间至少留 0.5 的缝：雨线顶在 17.5，粗字重下线头会贴上云底，那时往下收
export const fill = ({ stroke }) => {
  const top = Math.max(17.5, 16 + stroke)
  return [
    ...solid(cloud([12, 9.5], 2.2)),
    `M8 ${top}V19`,
    'M12 19V20.5',
    `M16 ${top}V19`,
  ]
}
