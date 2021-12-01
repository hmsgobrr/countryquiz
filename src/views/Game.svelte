<script lang="ts">
    import Spinner from "../components/Spinner.svelte";
    import { onMount } from "svelte";

    type QuestionType = "name" | "capital" | "flag";
    interface Question {}

    let countryData = [];
    let isLoadingData = true;
    let questions = {};

    onMount(async () => {
        fetch("https://restcountries.com/v3.1/all?fields=name,capital,flag")
            .then((res) => res.json())
            .then((data: Array<any>) => {
                countryData = data;
                isLoadingData = false;
            });
    });
</script>

{#if isLoadingData}
    <div class="loaddata">
        <Spinner />
        <h3>Getting Quiz data</h3>
    </div>
{:else}
    <h2>I AM A SUPA HARD QUESTION!</h2>

    <div class="answers">
        <button>oh no</button>
        <button>;-;</button>
        <button>im gana ded</button>
        <button>ae</button>
    </div>
{/if}

<style>
    .loaddata {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .answers {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .answers button {
        margin: 2px;
        width: 250px;
        height: 250px;
    }
</style>
