# Mood Recipe App

A simple and intuitive web application that recommends recipes based on your current mood. Built with Node.js, Express, SQLite, and a clean frontend using HTML, CSS (Tailwind), and vanilla JavaScript.

## Features

🎯 **Mood-Based Recommendations**: Choose from 5 different moods (Happy, Sad, Energetic, Calm, Adventurous) to get personalized recipe suggestions

🍽️ **Rich Recipe Database**: Pre-loaded with diverse recipes matching different moods and preferences

🎲 **Random Selection**: Get a new recipe suggestion for the same mood with the click of a button

📱 **Responsive Design**: Beautiful, mobile-friendly interface using Tailwind CSS

⚡ **Fast & Lightweight**: Simple architecture with SQLite database for quick response times

🎨 **Intuitive UI**: Clean design with mood-specific colors and smooth animations

## Moods & Recipe Types

- **😊 Happy**: Bright and cheerful recipes (pancakes, fruit salads)
- **😢 Sad**: Comfort foods to lift your spirits (mac & cheese, cookies)
- **⚡ Energetic**: Power-packed, nutritious meals (smoothie bowls, stir-fries)
- **🧘 Calm**: Soothing and peaceful dishes (chamomile cookies, lavender lemonade)
- **🌟 Adventurous**: Exotic and bold flavors (fusion tacos, Moroccan spiced chicken)

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: SQLite3
- **Frontend**: HTML5, Vanilla JavaScript, Tailwind CSS
- **Styling**: Tailwind CSS via CDN

## Installation & Setup

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
mood-recipe-app/
├── server.js              # Express server and API routes
├── package.json           # Dependencies and scripts
├── recipes.db            # SQLite database (auto-created)
└── public/               # Static frontend files
    ├── index.html        # Main HTML file
    └── js/
        └── app.js        # Frontend JavaScript
```

## API Endpoints

- `GET /api/recipe/:mood` - Get a random recipe for the specified mood
- `GET /api/moods` - Get list of available moods
- `GET /` - Serve the main application

## Usage

1. **Select Your Mood**: Click on one of the five mood buttons on the homepage
2. **View Recipe**: See your personalized recipe with ingredients and instructions
3. **Try Another**: Click "Try Another Recipe" to get a different recipe for the same mood
4. **Change Mood**: Click "Choose Different Mood" to go back and select a different mood

## Keyboard Shortcuts

- **1-5**: Quick select moods (when on mood selection screen)
- **R**: Get new recipe (when viewing a recipe)
- **Escape**: Return to mood selection

## Database Schema

The app uses a simple SQLite database with one table:

```sql
CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mood TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    prep_time TEXT,
    description TEXT
);
```

## Customization

### Adding New Recipes

You can add new recipes by inserting them into the SQLite database or by modifying the seed data in `server.js`.

### Styling

The app uses Tailwind CSS. You can customize colors and styling by modifying the Tailwind config in the HTML file or adding custom CSS.

### New Moods

To add new moods:
1. Add recipes with the new mood to the database
2. Update the frontend HTML to include the new mood button
3. Add appropriate styling for the new mood

## Development

### Running in Development Mode

```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

### Dependencies

- **express**: Web application framework
- **sqlite3**: SQLite database driver
- **cors**: Cross-origin resource sharing middleware
- **nodemon**: Development dependency for auto-restart

## License

MIT License - feel free to modify and use for your own projects!

## Contributing

Feel free to submit issues and enhancement requests. This is a simple project perfect for learning or as a starting point for more complex applications.

---

Made with ❤️ for food lovers everywhere! 🍽️