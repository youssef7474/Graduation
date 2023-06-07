import { configureStore } from "@reduxjs/toolkit";
import Auth from "./AuthSlice"
import Users from "./UserSlice"

const store=configureStore(
    {
        reducer:{Auth,Users},
    }
)

export default store;