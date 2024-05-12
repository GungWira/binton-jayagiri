import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET_KEY

export const createToken = (userData : {id : string; username : string; phone:string}) : string =>{
  return jwt.sign(userData, secretKey! , {expiresIn : '1h'})
}

export const verifyToken = (token : string) : {id : string; username : string; phone : string} | null =>{
  try{
    const decoded = jwt.verify(token, secretKey!)
    return decoded as {id : string; username : string; phone : string}
  }catch(error){
    return null
  }
}