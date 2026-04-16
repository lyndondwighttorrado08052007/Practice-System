let students = JSON.parse(localStorage.getItem("students")) || [];

/* LOGIN */
function login() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if (u === "admin" && p === "1234") {
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
        render();
    } else {
        alert("Wrong login");
    }
}

/* ADD */
function addStudent() {
    let name = document.getElementById("name").value;
    let section = document.getElementById("section").value;

    if (!name || !section) return;

    students.push({
        name,
        section,
        status: "Absent"
    });

    save();
    render();
}

/* RENDER */
function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    students.forEach((s, i) => {
        list.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.section}</td>
            <td>
                <span class="badge ${s.status.toLowerCase()}">
                    ${s.status}
                </span>
            </td>
            <td>
                <button onclick="mark(${i},'Present')">P</button>
                <button onclick="mark(${i},'Absent')">A</button>
                <button onclick="del(${i})">Del</button>
            </td>
        </tr>
        `;
    });

    updateDashboard();
    save();
}

/* MARK */
function mark(i, status) {
    students[i].status = status;
    render();
}

/* DELETE */
function del(i) {
    students.splice(i, 1);
    render();
}

/* SEARCH */
function search() {
    let q = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#list tr");

    rows.forEach((row, i) => {
        let name = students[i].name.toLowerCase();
        row.style.display = name.includes(q) ? "" : "none";
    });
}

/* DASHBOARD TABLE */
function updateDashboard() {
    document.getElementById("total").innerText = students.length;
    document.getElementById("present").innerText =
        students.filter(s => s.status === "Present").length;
    document.getElementById("absent").innerText =
        students.filter(s => s.status === "Absent").length;
}

/* SAVE */
function save() {
    localStorage.setItem("students", JSON.stringify(students));
}

render();