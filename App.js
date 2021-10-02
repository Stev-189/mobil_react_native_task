import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';// la navegacion
import { createStackNavigator } from '@react-navigation/stack'; // la forma de navegacion

import HomeScreen from './screens/HomeScreen';
import TaskFormScreen from './screens/TaskFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name= "HomeScreen" 
        component={HomeScreen} 
        
        /* options={{
          headerStyle: {backgroundColor: "#222f3e"},
          headerTitleStyle: {color: '#ffffff'},
          headerRight: ()=>(
            <TouchableOpacity
              onPress={()=>console.log('Pressed')}
            >
              <Text>New</Text>
            </TouchableOpacity>
          )}
        } */
        //para usar navigation la options debe ser una funcion que retorne lemimo objeto
        options={({navigation})=>({
          title: 'Task App',
          headerStyle: {backgroundColor: "#222f3e"},
          headerTitleStyle: {color: '#ffffff'},
          headerRight: ()=>(
            <TouchableOpacity
              // onPress={()=>console.log('Pressed')}
              //accedemos alaafuncion de navigation 
              onPress={()=>navigation.navigate('TaskFormScreen')}
            >
              <Text
                style={{color: '#ffffff', marginRight: 20, fontSize: 15}}
              >New</Text>
            </TouchableOpacity>
          )})
        }
        />
        <Stack.Screen name= "TaskFormScreen" component={TaskFormScreen} 
          options={{
            title: 'Create a Task',
            headerStyle:{
              backgroundColor: '#222f3e'
            },
            //color texto titulo
            headerTitleStyle:{color: '#ffffff'},
            //para elcolor de la flecha
            headerTintColor: '#ffffff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

