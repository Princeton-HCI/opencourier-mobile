import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import { styles } from './Licences.styles';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { Images } from '@app/utilities/images';
import { useTranslation } from 'react-i18next';

type Props = MainScreenProp<MainScreens.Licences>;

export interface ILicense {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
}

interface IFinalLicense {
  name: string;
  version: string;
  licenseSpecs: ILicense;
}

export const LicencesScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const licenses: {
    [id: string]: ILicense;
  } = require('../../../licenses.json');
  const numberRegex = /\d+(\.\d+)*/;
  const atRegex = /(?:@)/gi;

  const [finalLicense, setFinalLicence] = useState<IFinalLicense[]>([]);

  const onCellPress = (license: IFinalLicense) => {
    Linking.canOpenURL(license.licenseSpecs.repository).then(supported => {
      if (supported) {
        Linking.openURL(license.licenseSpecs.repository);
      }
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: IFinalLicense;
    index: number;
  }) => {
    return (
      <TouchableOpacity style={styles.cell} onPress={() => onCellPress(item)}>
        <View style={styles.cellContent}>
          <Text style={styles.textCellTitle}>{item.name}</Text>
          <Text style={styles.textCellInfo}>
            {`${t('translations:version')}: ` + item.version}
          </Text>
          <Text style={styles.textCellInfo}>
            {`${t('translations:license')}: ` + item.licenseSpecs.licenses}
          </Text>
        </View>
        <Image source={Images.ArrowRightBlack} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    var temp: IFinalLicense[] = [];
    for (let key in licenses) {
      const version = key.match(numberRegex);
      const nameWithoutVersion = key
        .replace(atRegex, '')
        .replace(version ? version[0] : '', '');

      temp.push({
        name: nameWithoutVersion,
        version: version ? version[0] : '',
        licenseSpecs: licenses[key],
      });
    }
    setFinalLicence(temp);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Licenses</Text>
        </View>
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={finalLicense}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};
