import { Request, Response, NextFunction } from 'express'
import multer from 'multer'

export const uploadMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const upload = multer().single('file')
    upload(req, res, error => {
      if (error !== undefined) {
        return res.status(500).json({ error })
      }
      if (req.file !== undefined) {
        req.locals = { ...req.locals, file: { buffer: req.file.buffer, mimeType: req.file.mimetype, filename: req.file.originalname } }
      }
      next()
    })
  }
}
