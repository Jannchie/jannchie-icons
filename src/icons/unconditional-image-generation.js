import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：无条件图片生成（any › image）
export default ({ radius }) => pipeline(['any'], 'image', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['any'], 'image', radius, stroke)
