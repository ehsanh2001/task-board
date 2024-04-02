$(function () {
    $("#task-due-date").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "yy-mm-dd",
    });
});

// Add Task button event handler
$("#add-task-btn").click(function () {
    $("#taskDataModal").modal("hide");
});
