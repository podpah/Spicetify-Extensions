// @ts-check
// NAME: queueUnliked
// AUTHOR: podpah
// DESCRIPTION: Queues up songs that aren't liked in current playlist
/// <reference path="../globals.d.ts" />

function queueUnlikedMain() {
	if (!(Spicetify.CosmosAsync && Spicetify.ContextMenu)) {
		setTimeout(queueUnlikedMain, 200);
		return;
	}

	function uriPlaylist(uris) {
		if (uris.length > 1) {
			return false;
		}
		const uri = uris[0];
		const uriObj = Spicetify.URI.fromString(uri);
		if (
			uriObj.type === Spicetify.URI.Type.PLAYLIST ||
			uriObj.type === Spicetify.URI.Type.PLAYLIST_V2
		)
			return true;
		return false;
	}

	async function queueUnliked(uri) {
		const playlistUri = uri;
		const playlistContents =
			await Spicetify.Platform.PlaylistAPI.getContents(
				String(playlistUri)
			);
		let current_playlist_tracks = playlistContents.items;

		let liked_songs = await Spicetify.Platform.LibraryAPI.getTracks({
			limit: 999999,
		});
		liked_songs = new Set(liked_songs.items.map((track) => track.uri));

		let unliked_songs = [];

		for (let track of current_playlist_tracks) {
			if (!liked_songs.has(track.uri)) {
				unliked_songs.push({ uri: track.uri });
			}
		}

		if (unliked_songs.length > 0) {
			await Spicetify.Platform.PlayerAPI.addToQueue(unliked_songs);
		}
	}

	new Spicetify.ContextMenu.Item(
		"Queue Unliked Songs",
		queueUnliked,
		uriPlaylist,
		`<svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M16 15H2v-1.5h14V15zm0-4.5H2V9h14v1.5zm-8.034-6A5.484 5.484 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2H7.966zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2h2z"></path></svg>`
	).register();
}
