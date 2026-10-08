// 根元素属性与属性序列化：核心包的 toSvg（src/export.js）、./static 的 toSvg / toPaths、框架组件共用
// 纯函数、不依赖渲染引擎和 Vite：./static 入口把它打包进去，不带引擎也能拼出同样的 SVG

// 属性名只收合法的名字；值转义 & < > "（用户给的 attrs、title、size 都会经过这里）
const ATTR_NAME = /^[^\s"'<>/=\x00-\x1F]+$/
export const escapeXml = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// 去掉值为 null / undefined 的属性
export function compact(o) {
  const out = {}
  for (const k in o) {
    if (o[k] != null)
      out[k] = o[k]
  }
  return out
}

// 序列化成 ` k="v"`（每个属性前带一个空格），null / undefined 跳过；属性名不合法时抛错
export function attrString(o) {
  let s = ''
  for (const k in o) {
    if (o[k] == null)
      continue
    if (!ATTR_NAME.test(k))
      throw new TypeError(`Invalid attribute name: ${JSON.stringify(k)}`)
    s += ` ${k}="${escapeXml(o[k])}"`
  }
  return s
}

// 一条路径：{ animate, ...属性 } → <path …/>，动画路径带 <animate> 子元素
export const pathTag = ({ animate, ...p }) => (animate ? `<path${attrString(p)}><animate${attrString(animate)}/></path>` : `<path${attrString(p)}/>`)

// 可访问性：默认是装饰性的，对读屏隐藏；给了 title 就当图片读出这个名字
export const a11yAttrs = title => (title ? { role: 'img' } : { 'aria-hidden': 'true' })

// 根元素上和样式无关的属性：命名空间、尺寸（数字是 px，也可以是 '1em' 之类的 CSS 长度）、24 网格
export const rootAttrs = (size = 24) => ({ xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24' })

// ./static 的预计算图标（{ name, paths }，见 scripts/build-packages.mjs）：style 是构建时算好的默认根属性（SVG_ATTRS）
const checkStatic = (icon) => {
  if (!icon || !Array.isArray(icon.paths))
    throw new TypeError('Expected an icon object such as IconHeart from @jannchie/icons/static')
}

// 和核心包 toPaths 同形：{ svg: 根属性（不含 xmlns、宽高、viewBox）, paths, title? }，给框架组件用
export function staticPaths(icon, style, { title, attrs } = {}) {
  checkStatic(icon)
  const out = { svg: compact({ ...style, ...a11yAttrs(title), ...attrs }), paths: icon.paths }
  if (title)
    out.title = String(title)
  return out
}

// 紧凑的一行 SVG（不换行、不缩进）
export function staticSvg(icon, style, { size = 24, title, attrs } = {}) {
  checkStatic(icon)
  const body = (title ? `<title>${escapeXml(title)}</title>` : '') + icon.paths.map(pathTag).join('')
  return `<svg${attrString({ ...rootAttrs(size), ...style, ...a11yAttrs(title), ...attrs })}>${body}</svg>`
}
