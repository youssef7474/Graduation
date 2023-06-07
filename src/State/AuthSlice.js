import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {auth} from "../Firebase/FireBase"
import {signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import {db} from "../Firebase/FireBase"

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';













/*export const Login = createAsyncThunk('Auth/Login', async (data, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        // add any other necessary user data here
      };
      return user;
    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });*/


  export const Login = createAsyncThunk('Auth/Login', async (data, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        // add any other necessary user data here
      };
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        if(docSnap.data().role!=="Admin")
        {
          toast.error("Admins only can login")
        }
        return(docSnap.data());
      }
      else {
          // docSnap.data() will be undefined in this case
          toast.error("Admins only can login")
      }
      //return (user.uid)
    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });




  export const RegisterUser = createAsyncThunk('Auth/RegisterUser', async (data, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        // add any other necessary user data here
      };
      console.log(user);
      return user;
    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });




  export const profileinfo = createAsyncThunk('Auth/profileinfo', async (userId, thunkAPI) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return(docSnap.data());
      }
      else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
      }

    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });








  export const Logout = createAsyncThunk('Auth/Logout', async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

const initialState = {
  isLoading: false,
  userId: null,
  userRole:null,
  error: null,
  islogedin:false,
  inforecord:[]
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Login.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.islogedin=false;
        state.userId=null
        state.userRole=null
        toast.success("loading please wait...");
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userId=action.payload.uId
        state.userRole=action.payload.role
        state.islogedin=true
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("error")
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.islogedin=false;
        state.userId=null
        state.userRole=null
      })
      .addCase(RegisterUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        console.log('pending');
        toast.success("loading please wait...");
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.islogedin=false
        console.log(action);
        console.log('fulfilled');
        console.log(state.islogedin)
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log('rejected');
        toast.error("error")
      })
      .addCase(profileinfo.pending, state => {
        state.isLoading = true;
        state.error = null;
        console.log('pending');
        
      })
      .addCase(profileinfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.inforecord=action.payload
      })
      .addCase(profileinfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log('rejected');
      })

      
  }
});
export default authSlice.reducer;