import { Colors } from '@app/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparentModalBackground,
    justifyContent: 'flex-end',
  },
  contentButton: {
    backgroundColor: Colors.gray1,
  },
  plus: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  textAdd: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray5,
  },
  buttonAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  content: {
    backgroundColor: Colors.white,
    paddingTop: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  list: {
    flex: 1,
  },
  notch: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray1,
    alignSelf: 'center',
  },
});
