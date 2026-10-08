import { circle } from '../geometry'

// 锡克教：坎达（Khanda）。正中一把双刃剑竖穿过一个圆环（剑挡在环前，把环切开），
// 两侧两把弯刀从底部交叉、刀身沿圆环外侧弯上去；剑是正中单线，整体中线 12
const cx = 12
export default () => [
  circle(cx, 11.5, 5),
  { d: `M${cx} 2.5L${cx + 1} 4.5V15.5H${cx - 1}V4.5Z`, cut: true, occlude: true },
  // 护手和剑柄也属于这把剑：同样标成 cut，不被剑身切掉，反过来挡住后面的圆环
  { d: `M${cx - 3} 15.5H${cx + 3}`, cut: true },
  { d: `M${cx} 15.5V17.5`, cut: true, gap: 0.25 },
  `M${cx + 3} 21C${cx - 3.5} 19.5 ${cx - 8} 15.5 ${cx - 7.5} 8`,
  `M${cx - 3} 21C${cx + 3.5} 19.5 ${cx + 8} 15.5 ${cx + 7.5} 8`,
]
