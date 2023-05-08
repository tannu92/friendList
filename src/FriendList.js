import React, { Fragment, useState } from 'react'
import Pagination from './Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { actionsCreators } from './Redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {nameRegex} from './Validation'

const FriendList = () => {
    const state = useSelector(state => state.friendList)
    const dispatch = useDispatch()
    const [friendList, setFriendList] = useState(state)
    const [debounce, setDebounce] = useState()
    const [name, setName] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(5)
    const [validation, setValidation] = useState()


    const addFriend = () => {
        if (name)
        setValidation(nameRegex(name))
        !nameRegex(name) && dispatch(actionsCreators.addFriend(name))
        setName('')
    }

    const handleAction = (id, type) => {
        let friendListCopy = [...friendList]
        let ind
        friendListCopy.filter((obj, index) => {
            if (obj.id == id) {
                ind = index
            }
        })
        switch (type) {
            case 'favorite':
                let temp = friendListCopy[0]
                friendListCopy[0] = friendListCopy[ind]
                friendListCopy[ind] = temp
                break;
            case 'delete':
                friendListCopy.splice(ind, 1)
                break;
        }
        setFriendList(friendListCopy)
        dispatch({ type: 'LOCAL_STORAGE', payload: friendListCopy })
    }

    const searchName = e => {
        let friendListCopy = [...state]
        let searchedValue = e.target.value

        clearInterval(debounce);
        let deboucer = setInterval(() => {
            let searchedName
            if (searchedValue) {
                searchedName = searchedValue && friendListCopy.filter(({ name }) => {
                    return name.toLowerCase().includes(searchedValue.toLowerCase())
                });
            } else {
                searchedName = state
            }
            setFriendList(searchedName)
        }, 400)
        setDebounce(deboucer)
    }

    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentFriends = friendList.slice(indexOfFirstPost, indexOfLastPost)

    const handlePagination = pageNumber => setCurrentPage(pageNumber)

    return (<Fragment>
        <div className="inputfldRow">
            <input className='inputfld' placeholder='Enter name to add' value={name} onChange={(e) => setName(e.target.value)} />
            <input className='inputfld' placeholder='Search Name' onChange={(e) => { searchName(e) }} />
            <button className='btn' onClick={() => { addFriend() }}>Add Friend</button>
        </div>
        {validation && <div class="validation">{validation}</div>}
        <div className='friendlist'>
            {currentFriends.map(friend => {
                return <div key={friend.id} className='friendlistRow'>
                    <span>
                        <h1>{friend.name}</h1>
                        <p>is your friend.</p>
                    </span>
                    <span className='btn favorite' onClick={() => { handleAction(friend.id, 'favorite') }}><FontAwesomeIcon icon={faStar} /></span>
                    <span className='btn delete' onClick={() => { handleAction(friend.id, 'delete') }}>Delete</span>
                </div>
            })}
            {friendList.length > 4 && <Pagination
                postsPerPage={postPerPage}
                totalPosts={friendList.length}
                handlePagination={handlePagination}
            />}
        </div>
    </Fragment>)
}

export default FriendList