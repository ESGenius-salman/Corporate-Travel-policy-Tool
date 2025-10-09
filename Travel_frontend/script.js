// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Trip request form submission
    const tripForm = document.getElementById('tripForm');
    tripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const tripData = {
            destination: formData.get('destination'),
            date: formData.get('date'),
            purpose: formData.get('purpose')
        };
        
        // Simulate form submission
        alert(`Trip request submitted!\nDestination: ${tripData.destination}\nDate: ${tripData.date}\nPurpose: ${tripData.purpose}`);
        
        // Reset form
        this.reset();
    });

    // Safety checklist functionality
    const checkboxes = document.querySelectorAll('input[name="safety-item"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('input[name="safety-item"]:checked').length;
            const totalCount = checkboxes.length;
            
            if (checkedCount === totalCount) {
                alert('Safety checklist completed! You\'re ready to travel.');
            }
        });
    });

    // Check-in button functionality
    const checkinBtn = document.querySelector('.checkin-btn');
    const sosBtn = document.querySelector('.sos-btn');
    const lastCheckinElement = document.getElementById('lastCheckin');

    checkinBtn.addEventListener('click', function() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        lastCheckinElement.textContent = `Today ${timeString}`;
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        alert('Check-in successful! Your location has been recorded.');
    });

    sosBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to send an emergency SOS alert?')) {
            alert('Emergency SOS sent! Help is on the way. Stay safe.');
            
            // Change status indicator
            const statusIndicator = document.querySelector('.status-indicator');
            statusIndicator.textContent = 'Emergency Alert Sent';
            statusIndicator.className = 'status-indicator emergency';
            statusIndicator.style.background = '#f8d7da';
            statusIndicator.style.color = '#721c24';
        }
    });

    // File upload functionality
    const fileInput = document.getElementById('receiptFile');
    const uploadLabel = document.querySelector('.upload-label');

    fileInput.addEventListener('change', function() {
        const files = this.files;
        if (files.length > 0) {
            const fileNames = Array.from(files).map(file => file.name).join(', ');
            alert(`Files selected: ${fileNames}`);
            
            // Visual feedback
            uploadLabel.style.background = '#d4edda';
            uploadLabel.style.borderColor = '#27ae60';
            setTimeout(() => {
                uploadLabel.style.background = '#f8f9fa';
                uploadLabel.style.borderColor = '#bdc3c7';
            }, 2000);
        }
    });

    // Drag and drop functionality for file upload
    uploadLabel.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.background = '#e3f2fd';
        this.style.borderColor = '#3498db';
    });

    uploadLabel.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.background = '#f8f9fa';
        this.style.borderColor = '#bdc3c7';
    });

    uploadLabel.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.background = '#f8f9fa';
        this.style.borderColor = '#bdc3c7';
        
        const files = e.dataTransfer.files;
        fileInput.files = files;
        
        if (files.length > 0) {
            const fileNames = Array.from(files).map(file => file.name).join(', ');
            alert(`Files dropped: ${fileNames}`);
        }
    });
});