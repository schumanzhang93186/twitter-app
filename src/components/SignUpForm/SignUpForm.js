import { useState } from 'react';
import styles from './SignUpForm.module.css';

export default function SignUpForm({ quote }) {

    console.log('SignUpForm: ', quote);

    return (
        <div className={`card ${styles.formcard}`}>
            <div className="row">
                <blockquote>{quote}</blockquote>



            </div>
        </div>
    );
}