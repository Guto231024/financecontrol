import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

export default function Register() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');

  const handleRegister = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu email');
      return;
    }
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Erro', 'O email deve ser @gmail.com');
      return;
    }
    if (!senha.trim() || !senha2.trim()) {
      Alert.alert('Erro', 'Por favor, digite e repita sua senha');
      return;
    }
    if (senha.length < 8) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres');
      return;
    }
    if (senha !== senha2) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    // Cadastro real com Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    });
    if (error) {
      Alert.alert('Erro ao registrar', error.message);
      return;
    }
    Alert.alert('Sucesso', 'Conta criada! Faça login.');
    navigation.goBack();
  };

  return (
    <View className="gap-4 bg-black flex-1 items-center pt-20">
      <Image
        source={require('../../../assets/logo.png')}
        style={{ width: 180, height: 180, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text className="text-4xl font-bold text-center mb-4 text-green-500">Crie sua Conta</Text>
      <View className="border-2 border-green-500 rounded-2xl p-6 gap-4 bg-gray-900">
        <Input
          label="Email:"
          placeholder="Digite seu Email"
          className="w-80"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Senha:"
          placeholder="Digite sua senha"
          secureTextEntry={true}
          className="w-80"
          value={senha}
          onChangeText={setSenha}
        />
        <Input
          label="Repita a Senha:"
          placeholder="Digite sua senha novamente"
          secureTextEntry={true}
          className="w-80"
          value={senha2}
          onChangeText={setSenha2}
        />
        <Button label="Registrar" variant="default" className="bg-green-500" onPress={handleRegister} />
      </View>
      <View className="flex-row gap-2 mt-4">
        <Text className="text-gray-400">Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-green-500 font-bold">Faça login</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-8 items-center">
        <Text className="text-gray-600 text-xs">© 2025 FinanceControl</Text>
        <Text className="text-gray-600 text-xs">Todos os direitos reservados</Text>
      </View>
    </View>
  );
}
