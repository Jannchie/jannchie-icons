import { rounded } from '../geometry'

// 透明的墙：和 wall 同样大小的墙体只剩轮廓（不画砖缝），中间两道斜向的反光线，像一块玻璃——墙变成可以看穿的
export default ({ radius }) => [
  rounded([[3.5, 2.5], [19.5, 2.5], [19.5, 20.5], [3.5, 20.5]], Math.min(radius, 1)),
  'M7.5 12.5L13.5 6.5',
  'M9.5 16.5L15.5 10.5',
]
