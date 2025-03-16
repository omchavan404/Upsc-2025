document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('progress-form');
    const dailyProgress = document.getElementById('daily-progress');
    const motivationalQuote = document.getElementById('motivational-quote');
    const timer = document.getElementById('timer');

    const quotes = [
        "The best way to predict the future is to create it.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "Don't wait for the opportunity. Create it.",
        "The secret of getting ahead is getting started."
    ];

    const examDate = new Date('2025-05-25');
    const today = new Date();
    const diffTime = Math.abs(examDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    timer.textContent = Countdown: ${diffDays} days;

    motivationalQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const time = document.getElementById('time').value;

        fetch('/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject, time }),
        })
        .then(response => response.json())
        .then(data => {
            dailyProgress.textContent = Daily Progress: ${data.dailyProgress}%;
            updateCharts();
        });
    });

    function updateCharts() {
        // Fetch data and update charts
    }
});