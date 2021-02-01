export interface IPostType {
  id: number,
  createdAt: string,
  title: string,
  description: string,
  contents: string,
  thumbnail: {
    url: string
  }
}

export interface IPosts {
  posts: IPostType[]
}
