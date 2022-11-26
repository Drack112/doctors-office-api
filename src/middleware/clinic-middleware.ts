
import { NextFunction, Request, Response } from 'express'

export const clinicMiddleware = () => {
  return async (req: Request, _: Response, next: NextFunction) => {
    const clinicId = req.headers.clinicid
    if (clinicId) req.clinicId = clinicId
    return next()
  }
}
