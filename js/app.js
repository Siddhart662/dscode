// Function to dynamically sum up selected checkbox values
function calculateCredits() {
    let coreCredits = 8; // Pre-loaded checked core courses credits
    let electiveCredits = 0;

    // Find all elective checkboxes currently ticked
    const checkboxes = document.querySelectorAll('.elective-cb');

    checkboxes.forEach(cb => {
        if (cb.checked) {
            electiveCredits += parseInt(cb.getAttribute('data-credits'));
        }
    });

    let total = coreCredits + electiveCredits;

    // Hard check constraint limit validation
    if (total > 24) {
        alert("❌ Upper Bound Error: You cannot exceed the maximum allowance limit of 24 Credits per semester!");
        // Force untick the current option that caused overflow
        event.target.checked = false;
        return;
    }

    // Display updated summation count UI indicator
    document.getElementById('liveCredits').innerText = total;
}

// Function to handle database simulation submission pipeline
function submitSelectedCourses(event) {
    event.preventDefault();

    const totalCredits = parseInt(document.getElementById('liveCredits').innerText);

    // Minimum boundary verification check
    if (totalCredits < 12) {
        alert("⚠️ Lower Bound Error: You must register at least 12 Credits to proceed with semester locking!");
        return;
    }

    // Parse selected subject names list array
    let registeredList = ["Compiler Design", "Computer Networks"];
    const checkboxes = document.querySelectorAll('.elective-cb');
    checkboxes.forEach(cb => {
        if (cb.checked) {
            registeredList.push(cb.getAttribute('data-name'));
        }
    });

    // Save selected data array object locally inside current active user workspace session memory
    localStorage.setItem('selectedSubjects', JSON.stringify(registeredList));
    localStorage.setItem('totalRegisteredCredits', totalCredits);

    alert(`🎉 Success! Your 5th Semester course choices (${totalCredits} Credits) have been securely locked and sent to HOD for final approval.`);

    // Forward pipeline trajectory path to invoice status ledger overview
    window.location.href = "profile.html";
}
