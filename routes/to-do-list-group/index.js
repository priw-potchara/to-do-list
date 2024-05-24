const { toDoListGroup } = require("../../db")

const routeToDoListGroup = (app) => {
    const group = "to-do-list-group"
    app.post(`/${group}`, createToDoListGroup)
    app.put(`/${group}`, updateToDoListGroup)
    app.delete(`/${group}/:id`, deleteToDoListGroup)
    app.get(`/${group}/list`, getListToDoListGroup)
    app.get(`/${group}/by-id/:id`, getToDoListGroupById)
}

const createToDoListGroup = (req, res) => {
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
        let model = toDoListGroup.find(x => x.display_name == body.display_name);
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
            "to_do_list_group_id": toDoListGroup.length + 1,
            "display_name": body.display_name,
        }
        toDoListGroup.push(detail)
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

const updateToDoListGroup = (req, res) => {
    try {
        let body = { ...req?.body };
        // ========== ========== ========== ==========
        if (!body.to_do_list_group_id) {
            res.json({
                "code": 400,
                "success": false,
                "message": "to_do_list_group_id is not empty.",
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
        const index = toDoListGroup.findIndex(x => x.to_do_list_group_id == body.to_do_list_group_id);
        if (index < 0) {
            res.json({
                "code": 400,
                "success": false,
                "message": "to do list group not found.",
                "data": null,
            })
        }
        // ========== ========== ========== ==========
        const model = toDoListGroup.find(x => x.to_do_list_group_id != body.to_do_list_group_id
            && x.display_name == body.display_name);
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
            ...toDoListGroup[index],
            "display_name": body.display_name,
        }
        toDoListGroup[index] = detail;
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

const deleteToDoListGroup = (req, res) => {
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
        const index = toDoListGroup.findIndex(x => x.to_do_list_group_id == id);
        if (index >= 0) {
            toDoListGroup.splice(index, 1);
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
                "message": "to do list group not found.",
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

const getListToDoListGroup = (req, res) => {
    try {
        res.json({
            "code": 200,
            "success": true,
            "message": "get list success.",
            "data": toDoListGroup,
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

const getToDoListGroupById = (req, res) => {
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
        const index = toDoListGroup.findIndex(x => x.to_do_list_group_id == id);
        if (index >= 0) {
            res.json({
                "code": 200,
                "success": true,
                "message": "get success.",
                "data": toDoListGroup[index],
            })
        } else {
            res.json({
                "code": 400,
                "success": false,
                "message": "to do list group not found.",
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

module.exports = routeToDoListGroup;