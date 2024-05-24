const { toDoList } = require("../../db")

const routeToDoList = (app) => {
    const group = "to-do-list"
    app.post(`/${group}`, createToDoList)
    app.put(`/${group}`, updateToDoList)
    app.delete(`/${group}/:id`, deleteToDoList)
    app.get(`/${group}/list`, getListToDoList)
    app.get(`/${group}/by-id/:id`, getToDoListById)
    app.get(`/${group}/list/by-to-do-list-group-id/:id`, getListToDoListByToDoListGroupId)
}

const createToDoList = (req, res) => {
    try {
        let body = { ...req?.body };
        // ========== ========== ========== ==========
        if (!body.display_name) {
            res.json({
                "code": 400,
                "success": false,
                "message": "display_name is not empty.",
                "data": null,
            })
            return;
        }
        // ========== ========== ========== ==========
        let model = toDoList.find(x => x.display_name == body.display_name);
        if (model) {
            res.json({
                "code": 400,
                "success": false,
                "message": "display_name is duplicate.",
                "data": null,
            })
            return;
        }
        // ========== ========== ========== ==========
        let detail = {
            "to_do_list_id": toDoList.length + 1,
            "display_name": body.display_name,
            "created_at": new Date(),
            "is_done": false,
            "to_do_list_group_id": body.to_do_list_group_id || null,
        }
        toDoList.push(detail)
        res.json({
            "code": 200,
            "success": true,
            "message": "create success.",
            "data": detail,
        })
    } catch (err) {
        console.log(err)
        res.json({
            "code": 400,
            "success": false,
            "message": "error.",
            "data": detail,
        })
    }
}

const updateToDoList = (req, res) => {
    try {
        let body = { ...req?.body };
        // ========== ========== ========== ==========
        if (!body.to_do_list_id) {
            res.json({
                "code": 400,
                "success": false,
                "message": "to_do_list_id is not empty.",
                "data": null,
            })
            return;
        }
        // ========== ========== ========== ==========
        if (!body.display_name) {
            res.json({
                "code": 400,
                "success": false,
                "message": "display_name is not empty.",
                "data": null,
            })
            return;
        }
        // ========== ========== ========== ==========
        const index = toDoList.findIndex(x => x.to_do_list_id == body.to_do_list_id);
        if (index < 0) {
            res.json({
                "code": 400,
                "success": false,
                "message": "to do list not found.",
                "data": null,
            })
        }
        // ========== ========== ========== ==========
        let detail = {
            ...toDoList[index],
            "display_name": body.display_name,
            "is_done": body.is_done || false,
            "to_do_list_group_id": body.to_do_list_group_id || null,
        }
        toDoList[index] = detail;
        res.json({
            "code": 200,
            "success": true,
            "message": "update success.",
            "data": detail,
        })
    } catch (err) {
        console.log(err)
        res.json({
            "code": 400,
            "success": false,
            "message": "error.",
            "data": detail,
        })
    }
}

const deleteToDoList = (req, res) => {
    try {
        const id = req?.params?.id;
        // ========== ========== ========== ==========
        if (!id) {
            res.json({
                "code": 400,
                "success": false,
                "message": "id is not empty.",
                "data": null,
            })
            return;
        }
        // ========== ========== ========== ==========
        const index = toDoList.findIndex(x => x.to_do_list_id == id);
        if (index >= 0) {
            toDoList.splice(index, 1);
            res.json({
                "code": 200,
                "success": true,
                "message": "delete success.",
                "data": null,
            })
        } else {
            res.json({
                "code": 400,
                "success": false,
                "message": "to do list not found.",
                "data": null,
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            "code": 400,
            "success": false,
            "message": "error.",
            "data": detail,
        })
    }
}

const getListToDoList = (req, res) => {
    try {
        res.json({
            "code": 200,
            "success": true,
            "message": "get list success.",
            "data": toDoList,
        })
    } catch (err) {
        console.log(err)
        res.json({
            "code": 400,
            "success": false,
            "message": "error.",
            "data": detail,
        })
    }
}

const getToDoListById = (req, res) => {
    try {
        const id = req?.params?.id;
        // ========== ========== ========== ==========
        if (!id) {
            res.json({
                "code": 400,
                "success": false,
                "message": "id is not empty.",
                "data": null,
            })
            return;
        }
        // ========== ========== ========== ==========
        const index = toDoList.findIndex(x => x.to_do_list_id == id);
        if (index >= 0) {
            res.json({
                "code": 200,
                "success": true,
                "message": "get success.",
                "data": toDoList[index],
            })
        } else {
            res.json({
                "code": 400,
                "success": false,
                "message": "to do list not found.",
                "data": null,
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            "code": 400,
            "success": false,
            "message": "error.",
            "data": detail,
        })
    }
}

const getListToDoListByToDoListGroupId = (req, res) => {
    try {
        const id = req?.params?.id;
        // ========== ========== ========== ==========
        if (!id) {
            res.json({
                "code": 400,
                "success": false,
                "message": "id is not empty.",
                "data": null,
            })
            return;
        }
        // ========== ========== ========== ==========
        const list = toDoList.filter(x => x.to_do_list_group_id == id);
        res.json({
            "code": 200,
            "success": true,
            "message": "get success.",
            "data": list,
        })
    } catch (err) {
        console.log(err)
        res.json({
            "code": 400,
            "success": false,
            "message": "error.",
            "data": detail,
        })
    }
}

module.exports = routeToDoList;