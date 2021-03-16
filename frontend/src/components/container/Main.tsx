import React, { useState } from "react";
import styled from 'styled-components';

// API
import callApi from '../../api/callApi';

//test button
import Button from "../presentational/Button";

const MainWrap = styled.main`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// 인터페이스를 사용해야하는 이유
interface MainState {
    value: number,
}

class Main extends React.Component<{}, MainState> {
    constructor(props) {
        // this를 위해 ~
        super(props);
        this.state = {
            value: 0
        };
    }
    
    callAPITest = async() => {
        let path = '/stable/stock/AAPL/price';
        let result = await callApi('get', path);
        console.log(result);
        this.setState({
            value: result['data']
        });
    }

    render() {
        return (
            <MainWrap>
                <Button clickEvent={this.callAPITest}>API 테스트</Button><br/>
                {this.state.value}
            </MainWrap>
        );
    }
    
}

export default Main;