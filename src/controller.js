// 手柄按键共用：圆形面键、肩键 / 扳机键外形、按键里的文字、十字键
import { crisp, rounded } from './geometry'
import { line } from './letters'

// 按键文字：以 (cx, cy) 为中心排一行（字高 6 * s）
export const text = (str, center, s = 1, gap = 1.5) => line(str, center, s, gap)

// 肩键（LB / RB / L1 / R1）：平底、上沿两角圆润的扁按键。
// 左右不完全对称：外侧（远离手柄中线的一侧）圆角更大、肩线更低，内侧圆角更紧，右键是左键的镜像
export const bumperLeft = 'M3 18.5V12.5C3 9 5.5 6.5 9 6.5H16.5C19.5 6.5 21 8 21 10.5V18.5Z'
export const bumperRight = 'M21 18.5V12.5C21 9 18.5 6.5 15 6.5H7.5C4.5 6.5 3 8 3 10.5V18.5Z'
// 扳机键（LT / RT / L2 / R2）：平底、顶部圆拱的高按键。
// 同肩键：外侧弧更圆更低，拱顶略向内侧偏，内侧更紧，右键是左键的镜像
export const triggerLeft = 'M5.5 20.5V10C5.5 6 8.5 3.5 12.5 3.5C16 3.5 18.5 5 18.5 8V20.5Z'
export const triggerRight = 'M18.5 20.5V10C18.5 6 15.5 3.5 11.5 3.5C8 3.5 5.5 5 5.5 8V20.5Z'
// 胶囊形功能键（PS 的 Options / Create）
export const pill = rounded([[8, 2.5], [16, 2.5], [16, 21.5], [8, 21.5]], 4)

// 十字键：四个方向的臂（宽 7，伸到 2.5 / 21.5）围成的十字轮廓
export const dpad = radius => rounded([
  [8.5, 2.5], [15.5, 2.5], [15.5, 8.5], [21.5, 8.5], [21.5, 15.5], [15.5, 15.5], [15.5, 21.5], [8.5, 21.5], [8.5, 15.5], [2.5, 15.5], [2.5, 8.5], [8.5, 8.5],
], crisp(radius))
// 某个方向臂中段的 V 形箭头（宽 4、高 2，指向外侧），比实心小三角清楚，和臂的侧壁留出空隙
export const dpadArrow = (dir, radius) => {
  const v = {
    up: [[10, 7.5], [12, 5.5], [14, 7.5]],
    down: [[10, 16.5], [12, 18.5], [14, 16.5]],
    left: [[7.5, 10], [5.5, 12], [7.5, 14]],
    right: [[16.5, 10], [18.5, 12], [16.5, 14]],
  }[dir]
  return rounded(v, crisp(radius), false)
}
