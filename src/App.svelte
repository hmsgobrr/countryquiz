<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import Home from "./views/Home.svelte";
</script>

<Router>
    <Route path="/">
        <Home />
    </Route>
    <Route path="/play">
        <h1>ae.</h1>
    </Route>
</Router>

<style>
</style>
