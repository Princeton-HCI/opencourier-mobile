import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles } from './SearchOrganization.styles';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { OrganizationEmptyState } from '@app/components/OrganizationEmptyState/OrganizationEmptyState';
import { SearchBar } from '@app/components/SearchBar/SearchBar';
import { RootScreen, RootScreenProp } from '@app/navigation/types';

type Props = RootScreenProp<RootScreen.SearchOrganization>;

export const SearchOrganization = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <BackNavButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <SearchBar
          placeholder="Enter URL or search for an organization"
          onTextChange={() => undefined}
          text=""
          style={styles.searchBar}
        />
        <OrganizationEmptyState />
      </View>
    </SafeAreaView>
  );
};
