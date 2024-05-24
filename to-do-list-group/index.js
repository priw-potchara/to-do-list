const routeToDoList = (app) => {
    app.post('/createToDoListGroup', createToDoListGroup)
    app.post('/updateToDoListGroup', updateToDoListGroup)
    app.delete('/deleteToDoListGroup/:id', deleteToDoListGroup)
}

const createToDoListGroup = (req, res) => {
    res.send('Hi World')
}

const updateToDoListGroup = (req, res) => {

}

const deleteToDoListGroup = (req, res) => {
    console.log(req?.params?.id)
}

const getListToDoListGroup = (req, res) => {

}

const getToDoListGroupById = (req, res) => {

}

module.exports = routeToDoList;