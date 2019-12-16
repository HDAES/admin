import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from './components/Header';
import Menus from './components/Menus';

export default ({children}) => <div className="admin">
    <Menus />
    <div className="main">
        <Header />
        <Scrollbars autoHide>
        <div className="content">
            {children}
        </div>
        </Scrollbars>
    </div>  
</div>