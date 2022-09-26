export enum SituationStatusEnum {
  active = 'active',
  disabled = 'disabled'
}

export type AdminDTO = {
  userId: string
  cpf: string
  situation: SituationStatusEnum
}
