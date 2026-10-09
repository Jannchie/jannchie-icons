// 手柄按键共用：圆形面键、肩键 / 扳机键外形、按键里的文字、十字键
import { crisp, rounded } from './geometry'
import { LABEL, line, snap } from './letters'

// 按键文字：以 (cx, cy) 为中心排一行（字高 6 * s），横竖笔画对齐像素网格
// 和别处框里的小字一样：切角标签字形、细线（外框的 0.7 倍）；字间距 2，LB、RS 这类两个字母在粗字重下也不粘连
export const text = (str, center, s = 1, gap = 2) => snap(line(str, center, s, gap, s, LABEL)).map(d => ({ d, thin: true }))

// 肩键（LB / RB / L1 / R1）：平底、上沿两角圆润的扁按键。
// 左右不完全对称：外侧（远离手柄中线的一侧）圆角更大、肩线更低，内侧圆角更紧，右键是左键的镜像
// 左右两边落在 2.5 / 21.5（像素中心）
export const bumperLeft = 'M2.5 18.5V12.5C2.5 9 5 6.5 8.5 6.5H16.5C19.75 6.5 21.5 8 21.5 10.5V18.5Z'
export const bumperRight = 'M21.5 18.5V12.5C21.5 9 19 6.5 15.5 6.5H7.5C4.25 6.5 2.5 8 2.5 10.5V18.5Z'
// 扳机键（LT / RT / L2 / R2）：平底、顶部圆拱的高按键。
// 同肩键：外侧弧更圆更低，拱顶略向内侧偏，内侧更紧，右键是左键的镜像
export const triggerLeft = 'M5.5 20.5V10C5.5 6 8.5 3.5 12.5 3.5C16 3.5 18.5 5 18.5 8V20.5Z'
export const triggerRight = 'M18.5 20.5V10C18.5 6 15.5 3.5 11.5 3.5C8 3.5 5.5 5 5.5 8V20.5Z'
// 胶囊形功能键（PS 的 Options / Create）
export const pill = rounded([[7.5, 2.5], [16.5, 2.5], [16.5, 21.5], [7.5, 21.5]], 4.5)

// 十字键：四个方向的臂（宽 7）围成的十字轮廓；臂端墨迹外缘固定在离画布边 2（中线 2 + stroke / 2，粗字重往里长）
export const dpad = (radius, stroke = 1.5) => {
  const [a, b] = [2 + stroke / 2, 22 - stroke / 2]
  return rounded([
    [8.5, a], [15.5, a], [15.5, 8.5], [b, 8.5], [b, 15.5], [15.5, 15.5], [15.5, b], [8.5, b], [8.5, 15.5], [a, 15.5], [a, 8.5], [8.5, 8.5],
  ], crisp(radius))
}
// 某个方向臂中段的 V 形箭头（宽 3、高 1.5，指向外侧），比实心小三角清楚；尖在 6 / 18，和往里长的臂端（粗字重内缘 4）、两翼和臂根的内角都留出空隙
export const dpadArrow = (dir, radius) => {
  const v = {
    up: [[10.5, 7.5], [12, 6], [13.5, 7.5]],
    down: [[10.5, 16.5], [12, 18], [13.5, 16.5]],
    left: [[7.5, 10.5], [6, 12], [7.5, 13.5]],
    right: [[16.5, 10.5], [18, 12], [16.5, 13.5]],
  }[dir]
  return rounded(v, crisp(radius), false)
}
