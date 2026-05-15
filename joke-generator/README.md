# Random Joke Generator 😂

A fun, interactive web application that generates random jokes from external APIs. Built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Core Features:**
- 🎲 Get random jokes with one click
- 📂 Filter by category (Any, General, Programming, Knock-Knock)
- 📋 Copy jokes to clipboard
- 📤 Share jokes on social media
- 📊 Track total jokes generated
- 🎨 Beautiful, responsive UI
- ⚡ Fast loading with fallback APIs
- 🔄 Handles API failures gracefully

## APIs Used

1. **JokeAPI** (Primary)
   - URL: `https://v2.jokeapi.dev/joke/{category}`
   - Supports both single and two-part jokes
   - Multiple categories

2. **Official Joke API** (Fallback)
   - URL: `https://official-joke-api.appspot.com/jokes/{category}/random`
   - Reliable backup source
   - Always returns valid jokes

## How to Use

### Option 1: Direct File Access
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click "Get Joke" to fetch a random joke

### Option 2: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server)
npx http-server
```

Then visit `http://localhost:8000`

## Usage Guide

### Get a Joke
- Click the **"Get Joke"** button
- Wait for the joke to load
- A loading spinner shows while fetching

### Select Category
Click any category button to filter jokes:
- **Any**: All joke categories
- **General**: General/wholesome jokes
- **Programming**: Developer and tech jokes
- **Knock-Knock**: Classic knock-knock jokes

### Copy Joke
- Click **"Copy"** to copy the current joke
- The button changes to "Copied!" for 2 seconds
- The joke is now in your clipboard

### Share Joke
- Click **"Share"** to share on social media
- Uses your device's native share menu if available
- Falls back to Twitter share URL

### Track Progress
- The counter at the bottom shows total jokes generated
- Your count is saved in localStorage
- Persists across browser sessions

## Technical Details

### Technologies
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- Fetch API
- LocalStorage API
- Web Share API

### Code Structure

```javascript
// Main functions
getJoke()              // Fetch and display joke
fetchFromJokeAPI()     // Primary API call
fetchFromOfficialAPI() // Fallback API call
displayJoke()          // Render joke on page
copyJoke()             // Copy to clipboard
shareJoke()            // Share functionality
```

### Error Handling
- Graceful fallback between APIs
- User-friendly error messages
- Retry capability
- Console logging for debugging

## Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Features Explained

### Dual API Support
The app tries JokeAPI first, then falls back to Official Joke API if needed. This ensures reliability even if one API is down.

### LocalStorage
Your joke count is saved locally, so it persists across browser sessions.

### Responsive Design
Works beautifully on desktop, tablet, and mobile devices.

### Accessibility
- Keyboard support (Press Enter to get joke)
- Semantic HTML
- Good color contrast
- Touch-friendly buttons

## Example Jokes

**Single-part joke:**
```
Why don't scientists trust atoms?
Because they make up everything!
```

**Two-part joke:**
```
Setup: Why did the programmer quit his job?
Punchline: Because he didn't get arrays!
```

## File Structure

```
joke-generator/
├── index.html      # Main HTML file
├── script.js       # JavaScript logic
├── README.md       # This file
└── API documentation
```

## Customization

### Add More Categories
Edit the `categoryMap` object in `script.js`:

```javascript
const categoryMap = {
    'any': 'Any',
    'general': 'General',
    'programming': 'Programming',
    'knock-knock': 'Knock-knock',
    'custom': 'Custom' // Add new category
};
```

### Change Colors
Edit CSS variables in `<style>` section:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Change these hex codes */
```

### Modify API
Edit the `APIs` object in `script.js` to use different joke APIs.

## API Limits

- **JokeAPI**: 100 requests per hour
- **Official Joke API**: No rate limit (public)

## Troubleshooting

### Jokes not loading?
1. Check your internet connection
2. Clear browser cache
3. Try a different category
4. Check browser console for errors

### Copy not working?
- Your browser may not support clipboard API
- Try manual copy (Ctrl+C / Cmd+C)

### Share not working?
- Not all devices support native share
- Falls back to Twitter share URL

## Future Enhancements

- 🌙 Dark mode toggle
- 🌍 Multi-language support
- 💾 Favorite jokes saved locally
- 📱 Progressive Web App (PWA)
- 🎵 Add sound effects
- 🔐 Rate jokes (like/dislike)
- 📧 Email jokes to friends

## License

MIT License - Feel free to use and modify!

## API Credits

- [JokeAPI](https://jokeapi.dev/) - Comprehensive joke API
- [Official Joke API](https://official-joke-api.appspot.com/) - Simple joke API

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve the UI
- Optimize code

## Author

Created with ❤️ for joke enthusiasts

---

**Made with ❤️ | Enjoy the laughs! 😂**
