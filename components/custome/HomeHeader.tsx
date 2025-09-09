import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MotiView, useAnimationState } from 'moti';
import { Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'; // Untuk ikon
import { HStack } from '../ui/hstack';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '../ui/avatar';
import { Box } from '../ui/box';

// Asumsi Anda memiliki hooks untuk colorMode atau context lainnya
const useColorMode = () => ({
  text: 'black', // Ganti dengan logika warna asli Anda
  iconColor: 'black', // Ganti dengan logika warna asli Anda
});

const { width: screenWidth } = Dimensions.get('window'); // Dapatkan lebar layar untuk perhitungan

function MyAnimatedHStack({ isLoading }:any) {
  const colorMode = useColorMode(); // Ambil colorMode Anda

  // Definisikan state animasi untuk bentuk (size dan borderRadius)
  const shapeAnimationState = useAnimationState({
    initial: {
      width: 60, // Lebar awal kecil (ukuran bulat)
      height: 60, // Tinggi awal kecil (ukuran bulat)
      borderRadius: 30, // Bentuk bulat (setengah dari lebar/tinggi jika sama)
      opacity: 0, // Mulai tidak terlihat
    },
    ready: {
      width: screenWidth * 0.95, // Lebar akhir, sesuaikan ini dengan lebar HStack Anda
      height: 70, // Tinggi akhir, sesuaikan ini dengan tinggi HStack Anda
      borderRadius: 999, // Bentuk lonjong penuh (menggunakan nilai besar untuk rounded-full)
      opacity: 1, // Menjadi terlihat
    },
  });

  // Definisikan state animasi untuk konten (opacity)
  // Konten akan muncul setelah animasi bentuk selesai
  const contentFadeState = useAnimationState({
    initial: { opacity: 0 },
    visible: { opacity: 1 },
  });

  useEffect(() => {
    if (!isLoading) {
      // Jika tidak dalam kondisi loading (sudah siap), jalankan animasi bentuk
      shapeAnimationState.transitionTo('ready');
      // Tunda animasi konten sampai bentuknya stabil
      setTimeout(() => {
        contentFadeState.transitionTo('visible');
      }, 300); // Sesuaikan delay ini dengan durasi animasi bentuk
    } else {
      // Jika loading, kembali ke initial state (bulat kecil, tidak terlihat)
      shapeAnimationState.transitionTo('initial');
      contentFadeState.transitionTo('initial');
    }
  }, [isLoading]);

  return (
     <MotiView
      state={shapeAnimationState}
      transition={{
        type: 'timing',
        duration: 500, // Durasi animasi transformasi bentuk
        easing: Easing.out(Easing.ease), // Easing untuk gerakan masuk yang mulus
      }}
      style={[
        styles.animatedContainer,
        {
          backgroundColor: colorMode.text === 'black' ? '#f3f2f2ff' : '#272020ff', // Sesuaikan background
          // Initial styling untuk mencegah "lonjakan" sebelum animasi berjalan
          width: 60,
          height: 60,
          borderRadius: 30,
          opacity: 0,
        }
      ]}
    >
      <MotiView
        state={contentFadeState}
        transition={{
          type: 'timing',
          duration: 200, // Durasi fade in konten
          delay: 200, // Mulai fade in setelah bentuk mulai terbentuk
        }}
        // Berikan flex:1 agar konten mengisi MotiView
        // dan pastikan overflow: hidden jika ada konten yang bisa keluar batas saat resize
        style={{ flex: 1, overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 24 }} // Hapus alignItems dari sini
      >
        {/* Konten HStack Anda yang sebenarnya dimulai dari sini */}
        <HStack className="items-center"> {/* <--- PERUBAHAN DI SINI: tambahkan items-center */}
          <TouchableOpacity onPress={() => console.log("Profile clicked")}> {/* Ganti gotoScreenProfile */}
            <Avatar size="md">
              <AvatarFallbackText className="">
                {/* Pastikan dataProfile ada sebelum diakses */}
                {/* {dataProfile?.dataLogin?.username} */}
                User
              </AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: "https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-701751694975293fcgzulxp2k.png",
                }}
              />
              <AvatarBadge />
            </Avatar>
          </TouchableOpacity>
          <Box className="pl-2"> {/* Hapus -pt-2 jika menyebabkan masalah layout */}
            <Text className="text-gray-400 text-sm">Welcome, </Text>
            <Text
              className="text-md capitalize"
              style={{ color: colorMode.text }}
            >
              {/* {dataProfile?.dataLogin?.username} */}
              Guest
            </Text>
            <Text className="text-sm lowercase text-gray-500">
              {/* {dataProfile?.dataLogin?.email} */}
              guest@example.com
            </Text>
          </Box>
        </HStack>
        <HStack className="gap-2"> {/* Hapus h-20 w-20 pt-2 dari sini, karena MotiView luar sudah mengontrol dimensinya */}
          <TouchableOpacity>
            <Box className=" rounded-full bg-gray-300 p-2 dark:bg-gray-500">
              <Ionicons
                name="notifications-outline"
                size={18}
                color={colorMode.iconColor}
              />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity>
            <Box className=" rounded-full bg-gray-300 p-2 dark:bg-gray-500">
              <Ionicons
                name="mail-outline"
                size={18}
                color={colorMode.iconColor}
              />
            </Box>
          </TouchableOpacity>
        </HStack>
        {/* Akhir dari konten HStack Anda */}
      </MotiView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    // Styling dasar untuk MotiView, properti ini akan dianimasikan oleh Moti
    justifyContent: 'center', // Pusatkan konten secara vertikal
    alignItems: 'center', // Pusatkan konten secara horizontal saat kecil
    // overflow: 'hidden', // Penting agar konten tidak meluber saat dianimasikan
  },
});

export default MyAnimatedHStack;