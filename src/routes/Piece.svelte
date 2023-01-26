<script lang="ts">
    import {PieceType} from "./PieceType";

    export let pieceType: PieceType

</script>
<div class="h-full w-full flex justify-center content-center">
    <img src="/src/lib/images/pieces/{pieceType}.svg">
</div>
