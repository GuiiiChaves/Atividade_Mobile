import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

interface TaskItemProps {
  text: string;
  completed: boolean;
  dueDate?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ text, completed, dueDate, onEdit, onDelete }) => {
  return (
    <View style={styles.todo}>
      <View style={styles.info}>
        <Text style={[styles.text, completed && styles.textDone]}>{text}</Text>
        {dueDate && (
          <Text style={styles.dueDate}>
            Vence: {new Date(dueDate).toLocaleDateString('pt-BR')}
          </Text>
        )}
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onEdit}>
          <Feather name="edit" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <AntDesign name="delete" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#000',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  dueDate: {
    color: '#ccc',
    fontSize: 12,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 16,
  },
  icon: {
    padding: 2,
  },
});

export default TaskItem;
