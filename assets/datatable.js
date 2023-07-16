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
                    render: (data,type,row) => {
                      return `<span role="button" class='p-2 mr-2 edit' data-id='${row.id}' title='Edit'><i class="fas fa-edit"></i> <span>
                      <span role="button" class='p-2 delete' data-id='${row.id}' title='Delete'><i class="fas fa-trash"></i> <span>`;
                    }
                 }
            ]
        });
         console.log(table);
    },
    scrape: function () {
        $('body').on('click', '#scrape', function(){
            console.log('CLicked for scraping');
        });
    },
    addTestData: function () {
        $('body').on('click', '#add-test-data', function(){
            console.log('CLicked to add test data');
        });
    },
}; // END actions

$(function() {
    actions.showCompanyData();
    actions.scrape();
    actions.addTestData();
});