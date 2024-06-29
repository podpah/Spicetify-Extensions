// @ts-check
// NAME: shuffleQueue
// AUTHOR: podpah
// DESCRIPTION: Shuffle the queue
/// <reference path="../globals.d.ts" />

let shuffle_queue_style = document.createElement("style");
shuffle_queue_style.innerHTML = `
.queue-page-header {
    display: flex;
    justify-content: space-between;
}
.queue-queuePage-header {
    display: inline;
    position: relative;
}
#shuffleQueueButton{
    display: inline;
}
`;
document.head.appendChild(shuffle_queue_style);

function generate_button() {
	let parentDiv = document.getElementsByClassName(
		"queue-queuePage-queuePage",
	)[0];
    if (!parentDiv ) {
        return;
    }
    
    let isButtonCreated = document.getElementById("shuffleQueueButton")
    if (isButtonCreated){
        let targetDiv = document.querySelector('.queue-queuePage-nextInQueue.queue-queuePage-subHeader');
        isButtonCreated.style.display = targetDiv ? 'inline' : 'none';
        return;
    }

	let shuffleQueueButton = document.createElement("button");
	shuffleQueueButton.onclick = function () {
		queueShufflerMain();
	};
	shuffleQueueButton.innerText = "Shuffle queue";
	shuffleQueueButton.classList.add(
		"Button-sc-y0gtbx-0",
		"Button-small-buttonSecondary-useBrowserDefaultFocusStyle"
	);
    shuffleQueueButton.id = "shuffleQueueButton"

	let newDiv = document.createElement("div");
	newDiv.classList.add("queue-page-header");
	newDiv.appendChild(parentDiv.querySelector(".queue-queuePage-header"));
	newDiv.appendChild(shuffleQueueButton);
	parentDiv.prepend(newDiv);
}

setInterval(generate_button, 2500)

function queueShufflerMain() {
    let button = document.getElementById("shuffleQueueButton")
    button.disabled = true
	function shuffle(queue) {
		for (let i = queue.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[queue[i], queue[j]] = [queue[j], queue[i]];
		}
		return queue.map((each) => ({ uri: each }));
	}

	if (!Spicetify.Player) {
		setTimeout(queueShufflerMain, 200);
		return;
	}

	if (Spicetify.Player.origin._queue._queueState.queued == []) {
		return;
	}

	async function shuffleQueue() {
		let current_queued_uri =
			Spicetify.Player.origin._queue._queueState.queued.map(
				(each) => each.uri
			);
		let shuffled = shuffle(current_queued_uri);
		await Spicetify.removeFromQueue(shuffled);
		await Spicetify.addToQueue(shuffled);
	}

	shuffleQueue();
    button.disabled = false
}
