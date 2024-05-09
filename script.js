document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const activityText = document.getElementById('activity');
    const body = document.body;

    generateBtn.addEventListener('click', function() {
        fetch('https://www.boredapi.com/api/activity')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                activityText.innerHTML = `${data.activity} ${getEmoji(data.type)}`;
                const backgroundColor = getRandomColor();
                body.style.backgroundColor = backgroundColor;
                const textColor = isDarkColor(backgroundColor) ? 'white' : 'black';
                activityText.style.color = textColor;
                toggleButtonColor();
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

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function isDarkColor(color) {
        const rgb = hexToRgb(color);
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness <= 128;
    }

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

    function getEmoji(type) {
        switch (type) {
            case "education":
                return "📚";
            case "recreational":
                return "🎮";
            case "social":
                return "👫";
            case "diy":
                return "🔨";
            case "charity":
                return "❤️";
            case "cooking":
                return "🍳";
            case "relaxation":
                return "😌";
            case "music":
                return "🎵";
            default:
                return "";
        }
    }
});
