import React, { Component } from 'react'
import userService from '../../services/user-service'

class Profile extends Component {

    state = {
        profileData: null,
        isLoading: true,
    }

    componentDidMount(){
        userService
            .getUsers()
            .then((result) => {
                this.setState({profileData:result.data, isLoading: false })
            })
            .catch((err) => {});
    }

    render() {

        const {profileData, isLoading} = this.state

        return (
            <div>
                {isLoading && <h1>...isLoading</h1>}
                {!isLoading && <h3>{profileData}</h3>}
            </div>
        )
    }
}

export default Profile