import { rounded } from '../geometry'
import { solid } from '../solid'

// 降落伞：上圆下扇的伞衣（3–21，顶到 3，下沿是四段往上拱的小弧，尖点在 3 / 7.5 / 12 / 16.5 / 21，下沿 11.5）
// + 三根伞绳（从两端尖点和正中尖点收到下面货箱的顶边）+ 小货箱（9.5–14.5 × 17.5–20.5）
// 扇形下沿 + 往下收拢的伞绳是记号，和 hot-air-balloon（球囊收口、竖吊绳）、umbrella（伞柄）分开
const canopy = 'M3 11.5C3 6.5 7 3 12 3C17 3 21 6.5 21 11.5C19.5 10.25 18 10.25 16.5 11.5C15 10.25 13.5 10.25 12 11.5C10.5 10.25 9 10.25 7.5 11.5C6 10.25 4.5 10.25 3 11.5Z'
const lines = 'M3 11.5L9.5 17.5M21 11.5L14.5 17.5M12 11.5V17.5'
const crate = radius => rounded([[9.5, 17.5], [14.5, 17.5], [14.5, 20.5], [9.5, 20.5]], Math.min(radius, 1))

export default ({ radius }) => [canopy, lines, crate(radius)]

// 实心：伞衣（下沿的扇形照旧）、货箱各一块；伞绳照旧是线
export const fill = ({ radius }) => [solid([canopy, crate(radius)]), lines]
