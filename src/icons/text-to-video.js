import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：文本到视频（text › video）
export default ({ radius }) => pipeline(['text'], 'video', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['text'], 'video', radius, stroke)
