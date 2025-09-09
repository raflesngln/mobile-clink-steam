// AnimatedScreenWrapper.js
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView, useAnimationState } from 'moti';
import { Easing } from 'react-native-reanimated'; // Pastikan ini diimpor

// 1. Definisikan tipe untuk kunci-kunci animasi
type AnimationType = 'fromLeft' | 'fromRight' | 'fromTop' | 'fromBottom' | 'zoom' | 'fade';

// Definisikan varian animasi
const animationVariants = {
  fromLeft: {
    initial: { opacity: 0, translateX: -200 },
    visible: { opacity: 1, translateX: 0 },
    hidden: { opacity: 0, translateX: 200 }, // Keluar ke kanan
  },
  fromRight: {
    initial: { opacity: 0, translateX: 200 },
    visible: { opacity: 1, translateX: 0 },
    hidden: { opacity: 0, translateX: -200 }, // Keluar ke kiri
  },
  fromTop: {
    initial: { opacity: 0, translateY: -200 },
    visible: { opacity: 1, translateY: 0 },
    hidden: { opacity: 0, translateY: 200 }, // Keluar ke bawah
  },
  fromBottom: {
    initial: { opacity: 0, translateY: 200 },
    visible: { opacity: 1, translateY: 0 },
    hidden: { opacity: 0, translateY: -200 }, // Keluar ke atas
  },
  zoom: {
    initial: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.8 },
  },
  fade: {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
};

interface AnimatedScreenWrapperProps {
  children: React.ReactNode;
  isVisible: boolean;
  animationType?: AnimationType;
}

const AnimatedScreenWrapper: React.FC<AnimatedScreenWrapperProps> = ({ children, isVisible, animationType = 'fade' }) => {
  const selectedVariant = animationVariants[animationType];

  const animationState = useAnimationState(selectedVariant);

  // Definisikan transisi umum di sini
  const defaultTransition = {
    type: 'timing' as const, // <--- Gunakan 'as const' untuk memastikan tipe literal string
    duration: 300,
    easing: Easing.out(Easing.ease), // Ini adalah penggunaan yang benar
  };

  useEffect(() => {
    animationState.transitionTo(isVisible ? 'visible' : 'hidden');
  }, [isVisible, animationType, animationState]);

  return (
    <View style={styles.container}>
      <MotiView
        style={styles.motiView}
        state={animationState}
        transition={defaultTransition}
      >
        {children}
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  motiView: {
    flex: 1,
    // Hapus properti 'transition' dari sini
  },
});

export default AnimatedScreenWrapper;