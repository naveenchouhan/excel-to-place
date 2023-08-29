var students = [];
var packages = [];
var ctx = document.getElementById('placementChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: students,
        datasets: [{
            label: 'Package (in Lakhs per annum)',
            data: packages,
            backgroundColor: 'skyblue',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to handle file input
function handleFile(e) {
    var files = e.target.files;
    var f = files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });
        var sheetName = workbook.SheetNames[0];
        var sheet = workbook.Sheets[sheetName];

        // Extract data from the sheet
        var records = XLSX.utils.sheet_to_json(sheet, { header: 'A' });

        // Add the records to the chart
        records.forEach(function (record) {
            var studentName = record.A;
            var companyName = record.B;
            var package = parseFloat(record.C);

            students.push(studentName + ' @ ' + companyName);
            packages.push(package);
        });

        chart.data.labels = students;
        chart.data.datasets[0].data = packages;
        chart.update();
    };

    reader.readAsBinaryString(f);
}
