import React, { Component } from 'react';
import {withAuthInfo} from '@propelauth/react';
class HeaderComponent extends Component {
    constructor(props){
        super(props)
    }
   
    
    render() {
        return (
            <div>
                <header>
                    <nav className='navbar navbar-dark'
                    bg-primary>
                        <div>
                            
                            <h1>To Do App</h1>
                        </div>

                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;