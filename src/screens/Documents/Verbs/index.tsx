/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import AppBar from '../../../components/AppBar/AppBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../../../styles/AppColors';
import {
  unit10,
  unit12,
  unit14,
  unit15,
  unit16,
  unit8,
} from '../../../utils/appUnit';
import {Table, Row, Rows} from 'react-native-table-component';
import {IRREGULAR_VERB_LIST, filterIrregularVerb} from '../../../utils/Utils';
import Icons from 'react-native-vector-icons/AntDesign';
import {useDebounce} from '../../../hooks/useDebounce';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppText from '../../../components/AppText/AppText';

const VerbScreen = () => {
  const tableHead = [
    'Infinitive (V1)',
    'Simple Past (V2)',
    'Past Participle (V3)',
    'Mean',
  ];
  const [dataList, setDataList] = useState([...IRREGULAR_VERB_LIST]);
  const [searchValue, setSearchValue] = useState<string>('');
  const searchQuery = useDebounce(searchValue, 1000);
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<number>(0);

  const handleSearch = (word: string) => {
    const foundList = IRREGULAR_VERB_LIST.filter(item => {
      const chainStr = `${item[0]} $${item[1]} ${item[2]} ${item[3]}`;
      return chainStr.toLowerCase().indexOf(word.toLowerCase()) !== -1;
    });

    setDataList([...foundList]);
  };

  function filterIrregularList(list: string[][] = [], type = 0) {
    let newList: string[][] = [];

    switch (type) {
      case 0:
        // not filter
        newList = [...list];
        break;
      // item[0] = item[1] = item[2]
      case 1:
        newList = list.filter((item: string[]) => {
          return (
            item[0].toLowerCase() === item[1].toLowerCase() &&
            item[0].toLowerCase() === item[2].toLowerCase()
          );
        });
        break;

      // item[1] = item[2]
      case 2:
        newList = list.filter((item: string[]) => {
          return (
            item[0].toLowerCase() !== item[1].toLowerCase() &&
            item[1].toLowerCase() === item[2].toLowerCase()
          );
        });
        break;

      // ay -> aid -> aid
      case 3:
        newList = list.filter((item: string[]) => {
          return (
            item[0].slice(item[0].length - 2).toLowerCase() === 'ay' &&
            item[1].slice(item[1].length - 3).toLowerCase() === 'aid' &&
            item[2].slice(item[2].length - 3).toLowerCase() === 'aid'
          );
        });
        break;
      // d -> t
      case 4:
        newList = list.filter(item => {
          return (
            item[0][item[0].length - 1].toLowerCase() === 'd' &&
            item[1][item[1].length - 1].toLowerCase() === 't' &&
            item[2][item[2].length - 1].toLowerCase() === 't'
          );
        });
        break;
      // eed -> ed
      case 5:
        newList = list.filter(item => {
          return (
            item[0].slice(item[0].length - 3).toLowerCase() === 'eed' &&
            item[1].slice(item[1].length - 2).toLowerCase() === 'ed' &&
            item[2].slice(item[2].length - 2).toLowerCase() === 'ed'
          );
        });
        break;
      // ow -> ew -> own
      case 6:
        newList = list.filter(item => {
          return (
            item[0].slice(item[0].length - 2).toLowerCase() === 'ow' &&
            item[1].slice(item[1].length - 2).toLowerCase() === 'ew' &&
            item[2].slice(item[2].length - 3).toLowerCase() === 'own'
          );
        });
        break;
      // ear -> ore -> orne
      case 7:
        newList = list.filter(item => {
          return (
            item[0].slice(item[0].length - 3).toLowerCase() === 'ear' &&
            item[1].slice(item[1].length - 3).toLowerCase() === 'ore' &&
            item[2].slice(item[2].length - 4).toLowerCase() === 'orne'
          );
        });
        break;
      default:
        break;
    }

    return newList;
  }

  const handleFilter = (type: number) => {
    setActiveFilter(type);
    const newList = filterIrregularList(IRREGULAR_VERB_LIST, type);
    setDataList([...newList]);
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        leftIcon={
          <Icon
            style={{
              fontSize: unit16,
            }}
            name={'arrow-left'}
          />
        }
        titleStyle={{
          fontSize: unit16,
        }}
        title={'Irregular Verbs'}
        containerStyle={{
          backgroundColor: AppColors.light_grey,
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: AppColors.light_grey,
          paddingLeft: unit10,
          paddingRight: unit10,
        }}>
        <View>
          <AppText
            style={{fontSize: unit14, fontWeight: '500', marginBottom: unit12}}>
            Động từ bất quy tắc (Irregular Verb)
          </AppText>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: unit8,
              zIndex: 1000,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: AppColors.white,
                paddingHorizontal: unit15,
                borderWidth: 1,
                borderRadius: unit8,
              }}>
              <TextInput
                style={{
                  flex: 1,
                  marginRight: unit16,
                  maxWidth: 220,
                  paddingVertical: unit10,
                  color: AppColors.black,
                  includeFontPadding: false,
                }}
                placeholder="Find here"
                value={searchValue}
                onChangeText={value => {
                  if (value === '') {
                    setSearchValue('');
                    setDataList([...IRREGULAR_VERB_LIST]);
                  } else {
                    setSearchValue(value);
                  }
                }}
              />
            </View>
            <View style={{position: 'relative', zIndex: 1000}}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
                onPress={() => setIsShowFilter(!isShowFilter)}>
                <AppText style={{fontSize: unit14, marginRight: unit10}}>
                  Filter:
                </AppText>
                <Icons
                  style={{
                    fontSize: unit16,
                  }}
                  name={'filter'}
                />
              </TouchableOpacity>
              {isShowFilter ? (
                <View
                  style={{
                    position: 'absolute',
                    width: 250,
                    backgroundColor: AppColors.white,
                    right: 0,
                    top: 30,
                    zIndex: 1000,
                    borderWidth: 1,
                    borderRadius: unit8,
                    borderColor: AppColors.light_grey2,
                  }}>
                  {filterIrregularVerb?.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setIsShowFilter(false);
                        handleFilter(item?.key);
                      }}
                      style={{
                        padding: unit12,
                        backgroundColor:
                          activeFilter === index
                            ? AppColors.light_grey
                            : 'transperant',
                      }}
                      key={item?.text}>
                      <AppText
                        style={{
                          fontSize: unit14,
                          fontWeight: activeFilter === index ? '600' : '400',
                        }}>
                        {item?.text}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>
          </View>

          <View>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: AppColors.light_grey2,
              }}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={{
                  margin: 6,
                  color: '#6A4CE2',
                  fontWeight: '600',
                }}
              />
              <Rows data={dataList} textStyle={{margin: 6}} />
            </Table>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.light_grey,
  },
  head: {maxHeight: 80},
  textHeaderStyle: {
    margin: 6,
    color: '#6A4CE2',
    fontWeight: '600',
  },
  text: {margin: 6, fontSize: unit14},
});
export default VerbScreen;
