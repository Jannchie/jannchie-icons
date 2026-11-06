import { shell } from '../battery'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 电池警告：电池壳 + 中间感叹号（感叹号在壳中线 11 上）
// 点用标准的 dot()：直径随字重缩放，不会比竖线粗；像素对齐时点会单独吸到像素中心，小尺寸下也看得见
export default ({ radius }) => [...shell(radius), 'M11 9.25V12', dot(11, 14.5)]

// 实心：电池壳填实，感叹号挖空，正极帽照旧是线
export const fill = ({ radius }) => {
  const [body, cap] = shell(radius)
  return [solid(body), knock(['M11 9.25V12', dot(11, 14.5)]), cap]
}
