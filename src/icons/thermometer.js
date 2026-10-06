// 色温：温度计（细管 + 底部圆泡 + 管内水银线）
const join = 13.75 // 细管与圆泡交接处
const bulb = 4
const cy = join + Math.sqrt(bulb * bulb - 4) // 圆泡圆心（细管半宽 2）

export default () => [
  `M10 ${join}V4.5A2 2 0 0 1 14 4.5V${join}A${bulb} ${bulb} 0 1 1 10 ${join}Z`,
  `M12 ${cy}V8.5`,
]
