// ComponenCameraView.tsx

import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Pastikan interface ini sudah ada dan benar
interface ComponenCameraViewProps {
  onCapture: (uri: string | null) => void; // Ini mendefinisikan prop 'onCapture'
}

// Pastikan komponen menerima props dengan cara ini
export default function ComponenCameraView({ onCapture }: ComponenCameraViewProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Membutuhkan izin untuk menampilkan kamera
        </Text>
        <Button onPress={requestPermission} title="Berikan Izin" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo?.uri || null);
    }
  };

  const handleConfirmPhoto = () => {
    onCapture(photoUri);
    setPhotoUri(null);
  };

  const handleCancelPhoto = () => {
    setPhotoUri(null);
    onCapture(null);
  };

  const handleCloseCameraStandby = () => {
    onCapture(null);
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={handleCancelPhoto} style={styles.iconButton}>
              <Ionicons name="close-circle" size={50} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirmPhoto} style={styles.iconButton}>
              <Ionicons name="checkmark-circle" size={50} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseCameraStandby}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.shutterButtonContainer}>
            <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
              <View style={styles.innerShutterButton} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.flipIconButton} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  shutterButtonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
  },
  innerShutterButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "lightgray",
  },
  flipIconButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  previewImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 50,
  },
  iconButton: {
    padding: 10,
  },
});