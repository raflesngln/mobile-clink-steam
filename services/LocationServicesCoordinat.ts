import { store } from '@/redux/store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { AppState, Platform } from "react-native";
// import DataDriver from "@/services/driver/dataDrivers";
import DataOceans from "@/services/ocean_export/dataOceanExport";


// const TASK_NAME = "BACKGROUND_LOCATION_TASK";
const LOCATION_TASK_NAME = 'background-location-task';
const STORAGE_KEY = "saved_locations";
let isTracking = false;
// Auto-start when imported
let autoStartEnabled = true;
let locationSubscription:any = null;
let appState = 'active';
let autoStartAttempted = false;

export const enableAutoStart = (enabled:any) => {
  autoStartEnabled = enabled;
};

// Listen to app state changes
// AppState.addEventListener('change', (nextAppState:any) => {
//   if (nextAppState === 'active' && autoStartEnabled && !isTracking) {
//     startLocationTracking();
//   }
// });

AppState.addEventListener('change', (nextAppState) => {
  console.log('App state changed to:', nextAppState);
  appState = nextAppState;
  
  // Auto start ketika app menjadi active
  if (nextAppState === 'active' && !autoStartAttempted) {
    delayedAutoStart();
  }
});

// Delay auto start untuk pastikan app fully active
const delayedAutoStart = () => {
  setTimeout(async () => {
    if (appState === 'active' && !autoStartAttempted) {
      autoStartAttempted = true;
      console.log('🚀 Attempting auto start...');
      await startLocationTracking();
    }
  }, 3000); // Delay 3 detik setelah app active
};


// Fungsi untuk meminta izin lokasi
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      const backgroundStatus =
        await Location.requestBackgroundPermissionsAsync();

      if (backgroundStatus.status === "granted") {
        console.log("Background location permission granted");
        return true;
      }
    }
    console.log("Location permission denied");
    return false;
  } catch (error) {
    console.error("Error requesting location permission:", error);
    return false;
  }
};

// Fungsi untuk menyimpan koordinat ke AsyncStorage
export const saveLocation = async (location: any) => {
  try {
    const timestamp = new Date().toISOString();
    const locationData = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      altitude: location.coords.altitude,
      speed: location.coords.speed,
      timestamp: timestamp,
    };

    // Ambil data yang sudah tersimpan di localStorage
    // const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    // const locations = existingData ? JSON.parse(existingData) : [];

    // Tambahkan data baru ke locations baru
    // locations.push(locationData);

    // Simpan ke localStorage 
    // await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(locations));

    const dispatchIds= await saveLocationToRestAPI(locationData.latitude,locationData.longitude)

    console.log("✅ Dispacth id array :", dispatchIds);
    // console.log("Location saved:", locationData);
    return locationData;
  } catch (error) {
    console.error("❌ Error saving location:", error);
  }
};


export const startLocationTracking = async () => {
  if (isTracking) {
    console.log('📍 Tracking already active');
    return true;
  }

  // Check jika app dalam background
  if (appState !== 'active') {
    console.log('⏳ App in background, waiting for active state...');
    return false;
  }

  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.log('❌ Location permission not granted');
      return false;
    }
    console.log('🟢 Starting location tracking...');
    // Get initial location immediately
    await getSavedLocations();

    // Untuk Android, gunakan foreground service hanya jika benar2 needed
    if (Platform.OS === 'android') {
      try {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 300000, // 5 minutes
          distanceInterval: 0,
          foregroundService: {
            notificationTitle: 'Coordinate Tracking',
            notificationBody: 'Keep this always running, Okey!',
            notificationColor: '#000000',
          },
        } as any);
      } catch (foregroundError) {
        console.log('⚠️ Foreground service failed, using fallback...');
        // Fallback ke interval tracking tanpa foreground service
        startIntervalTracking();
        isTracking = true;
        return true;
      }
    } else {
      // iOS menggunakan interval
      startIntervalTracking();
    }

    isTracking = true;
    console.log('✅ Tracking started successfully');
    return true;

  } catch (error) {
    console.error('❌ Start tracking failed:', error);
    
    // Fallback ke interval tracking
    startIntervalTracking();
    isTracking = true;
    return true;
  }
};

// Interval tracking untuk fallback dan iOS
const startIntervalTracking = () => {
  console.log('⏰ Starting interval-based tracking');
  
  // Get location immediately
  getSavedLocations();
  
  // Set interval untuk setiap 5 menit
  setInterval(async () => {
    console.log('🔄 Auto-refresh location interval');
    await getSavedLocations();
  }, 5 * 60 * 1000);
};


