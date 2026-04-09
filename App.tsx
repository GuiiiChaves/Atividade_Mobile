import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Platform, StatusBar as RNStatusBar, Modal, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TaskList from './src/components/TaskList';
import { addTask, deleteAllTasks, deleteTask, getAllTasks, updateTask, TaskItem } from './src/utils/handle-api';
import { Image } from 'expo-image';
import Checkbox from 'expo-checkbox';
import NativeDatePicker from './src/components/NativeDatePicker';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [dueDateText, setDueDateText] = useState('');

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);

  const updateMode = (_id: string, taskText: string, taskCompleted: boolean, taskDueDate?: string) => {
    setIsUpdating(true);
    setText(taskText);
    setTaskId(_id);
    setCompleted(taskCompleted);
    if (taskDueDate) {
      setDueDateText(new Date(taskDueDate).toLocaleDateString('pt-BR'));
    } else {
      setDueDateText('');
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    let dueDateStr: string | undefined;
    if (dueDateText) {
      const [day, month, year] = dueDateText.split('/');
      const parsed = new Date(`${year}-${month}-${day}`);
      if (!isNaN(parsed.getTime())) dueDateStr = parsed.toISOString();
    }
    if (isUpdating) {
      updateTask(taskId, text, completed, dueDateStr, setTasks, setText, setIsUpdating);
    } else {
      addTask(text, completed, dueDateStr, setText, setTasks);
    }
    setModalVisible(false);
    setCompleted(false);
    setDueDateText('');
  };

  const handleCancel = () => {
    setModalVisible(false);
    setText('');
    setCompleted(false);
    setDueDateText('');
    setIsUpdating(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source="https://github.com/renanalencar/tasks-app-expo/blob/main/tasks/images/image.png?raw=true"
          style={{ width: '100%', height: 100 }}
        />
        <Text style={styles.header}>Tarefas</Text>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.newButton,
              pressed && { transform: [{ scale: 0.98 }], elevation: 1 },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Nova Tarefa</Text>
          </Pressable>
          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.deleteAllButton,
              pressed && { transform: [{ scale: 0.98 }], elevation: 1 },
            ]}
            onPress={() => deleteAllTasks(tasks, setTasks)}
          >
            <Text style={styles.buttonText}>Excluir tudo</Text>
          </Pressable>
        </View>

        <TaskList
          tasks={tasks}
          onEdit={updateMode}
          onDelete={(id) => deleteTask(id, setTasks)}
        />
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isUpdating ? 'Editar Tarefa' : 'Nova Tarefa'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Descrição da tarefa..."
              value={text}
              onChangeText={setText}
            />
            <View style={styles.checkboxRow}>
              <Checkbox value={completed} onValueChange={setCompleted} />
              <Text style={styles.checkboxLabel}>Marcar como Concluída</Text>
            </View>
            <NativeDatePicker value={dueDateText} onChange={setDueDateText} />
            <View style={styles.modalButtons}>
              <Pressable
                style={({ pressed }: { pressed: boolean }) => [
                  styles.cancelButton,
                  pressed && { transform: [{ scale: 0.98 }], elevation: 1 },
                ]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={({ pressed }: { pressed: boolean }) => [
                  styles.saveButton,
                  pressed && { transform: [{ scale: 0.98 }], elevation: 1 },
                ]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>
                  {isUpdating ? 'Atualizar' : 'Salvar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  newButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
  },
  deleteAllButton: {
    backgroundColor: '#c0392b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    width: '85%',
    gap: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkboxLabel: {
    fontSize: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
  },
});
