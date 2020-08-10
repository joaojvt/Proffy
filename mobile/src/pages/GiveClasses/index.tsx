import * as React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import giveClassesBgImg from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
  const { goBack } = useNavigation()

  function handleNavigateBack() {
    goBack()
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={giveClassesBgImg} resizeMethod="auto" style={styles.content}>

        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>

        <RectButton style={styles.okButton} onPress={handleNavigateBack}>
          <Text style={styles.okButtonText}>Tudo bem</Text>
        </RectButton>
      </ImageBackground>
    </View>
  )
}

export default GiveClasses