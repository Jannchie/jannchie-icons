import { escalator } from './escalator'

// 上行扶梯：扶梯 + 右下角空白里一支和梯身平行、朝右上的半箭头（x + y = 37，箭翼在外侧，离梯身斜边 x + y = 33 留出间隙）
export default ({ radius }) => [...escalator(radius), 'M16.5 20.5L20.5 16.5V19']
