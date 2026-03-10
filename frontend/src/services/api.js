import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers:{
    "Content-Type":"application/json"
  }
})

api.interceptors.request.use((config)=>{

const user = JSON.parse(localStorage.getItem("oncomind_user") || "{}")

if(user.token){
config.headers.Authorization = `Bearer ${user.token}`
}

return config

})

export const loginUser = async (email,password)=>{

const res = await api.post("/auth/login",{
email,
password
})

return res.data

}

export const registerUser = async (data)=>{

const res = await api.post("/auth/register",data)

return res.data

}

export const submitSymptoms = async (data) => {
  const res = await api.post("/patient/symptoms", data)
  return res.data
}

export default api