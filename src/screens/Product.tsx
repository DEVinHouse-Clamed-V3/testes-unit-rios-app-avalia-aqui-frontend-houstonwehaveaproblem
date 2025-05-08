import { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import axios from "axios";
import Line from "./components/Line";
import { FlatList, TextInput } from "react-native-gesture-handler";

interface ProductsType {
    id: number;
    name: string;
    price: string;
    brand: string;
    description: string;
    image: string;
}

export default function Products({ navigation }: any) {
    const [products, setProducts] = useState<ProductsType[]>([])
    const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([])
    const [search, setSearch] = useState("")

    const fetchProducts = () => {
        axios
            .get(process.env.EXPO_PUBLIC_API_URL + "/products")
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch((error) => {
                console.log(error, 'Erro ao buscar produtos')
            })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const filterProducts = () => {
        const lowercasedFilter = search.toLowerCase()
        const filteredData = products.filter(product =>
          product.name?.toLowerCase().includes(lowercasedFilter) ||
          product.description?.toLowerCase().includes(lowercasedFilter) ||
          product.brand?.toLowerCase().includes(lowercasedFilter)
        )
        setFilteredProducts(filteredData)
      }

    const renderProduct = ({ item }: { item: ProductsType }) => (
        <View style={styles.cardContainer}>
            <View style={styles.productCard}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: item.image}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.subTitle}>{item.name}</Text>
                    <Text style={styles.descriptionText}>Marca: {item.brand}</Text>
                    <Text style={styles.descriptionText}>Descrição: {item.description}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Evaluations", {productId: item.id})}
                    >
                        <Text style={styles.buttonText}>Avaliar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
                <Line />
            </View>
        </View>
    )

    return(
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nome do produto, descrição ou marca"
                value={search}
                onChangeText={(text) => {
                    setSearch(text)
                    filterProducts()
                }}
            />
            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    cardContainer: {
        width: '100%'
    },
    productCard: {
        flexDirection: "row",
        margin: 15,
        width: '100%',
        alignItems: 'center'
    },
    image: {
        width: 90,
        height: 150
    },
    imageContainer: {
        marginRight: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        margin: 15,
        textAlign: 'center'
    },
    productInfo: {
        gap: 5,
        width: 250
    },
    subTitle: {
        fontSize: 17,
        color: "#3b5a00",
        fontWeight: "500",
    },
    descriptionText: {
        fontSize: 15,
        color: "#000000"
    },
    price: {
        color: "red",
        fontSize: 16,
        fontWeight: 500,
    },
    button: {
        width: 86,
        height: 32,
        backgroundColor: "#000000",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 6,
    },
    buttonText: {
        fontSize: 16,
        color: "#b7ff30",
    },
    searchInput: {
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        margin: 15,
        backgroundColor: '#fff'
    }
})
