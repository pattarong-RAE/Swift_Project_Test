import { Row , Col, Form ,Input, Select, DatePicker, Radio, Button ,Table, Checkbox} from 'antd';
import React , { useRef } from 'react'
import config_data from '../../parameter';
import type { InputRef , PaginationProps ,TableColumnsType, TableProps} from 'antd'
import { mainModule } from '../../interface/moduleMain';
import { useSelector } from 'react-redux';
import { dbSelector, updateForm, updateFormCurrent ,deleteForm ,selectAll, deleteAllForm,setPage} from '../../store/slices/dbSlice';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../store/store';
import { useTranslation } from 'react-i18next';

const FormandTable = () => {
    const [form] = Form.useForm();
    const {t} = useTranslation();
    const dbReducer = useSelector(dbSelector);
    const dispatch = useAppDispatch();
    const inputRefs = useRef<(InputRef | null)[]>([]);
    const onChangeLength = (value: string,index : number,maxLen : number) => {
        const limitedValue = value.slice(0, maxLen); // Limit to n characters
        if (limitedValue.length === maxLen ) {
            if (inputRefs.current.length > index && inputRefs.current[index]) {
                inputRefs.current[index+1]?.focus();
            }
        }
        else if(limitedValue.length === 0 && index !== 0){
            if (inputRefs.current[index]) {
                inputRefs.current[index-1]?.focus();
            }
        }
    };
    const handleEdit = (id : string | null) => {
        let listData = dbReducer.list
        if ( listData.length > 0 && id) {
            let editForm : mainModule.User.Form[]  = listData.filter((obj : mainModule.User.Form) => obj.UserID === id);
            if (editForm.length === 1){
                let day = dayjs(editForm[0].Date);
                let newValue = {...editForm[0],Date : day};
                form.setFieldsValue(newValue);
                dispatch(updateForm(editForm[0]));
            }
        }
    }
    const handleDelete = (id : string | null) => {
        dispatch(deleteForm({id}))
    }
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
          return <div>{t("table.button.PREV")}</div>;
        }
        if (type === 'next') {
          return <div>{t("table.button.NEXT")}</div>;
        }
        return originalElement;
      };
    const columns: TableColumnsType<mainModule.User.Form> = [
        {
            title: t('table.title.name'),
            dataIndex: 'Firstname',
            defaultSortOrder: 'descend',
            render : ( _ , { Firstname , Lastname}) => <>{Firstname} {Lastname}</>
         },
         {
            title: t('table.title.gender'),
            dataIndex: 'Gender',
            defaultSortOrder: 'descend',
            render: (_, { Gender }) => (
                <>{t(`table.title.${Gender}`)}</>
            )
         },
         {
            title: t('table.title.mobile_phone'),
            dataIndex: 'PhoneNumber',
            defaultSortOrder: 'descend',
            render : ( _ , { PhoneCountry , PhoneNumber}) => <>{PhoneCountry}{PhoneNumber}</>
         },
         {
            title: t('table.title.nationality'),
            dataIndex: 'Nationality',
            defaultSortOrder: 'descend',
            render: (_, { Nationality }) => (
                <>{t(`table.title.${Nationality}`)}</>
            )
            
         },
         {
            title: t('table.title.manage'),
            dataIndex: 'Manage',
            defaultSortOrder: 'descend',
            render: (_, { UserID }) => (
                <Row style={{width : '100%',height : '100%'}}>
                    <Col span={6} style={{display : 'flex'}} onClick={() => handleEdit(UserID)}>{t("table.button.EDIT")}</Col>
                    <Col span={6} style={{display : 'flex'}} onClick={() => handleDelete(UserID)}>{t("table.button.DELETE")}</Col>
                </Row>
              ),
         },
      ];
      
    const onChangeTable: TableProps<mainModule.User.Form>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
    const LayoutForm = () => {
        const onFinish = (values : any) => {
            let date = values.Date;
            let newDate : string = `${date.$y}-${date.$M}-${date.$D}`;
            let userID_previous : string | null = dbReducer.form.UserID;
           
            
            let userID : string = userID_previous ? userID_previous : `${values.Firstname[0]}${values.Lastname[0]}-${values.PhoneNumber}`;
            const successForm : mainModule.User.Form = values.UserID ? {...values,Date : newDate} : {...values,Date : newDate,UserID : userID};
            dispatch(updateFormCurrent(successForm));
            form.resetFields();
            // dispatch(updateForm(successForm));
            // console.log('End save data to Local storage :', successForm);
            
          };
          
        return(
            <div style={{width : '60%',height : '100%',borderRadius  : '1vmin',border : 'solid 1px black'}}>
                <Form style={{width : '100%',height : '100%'}} onFinish={onFinish} form={form}>
                    <Row style={{width : '100%',height : '100%'}}>
                        {/* (b) is Button */}
                        {/* Title / Firstname / Lastname */}
                        <Col span={24}>
                            <Row style={{width : '100%',height : '100%'}}>
                                <Col span={4} className='f-center' >
                                    <Form.Item label={t('form.Title')} name="Title" rules={[{ required: true, message: 'Please input!' }]} style={{width : '90%'}}>
                                        <Select options={config_data.form.title.map((item) => ({
                                            value: item,
                                            label: item,
                                        }))} 
                                        style={{ width: '100%',textAlign : 'left' }}
                                        placeholder={t('form.Title')}/>

                                    </Form.Item>
                                </Col>
                                <Col span={10} className='f-center'>
                                    <Form.Item label={t('form.Firstname')} name="Firstname" rules={[{ required: true, message: 'Please input Firstname!' }]} style={{width : '90%'}}>
                                        <Input  
                                        style={{ width: '100%',textAlign : 'left' }}
                                        placeholder={t('form.Firstname')}/>
                                    </Form.Item>
                                </Col>
                                <Col span={10} className='f-center'>
                                    <Form.Item label={t('form.Lastname')} name="Lastname" rules={[{ required: true, message: 'Please input Lastname!' }]} style={{width : '90%'}}>
                                        <Input  
                                        style={{ width: '100%',textAlign : 'left' }}
                                        placeholder={t('form.Lastname')}/>
                                    </Form.Item>
                                </Col>    
                            </Row>  
                        </Col>
                        {/* Birthday / Nationality  */}
                        <Col span={24}>
                            <Row style={{width : '100%',height : '100%'}}>
                                <Col span={6} className='f-center' >
                                    <Form.Item label={t('form.Date')} name="Date" rules={[{ required: true, message: 'Please input Date!' }]} style={{width : '90%'}}>
                                        <DatePicker
                                            style={{ width: '100%',textAlign : 'left' }}
                                            placeholder={t('form.SelectDate')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={10} className='f-center' >
                                    <Form.Item label={t('form.Nationality')} name="Nationality" rules={[{ required: true, message: 'Please input Nationality!' }]} style={{width : '90%'}}>
                                        <Select options={config_data.form.nationality.map((item) => ({
                                            value: item,
                                            label: t(`table.title.${item}`),
                                        }))} 
                                        style={{ width: '100%',textAlign : 'left' }}
                                        placeholder={t('form.Nationality')}/>
                                    </Form.Item>
                                </Col>
                            </Row>  
                        </Col>
                        {/* CitizenID */}
                        <Col span={24} >
                            <Row style={{width : '100%',height : '100%'}}>
                                    <Col span={4} className='f-center' >
                                        <Form.Item label={t('form.Citizen')} name="CitizenID0"  style={{width : '90%'}}>
                                            <Input
                                            style={{ width: '100%',textAlign : 'center' }}
                                            maxLength={1}
                                            ref={(el) => inputRefs.current[0] = el}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                onChangeLength(event.target.value,0,1)
                                            }
                                            />
                                        </Form.Item>
                                    </Col>
                                {config_data.form.citizenID.slice(1,config_data.form.citizenID.length).map((item : mainModule.User.citizenID,index : number) => (
                                    <>
                                        <Col key={`CitizenID(-)${index}`} span={1} style={{marginTop : '1.2%',fontSize : 'large'}}>-</Col>
                                        <Col key={`CitizenID${index}`} span={item.span} className='f-center' >
                                            <Form.Item  name={`CitizenID${index+1}`}  style={{width : '90%'}}>
                                                <Input
                                                    style={{ width: '100%',textAlign : 'center' }}
                                                    maxLength={item.maxLength}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                        onChangeLength(event.target.value,index+1,item.maxLength)
                                                    }
                                                    ref={(el) => inputRefs.current[index+1] = el}
                                                    defaultValue={''}
                                                    
                                                />
                                            </Form.Item>
                                        </Col>
                                    </>               
                                ))}
                            </Row>  
                        </Col>
                        {/* Gender => Male ,Female, Unsex*/}
                        <Col span={24}>
                            <Row style={{width : '100%',height : '100%'}}>
                                <Col span={8} className='f-center'>
                                    <Form.Item label={t('form.Gender')}  name='Gender'  style={{width : '95%',display : 'flex'}} rules={[{ required: true, message: 'Please input Gender!' }]}>
                                        <Radio.Group name="GenderRadio" defaultValue={null}>
                                        {config_data.form.gender.map((item) => {
                                            return(<Radio key={`Gender-${item}`} value={item}>{t(`table.title.${item}`)}</Radio>);
                                        })   }  
                                        </Radio.Group>
                                    </Form.Item>    
                                </Col>
                            </Row>
                        </Col>
                        {/*+66  Mobile phone */}
                        <Col span={24}>
                            <Row style={{width : '100%',height : '100%'}}>
                                <Col span={6} className='f-center' >
                                    <Form.Item label={t('form.MobilePhone')} name="PhoneCountry" rules={[{ required: true, message: 'Please input Phone!' }]} style={{width : '95%'}}>
                                        <Select defaultValue={null} style={{width : '100%',display : 'flex',textAlign : 'left'}} >
                                            {config_data.flagIcon.map((item) => {
                                                return(<Select.Option key={`PhoneCountry-${item.id}`} value={item.number}>{item.emoji}{item.number}</Select.Option>);
                                            })}  
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={1} style={{marginTop : '1.2%',fontSize : 'lapreviousListrge'}}>-</Col>
                                <Col span={10} className='f-center' >
                                    <Form.Item name="PhoneNumber" rules={[{ required: true, message: 'Please input Number!' }]} style={{width : '100%'}}>
                                        <Input  
                                        style={{ width: '100%',textAlign : 'left' }}
                                        maxLength={10}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        {/* Passport No */}
                        <Col span={24}>
                            <Row style={{width : '100%',height : '100%'}}>
                                <Col span={10} className='f-center' >
                                    <Form.Item label={t('form.PassportNo')} name="PassportNo" style={{width : '95%'}}>
                                        <Input  
                                        style={{ width: '100%',textAlign : 'left' }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        {/* Expected Salary / (b)Rest /(b)Summit */}
                        <Col span={24}>
                            <Row style={{width : '100%',height : '100%'}}>
                                <Col span={12} className='f-center' >
                                    <Form.Item label={t('form.ExpectedSalary')} name="ExpectedSalary" rules={[{ required: true, message: 'Please input Number!' }]} style={{width : '95%'}}>
                                        <Input  
                                        style={{ width: '80%',textAlign : 'left' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}  >
                                    <Button onClick={() => form.resetFields()}>
                                        {t('form.button.RESET')}
                                    </Button>
                                </Col>
                                <Col span={6}  >
                                    <Button type="primary" htmlType="submit" style={{backgroundColor : 'white',color : 'black'}}>
                                        {t('form.button.SUMMIT')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>    
                </Form>
            </div>
        );
    }
  return (
    <div style={{width : '100%',height : 'auto'}}>
        <Row style={{width : '100%',height : '50vh'}}>
            <Row className='f-center' style={{width : '100%',height : '90%'}}>
                <LayoutForm/>
            </Row>
            <Row className='f-center' style={{width : '100%',height : '10%'}}>
                <Row style={{width : '90%',height : '100%'}}>
                    <Col span={5} style={{display : 'flex',alignItems : 'center'}}>
                        <>
                            <Checkbox
                            onChange={(e) => dispatch(selectAll(e.target.checked))}
                            style={{display : 'flex',alignItems : 'center'}}
                            >
                                {t("table.button.SALL")}
                            </Checkbox>
                            <Button onClick={() => dispatch(deleteAllForm())}
                            style={{display : 'flex',alignItems : 'center'}}>{t("table.button.DELETE")}</Button>
                        </>
                        
                    </Col>
                </Row>  
            </Row>
        </Row>
        <Row style={{width : '100%',height : '40vmin',display : 'flex'}}>
            <Col  span={24} style={{width : '100%',height : 'min(40vh)',display : 'flex',justifyContent : 'center'}}>
                <div style={{width : '90%',display : 'flex',flexDirection: 'row-reverse'}}>
                    <Table
                        columns={columns}
                        dataSource={dbReducer.list}
                        onChange={onChangeTable}
                        showSorterTooltip={{ target: 'sorter-icon' }}
                        style={{width : '100%'}}
                        pagination={
                            {
                                current : dbReducer.currentPage,
                                pageSize : 5,
                                showSizeChanger : false,
                                position : ["topRight","none"],
                                itemRender: itemRender,
                                onChange : (page) => dispatch(setPage(page))
                            }
                        }
                        rowSelection={{onChange : (props) => console.log(props)}}
                        
                    />
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default FormandTable;