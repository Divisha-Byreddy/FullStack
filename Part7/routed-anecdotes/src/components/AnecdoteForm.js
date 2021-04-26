import _ from "lodash"
import { useHistory } from "react-router"
import useField from "../hooks"

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content : content.value,
      author : author.value,
      info : info.value,
      votes: 0
    })
    history.push('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} id = 'createAnecdote' onReset = {handleReset}>
        <div>
          content
          <input {...(_.omit(content,['reset']))} />
        </div>
        <div>
          author
          <input {...(_.omit(author,['reset']))} />
        </div>
        <div>
          url for more info
          <input {...(_.omit(info,['reset']))} />
        </div>
        <button type = 'submit'>create</button>
        <button type = 'reset' >reset</button>
      </form>
    </div>
  )
}

export default CreateNew
  