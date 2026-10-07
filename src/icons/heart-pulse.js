import { HEART } from './heart'

// 心跳：爱心 + 横穿的心电图折线
export default () => [
  HEART,
  // 两端正好落在爱心轮廓上（y = 11.5），不会被吸歪
  'M3.39 11.5H8L9.5 9L12 14.5L14 10.5L15 11.5H20.61',
]
