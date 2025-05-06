import {Text, View, StyleSheet} from "react-native";

const BalanceCard = () => {
    return (
        <View>
            
        </View>
    );
}
const style = StyleSheet.create({
    banner: {
        padding: 30,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: "#6d25e5",
    },
    balance: {
        marginTop: 12,
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    balanceGrowth: {
        alignItems: "flex-end",
        paddingTop: 10,
    }
})