import { circle, rounded } from '../geometry'
import { stacked } from '../solid'
import { mirror } from '../transform'

// 蜻蜓：俯视（同 bee、butterfly）。实心的圆脑袋（圆心 (12, 3.75)、半径 1.75）+ 实心的胸（10.75–13.25 × 5–11.5 的圆头短条，和脑袋连成一截）
// + 一根细长的腹部（一条线，从胸底下一直到 21.5）+ 两对窄长的翅膀：翅根都落在胸的两侧，前翅往外上方斜（翅尖到 (21.25, 4.5)），后翅往外下方斜（翅尖到 (20.75, 12.75)）
// 细长的身子 + 两对平展的窄翅是蜻蜓的记号：和圆胖带条纹的 bee、大翅膀的 butterfly 区分开
const fore = 'M13 6.75C15.5 4.5 19.75 3.25 21.25 4.5C22.25 6 17.5 8.5 13 8.5'
const hind = 'M13 9.5C16.5 9.5 20.5 11 20.75 12.75C21 14.5 16 13.25 13 11'
const fores = [fore, mirror(fore)]
const hinds = [hind, mirror(hind)]
const head = `${circle(12, 3.75, 1.75)}Z`
const thorax = rounded([[10.75, 5], [13.25, 5], [13.25, 11.5], [10.75, 11.5]], 1.25)
const abdomen = 'M12 11.5V21.5'

export default () => [{ d: head, fill: true }, { d: thorax, fill: true }, abdomen, ...fores, ...hinds]

// 实心：后翅、前翅（都封口）、头胸从后往前叠，每块在后面的块上让出缝；腹部照旧是线
export const fill = () => [...stacked(hinds.map(d => `${d}Z`), fores.map(d => `${d}Z`), [thorax, head]), abdomen]
