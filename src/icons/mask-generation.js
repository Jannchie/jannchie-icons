import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：掩码生成（image › mask）
export default ({ radius }) => pipeline(['image'], 'mask', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['image'], 'mask', radius, stroke)
