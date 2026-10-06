import { pipeline } from '../modality'

// Hugging Face 任务：文档问答（doc + question › text）
export default ({ radius }) => pipeline(['doc', 'question'], 'text', radius)
