// 「划掉」系列：在原图标上加一条 45° 斜线，原图标在斜线两侧各让出 GAP 的空隙
// 斜线标记为 cut，把其余路径沿斜线挖开；双色变体里斜线是 danger（推荐红色）
export const slash = 'M3 3L21 21'

export const off = draw => opts => [...draw(opts), { d: slash, cut: true, tone: 'danger' }]