// Fungsi untuk menghentikan tracking
export const stopLocationTracking = async () => {
  try {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log('❌ Location tracking stopped');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error stopping location tracking:', error);
    return false;
  }
};

// Fungsi untuk mengambil semua lokasi yang tersimpan di localSTorage
export const getSavedLocations = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('❌ Error getting saved locations:', error);
    return [];
  }
};


// Fungsi untuk menghapus semua lokasi yang tersimpan
export const clearSavedLocations = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('All locations cleared');
    return true;
  } catch (error) {
    console.error('❌ Error clearing locations:', error);
    return false;
  }
};


// Background task handler
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }:any) => {
  if (error) {
    console.error('Background task error:', error);
    return;
  }
  
  if (data && data.locations) {
    const locations = data.locations;
    const latestLocation = locations[locations.length - 1];
    console.log('🌍 Background location update');
    await saveLocation(latestLocation);
  }
});

// Otomatis start ketika module di-load
if (autoStartEnabled) {
  setTimeout(() => {
    startLocationTracking();
  }, 3000); // Delay 3 detik setelah app load
}

/**
 * FOREGROUND TRACKING (trtacking saat aplikasi aktif dan terbuka)
 * Mulai real-time location tracking (update lebih frequent)
 * @param {number} interval - Interval dalam milidetik (default: 10 detik)
 * @param {number} distance - Jarak minimal dalam meter (default: 3 meter)
 */
export const startRealtimeTracking = async (
  interval = 10000, 
  distance = 3
) => {
  try {
    console.log('🎯 Starting real-time location tracking...');
    
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.log('❌ Permission denied for real-time tracking');
      return false;
    }

    // Hentikan subscription sebelumnya jika ada
    if (locationSubscription) {
      locationSubscription.remove();
    }

    // Subscribe to real-time location updates
    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: interval,
        distanceInterval: distance,
      },
      (location) => {
        console.log('📍 Real-time location updated IS => :', {
          lat: location.coords.latitude.toFixed(6),
          lng: location.coords.longitude.toFixed(6),
          speed: location.coords.speed,
          time: new Date().toLocaleTimeString()
        });
        
        // Otomatis save setiap update real-time
        saveLocation(location);
        
        // Bisa juga emit event untuk component lain
        // EventEmitter.emit('locationUpdate', location);
      }
    );

    console.log('✅ Real-time tracking started');
    return true;
  } catch (error) {
    console.error('❌ Real-time tracking error:', error);
    return false;
  }
};

/**
 * Hentikan real-time tracking
 */
export const stopRealtimeTracking = () => {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
    console.log('🛑 Real-time tracking stopped');
  }
};

/**
 * Dapatkan status real-time tracking
 */
export const isRealtimeTracking = () => {
  return locationSubscription !== null;
};

// 4. COMBINED TRACKING (5 MENIT + REAL-TIME)
// ===========================================

/**
 * Mulai combined tracking: 5 menit interval + real-time
 */
export const startCombinedTracking = async () => {
  try {
    // Start regular 5-minute tracking
    await startLocationTracking();
    
    // Start real-time tracking juga
    await startRealtimeTracking(15000, 20); // 15 detik, 20 meter
    
    console.log('🚀 Combined tracking started');
    return true;
  } catch (error) {
    console.error('❌ Combined tracking error:', error);
    return false;
  }
};

/**
 * Hentikan semua tracking
 */
export const stopAllTracking = async () => {
  await stopLocationTracking();
  stopRealtimeTracking();
  console.log('🔴 All tracking stopped');
};


export const getDataLoginFromLocalStorage = () => {
  const state = store.getState();
  return state.profile.dispatch_id || {};
};

export const saveLocationToRestAPI = async (latitude: any, longitude: any) => {
  try {
    const dispatchArray = getDataLoginFromLocalStorage(); 
    
    console.log("array IDS to ms_dispatch :", dispatchArray);
    console.log("latitude :", latitude);
    console.log("longitude :", longitude);

    if(dispatchArray && dispatchArray.length > 0) {
      try {
        const resp = await DataOceans.updateCoordinat({
          ids: dispatchArray, // GANTI: dispatch_array -> ids
          latitude: latitude.toString(), // Convert to string
          longitude: longitude.toString() // Convert to string
        });
        
        console.log("✅ API Response:", resp);
        return resp;
      } catch (error) {
        console.error("❌ Error calling API:", error);
        throw error; // Re-throw error untuk handling di level atas
      }
    } else {
      console.warn("✅ Dispatch array is empty");
      return { success: false, message: "No dispatch IDs found" };
    }
  } catch (error) {
    console.error('❌ Error in saveLocationToRestAPI:', error);
    throw error;
  }
};