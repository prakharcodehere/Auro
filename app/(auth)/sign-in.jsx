import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../../constants"
import FormField from '../../components/FormField';
import CustomButton from "../../components/CustomButton"
import { Link, router } from 'expo-router';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {

const [form, setForm] = useState({
  email:"",
  password:"",
})

const [isSubmitting, setIsSubmitting] = useState(false)


const submit = async () => {

  if( !form.email || !form.password){
    Alert.alert("Error", 'please fill in all the fields')
  }
  setIsSubmitting(true)
  try {
    
const result = await signIn(form.email, form.password)



router.replace('/home')

  } catch (error) {
    Alert.alert("Error check", error.message)
    
  }finally{
    setIsSubmitting(false)
  }

}

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>



      <View className="w-full min-h-full-[85vh] px-4 my-6 justify-center">
      <Image source={images.logo} resizeMode='contain' className="w-[115px] h=[35px]"/>
      <Text className="semibold mt-10 font-psemibold text-white text-2xl">Log in to Vidiq</Text>
      <FormField 
      title="Email"
      value={form.email}
      handleChangeText={(e) => setForm({...form, email: e})}
      otherStyles="mt-7"
      keyboardType="email-address"
      />
      <FormField 
      title="Password"
      value={form.password}
      handleChangeText={(e) => setForm({...form, password: e})}
      otherStyles="mt-7"
   
      />
      <CustomButton title="Sign In"  handlePress={submit} containerStyles="mt-7 "
       isLoading={isSubmitting}
       />
       <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-gray-100 font-pregular"> Don't have an account?</Text>
        <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
       </View>
      </View>
      </ScrollView>
      
 
    </SafeAreaView>
  )
}

export default SignIn