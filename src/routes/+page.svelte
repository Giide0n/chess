<script lang="ts">
	import Piece from './Piece.svelte';
	import { STANDARD_BOARD } from './Boards';
	import { onMount } from 'svelte';
	import { Board } from './Board';

	let board = STANDARD_BOARD;
	let selected: any = null;
	let selectedCoordinates: number[];

	const getTileCoordinates = (e): number[] => {
		return document
			.elementsFromPoint(e.clientX, e.clientY)
			.find((el) => {
				return el.classList.contains('tile');
			})
			.getAttribute('coordinates')
			.split(',')
			.map((el) => parseInt(el));
	};

	const dragStart = (e) => {
		selectedCoordinates = getTileCoordinates(e);
		selected = e.target;
		drag(e);
	};

	const drag = (e) => {
		if (selected) {
			e.preventDefault();
			selected.style.position = 'absolute';
			selected.style.top = e.clientY - 22 + 'px';
			selected.style.left = e.clientX - 22 + 'px';
		}
	};

	const drop = (e) => {
		if (selected) {
			selected.style.position = 'static';
			selected.style.top = '0';
			selected.style.left = '0';

			selected = null;

			const coordinates = getTileCoordinates(e);
			const fromField = board[selectedCoordinates[0]][selectedCoordinates[1]];

			board[selectedCoordinates[0]][selectedCoordinates[1]] = '';
			board[coordinates[0]][coordinates[1]] = fromField;
		}
	};

	onMount(() => {
		document.addEventListener('mousemove', drag);
	});
</script>

<div class="w-screen h-screen flex justify-center items-center">
	<div class="w-96 h-96 flex justify-center content-center flex-wrap">
		{#each board as row, i}
			{#each row as field, j}
				<div
					class="tile h-12 w-12 {((i % 2) + j) % 2 ? 'bg-red-400' : 'bg-white'}"
					coordinates="{i},{j}"
				>
					{#if field !== ''}
						<div draggable="true" on:mousedown={(e) => dragStart(e)} on:mouseup={drop}>
							<Piece pieceType={field} />
						</div>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</div>
