import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonText } from "../ui/button";


interface CameraModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPictureTaken: (photo: any) => void;
}

const CameraModal = ({
  isVisible,
  onClose,
  onPictureTaken,
}: CameraModalProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  const handleTakePicture = async () => {
    // --- Langkah 1: Periksa dan minta izin kamera ---
    if (!permission?.granted) {
      const permissionResult = await requestPermission();
      // Jika izin masih ditolak, jangan lanjutkan
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "We need camera access to take a picture. Please enable it in your device settings."
        );
        return;
      }
    }

    // --- Langkah 2: Ambil gambar jika sudah diizinkan ---
    if (cameraRef.current) {
      try {
        setIsTakingPicture(true);
        const photo = await cameraRef.current.takePictureAsync();

        if (photo) {
          onPictureTaken(photo);
          onClose();
        } else {
          Alert.alert("Error", "Gagal mengambil gambar. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
        Alert.alert("Error", "Gagal mengambil gambar. Silakan coba lagi.");
      } finally {
        setIsTakingPicture(false);
      }
    }
  };

  if (!permission) {
    // Tampilan loading sementara saat izin sedang dimuat pertama kali
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.cameraContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close-circle" size={40} color="white" />
        </TouchableOpacity>

        {/* Tampilkan kamera hanya jika izin sudah diberikan */}
        {permission.granted ? (
          <CameraView ref={cameraRef} style={styles.camera} facing="back">
            <View style={styles.captureButtonContainer}>
              <TouchableOpacity
                onPress={handleTakePicture}
                style={styles.captureButton}
                disabled={isTakingPicture}
              >
                {isTakingPicture ? (
                  <ActivityIndicator size="small" color="black" />
                ) : (
                  <View style={styles.captureButtonInner} />
                )}
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          // Tampilkan tombol permintaan izin jika belum diizinkan
          <View style={styles.centered}>
            <Text className="text-white mb-2">
              We need camera access to take a picture.
            </Text>
            <Button className="bg-['#0c6ded'] rounded-full mt-2" onPress={handleTakePicture}>
              <ButtonText className=" text-white">Grant Permission</ButtonText>
            </Button>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // ... (Gaya lainnya tetap sama)
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#333", // Pastikan warna teks terlihat
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  captureButtonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 50,
  },
  captureButton: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default CameraModal;
