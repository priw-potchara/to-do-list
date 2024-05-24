let toDoList = [
    {
        "to_do_list_id": 1,
        "display_name": "To do list API - Create",
        "created_at": new Date(),
        "is_done": false,
        "to_do_list_group_id": 1,
    },
    {
        "to_do_list_id": 2,
        "display_name": "To do list API - Update",
        "created_at": new Date(),
        "is_done": false,
        "to_do_list_group_id": 1,
    },
    {
        "to_do_list_id": 3,
        "display_name": "Clean bed room",
        "created_at": new Date(),
        "is_done": false,
        "to_do_list_group_id": 2,
    },
];

let toDoListGroup = [
    {
        "to_do_list_group_id": 1,
        "display_name": "Work",
    },
    {
        "to_do_list_group_id": 2,
        "display_name": "Home",
    },
];

module.exports = {
    toDoList,
    toDoListGroup,
}