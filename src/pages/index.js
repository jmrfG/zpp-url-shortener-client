import axios from 'axios'
import { useState } from 'react'


const postData = async (url = '', data = {}) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default function Home(props) {
  let data = props.urls
  console.log(data)
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [errorString, setErrorString] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://zpp.up.railway.app/shorten', {
        originalUrl: longURL
      });
      //console.log(response.headers)
      setShortURL(response.data.shortUrl)
      //      window.location.reload();
    } catch (error) {
      console.error(error.response.data);
      setErrorString("You are trying to register a link that already exists in our database.")
    }
  };

  return (
    <div className="container my-4">
      <h1 className="display-3 text-center border-bottom">URL-Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Original URL</label>
          <input type="url" className='form-control' value={longURL} onChange={(e) => setLongURL(e.target.value)} />      </div>
        <br />
        <div className="form-group">
          <label htmlFor="url">Short URL</label>
          {shortURL ? <p><a href={`https://${shortURL}`}>{shortURL}</a></p> : ''}
          {errorString ? <p>{errorString}</p> : ''}
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <small>
        Shortened links will become invalid after 24 hours of its creation.
      </small>
    </div>
  );
}


export const getStaticProps = async () => {
  const res = await axios.get("https://zpp.up.railway.app/all")
  return {
    props: {
      urls: res.data
    }
  }
}