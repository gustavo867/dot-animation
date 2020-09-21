import { StatusBar } from "expo-status-bar";
import React, { AnimationEventHandler } from "react";
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

interface Props {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  animatedValue:
    | ((event: React.AnimationEvent<Element>) => void)
    | Animated.Value
    | any;
}

const CIRCLE_SIZE = 100;

const Circle: React.FC<Props> = ({ onPress, animatedValue }: Props) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["gold", "gold", "gold", "#444", "#444"],
  });

  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["#444", "#444", "#444", "gold", "gold"],
  });

  const Transform = [
    {
      perspective: 300,
    },
    {
      rotateY: animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["0deg", "-90deg", "-180deg"],
      }),
    },
    {
      scale: animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 8, 1],
      }),
    },
  ];

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        { backgroundColor: containerBg },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: Transform,
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            <AntDesign name="arrowright" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const animation = (toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "gold",
  },
  circleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
    paddingBottom: 100,
    backgroundColor: "gold",
  },
  circleButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#444",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
});
