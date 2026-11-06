import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：图片特征提取（image › vector）
export default ({ radius }) => pipeline(['image'], 'vector', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['image'], 'vector', radius, stroke)
