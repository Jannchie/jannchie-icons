// 色温：温度计（细管 + 底部圆泡 + 管内水银线）；竖线落在 .5 上，整体偏左半格
const join = 13.75 // 细管与圆泡交接处
const bulb = 4
const cy = join + Math.sqrt(bulb * bulb - 4) // 圆泡圆心（细管半宽 2）

export default () => [
  `M9.5 ${join}V4.5A2 2 0 0 1 13.5 4.5V${join}A${bulb} ${bulb} 0 1 1 9.5 ${join}Z`,
  `M11.5 ${cy}V8.5`,
]
