import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signIn, getCurrentUser } from '../../lib/appwrite';

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields.')
    }

    setIsSubmitting(true);
    
    try {
      await signIn(form.email, form.password)
      const result = await getCurrentUser();
      setUser(result);  // Save user data
      setIsLoggedIn(true);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-[90%] justify-center min-h-[95vh] px-4 my-6 self-center'>
          <Image 
            source={images.logoSmall}
            resizeMode='contain'
            className='w-[180px] h-[180px] self-center'
          />
          
          <Text className='text-2xl text-white mt-[55px] font-psemibold'>
            Sign in to <Text className='text-secondary'>C</Text>adence
          </Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles={'mt-7'}
            keyboardType="email-address"
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles={'mt-7'}
          />

          <CustomButton
            title='Sign in'
            handlePress={submit}
            containerStyles={'mt-7'}
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-2 flex-row gap-2'>
            <Text className='text-m text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-m text-secondary font-psemibold'>
              Sign Up
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn