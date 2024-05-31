import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice"

const appStore=configureStore(
    {
        reducer:{
            config:configReducer
        }
    }
)

export default appStore