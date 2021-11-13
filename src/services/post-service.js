import axios from "axios";
import { Component } from "react";
import { PuffLoader } from "react-spinners";


class Post extends Component {
  state = {
    postImage: "",
    description: "",
    likes: 0,
    dislikes: 0,
    imageIsUploading: false,
  };

handleSubmit = (event) => {
  event.preventDefault();
  const { postImage, description, likes, dislikes } = this.state;
  axios
  .post(`${process.env.REACT_APP_API_HOST}/posts`, {
    postImage, 
    description, 
    likes, 
    dislikes,
  })
  .then((data) => this.props.history.push("/details"))
  .catch((err) => this.props.history.push("/500"));
}

handleLikes = (btn) => {
    console.log("Liking/Disliking!")  

//this.setState({likes: this.state.number + 1 ? btn === "increase" : btn === "decrease"})    

    if ( btn === "increaseLikes") {
         this.setState( { likes : this.state.number + 1 } )
    } else 
    this.setState({ dislikes : this.state.number + 1 })
}

handleChange = (event) => {
      // console.log(event.target)
  this.setState({ [event.target.name]: event.target.value });
};

handleImageUpload = (event) => {
  this.setState({ imageIsUploading: true });

  const uploadImage = new FormData()
  uploadImage.append("postImage", event.target.files[0])

  axios
  .post(`${process.env.REACT_APP_API_HOST}/upload`, uploadImage)
  .then((result) => {
    this.setState({
      postImage: result.data.imagePath,
      imageIsUploading: false,
    });
  })
  .catch(() => this.props.history.push("/500"));
}


  render() {
    const { postImage, description, likes, dislikes, imageIsUploading } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          {postImage &&  <img src={postImage} alt="postImage"/>} 
          <PuffLoader
              loading={imageIsUploading}
              size="100px"
              color="orchid"
          />          
          <input 
            onChange={this.handleImageUpload}
            type="file"
            name="postImage"
          />

          <br />

          <label htmlFor="description">Description</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={description}
          />
          <br />

            <p>{likes}</p>
            <button onClick={ () => this.handleLikes("increaseLikes")}>Like</button>

            <p>{dislikes}</p>
            <button onClick={ () => this.handleLikes("increaseDislikes")}>Dislike</button>
          
          <br />

          <button type="submit" disabled={imageIsUploading}>
            Post!
          </button>

        </form>
      </div>
    );
  }
}
export default Post;