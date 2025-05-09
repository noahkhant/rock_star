import { Text, View, ScrollView, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, msg: "EPC Bill", type: "out", time: "May 3, 2025" },
    { id: 2, msg: "Deposit", type: "in", time: "May 5, 2025" },
    { id: 3, msg: "Transfer", type: "in", time: "May 5, 2025" },
    { id: 4, msg: "Wifi Bill", type: "out", time: "May 6, 2025" },
    { id: 5, msg: "Payment", type: "in", time: "May 7, 2025" },
  ]);

  return (
    <ScrollView>
      {transactions.map((transactions) => {
        return (
          <View style={styles.transaction} key={transactions.id}>
            <MaterialIcons
              name="compare-arrows"
              size={32}
              color={transactions.type === "in" ? "green" : "brown"}
            />
            <View>
              <Text style={styles.text.payment}>{transactions.msg}</Text>
              <Text style={styles.text.muted}>{transactions.time}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  transaction: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },

  text: {
    payment: {
      fontSize: 21,
    },

    muted: {
      color: "#888",
    },
  },
});

export default Transactions;
