/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AppColors from '../../styles/AppColors';
import {unit4, unit8} from '../../utils/appUnit';

interface IPaginationProps {
  pageSize: number;
  page: number;
  setPage: any;
}
const RANGE = 1;

const Pagination = (props: IPaginationProps) => {
  const {pageSize, page, setPage} = props;

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const onRenderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <View key={index} style={styles.paginationDot}>
            <Text style={styles.paginationButtonText}>...</Text>
          </View>
        );
      }
      return null;
    };

    const onRenderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <View style={styles.paginationDot} key={index * 100}>
            <Text style={styles.paginationButtonText}>...</Text>
          </View>
        );
      }
      return null;
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber <= pageSize - RANGE
        ) {
          return onRenderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return onRenderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber <= pageSize - RANGE
          ) {
            return onRenderDotAfter(index);
          }
        } else if (
          pageNumber < page - RANGE &&
          pageNumber > RANGE &&
          page >= pageSize - RANGE * 2
        ) {
          return onRenderDotBefore(index);
        }

        return (
          <TouchableOpacity
            key={pageNumber * 110}
            onPress={() => handlePagePress(pageNumber)}
            style={[
              styles.paginationButton,
              {
                backgroundColor:
                  pageNumber === page ? AppColors.purple : 'white',
              },
            ]}>
            <Text
              style={[
                styles.paginationButtonText,
                {
                  color:
                    pageNumber === page ? AppColors.white : AppColors.black,
                },
              ]}>
              {pageNumber}
            </Text>
          </TouchableOpacity>
        );
      });
  };

  const handlePagePress = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return <View style={styles.container}>{renderPagination()}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationButton: {
    marginHorizontal: 2,
    // padding: unit8,
    borderRadius: 100,
    borderWidth: 0.5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 40,
    height: 40,
    borderColor: AppColors.light_grey2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationButtonText: {
    textAlign: 'center',
  },
  paginationDot: {
    marginHorizontal: 2,
    padding: unit8,
    // borderRadius: 100,
    // backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 40,
  },
});

export default Pagination;
