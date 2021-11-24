import React, { Component } from 'react'

/*
the review form is for counting the likes (or dislikes) that users can add to a product, event, charity

instagram as example? 
*/

class ReviewForm extends Component {

    state = {
        comment: "",
        likes: 0, 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { comment, likes } = this.state;
        const { id } = this.props;
    
    this.props.service
    .createReview( id, comment, likes )
    .then(() => {
        this.props.history.push("/reviews");
    })
    .catch((err) => {
        //this.props.history.push("/500");
    })
}

    handleLikes = () => {
        const likeCount = this.state.likes +1
        this.setState({ likes: likeCount })
    }

    render() {
        const { comment, likes } = this.state
        // const { id } = this.params

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <button onClick={this.handleLikes} id={this.props.id}>Likes: {likes} </button>
                    <label htmlFor="comment">Your Review: </label>
                    <input type="text" name="comment" value={comment}/>
                </form>
                <button type="submit">Add your Review</button>
            </div>
        )
    }
}

export default ReviewForm   