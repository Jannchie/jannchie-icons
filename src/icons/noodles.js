import { solid } from '../solid'

// 面条（一碗面，筷子夹起一把面）：一只大碗（碗口 3–21 在 13.5，碗底到 20.5）+ 碗口上方一双从右上伸过来的筷子（两根往左收拢，筷尖在左边）
// + 从下面那根筷子上垂下来的三缕波浪面条（落在碗口上）。夹起来、悬在半空的面条是记号，和筷子斜插在碗里、冒热气的拉面区分开
const bowl = 'M3 13.5H21C21 17.75 17 20.5 12 20.5C7 20.5 3 17.75 3 13.5Z'
const chopsticks = ['M7 6L21 2.75', 'M7 8.5L21 6.5']
// 下面那根筷子：y = 8.5 − (x − 7) / 7
const low = x => +(8.5 - (x - 7) / 7).toFixed(3)
const STRANDS = [9, 12, 15]
const noodles = STRANDS.map(x => `M${x} ${low(x)}C${x - 1.25} ${low(x) + 1.75} ${x + 1.25} ${low(x) + 3} ${x} 13.5`)

export default () => [bowl, ...chopsticks, ...noodles]

// 实心：碗一块；筷子、面条照旧是线
export const fill = () => [solid(bowl), ...chopsticks, ...noodles]
