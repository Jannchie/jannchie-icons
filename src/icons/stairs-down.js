import { rounded } from '../geometry'
import { solid } from '../solid'
import { steps } from './stairs'

// 下楼：楼梯 + 左上空白处一支朝左下的半箭头（箭翼在上半边）
export default ({ radius }) => [rounded(steps, Math.min(radius, 1)), 'M8.5 4.5L3.5 9.5V6']

// 实心：台阶一块，箭头照旧是线
export const fill = ({ radius }) => [solid(rounded(steps, Math.min(radius, 1))), 'M8.5 4.5L3.5 9.5V6']
