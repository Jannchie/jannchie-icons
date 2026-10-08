import { dot } from '../scene'

// 横向拖拽手柄：grip-vertical 转 90°——三列（6 / 12 / 18）两行（9 / 15）点
export default () => [9, 15].flatMap(y => [6, 12, 18].map(x => dot(x, y)))
