<script>
    import { user, auth } from '$lib/db'
</script>


{#if $user}
    <p>You are signed in as {$user.email}</p>
    <button on:click={() => auth.signOut()}>Sign out</button>
{/if}
