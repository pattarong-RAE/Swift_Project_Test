
const config_data = {
    main : {
        header : {
            width_translate : 180
        }
    },
    listShape : [
        {shape : 'oval'     , direction : 'none'},
        {shape : 'square'   , direction : 'none'},
        {shape : 'trapezoid', direction : 'up'},
        {shape : 'trapezoid', direction : 'down'},
        {shape : 'parallelogram', direction : 'none'},
        {shape : 'circle'   , direction : 'none'},
    ],
    form : {
        title : ['Mr.','Mrs.','Ms.'],
        nationality : ['Thai','France','America'],
        citizenID : [
            { span : 3 ,maxLength : 1},
            { span : 3 ,maxLength : 4},
            { span : 3 ,maxLength : 5},
            { span : 3 ,maxLength : 2},
            { span : 3 ,maxLength : 1}
        ],
        gender : ['Male','Female','Unsex']
    },
    formDefault : {
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
        UserID : null,
    },
    // https://emojipedia.org/
    flagIcon : [
        {id : 'TH',emoji : "🇹🇭",number : '+66'},
        {id : 'US',emoji : "🇺🇸",number : '+1'},
        {id : 'FR',emoji : "🇫🇷",number : '+33'}
    ]
};

export default config_data;
