import { pipeline } from '../modality'

// Hugging Face 任务：摘要（doc › text）
export default ({ radius }) => pipeline(['doc'], 'text', radius)
