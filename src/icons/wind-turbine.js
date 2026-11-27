import { circle, ray } from '../geometry'
import { solid } from '../solid'

// 风力发电机：高高的塔筒（x = 12，从轮毂底下落到 20.5）+ 塔顶的轮毂（小圆，圆心 (12, 9.5)、半径 1.5）+ 三片互成 120° 的细长叶片（从轮毂边伸到半径 7.25）
// + 一条底座线（8.5–15.5）。叶片整体转过 15°（−105° / 15° / 135°），不是一片正朝上：正朝上时叶片和塔筒连成一条竖线，小尺寸下像一架飞机
// 靠「细高的塔 + 三片细叶片」认出来；windmill 是四片交叉的风车叶 + 带门的塔身，fan 是圆框里三片弯叶片
const HUB = [12, 9.5]
const blades = [-105, 15, 135].map(deg => ray(HUB, deg, 1.5, 7.25))
const tower = 'M12 11V20.5'
const base = 'M8.5 20.5H15.5'

export default () => [circle(...HUB, 1.5), ...blades, tower, base]

// 实心：轮毂填实；叶片、塔筒、底座照旧是线
export const fill = () => [solid(circle(...HUB, 1.5)), ...blades, tower, base]
