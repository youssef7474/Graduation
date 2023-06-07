import { createSlice,createAsyncThunk,} from "@reduxjs/toolkit";
import {auth,db} from "../Firebase/FireBase"
import {createUserWithEmailAndPassword} from "firebase/auth";
import { collection, deleteDoc, doc, getDoc,  getDocs,          query,  serverTimestamp, setDoc, where  } from "firebase/firestore"; 
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 








export const AddUseracount = createAsyncThunk('users/AddUseracount', async (data, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,};
      await setDoc(doc(db, "users", user.uid), {
        email:data.email,
        name:data.username,
        phone:data.phoneNUmber,
        role:data.role,
        uId:user.uid,
        //age:data.age,
        createdAt:serverTimestamp(),
        image:data.img
      });
      await setDoc(doc(db, "roles", user.uid), {
      
        role:data.role,

      });
      return user;
    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });

  

 export const featchPatients = createAsyncThunk('users/featchPatients', async () => {
    try {

      const datatest=[];
      const querySnapshot = await getDocs(collection(db, "patients"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
 
      //datatest.push(doc.data())
      datatest.push(doc)
      });
      return(datatest)
    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });




  /*export const featchPatients = createAsyncThunk('users/featchPatients', async () => {
    try {
      let listdata=[];
       onSnapshot(collection(db, "patients"), (snapShot) => {
        snapShot.docs.forEach((doc)=>{
          listdata.push(doc)
        })
        console.log(listdata)
    });
    return(listdata)
    } catch (error) {
      
    }
  })*/

 /* export const featchPatients = createAsyncThunk('users/featchPatients', async () => {
    try {
      var listdata = [];
      const unsub = onSnapshot(
        collection(db, "patients"), 
        (snapShot) => {
          listdata=[];
          snapShot.docs.forEach((doc) => {
            listdata.push(doc)
          })
          //
        },
        (error) => {
          console.log("Error fetching patients: ", error);
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for initial data to be fetched
      return listdata;

    } catch (error) {
      console.error("Error fetching patients: ", error);
    }
  });*/











 export const patientdetails = createAsyncThunk('users/patientdetails', async (id, thunkAPI) => {
    try {
      const docRef = doc(db, "patients", id);
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


  /*export const patientdetails = createAsyncThunk('users/patientdetails', async (id, thunkAPI) => {
    try {
      const unsub = onSnapshot(doc(db, "patients", id), (doc) => {
       // console.log("Current data: ", doc.data());
       return(doc.data())
      });
     

        
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  })*/



  export const patientID = createAsyncThunk('users/patientID', async (id, thunkAPI) => {
    try {
      return id

        
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });


  export const Addpatient = createAsyncThunk('users/Addpatient', async (data, thunkAPI) => {
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,};

        await setDoc(doc(db, "patients", user.uid), {
          name: data.name,
          phone:data.phone,
          age:data.age,
          gender:data.gender,
          chestPainType:data.chestPainType,
          cholesterol:data.cholesterol,
          exerciseAngina:data.exerciseAngina,
          fastingBloodSugar:data.fastingBloodSugar,
          description:data.description,
          image:data.image,
          doctorId:data.doctorId,
          fastingBloodSugarML:data.fastingBloodSugarML,
          maxHeartRate:null,
          ecg:null,
          prediction:null,
          doctorName:data.NameDoctorName,
          email:data.email,
          atHome:false,
          labResults:null,
          labNote:null,
          createdAt:serverTimestamp(),
        });
        await setDoc(doc(db, "roles", user.uid), {
      
          role:"Patient",
  
        });
        return user;

  


    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });



  export const fetshdoctors = createAsyncThunk('users/fetshdoctors', async () => {
    try {

      const datatest=[];

      const doctorQuery = query(collection(db,"users"),where("role" ,"==","Doctor"))

      const doctorData=await getDocs(doctorQuery)

      doctorData.forEach((doc)=>{
          datatest.push(doc)
      })
      return(datatest)
    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });


  export const fetshNurses = createAsyncThunk('users/fetshNurses', async () => {
    try {

      const datatest=[];

      const doctorQuery = query(collection(db,"users"),where("role" ,"==","Nurse"))

      const doctorData=await getDocs(doctorQuery)

      doctorData.forEach((doc)=>{
          datatest.push(doc)
      })
      return(datatest)
    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });



  export const UserDetail = createAsyncThunk('users/UserDetail', async (id, thunkAPI) => {
    try {
      const docRef = doc(db, "users", id);
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



  export const DeleteNurse = createAsyncThunk('users/DeleteNurse', async (id, thunkAPI) => {
    try {

      await deleteDoc(doc(db, "users", id));

      await deleteDoc(doc(db, "roles", id));
      return id


    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

  export const DeletePatient = createAsyncThunk('users/DeletePatient', async (id, thunkAPI) => {
    try {

      await deleteDoc(doc(db, "patients", id));

      await deleteDoc(doc(db, "roles", id));
      return id

    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });

  export const DeleteDoctor = createAsyncThunk('users/DeleteDoctor', async (id, thunkAPI) => {
    try {

      await deleteDoc(doc(db, "users", id));
      await deleteDoc(doc(db, "roles", id));
      return id

    } catch (error) {
      console.log(error.message);
      throw error;
    }
  });




  export const DoctorPatients = createAsyncThunk('users/DoctorPatients', async(id, thunkAPI) => {
    try {

      const datatest=[];

      const doctorQuery = query(collection(db,"patients"),where("doctorId" ,"==",id))

      const doctorData=await getDocs(doctorQuery)

      doctorData.forEach((doc)=>{
          datatest.push(doc)
      })
      return(datatest)
    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });
  

  /*export const EditUser = createAsyncThunk('users/EditUser', async (data, thunkAPI) => {
    try {

      

      await setDoc(doc(db, "users", data.uId), {
        ...data,
        name: data.username,
        phone:data.phoneNUmber,
        role:data.role,
      });

    } catch (error) {
      console.log('catch');
      const errorMessage = error.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  });
  */



const initialState=
{
    records:[],
    loading:false,
    error:null,
    //patientRecord:[],
    doctorRecord:[],
    nurseRecord:[],
    detailspatient:null,
}

const UserSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers: builder =>{
        builder
        .addCase(AddUseracount.pending, state => {
          state.loading = true;
          state.error = null;
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(AddUseracount.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          console.log(action);
          console.log('fulfilled');
          toast.success("user added successfully")
        })
        .addCase(AddUseracount.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(featchPatients.pending, state => {
          state.loading = true;
          state.error = null;
          state.patientRecord=null
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(featchPatients.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.patientRecord= action.payload;
          console.log('fulfilled');
        })
        .addCase(featchPatients.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(patientdetails.pending, state => {
          state.loading = true;
          state.error = null;
          state.detailspatient=null
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(patientdetails.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.detailspatient=action.payload
          console.log('fulfilled');
        })
        .addCase(patientdetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(Addpatient.pending, state => {
          state.loading = true;
          state.error = null;
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(Addpatient.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          console.log('fulfilled');
          toast.success("user added successfully")
        })
        .addCase(Addpatient.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(fetshdoctors.pending, state => {
          state.loading = true;
          state.error = null;
          state.doctorRecord=null
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(fetshdoctors.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.doctorRecord=action.payload;
          console.log(state.doctorRecord)
          console.log('fulfilled');
        })
        .addCase(fetshdoctors.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(fetshNurses.pending, state => {
          state.loading = true;
          state.error = null;
          state.nurseRecord=null
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(fetshNurses.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.nurseRecord=action.payload;
          console.log('fulfilled');
        })
        .addCase(fetshNurses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(UserDetail.pending, state => {
          state.loading = true;
          state.error = null;
          state.UserDetails=null
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(UserDetail.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.UserDetails=action.payload
          console.log('fulfilled');
        })
        .addCase(UserDetail.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(DeleteNurse.pending, state => {
          state.loading = true;
          state.error = null;
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(DeleteNurse.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.nurseRecord=state.nurseRecord.filter((el)=>el.id!==action.payload)
          console.log(action.payload.id)
          console.log('fulfilled');
        })
        .addCase(DeleteNurse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(DeletePatient.pending, state => {
          state.loading = true;
          state.error = null;
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(DeletePatient.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.patientRecord=state.patientRecord.filter((el)=>el.id!==action.payload)
          console.log(action.payload.id)
          console.log('fulfilled');
        })
        .addCase(DeletePatient.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(DeleteDoctor.pending, state => {
          state.loading = true;
          state.error = null;
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(DeleteDoctor.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.doctorRecord=state.doctorRecord.filter((el)=>el.id!==action.payload)
          console.log(action.payload.id)
          console.log('fulfilled');
        })
        .addCase(DeleteDoctor.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(DoctorPatients.pending, state => {
          state.loading = true;
          state.error = null;
          state.patientRecord=null
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(DoctorPatients.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.patientRecord=action.payload;
          console.log('fulfilled');
        })
        .addCase(DoctorPatients.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        .addCase(patientID.pending, state => {
          state.loading = true;
          state.error = null;
          state.patientID=null
          console.log('pending');
        })
        .addCase(patientID.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.patientID=action.payload;
        })
        .addCase(patientID.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })
        
        
        /*
        .addCase(EditUser.pending, state => {
          state.loading = true;
          state.error = null;
          console.log('pending');
          toast.success("loading please wait...");
        })
        .addCase(EditUser.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          console.log('fulfilled');
          toast.success("user added successfully")
        })
        .addCase(EditUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('rejected');
          toast.error("error")
        })*/
    }

})
export default UserSlice.reducer;
