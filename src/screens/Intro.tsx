import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

export default function Intro({navigation}: any) {

    function handleNavigateToLogin(){
        navigation.navigate('Products')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../../assets/cover.png")}
                style={styles.cover}
            />
            <Text style={styles.title}>Avalie aqui</Text>
            <Text style={styles.descriptionText}>
                Escolha o produto que deseja avaliar e compartilhe sua experiência com outros consumidores
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToLogin} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 40,
        color: "#3b5a00",
        textAlign: "center",
        fontWeight: "600",
    },
    descriptionText: {
        fontSize: 16,
        color: "#000000",
        padding: 20,
        textAlign: 'center',
        marginBottom: 50
    },
    button: {
        width: 100,
        height: 40,
        backgroundColor: "#000000",
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#b7ff30",
    },
    cover: {
        width: 300,
        height: 50,
        marginVertical: 60
    },
});
