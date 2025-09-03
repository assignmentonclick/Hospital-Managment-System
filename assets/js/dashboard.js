// Dashboard logic
if (!localStorage.getItem('hmsUser')) {
    window.location.href = 'login.html';
}

const logoutBtn = document.getElementById('logout');
logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('hmsUser');
    window.location.href = 'login.html';
});

// Tab navigation
const sidebarLinks = document.querySelectorAll('.sidebar a');
const tabs = document.querySelectorAll('.tab');

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));
        link.classList.add('active');
        document.querySelector(link.getAttribute('href')).classList.add('active');
    });
});

// Utility functions
function loadData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function renderTable(key, tableBodyId, fields) {
    const data = loadData(key);
    const tbody = document.getElementById(tableBodyId);
    tbody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        fields.forEach(field => {
            const td = document.createElement('td');
            td.textContent = item[field];
            row.appendChild(td);
        });
        const actionTd = document.createElement('td');
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.className = 'btn';
        btn.addEventListener('click', () => {
            const arr = loadData(key);
            arr.splice(index, 1);
            saveData(key, arr);
            renderTable(key, tableBodyId, fields);
        });
        actionTd.appendChild(btn);
        row.appendChild(actionTd);
        tbody.appendChild(row);
    });
}

// Patients
const patientForm = document.getElementById('patient-form');
patientForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = loadData('patients');
    data.push({
        name: document.getElementById('patient-name').value,
        age: document.getElementById('patient-age').value,
        gender: document.getElementById('patient-gender').value
    });
    saveData('patients', data);
    renderTable('patients', 'patient-table', ['name','age','gender']);
    patientForm.reset();
});
renderTable('patients', 'patient-table', ['name','age','gender']);

// Doctors
const doctorForm = document.getElementById('doctor-form');
doctorForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = loadData('doctors');
    data.push({
        name: document.getElementById('doctor-name').value,
        speciality: document.getElementById('doctor-speciality').value
    });
    saveData('doctors', data);
    renderTable('doctors', 'doctor-table', ['name','speciality']);
    doctorForm.reset();
});
renderTable('doctors', 'doctor-table', ['name','speciality']);

// Appointments
const appointmentForm = document.getElementById('appointment-form');
appointmentForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = loadData('appointments');
    data.push({
        patient: document.getElementById('appointment-patient').value,
        doctor: document.getElementById('appointment-doctor').value,
        date: document.getElementById('appointment-date').value
    });
    saveData('appointments', data);
    renderTable('appointments', 'appointment-table', ['patient','doctor','date']);
    appointmentForm.reset();
});
renderTable('appointments', 'appointment-table', ['patient','doctor','date']);
