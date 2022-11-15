declare module Express {
  interface Request {
    userId: string
    clinicId: string
    modulesIds: string[]
  }
}
