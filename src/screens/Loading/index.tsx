import * as React from 'react'

import { ActivityIndicator, View } from 'react-native'

import { useNavigation } from '@react-navigation/native';

const Loading = () => {
  const navigation = useNavigation()

  React.useEffect(() => {
    navigation.navigate('Trainer');
  }, [navigation]);

  console.log('...loading')

  return (
    <View>
      <ActivityIndicator size='large' hidesWhenStopped />
    </View>
  );
};

Loading.navigationOptions = {
  header: null,
};

export default Loading;
