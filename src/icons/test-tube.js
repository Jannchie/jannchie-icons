import { knock, solid } from '../solid'

// 试管：管口一道短横 + 圆底的细长管身 + 管里的液面线，以 x 12 为中轴
const lip = 'M8.5 3.5H15.5'
const tube = 'M10 3.5V17.5A2 2 0 0 0 14 17.5V3.5'

export default () => [
  lip,
  tube,
  'M10 12.5H14',
]

// 实心：管身填实，液面线挖成一道穿出两侧管壁的缝，分成上面的空管和下面的液体；管口照旧是线
export const fill = () => [
  solid(`${tube}Z`),
  lip,
  knock('M8 12.5H16'),
]
