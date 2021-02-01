export interface IWines {
  wines: IWineType[]
}

export interface IWineType {
  id: string
  createdAt: string
  title: string
  description: string
  thumbnail: IUrlType
  grapeType: string
  type: string
  drinkDate: string
}

export interface IUrlType {
  url: string | null | ArrayBuffer
}

export interface IType {
  id: string
  title: string
  description: string
  thumbnail: IUrlType
  grapeType: string
  type: string
  drinkDate: string
}
