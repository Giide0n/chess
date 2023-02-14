<script lang="ts">
	import Piece from './Piece.svelte';
	import { onMount } from 'svelte';
	import { GameState } from './GameState';

	import init, { Game } from 'rust';

	const gameState: GameState = new GameState();
	let game: Game;
	let board: string[] = [];

	let selected: any = undefined;
	let selectedCoordinates: number | undefined = undefined;
	let selectedLegalMoves: number[] = [];

	let currentPlayer: string;

	onMount(async () => {
		document.addEventListener('mousemove', drag);
		init().then(() => {
			game = new Game();
			currentPlayer = game.get_current_player();
			board = game.get_board();

			console.log(board);
		});
	});

	const getTileCoordinates = (e: any): number | undefined => {
		const coordinates = document
			.elementsFromPoint(e.clientX, e.clientY)
			.find((el) => {
				return el.classList.contains('tile');
			})
			?.getAttribute('data-coordinates');

		if (!coordinates) {
			return undefined;
		}

		return parseInt(coordinates);
	};

	const dragStart = (e: any) => {
		selectedCoordinates = getTileCoordinates(e);
		selected = e.target;

		selected.style.position = 'absolute';

		if (selectedCoordinates !== undefined) {
			setLegalMoves(selectedCoordinates);
		}

		drag(e);
	};

	const drag = (e: any) => {
		if (selected) {
			e.preventDefault();

			selected.style.top = e.clientY - selected.height / 2 + 'px';
			selected.style.left = e.clientX - selected.width / 2 + 'px';
		}
	};

	const drop = (e: any) => {
		if (selected) {
			selected.style.position = 'static';
			selected.style.top = '0';
			selected.style.left = '0';

			selected = undefined;
			selectedLegalMoves = [];

			const coordinates = getTileCoordinates(e);

			if (coordinates === undefined || selectedCoordinates === undefined) {
				return;
			}

			// gameState.attemptMove(selectedCoordinates, coordinates);
			game.attempt_move(selectedCoordinates, coordinates);
			currentPlayer = game.get_current_player();
			board = game.get_board();
		}
	};

	const setLegalMoves = (coordinates: number) => {
		if (selected) {
			return;
		}
		// selectedLegalMoves = gameState.getLegalMoves(coordinates);
	};
</script>

<div class="h-screen w-screen flex flex-col">
	<h1 class="text-7xl text-center">Current Player: {currentPlayer}</h1>
	<div class="w-full h-full flex justify-center items-center">
		<div
			class="h-[80vw] w-[80vw] min-h-[24rem] min-w-[24rem] max-h-[80vh] max-w-[80vh] grid grid-cols-8 auto-rows-fr"
		>
			{#each board as field, i}
				<div
					class="tile h-full w-full {((Math.floor(i / 8) % 2) + (i % 2)) % 2
						? 'bg-red-400'
						: 'bg-white'}"
					data-coordinates={i}
				>
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					<div
						on:mouseover={() => setLegalMoves(i)}
						on:mouseup={drop}
						class={selectedLegalMoves.some((x) => x === i) ? 'opacity-50 bg-green-600' : ''}
					>
						{#if field !== undefined}
							<div on:mousedown={(e) => dragStart(e)} class="">
								<Piece piece={field} />
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
