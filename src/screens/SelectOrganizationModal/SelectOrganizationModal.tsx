import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Images } from '@app/utilities/images';
import { styles } from './SelectOrganizationModal.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Organization } from '@app/types/types';
import { OrganizationCell } from '@app/components/OrganizationCell/OrganizationCell';
import { RootScreen, RootScreenProp } from '@app/navigation/types';
import { useTranslation } from 'react-i18next';
import useInstance from '@app/hooks/useInstance';

type Props = RootScreenProp<RootScreen.SelectOrganizationModal>;

export const SelectOrganizationModal = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const { preselected, onOrganizationSelect } = route.params;
  const [selected, setSelected] = useState<Organization | undefined>(
    preselected,
  );

  const { userInstances, isLoadingInstances } = useInstance();

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
        selected={selected?.id === item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.notch} />
        {isLoadingInstances ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.textCount}>{t('translations:loading')}</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={item => item.id}
            data={userInstances}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.textCount}>
                  {t('translations:no_organizations')}
                </Text>
              </View>
            }
          />
        )}
        {/* <View style={[styles.contentButton, { paddingBottom: bottom }]}>
          <TouchableOpacity style={styles.buttonAdd} onPress={() => {}}>
            <Image source={Images.Plus} style={styles.plus} />
            <Text style={styles.textAdd}>{t('translations:add_instance')}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};
