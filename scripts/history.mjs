// 版本之间图标的变化：gen-since.mjs（加入 / 最近更新的版本）和 release-notes.mjs（发版说明）共用
// ref 是 git 的提交、tag；null 表示当前工作区
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// stderr 收进异常里，不直接打到终端（比如旧版本里没有某个文件）
export const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }).trim()

// 比较两个 x.y.z 版本字符串
export function compareVersions(a, b) {
  const [x, y] = [a, b].map(v => v.split('.').map(Number))
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]
}

const iconName = path => path.match(/^src\/icons\/(.+)\.js$/)?.[1]

// 某个版本的全部图标名
export const iconsAt = ref => git('ls-tree', '--name-only', ref, 'src/icons/').split('\n').map(iconName).filter(Boolean)

// 两个版本之间改过的图标文件（to 为 null 时比到工作区）。只看文件：加一个 export const fill、改注释也算
export const changedFiles = (from, to) => new Set(git('diff', '--name-only', from, ...(to ? [to] : []), '--', 'src/icons/').split('\n').map(iconName).filter(Boolean))

// 输出快照 { 图标名: 哈希 }（默认设置下 toSvg 的结果，见 tests/snapshot.test.js、tests/fill.test.js）；
// kind：'icons'（描边，v0.6.0 起）或 'fill'（实心）。那个版本还没有这份快照时为 null；
// 实心版和它的快照一起在 v0.15.0 加入，有描边快照、没有实心快照的版本就是还没有实心版（空表）
export function snapshotAt(ref, kind = 'icons') {
  const file = `tests/__snapshots__/${kind}.json`
  try {
    if (!ref)
      return existsSync(join(ROOT, file)) ? JSON.parse(readFileSync(join(ROOT, file), 'utf8')) : null
    return JSON.parse(git('show', `${ref}:${file}`))
  }
  catch {
    return kind === 'fill' && snapshotAt(ref) ? {} : null
  }
}

// 两个版本都有的图标里，输出真的变了的：两边都有快照时比哈希（共用模块改动带来的变化也算上，只改注释、加实心版不算）；
// 有一边没有快照（太早的版本）时只能退回看文件改动。kind 同 snapshotAt；返回 { names, exact（是否按快照判断）}
export function changedOutput(from, to, kind = 'icons') {
  const [a, b] = [snapshotAt(from, kind), snapshotAt(to, kind)]
  if (!a || !b)
    return { names: changedFiles(from, to), exact: false }
  return { names: new Set(Object.keys(b).filter(n => n in a && a[n] !== b[n])), exact: true }
}

// 实心版的增减：from 到 to 之间新加了实心版、或去掉了实心版的图标（两个版本都有的图标才算）。没有快照时为 null
export function fillChanges(from, to) {
  const [a, b] = [snapshotAt(from, 'fill'), snapshotAt(to, 'fill')]
  const [ia, ib] = [snapshotAt(from), snapshotAt(to)]
  if (!a || !b || !ia || !ib)
    return null
  const both = n => n in ia && n in ib
  return {
    added: Object.keys(b).filter(n => !(n in a) && both(n)),
    removed: Object.keys(a).filter(n => !(n in b) && both(n)),
  }
}
