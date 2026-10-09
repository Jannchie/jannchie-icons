// 生成 src/meta/since.json：每个图标第一次随哪个版本发布；和 src/meta/updated.json：最近一次改动随哪个版本发布。
// 可以反复运行（发版、加图标、改图标之后再跑一遍）。
//
// 做法：按版本从旧到新列出每个发布点 src/icons/ 下的文件，图标记在第一个包含它的版本上；
// 当前工作区里有、但还没进任何发布的图标记成 "next"（下一个版本）。
// 按文件名判断；改名的图标（登记在 src/aliases.js）取旧名、新名里最早出现的版本。
//
// 发布点：git 里的 v* 标签；另外 0.1.0 发到了 npm 但没有打标签——
// 它在 2026-10-07 02:41 UTC 发布，对应当时的最新提交 ec790d9（下一个提交 58b0ac4 晚了 20 分钟），这里写死。
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ALIASES } from '../src/aliases.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] })

const UNTAGGED = [{ version: '0.1.0', ref: 'ec790d9591837bfecb362adb6cb22bcf2e6a8399' }]

// 比较两个 x.y.z 版本字符串
const compareVersions = (a, b) => {
  const [x, y] = [a, b].map(v => v.split('.').map(Number))
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]
}
const tagged = git('tag', '--list', 'v*').split('\n').filter(t => /^v\d+\.\d+\.\d+$/.test(t)).map(t => ({ version: t.slice(1), ref: t }))
const releases = [...UNTAGGED, ...tagged].sort((a, b) => compareVersions(a.version, b.version))

const iconsAt = ref => git('ls-tree', '--name-only', ref, 'src/icons/')
  .split('\n')
  .filter(p => p.endsWith('.js'))
  .map(p => p.slice('src/icons/'.length, -3))

const first = {}
for (const { version, ref } of releases) {
  for (const name of iconsAt(ref))
    first[name] ??= version
}
// 改名：旧名发布过的版本算到新名上
for (const [old, name] of Object.entries(ALIASES)) {
  if (first[old] && (!first[name] || compareVersions(first[old], first[name]) < 0))
    first[name] = first[old]
}
// 只收当前还在的图标（发布过又删掉、改名的不留）
const since = {}
for (const file of readdirSync(join(root, 'src/icons'))) {
  if (file.endsWith('.js'))
    since[file.slice(0, -3)] = first[file.slice(0, -3)] ?? 'next'
}

const sorted = Object.fromEntries(Object.entries(since).sort(([a], [b]) => a.localeCompare(b)))
writeFileSync(join(root, 'src/meta/since.json'), `${JSON.stringify(sorted, null, 2)}\n`)

// 最近一次更新的版本（src/meta/updated.json）：相邻两个发布点之间，图标的输出变了就记成后一个版本
// - 两边都有输出快照（tests/__snapshots__/icons.json，v0.6.0 起）时比哈希：共用模块改动带来的变化也算上
// - 另外图标文件本身改过也算（更早的版本没有快照，只能看文件）
// 工作区相对最新发布点的变化记成 "next"；和加入版本相同（或更早）的不记
const snapshotAt = (ref) => {
  try {
    return JSON.parse(ref ? git('show', `${ref}:tests/__snapshots__/icons.json`) : readFileSync(join(root, 'tests/__snapshots__/icons.json'), 'utf8'))
  }
  catch {
    return null
  }
}
const changedFiles = (from, to) => new Set(git('diff', '--name-only', from, ...(to ? [to] : []), '--', 'src/icons/')
  .split(/\r?\n/).filter(p => p.endsWith('.js')).map(p => p.slice('src/icons/'.length, -3)))
const steps = [...releases.map(r => ({ version: r.version, ref: r.ref })), { version: 'next', ref: null }]
const last = {}
for (let i = 1; i < steps.length; i++) {
  const [prev, cur] = [steps[i - 1], steps[i]]
  const before = new Set(iconsAt(prev.ref))
  const [a, b] = [snapshotAt(prev.ref), snapshotAt(cur.ref)]
  const changed = changedFiles(prev.ref, cur.ref)
  if (a && b) {
    for (const name of Object.keys(b)) {
      if (name in a && a[name] !== b[name])
        changed.add(name)
    }
  }
  for (const name of changed) {
    if (before.has(name))
      last[name] = cur.version
  }
}
const updated = {}
for (const name of Object.keys(sorted)) {
  const v = last[name]
  if (v && sorted[name] !== 'next' && (v === 'next' || compareVersions(v, sorted[name]) > 0))
    updated[name] = v
}
writeFileSync(join(root, 'src/meta/updated.json'), `${JSON.stringify(updated, null, 2)}\n`)
console.log(`src/meta/updated.json: ${Object.keys(updated).length} icons updated after they were added`)

const counts = {}
const order = [...releases.map(r => r.version), 'next']
for (const v of Object.values(sorted))
  counts[v] = (counts[v] ?? 0) + 1
console.log(`src/meta/since.json: ${Object.keys(sorted).length} icons`, Object.fromEntries(order.filter(v => counts[v]).map(v => [v, counts[v]])))
