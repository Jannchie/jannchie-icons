// 输出快照：每个图标在默认设置（radius 2、regular）下 toSvg 的结果，见 snapshot.js
import { it } from 'vitest'
import { toSvg } from '../src/export.js'
import { icons } from './icons.js'
import { expectSnapshot } from './snapshot.js'

it('default SVG output matches the snapshot', () => expectSnapshot('icons.json', icons, icon => toSvg(icon)))
