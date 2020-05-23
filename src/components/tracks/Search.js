import React, { Component } from 'react';
import { Consumer } from '../context';
import axios from 'axios';

export default class Search extends Component {
    state = {
        trackTitle: ''
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    formSubmit = (e) => {
        e.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search
        ?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc
        &apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Consumer>
                {value => {
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search For A Track
                            </h1>
                            <p className="lead text-center">
                                Get the lyrics for any song you like
                            </p>
                            <form onSubmit={this.formSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                    placeholder="Song title..." name="trackTitle" value={this.state.trackTitle}
                                    onChange={this.onChange} />

                                </div>
                                <button type="submit" className="btn btn-success btn-lg btn-block mb-5">Get the lyrics</button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
};