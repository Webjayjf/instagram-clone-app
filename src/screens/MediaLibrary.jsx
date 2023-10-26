import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES } from "../constants";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import useMediaLibrary from "../hooks/useMediaLibrary";
import Animated from "react-native-reanimated";
import AlbumModal from "../components/mediaLibrary/AlbumModal";
import useAlbumSelector from "../utils/useAlbumSelector";
import useOpacityAnimation from "../utils/useOpacityAnimation";
import CameraModule from "../components/shared/CameraModule";
import { BlurView } from "expo-blur";

const MediaLibrary = ({ navigation, route }) => {
  const { initialSelectedType, selectorAvailable = true } = route.params || {};
  const [selectedImage, setSelectedImage] = useState();
  const [selectedType, setSelectedType] = useState(initialSelectedType);
  const [albumModalVisible, setAlbumModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);

  const { scrollY, flatListRef, animatedStyle } = useOpacityAnimation();
  const { allAlbums, selectedAlbum, selectedAlbumTitle, handleAlbumSelection } =
    useAlbumSelector({ setAlbumModalVisible });
  const { images, videos } = useMediaLibrary(selectedAlbum);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].uri);
    }
  }, [images]);

  const handleImageSelection = (image) => {
    setSelectedImage(image.uri);
  };

  const handleTypeSelector = (type) => {
    setSelectedType(type);
  };

  const handleNextButton = () => {
    navigation.navigate("NewPost", { selectedImage });
  };

  const setCapturedPhoto = (photo) => {
    if (selectedType === "New post") {
      setSelectedImage(photo);
    } else if (selectedType === "Add to story") {
      const updatedPhoto = { uri: photo, id: "123" };
      navigation.navigate("NewStory", { selectedImage: updatedPhoto });
    } else if (selectedType === "New reel") {
      const updatedVideo = { uri: photo, id: "123" };
      navigation.navigate("NewReel", { selectedImage: updatedVideo });
    }
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        {selectedType === "New post" ? (
          <TouchableOpacity onPress={() => handleImageSelection(item)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.image} />
            </View>
          </TouchableOpacity>
        ) : selectedType === "Add to story" ? (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate("NewStory", { selectedImage: item })
            }
          >
            <View style={styles.videoContainer}>
              <Animated.Image
                source={{ uri: item.uri }}
                style={styles.image}
                sharedTransitionTag={item.id.toString()}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate("NewReel", { selectedImage: item })
            }
          >
            <View style={styles.videoContainer}>
              <Animated.Image
                source={{ uri: item.uri }}
                style={styles.image}
                sharedTransitionTag={item.id.toString()}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="close"
            size={32}
            color={"#fff"}
            style={styles.iconCorrection}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{selectedType}</Text>
        {selectedType === "New post" ? (
          <TouchableOpacity onPress={() => handleNextButton()}>
            <Text style={styles.nextButton}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <MaterialIcons name="settings" size={24} color={"#fff"} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.mediaContainer}>
        {selectedType === "New post" ? (
          <View style={styles.selectedImageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          </View>
        ) : selectedType === "Add to story" ? null : null}
        <View style={styles.LibraryBarContainer}>
          <TouchableOpacity onPress={() => setAlbumModalVisible(true)}>
            <View style={styles.albunButtonContainer}>
              <Text style={styles.albunButtonText}>{selectedAlbumTitle}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color={"#fff"}
                style={styles.albunButtonIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCameraModalVisible(true)}>
            <View style={styles.cameraButtonContainer}>
              <Feather name="camera" size={16} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          key={selectedType}
          data={selectedType === "New reel" ? videos : images}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
          numColumns={selectedType === "New post" ? 4 : 3}
          onScroll={(event) => {
            scrollY.value = event.nativeEvent.contentOffset.y;
          }}
          ref={flatListRef}
        />

        {selectorAvailable && (
          <Animated.View style={animatedStyle}>
            <BlurView
              intensity={30}
              tint="light"
              style={styles.selectorContainer}
            >
              <TouchableOpacity onPress={() => handleTypeSelector("New post")}>
                <Text
                  style={[
                    styles.selectorButton,
                    { color: selectedType === "New post" ? "#fff" : "#999" },
                  ]}
                >
                  POST
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTypeSelector("Add to story")}
              >
                <Text
                  style={[
                    styles.selectorButton,
                    {
                      color: selectedType === "Add to story" ? "#fff" : "#999",
                    },
                  ]}
                >
                  STORY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTypeSelector("New reel")}>
                <Text
                  style={[
                    styles.selectorButton,
                    { color: selectedType === "New reel" ? "#fff" : "#999" },
                  ]}
                >
                  REEL
                </Text>
              </TouchableOpacity>
            </BlurView>
          </Animated.View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={albumModalVisible}
      >
        <AlbumModal
          setAlbumModalVisible={setAlbumModalVisible}
          handleAlbumSelection={handleAlbumSelection}
          allAlbums={allAlbums}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={cameraModalVisible}
      >
        <CameraModule
          setCameraModalVisible={setCameraModalVisible}
          setCapturedPhoto={setCapturedPhoto}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          options={true}
        />
      </Modal>
    </View>
  );
};

export default MediaLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    height: 45,
  },
  iconCorrection: {
    marginLeft: -10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  nextButton: {
    color: "#08f",
    fontWeight: "700",
    fontSize: 17,
  },
  nullButton: {
    color: "#000",
    fontWeight: "700",
    fontSize: 20,
  },
  mediaContainer: {
    flex: 1,
  },
  selectedImageContainer: {
    height: SIZES.Width,
    width: SIZES.Width,
  },
  selectedImage: {
    flex: 1,
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
  },
  LibraryBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    height: 48,
  },
  albunButtonContainer: {
    flexDirection: "row",
  },
  albunButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  albunButtonIcon: {
    paddingTop: 1,
  },
  cameraButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#222",
    borderWidth: 0.5,
    borderColor: "#333",
    height: 30,
    width: 30,
  },
  imageContainer: {
    flex: 1,
    margin: 0.3,
    aspectRatio: 1,
    overflow: "hidden",
  },
  videoContainer: {
    flex: 1,
    margin: 0.3,
    aspectRatio: 9 / 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  selectorContainer: {
    position: "absolute",
    bottom: 35,
    right: 15,
    height: 48,
    width: 240,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.8)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  selectorButton: {
    fontSize: 15,
    fontWeight: "500",
  },
});
