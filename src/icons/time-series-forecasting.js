import { pipeline, pipelineFill } from '../modality'

// Hugging Face 任务：时间序列预测（table › forecast）
export default ({ radius }) => pipeline(['table'], 'forecast', radius)

// 实心：同样的构图，闭合的符号填实（见 modality.js 的 MF）
export const fill = ({ radius, stroke }) => pipelineFill(['table'], 'forecast', radius, stroke)
