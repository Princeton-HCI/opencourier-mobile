import { Colors } from '@app/styles/colors';
import { isSmallDevice } from '@app/utilities/constants';
import { StyleSheet } from 'react-native';

const IMAGE_SIZE = isSmallDevice ? 140 : 280;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  pagerViewContainer: {
    flex: 1,
  },
  pagerView: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  imageOpenDeli: {
    margin: 32,
    marginBottom: 10,
  },
  pageIndicator: {
    marginBottom: 24,
  },
  buttonContinue: {
    marginHorizontal: 32,
    height: 48,
  },
  buttonContinueSpacing: {
    marginBottom: 22,
  },
  ilustration: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  textTitle: {
    fontSize: 44,
    marginHorizontal: 32,
    fontWeight: '700',
    marginBottom: 22,
    lineHeight: 52,
    color: Colors.black,
  },
  textSubtitle: {
    fontSize: 16,
    marginLeft: 32,
    marginRight: 120,
    color: Colors.black,
  },
  pageContent: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
  },
  containerBottom: {},
});
