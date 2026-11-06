import { ring } from '../marks'
import { hole, knock, solid } from '../solid'

// 大笑：圆脸 + 笑眼（同 mood-happy）+ 张开的嘴（顶边 13.5 的半圆，闭合）
export default () => [
  ring(),
  'M7.5 10.5A1.5 1.5 0 0 1 10.5 10.5M13.5 10.5A1.5 1.5 0 0 1 16.5 10.5',
  'M8 13.5H16A4 4 0 0 1 8 13.5Z',
]

// 实心：脸一块，笑眼挖空，张开的嘴挖成洞
export const fill = () => [
  solid(ring()),
  knock('M7.5 10.5A1.5 1.5 0 0 1 10.5 10.5M13.5 10.5A1.5 1.5 0 0 1 16.5 10.5'),
  hole('M8 13.5H16A4 4 0 0 1 8 13.5Z'),
]
