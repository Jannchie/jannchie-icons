import { pipeline } from '../modality'

// Hugging Face 任务：表格分类（table › tag）
export default ({ radius }) => pipeline(['table'], 'tag', radius)
