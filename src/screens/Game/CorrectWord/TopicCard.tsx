/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppColors from '../../../styles/AppColors';
import {unit10, unit12, unit14, unit8} from '../../../utils/appUnit';
import {ITopicModel} from '../../../model/SentenseModel';
import LinearButton from '../../../components/LinearButton/LinearButton';

interface ICardItemProps {
  item: ITopicModel;
  setTopics: React.Dispatch<React.SetStateAction<string[]>>;
  topics: string[];
  topicsRetrieve: string[];
}
const TopicCard = (props: ICardItemProps) => {
  const {item, setTopics, topics, topicsRetrieve} = props;
  const isHaveTopics = topicsRetrieve?.includes(item?.key);
  const [isActive, setIsActive] = useState<boolean>(isHaveTopics);

  return (
    <View style={styles.container}>
      <LinearButton
        buttonTitle={item?.title}
        linearStyle={[
          styles.button,
          {
            borderWidth: 1,
            borderColor: isActive ? AppColors.white : AppColors.light_grey2,
          },
        ]}
        titleStyle={[
          styles.buttonText,
          {
            color: isActive ? AppColors.white : AppColors.black,
            fontWeight: 'normal',
            fontSize: unit14,
          },
        ]}
        linearColors={
          isActive
            ? [AppColors.purple, AppColors.purple_gradient_2]
            : [AppColors.white, AppColors.white]
        }
        onPress={() => {
          setIsActive(!isActive);
          if (isActive) {
            const index = topics.indexOf(item?.key);
            if (index > -1) {
              topics.splice(index, 1);
            }
          } else {
            setTopics(prev => [...prev, item.key]);
          }
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginRight: unit8,
  },
  button: {
    padding: unit10,
    borderRadius: unit8,
    marginBottom: unit8,
    width: '100%',
  },
  buttonText: {
    fontSize: unit14,
    fontWeight: '600',
  },
});

//make this component available to the app
export default TopicCard;
