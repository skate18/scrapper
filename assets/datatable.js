let actions = {
    showCompanyData: function () {
        var table = $('#myTable').DataTable({
            ajax: {
                url: '/companies',
                dataSrc: ''
            },
            columns: [
                { title: "Name", data : "name" },
                { title: "Registration Code", data : "registrationCode" },
                { title: "Address", data : "address" },
                {
                    title: 'Actions',
                    render: (data, type, row) => {
                        return `<span role="button" class='p-2 mr-1 edit' data-id='${row.id}' title='Edit'><i class="fas fa-edit"></i></span>
                                <span role="button" class='p-2 delete' data-id='${row.id}' title='Delete'><i class="fas fa-trash"></i></span>`;
                    },
                    orderable: false
                }
            ],
            destroy: true,
        });
    },
    scrape: function () {
        $('body').on('click', '#scrape', function(){
            console.log('CLicked for scraping');
        });
    },
    addTestData: function () {
        $('body').on('click', '#add-test-data', function(){
            $.ajax({
                url: '/companies/create',
                type: 'POST',
                success: function(response) {
                    if(response.success){
                        actions.showCompanyData();
                    }else{
                        actions.showErrorMessage();
                    }
                }
            });
        });
    },
    delete: function () {
        $('body').on('click', '.delete', function(){
            let id  = $(this).data('id');
            if(confirm("Are you sure you want to permanently delete this data?")){
                $.ajax({
                    url: '/companies/' + id +'/delete',
                    type: 'POST',
                    success: function(response) {
                        if(response.success){
                            actions.showCompanyData();
                            iziToast.success({
                                title: 'Success',
                                message: 'Company data has been deleted successfully',
                                position: 'topCenter'
                            });
                        }else{
                            actions.showErrorMessage();
                        }
                    }
                });
            }
        });
    },
    showErrorMessage: function () {
        iziToast.error({
            title: 'Error',
            message: 'An error has occurred. Please try again later.',
            position: 'topCenter'
        });
    },
}; // END actions

$(function() {
    actions.showCompanyData();
    actions.scrape();
    actions.addTestData();
    actions.delete();
});