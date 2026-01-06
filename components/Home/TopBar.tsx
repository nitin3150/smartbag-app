import { View } from "react-native";
import Address from "./Address";
import CartIcon from "./CartIcon";
import NotificationIcon from "./NotificationsIcon";

export default function TopBar(){
    return(
        <View className="flex-row items-center pb-2">
            <Address/>
            <View className="flex-row items-center gap-4">
                <NotificationIcon/>
                <CartIcon/>
            </View>
        </View>
    );
}