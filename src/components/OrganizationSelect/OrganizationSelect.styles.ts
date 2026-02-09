import { Colors } from '@app/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 34,
    height: 40,
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
  },
  containerDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconSearch: {
    width: 32,
    height: 32,
  },
});
