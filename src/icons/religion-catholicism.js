// 天主教：拉丁十字，横梁偏上；竖梁是正中单线，两端墨迹外缘固定在离画布上下边 2（粗字重往里长）
export default ({ stroke }) => {
  const h = stroke / 2
  return [
    `M12 ${2 + h}V${22 - h}`,
    'M6 7.5H18',
  ]
}
