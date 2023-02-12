import { Inter } from '@next/font/google'
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })



export default function Home(props) {


  let data = props.urls
  const register = (url) => {
    axios.post('http://localhost:3005/shorten', { "longUrl": url }).then((res) => {
    }).catch((err) => { console.log(err) })
  }
  return (
    <div className="container my-4">
      <h1 className="display-3 text-center border-bottom">URL-Shortener</h1>
      <form action='/' method="post" className="my-5" onSubmit={(e) => {
        register(e.target[0].value)
        console.log("post")
      }}>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input type="url" className="form-control" id="url" aria-describedby="url" />
        </div>
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
                  <a href={url.longUrl}>{url.longUrl}</a>
                </td>
                <td>
                  <a href={url.shortUrl}>
                    {url.shortUrl}
                  </a>
                </td>
                <td>
                  {url.isValid == true ?'yes' : 'no'}
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

  )
}


export const getStaticProps = async () => {
  const res = await axios.get("http://localhost:3005/all")
  return {
    props: {
      urls: res.data
    }
  }
}