import { rounded } from '../geometry'

// 爆米花：上宽下窄的纸桶 + 两道竖条纹 + 顶上冒出来的一团爆米花
export default ({ radius }) => [
  rounded([[5, 10], [7, 21], [17, 21], [19, 10]], Math.min(radius, 1.5), false),
  'M5 10H19',
  'M10 10L10.5 21',
  'M14 10L13.5 21',
  'M5 10C4 7.5 6 5.5 8 6.5C8.5 4 11 3 12.5 4.5C14 3 16.5 4 16.5 6.5C18.5 6 20 8 19 10',
]
