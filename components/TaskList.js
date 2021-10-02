import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, FlatList, RefreshControl, Alert } from 'react-native'
import { useIsFocused } from '@react-navigation/core';

import { getTasks, deleteTask } from '../api';
import TaskItem from './TaskItem';


const TaskList = ({navigation}) => {

  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const getUsers = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const loadtasks = async ()=>{
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(()=>{
    loadtasks();
  }, [isFocused]);

  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    //await getUsers();
    await loadtasks();
    setRefreshing(false);
  }, []);
  
  const handleDelete = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete the task", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          await deleteTask(id);
          await getUsers();
        },
      },
    ]);
  };
  
  const renderItem=({item})=>{
    return <TaskItem task={item} handleDelete={handleDelete} />;
  };
  return (
    <FlatList
        style={{ flex: 1, width: "90%" }}
        data={tasks}
        //esto es comom colocarele una key unica a cada elemento pero debe ser un string
        keyExtractor={(item)=>item.id+' '}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
          />
        }
      />
  )
}

export default TaskList
