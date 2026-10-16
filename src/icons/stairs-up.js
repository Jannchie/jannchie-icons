import { rounded } from '../geometry'
import { steps } from './stairs'

// 上楼：楼梯 + 左上空白处一支朝右上的半箭头（箭翼在顶边，同 arrow-up-right-half）
export default ({ radius }) => [rounded(steps, Math.min(radius, 1)), 'M3.5 9.5L8.5 4.5H5']
