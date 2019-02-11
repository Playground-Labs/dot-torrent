// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')
const submitListener = document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const files = [...document.getElementById('filepicker').files]
    const filesFormatted = files.map(({ name, path: pathName}) => ({ 
        name, 
        pathName
    }))
    ipcRenderer.send('files', filesFormatted)
})
ipcRenderer.on('metadata',(event, metadata) => {
    console.log('working');
    const pre = document.getElementById('data')
    pre.innerText=JSON.stringify(metadata, null, 2)
})
ipcRenderer.on('metadata:error', (event, error) => {
})