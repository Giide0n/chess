<script lang="ts">
	import type { Piece } from './PieceType';

	export let piece: Piece;

	$: svgName = piece?.color + piece?.type;
</script>

<div class="h-full w-full flex justify-center content-center">
	{#if svgName}
		<img src="/src/lib/images/pieces/{svgName}.svg" />
	{/if}
</div>
