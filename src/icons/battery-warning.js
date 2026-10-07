import { shell } from '../battery'
import { dot } from '../scene'

// 电池警告：电池壳 + 中间感叹号（壳中线在 11，感叹号右移半格落在 11.5 上）
// 点用标准的 dot()：直径随字重缩放，不会比竖线粗；像素对齐时点会单独吸到像素中心，小尺寸下也看得见
export default ({ radius }) => [...shell(radius), 'M11.5 8.75V11.5', dot(11.5, 14)]
