document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const activityText = document.getElementById('activity');
    const emojiContainer = document.getElementById('emoji');
    const body = document.body;

    generateBtn.addEventListener('click', function() {
        fetch('https://www.boredapi.com/api/activity')
            .then(response => response.json())
            .then(data => {
                activityText.textContent = data.activity;
                const emoji = getEmojiForActivity(data.activity);
                emojiContainer.textContent = emoji;
                const backgroundColor = getRandomColor();
                body.style.backgroundColor = backgroundColor;
                const textColor = isDarkColor(backgroundColor) ? 'white' : 'black';
                activityText.style.color = textColor;
                toggleButtonColor();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                activityText.textContent = 'Error fetching activity. Please try again later.';
                emojiContainer.textContent = ''; // Clear emoji container in case of error
            });
    });

    function toggleButtonColor() {
        generateBtn.classList.toggle('default-color');
        generateBtn.classList.toggle('changed-color');
    }

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to check if a color is dark
    function isDarkColor(color) {
        // Convert color to RGB
        const rgb = hexToRgb(color);
        // Calculate perceived brightness
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        // Return true if brightness is less than or equal to 128 (considered dark)
        return brightness <= 128;
    }

    // Function to convert hex color to RGB
    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Function to get emoji for a specific activity
    function getEmojiForActivity(activity) {
        // Define mapping of activities to emojis
        const activityEmojis = {
            "Reading": "📚",
            "Cooking": "🍳",
            "Exercise": "🏋️‍♂️",
            "Watching TV": "📺",
            // Add more mappings as needed
        };
        // Check if activity has a corresponding emoji, otherwise return default emoji
        return activityEmojis[activity] || "❓";
    }
});
