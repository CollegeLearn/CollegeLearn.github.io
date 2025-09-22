document.getElementById('csvFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                renderTable(results.data);
            }
        });
    }
});

// Option B: If loading CSV from repo
/*
function loadCSVFromRepo() {
    Papa.parse('universities.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            renderTable(results.data);
        }
    });
}
*/

function renderTable(data) {
    const table = document.getElementById('dataTable');
    table.innerHTML = '';

    if (!data.length) {
        table.innerHTML = '<tr><td>No data loaded.</td></tr>';
        return;
    }

    // Build table header
    const header = Object.keys(data[0]);
    let thead = '<tr>' + header.map(col => `<th>${col}</th>`).join('') + '</tr>';
    // Build table body
    let tbody = data.map(row => 
        '<tr>' + header.map(col => `<td>${row[col]}</td>`).join('') + '</tr>'
    ).join('');
    table.innerHTML = thead + tbody;
}

