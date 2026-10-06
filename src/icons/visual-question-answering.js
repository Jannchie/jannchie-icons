import { pipeline } from '../modality'

// Hugging Face 任务：视觉问答（image + question › text）
export default ({ radius }) => pipeline(['image', 'question'], 'text', radius)
