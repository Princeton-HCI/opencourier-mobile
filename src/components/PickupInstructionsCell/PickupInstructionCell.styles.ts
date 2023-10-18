import { Colors } from '@app/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    alignSelf: 'flex-start',
  },
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  textBold: {
    fontWeight: '700',
  },
  iconTopRight: {
    width: 9,
    height: 9,
  },
});
