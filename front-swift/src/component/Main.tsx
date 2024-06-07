import React, { useState } from 'react';

import { Flex  ,Layout ,Select ,Row ,Col} from 'antd';
import '../scss/main.scss';
import { mainModule } from '../interface/moduleMain';
import config_data from '../parameter';

import { useTranslation } from "react-i18next";
import Menu from './MenuAssign';
import LayoutandStyle from './assign/LayoutandStyle';
import FormandTable from './assign/FormandTable';


const { Header, Content } = Layout;
const typeTranslate : mainModule.User.typeTranslate[] = [
  { value : 'en' , label : 'Eng'},
  { value : 'th' , label : 'ไทย'}
]

const config_header = config_data.main.header;

function Main() {
  const [caseSelect,setcaseSelect] = useState<number | null >(null);
  const handleSelectCase = (value: number) => {
    setcaseSelect(value);
  };
  const Assign = () => {
    switch(caseSelect) {
      case 0 :
        return <LayoutandStyle/>
      case 1 :
        return <h1>Test 2</h1>
      case 2 :
        return <FormandTable/>
      default :
        return < Menu handleSelectCase={handleSelectCase}/>
    }
  }
  
  const { t, i18n } = useTranslation();
  const handleTranslation = (value: string) => {
    i18n.changeLanguage(value);
  };
  return (
    <div className='bg-main'>
      <Flex className='bg-remove' style={{height : 'auto'}}>
        <Layout  className='bg-remove' style={{height : 'auto'}}>
          <Header   className='bg-remove' style={{height : '10vh'}}>
            <Row>
              <Col span={12} style={{display : 'flex',flexDirection : 'row',paddingLeft : '10px',fontSize : '3rem'}}        >{typeof caseSelect === 'number' ? t(`card-select.description.${caseSelect}`) : ""}</Col>
              <Col span={12} style={{display : 'flex',flexDirection : 'row-reverse'}}>
                <Select
                  defaultValue={typeTranslate[0].value}
                  style={{ width: config_header.width_translate }}
                  onChange={handleTranslation}
                  options={typeTranslate}
                />
              </Col>
            </Row>
          </Header>
          <Content  className='bg-remove f-center' style={{height : '90vh'}}>{Assign()}</Content>
          
        </Layout>
      </Flex>
    </div>
    
  )
}

export default Main