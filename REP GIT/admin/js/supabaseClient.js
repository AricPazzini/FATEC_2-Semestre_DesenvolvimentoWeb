// Conexao com o Supabase (banco de dados do painel administrativo).
//
// Estas duas linhas PODEM ficar no GitHub publico: a chave "publishable"
// foi feita para rodar no navegador de quem acessa o site.
// A chave "secret" e a senha do banco NUNCA entram aqui.
const SUPABASE_URL = "https://ybpvcjjoppbrnlhnbfqi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_elPC_LeuEFx7pkR4hm7lMQ_unyhWhEy";

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
