import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {getAllLessonStatus} from '../../../../network/services/lesson.apis';
import AppColors from '../../../../styles/AppColors';

export const FAKE_CONTENT: string =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,";

// interface LabelsProps {
//   slices: {
//     pieCentroid: string;
//     labelCentroid: string;
//     data: PieChartData;
//   }[];
// }

// export const Labels = (props: Partial<LabelsProps>) => {
//   const {slices} = props as LabelsProps;
//   return (
//     <>
//       {slices.map((slice, index) => {
//         const {labelCentroid, pieCentroid, data} = slice;
//         return (
//           <G key={index}>
//             <Line
//               x1={labelCentroid[0]}
//               y1={labelCentroid[1]}
//               x2={pieCentroid[0]}
//               y2={pieCentroid[1]}
//               stroke={data?.svg && data.svg.fill}
//             />

//             <G x={labelCentroid[0]} y={labelCentroid[1]}>
//               <Circle r={22} fill={data?.svg && data.svg.fill} />
//               <Circle r={17} fill={'white'} />
//               <Text
//                 key={index}
//                 x={-0.5}
//                 y={1.5}
//                 fill={'black'}
//                 textAnchor={'middle'}
//                 alignmentBaseline={'middle'}
//                 fontSize={16}
//                 fontWeight={'bolder'}
//                 stroke={'white'}
//                 opacity={'1'}
//                 strokeWidth={0.4}>
//                 {data.value}
//               </Text>
//             </G>
//           </G>
//         );
//       })}
//     </>
//   );
// };

const AnalyticsTab: React.FunctionComponent = () => {
  const [listeningProgress, setListeningProgress] = useState<number>(0);
  const [bookProgress, setBookProgress] = useState<number>(0);
  const [selectedSlice, setSelectedSlice] = useState({
    label: 'Listening',
    value: listeningProgress || 0,
  });

  useFocusEffect(
    useCallback(() => {
      const fetchAllLessonData = async () => {
        try {
          const res = await getAllLessonStatus();
          setListeningProgress(res?.data?.data?.currentListeningProgress);
          setBookProgress(res?.data?.data?.currentBookProgress);
          setSelectedSlice({
            label: 'Listening',
            value: res?.data?.data?.currentListeningProgress,
          });
        } catch (error) {}
      };
      fetchAllLessonData();
    }, []),
  );

  // const getPieChartDataRounded = (data: number[]) => {
  //   return data.map((item, index) => {
  //     const randomColor =
  //       '#' + Math.floor(Math.random() * 16777215).toString(16);

  //     return {
  //       key: index,
  //       value: item,
  //       svg: {fill: randomColor},
  //       arc: {cornerRadius: 5},
  //     };
  //   });
  // };

  // const data10 = [40, 83, 60, 30, 75, 90, 27, 52];
  // const pieChartDataRounded = getPieChartDataRounded(data10);

  const [labelWidth, setLabelWidth] = useState(0);

  const keys = [
    'Listening',
    // 'Reading',
    'Books',
    // 'Grammar',
    // 'Phonetics'
  ];
  const values = [listeningProgress, bookProgress, 35, 45, 34];
  const colors = ['#0CA6FD', '#13F1A9', '#B9B1E0', '#FFE815', '#ecb3ff'];
  const strokeColor = ['blue', 'green', 'red', 'red', 'red', 'red'];
  const data = keys.map((key, index) => {
    return {
      key,
      value: values[index],
      svg: {
        fill: colors[index],
        stroke: selectedSlice.label === key ? strokeColor[index] : undefined,
        strokeWidth: 2,
      },
      arc: {
        outerRadius: 70 + values[index] + '%',
        padAngle: selectedSlice.label === key ? 0.1 : 0,
      },
      onPress: () => setSelectedSlice({label: key, value: values[index]}),
    };
  });
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.light_grey,
        justifyContent: 'center',
      }}>
      <PieChart
        style={{height: 350}}
        outerRadius={'75%'}
        innerRadius={'45%'}
        data={data}
      />
      <Text
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          setLabelWidth(width);
        }}
        style={{
          position: 'absolute',
          fontWeight: '600',
          fontSize: 20,
          left: deviceWidth / 2 - labelWidth / 2,
          textAlign: 'center',
        }}>
        {`${selectedSlice.label} \n ${selectedSlice.value}`}
      </Text>
      {/* <PieChart
        style={{width: 300, height: 300}}
        data={pieChartDataRounded}
        innerRadius={35}
        outerRadius={70}
        labelRadius={120}
        sort={(a, b) => b.key - a.key}>
        <Labels />
      </PieChart> */}
    </View>
  );
};

export default AnalyticsTab;
