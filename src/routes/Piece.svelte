<script lang="ts">
	import type { Piece } from './PieceType';

	export let piece: Piece;

	$: svgName = piece?.color + piece?.type;
</script>

<div class="h-fit w-full flex justify-center content-center">
	{#if svgName}
		<img
			class="transition duration-200 hover:scale-110 h-[9vw] w-[9vw] min-h-[2.4rem] min-w-[2.4rem] max-h-[10vh] max-w-[10vh]"
			src="/src/lib/images/pieces/{svgName}.svg"
		/>
	{/if}
</div>
