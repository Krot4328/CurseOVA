export interface File extends Omit<Express.Multer.File, 'stream' | 'buffer'> {
  id: string
}
