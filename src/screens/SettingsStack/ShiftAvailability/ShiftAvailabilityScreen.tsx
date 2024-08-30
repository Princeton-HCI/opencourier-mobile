import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './ShiftAvailabilityScreen.styles';
import { MainScreenProp, MainScreens } from '@app/navigation/main/types';
import { BackNavButton } from '@app/components/BackNavButton/BackNavButton';
import { useTranslation } from 'react-i18next';
import {
  Organization,
  Shift,
  ShiftRange,
  ShiftAvailability,
} from '@app/types/types';
import { ShiftCell } from '@app/components/ShiftCell/ShiftCell';

import { TEST_ORG_ARRAY } from '@app/utilities/testData';
import { Images } from '@app/utilities/images';
import { RootScreen } from '@app/navigation/types';
import DatePicker from 'react-native-date-picker';
import useUserSettings from '@app/hooks/useUserSetttings';

type Props = MainScreenProp<MainScreens.ShiftAvailabilityScreen>;
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getShiftRanges(dayAvailability: Date[][] | undefined) {
  console.log('dayAvailability', dayAvailability);
  return dayAvailability
    ? dayAvailability.map(
        dates =>
          ({
            start: dates[0],
            end: dates[1],
          } as ShiftRange),
      )
    : [];
}

function getSelectedDays(
  shiftAvailability: ShiftAvailability | undefined | null,
) {
  console.log('shiftAvailability', shiftAvailability);
  return shiftAvailability
    ? Object.entries(shiftAvailability)
        .filter(item => {
          const shifts = item[1];
          return shifts.length > 0;
        })
        .map(item => {
          const dayOfTheWeek = item[0];
          return capitalizeFirstLetter(dayOfTheWeek);
        })
    : [];
}

// Add validate shift function

