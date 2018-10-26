import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/ConfigureStore';
import RNRouter from './support/views/RNRouter';
const store = configureStore();


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RNRouter/>
            </Provider>
        )
    }
}