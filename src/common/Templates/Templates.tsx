import React from 'react';
import SuperCheckbox from '../SuperCheckbox/SuperCheckbox';
import SuperInputText from '../SuperInputText/SuperInputText';
import SuperButton from '../SuperButton/SuperButton';
import '../../app/App.css'

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