export interface YandexPlaylist {
  srcList: string[];
  title: string;
  link: string;
}

export interface GetPlaylistsResponse {
  data: YandexPlaylist[];
}

export interface PlaylistsSelectorFormValues {
  playlists: {
    isSelected: boolean;
  }[];
}
