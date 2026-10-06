import { pipeline } from '../modality'

// Hugging Face 任务：问答（text + question › text）
export default ({ radius }) => pipeline(['text', 'question'], 'text', radius)
