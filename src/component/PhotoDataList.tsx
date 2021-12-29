import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Linking,
    ActivityIndicator
} from "react-native";
import language from "../shared/language";
import {useDispatch, useSelector} from "react-redux";
import {Photo} from "MyModels";
import {getImageUrlThumb, SIZE} from "../services/photoService";
import {fetchPhotos, fetchPhotosLoadMore} from "../features/photo/epics";
import {photoList} from "../features/photo/selectors";
import {COLORS} from "../shared/colors";

interface IProps {
    history?: any,
    photoName: string,
    route: any,
}

const PhotoDataList: React.FC<IProps> = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentPageLoaded, setCurrentPageLoaded] = useState(1);
    const tag = props.route.params.photoName;

    const {strings} = language;
    const dispatch = useDispatch();

    useEffect(() => {
        getPhotos(tag);
    }, [])

    const getPhotos = (tag: string) => {
        dispatch(fetchPhotos(tag, 1));
    };
    const getPhotosOnRefresh = (tag: string, page: number) => {
        dispatch(fetchPhotosLoadMore(tag, page))
    }

    const handleRenderItemPress = (item) => {
        const url = getImageUrlThumb(item, SIZE.MEDIUM_800px);
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    }

    const getRenderItemBackgroundColor = (num: number) => {
        return (num % 2) ? styles.renderItemColorEven : styles.renderItemColorOdd;
    }

    const renderFlatListItem = ({item, index}) => {
        let description = item.description._content;
        description = description ? description : strings.NONE;
        const urlImage = getImageUrlThumb(item, SIZE.SMALL_240px);
        return (
            <TouchableOpacity onPress={() => handleRenderItemPress(item)}>
                <View style={[styles.renderItemContainer, getRenderItemBackgroundColor(index)]}>
                    <View>
                        <View style={styles.imageCon}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: urlImage,
                                }}
                            />
                            <View>
                                <Text style={styles.renderItemOwnerNameText}>
                                    {item.ownername}
                                </Text>
                                <Text style={styles.renderItemDateTakenText}>
                                    Date taken: {item.datetaken}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.renderItemDescriptionText}>
                            Description: {description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderFlatListFooter = () => {
        if (!isLoading) return null;
        return (
            <ActivityIndicator/>
        );
    };

    const handleLoadMore = () => {
        if (!isLoading) {
            getPhotosOnRefresh(tag, currentPageLoaded + 1);
            setCurrentPageLoaded(currentPageLoaded + 1);
        }
    };

    const renderFlatList = () => {
        return (
            <FlatList
                data={useSelector(photoList)}
                renderItem={renderFlatListItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View style={styles.flatListListEmpty}>
                        <Text style={styles.flatListEmptyText}>{strings.LIST_IS_EMPTY}</Text>
                    </View>
                )}
                ListFooterComponent={renderFlatListFooter}
                onEndReachedThreshold={0.4}
                onEndReached={handleLoadMore}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>List of Photos</Text>
                {renderFlatList()}
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        //alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: 30,
        marginHorizontal: 10,
        marginBottom: 50,
    },
    title: {
        fontSize: 22,
        alignSelf: "center",
        paddingBottom: 10,
        fontWeight: "bold",
    },
    flatListListEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    flatListEmptyText: {
        fontSize: 20,
        color: COLORS.conifer,
    },
    renderItemContainer: {
        minHeight: 70,
        padding: 15,
        marginBottom: 10,
        borderRadius: 15,
    },
    renderItemColorOdd: {
        backgroundColor: COLORS.regentGray,
    },
    renderItemColorEven: {
        backgroundColor: COLORS.lynch,
    },
    renderItemOwnerNameText: {
        color: COLORS.hokeyPokey,
        fontWeight: 'bold',
        fontSize: 22,
        flexWrap: "nowrap",
        alignSelf: 'flex-start'
    },
    renderItemDateTakenText: {
        color: 'black',
        fontWeight: 'bold'
    },
    renderItemDescriptionText: {
        color: 'black',
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 5,
        marginRight: 10,
    },
    imageCon: {
        flex: 1,
        flexDirection: "row"
    },
});

export default PhotoDataList;