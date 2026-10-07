
// 电池（电路符号）：两端引线 + 长短两块极板 + 正负号（细线）
export default ({ radius }) => [
  'M2.5 11.5H9.5',
  'M9.5 5.5V17.5',
  'M13.5 8.5V14.5',
  'M13.5 11.5H21.5',
  { d: 'M5 7.5H8', thin: true },
  { d: 'M6.5 6V9', thin: true },
  { d: 'M16 7.5H19', thin: true },
]
