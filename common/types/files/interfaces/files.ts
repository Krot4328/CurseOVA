import { type File } from '@boilerplate/core/interfaces/file'

export interface PostFilePreloadData {
  file: File
}

export interface PostFilePreloadResult {
  id: string
}

export interface Image {
  id: string
  src: string
}
