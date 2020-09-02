import React, {Component} from 'react'
import App from '../App'

export const tokenContext = React.createContext()
export const authorizedContext = React.createContext()
export const Authorizate = React.createContext ()

class Authorized extends Component {
    state = {
        token: '',
        authorized: false
    }
    
    Authorization = (props) => {
        this.setState({
            token: props
        })
        if (this.state.token.length !== 0) {
            this.setState({
                authorized : true
            })
        }
    }

    render() {
        return (
            <tokenContext.Provider value={this.state.token}>
                <authorizedContext.Provider value={this.state.authorized}>
                    <Authorizate.Provider value={this.Authorization}>
                        <App />
                    </Authorizate.Provider>
                </authorizedContext.Provider>
            </tokenContext.Provider>
        )
    }
}

export default Authorized 