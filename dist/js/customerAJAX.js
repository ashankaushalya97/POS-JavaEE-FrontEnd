$(function () {
    loadCustomers(0);
    intializePagination();
});

function loadCustomers(page) {

    $("#tbl-students tbody tr").remove();

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if(http.readyState==4 && http.readyState){

            var customers = JSON.parse(http.responseText);
            console.log(customers.length);
            for (var i=0;i<customers.length;i++){

                var html = "<tr>" +
                    "<td>"+customers[i].id+"</td>" +
                    "<td>"+customers[i].name+"</td>" +
                    "<td>"+customers[i].address+"</td>" +
                    "</tr>";

                $("#tbl-students tbody").append(html);
            }
            intializePagination(parseInt(http.getResponseHeader("X-Count")));
        }
    }

    http.open('GET','http://localhost:8080/context/customer?page='+page,true);

    http.send();

}

function intializePagination(totalCustomers) {


    var totalPages = parseInt(totalCustomers / 5 + (((totalCustomers % 5) != 0 ? 1 : 0)));
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