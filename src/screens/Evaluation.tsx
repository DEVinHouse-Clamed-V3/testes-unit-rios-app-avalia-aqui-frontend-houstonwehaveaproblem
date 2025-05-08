import axios from "axios";
import Checkbox from "expo-checkbox";
import { useMemo, useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { RadioGroup } from "react-native-radio-buttons-group";
import { ScreenRouteProp } from "../@types/navigation";

type Props = ScreenRouteProp<"Evaluations">;

export default function Evaluations({ route, navigation }: Props) {
    const { productId } = route.params;

    const radioOptions = useMemo(
        () => [
            {
                id: "1",
                label: "Ruim",
                value: "bad",
            },
            {
                id: "2",
                label: "Médio",
                value: "medium",
            },
            {
                id: "3",
                label: "Bom",
                value: "good",
            },
            {
                id: "4",
                label: "Excelente",
                value: "excellent",
            },
        ],
        []
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [experience, setExperience] = useState("");
    const [recommend, setRecommend] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit() {
        setErrorMessage("");

        if (!name || !email || !feedback || !experience || !recommend) {
            setErrorMessage("Ops, faltou preencher algum campo!");
            return;
        }

        axios
            .post(process.env.EXPO_PUBLIC_API_URL + "/evaluations", {
                productId: productId,
                name: name,
                email: email,
                feedback: feedback,
                experience: experience,
                recommend: recommend,
            })
            .then((response) => {
                Alert.alert("Avaliação publicada com sucesso!");
                navigation.navigate("Products");
            })
            .catch(() => {
                Alert.alert("Erro ao publicar avaliação");
            });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.form}>
                            <Text style={styles.title}>
                                Nos dê seu Feedback
                            </Text>
                            <Text style={styles.descriptionText}>
                                Sua opinião é muito importante, e pode ajudar
                                outros consumidores. Compartilhe sua
                                experiência!
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Nome completo"
                            />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="E-mail"
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.descriptionInput}
                                value={feedback}
                                onChangeText={setFeedback}
                                placeholder="Descreva sua experiência..."
                            />
                            <Text style={styles.descriptionText}>
                                Como você avalia sua experiência?
                            </Text>
                            <View style={styles.evaluationStyle}>
                                <RadioGroup
                                    radioButtons={radioOptions}
                                    onPress={setExperience}
                                    selectedId={experience}
                                    layout="row"
                                />
                            </View>
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    value={recommend}
                                    onValueChange={setRecommend}
                                    color={recommend ? "#3b5a00" : undefined}
                                />
                                <Text style={styles.descriptionText}>
                                    Recomendaria para outras pessoas?
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonSend}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>
                                    Enviar Feedback
                                </Text>
                            </TouchableOpacity>
                            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "flex-start",
    },
    scroll: {
        alignItems: 'center',
        paddingBottom: 40
    },
    form: {
        alignItems: 'center',
        width: '100%'
    },
    button: {
        width: 86,
        height: 32,
        backgroundColor: "#000000",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSend: {
        width: 140,
        height: 32,
        backgroundColor: "#000000",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#b7ff30",
    },
    title: {
        fontSize: 26,
        color: "#3b5a00",
        textAlign: "center",
        fontWeight: "600",
        marginTop: 30,
    },
    descriptionText: {
        fontSize: 16,
        color: "#000000",
        textAlign: "center",
        margin: 20,
    },
    input: {
        width: "90%",
        height: 40,
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginVertical: 15,
        backgroundColor: "#fff",
    },
    descriptionInput: {
        width: "90%",
        height: 80,
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginTop: 15,
        backgroundColor: "#fff",
    },
    evaluationStyle: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    errorText: {
        color: '#ff0000',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20
    }
});
