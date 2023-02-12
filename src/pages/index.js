import { Inter } from '@next/font/google'
import axios from 'axios'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })


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
  const [longURL, setLongURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://zpp.up.railway.app/urls/shorten', {
        originalUrl: longURL
      });
      console.log(response)
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="display-3 text-center border-bottom">URL-Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input type="text" className='form-control' value={longURL} onChange={(e) => setLongURL(e.target.value)} />      </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">Original URL</th>
            <th scope="col">Shortened URL</th>
            <th scope="col">Is Valid?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((url) => {
            return (
              <tr key={url._id}>
                <td>
                  <a href={url.originalUrl}>{url.originalUrl}</a>
                </td>
                <td>
                  <a href={`https://${url.shortUrl}`}>
                    {url.shortUrl}
                  </a>
                </td>
                <td>
                  {url.isValid == true ? 'yes' : 'no'}
                </td>
              </tr>)
          })}
        </tbody>
      </table>
      <br />
      <small>
        Shortened links will become invalid after 24 hours of its creation.
      </small>
    </div>
  );
}


export const getStaticProps = async () => {
  const res = await axios.get("https://zpp.up.railway.app/urls/all")
  return {
    props: {
      urls: res.data
    }
  }
}