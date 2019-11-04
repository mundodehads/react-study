import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }

    this.addComment = this.addComment.bind(this);
  }

  displayComments = () => {
    window.client.auth
    .loginWithCredential(new window.stitch.AnonymousCredential())
    .then(() => {
      window.db.collection('comments')
      .find({}, {limit: 10})
      .toArray()
      .then(docs => {
        this.setState({comments: docs.map(doc => ({ username: doc.owner_id || doc.author, comment: doc.comment }))});
      });
    })
    .catch(err => {
      alert(err.message);
    });
  }

  addComment(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const username = data.get('username');
    const comment = data.get('comment');

    if (username && comment) {
      window.client.auth
      .loginWithCredential(new window.stitch.AnonymousCredential())
      .then(() => {
        window.db.collection('comments')
        .insertOne({ author: username, comment })
        .then(this.displayComments);
      })
      .catch(err => {
        alert(err.message);
      });
    }
  }

  render() {
    const { comments } = this.state;

    return (
      <div className="index">
        <div id="blog-post">
          <h3>This is a great blog post</h3>
          <p>I like to write about technology because I want to get on the
          front page of hacker news.</p>
        </div>
        <div id="blog-comments">
          <h3>Comments:</h3>
          { comments.map(comment => <p>{`${comment.username}: ${comment.comment}`}</p>) }
          <button onClick={this.displayComments}>Load/Refresh Comments</button>
        </div>
        <div id="blog-add-comments">
          <h3>Add comment:</h3>
          <form onSubmit={this.addComment}>
            <label htmlFor="username">Your name</label>
            <input id="username" name="username" type="text" />

            <label htmlFor="comment">Comment text</label>
            <input id="comment" name="comment" type="text" />

            <button>Add!</button>
          </form>
        </div>
        
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);