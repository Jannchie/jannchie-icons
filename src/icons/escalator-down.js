import { escalator, escalatorFill } from './escalator'

// 下行扶梯：扶梯 + 右下角空白里一支和梯身平行、朝左下的半箭头（箭翼在外侧）
export default ({ radius }) => [...escalator(radius), 'M20.5 16.5L16.5 20.5H19']

// 实心：扶梯的实心版，箭头照旧是线
export const fill = ({ radius, stroke }) => [...escalatorFill(radius, stroke), 'M20.5 16.5L16.5 20.5H19']
