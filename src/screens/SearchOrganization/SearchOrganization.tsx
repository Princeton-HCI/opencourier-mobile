import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles } from './SearchOrganization.styles';
import {
  OrganizationScreenProp,
  OrganizationScreens,
} from '@app/navigation/organizationNavigation/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { OrganizationEmptyState } from '@app/components/OrganizationEmptyState/OrganizationEmptyState';
import { SearchBar } from '@app/components/SearchBar/SearchBar';

type Props = OrganizationScreenProp<OrganizationScreens.SearchOrganization>;

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
