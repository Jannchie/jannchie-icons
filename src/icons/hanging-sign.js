import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 挂牌（酒馆招牌）：顶上一根横杆 + 两根吊链 + 牌子 + 牌上两行字
const arm = 'M3 3.5H21'
const chains = ['M7.5 3.5V8.5', 'M16.5 3.5V8.5']
const board = radius => rounded([[4.5, 8.5], [19.5, 8.5], [19.5, 19.5], [4.5, 19.5]], Math.min(radius, 2))
const text = ['M8.5 12.5H15.5', 'M8.5 15.5H13']

export default ({ radius }) => [arm, ...chains, board(radius), ...text]

// 实心：牌子一块，挖掉字；横杆、吊链照旧是线
export const fill = ({ radius }) => [arm, ...chains, solid(board(radius)), knock(text)]
