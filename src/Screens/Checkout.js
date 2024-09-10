import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CustomButton from '../common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const isFocused = useIsFocused();
  const [selectedAddress, setSelectedAddress] = useState(
    'Please Select Address',
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };
  useEffect(() => {
    getSelectedAddress();
  }, [isFocused]);
  const getSelectedAddress = async () => {
    setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'));
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/left-arrow.png')}
        title={'CheckOut'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Added Items</Text>
      <View>
        <FlatList
          data={cartItems}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.productItem}
                onPress={() => {
                  navigation.navigate('ProductDitails', {data: item});
                }}>
                <Image source={{uri: item.image}} style={styles.itemImage} />
                <View>
                  <Text style={styles.name}>
                    {item.title.length > 30
                      ? item.title.substring(0, 30) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.desc}>
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + '...'
                      : item.description}
                  </Text>
                  <View style={styles.qtyView}>
                    <Text style={styles.price}>{'$' + item.price}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        if (item.qty > 1) {
                          dispatch(reduceItemFromCart(item));
                        } else {
                          dispatch(removeItemFromCart(index));
                        }
                      }}>
                      <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        dispatch(addItemToCart(item));
                      }}>
                      <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.title}>Total</Text>
        <Text style={[styles.title, {marginRight: 20}]}>
          {'$' + getTotal()}
        </Text>
      </View>
      <Text style={styles.title}>Select Payment Mode</Text>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => {
          setSelectedMethod(0);
        }}>
        <Image
          source={
            selectedMethod == 0
              ? require('../images/radio.png')
              : require('../images/radio-button.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 0 ? 'orange' : 'black'},
          ]}
        />
        <Text style={styles.paymentMethodsTxt}>Credit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => {
          setSelectedMethod(1);
        }}>
        <Image
          source={
            selectedMethod == 1
              ? require('../images/radio.png')
              : require('../images/radio-button.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 1 ? 'orange' : 'black'},
          ]}
        />
        <Text style={styles.paymentMethodsTxt}>Debit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => {
          setSelectedMethod(2);
        }}>
        <Image
          source={
            selectedMethod == 2
              ? require('../images/radio.png')
              : require('../images/radio-button.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 2 ? 'orange' : 'black'},
          ]}
        />
        <Text style={styles.paymentMethodsTxt}>UPI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => {
          setSelectedMethod(3);
        }}>
        <Image
          source={
            selectedMethod == 3
              ? require('../images/radio.png')
              : require('../images/radio-button.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 3 ? 'orange' : 'black'},
          ]}
        />
        <Text style={styles.paymentMethodsTxt}>Cash on Delivery</Text>
      </TouchableOpacity>
      <View style={styles.addressView}>
        <Text style={styles.title}>Address</Text>
        <Text
          style={[
            styles.title,
            {textDecorationLine: 'underline', color: '#269A'},
          ]}
          onPress={() => {
            navigation.navigate('Addresses');
          }}>
          Edit Address
        </Text>
      </View>
      <Text
        style={[styles.title, {marginTop: 10, fontSize: 16, color: '#636363'}]}>
        {selectedAddress}
      </Text>
      <CustomButton bg={'green'} title={'Pay & Order'} color={'#fff'} />
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: '#000',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 0.4,
    borderBottomColor: '#B7B7B7',
  },
  paymentMethod: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingLeft: 20,
  },
  img: {
    width: 24,
    height: 24,
  },
  paymentMethodsTxt: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  addressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 20,
  },
});
