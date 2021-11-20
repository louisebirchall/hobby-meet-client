import React, { Component } from 'react'
import userService from '../../services/user-service'
import generalService from '../../services/general-service';
import { PuffLoader } from 'react-spinners';

class ProfileFom extends Component {

    state = {
        username: "",
        email: "",
        fullName: "",
        image: "",
        sex:"",
        age: "",
        isAdmin: "",
        type: "",
        hobbies:"",
        imageIsUploading: false,
    }

    
    handleImageUpload = (event) => {
        this.setState({ imageIsUploading: true });
    
        const uploadData = new FormData();
        uploadData.append("image", event.target.files[0]);
    
        generalService
          .upload(uploadData)
          .then((result) => {
              this.setState({
              image: result.data.imagePath,
              imageIsUploading: false,
            });
          })
          .catch(() => this.props.history.push("/500"));
    };

    handleChange = (event) => {
        // console.log(event.target)
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {username, email, fullName, image, sex, age, isAdmin, type} = this.state;
        const {id} = this.props.match.params;
        if (this.props.isEdit) {
            userService
            .edit(id, username, email, fullName, image, sex, age, type)
            .then((newuser) => {
                console.log(newuser)
                    this.props.history.push(`/profile/${id}`); 
                })
                .catch((err) => {
                    this.props.history.push("/500");
                });
        } else {
            userService
            .create(id, username, email, fullName, image, sex, age, isAdmin, type)
            .then(() => {
                    this.props.history.push(`/profile/${id}`); 
                })
                .catch((err) => {
                    this.props.history.push("/500");
                });
            }
        }
        
        componentDidMount(){
            const { id } = this.props.match.params;
            if(id){
                userService
                    .getUser(id)
                    .then((result) => {
                        this.setState({
                            username: result.data.username, 
                            email: result.data.email, 
                            fullName: result.data.fullName,
                            image: result.data.image,
                            sex: result.data.sex,
                            age: result.data.age,
                            isAdmin: result.data.isAdmin,
                            type: result.data.type,
                        });
                    })
                    .catch((err) => {
                        this.props.history.push("/500");
                    });
            }
        }
        
        render() {
        const {username, email, fullName, image, sex, age, isAdmin, type, imageIsUploading} = this.state
        
        return (
            <div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            {image && <img src={image} alt="postImg" width="150px" />}
                            <PuffLoader loading={imageIsUploading} size="100px" color="orchid" />
                            <input onChange={this.handleImageUpload} type="file" name="image" />

                            <label htmlFor="username">Username</label>
                            <input onChange={this.handleChange} type="text" name="username" value={username}/>

                            <label htmlFor="email">Email</label>
                            <input onChange={this.handleChange} type="text" name="email" value={email}/>

                            <label htmlFor="fullName">Full name</label>
                            <input onChange={this.handleChange} type="text" name="fullName" value={fullName}/>
             
                            <label htmlFor="sex">Sex</label>
                            <input onChange={this.handleChange} type="text" name="sex" value={sex}/>

                            <label htmlFor="age">Age</label>
                            <input onChange={this.handleChange} type="text" name="age" value={age}/>

                            <label htmlFor="type">Type of user</label>
                            <input onChange={this.handleChange} type="text" name="type" value={type}/>

                            <label htmlFor="isAdmin">Is admin?</label>
                            <input onChange={this.handleChange} type="text" name="isAdmin" value={isAdmin}/>

                            <button type="submit" disabled={imageIsUploading}>
                                Save changes!
                            </button>
                        </form>

                        <p>Do you want to delete your profile?</p>
                        <button type="submit" disabled={imageIsUploading}>
                            Delete
                        </button>
                    </div>
            </div>
        )
    }
}

export default ProfileFom