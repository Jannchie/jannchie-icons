import { ring } from '../marks'
import { rotate } from '../transform'

// 排球：圆 + 三道从中心甩到球边的主缝（每 120° 一道）；每道主缝中段分出一道伴缝，顺着往外延伸到球边，
// 夹在相邻两道主缝之间、彼此不交叉——合起来就是排球那三条带状的面板
const seam = 'M12 12C11 9 11 5.5 12 3'
const branch = 'M11.25 7.5C14.5 7.25 17.75 8 20.75 10'
export default () => [
  ring(),
  ...[0, 120, 240].flatMap(a => [rotate(seam, a), rotate(branch, a)]),
]
