import axios from "axios"
import { Link } from "react-router-dom"
import { useState } from "react"
import "./HomePage.css"



const HomePage = () => {
    const [videos, setVideos] = useState([]);
    const [input, setInput] = useState('');
    const [order, setOrder] = useState("");

    const getYouTube = async () => {
        try {
            const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${input}&type=video&key=${process.env.REACT_APP_API_KEY}`);
            setVideos(res.data.items)
        } catch (error) {
            console.log(error + " >> KEY USED: " + process.env.REACT_APP_API_KEY)
        }
    }

    const selectOrder = async (e) => {
        const order = e.target.value;
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?order=${order}&part=snippet&maxResults=20&q=${input}&type=video&key=${process.env.REACT_APP_API_KEY}`);
        setVideos(res.data.items)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        getYouTube();
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <section>

            <form className="search-form" onSubmit={handleSubmit}>

                <input value={input} placeholder='search for video' onChange={handleChange} size="50" />
                <button type='submit' className="search-button">Search</button>

                <select className="order-list" defaultValue={''} onChange={selectOrder}>
                    <option value="">Select Order</option>
                    <option value="relevance">Relevance</option>
                    <option value="date">Date</option>
                    <option value="rating">Rating</option>
                    <option value="title">title</option>
                    <option value="viewCount">View count</option>
                </select>

            </form>



            <ul className="videoList">
                {videos.map(video => <Link to={`/videos/${video.id.videoId}`} key={video.id.videoId}><li>
                    <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                    <h3>{video.snippet.title}</h3>
                </li></Link>)}
            </ul>

        </section>
    )
}

export default HomePage