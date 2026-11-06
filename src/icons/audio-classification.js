import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：音频分类（audio › tag）
export default ({ radius }) => pipeline(['audio'], 'tag', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['audio'], 'tag', radius, stroke)
