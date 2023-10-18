import { Colors } from '@app/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.gray4,
    borderRadius: 4,
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 5,
  },
});
