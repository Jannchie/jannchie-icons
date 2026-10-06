// 彩虹：三道同心半圆弧，外框 3–21 × 7.5–16.5
const [cx, cy] = [12, 16.5]
const arc = r => `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`

export default () => [arc(9), arc(6), arc(3)]
