import { Dimensions, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useImperativeHandle } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1;

const BottomSheet = React.forwardRef(({children}, ref) => {
  const translationY = useSharedValue(0);

  const scrollTo = useCallback((destination) => {
    'worklet'
    translationY.value = withSpring(destination);
  }, [])

  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translationY.value };
    })
    .onUpdate((event) => {
      translationY.value = event.translationY + context.value.y;
      translationY.value = Math.max(translationY.value, MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
        if(translationY.value > -SCREEN_HEIGHT / 1.9) {
            scrollTo(-SCREEN_HEIGHT / 2.8);
        } else if (translationY.value < -SCREEN_HEIGHT / 2) {
            scrollTo(MAX_TRANSLATE_Y)
        }
    });

    useEffect(() => {
        scrollTo(-SCREEN_HEIGHT / 2.8)
    }, [])

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: '50px',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
    zIndex: 1000
  },
});

export default BottomSheet;
