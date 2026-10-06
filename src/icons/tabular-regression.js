import { pipeline } from '../modality'

// Hugging Face 任务：表格回归（table › trend）
export default ({ radius }) => pipeline(['table'], 'trend', radius)
