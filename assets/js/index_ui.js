$(function () {
    $("#task-due-date").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "yy-mm-dd",
    });
});

// Add-Task button event handler
$("#add-task-btn").click(function () {
    if (!validateInput()) return;

    $("#taskDataModal").modal("hide");
});

function validateInput() {
    if ($("#task-title").val() === "") {
        $("label[for='task-title']").addClass("error");
        return false;
    }
    if ($("#task-due-date").val() === "") {
        $("label[for='task-due-date']").addClass("error");
        return false;
    }
    if ($("#task-description").val() === "") {
        $("label[for='task-description']").addClass("error");
        return false;
    }
    return true;
}
// Remove the error message for required input
$(".form-control").on("change", (event) => {
    $(`label[for='${event.target.id}']`).removeClass("error");
});
