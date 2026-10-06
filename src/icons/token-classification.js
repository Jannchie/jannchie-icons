import { pipeline } from '../modality'

// Hugging Face 任务：词元分类（tokens › tag）
export default ({ radius }) => pipeline(['tokens'], 'tag', radius)
