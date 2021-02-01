export interface IPostType {
  posts: IPostItems[]
}

export interface IPostItems {
  id: string
  title: string
  content: string
  description: string
  createdAt: string
  thumbnail: IUrlType
}

export interface IUrlType {
  url: string
}
