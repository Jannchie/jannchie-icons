// 智能（大脑）：正面对称，左右各四段向外鼓的圆弧串成脑叶轮廓，中间一道竖直脑沟，两侧各两道褶皱
// 左半从顶部中点往下、右半从底部中点往上，整条轮廓都按逆时针绕（sweep 0）
// 整体右移半格，中间脑沟落在 12.5 上
const left = [[12.5, 5], [8, 5.75, 2.6], [5.25, 11, 3], [6.5, 16.25, 2.8], [12.5, 19, 3.6]]
const mirror = pts => pts.map(([x, y, r]) => [25 - x, y, r]).reverse()

export function outline() {
  const right = mirror(left)
  // 右半的半径跟着它前一段走（镜像后段的终点变成起点）
  const rightArcs = right.slice(1).map(([x, y], i) => [x, y, right[i][2]])
  const arcs = [...left.slice(1), ...rightArcs]
  return `M${left[0][0]} ${left[0][1]}${arcs.map(([x, y, r]) => `A${r} ${r} 0 0 0 ${x} ${y}`).join('')}Z`
}

export const MIDLINE = 'M12.5 5V19'
export const LEFT_FOLDS = ['M8.75 9.5A2.5 2.5 0 0 1 10.25 12', 'M8 14.5A2.25 2.25 0 0 0 10.25 15.5']
export const RIGHT_FOLDS = ['M16.25 9.5A2.5 2.5 0 0 0 14.75 12', 'M17 14.5A2.25 2.25 0 0 1 14.75 15.5']

export default () => [outline(), MIDLINE, ...LEFT_FOLDS, ...RIGHT_FOLDS]
