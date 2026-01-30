import { Colors } from '@app/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    paddingTop: 16,
  },
  content: {
    paddingHorizontal: 12,
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
    marginBottom: 22,
    color: Colors.black,
  },
  linkText: {
    textDecorationLine: 'underline',
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
