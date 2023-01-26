<script lang="ts">
    import Piece from "./Piece.svelte";
    import {STANDARD_BOARD} from "./Boards";

    let board = STANDARD_BOARD

    const dragStart = (e, rowIndex, fieldIndex) => {
        console.log('dragstart')
        e.dataTransfer.setData('rowIndex', rowIndex)
        e.dataTransfer.setData('fieldIndex', fieldIndex)
    }

    const drop = (e, rowIndex, fieldIndex) => {
        console.log('drop')
        const fromRowIndex = e.dataTransfer.getData('rowIndex')
        const fromFieldIndex = e.dataTransfer.getData('fieldIndex')
        const fromField = board[fromRowIndex][fromFieldIndex]

        board[fromRowIndex][fromFieldIndex] = ''
        board[rowIndex][fieldIndex] = fromField
    }
</script>

<div class="w-screen h-screen flex justify-center items-center">
    <div class="w-96 h-96 flex justify-center content-center flex-wrap">
        {#each board as row, i}
            {#each row as field, j}
                <div class="h-12 w-12 {((i % 2) + j) % 2 ? 'bg-red-400' : 'bg-white'}"
                     on:drop={e => drop(e, i, j)}
                     ondragover="return false">
                    {#if field !== ''}
                        <div draggable="true" on:dragstart={e => dragStart(e, i, j)}>
                            <Piece pieceType="{field}"/>
                        </div>
                    {/if}
                </div>
            {/each}
        {/each}
    </div>
</div>
