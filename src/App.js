import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isTrue: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isTrue: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isTrue: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isTrue: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isTrue: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isTrue: false,
  },
]

const EachTask = props => {
  const {details} = props
  const {task, tag} = details
  const findItem = tagsList.find(item => item.optionId === tag)

  return (
    <li className="task-list-item">
      <p className="task-para">{task}</p>
      <p className="tag-para">{findItem.displayText}</p>
    </li>
  )
}

const TagItem = props => {
  const {details, onClickTagButton} = props
  const {displayText, optionId, isTrue} = details
  const buttonClass = isTrue ? 'bg-button' : 'tag-button'

  const onClickTag = () => {
    onClickTagButton(optionId)
  }
  return (
    <li>
      <button type="button" className={buttonClass} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    list: [],
    selectTag: '',
    newList: tagsList,
  }

  onChangeSelect = event => {
    this.setState({tag: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onClickTagButton = button => {
    const {newList} = this.state
    const findItem = newList.find(item => item.optionId === button)
    if (findItem.isTrue === false) {
      const filteredList = newList.map(item => {
        if (item.optionId === button) {
          return {...item, isTrue: true}
        }
        return {...item, isTrue: false}
      })
      this.setState({newList: filteredList, selectTag: button})
    }
    if (findItem.isTrue === true) {
      const filteredList = newList.map(item => {
        if (item.optionId === button) {
          return {...item, isTrue: true}
        }
        return item
      })
      this.setState({newList: filteredList, selectTag: ''})
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {task, tag} = this.state
    if (task === '') {
      // eslint-disable-next-line no-alert
      alert('Enter the task')
    } else {
      const taskValue = {
        id: v4(),
        task,
        tag,
      }
      this.setState(prevState => ({
        list: [...prevState.list, taskValue],
        task: '',
        tag: tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {task, tag, selectTag, newList, list} = this.state
    const filteredList = list.filter(item => item.tag.includes(selectTag))

    return (
      <>
        <div className="bg-container">
          <form className="left-container" onSubmit={this.onSubmitForm}>
            <h1 className="left-heading">Create a task!</h1>
            <label htmlFor="inputText" className="label">
              Task
            </label>
            <input
              id="inputText"
              className="input"
              type="text"
              value={task}
              placeholder="Enter the task here"
              onChange={this.onChangeTask}
            />
            <label htmlFor="dropdown" className="label-1">
              Tags
            </label>
            <select
              id="dropdown"
              className="dropdown"
              value={tag}
              onChange={this.onChangeSelect}
            >
              {tagsList.map(eachItem => (
                <option value={eachItem.optionId} key={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="button">
              Add Task
            </button>
          </form>
          <div className="right-container">
            <h1 className="top-heading">Tags</h1>
            <ul className="ul-container">
              {newList.map(item => (
                <TagItem
                  key={item.optionId}
                  details={item}
                  onClickTagButton={this.onClickTagButton}
                />
              ))}
            </ul>
            <h1 className="bottom-heading">Tasks</h1>
            <ul className="task-container">
              {filteredList.length === 0 ? (
                <div className="no-task-para">
                  <p className="no-task-para">No Tasks Added Yet</p>
                </div>
              ) : (
                filteredList.map(item => (
                  <EachTask key={item.optionId} details={item} />
                ))
              )}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default App
