import * as React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function TeacherList() {
  const [teachers, setTeachers] = React.useState([])
  const [favorites, setFavorites] = React.useState<number[]>([])
  const [isFlitersVisible, setIsFlitersVisible] = React.useState(false)

  const [subject, setSubject] = React.useState('')
  const [week_day, setWeek_day] = React.useState('')
  const [time, setTime] = React.useState('')

  function loadFavorite() {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const favoritedTeachers = JSON.parse(res)
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)
        setFavorites(favoritedTeachersIds)
      }
    })
  }

  async function handleFiltersSubmit() {
    loadFavorite()
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data);
    handleToggleFiltersVisible()
  }

  function handleToggleFiltersVisible() {
    setIsFlitersVisible(!isFlitersVisible)
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#04d361" />
          </BorderlessButton>
        )}>
        {isFlitersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a materia?"
              placeholderTextColor="#c1bccc" />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeek_day(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc" />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc" />
              </View>
            </View>
            <RectButton onPress={handleFiltersSubmit} style={styles.submitButtons}>
              <Text style={styles.submitButtonsText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        })}
      </ScrollView>
    </View>
  )
}

export default TeacherList