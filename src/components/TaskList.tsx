import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import { TaskItem as TaskItemType } from '../utils/handle-api';

interface TaskListProps {
  tasks: TaskItemType[];
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TaskItem
          text={item.text}
          onEdit={() => onEdit(item._id, item.text)}
          onDelete={() => onDelete(item._id)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
});

export default TaskList;
