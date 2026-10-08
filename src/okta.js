// 总云量（WMO 天气图符号，单位 okta = 天空的八分之一）：圆圈内按比例涂实，0 → 8，最后是天空不明
// 涂实的扇形和外圈同半径，描边把两者连成一体
import { circle } from './geometry'

// 圆心放在画布正中 (12, 12)
const [C, R] = [12, 9]
const ring = () => circle(C, C, R)
const fill = d => ({ d, fill: true })
const D = R * Math.SQRT1_2

export const OKTA = {
  '0': { zh: '0 晴', paths: () => [ring()] },
  '1': { zh: '1/8', paths: () => [ring(), `M${C} ${C - R}V${C + R}`] },
  '2': { zh: '2/8', paths: () => [ring(), fill(`M${C} ${C}V${C - R}A${R} ${R} 0 0 1 ${C + R} ${C}Z`)] },
  '3': { zh: '3/8', paths: () => [ring(), fill(`M${C} ${C}V${C - R}A${R} ${R} 0 0 1 ${C + R} ${C}Z`), `M${C} ${C}V${C + R}`] },
  '4': { zh: '4/8', paths: () => [ring(), fill(`M${C} ${C - R}A${R} ${R} 0 0 1 ${C} ${C + R}Z`)] },
  '5': { zh: '5/8', paths: () => [ring(), fill(`M${C} ${C - R}A${R} ${R} 0 0 1 ${C} ${C + R}Z`), `M${C - R} ${C}H${C}`] },
  '6': { zh: '6/8', paths: () => [ring(), fill(`M${C} ${C}V${C - R}A${R} ${R} 0 1 1 ${C - R} ${C}Z`)] },
  // 7：中间留一条竖缝；扇形描边会往缝里长半个线宽，所以弦按线宽往外让，看到的缝宽固定 2
  '7': {
    zh: '7/8',
    paths: ({ stroke }) => {
      const g = 1 + stroke / 2
      const h = Math.sqrt(R * R - g * g)
      return [ring(), fill(`M${C - g} ${C - h}A${R} ${R} 0 0 0 ${C - g} ${C + h}Z`), fill(`M${C + g} ${C - h}A${R} ${R} 0 0 1 ${C + g} ${C + h}Z`)]
    },
  },
  '8': { zh: '8/8 阴', paths: () => [fill(ring())] },
  'obscured': { zh: '天空不明', paths: () => [ring(), `M${C - D} ${C - D}L${C + D} ${C + D}`, `M${C + D} ${C - D}L${C - D} ${C + D}`] },
}
