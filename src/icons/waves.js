// 波浪：三道平行的正弦波，横跨 2.5–21.5（每道两个整波，波长 9.5，振幅约 1.5），上下间隔 5
const wave = (y) => {
  const h = 19 / 4 // 半个波长
  let d = `M2.5 ${y}`
  for (let i = 0; i < 4; i++) {
    const [x0, k] = [2.5 + i * h, i % 2 ? 1 : -1]
    d += `C${x0 + h * 0.36} ${y + k * 2} ${x0 + h * 0.64} ${y + k * 2} ${x0 + h} ${y}`
  }
  return d
}
export default () => [wave(7), wave(12), wave(17)]
