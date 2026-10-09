import camera from './camera'

// 翻转镜头：相机外形（不画镜头圆）+ 机身里两段顺时针相追的圆弧箭头，圆心同镜头 (12, 13.25)、半径 3.5
// 上弧从左上 220° 绕过顶部到正右 0°，箭头朝下；下弧从右下 40° 绕过底部到正左 180°，箭头朝上（两者中心对称）
// 每段弧的尾巴离另一段的箭头尖留开 50°（中心线相距约 3），箭头只画外侧一片翼（长 2、45°，同 arrow-*-half）：里侧那片会伸进小圆里和弧挤成一团，两处缺口清楚，读成「两个箭头在转」而不是一个整圆
// 半径 3.5：弧顶墨迹离机身上沿内缘在常规下留 0.75、粗字重下 0.25
const [cx, cy, r, gap, wing] = [12, 13.25, 3.5, 50, 2]
const at = deg => {
  const a = deg * Math.PI / 180
  return `${+(cx + r * Math.cos(a)).toFixed(3)} ${+(cy + r * Math.sin(a)).toFixed(3)}`
}
export default ({ radius }) => [
  camera({ radius })[0],
  // 弧和箭翼画成一笔（折角），分开画时粗字重的端点吸附会把短短的箭翼吸回弧上
  `M${at(180 + gap)}A${r} ${r} 0 0 1 ${cx + r} ${cy}L${cx + r + wing * 0.7} ${cy - wing * 0.7}`,
  `M${at(gap)}A${r} ${r} 0 0 1 ${cx - r} ${cy}L${cx - r - wing * 0.7} ${cy + wing * 0.7}`,
]
