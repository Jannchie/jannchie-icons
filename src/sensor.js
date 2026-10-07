// 画幅（传感器尺寸）标志：四角取景框的裁切角标 + 框里的线条字母（FF、APS-C、M43……）
// 外框只用四个角，不画整圈矩形：和画质标识（2K、HDR 的圆角外框）分开，也更像取景器里的画幅框
// 字母用切角标签字形、细线（外框的 0.7 倍，和分级图标的文字一样）
import { LABEL, line, snap, textWidth } from './letters'

// 取景框：2.5–21.5 × 5.5–18.5（约 3:2），四角各一个臂长 2.5 的直角
const L = 2.5
const [X0, Y0, X1, Y1] = [2.5, 5.5, 21.5, 18.5]
export const cropMarks = () => [
  `M${X0} ${Y0 + L}V${Y0}H${X0 + L}`,
  `M${X1 - L} ${Y0}H${X1}V${Y0 + L}`,
  `M${X1} ${Y1 - L}V${Y1}H${X1 - L}`,
  `M${X0 + L} ${Y1}H${X0}V${Y1 - L}`,
]

// 文字横向最多铺到 4–20、竖向 9.5–14.5（字高 5）：离四角竖臂的端点（y 8、16）留够距离，粗字重下 APSC 的 C 也不会碰到角标
// 字距 2：四个字母时字宽正好 2.5，每一笔都落在半格上，吸附网格时相邻两笔不会被挤到只隔 1
const SPAN = 16
const GAP = 2
const SY = 5 / 6
const label = (text) => {
  const sx = Math.min(1, (SPAN - GAP * (text.length - 1)) / textWidth(text, 1, 0, LABEL))
  return snap(line(text, [12, 12], sx, GAP, SY, LABEL)).map(d => ({ d, thin: true }))
}

// 键按传感器从大到小排（预览页的顺序）
export const SENSORS = {
  'medium-format': { zh: '中画幅', paths: () => label('MF') },
  'full-frame': { zh: '全画幅', paths: () => label('FF') },
  // APS-C 去掉连字符写成 APSC：五个字符挤在 17 宽里每个字只剩 2 格宽，粗字重下糊成一团；四个字有 3 格宽
  'aps-c': { zh: 'APS-C 画幅', paths: () => label('APSC') },
  'mft': { zh: 'M4/3 画幅', paths: () => label('M43') },
  // 1 英寸：数字 1 + 右上角的英寸撇号（两道短竖线，隔 2，粗字重下不粘）
  'one-inch': { zh: '1 英寸', paths: () => snap([...line('1', [10.5, 12], 1, GAP, SY, LABEL), 'M13.5 9.5V11.5M15.5 9.5V11.5']).map(d => ({ d, thin: true })) },
}

export const sensor = key => [...cropMarks(), ...SENSORS[key].paths()]
