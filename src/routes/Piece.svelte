<script lang="ts">
	export let piece: string;
</script>

<div class="h-fit w-full flex justify-center content-center">
	{#if piece}
		<img
			class="transition duration-200 hover:scale-110 h-[9vw] w-[9vw] min-h-[2.4rem] min-w-[2.4rem] max-h-[10vh] max-w-[10vh]"
			src="/src/lib/images/pieces/{piece}.svg"
		/>
	{/if}
</div>
