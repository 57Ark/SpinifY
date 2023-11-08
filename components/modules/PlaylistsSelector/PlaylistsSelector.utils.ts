export interface YandexPlaylist {
  srcList: string[];
  title: string;
  link: string;
}

export interface PlaylistsSelectorFormValues {
  playlists: {
    isSelected: boolean;
  }[];
}
