import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const AskForLoginModel = ({
  modelVisible,
  onClickLogin,
  onClickSignup,
  onClose,
}) => {
  return (
    <Modal visible={modelVisible} transparent>
      <View style={styles.modelView}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 70}]}
            onPress={() => {
              onClickLogin();
            }}>
            <Text style={styles.btnText}>{'LogIn'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {marginBottom: 20, marginTop: 20}]}
            onPress={() => {
              onClickSignup();
            }}>
            <Text style={styles.btnText}>{'Creat account'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              onClose();
            }}>
            <Image
              source={require('../images/close.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AskForLoginModel;
const styles = StyleSheet.create({
  modelView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
  },
  btn: {
    width: '86%',
    height: 50,
    backgroundColor: '#FD9102',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
