import { Colors } from '@app/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.black1,
    borderRadius: 4,
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
    flexDirection: 'row',
  },
  containerTopRightIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.gray8,
    borderWidth: 1,
    borderColor: Colors.gray10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  textContent: {
    fontSize: 14,
    fontWeight: '500',
  },
  textBold: {
    fontSize: 14,
    fontWeight: '700',
  },
});
