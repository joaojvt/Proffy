import * as React from 'react';
import { View, AsyncStorage } from 'react-native';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {
  const [favorites, setFavorites] = React.useState<Teacher[]>([])

  function loadFavorite() {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const favoritedTeachers = JSON.parse(res)
        setFavorites(favoritedTeachers)
      }
    })
  }
  AsyncStorage.getItem('favorites').then(res => {
    if (res) {
      const favoritedTeachers = JSON.parse(res)
      setFavorites(favoritedTeachers)
    }
  })
  useFocusEffect(() =>{
    loadFavorite()
  })

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos"/>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacherItem: Teacher) => {
          return <TeacherItem 
          favorited={favorites.includes(teacherItem)}
          teacher={teacherItem}
          key={teacherItem.id}/>
        })}
      </ScrollView>
    </View>
  )

}

export default Favorites