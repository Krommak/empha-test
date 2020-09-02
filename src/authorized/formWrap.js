import React,{useContext} from 'react'
import { authorizedContext, tokenContext, Authorizate} from './authorized'
import Auth from '../containers/Auth/Auth'

const FormWrap = props => {
  const authorizedCont = useContext(authorizedContext)
  const tokenCont = useContext(tokenContext)
  const authFunc = useContext(Authorizate)

  return (
      <div>
         <Auth authProp={authorizedCont} tokenProp={tokenCont} acceptProp={authFunc}/>
      </div>
  )

}

export default FormWrap