import { GAP } from '../clearance'
import { clear } from '../solid'
import phone, { fill as phoneFill } from './phone'

// 通话中：听筒 + 右上两道声波（圆心 (14, 10)，半径 3.5 / 6.5 的四分之一圆弧）
export default () => [
  ...phone(),
  'M14 6.5A3.5 3.5 0 0 1 17.5 10',
  'M14 3.5A6.5 6.5 0 0 1 20.5 10',
]

// 实心：听筒填实，声波照旧是线
// 声波离听筒很近，尖角粗字重下斜接的尖角会戳到听筒上：听筒在声波四周让出 GAP 的缝（按真实距离外扩，不拉出尖刺）
export const fill = () => {
  const waves = ['M14 6.5A3.5 3.5 0 0 1 17.5 10', 'M14 3.5A6.5 6.5 0 0 1 20.5 10']
  return [...phoneFill(), ...clear(waves, GAP).map(p => ({ ...p, round: true })), ...waves]
}
