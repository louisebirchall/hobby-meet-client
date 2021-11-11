import axios from "axios";
import { Component } from "react";

class Post extends Component {
  state = {
    postImage: "",
    description: "",
    likes: 0,
    dislikes: 0,
  };

  changeLikes = (btn) => {
    console.log("Liking/Disliking!")  

//this.setState({likes: this.state.number + 1 ? btn === "increase" : btn === "decrease"})    

    if ( btn === "increaseLikes") {
         this.setState( { likes : this.state.number + 1 } )
    } else 
    this.setState({ dislikes : this.state.number + 1 })
    }

  render() {
    const { postImage, description, likes, dislikes } = this.state;

    return (
      <div>
        <form>
          <img src={postImage} alt="postImage" />

          <label htmlFor="description">Description</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            value={description}
          />
            <p>{likes}</p>
            <button onClick={ () => this.changeLikes("increaseLikes")}>Like</button>

            <p>{dislikes}</p>
            <button onClick={ () => this.changeLikes("increaseDislikes")}>Dislike</button>

        </form>
      </div>
    );
  }
}
