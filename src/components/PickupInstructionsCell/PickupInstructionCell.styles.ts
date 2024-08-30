import { Colors } from '@app/styles/colors';
import { SCREEN_WIDTH } from '@app/utilities/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.gray21,
    marginVertical: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: SCREEN_WIDTH - 140,
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
    flexShrink: 1,
    color: Colors.black7,
  },
  textBold: {
    fontWeight: '700',
  },
  iconTopRight: {
    width: 9,
    height: 9,
  },
  containerIncrement: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray1,
    height: 24,
    marginLeft: 8,
  },
  buttonEdit: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHorizontalEdit: {
    width: 60,
    height: 32,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    marginLeft: 8,
  },
  containerVerticalEdit: {
    width: 32,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  iconDelete: {
    width: 14,
    height: 14,
    tintColor: Colors.black1,
  },
  containerVoteButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  textCount: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.gray21,
    marginHorizontal: 10,
  },
  containerVoteButton: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: Colors.gray21,
    borderWidth: 1,
  },
});
