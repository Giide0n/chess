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

			selected.style.top = e.clientY - 22 + 'px';
			selected.style.left = e.clientX - 22 + 'px';
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

<div class="w-screen h-screen flex justify-center items-center">
	<div class="w-96 h-96 flex justify-center content-center flex-wrap">
		{#each boardState as row, i}
			{#each row as field, j}
				<div
					class="tile h-12 w-12 {((i % 2) + j) % 2 ? 'bg-red-400' : 'bg-white'}"
					coordinates="{i},{j}"
				>
					<div
						on:mouseover={() => setLegalMoves({ row: i, column: j })}
						on:mouseup={drop}
						class="h-full w-full {selectedLegalMoves.some((el) => el.row === i && el.column === j)
							? 'opacity-50 bg-green-600'
							: ''}"
					>
						{#if field !== undefined}
							<div on:mousedown={(e) => dragStart(e)}>
								<Piece piece={field} />
							</div>
						{/if}
					</div>
				</div>
			{/each}
		{/each}
	</div>
</div>
