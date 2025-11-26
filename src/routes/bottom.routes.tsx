import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from '../pages/menu';
import { Image, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Importando ícones modernos (Certifique-se de ter instalado: npx expo install @expo/vector-icons)

const Tab = createBottomTabNavigator();

// Componentes de Exemplo para as novas Rotas (Use seus componentes reais)
const PlaceholderScreen = ({ name }: { name: string }) => (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 24 }}>Em Desenvolvimento</Text>
    </View>
);

const ReportsScreen = () => <PlaceholderScreen name="Relatórios" />;
const ProfileScreen = () => <PlaceholderScreen name="Perfil" />;


export default function BottomRoutes() {
    
    // Wrapper para o ícone de cifrão focado, dando um destaque mais limpo
    const FocusedDollarIcon = ({ focused, color }: { focused: boolean, color: string }) => (
        <View style={{
            // Fundo circular sutil quando focado
            backgroundColor: focused ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
            borderRadius: 8,
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -8, // Leve subida para destacar
        }}>
            <Text style={{
                color: focused ? '#10b981' : color, // Mantém o verde vibrante no ativo
                fontSize: 24,
                fontWeight: 'bold',
            }}>
                $
            </Text>
        </View>
    );

    return (
        <Tab.Navigator
            screenOptions={{
                // Estilo da barra de navegação completa
                tabBarStyle: {
                    backgroundColor: '#111827', // Cinza escuro
                    borderTopWidth: 0, // Remove a borda para um visual mais limpo
                    height: 85, // Aumenta a altura para melhor toque
                    paddingBottom: 80, // Espaçamento maior para dispositivos com safe area
                    paddingTop: 10,
                    elevation: 10, // Sombra para Android
                    shadowColor: '#10b981', // Sombra sutil verde
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                },
                
                // Cores dos itens
                tabBarActiveTintColor: '#10b981', // Verde vibrante (green-500)
                tabBarInactiveTintColor: '#6b7280', // Cinza suave (gray-500)
                
                // Estilo do texto do label
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginTop: 4, // Espaço entre ícone e texto
                },
                
                // Estilo do cabeçalho
                headerStyle: {
                    backgroundColor: '#000000', // Fundo preto
                    borderBottomWidth: 1, // Borda fina
                    borderBottomColor: '#10b981', // Borda verde
                    height: 100,
                },
                headerTintColor: '#10b981', 
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 24,
                },
            }}
        >
            <Tab.Screen
                name="Fatura"
                component={Menu}
                options={{
                    // HEADER: Mantive a logo, mas o estilo pode precisar de ajustes dependendo do tamanho da imagem
                    headerTitle: () => (
                        <Image
                            source={require('../../assets/logo.png')}
                            style={{ width: 60, height: 60, marginTop: 10 }} // Diminuído o tamanho e ajustado margin
                            resizeMode="contain"
                        />
                    ),
                    headerTitleAlign: 'center',
                    tabBarLabel: 'Controle', // Rótulo simples
                    
                    // ÍCONE: Usando o componente customizado
                    tabBarIcon: ({ color, size, focused }) => (
                        <FocusedDollarIcon focused={focused} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Relatorios"
                component={ReportsScreen}
                options={{
                    headerTitle: 'Relatórios Mensais',
                    tabBarLabel: 'Relatórios',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="bar-chart-2" size={24} color={color} />
                    ),
                }}
            />
            
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    headerTitle: 'Meu Perfil',
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}