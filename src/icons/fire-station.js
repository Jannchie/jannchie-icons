import { rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'

// 消防站：平顶车库，两扇卷帘门各一道横缝；屋顶正中一座带四坡顶（顶点 2.5，坡高 2：再高尖顶就出了安全边）的瞭望钟楼（高 5），楼里挂一口小钟——
// 钟楼矮了钟会上下贴边
export default ({ radius }) => [
  groundLine,
  rounded([[3.5, GROUND], [3.5, 9.5], [9.5, 9.5]], radius, false),
  rounded([[14.5, 9.5], [20.5, 9.5], [20.5, GROUND]], radius, false),
  rounded([[9.5, 9.5], [9.5, 4.5], [14.5, 4.5], [14.5, 9.5]], radius, false),
  rounded([[8.5, 4.5], [12, 2.5], [15.5, 4.5]], radius, false),
  'M9.5 9.5H14.5',
  dot(12, 7, 1.5),
  rounded(opening(8, 5, 6.5), radius, false),
  rounded(opening(16, 5, 6.5), radius, false),
  { d: 'M5.5 16.5H10.5M13.5 16.5H18.5', thin: true },
]
