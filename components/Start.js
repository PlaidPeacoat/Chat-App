import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";


// an object of objects. When referenced in a "style" attribute, the backgroundColor is applied!
const bgColors = {
  mint: { backgroundColor: "#36FFAD" },
  blue: { backgroundColor: "#65CEFF" },
  purple: { backgroundColor: "#9871EB" },
  pink: { backgroundColor: "#FD77FF" },
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bgColor: ""
    };
  }

  render() {
    // mint = bgColors.mint i.e., { backgroundColor: "#000000" }
    const { mint, blue, purple, pink } = bgColors;
    return (
      <ImageBackground
        source={require("../assets/chatAppBackground.jpg")}
        style={[styles.container, styles.columnEvenlyCenter]}
      >
        <Text style={styles.title}>Chat Away!</Text>

        <View style={[styles.nameInput__container, styles.columnEvenlyCenter]}>
          <TextInput
            style={styles.nameInput__input}
            onChangeText={(name) => this.setState({ name })} // state.name is the user's input value
            value={this.state.name}
            placeholder="Enter your Name"
          />

          <View style={styles.colorSelect}>
            <Text style={styles.colorSelect__text}>
              Choose your Background:
            </Text>
            <View style={styles.colorSelect__dotsWrapper}>
              <TouchableOpacity
                style={[
                  styles.colorSelect__dot,
                  mint,
                  this.state.color === mint.backgroundColor
                    ? styles.colorSelect__dotSelected
                    : {},
                ]}
                onPress={() => this.setState({ bgColor: mint.backgroundColor })} // 
              />

              <TouchableOpacity
                style={[
                  styles.colorSelect__dot,
                  blue,
                  this.state.color === blue.backgroundColor
                    ? styles.colorSelect__dotSelected
                    : {},
                ]}
                onPress={() => this.setState({ bgColor: blue.backgroundColor })}
              />

              <TouchableOpacity
                style={[
                  styles.colorSelect__dot,
                  purple,
                  this.state.color === purple.backgroundColor
                    ? styles.colorSelect__dotSelected
                    : {},
                ]}
                onPress={() => this.setState({ bgColor: purple.backgroundColor })}
              />

              <TouchableOpacity
                style={[
                  styles.colorSelect__dot,
                  pink,
                  this.state.color === pink.backgroundColor
                    ? styles.colorSelect__dotSelected
                    : {},
                ]}
                onPress={() => this.setState({ bgColor: pink.backgroundColor })}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.fauxButton}
            onPress={() =>
              this.props.navigation.navigate("Chat", {
                name: this.state.name || "no-name",
                bgColor: this.state.bgColor || bgColors.blue.backgroundColor,
              })
            }
          >
            <Text style={[styles.colorSelect__text, styles.fauxButton__text]}>
              Start Chatting
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  columnEvenlyCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 45,
    fontWeight: "600",
  },

  nameInput__container: {
    height: "44%",
    minHeight: 200,
    width: "88%",
  },

  nameInput__input: {
    height: 50,
    width: "88%",
    paddingLeft: 20,
    borderColor: "#fff",
    borderWidth: 1,
    color: "#fff",
    opacity: 50,
    fontSize: 16,
    fontWeight: "300",
  },

  colorSelect: {
    height: 75,
  },

  colorSelect__text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    opacity: 100,
  },

  colorSelect__dotsWrapper: {
    flexDirection: "row",
  },

  colorSelect__dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },

  colorSelect__dotSelected: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#5f5f5f",
  },

  fauxButton: {
    backgroundColor: "#757083",
    justifyContent: "center",
    width: "88%",
    padding: 16,
  },

  fauxButton__text: {
    color: "#fff",
    fontWeight: "600",
  },
});