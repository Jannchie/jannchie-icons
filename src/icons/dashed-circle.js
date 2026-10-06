// 虚线圆：8 段圆弧，段与段之间留空
const [cx, cy, r] = [12, 12, 9]
const at = deg => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)]
export default () => Array.from({ length: 8 }, (_, i) => `M${at(i * 45 + 8).join(' ')}A${r} ${r} 0 0 1 ${at(i * 45 + 37).join(' ')}`)
