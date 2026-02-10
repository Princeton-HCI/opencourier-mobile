import { Colors } from '@app/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  imageOpenDeli: {
    marginVertical: 32,
    marginBottom: 10,
  },
  buttonContinue: {
    marginHorizontal: 32,
    height: 48,
  },
  textField: {
    marginBottom: 22,
    color: Colors.black,
  },
  textTitle: {
    fontSize: 56,
    fontWeight: '700',
    marginBottom: 22,
    color: Colors.black,
  },
  textSubtitle: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: '500',
    color: Colors.black,
  },
  textDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: Colors.black,
    fontStyle: 'italic',
  },
  buttonSignup: {
    marginTop: 80,
  },
  buttonLogin: {
    marginTop: 16,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
  },
});
