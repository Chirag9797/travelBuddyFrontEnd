import React,{useState,useContext,useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import TravelContext from '../../context/TravelContext';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const travelContext = useContext(TravelContext);
    const {login, error, isAuthenticated} = travelContext;
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email:'',
        username:'',
        password:''
    })

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/", {replace:true})
                }
        if(error) {
            console.log(error)
        }
        
    })
    const {email, password, username} = user

    const onChange = e =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }


    const onSubmit = e =>{
        console.log('Enter')

        e.preventDefault();
        if(email === '' || password === ''){
            console.log('Enter')
        } else {
           login({
               username,
               email,
               password
           })
           navigate("/", {replace:true})
        }
    }

    return (
        <div className="container-fluid" style={{width:'60%'}}>
      <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Username</Label>
        <Input type="text" name="username"value={username} onChange={onChange} placeholder="Name" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email"value={email} onChange={onChange} placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password"  value={password} onChange={onChange} placeholder="Password" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
        </div>
  
    )
}

export default Login;
