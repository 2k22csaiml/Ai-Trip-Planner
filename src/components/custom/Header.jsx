import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []); // Only on component mount

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => {
      console.error(error);
      setErrorMsg("Failed to sign in. Please try again.");
      setLoading(false);
    },
  });

  const GetUserProfile = (tokenInfo) => {
    setLoading(true);
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setUser(resp.data);
      setOpenDialog(false);
      setLoading(false);
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
      setErrorMsg("Something went wrong while fetching user data.");
      setLoading(false);
    });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <div className='shadow-md bg-white flex justify-between items-center px-6 py-4 sticky top-0 z-50'>
      <div className='flex items-center gap-3'>
        <img src="/logo.svg" alt="App Logo" className='h-10' />
        <h1 className='text-xl font-semibold text-gray-700'>AI Trip Planner</h1>
      </div>

      <div>
        {user ? (
          <div className='flex items-center gap-4'>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full hover:bg-blue-100 transition">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full hover:bg-blue-100 transition">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger aria-label="User menu">
                <img
                  src={user?.picture || "/default-avatar.png"}
                  alt="User"
                  className='h-10 w-10 rounded-full border border-gray-300 hover:scale-105 transition'
                />
              </PopoverTrigger>
              <PopoverContent className="w-40 text-center">
                <h2
                  className='cursor-pointer font-medium text-red-500 hover:underline transition'
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2 transition'
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="p-6 rounded-xl shadow-xl">
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center text-center space-y-4">
              <img src="/logo.svg" alt="logo" width="100px" />
              <h2 className='font-bold text-xl text-gray-800'>
                Sign In to check out your travel plan
              </h2>
              <p className='text-gray-500'>
                Sign in to the App with Google authentication securely
              </p>

              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <Button
                onClick={login}
                disabled={loading}
                className="w-full mt-4 flex gap-3 items-center justify-center bg-gray-100 hover:bg-gray-200 text-black shadow-sm"
              >
                <FcGoogle className="h-6 w-6" />
                {loading ? "Signing In..." : "Sign in With Google"}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
