import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from '../pages/menu';

const Tab = createBottomTabNavigator();

export default function BottomRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Menu}
            />
        </Tab.Navigator>
    )
}