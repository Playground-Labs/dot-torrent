'use strict'
const { ipcRenderer } = require('electron')


const submitListener = document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const files = [...document.getElementById('filepicker').files]
    const filesformatted = files.map(( {name, path: pathName}) => ({
        name,
        pathName
    }))
    ipcRenderer.send('files',filesformatted)
})