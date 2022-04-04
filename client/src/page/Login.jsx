import React from 'react';

import Formlogin from '../components/Formlogin';
import Formregis from '../components/Formregis';

function Login() {
    return (
        <div className='main-login-page'>
            <Formlogin />
            <Formregis />
        </div>
    );
}

export default Login;