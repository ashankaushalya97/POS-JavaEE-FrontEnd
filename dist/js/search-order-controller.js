$(function () {
    loadOrders(0);
});

function loadOrders(page) {;
    $("#tbl-search tbody tr").remove();

    for (var i = 0; i < order2.length; i++) {
        if (i > customers.length-1) {
            break;
        }
        // var html = '<tr>' +
        //     '<td>' + customers[i].id + '</td>' +
        //     '<td>' + customers[i].name + '</td>' +
        //     '<td>' + customers[i].address + '</td>' +
        //     '<td>' + '<i class="fa fa-trash" aria-hidden="true"></i>' + '</td>' +
        //     '</tr>';
        // $("#tbl-students tbody").append(html);

        var orderId = order2[i].orderId;
        var date = order2[i].date;
        var customerId = order2[i].customerId;
        var total;

        for (let j = 0; j <orderDetails.length ; j++) {
            if(orderId===orderDetails[j].orderId){
                total+=parseInt(orderDetails[i].qty)*parseInt(orderDetails[i].unitPrice);
            }
        }

        console.log(orderId);
        console.log(date);
        console.log(customerId);
        console.log(total);


    }
}