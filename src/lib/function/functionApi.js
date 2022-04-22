const ENDPOINT_URL = "https://api.spotify.com/v1";

const SearchTracks = (search, token) => {
    return fetch(`${ENDPOINT_URL}/search?q=${search}&type=track&limit=10`, {
        method: "GET",
        headers: {
            Authorization: "Bearer" + token,
        },
    }).then((respon) => respon.json());
}


const CreatePlaylist = ( id, token, newPlaylist) => {
    return fetch(`${ENDPOINT_URL}/users/${id}/playlists`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization: "Bearer" + token,
        },

        body: JSON.stringify({
            name: newPlaylist.name,
            description: newPlaylist.description,
            public: false,
            collaboration: false,
        }),
    }).then((respon) => respon.json());
}

const StoreTrackstoPlaylist = (newPlaylistId, token, playlist) => {
    return fetch(`${ENDPOINT_URL}/playlists/${newPlaylistId}/tracks?position=0&uris=${playlist}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization: "Bearer" + token,
        },
        body: JSON.stringify({
            uris: playlist,
            position: 0,
        }),
    }).then((respon) => respon.json());
}

export {SearchTracks, CreatePlaylist, StoreTrackstoPlaylist};