export const ShiftAvailabilityScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  // TODO: Configure this to reference the node
  // QQQ: Should not allow to switch between nodes
  const [selectedOrg, setSelectedOrg] = useState<Organization>(
    TEST_ORG_ARRAY[0],
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dayToAddShiftTo, setDayToAddShiftTo] = useState<{
    startOrEnd: 'start' | 'end';
    shift: Shift;
  }>();
  const [shiftToAdd, setShiftToAdd] = useState<{
    start: Date | undefined;
    end: Date | undefined;
  }>({
    start: undefined,
    end: undefined,
  });
  const [selectedPickerDate, setSelectedPickerDate] = useState<Date>(
    new Date(),
  );

  const { settings, updateSettings, isUpdating } = useUserSettings();
  const availability = settings?.shiftAvailability ?? {};

  const [selectedDays, setSelectedDays] = useState<string[]>(
    getSelectedDays(availability ?? []),
  );
  const [dataSource, setsDataSource] = useState<Shift[]>([
    {
      day: 'Monday',
      shiftRanges: getShiftRanges(availability?.monday),
    },
    {
      day: 'Tuesday',
      shiftRanges: getShiftRanges(availability?.tuesday),
    },
    {
      day: 'Wednesday',
      shiftRanges: getShiftRanges(availability?.wednesday),
    },
    {
      day: 'Thursday',
      shiftRanges: getShiftRanges(availability?.thursday),
    },
    {
      day: 'Friday',
      shiftRanges: getShiftRanges(availability?.friday),
    },
    {
      day: 'Saturday',
      shiftRanges: getShiftRanges(availability?.saturday),
    },
    {
      day: 'Sunday',
      shiftRanges: getShiftRanges(availability?.sunday),
    },
  ]);

  const isDaySelected = (item: Shift) => {
    return selectedDays.includes(item.day);
  };

  // Select data
  const onSelect = (item: Shift) => {
    const included = selectedDays.filter(obj => obj === item.day);
    const data = dataSource.find(obj => obj.day === item.day);
    if (included.length > 0 && data!.shiftRanges.length == 0) {
      const newData = selectedDays.filter(obj => obj !== item.day);
      setSelectedDays(newData);
    } else {
      var newData = [...selectedDays];
      newData.push(item.day);
      setSelectedDays(newData);
    }
  };

  const handleDelete = (item: Shift, range: ShiftRange) => {
    // Add API Call
    const newDataSource = dataSource.map(obj => {
      if (item.day === obj.day) {
        const newShifts = obj.shiftRanges.filter(
          shift => shift.start !== range.start && shift.end !== range.end,
        );
        return {
          day: obj.day,
          shiftRanges: newShifts,
        };
      }
      return obj;
    });
    setsDataSource(newDataSource);
    const settingsUpdate: ShiftAvailability = getRemoveDateUpdate(
      availability,
      item.day.toLowerCase(),
      range,
    );
    updateSettings({ shiftAvailability: settingsUpdate });
  };

  function getAddDateUpdate(
    shiftAvailability: ShiftAvailability | null | undefined,
    day: string,
  ) {
    if (shiftAvailability) {
      return {
        sunday:
          day == 'sunday'
            ? [
                ...shiftAvailability.sunday,
                [shiftToAdd.start!, shiftToAdd.end!],
              ]
            : shiftAvailability.sunday,
        monday:
          day == 'monday'
            ? [
                ...shiftAvailability.monday,
                [shiftToAdd.start!, shiftToAdd.end!],
              ]
            : shiftAvailability.monday,
        tuesday:
          day == 'tuesday'
            ? [
                ...shiftAvailability.tuesday,
                [shiftToAdd.start!, shiftToAdd.end!],
              ]
            : shiftAvailability.tuesday,
        wednesday:
          day == 'wednesday'
            ? [
                ...shiftAvailability.wednesday,
                [shiftToAdd.start!, shiftToAdd.end!],
              ]
            : shiftAvailability.wednesday,
        thursday:
          day == 'thursday'
            ? [
                ...shiftAvailability.thursday,
                [shiftToAdd.start!, shiftToAdd.end!],
              ]
            : shiftAvailability.thursday,
        friday:
          day == 'friday'
            ? [
                ...shiftAvailability.friday,
                [shiftToAdd.start!, shiftToAdd.end!],
              ]
            : shiftAvailability.friday,
        saturday:
          day == 'saturday'
            ? [
                ...shiftAvailability.saturday,
                [shiftToAdd.start!, shiftToAdd.end!],
              ]
            : shiftAvailability.saturday,
      } as ShiftAvailability;
    } else {
      return {
        sunday: day == 'sunday' ? [[shiftToAdd.start!, shiftToAdd.end!]] : [],
        monday: day == 'monday' ? [[shiftToAdd.start!, shiftToAdd.end!]] : [],
        tuesday: day == 'tuesday' ? [[shiftToAdd.start!, shiftToAdd.end!]] : [],
        wednesday:
          day == 'wednesday' ? [[shiftToAdd.start!, shiftToAdd.end!]] : [],
        thursday:
          day == 'thursday' ? [[shiftToAdd.start!, shiftToAdd.end!]] : [],
        friday: day == 'friday' ? [[shiftToAdd.start!, shiftToAdd.end!]] : [],
        saturday:
          day == 'saturday' ? [[shiftToAdd.start!, shiftToAdd.end!]] : [],
      } as ShiftAvailability;
    }
  }

  function getRemoveDateUpdate(
    shiftAvailability: ShiftAvailability,
    day: string,
    range: ShiftRange,
  ) {
    return {
      sunday:
        day == 'sunday'
          ? shiftAvailability.sunday.filter(
              shift => shift[0] != range.start && shift[1] != range.end,
            )
          : shiftAvailability.sunday,
      monday:
        day == 'monday'
          ? shiftAvailability.monday.filter(
              shift => shift[0] != range.start && shift[1] != range.end,
            )
          : shiftAvailability.monday,
      tuesday:
        day == 'tuesday'
          ? shiftAvailability.tuesday.filter(
              shift => shift[0] != range.start && shift[1] != range.end,
            )
          : shiftAvailability.tuesday,
      wednesday:
        day == 'wednesday'
          ? shiftAvailability.wednesday.filter(
              shift => shift[0] != range.start && shift[1] != range.end,
            )
          : shiftAvailability.wednesday,
      thursday:
        day == 'thursday'
          ? shiftAvailability.thursday.filter(
              shift => shift[0] != range.start && shift[1] != range.end,
            )
          : shiftAvailability.thursday,
      friday:
        day == 'friday'
          ? shiftAvailability.friday.filter(
              shift => shift[0] != range.start && shift[1] != range.end,
            )
          : shiftAvailability.friday,
      saturday:
        day == 'saturday'
          ? shiftAvailability.saturday.filter(
              shift => shift[0] != range.start && shift[1] != range.end,
            )
          : shiftAvailability.saturday,
    } as ShiftAvailability;
  }

  const renderItem = ({ item, index }: { item: Shift; index: number }) => {
    return (
      <ShiftCell
        style={{ marginBottom: 16 }}
        item={item}
        onSelect={onSelect}
        isSelected={isDaySelected(item)}
        onAdd={() => {
          setDayToAddShiftTo({ startOrEnd: 'start', shift: item });
        }}
        onDelete={handleDelete}
      />
    );
  };

  useEffect(() => {
    if (dayToAddShiftTo !== undefined) {
      setShiftToAdd({ start: undefined, end: undefined });
      setShowModal(true);
    }
  }, [dayToAddShiftTo]);

  useEffect(() => {
    setShowModal(false);
    if (selectedPickerDate !== undefined) {
      if (shiftToAdd.start === undefined) {
        setShiftToAdd({
          start: selectedPickerDate,
          end: undefined,
        });
      } else if (shiftToAdd.end === undefined) {
        setShiftToAdd({
          start: shiftToAdd.start,
          end: selectedPickerDate,
        });
      }
    }
  }, [selectedPickerDate]);

  useEffect(() => {
    if (
      shiftToAdd.start === undefined &&
      shiftToAdd.end === undefined &&
      dayToAddShiftTo !== undefined
    ) {
      setShowModal(true);
    }
    if (
      shiftToAdd.start !== undefined &&
      shiftToAdd.end === undefined &&
      dayToAddShiftTo !== undefined
    ) {
      setShowModal(true);
    }
    if (
      shiftToAdd.start !== undefined &&
      shiftToAdd.end !== undefined &&
      dayToAddShiftTo !== undefined
    ) {
      // Add API Call
      const day = dayToAddShiftTo?.shift.day;
      const newDataSource = dataSource.map(obj => {
        if (obj.day === day) {
          const newShifts = obj.shiftRanges;
          newShifts.push({
            start: shiftToAdd.start!,
            end: shiftToAdd.end!,
          });
          return {
            day: day,
            shiftRanges: newShifts,
          };
        }
        return obj;
      });
      setsDataSource(newDataSource);
      const settingsUpdate: ShiftAvailability = getAddDateUpdate(
        availability,
        day.toLowerCase(),
      );

      updateSettings({ shiftAvailability: settingsUpdate });

      setShiftToAdd({ start: undefined, end: undefined });
      setDayToAddShiftTo(undefined);
    }
  }, [shiftToAdd]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.navHeader}>
          <BackNavButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>
            {t('translations:shift_availability')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(RootScreen.SelectOrganizationModal, {
              preselected: selectedOrg,
              onOrganizationSelect: org => setSelectedOrg(org),
            })
          }
          style={styles.org}>
          <Image
            source={{ uri: selectedOrg.imageUrl }}
            style={styles.iconOrg}
          />
          <Text style={styles.textOrg}>{selectedOrg.name}</Text>
          <Image source={Images.Dropdown} />
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={dataSource}
          renderItem={renderItem}
        />
        <DatePicker
          modal
          open={showModal}
          title={
            shiftToAdd?.start === undefined
              ? `Select the start of your ${dayToAddShiftTo?.shift.day} shift`
              : `Select the end of your ${dayToAddShiftTo?.shift.day} shift`
          }
          mode={'time'}
          minimumDate={
            shiftToAdd?.start !== undefined ? shiftToAdd.start : undefined
          }
          date={selectedPickerDate}
          onConfirm={setSelectedPickerDate}
          onCancel={() => undefined}
        />
      </SafeAreaView>
    </View>
  );
};
