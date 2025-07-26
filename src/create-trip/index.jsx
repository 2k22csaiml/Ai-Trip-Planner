import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDAys > 5 && (!formData?.location || !formData?.budget || !formData.traveler)) {
      toast('Please fill all the details');
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
      <h2 className='font-bold text-4xl text-primary mb-2'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='text-gray-600 text-lg mb-16'>We'll generate a custom itinerary just for you!</p>

      <div className='flex flex-col gap-10'>
        <div>
          <h3 className='text-lg font-medium mb-2'>What's your destination?</h3>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); }
            }}
          />
        </div>

        <div>
          <h3 className='text-lg font-medium mb-2'>How many days?</h3>
          <Input type='number' placeholder='Ex. 4' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>

        <div>
          <h3 className='text-lg font-medium mb-2'>Choose your budget</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${formData?.budget === item.title ? 'border-primary shadow-md bg-muted' : ''}`}>
                <div className='text-3xl'>{item.icon}</div>
                <div className='font-semibold mt-2'>{item.title}</div>
                <div className='text-sm text-gray-500'>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className='text-lg font-medium mb-2'>Who are you traveling with?</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${formData?.traveler === item.people ? 'border-primary shadow-md bg-muted' : ''}`}>
                <div className='text-3xl'>{item.icon}</div>
                <div className='font-semibold mt-2'>{item.title}</div>
                <div className='text-sm text-gray-500'>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex justify-end mt-10'>
        <Button disabled={loading} onClick={onGenerateTrip} className='px-6 py-2 text-base'>
          {loading ? <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' /> : 'Generate Trip'}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className='flex flex-col items-center gap-4'>
              <img src='/logo.svg' alt='logo' className='w-24' />
              <h2 className='font-semibold text-lg'>Sign In to Continue</h2>
              <p className='text-sm text-gray-500 text-center'>Sign in securely with Google to generate your itinerary</p>
              <Button onClick={login} className='w-full mt-4 flex items-center justify-center gap-2'>
                <FcGoogle className='h-5 w-5' /> Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
