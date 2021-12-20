<script lang="ts">
    import Spinner from "../components/Spinner.svelte";
    import { onMount } from "svelte";

    interface Country {
        readonly name: { common: string };
        readonly flag: string;
    }

    interface Question {    
        readonly questionTypeIsFlag: boolean;
        readonly country: Country;
        readonly answer: string;
        constructor() {
            this.questionTypeIsFlag = Math.random() < 0.5;
        }
    }

    let countryData: Country[] = [];
    let isLoadingData = true;
    let questions: Question[];
    let questionIdx: number;
    let answers: string[];

    function getRandomCountryBesides(countryName: string): Country {
        const countryBesides = countryData.filter((country) => country.name.common != countryName);
        return countryBesides[Math.floor(Math.random() * countryBesides.length)];
    }

    onMount(async () => {
        const countryRes = await fetch("https://restcountries.com/v3.1/all?fields=name,flag");
        countryData = await countryRes.json();
        questions = new Array<Question>(7).fill({
            questionTypeIsFlag: Math.random() < 0.5,
            country: countryData[Math.floor(Math.random() * countryData.length)],
        });
        questionIdx = 0;
        answers = new Array<string>(4).map((answer) => getRandomCountryBesides(questions[questionIdx].country.name.common).flag);
        answers[Math.floor(Math.random() * answers.length)] = questions[questionIdx].country.flag;
        isLoadingData = false;
    });
</script>

{#if isLoadingData}
    <div class="loaddata">
        <Spinner />
        <h3>Loading data</h3>
    </div>
{:else}
    <h2>Wat is {questions[questionIdx].country.name.common}</h2>

    <div class="answers">
        <!-- <button>
            {getAnswer(getRandomCountryBesides(questions[0].country.name.common), "flag")}
        </button>
        <button>{getAnswer(questions[0].country, "flag")}</button> -->
        {#each answers as answer}
            <button>{answer ? answer : `No flags`}</button>
        {/each}
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
        font-size: 50px;
    }

    .answers button {
        background: #fff;
        margin: 2px;
        width: 250px;
        height: 250px;
    }
</style>
