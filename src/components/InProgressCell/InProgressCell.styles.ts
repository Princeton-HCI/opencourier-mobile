import { Colors } from '@app/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.gray1,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  separator: {
    height: 2,
    backgroundColor: Colors.gray1,
    marginVertical: 12,
  },
  containerChats: {
    width: 32,
    height: 32,
    backgroundColor: Colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
  },
  containerMap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  map: {
    width: 143,
    height: 138,
    borderRadius: 12,
    backgroundColor: Colors.gray1,
    marginRight: 16,
  },
  textDistance: {
    fontSize: 16,
    marginLeft: 8,
  },
  containerAway: {},
  containerTextAway: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  iconGrayRestaurant: {
    // width: 32,
    // height: 32,
    marginLeft: 2,
  },
  iconCaret: {
    // width: 32,
    // height: 32,
  },
  containerContentRestaurant: {
    flexDirection: 'row',
  },
  containerLeft: {
    alignItems: 'center',
    marginRight: 8,
    width: 32,
  },
  containerAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 8,
  },
  verticalLine: {
    width: 3,
    backgroundColor: Colors.gray7,
    flex: 1,
    marginBottom: 12,
  },
  textAddress: {
    fontSize: 16,
    marginRight: 8,
    lineHeight: 18,
  },
  textName: {
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
    marginLeft: 8,
  },
  buttonCarret: {
    alignItems: 'flex-end',
  },
  containerInfo: {
    flex: 1,
  },
  containerInstructions: {
    marginTop: 4,
  },
  containerNotes: {
    marginTop: 8,
  },
  instruction: {
    borderWidth: 1,
    borderColor: Colors.black1,
    borderRadius: 4,
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  buttonTop: {
    marginTop: 12,
    marginBottom: 16,
  },
  colapsable: {
    overflow: 'hidden',
  },
  textInstruction: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonAddNote: {
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 4,
    backgroundColor: Colors.gray6,
    flexDirection: 'row',
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  textAddNote: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray9,
    marginLeft: 4,
  },
});
