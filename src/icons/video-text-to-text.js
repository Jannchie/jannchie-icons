import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：视频 + 文本到文本（video + text › text）
export default ({ radius }) => pipeline(['video', 'text'], 'text', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['video', 'text'], 'text', radius, stroke)
