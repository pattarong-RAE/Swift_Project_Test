import React , { useState }from 'react'
import { Row , Col } from 'antd'
import { mainModule } from '../../interface/moduleMain'
import {shuffleArray , rotateArrayLeft ,rotateArrayRight} from './shuffleArray'

import '../../scss/assign.scss'
import '../../scss/main.scss'

import config_data from '../../parameter'
function LayoutandStyle() {

    const [holderCard,setholderCard]    = useState<number>(0);
    const [listShape,setlistShape]      = useState<mainModule.User.buttonShape[]>(config_data.listShape);
    const [movePosition,setmovePosition]= useState<boolean>(true);
    const handleShuffleClick = () => {
        setlistShape(shuffleArray(listShape));
      };
    const handleRotateLeftClick = () => {
        setlistShape(rotateArrayLeft(listShape, 1));
      };
    
    const handleRotateRightClick = () => {
        setlistShape(rotateArrayRight(listShape, 1));
      };

    
    const buttonLayout = (dir : string, shape : string, id : number) => {
        return(
            <div className='card-layout-style f-center'
                onMouseEnter={() => setholderCard(id)}
                onMouseLeave={() => setholderCard(0)}
                onClick={() => {
                    switch (shape) {
                        case 'triangle' :
                            switch (dir){
                                case 'left' :
                                    handleRotateLeftClick();
                                    break;
                                case 'right' :
                                    handleRotateRightClick();
                                    break;
                            }
                            break;
                        default :
                            handleShuffleClick();
                            break;
                    }
                    
                }}
                >
                <div className={`${shape}-${dir}${holderCard === id && id > 0 ? '-active' : ''}`} />
            </div>
        );
    };
    
  
    return (
    <div style={{width : '80vw',height : '80%'}}>
        <Row style={{height : '30%',width : '100%',borderBottom : 'solid 1px rgb(0,0,0,0.1)'}}>
            <Col span={6} className='ass-test1' style={{height : 'auto',width : 'auto'}}>
                {buttonLayout('left','triangle',-1)}
            </Col>
            <Col span={12} className='ass-test1' style={{display : 'flex'}}>
                <Row style={{width : '100%',height : '100%'}}>
                    <Col span={24} className='card-layout-style' style={{width : "100%",height : '100%'}}>
                        <Row className='f-center' style={{width : "100%",height : '100%'}}
                            onClick={() => setmovePosition(!movePosition)}
                        >
                            <Col span={12} className='f-center'><div className='triangle-up'   /></Col>
                            <Col span={12} className='f-center'><div className='triangle-down' /></Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={6} className='ass-test1 f-center'>
                {buttonLayout('right','triangle',-1)}
            </Col>
        </Row>
        <Row style={{height : '30%',width : '100%'}}>
                <Col span={6}  offset={movePosition ? 6 : 3} className='ass-test1'>
                    {buttonLayout(listShape[0].direction,listShape[0].shape, 1)}
                </Col>
                <Col span={6} className='ass-test1'>
                    {buttonLayout(listShape[1].direction,listShape[1].shape, 2)}
                </Col>
                <Col span={6} className='ass-test1'>
                    {buttonLayout(listShape[2].direction,listShape[2].shape, 3)}
                </Col>
        </Row>
        <Row style={{height : '30%',width : '100%'}}>
                <Col span={6}  offset={!movePosition ? 6 : 3} className='ass-test1'>
                    {buttonLayout(listShape[3].direction,listShape[3].shape, 4)}
                </Col>
                <Col span={6} className='ass-test1'>
                    {buttonLayout(listShape[4].direction,listShape[4].shape, 5)}
                </Col>
                <Col span={6} className='ass-test1'>
                    {buttonLayout(listShape[5].direction,listShape[5].shape, 6)}
                </Col>
        </Row>
    </div>
    )
    }

export default LayoutandStyle;