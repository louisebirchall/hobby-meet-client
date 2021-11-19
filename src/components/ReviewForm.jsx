import axios from 'axios';
import React, { Component } from 'react'

/*
the review form is for counting the likes (or dislikes) that users can add to a product, event, charity

instagram as example? 
*/

class ReviewForm extends Component {

    state = {
        likes: 0, 
        // dislikes: 0,
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { likes } = this.state;
        const { id } = this.props;
    
    this.props.service
    .createReview( id, likes )
    .then(() => {
        //this.props.history.push("/reviews");
    })
    .catch((err) => {
        //this.props.history.push("/500");
    })
}

    handleLikes = () => {
        const likeCount = this.state.likes +1
        this.setState({ likes: likeCount })
        // if ( likeBtn === "increaseLikes" ) {
        //     this.setState({ likes: this.state.likes +1 })
        // } else 
        // this.setState({ likes: this.state.likes -1 })
    }

    render() {
        
        const { likes, 
            // dislikes 
        } = this.state
        // const { id } = this.params

        return (
            <div>
                {/* is a form needed? => only "looking" for a button that will be counted */}
                {/* <form onSubmit = { this.handleSubmit }> */}
                
                {/* later the to be replaced by icons?! 
                should be limited for users to only be able to click (dis)like once!
                */}

                {/* <p>{likes}</p> */}
                {/* <button onClick={ ({id}) => this.handleLikes("increaseLikes")}>Like {likes}</button> */}
                
                <button onClick={this.handleLikes} id={this.props.id}>Likes: {likes} </button>
                
                {/* <p>{dislikes}</p> */}
                {/* <button onClick={ () => this.handleLikes("increaseDislikes")}>Dislike</button> */}
                {/* </form> */}
            </div>
        )
    }
}

export default ReviewForm   