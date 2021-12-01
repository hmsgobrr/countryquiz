<script lang="ts">
    import Home from "./views/Home.svelte";
    import Game from "./views/Game.svelte";

    let gameStarted = false;
</script>

<main class={gameStarted ? "game-flex" : ""}>
    {#if !gameStarted}
        <Home />
        <button class="playbutton" on:click={() => (gameStarted = true)}>PLAY</button>
    {:else}
        <Game />
    {/if}
</main>

<style>
    :global(body) {
        background: #202020;
        color: #fff;
    }

    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .game-flex {
        justify-content: space-evenly !important;
    }

    .playbutton {
        background: none;
        border: none;
        color: #fff;
        font-weight: bold;
        transition: color 1s;
    }

    .playbutton:hover {
        color: #08c0d9;
    }
</style>
