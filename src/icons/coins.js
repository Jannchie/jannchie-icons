// 一摞硬币：三层椭圆硬币叠起来（顶面完整，下面两层只露出下沿）
const [cx, rx, ry] = [12, 7.5, 2.5]
const top = 6
export default () => [
  `M${cx - rx} ${top}A${rx} ${ry} 0 0 1 ${cx + rx} ${top}A${rx} ${ry} 0 0 1 ${cx - rx} ${top}`,
  `M${cx - rx} ${top}V${top + 12}A${rx} ${ry} 0 0 0 ${cx + rx} ${top + 12}V${top}`,
  `M${cx - rx} ${top + 4}A${rx} ${ry} 0 0 0 ${cx + rx} ${top + 4}`,
  `M${cx - rx} ${top + 8}A${rx} ${ry} 0 0 0 ${cx + rx} ${top + 8}`,
]
