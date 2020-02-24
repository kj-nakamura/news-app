import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';
import {addClip, deleteClip} from '../store/actions/user';
import ClipButton from '../components/ClipButton';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
});

const ArticleScreen = props => {
    const [url, setUrl] = useState();

    useEffect(() => {
        const article = props.navigation.getParam('article');
        setUrl(article.url);
    }, [])
   
    const isClipped = () => {
        const article = props.navigation.getParam('article');
        return props.user.clips.some(clip => clip.url === article.url)
    };

    const toggleClip = () => {
        if(isClipped()) {
            props.deleteClip({ clip: props.navigation.getParam('article')})
        } else {
            props.addClip({clip: props.navigation.getParam('article')})
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ClipButton onPress={toggleClip} enabled={isClipped()} />
            <WebView 
                source={{ uri: url }} 
                startInLoadingState={true}
                renderLoading={() => <Loading />}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = {addClip, deleteClip};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen);