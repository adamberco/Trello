
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const KEY = 'boardDB';

export const productService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyList,
    getEmptyCard
}

_createBoards()

// TODO: support paging and filtering and sorting
function query() {
    return storageService.query(KEY)
}

function getById(id) {
    return storageService.get(KEY, id)
}

function remove(id) {
    return storageService.remove(KEY, id)
}

function save(board) {
    const savedBoard = (board._id) ? storageService.put(KEY, board) : storageService.post(KEY, board)
    return savedBoard;
}

function getEmptyBoard(title) {
    return {
        _id: '',
        title,
        createdAt: '',
        createdBy: 'user',
        style: null,
        labels: ['label1', 'label2','label3'],
        members: [],
        lists: []
    }
}

function getEmptyList(title){
    return {
        id: 'L' + utilService.makeId(),
        title,
        cards: []
    }
}

function getEmptyCard(title){
    return{
        id: 'C' + utilService.makeId(),
        title,
        description: '',
        comments: [],
        checklists: [],
        members: [],
        labelIds: [],
        createdAt : Date.now(),
        dueDate: '',
        style: null,
        byMember: {
            id: "u101",
            username: "Tal",
            fullname: "Tal Tarablus",
            imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
        },
        activities: []


    }
}

// Create Test Data:
function _createBoards() {
    var boards = JSON.parse(localStorage.getItem(KEY))
    if (!boards || !boards.length) {
        boards = [
            _createBoard('New Board'),
        ]
        localStorage.setItem(KEY, JSON.stringify(boards))
    }
    return boards;
}

function _createBoard(title) {
    const board = getEmptyBoard(title)
    board._id = utilService.makeId()
    return board
}

