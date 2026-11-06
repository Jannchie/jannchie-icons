import { pill } from '../controller'
import { knock, solid } from '../solid'

// PS Options 键：竖胶囊 + 三道横线，横线组在胶囊内居中
export default () => [
  pill,
  'M10 9H14',
  'M10 12H14',
  'M10 15H14',
]

// 实心：外形填实，挖出图案
export const fill = () => [solid(pill), knock(['M10 9H14', 'M10 12H14', 'M10 15H14'])]
