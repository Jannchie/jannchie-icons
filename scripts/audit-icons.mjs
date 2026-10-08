// 一键跑三个审计的门禁（pnpm audit:icons）：网格、尖角线头、拥挤，各自和 scripts/audit-*.baseline.json 比，有新问题就以 1 退出
// 三个审计依次跑（并行在负载高的机器上容易让 vite SSR 超时），一个失败也继续跑完其余的；
// 额外参数原样传给每个审计，比如 --update-baseline 一次更新三份基线
import { spawn } from 'node:child_process'

const extra = process.argv.slice(2)
const args = extra.some(a => a.startsWith('--baseline') || a.startsWith('--update-baseline')) ? extra : ['--baseline', ...extra]
const run = audit => new Promise((resolve) => {
  const child = spawn(process.execPath, [`scripts/audit-${audit}.mjs`, ...args], { stdio: 'inherit' })
  child.on('exit', code => resolve({ audit, code: code ?? 1 }))
})
const results = []
for (const audit of ['grid', 'caps', 'crowd'])
  results.push(await run(audit))
const failed = results.filter(r => r.code !== 0)
console.log(`\naudit:icons ${failed.length ? `failed: ${failed.map(r => r.audit).join(', ')}` : 'passed'}`)
process.exitCode = failed.length ? 1 : 0
