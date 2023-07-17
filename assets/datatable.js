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
                        return `<span role="button" class='p-2 mr-1 item-show' data-id='${row.id}' title='View'><i class="fas fa-eye"></i></span>
                                <span role="button" class='p-2 mr-1 item-edit' data-id='${row.id}' title='Edit'><i class="fas fa-edit"></i></span>
                                <span role="button" class='p-2 item-delete' data-id='${row.id}' title='Delete'><i class="fas fa-trash"></i></span>`;
                    },
                    orderable: false
                }
            ],
            destroy: true,
        });
    },
    scrape: function () {
        $('body').on('click', '#scrape', function(){
            let code = $('#registration_code').val();

            if(code == ''){
                iziToast.error({
                    title: 'Error',
                    message: 'Please enter registration code.',
                    position: 'topCenter'
                });
                return false;
            }else if(code && code.length < 5){ // 9
                iziToast.error({
                    title: 'Error',
                    message: 'Please enter a valid registration code.',
                    position: 'topCenter'
                });
                return false;
            }
            
            $.ajax({
                url: '/scrape',
                type: 'POST',
                data: {code : code},
                success: function(response) {
                    console.log(response);
                    if(response.success){
                        actions.showCompanyData();
                        iziToast.success({
                            title: 'Success',
                            message: 'Data scraped successfully.',
                            position: 'topCenter'
                        });
                    }else{
                        actions.showErrorMessage();
                    }
                }
            });
        });
    },
    show: function () {
        $('body').on('click', '.item-show', function(){
            let id  = $(this).data('id');
            $.ajax({
                url: '/companies/' + id +'/show',
                type: 'POST',
                success: function(response) {
                    if(response.success){
                        $('#scrapper-modal-label').text(TITLE_COMPANY_DETAILS);
                        $('#modal-btn-close').text(BUTTON_OK);
                        $('#modal-btn-update').addClass('d-none');
                        $('#scrapper-modal-content').html(response.html);
                        $('#scrapper-modal').modal('show');
                    }else{
                        actions.showErrorMessage();
                    }
                }
            });
        });
    },
    edit: function () {
        var editId = 0;
        $('body').on('click', '.item-edit', function(){
            editId = $(this).data('id');
            $.ajax({
                url: '/companies/' + editId +'/edit',
                type: 'POST',
                success: function(response) {
                    if(response.success){
                        $('#scrapper-modal-label').text(TITLE_EDIT);
                        $('#modal-btn-update').removeClass('d-none');
                        $('#modal-btn-close').text(BUTTON_CLOSE);
                        $('#scrapper-modal-content').html(response.html);
                        $('#scrapper-modal').modal('show');
                    }else{
                        actions.showErrorMessage();
                    }
                }
            });
        });
        $('body').on('click', '#modal-btn-update', function(){
            let data = {};
            $(".companyData").each(function() {
                data[$(this).attr("id")] = $(this).val();
            });
            $.ajax({
                url: '/companies/' + editId +'/update',
                type: 'POST',
                data: data,
                success: function(response) {
                    if(response.success){
                        actions.showCompanyData();
                        iziToast.success({
                            title: 'Success',
                            message: 'Data updated successfully',
                            position: 'topCenter'
                        });
                    }else{
                        actions.showErrorMessage();
                    }
                }
            });
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
                        iziToast.success({
                            title: 'Success',
                            message: 'Test data added successfully',
                            position: 'topCenter'
                        });
                    }else{
                        actions.showErrorMessage();
                    }
                }
            });
        });
    },
    delete: function () {
        $('body').on('click', '.item-delete', function(){
            let id  = $(this).data('id');
            // instead of this we can also show a bootstrap modal here
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
    actions.show();
    actions.edit();
});
