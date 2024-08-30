import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import { Images } from '@app/utilities/images';
import { styles } from './SelectOrganizationModal.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Organization } from '@app/types/types';
import { OrganizationCell } from '@app/components/OrganizationCell/OrganizationCell';
import { TEST_ORG_ARRAY } from '@app/utilities/testData';
import { RootScreen, RootScreenProp } from '@app/navigation/types';
import { useTranslation } from 'react-i18next';

type Props = RootScreenProp<RootScreen.SelectOrganizationModal>;

export const SelectOrganizationModal = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const { preselected, onOrganizationSelect } = route.params;
  const [dataSource, setDataSource] = useState<Organization[]>([]);
  const [selected, setSelected] = useState<Organization | undefined>(
    preselected,
  );

  const handleOrganizationSelect = (org: Organization) => {
    setSelected(org);
    onOrganizationSelect && onOrganizationSelect(org);
    setTimeout(() => {
      navigation.goBack();
    }, 400);
  };

  const renderItem = ({ item }: { item: Organization }) => {
    return (
      <OrganizationCell
        organization={item}
        onPress={handleOrganizationSelect}
        selected={selected?.name === item.name}
      />
    );
  };

  useEffect(() => {
    setDataSource(TEST_ORG_ARRAY);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.notch} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={dataSource}
          renderItem={renderItem}
        />
        <View style={[styles.contentButton, { paddingBottom: bottom }]}>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() =>
              navigation.navigate(RootScreen.SearchOrganization, {
                onOrganizationSelect: onOrganizationSelect,
              })
            }>
            <Image source={Images.Plus} style={styles.plus} />
            <Text style={styles.textAdd}>
              {t('translations:add_organization')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
