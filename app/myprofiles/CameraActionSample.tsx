import { useState } from "react";
import { Modal, SafeAreaView, TouchableOpacity } from "react-native";
// eslint-disable-next-line import/no-duplicates
import { Button, Dimensions, Image, StyleSheet, Text, View } from "react-native";
// import ComponenCameraView from "./ComponenCameraView"; // Pastikan path ini benar
import ComponenCameraView from '@/components/ComponenCameraView';
import { Ionicons } from '@expo/vector-icons'; // Untuk ikon close di modal zoom

const { width, height } = Dimensions.get('window'); // Dapatkan dimensi layar

export default function GalleryComponen() {
  const [viewCamera, setViewCamera] = useState<boolean>(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const [zoomModalVisible, setZoomModalVisible] = useState<boolean>(false);
  const [currentZoomImageUri, setCurrentZoomImageUri] = useState<string | null>(null);


  const handleImageCapture = (uri: string | null) => {
    if (uri) {
      setCapturedImageUri(uri);
    }
    setViewCamera(false);
  };

  const handleImageClick = () => {
    if (capturedImageUri) {
      setCurrentZoomImageUri(capturedImageUri);
      setZoomModalVisible(true);
    }
  };

  const handleCloseZoomModal = () => {
    setZoomModalVisible(false);
    setCurrentZoomImageUri(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30, marginLeft: 20 }}>
      <Text className="text-3xl font-bold mb-[30px]">My Gallery </Text>
      <View>
        <Text className="text-red-500">My Gallery</Text>
        <Button title="Open Camera" onPress={() => setViewCamera(true)} />

        <View style={styles.imageDisplayContainer}>
          {capturedImageUri ? (
            // PASTIKAN TouchableOpacity memiliki dimensi yang jelas,
            // dan Image di dalamnya juga memiliki dimensi.
            // Saya memindahkan style capturedImage langsung ke TouchableOpacity
            // dan mengatur lebar/tinggi pada Image di dalamnya.
            <TouchableOpacity onPress={handleImageClick} activeOpacity={0.8} style={styles.capturedImageWrapper}>
              <Image
                source={{ uri: capturedImageUri }}
                style={styles.capturedImage}
              />
            </TouchableOpacity>
          ) : (
            <Text>Tampilkan Photo hasil tangkap kamera disini</Text>
          )}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={viewCamera}
        onRequestClose={() => {
          setViewCamera(false);
        }}
      >
        <ComponenCameraView onCapture={handleImageCapture} />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={zoomModalVisible}
        onRequestClose={handleCloseZoomModal}
      >
        <View style={styles.zoomModalBackground}>
          {currentZoomImageUri && (
            <Image
              source={{ uri: currentZoomImageUri }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity style={styles.closeZoomButton} onPress={handleCloseZoomModal}>
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageDisplayContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden', // Penting untuk memastikan konten tidak meluber
  },
  // Style baru untuk wrapper TouchableOpacity
  capturedImageWrapper: {
    width: '100%', // Ambil lebar penuh dari container
    height: 200, // Berikan tinggi yang jelas
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    width: '100%', // Ambil lebar penuh dari wrapper
    height: '100%', // Ambil tinggi penuh dari wrapper
    resizeMode: 'contain', // Pastikan gambar terlihat utuh
  },
  zoomModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width * 0.95,
    height: height * 0.8,
    resizeMode: 'contain',
  },
  closeZoomButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
});