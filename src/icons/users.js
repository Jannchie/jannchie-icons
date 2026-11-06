import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, solid } from '../solid'

// 多人：前面一人完整，后面一人只露出右半边的头和肩
export default () => [
  circle(9, 9, 3.25),
  'M3 20A6 6 0 0 1 15 20',
  'M15 5.6A3 3 0 1 1 16.5 11.25',
  'M17 14.25A5.5 5.5 0 0 1 21 19.5',
]

// 实心：后面一人补成完整的头（圆心约 (16.4, 8.25)，半径 3，过描边版那段弧的两端）和肩膀（圆心 (15.5, 19.5)、半径 5.5 的半圆）填实，
// 在前面一人四周让出缝，再把前面一人（头、封口的肩膀）填实压在上面
export const fill = () => {
  const front = [circle(9, 9, 3.25), 'M3 20A6 6 0 0 1 15 20Z']
  return [
    solid([circle(16.4, 8.25, 3), 'M10 19.5A5.5 5.5 0 0 1 21 19.5Z']),
    clear(front, GAP),
    solid(front),
  ]
}
