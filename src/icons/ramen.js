import { solid } from '../solid'

// 拉面：一只大碗（碗口 3–21 在 11.5，碗底到 20.5）+ 斜插在碗里的一双筷子（两根平行，伸向右上）+ 左边两缕热气
const bowl = 'M3 11.5H21C21 16.75 17.25 20.5 12 20.5C6.75 20.5 3 16.75 3 11.5Z'
const chopsticks = ['M12 11.5L17 3.5', 'M15.5 11.5L20.5 3.5']
const steam = ['M6 8.5C5 7 7 6 6 4.5', 'M9.5 8.5C8.5 7 10.5 6 9.5 4.5']

export default () => [bowl, ...chopsticks, ...steam]

// 实心：碗一块；筷子、热气照旧是线
export const fill = () => [solid(bowl), ...chopsticks, ...steam]
