import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch} from 'react-redux';
import {addItemToWishlist} from '../redux/slices/WishistSlice';
import {addItemToCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModel from '../common/AskForLoginModel';

const ProductDitails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [modalVisible, setModelVisible] = useState(false);
  const checkUserStatus = async () => {
    let IsUserLoggedIn = false;
    const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    console.log(status);
    if (status == null) {
      IsUserLoggedIn = false;
    } else {
      IsUserLoggedIn = true;
    }
    return IsUserLoggedIn;
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/left-arrow.png')}
        rightIcon={require('../images/shopping-bag.png')}
        title={'Product Ditails'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <ScrollView>
        <Image source={{uri: route.params.data.image}} style={styles.banner} />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[styles.price, {color: '#000'}]}>{'Price:'}</Text>
          <Text style={styles.price}>{'$' + route.params.data.price}</Text>
          <View style={styles.qtyView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setQty(qty + 1);
              }}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.wishListButton}
          onPress={() => {
            console.log(checkUserStatus());
            console.log(route.params.data);
            if (checkUserStatus() === true) {
              dispatch(addItemToWishlist(route.params.data));
            } else {
              setModelVisible(true);
            }
          }}>
          <Image source={require('../images/heart.png')} style={styles.icon} />
        </TouchableOpacity>

        <CustomButton
          bg={'#FF9A0C'}
          title={'Add To Cart'}
          color={'#fff'}
          onClick={() => {
            console.log(route.params.data);
            dispatch(
              addItemToCart({
                category: route.params.data.category,
                description: route.params.data.description,
                id: route.params.data.id,
                image: route.params.data.image,
                price: route.params.data.price,
                qty: qty,
                rating: route.params.data.rating,
                title: route.params.data.title,
              }),
            );
            // if (checkUserStatus() === true) {
            //   dispatch(
            //     addItemToCart({
            //       category: route.params.data.category,
            //       description: route.params.data.description,
            //       id: route.params.data.id,
            //       image: route.params.data.image,
            //       price: route.params.data.price,
            //       qty: qty,
            //       rating: route.params.data.rating,
            //       title: route.params.data.title,
            //     }),
            //   );
            // } else {
            //   setModelVisible(true);
            // }
          }}
        />
      </ScrollView>
      <AskForLoginModel
        modelVisible={modalVisible}
        onClickLogin={() => {
          setModelVisible(false);
          navigation.navigate('Login');
        }}
        onClickSignup={() => {
          setModelVisible(false);
          navigation.navigate('Signup');
        }}
        onClose={() => {
          setModelVisible(false);
        }}
      />
    </View>
  );
};

export default ProductDitails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 23,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  desc: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  price: {
    fontSize: 20,
    color: 'green',
    fontWeight: '800',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  wishListButton: {
    position: 'absolute',
    right: 20,
    top: 100,
    backgroundColor: '#E2DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 20,
  },
  btn: {
    padding: 5,
    borderWidth: 0.5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
});
