import { escalator } from './escalator'

// 下行扶梯：扶梯 + 右下角空白里一支和梯身平行、朝左下的半箭头（箭翼在外侧）
export default ({ radius }) => [...escalator(radius), 'M20.5 16.5L16.5 20.5H19']
