import { pipeline } from '../modality'

// Hugging Face 任务：表格问答（table + question › text）
export default ({ radius }) => pipeline(['table', 'question'], 'text', radius)
