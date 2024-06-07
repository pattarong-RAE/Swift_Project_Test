import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { mainModule } from "../../interface/moduleMain";
import config_data from "../../parameter";


interface deleteFormProps {
    id : string | null;
}

const initialDefault : mainModule.User.globalState = {
    form : {
        CitizenID0 : null,
        CitizenID1 : null,
        CitizenID2 : null,
        CitizenID3 : null,
        CitizenID4 : null,
        Date : "",
        ExpectedSalary : "",
        Firstname : "",
        Gender  : "",
        Lastname : "",
        Nationality : "",
        PassportNo :  null,
        PhoneCountry : "",
        PhoneNumber : "",
        Title : "",
        UserID : null
    },
    selectAllDel : false,
    list : JSON.parse(String(localStorage.getItem('store'))).data,
    currentPage : 1
};

const dbSlice = createSlice({
    name : 'db',
    initialState : initialDefault,
    reducers: {
        updateForm : (state : mainModule.User.globalState,actions : PayloadAction<mainModule.User.Form>) => {
            state.form = actions.payload;
        },
        updateFormCurrent : (state : mainModule.User.globalState,actions : PayloadAction<mainModule.User.Form>) => {
            state.form = actions.payload;
            let currentList : any  =  JSON.parse(String(localStorage.getItem('store')));
            let previousList : mainModule.User.Form[] | []= [];
            if (currentList.data.length > 0){
                previousList  = currentList.data.filter((obj : mainModule.User.Form ) => obj.UserID !== state.form.UserID );
                localStorage.setItem('store',JSON.stringify({ data : [...previousList,state.form]})); 
            }
            else {
                localStorage.setItem('store',JSON.stringify({ data : [state.form]})); 
            }
            state.form = config_data.formDefault;
            state.list = JSON.parse(String(localStorage.getItem('store'))).data;
        },
        deleteForm : (state : mainModule.User.globalState,actions : PayloadAction<deleteFormProps>) => {
            let currentList : any  =  JSON.parse(String(localStorage.getItem('store')));
            let previousList : mainModule.User.Form[] | []= [];
            previousList  = currentList.data.filter((obj : mainModule.User.Form ) => obj.UserID !== actions.payload.id );
            localStorage.setItem('store',JSON.stringify({ data : previousList}));
            state.list = JSON.parse(String(localStorage.getItem('store'))).data;
        },
        deleteAllForm : (state : mainModule.User.globalState,actions : PayloadAction<void>) => {
            if (state.selectAllDel) {
                localStorage.setItem('store',JSON.stringify({ data : []}));
                state.list = [];
                state.form = config_data.formDefault;
            }
        },
        selectAll : (state : mainModule.User.globalState,actions : PayloadAction<boolean>) => {
            state.selectAllDel = actions.payload;
        },
        setPage : (state : mainModule.User.globalState,actions : PayloadAction<number>) => {
            state.currentPage = actions.payload;
        }


    },
    extraReducers: (builder) => {

    }
})

export const {updateForm ,updateFormCurrent, deleteForm, selectAll, deleteAllForm,setPage} = dbSlice.actions;
export const dbSelector = (store: RootState) => store.dbReducer;
export default dbSlice.reducer;