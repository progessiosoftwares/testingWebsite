import './login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import {auth} from '../../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  async  function handleLogin(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            
          await signInWithEmailAndPassword(auth, email, password)
          .then(() =>{
            navigate('/admin', {replace: true})
          })
          .catch(()=>{
            console.log("ERRO AO FAZER O LOGIN")
          })
        }else{
            alert("Prencha todos os campos")
        }

        
    }

    return(
      <div className='home-container'>
        <h1>NovinhosHotBrasil</h1>
        <span>Acesso administrador(a)</span>

        <form className='form' onSubmit={handleLogin}>
            <input 
              type='text'    
              placeholder='Digite seu email...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input 
              type='password'    
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Acessar</button>
        </form>
        
      </div>
    )
  }