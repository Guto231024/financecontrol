import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Dimensions } from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons'; // Certifique-se de ter instalado esta biblioteca: npx expo install @expo/vector-icons

// Definindo o tipo de gasto
interface Gasto {
  id: string;
  nome: string;
  valor: number;
  data: string;
}

// Largura da tela para modais e ajustes de layout
const { width } = Dimensions.get('window');

export default function Menu() {
  const [salario, setSalario] = useState(0);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  
  const [modalSalarioVisible, setModalSalarioVisible] = useState(false);
  const [modalGastoVisible, setModalGastoVisible] = useState(false);
  
  const [novoSalario, setNovoSalario] = useState('');
  const [nomeGasto, setNomeGasto] = useState('');
  const [valorGasto, setValorGasto] = useState('');

  // Calcular totais
  const totalGasto = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);
  const saldoDisponivel = salario - totalGasto;

  // Formatação de valores monetários
  const formatValue = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const adicionarSalario = () => {
    // Remove 'R$ ', pontos (milhar) e troca vírgula por ponto (decimal)
    const valor = parseFloat(
      novoSalario.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
    );
    
    if (!novoSalario.trim() || isNaN(valor) || valor <= 0) {
      Alert.alert('Erro', 'Digite um valor válido para o salário.');
      return;
    }

    setSalario(valor);
    setNovoSalario('');
    setModalSalarioVisible(false);
    Alert.alert('Sucesso', 'Salário adicionado com sucesso! 💰');
  };

  const adicionarGasto = () => {
    // Remove 'R$ ', pontos (milhar) e troca vírgula por ponto (decimal)
    const valor = parseFloat(
      valorGasto.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
    );
    
    if (!nomeGasto.trim()) {
      Alert.alert('Erro', 'Digite o nome do gasto.');
      return;
    }
    
    if (!valorGasto.trim() || isNaN(valor) || valor <= 0) {
      Alert.alert('Erro', 'Digite um valor válido para o gasto.');
      return;
    }

    const novoGasto: Gasto = {
      id: Date.now().toString(),
      nome: nomeGasto,
      valor: valor,
      data: new Date().toLocaleDateString('pt-BR'),
    };

    setGastos([...gastos, novoGasto]);
    setNomeGasto('');
    setValorGasto('');
    setModalGastoVisible(false);
    Alert.alert('Sucesso', 'Gasto adicionado com sucesso! 💸');
  };

  const excluirGasto = (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir este gasto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setGastos(gastos.filter(gasto => gasto.id !== id));
            Alert.alert('Sucesso', 'Gasto excluído! 🗑️');
          },
        },
      ]
    );
  };

  // Determinar a cor do saldo
  const saldoColor = saldoDisponivel > 0 ? 'text-green-400' : 
                     saldoDisponivel < 0 ? 'text-red-500' : 
                     'text-gray-400';

  return (
    <ScrollView 
      className="flex-1 bg-black"
      contentContainerStyle={{ paddingBottom: 40 }} // Adiciona padding no fim para a rolagem
    >
      <View className="pt-12 px-5 pb-10">
        
        {/* Título da Tela */}
        <Text className="text-4xl font-extrabold text-white mb-8">
          Financeiro <Text className="text-green-500">Guto</Text>
        </Text>

        {/* Card do Salário - Destaque Principal */}
        <View className="rounded-2xl p-6 bg-gray-800 border-b-4 border-green-500 shadow-xl shadow-green-900/50 mb-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg text-gray-400 font-semibold">Salário Mensal</Text>
            <TouchableOpacity
              className="p-1.5 rounded-full bg-green-500/20"
              onPress={() => setModalSalarioVisible(true)}
            >
              <Feather name="edit" size={18} color="#10b981" />
            </TouchableOpacity>
          </View>
          <Text className="text-5xl font-extrabold text-green-500 mt-2">
            R$ {formatValue(salario)}
          </Text>
        </View>

        {/* Card do Saldo Disponível - Visão Geral */}
        <View className="rounded-2xl p-6 bg-gray-800 border-b-4 border-blue-500 shadow-xl shadow-blue-900/50 mb-8">
          <Text className="text-xl text-white font-bold mb-3">Saldo Disponível</Text>
          <Text className={`text-5xl font-extrabold ${saldoColor}`}>
            R$ {formatValue(saldoDisponivel)}
          </Text>
          
          <View className="mt-6 flex-row justify-around border-t border-gray-700 pt-4">
            <View className="items-center">
              <Text className="text-gray-400 text-sm">Receita</Text>
              <View className="flex-row items-center mt-1">
                <Feather name="arrow-up-circle" size={16} color="#4ade80" />
                <Text className="text-green-400 font-bold text-xl ml-2">R$ {formatValue(salario)}</Text>
              </View>
            </View>
            <View className="items-center border-l border-gray-700 pl-6">
              <Text className="text-gray-400 text-sm">Despesa</Text>
              <View className="flex-row items-center mt-1">
                <Feather name="arrow-down-circle" size={16} color="#f87171" />
                <Text className="text-red-500 font-bold text-xl ml-2">R$ {formatValue(totalGasto)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Seção de Gastos */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-3xl font-bold text-white">Minhas Despesas</Text>
            <TouchableOpacity 
              className="bg-red-500/80 rounded-full w-12 h-12 items-center justify-center shadow-md shadow-red-900/50"
              onPress={() => setModalGastoVisible(true)}
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Lista de Gastos */}
          {gastos.length > 0 ? (
            <View className="gap-3">
              {gastos.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).map((gasto) => ( // Ordena por mais recente
                <View 
                  key={gasto.id}
                  className="rounded-xl p-4 bg-gray-900 flex-row items-center justify-between border border-gray-700"
                >
                  <View className="flex-1 pr-2">
                    <Text className="text-white font-bold text-lg leading-5">{gasto.nome}</Text>
                    <Text className="text-gray-500 text-xs mt-1">Data: {gasto.data}</Text>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <Text className="text-red-500 font-bold text-xl">
                      - R$ {formatValue(gasto.valor)}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => excluirGasto(gasto.id)}
                      className="bg-red-700/50 rounded-full w-8 h-8 items-center justify-center ml-2"
                    >
                      <Feather name="x" size={18} color="#f87171" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="items-center py-12 border border-gray-700 rounded-xl bg-gray-900 mt-4">
              <Feather name="file-text" size={40} color="#4b5563" />
              <Text className="text-gray-500 text-lg mt-3">Nenhuma despesa registrada</Text>
              <Text className="text-gray-600 text-sm">Use o botão "+" para começar a controlar.</Text>
            </View>
          )}
        </View>

      </View>

      {/* Modal Adicionar Salário */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalSalarioVisible}
        onRequestClose={() => setModalSalarioVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/90">
          <View 
            style={{ width: width * 0.9 }}
            className="bg-gray-800 rounded-2xl p-6 border-b-4 border-green-500 shadow-lg shadow-green-900/70"
          >
            <Text className="text-2xl font-bold text-green-400 mb-6">Atualizar Salário</Text>
            
            <TextInputMask
              type={'money'}
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: ''
              }}
              value={novoSalario}
              onChangeText={setNovoSalario}
              customTextInput={Input}
              customTextInputProps={{
                label: "Novo Salário:",
                placeholder: "Ex: 2.500,00",
                keyboardType: "numeric",
                className: "mb-6",
                inputClassName: "text-green-400" 
              }}
            />

            <View className="flex-row gap-3">
              <Button
                label="Cancelar"
                variant="ghost"
                className="flex-1 border border-gray-600"
                // textClassName="text-gray-400" <-- REMOVIDO
                onPress={() => {
                  setNovoSalario('');
                  setModalSalarioVisible(false);
                }}
              />
              <Button
                label="Salvar"
                variant="default"
                // Removido textClassName="font-bold" e incluído o negrito diretamente no className,
                // esperando que o Button interprete as classes de texto.
                className="flex-1 bg-green-500 font-bold" 
                onPress={adicionarSalario}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Adicionar Gasto */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalGastoVisible}
        onRequestClose={() => setModalGastoVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/90">
          <View 
            style={{ width: width * 0.9 }}
            className="bg-gray-800 rounded-2xl p-6 border-b-4 border-red-500 shadow-lg shadow-red-900/70"
          >
            <Text className="text-2xl font-bold text-red-400 mb-6">Adicionar Nova Despesa</Text>
            
            <Input
              label="Nome da Despesa:"
              placeholder="Ex: Aluguel, Supermercado..."
              value={nomeGasto}
              onChangeText={setNomeGasto}
              className="mb-4"
              
            />

            <TextInputMask
              type={'money'}
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: ''
              }}
              value={valorGasto}
              onChangeText={setValorGasto}
              customTextInput={Input}
              customTextInputProps={{
                label: "Valor:",
                placeholder: "Ex: 1.250,50",
                keyboardType: "numeric",
                className: "mb-6",
                inputClassName: "text-red-400" 
              }}
            />

            <View className="flex-row gap-3">
              <Button
                label="Cancelar"
                variant="ghost"
                className="flex-1 border border-gray-600"
                // textClassName="text-gray-400" <-- REMOVIDO
                onPress={() => {
                  setNomeGasto('');
                  setValorGasto('');
                  setModalGastoVisible(false);
                }}
              />
              <Button
                label="Adicionar"
                variant="default"
                // Removido textClassName="font-bold" e incluído o negrito diretamente no className.
                className="flex-1 bg-red-500 font-bold" 
                onPress={adicionarGasto}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
