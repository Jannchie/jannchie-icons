import { hole, knock, solid } from '../solid'

// 冰屋：半圆的穹顶（3.5–20.5，圆心 (12, 12.5)、半径 8.5，顶到 4，直边落到地面 19.5）+ 地面横线（2.5–21.5）+ 正中一个拱形的门洞（9.5–14.5，拱顶到 14.5）
// + 两道横的冰砖缝（8.5 / 12.5，两端落在穹顶上）和三道错开的竖缝（顶上一道 12，中间一层两道 8.5 / 15.5）
const dome = 'M3.5 19.5V12.5A8.5 8.5 0 0 1 20.5 12.5V19.5'
const ground = 'M2.5 19.5H21.5'
const door = 'M9.5 19.5V17A2.5 2.5 0 0 1 14.5 17V19.5'
const rows = ['M4.5 8.5H19.5', 'M3.5 12.5H20.5']
const joints = ['M12 4V8.5', 'M8.5 8.5V12.5', 'M15.5 8.5V12.5']

export default () => [dome, ground, door, ...rows, ...joints]

// 实心：穹顶一块，横缝两头都挖穿、竖缝接在横缝之间（顶上那道从穹顶外面切进来），分成一块块冰砖；门洞挖成洞（往下挖穿到地面线）；地面照旧是线
export const fill = ({ stroke }) => {
  const k = 2.5 - stroke
  return [
    solid(`${dome}Z`),
    knock(['M2 8.5H22', 'M1 12.5H23', `M12 ${4 - stroke * 1.5}V8.5`, ...joints.slice(1)]),
    hole(`M${12 - k} 22V17A${k} ${k} 0 0 1 ${12 + k} 17V22Z`),
    ground,
  ]
}
