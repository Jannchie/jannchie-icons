import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：关键点检测（image › keypoints）
export default ({ radius }) => pipeline(['image'], 'keypoints', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['image'], 'keypoints', radius, stroke)
