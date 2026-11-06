import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：图片到 3D（image › cube）
export default ({ radius }) => pipeline(['image'], 'cube', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['image'], 'cube', radius, stroke)
