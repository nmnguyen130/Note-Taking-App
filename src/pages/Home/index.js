import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import Style from "./styles";
import Colors from "../../styles/colors";
import Notes from "../../components/RenderNotes";

import GetNote from "../../components/getNote";

export default function Home({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const getData = async () => {
        try {
          const notes = await GetNote();

          setData(notes);
          setLoading(false);
        } catch (err) {
          console.log(err);
          alert("Error loading notes");
        }
      };
      getData();
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.loading} />
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={[
          Style.conteiner,
          {
            marginLeft: Platform.OS === "android" ? 0 : 20,
            marginRight: Platform.OS === "android" ? 0 : 20,
          },
        ]}
      >
        <Text style={Style.txtTitle}>NOTE-TAKING-APP</Text>
        <SearchBar data={data} onChange={setData} />
        <FlatList
          ListEmptyComponent={
            <Text style={{ textAlign: "center" }}>No Data!</Text>
          }
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <Notes item={item} navigation={navigation} />;
          }}
        />
        <TouchableOpacity
          style={Style.newNoteButton}
          onPress={() => navigation.navigate("Notes", { search: false })}
        >
          <AntDesign name="pluscircle" size={60} color={Colors.addButton} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
