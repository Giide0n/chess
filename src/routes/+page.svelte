<script lang="ts">
	import Piece from './Piece.svelte';
	import { onMount } from 'svelte';
	import type { Coordinates } from './Coordinates';
	import type { BoardState } from './Boards';
	import { GameState } from './GameState';

	const gameState: GameState = new GameState();

	let boardState: BoardState = gameState.getBoardState();
	let selected: unknown = undefined;
	let selectedCoordinates: Coordinates | undefined = undefined;
	let selectedLegalMoves: Coordinates[] = [];

	let currentPlayer = gameState.getCurrentPlayer();

	const getTileCoordinates = (e): Coordinates | undefined => {
		const coordinates = document
			.elementsFromPoint(e.clientX, e.clientY)
			.find((el) => {
				return el.classList.contains('tile');
			})
			.getAttribute('coordinates')
			.split(',')
			.map((el) => parseInt(el));

		if (!coordinates) {
			return undefined;
		}

		return { row: coordinates[0], column: coordinates[1] };
	};

	const dragStart = (e) => {
		selectedCoordinates = getTileCoordinates(e);
		selected = e.target;

		selected.style.position = 'absolute';
		setLegalMoves(selectedCoordinates);

		drag(e);
	};

	const drag = (e) => {
		if (selected) {
			e.preventDefault();

			selected.style.top = e.clientY - selected.height / 2 + 'px';
			selected.style.left = e.clientX - selected.width / 2 + 'px';
		}
	};

	const drop = (e) => {
		if (selected) {
			selected.style.position = 'static';
			selected.style.top = '0';
			selected.style.left = '0';

			selected = undefined;
			selectedLegalMoves = [];

			const coordinates = getTileCoordinates(e);

			if (!coordinates) {
				return;
			}

			gameState.attemptMove(selectedCoordinates, coordinates);
			currentPlayer = gameState.getCurrentPlayer();
			boardState = gameState.getBoardState();
		}
	};

	const setLegalMoves = (coordinates: Coordinates) => {
		if (selected) {
			return;
		}
		selectedLegalMoves = gameState.getLegalMoves(coordinates);
	};

	onMount(() => {
		document.addEventListener('mousemove', drag);
	});
</script>

<div class="h-screen w-screen flex flex-col">
	<h1 class="text-7xl text-center">Current Player: {currentPlayer}</h1>
	<div class="w-full h-full flex justify-center items-center">
		<div
			class="h-[80vw] w-[80vw] min-h-[24rem] min-w-[24rem] max-h-[80vh] max-w-[80vh] grid grid-cols-8 auto-rows-fr"
		>
			{#each boardState as row, i}
				{#each row as field, j}
					<div
						class="tile h-full w-full {((i % 2) + j) % 2 ? 'bg-red-400' : 'bg-white'}"
						coordinates="{i},{j}"
					>
						<div
							on:mouseover={() => setLegalMoves({ row: i, column: j })}
							on:mouseup={drop}
							class={selectedLegalMoves.some((el) => el.row === i && el.column === j)
								? 'opacity-50 bg-green-600'
								: ''}
						>
							{#if field !== undefined}
								<div on:mousedown={(e) => dragStart(e)} class="">
									<Piece piece={field} />
								</div>
							{/if}
						</div>
					</div>
				{/each}
			{/each}
		</div>
	</div>
</div>
