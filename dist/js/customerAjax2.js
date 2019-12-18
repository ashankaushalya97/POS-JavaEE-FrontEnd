$(function () {
    loadCustomers()
});

function loadCustomers() {

    //
    // var http = new XMLHttpRequest();
    //
    //
    // http.onreadystatechange = function () {
    //     if(http.readyState==4 && http.status==200){
    //
    //         var cusotmer = JSON.parse(http.responseText);
    //
    //         for (var i = 0; i <cusotmer.length ; i++) {
    //             var html = '<tr>' +
    //                 '<td>' + cusotmer[i].id+ '</td>' +
    //                 '<td>' + cusotmer[i].name+ '</td>' +
    //                 '<td>' + cusotmer[i].address+ '</td>' +
    //                 '</tr>';
    //             $("#tblCustomer tbody").append(html);
    //
    //         }
    //
    //     }
    // }
    // http.open('GET','http://localhost:8080/context/api/v1/customer',true);
    //
    // http.send();

    var ajaxConfig = {
        method: 'GET',
        url: 'http://localhost:8080/context/api/v1/customer',
        async: true
    };

    $.ajax(ajaxConfig).done(function (customers, status, jqXHR) {

        for (var i = 0; i < customers.length; i++) {
            var html = '<tr>' +
                '<td>' + customers[i].id + '</td>' +
                '<td>' + customers[i].name + '</td>' +
                '<td>' + customers[i].address + '</td>' +
                '<td><i class="fa fa-trash" aria-hidden="true"></i></td>'+
                '</tr>';
            $("#tbl-students tbody").append(html);
        }

    }).fail(function (jqXHR, status, error) {
        console.log(error);
    })


}

$("#add-customer").click(function () {
    var customerId = $("#customer-id").val();
    var customerName = $("#customer-name").val();
    var customerAddress = $("#customer-address").val();


    // var http = new XMLHttpRequest();
    //
    //
    // http.onreadystatechange = function () {
    //     if(http.readyState==4){
    //         if (http.status==201){
    //             $("#tblCustomer tbody tr").remove();
    //             loadCustomers();
    //         }
    //     }else{
    //         console.log("Fail");
    //     }
    // }
    //
    // http.open('POST','http://localhost:8080/context/api/v1/customer',true);
    //
    // http.setRequestHeader("Content-Type","application/json");
    //
    var customer = {
        "id": customerId,
        "name": customerName,
        "address": customerAddress,
    };
    //
    // http.send(JSON.stringify(customer));

    var ajaxConfig = {
        method: 'POST',
        url: 'http://localhost:8080/context/api/v1/customer',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(customer)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        if (jqXHR.readyState == 4) {
            if (jqXHR.status == 201) {
                $("#tbl-students tbody tr").remove();
                loadCustomers();
            }
        } else {
            console.log("Fail");
        }
    });

});

$("#tbl-students tbody ").delegate('tr','click',function () {
    // alert("Table clicked!");
    var $tds = $(this).find('td');
    $("#customer-id").val($tds.eq(0).text());
    $("#customer-name").val($tds.eq(1).text());
    $("#customer-address").val($tds.eq(2).text());
    $("#update-customer").removeAttr('disabled');
});

$("#update-customer").click(function () {
    var customerId = $("#customer-id").val();
    var customerName = $("#customer-name").val();
    var customerAddress = $("#customer-address").val();


    var customer = {
        "id": customerId,
        "name": customerName,
        "address": customerAddress,
    };
    //
    // http.send(JSON.stringify(customer));

    var ajaxConfig = {
        method: 'PUT',
        url: 'http://localhost:8080/context/api/v1/customer',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(customer)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        if (jqXHR.readyState == 4) {
            if (jqXHR.status == 204) {
                $("#tbl-students tbody tr").remove();
                loadCustomers();

                clearNew();

            }
        } else {
            console.log("Fail");
        }
    });


});

$("#btn-clear").click(function () {
    clearNew();
});

function clearNew() {
    $("#customer-id,#customer-name, #customer-address ").val("");
    $("#customer-id , #customer-name , #customer-address").removeClass("invalid");
    // generateId();
    $("#update-customer").attr('disabled','disabled');
}

$("#tbl-students tbody").on('click','tr td i ',function (eventData) {
    // console.log($(this).parent().parent().children().first().text());
    var customerId = $(this).parent().parent().children().first().text();
    eventData.stopPropagation();

    var ajaxConfig = {
        method: 'DELETE',
        url: 'http://localhost:8080/context/api/v1/customer?customerId='+customerId,
        async: true,
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        if (jqXHR.readyState == 4) {
            if (jqXHR.status == 204) {
                $("#tbl-students tbody tr").remove();
                loadCustomers();

                clearNew();

            }
        } else {
            console.log("Fail");
        }
    });
});