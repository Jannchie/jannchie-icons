import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：文本到 3D（text › cube）
export default ({ radius }) => pipeline(['text'], 'cube', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['text'], 'cube', radius, stroke)
