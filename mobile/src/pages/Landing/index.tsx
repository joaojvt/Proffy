import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyuIcon from '../../assets/images/icons/study.png';
import giveClasesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

import styles from './styles';

function Landing() {
  const { navigate } = useNavigation()

  const [totalConnections, setTotalConnections] = React.useState(0)

    React.useEffect(()=>{
        api.get('connections').then(res =>{
            const {total} = res.data
            setTotalConnections(total)
        })
    }, [])

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses')
  }

  function handleNavigateToStudyPage() {
    navigate('Study')
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
        onPress={handleNavigateToStudyPage}
        style={[styles.button, styles.buttonPrimary]}>

          <Image source={studyuIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton 
        onPress={handleNavigateToGiveClassesPage} 
        style={[styles.button, styles.buttonSecondary]} >

          <Image source={giveClasesIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing;