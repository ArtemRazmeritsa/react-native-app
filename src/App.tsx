import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShiftListScreen } from './screens/ShiftListScreen';
import { ShiftDetails } from './screens/ShiftDetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Shifts" component={ShiftListScreen} />
        <Stack.Screen name="ShiftDetails" component={ShiftDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
