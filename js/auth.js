// Setup Database Store for Old Student Demo Record
if (!localStorage.getItem('oldStudentProfile')) {
    const oldStudent = {
        name: "Rahul Sharma",
        rollNo: "22CSE104",
        password: "123456",
        email: "rahul.sharma@college.edu",
        course: "B.Tech (CSE)",
        semester: "3th Current",
        cgpa: "8.4",
        creditsEarned: "64",
        examFeeStatus: "PAID",
        tuitionFeeStatus: "PENDING"
    };
    localStorage.setItem('oldStudentProfile', JSON.stringify(oldStudent));
}

// Function to handle layout switching between Login & Signup tabs
function switchForm(formId, btn) {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.toggle-btn').forEach(tBtn => tBtn.classList.remove('active'));
    document.getElementById(formId).classList.add('active');
    btn.classList.add('active');
}

// Handler for authentication validation (Works for both old & new inputs)
function handleLogin(event) {
    event.preventDefault();
    const inputRoll = document.getElementById('loginId').value.trim();
    const inputPass = document.getElementById('loginPass').value;

    const oldStudent = JSON.parse(localStorage.getItem('oldStudentProfile'));
    const newStudent = JSON.parse(localStorage.getItem('newStudentProfile'));

    // 1. Match against hardcoded template old student
    if (oldStudent && inputRoll === oldStudent.rollNo && inputPass === oldStudent.password) {
        localStorage.setItem('studentProfile', JSON.stringify(oldStudent));
        alert("Login Successful! Welcome back Rahul.");
        window.location.href = "dashboard.html";
        return;
    }

    // 2. Match against form-submitted dynamic new student
    if (newStudent && inputRoll === newStudent.rollNo && inputPass === newStudent.password) {
        localStorage.setItem('studentProfile', JSON.stringify(newStudent));
        alert(`Login Successful! Welcome ${newStudent.name}.`);
        window.location.href = "dashboard.html";
        return;
    }

    alert("❌ Invalid Roll Number or Password!");
}

// Handler for storing web form dynamic inputs into browser storage database
function handleSignup(event) {
    event.preventDefault();

    // Reading values directly typed by user on web screen input fields
    const name = document.getElementById('newName').value;
    const email = document.getElementById('newEmail').value;
    const course = document.getElementById('newCourse').value;
    const pass = document.getElementById('newPass').value;

    // Generate fresh dynamic identifier roll
    const generatedRoll = "26REG" + Math.floor(100 + Math.random() * 900);

    // Auto dynamic tuition structure assignment mapping
    let tuitionFee = "₹60,000";
    if (course.includes("B.Tech")) tuitionFee = "₹85,000";
    if (course.includes("Data Science")) tuitionFee = "₹70,000";

    // Creating profile state mapping user input properties
    const newStudent = {
        name: name,
        rollNo: generatedRoll,
        password: pass,
        email: email,
        course: course,
        semester: "1st Sem (New Admission)",
        cgpa: "N/A",
        creditsEarned: "0",
        examFeeStatus: "PENDING",
        tuitionFeeStatus: "PENDING",
        tuitionFeeValue: tuitionFee
    };

    // Storing data securely under user instance workspace
    localStorage.setItem('newStudentProfile', JSON.stringify(newStudent));
    localStorage.setItem('studentProfile', JSON.stringify(newStudent));

    // UI screen rendering toggle transformations execution
    document.getElementById('login-box').classList.remove('active');
    document.getElementById('signup-box').classList.remove('active');
    document.getElementById('toggleContainer').style.display = 'none';

    // Display thank you context output data fields
    document.getElementById('regRollNo').innerText = generatedRoll;
    document.getElementById('regPassword').innerText = pass;

    document.getElementById('success-screen').style.display = 'block';
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}
