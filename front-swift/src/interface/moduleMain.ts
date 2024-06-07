import React from 'react';
export module mainModule {
    export namespace User {
        export interface typeTranslate {
            value : string;
            label: string;
        }
        export interface menuSelect {
            title : string;
            description : string;
            id : number;
        }
        export interface buttonShape {
            shape : string;
            direction : string;
        }
        export interface citizenID {
            span : number;
            maxLength : number;
        }
        export interface Form{
            CitizenID0 : string | null;
            CitizenID1 : string | null;
            CitizenID2 : string | null;
            CitizenID3 : string | null;
            CitizenID4 : string | null;
            Date : string;
            ExpectedSalary : string;
            Firstname : string;
            Gender  : string;
            Lastname : string;
            Nationality : string;
            PassportNo : string | null;
            PhoneCountry : string;
            PhoneNumber : string;
            Title : string;
            UserID : string | null;
        }
        export interface FormSelect{
            CitizenID0 : string | null;
            CitizenID1 : string | null;
            CitizenID2 : string | null;
            CitizenID3 : string | null;
            CitizenID4 : string | null;
            Date : string;
            ExpectedSalary : string;
            Firstname : string;
            Gender  : string;
            Lastname : string;
            Nationality : string;
            PassportNo : string | null;
            PhoneCountry : string;
            PhoneNumber : string;
            Title : string;
            UserID : React.Key;
        }
        export interface globalState {
            form : Form;
            selectAllDel : boolean;
            list : Form[] | [];
            currentPage : number;
        }
        export interface DataTableType {
            key: React.Key;
            name: string;
            age: number;
            address: string;
          }
    }
}