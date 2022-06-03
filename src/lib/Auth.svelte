<script>
    import { supabase } from '$lib/control/db'
  
    let loading = false
    let email = '';
  
    const handleLogin = async () => {
        try {
            loading = true
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.log(errorMessage);
        } finally {
            loading = false
        }
    }
</script>

<form on:submit|preventDefault={handleLogin}>
    <div>
        <div>
            <input type="email" placeholder="Your email" bind:value={email}/>
        </div>
        <div>
            <input type="submit" value={loading ? "Loading" : "Send magic link"} disabled={loading} />
        </div>
    </div>
</form>