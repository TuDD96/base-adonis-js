export interface EpisodeType {
  server_name: string
  server_data: EpisodeItemType[]
}

export interface EpisodeItemType {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}
export interface MovieType {
  modified: { time: string }
  _id: string
  name: string
  origin_name: string
  content: string
  type: string
  status: string
  thumb_url: string
  is_copyright: string | number
  trailer_url: string
  time: string
  episode_current: string
  episode_total: string
  quality: string
  lang: string
  notify: string
  showtimes: string
  slug: string
  year: number
  actor: string[]
  director: string[]
  category: CategoryType[]
  country: CountryType[]
  chieurap: boolean
  poster_url: string
  sub_docquyen: string | number
}

export interface CategoryType {
  name: string
}

export interface CountryType {
  name: string
}
