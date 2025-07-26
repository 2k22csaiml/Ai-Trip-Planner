import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([])

    useEffect(() => {
        GetUserTrips();
    }, [])

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([])
        querySnapshot.forEach((doc) => {
            setUserTrips(prevVal => [...prevVal, doc.data()])
        });
    }

    return (
        <div className='sm:px-10 md:px-20 lg:px-40 px-4 py-6 mt-6'>
            <h2 className='font-extrabold text-4xl text-primary mb-6'>My Trips</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} key={index} />
                )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className='h-[220px] w-full bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse rounded-xl shadow-md'>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyTrips
