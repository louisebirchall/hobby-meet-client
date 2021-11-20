import React, { Component } from 'react'
import userService from '../../services/user-service'

class Profile extends Component {

    state = {
        user: null,
        isLoading: true,
    }

    componentDidMount(){
        const { id } = this.props.match.params;
       // console.log(this.props.profileData)
        userService
            .getUser(id)
            .then((result) => {
                this.setState({user: result.data, isLoading: false })
            })
            .catch((err) => {
                //console.log(err.response.status)
                if(err.response.status === 403){
                    this.props.history.push("/login")
                }
            });
    }

    render() {
        const {user, isLoading} = this.state
        
        return (
            <div>
                {isLoading && <h1>...isLoading</h1>}
                {!isLoading && 
                    <div>
                        <img src={user.image} alt="user"/>
                        <h3>{user.username}</h3>
                        <p>{user.email}</p>
                        <p>{user.fullName}</p>
                        <p>{user.type}</p>
                        <p>{user.sex}</p>
                        <p>{user.age}</p>
                        <p>{user.hobbies}</p>

                        <button>Edit</button>
                    </div>
                }

            </div>
        )
    }
}

export default Profile