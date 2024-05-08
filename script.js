document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const activityText = document.getElementById('activity');
    const body = document.body;

    generateBtn.addEventListener('click', function() {
        fetch('https://www.boredapi.com/api/activity')
            .then(response => response.json())
            .then(data => {
                activityText.textContent = data.activity;
                const activityType = getActivityType(data.type);
                const backgroundColor = getRandomColor(activityType);
                body.style.backgroundColor = backgroundColor;
                const textColor = isDarkColor(backgroundColor) ? 'white' : 'black';
                activityText.style.color = textColor;
                toggleButtonColor();
                addEmoji(activityType);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                activityText.textContent = 'Error fetching activity. Please try again later.';
            });
    });

    function toggleButtonColor() {
        generateBtn.classList.toggle('default-color');
        generateBtn.classList.toggle('changed-color');
    }

    // Function to generate a random color based on activity type
    function getRandomColor(activityType) {
        let color = '#';
        switch (activityType) {
            case 'social':
                color = '#FF5733'; // Orange color for social activities
                break;
            case 'education':
                color = '#65C7F7'; // Blue color for education activities
                break;
            case 'recreational':
                color = '#7FFF00'; // Green color for recreational activities
                break;
            case 'diy':
                color = '#FFD700'; // Gold color for DIY activities
                break;
            default:
                color = '#333333'; // Default dark color for unknown activities
                break;
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

    // Function to get the type of activity (social, education, recreational, diy)
    function getActivityType(activityType) {
        return activityType.toLowerCase();
    }

    // Function to add emoji based on activity type
    function addEmoji(activityType) {
        let emoji = '';
        switch (activityType) {
            case 'social':
                emoji = '🎉'; // Party emoji for social activities
                break;
            case 'education':
                emoji = '📚'; // Book emoji for education activities
                break;
            case 'recreational':
                emoji = '⚽'; // Soccer ball emoji for recreational activities
                break;
            case 'diy':
                emoji = '🔨'; // Hammer emoji for DIY activities
                break;
            default:
                emoji = '❓'; // Question mark emoji for unknown activities
                break;
        }
        // Display the emoji next to the activity text
        activityText.textContent += ' ' + emoji;
    }
});
