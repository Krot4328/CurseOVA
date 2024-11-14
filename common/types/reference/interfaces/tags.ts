export interface TagGroup {
  id: string
  title: string
}

export interface Tag {
  id: string

  title: string
}

export interface TagsMap extends TagGroup {
  tags: Tag[]
}
