import React, { Component } from 'react'

/*
the review form is for counting the likes or dislikes 
that users can add to a product, event, charity

instagram as example? 
*/

class ReviewForm extends Component {

    state = {
        comment: "",
        likes: 0, 
        // dislikes: 0,
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
        // if ( likeBtn === "increaseLikes" ) {
        //     this.setState({ likes: this.state.likes +1 })
        // } else 
        // this.setState({ likes: this.state.likes -1 })
    }

    render() {
        
        const { comment, likes, dislikes } = this.state
        // const { id } = this.params

        return (
            <div>
                {/* is a form needed? => only "looking" for a button that will be counted */}
                {/* <form onSubmit = { this.handleSubmit }> */}
                <form onSubmit={this.handleSubmit}>
                <button onClick={this.handleLikes} id={this.props.id}>Likes: {likes} </button>
                    <label htmlFor="comment">Your Review: </label>
                    <input type="text" name="comment" value={comment}/>
                </form>
                <button type="submit">Add your Review</button>

                
                {/* later the to be replaced by icons?! 
                should be limited for users to only be able to click (dis)like once!
                */}

                {/* <p>{likes}</p> */}
                {/* <button onClick={ ({id}) => this.handleLikes("increaseLikes")}>Like {likes}</button> */}
                
                
                {/* <p>{dislikes}</p> */}
                {/* <button onClick={ () => this.handleLikes("increaseDislikes")}>Dislike</button> */}
                {/* </form> */}
            </div>
        )
    }
}

export default ReviewForm   