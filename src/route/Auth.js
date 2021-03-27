import { React, useState } from 'react';
import { authService, firebaseInstance } from 'fbase'

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    
    const onChange = (e) => {
        const {target: { name, value }} = e;

        if( name === "email"){
            setEmail(value);
        }else if (name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            if(newAccount){
                // create new account 새로운 계정 만들어야하면
                await authService.createUserWithEmailAndPassword(email, password)
            }else {
                // log in 계정 가지고 있으면
                await authService.signInWithEmailAndPassword(email, password)
            }
        }
        catch(error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev) // newAccount state 의 이전 값을 가져와서 반대되는 값을 state에 넣어준다.
    const onSocialClick = async (e) => {
        const {
          target: { name },
        } = e;
        let provider;
        if (name === "google") {
          provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
          provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return (
        <>
            <form onSubmit = {onSubmit}>
                <input onChange = {onChange} name = "email" type = "text" placeholder = "email" value = {email} required />
                <input onChange = {onChange} name = "password" type = "password" placeholder = "password" value =  {password} required />
                <input type = "submit" value = { newAccount ? "create account" : "log in"}/>
                { error }
            </form>
            <span onClick = {toggleAccount}>{newAccount ? "sign in" : "create account"}</span>
            <div>
                <button onClick = {onSocialClick} name="google">continue with google</button>
                <button onClick = {onSocialClick} name="github">continue with github</button>
            </div>
        </>
    );   
}
export default Auth;