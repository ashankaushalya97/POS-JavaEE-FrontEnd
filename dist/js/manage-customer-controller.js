$(function () {
    loadCustomers(0);
    intializePagination();
    generateId();
});

function loadCustomers(page) {
    var startingIndex = page * 5;
    $("#tbl-students tbody tr").remove();

    for (var i = startingIndex; i < startingIndex + 5; i++) {
        if (i > customers.length-1) {
            break;
        }
        var html = '<tr>' +
            '<td>' + customers[i].id + '</td>' +
            '<td>' + customers[i].name + '</td>' +
            '<td>' + customers[i].address + '</td>' +
            '<td>' + '<i class="fa fa-trash" aria-hidden="true"></i>' + '</td>' +
            '</tr>';
        $("#tbl-students tbody").append(html);
    }
}
function generateId() {
    var id = 0;

    if(customers.length>0){
        id = parseInt(customers[customers.length-1].id.substr(3,2));
    }
    var oid = null;
    if(0<id && id<10){
        oid = "C00"+(id+1);
    }else if(10<id && id<100){
        oid = "C0"+(id+1);
    }else if(100<id && id<1000){
        oid = "C"+(id+1);
    }
    $("#customer-id").val(oid);
}

function intializePagination() {

    var totalPages = parseInt(customers.length / 5 + (((customers.length % 5) != 0 ? 1 : 0)));
    // console.log("total pages : " + totalPages);
    $(".page-item").remove();

    var html = '<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

    for (var i = 0; i < totalPages; i++) {
        html += '<li class="page-item"><a class="page-link" href="javascript:void(0)">' + (i + 1) + '</a></li>';
    }

    html += '<li class="page-item"><a class="page-link" href="#">&raquo;</a></li>';

    $(".card-footer .pagination").html(html);

    $(".card-footer .pagination .page-item:first-child").click(function () {
        loadCustomers(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadCustomers(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if (number) {
            loadCustomers(number - 1);
        }
    })


}

$("#customer-id , #customer-name , #customer-address").keyup(function () {
    $(this).removeClass("invalid");
});

$("#add-customer").click(function () {

    var customerId = $("#customer-id").val();
    var customerName = $("#customer-name").val();
    var customerAddress = $("#customer-address").val();

    var validate = true;
    if (customerAddress.trim().length == 0 || customerId.trim().length == 0 || customerName.trim().length == 0) {
        $("#customer-id").addClass("invalid");
        $("#customer-name").addClass("invalid");
        $("#customer-address").addClass("invalid");
        validate = false;
        console.log("empty fields");
        alert("You have empty fields!");
        return;
    }
    if (!customerName.match("^[A-Za-z][A-Za-z. ]+$")) {
        alert("invalid customer name");
        $("#customer-name").addClass("invalid");
        $("#customer-name").select();
        validate = false;
        return;
    }
    if (!validate) {
        return;
    }
    customers.push({
        id: customerId,
        name: customerName,
        address: customerAddress
    });
    // loadCustomers(0);

    if (customers.length <= 5) {
        loadCustomers(0);
    }
    intializePagination();
    alert("Mission successfull");
    $("#customer-id,#customer-name, #customer-address ").val("");

});

$("#btn-clear").click(function () {
    $("#customer-id,#customer-name, #customer-address ").val("");
    $("#customer-id , #customer-name , #customer-address").removeClass("invalid");
    $("#update-customer").attr('disabled','disabled');
});

$("#tbl-students tbody").on('click','tr td i ',function () {
    // console.log($(this).parent().parent().children().first().text());
    var id = $(this).parent().parent().children().first().text();
    for (var i=0;i<customers.length;i++){
        if(id==customers[i].id){

            customers.splice(i,1);
        }
    }

    // customers.splice(customers.indexOf('C002'),1);
    intializePagination()
    if(customers.length<=5){
        loadCustomers(0);
    }
    alert("Delete pressed!");
});


$("#tbl-students tbody ").delegate('tr','click',function () {
    // alert("Table clicked!");
    var $tds = $(this).find('td');
    $("#customer-id").val($tds.eq(0).text());
    $("#customer-name").val($tds.eq(1).text());
    $("#customer-address").val($tds.eq(2).text());
    $("#update-customer").removeAttr('disabled');
});

$("#add-new").click(function () {
    clearNew();
});

$("#update-customer").click(function () {
    var id = $("#customer-id").val();

    for (var i = 0; i <customers.length ; i++) {
        if(id===customers[i].id){
            customers[i].name=$("#customer-name").val();
            customers[i].address=$("#customer-address").val();
            break;
        }
    }
    clearNew();
    loadCustomers(0);
});

function clearNew() {
    $("#customer-id,#customer-name, #customer-address ").val("");
    $("#customer-id , #customer-name , #customer-address").removeClass("invalid");
    generateId();
    $("#update-customer").attr('disabled','disabled');
}


