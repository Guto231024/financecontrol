import { supabase } from '../lib/supabase';

// Salvar salário
export async function salvarSalario(valor: number) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('Usuário não autenticado');
  const { data, error } = await supabase.from('salario').insert([
    { valor, data: new Date().toISOString().slice(0, 10), user_id: user.id }
  ]);
  if (error) throw error;
  return data;
}

// Buscar salário mais recente do usuário
export async function buscarSalario() {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('Usuário não autenticado');
  const { data, error } = await supabase
    .from('salario')
    .select('*')
    .eq('user_id', user.id)
    .order('data', { ascending: false })
    .limit(1);
  if (error) throw error;
  return data?.[0] || null;
}

// Salvar gasto
export async function salvarGasto(nome: string, valor: number) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('Usuário não autenticado');
  const { data, error } = await supabase.from('gastos').insert([
    { nome, valor, data: new Date().toISOString().slice(0, 10), user_id: user.id }
  ]);
  if (error) throw error;
  return data;
}

// Buscar todos os gastos do usuário
export async function buscarGastos() {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('Usuário não autenticado');
  const { data, error } = await supabase
    .from('gastos')
    .select('*')
    .eq('user_id', user.id)
    .order('data', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Excluir gasto por id
export async function excluirGasto(id: string) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('Usuário não autenticado');
  const { error } = await supabase.from('gastos').delete().eq('id', id).eq('user_id', user.id);
  if (error) throw error;
}
