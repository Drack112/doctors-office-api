declare module Express {
  interface Request {
    userId: string
    modulesIds: string[]
    clinicId: string | string[]
  }
}
