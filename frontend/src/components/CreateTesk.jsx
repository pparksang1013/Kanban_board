import React, { useState } from "react"
import { Button } from "@mui/material";
import CardDetail from "../modalList/CardDetail";


// 테스크 추가 기능(미완성)

function Header(props) {
    return <header>
      <h1>{props.title}</h1>
    </header>
  }

const CreateTesk = () => {
  const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])

  const onKeyPress = e => {
      submitTagItem()
  }

  const submitTagItem = () => {
    let updatedTagList = [...tagList]
    updatedTagList.push(tagItem)
    setTagList(updatedTagList)
    setTagItem('')
  }

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem)
    setTagList(filteredTagList)
  }

  return (
    <div>
      <div>
        {tagList.map((tagItem, index) => {
          return (
            <div key={index} className='Tesk'>
                <Header title="ETC"></Header>
        <CardDetail/>
              <Button onClick={deleteTagItem} >X</Button>
            </div>
          )
        })}
        <div>
        <input
          type='button'
          value='add tesk'
          tabIndex={2}
          onChange={e => setTagItem(e.target.value)}
          onClick={onKeyPress}
        ></input>
        </div>
      </div>
    </div>
  )
}

export default CreateTesk