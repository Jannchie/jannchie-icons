import { pipeline } from '../modality'

// Hugging Face 任务：关键点检测（image › keypoints）
export default ({ radius }) => pipeline(['image'], 'keypoints', radius)
