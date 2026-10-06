
// 电池（电路符号）：两端引线 + 长短两块极板 + 正负号（细线）
export default ({ radius }) => [
  'M2.5 12H9.5',
  'M9.5 6V18',
  'M14 9V15',
  'M14 12H21.5',
  { d: 'M5 7.5H8', thin: true },
  { d: 'M6.5 6V9', thin: true },
  { d: 'M16 7.5H19', thin: true },
]
