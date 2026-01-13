import React, {useState} from 'react'
import { Navigate, NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import Loading from '../component/Loading';
import { httpRequest } from '../service/authApi';
import { useAuth } from '../stores/authStore';

export default function Login() {
  const [formValue, setFormValue] = useState({email: "", password: ""});
  const [errorValue, setErrorValue] = useState({email: "", password: ""});
  const [isShowPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const {setToken} = useAuth(state => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objError = {};

    Object.entries(formValue).forEach(([name, value]) => {
      if(!value) {
        objError[name] = "This field cannot be left empty!";
      }
    })

    if(Object.entries(objError).length) {
      setErrorValue({...errorValue, ...objError});
      return;
    }

    try {
      setLoading(true);
      const response = await httpRequest.post("/login", formValue);
      if(response.data.access_token) {
        localStorage.setItem("token", JSON.stringify(response.data));
        setToken(response.data)
      }
    } catch(error) {
      if(error === "Unauthorized") {
        toast.error("Incorrect username or password")
      } else {
        toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  const handelChangeValue = (e) => {
    const {value, name} = e.target;
    setFormValue({...formValue, [name]: value});

    if(!value.trim()) {
      setErrorValue({...errorValue, [name]: "This field cannot be left empty!"});
      return;
    } 
    setErrorValue({...errorValue, [name]: ""});
  }

  const handleShowPassword = (e) => {
    e.target.checked ? setShowPassword(true) : setShowPassword(false);
  }

  return (
    <div>
      <h1 className='font-semibold text-2xl mt-6'>Login</h1>
      <form action="" autoComplete='new-password' className='mt-6 border border-blue-300 rounded-2xl max-w-100 mx-auto p-4 flex flex-col gap-6 shadow-xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>
          <label htmlFor="email" className='text-xl font-semibold cursor-pointer'>Email</label>
          <input id="email" type="email" name="email" placeholder='Email...' autoComplete="on" autoFocus={true} className='border border-black rounded-sm px-3 py-2 text-lg outline-blue-400' value={formValue.email} onChange={handelChangeValue}/>
          <span className={!errorValue.email ? "hidden" : "text-red-500 text-sm"}>{errorValue.email}</span>
        </div>

        <div className='flex flex-col gap-3'>
          <label htmlFor="password" className='text-xl font-semibold cursor-pointer'>Password</label>
          <input id="password" type={isShowPassword ? "text" : "password"} name="password" placeholder='Password' className='border border-black rounded-sm px-3 py-2 text-lg outline-blue-400' autoComplete='off' value={formValue.password} onChange={handelChangeValue}/>
          <span className={!errorValue.password ? "hidden" : "text-red-500 text-sm"}>{errorValue.password}</span>
          <div className='flex items-center gap-1'>
            <input id="show" type="checkbox" onChange={handleShowPassword}/>
            <label htmlFor="show" className='cursor-pointer'>Show password</label>
          </div>
        </div>

        <p className='text-center'>Don't have an account yet? <NavLink to="#" className='text-blue-500 underline hover:text-blue-700'>Register now!</NavLink></p>

        <button type="submit" className='flex justify-center border text-white rounded-2xl px-4 py-2 hover:cursor-pointer hover:bg-blue-700 transition duration-150 bg-blue-500 mt-3 font-semibold' disabled={isLoading}>{isLoading ? <Loading width="w-6" borderColor="border-bg-white"/> : "Login"}</button> 
      </form>
      <Toaster position='top-right' richColors/>
    </div>
  )
}
