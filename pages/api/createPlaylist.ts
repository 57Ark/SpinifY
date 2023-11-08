import axios from "axios";
import { chunk } from "lodash-es";
import { NextApiRequest, NextApiResponse } from "next";

interface YandexSong {
  id: string;
  name: string;
  artist: string;
}

export default async function createPlaylist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, songs, title, accessToken } = req.body;

  try {
    const createPlaylistResponse = await axios.post<{ id: string }>(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: title,
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const searchResponse = await Promise.all(
      songs.map((song: YandexSong) => {
        const params = new URLSearchParams({
          q: `track:${song.name} artist:${song.artist}`,
          type: "track",
          limit: "1",
        });

        return axios.get<{ tracks: { itmes: { id: string }[] } }>(
          `https://api.spotify.com/v1/search?${params}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      })
    );

    const songIdList = chunk(
      searchResponse
        .filter((response) => response.data.tracks.items?.[0]?.id)
        .map((response) => `spotify:track:${response.data.tracks.items[0].id}`),
      100
    );

    await Promise.all(
      songIdList.map((chunk) =>
        axios.post(
          `https://api.spotify.com/v1/playlists/${createPlaylistResponse.data.id}/tracks`,
          {
            uris: chunk,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
      )
    );
  } catch (e) {
    return res.status(400).send({
      message: e,
    });
  }

  return res.status(201).end();
}
