import React from 'react';
import SuperCheckbox from '../common/SuperCheckbox/SuperCheckbox';
import SuperInputText from '../common/SuperInputText/SuperInputText';
import SuperButton from '../common/SuperButton/SuperButton';
import './../../App.css'

const Templates = () => {
    return (
        <div className={'template'}>
            <div>
                <h2>Checkbox</h2>
                <SuperCheckbox children={'Example'}/>
            </div>
            <div>
                <h2>Input</h2>
                <SuperInputText/>
                <h2>Input Error</h2>
                <SuperInputText error={'Error text'}/>
            </div>
            <div>
                <h2>Button</h2>
                <SuperButton children={'Example'}/>
                <SuperButton children={'Example Red'} red={true}/>
            </div>



        </div>
    );
};

export default Templates;