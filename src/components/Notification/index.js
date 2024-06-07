import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import Style from "./style";
import { usePushNotifications } from "./../usePushNotifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ModalNotification = ({
  modalVisible,
  setModalVisible,
  date,
  setDate,
  note,
  setNote,
}) => {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const { expoPushToken: pushToken } = usePushNotifications();

  useEffect(() => {
    setExpoPushToken(pushToken);
  }, [pushToken]);

  const [showPicker, setShowPicker] = useState({
    showDate: false,
    showHours: false,
  });

  async function schedulePushNotification() {
    if (!expoPushToken) {
      console.log("No push token available.");
      return;
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Notification: ${note.title.substr(0, 40)}`,
        body: note.note.substr(0, 50),
      },
      trigger: {
        date: date,
      },
      channelId: "default",
    });
    setNote({ ...note, notificationId: id });
  }

  const onChange = (event, selectedDate) => {
    setShowPicker({ showDate: false, showHours: false });
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const currentFormattedData = (type) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const min = date.getMinutes();
    if (type === "date") {
      return day + "/" + month + "/" + year;
    } else {
      return hours + ":" + min;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={Style.centeredView}>
        <View
          style={[
            Style.modalView,
            { marginTop: Platform.OS === "ios" ? "85%" : "71%" },
          ]}
        >
          <Text style={Style.modalText}>
            SELECT A TIME TO GET NOTIFIED FOR THE TASK!
          </Text>
          <View>
            <Text style={{ textAlign: "center" }}>DATE</Text>
            <TouchableOpacity
              style={Style.buttonHours}
              onPress={() => setShowPicker({ ...showPicker, showDate: true })}
            >
              <Text style={Style.txtHours}>{currentFormattedData("date")}</Text>
            </TouchableOpacity>
            {showPicker.showDate && (
              <DateTimePicker mode="date" value={date} onChange={onChange} />
            )}
            <Text style={{ textAlign: "center" }}>TIME</Text>
            <TouchableOpacity
              style={Style.buttonHours}
              onPress={() => setShowPicker({ ...showPicker, showHours: true })}
            >
              <Text style={Style.txtHours}>
                {currentFormattedData("hours")}
              </Text>
            </TouchableOpacity>
            {showPicker.showHours && (
              <DateTimePicker mode="time" value={date} onChange={onChange} />
            )}
          </View>
          <View style={Style.modalButtons}>
            <TouchableOpacity
              style={[Style.button, Style.buttonSave]}
              onPress={async () => {
                await schedulePushNotification();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={Style.txtStyle}>SET</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Style.button, Style.buttonCancel]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={Style.txtStyle}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNotification;
