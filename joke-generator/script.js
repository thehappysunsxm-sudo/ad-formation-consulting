let currentJoke = null;
let jokeCount = 0;
let selectedCategory = 'any';

// API endpoints
const APIs = {
    official: 'https://official-joke-api.appspot.com/jokes/{category}/random',
    jokeAPI: 'https://v2.jokeapi.dev/joke/{category}?type=single|twopart',
    rapid: 'https://v2.jokeapi.dev/joke/{category}'
};

// Category mapping
const categoryMap = {
    'any': 'Any',
    'general': 'General',
    'programming': 'Programming',
    'knock-knock': 'Knock-knock'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeCategoryButtons();
    loadJokeCount();
});

// Initialize category buttons
function initializeCategoryButtons() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            buttons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            selectedCategory = e.target.dataset.category;
        });
    });
}

// Get joke from API
async function getJoke() {
    const btn = document.getElementById('getJokeBtn');
    const jokeBox = document.getElementById('jokeBox');
    const errorMsg = document.getElementById('errorMessage');

    // Disable button and show loading
    btn.disabled = true;
    btn.innerHTML = '<div class="loading"></div>';
    errorMsg.classList.remove('show');

    try {
        let joke = null;
        let error = null;

        // Try JokeAPI (more reliable)
        try {
            joke = await fetchFromJokeAPI();
        } catch (e) {
            error = e;
            console.log('JokeAPI failed, trying Official API...');
            try {
                joke = await fetchFromOfficialAPI();
            } catch (e2) {
                error = e2;
            }
        }

        if (joke) {
            currentJoke = joke;
            displayJoke(joke);
            jokeCount++;
            updateJokeCount();
            errorMsg.classList.remove('show');
        } else {
            throw new Error('Could not fetch joke from any API');
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        showError(error.message || 'Failed to fetch joke. Please try again.');
        jokeBox.innerHTML = '<p class="joke-text">😔 Could not load joke. Please try again!</p>';
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Get Joke';
    }
}

// Fetch from JokeAPI
async function fetchFromJokeAPI() {
    let url = 'https://v2.jokeapi.dev/joke/';
    
    if (selectedCategory === 'any') {
        url += 'Any';
    } else if (selectedCategory === 'general') {
        url += 'General';
    } else if (selectedCategory === 'programming') {
        url += 'Programming';
    } else if (selectedCategory === 'knock-knock') {
        url += 'Knock-knock';
    } else {
        url += 'Any';
    }

    const response = await fetch(url + '?type=single,twopart');
    
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
        throw new Error('No jokes available for this category');
    }

    return {
        type: data.type,
        setup: data.setup,
        joke: data.joke,
        punchline: data.delivery,
        category: data.category
    };
}

// Fetch from Official API
async function fetchFromOfficialAPI() {
    const categoryParam = selectedCategory === 'any' ? 'random' : selectedCategory;
    const url = `https://official-joke-api.appspot.com/jokes/${categoryParam}/random`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle array response
    const joke = Array.isArray(data) ? data[0] : data;

    return {
        type: 'twopart',
        setup: joke.setup,
        punchline: joke.punchline,
        joke: joke.joke,
        category: joke.category
    };
}

// Display joke
function displayJoke(joke) {
    const jokeBox = document.getElementById('jokeBox');
    
    if (joke.type === 'single' || joke.joke) {
        // Single part joke
        jokeBox.innerHTML = `<p class="joke-text">${escapeHtml(joke.joke || joke.punchline)}</p>`;
    } else {
        // Two part joke
        jokeBox.innerHTML = `
            <div class="joke-setup">${escapeHtml(joke.setup)}</div>
            <div class="joke-punchline">${escapeHtml(joke.punchline)}</div>
        `;
    }
}

// Show error message
function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
}

// Copy joke to clipboard
function copyJoke() {
    if (!currentJoke) {
        alert('No joke to copy!');
        return;
    }

    let text = '';
    if (currentJoke.type === 'single' || currentJoke.joke) {
        text = currentJoke.joke || currentJoke.punchline;
    } else {
        text = `${currentJoke.setup}\n\n${currentJoke.punchline}`;
    }

    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy joke');
    });
}

// Share joke
function shareJoke() {
    if (!currentJoke) {
        alert('No joke to share!');
        return;
    }

    let text = '';
    if (currentJoke.type === 'single' || currentJoke.joke) {
        text = currentJoke.joke || currentJoke.punchline;
    } else {
        text = `${currentJoke.setup}\n${currentJoke.punchline}`;
    }

    const message = `${text}\n\n😂 Generated by Joke Generator`;

    if (navigator.share) {
        navigator.share({
            title: 'Check out this joke!',
            text: message
        }).catch(err => console.log('Share failed:', err));
    } else {
        // Fallback for browsers that don't support share API
        const encodedMessage = encodeURIComponent(message);
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        window.open(shareUrl, '_blank');
    }
}

// Update joke counter
function updateJokeCount() {
    document.getElementById('jokeCount').textContent = jokeCount;
    localStorage.setItem('jokeCount', jokeCount);
}

// Load joke count from localStorage
function loadJokeCount() {
    const saved = localStorage.getItem('jokeCount');
    if (saved) {
        jokeCount = parseInt(saved);
        document.getElementById('jokeCount').textContent = jokeCount;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Allow Enter key to get joke
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getJoke();
    }
});
