var data = [
    {
        "name":       "Tiger Nixon",
        "position":   "System Architect",
        "salary":     "$3,120",
        "start_date": "2011/04/25",
        "office":     "Edinburgh",
        "extn":       "5421"
    },
    {
        "name":       "Garrett Winters",
        "position":   "Director",
        "salary":     "$5,300",
        "start_date": "2011/07/25",
        "office":     "Edinburgh",
        "extn":       "8422"
    }
]

let actions = {
    showCompanyData: function () {
        var table = $('#myTable').DataTable({
            data: data,
            columns: [
                { title: "Name", data : "name" },
                { title: "Position", data : "position" },
                { title: "Salary", data : "salary" },
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