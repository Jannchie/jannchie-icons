import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：深度估计（image › depth）
export default ({ radius }) => pipeline(['image'], 'depth', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['image'], 'depth', radius, stroke)
