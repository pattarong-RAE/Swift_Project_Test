import React from 'react'
import { mainModule } from '../interface/moduleMain';
import { Space,Card } from 'antd';
import { useTranslation } from 'react-i18next';



interface CardProps {
  data: mainModule.User.menuSelect;
  index : number;
}

const MenuAssign = (props : {handleSelectCase: (value: number) => void }) => {
  const {t} = useTranslation();
  const cardData : mainModule.User.menuSelect[] = [
    { title : 'Test 1' , description : 'Layout & Style' ,id : 0},
    { title : 'Test 2' , description : 'Connect API'    ,id : 1},
    { title : 'Test 3' , description : 'Form & Table'   ,id : 2}
  ];
  
  const CardAssign: React.FC<CardProps> = ({ data , index }) => (
    <Card
      bordered={false}
      size="small" 
      style={{borderRadius : 0,width : '15vw',height : '15vh',textAlign : 'left'}}
      onClick={() => props.handleSelectCase(index)}
    >
      <p style={{borderBottom : '1px solid rgb(0,0,0,0.1)'}}>{t("card-select.test")} {index+1}</p>
      <p>{t(`card-select.description.${index}`)}</p>
    </Card>
  );
  return (
    <Space direction="horizontal" size="middle" style={{ display: 'flex'}}>
      {cardData.map((cardItem: mainModule.User.menuSelect , index : number) => (
        <CardAssign key={cardItem.title} data={cardItem} index={index} />
      ))}
    </Space>
  )
}

export default MenuAssign;