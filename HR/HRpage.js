var fill = [{
    EmployeeName:'Sanjayan', 
    Position: 'Intern'
   },
   {
    EmployeeName: 'Naveen',
    Position: 'Extern'
   }, 
   {
    EmployeeName: 'Rohit',
    Position: 'People'
   },
];
table = document.getElementById('table');
var cur;
var keys = ['EmployeeName', 'Position'];
for (var i = 0; i < fill.length; i++) {
    var Obj = fill[i];
    var newRow = table.insertRow(table.length);

    cur = fill[i];
    for (var j = 0; j < keys.length; j++) {
        var cell = newRow.insertCell(j);
        cellcontents = Obj[Object.keys(Obj)[j]];
        cell.innerHTML += cellcontents;;
    }
}
function proj() {
    window.location.href = "project.html"
}