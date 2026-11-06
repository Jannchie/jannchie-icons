// 武器共用：竖着画的剑（剑尖朝上），图标里再旋转
import { circle } from './geometry'
import { solid } from './solid'

export const sword = [
  'M10.5 15V5L12 2.5L13.5 5V15',
  'M8 15H16',
  'M12 15V19.5',
  circle(12, 20.75, 1.25),
]

// 实心：剑身封口填实、剑首填实，护手和剑柄照旧是线
export const swordFill = [
  solid('M10.5 15V5L12 2.5L13.5 5V15Z'),
  'M8 15H16',
  'M12 15V19.5',
  solid(circle(12, 20.75, 1.25)),
]
