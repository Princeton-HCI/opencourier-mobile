import React, { useState } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { styles } from './SearchOrganization.styles';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { OrganizationEmptyState } from '@app/components/OrganizationEmptyState/OrganizationEmptyState';
import { SearchBar } from '@app/components/SearchBar/SearchBar';
import { RootScreen, RootScreenProp } from '@app/navigation/types';
import { useTranslation } from 'react-i18next';
import { Instance } from '@app/types/types';
import { InstanceCell } from '@app/components/InstanceCell/InstanceCell';
import { TEST_INSTANCES } from '@app/utilities/testData';

type Props = RootScreenProp<RootScreen.SearchOrganization>;

export const SearchOrganization = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');

  const renderItem = ({ item, index }: { item: Instance; index: number }) => {
    return <InstanceCell instance={item} onPress={() => undefined} />;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <BackNavButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <SearchBar
          placeholder={t('translations:enter_url_or_search')}
          onTextChange={setSearchText}
          text={searchText}
          style={styles.searchBar}
        />
        {searchText.length > 0 ? (
          <FlatList
            contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 16 }}
            keyExtractor={(item, index) => index.toString()}
            data={TEST_INSTANCES}
            renderItem={renderItem}
          />
        ) : (
          <OrganizationEmptyState />
        )}
      </View>
    </SafeAreaView>
  );
};
