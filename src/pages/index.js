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

export default function Home() {
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
      window.alert(error.response.data.error)
      setErrorString("You are trying to register a link that already exists in our database.")
    }
  };

  return (
    <div className="container my-5">
      <h1 className="display-3 text-center border-bottom">URL-Shortener</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="url">Original URL</label>
            <input type="url" className='form-control' value={longURL} onChange={(e) => setLongURL(e.target.value)} />
          </div>
          <div className="form-group my-3">
            <label htmlFor="surl">Shortened URL</label>
            <input type="url" className='form-control' value={shortURL} readOnly={true} />
          </div>
          <div className='text-center'>
            <button type="submit" className="btn btn-primary my-3">Submit</button>
          </div>
        </form>
      </div>
      <p className='text-center'>
        Shortened links will become invalid after 24 hours of its creation.
      </p>
    </div>
  );
}