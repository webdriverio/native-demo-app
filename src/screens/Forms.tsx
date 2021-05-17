import React from 'react';
import {ScrollView, StyleSheet, useColorScheme} from 'react-native';
import FormComponents from '../components/FormComponents';
import {STATUS_BAR_HEIGHT} from '../components/StatusBar';
import {testProperties} from '../config/TestProperties';
import Colors from '../config/Colors';

const FormsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.dark : Colors.lighter},
      ]}
      {...testProperties('Forms-screen')}
      keyboardShouldPersistTaps="handled">
      <FormComponents />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
    paddingBottom: 40,
  },
});

export default FormsScreen;
