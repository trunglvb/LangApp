import { StyleSheet } from "react-native";
import { unit12, unit4, unit80 } from "../../utils/appUnit";


const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: "white",
        borderTopWidth: 0, // remove top border
        height: unit80,
    },
    tabBarLabelStyle: {
        fontSize: unit12,
        marginBottom: unit4,
    },
});

export default styles;
