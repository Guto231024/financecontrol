import React from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import {Text, View} from 'react-native';

export default function Login() {
  return(
    <View className="gap-4 bg-black flex-1 justify-center items-center">

      <Text className="text-4xl font-bold text-center mb-4 text-green-500">Faça seu Login</Text>
      <View className="border-2 border-green-500 rounded-2xl p-6 gap-4 bg-gray-900">

        <Input label="Email:" placeholder="Digite seu Email" className="w-80" keyboardType="email-address" autoCapitalize="none" />
        <Input label="Senha:" placeholder="Digite sua senha" secureTextEntry={true} className="w-80" />
        <Button label="Login" variant="default" className="bg-green-500"/>

      </View>
      

    </View>
  )
  ;
}