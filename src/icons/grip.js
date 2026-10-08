import { dot } from '../scene'

// 拖拽手柄（九点）：三列三行点，行列都是 6 / 12 / 18——行间距和 grip-vertical 一样，再往两边各加一列
export default () => [6, 12, 18].flatMap(y => [6, 12, 18].map(x => dot(x, y)))
