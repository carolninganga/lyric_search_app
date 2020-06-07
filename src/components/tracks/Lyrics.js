import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';


import axios from 'axios';

class Lyrics extends Component {
     state = {
         track: {},
         lyrics: {}
     };

     componentDidMount() {
        axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                this.setState({track_list: res.data.message.body.lyrics });    
                
                return axios.get(`https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`);

            })
            .then(res => {
                this.setState({ track_list: res.data.message.body.track });    
            })
            .catch(err => console.log(err));

    }


    render() {
        const { track, lyrics } = this.state;
       if(track === undefined || lyrics === undefined || 
        Object.keys(track).length === 0 || 
        Object.keys(lyrics).length === 0) {
            return <Spinner />;
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                </React.Fragment>
            
                );
        }   
    }
}


export default Lyrics;