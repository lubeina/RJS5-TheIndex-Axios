import React, { Component } from "react";

// import authors from "./data.js";

import axios from "axios";
import Loading from "./Loading";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const request = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const authors = request.data;
      this.setState({ authors, loading: false });
    } catch (err) {
      console.error("Something went wrong");
      console.error(err);
    }
  }

  // selectAuthor = author => this.setState({ currentAuthor: author });

  selectAuthor = async authorId => {
    try {
      this.setState({ loading: true });
      const request = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${authorId}/`
      );
      const author = request.data;
      this.setState({ currentAuthor: author, loading: false });
    } catch (err) {
      console.error("Something went wrong");
      console.error(err);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.loading) {
      return <Loading />;
    }

    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
