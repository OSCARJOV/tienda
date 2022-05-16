import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services'



const Login = () => {

    const {handleSubmit, register} = useForm( )
    const navigate = useNavigate()
    const [userObj, setUserObj] = useState({})

    const onSubmit = (data) => {
        console.log(data)
        setUserObj(data)
    }

    useEffect(() => {
        if(userObj.email){
            loginUser(userObj)
                .then((res) => {
                    localStorage.setItem("token", res.access)
                })
                .then(() => {
                    navigate('/shop')
                })
        }
    }, [userObj])


    return (
        
        <div className='App-header  '>
            <div>
                <h1 className='oblique'>JOYERIA ESMERALDA</h1>
                <h1 className='oblique'>Iniciar Sesion</h1>

            <form onSubmit={handleSubmit(onSubmit)}  >
                <h4 className='oblique' htmlFor='email'>Email</h4>
                <input  id='email' placeholder='example@example.com' type='email' {...register('email')} />
                <br/>
                <br/>
                <h4 className='oblique' htmlFor='password'>Password</h4>
                <input id='password' placeholder='Your password' type='password' {...register('password')} />
                <br/>
                <br/>
                <input type='submit' />
            </form>
        </div>
        </div>            
    )
}

export default Login