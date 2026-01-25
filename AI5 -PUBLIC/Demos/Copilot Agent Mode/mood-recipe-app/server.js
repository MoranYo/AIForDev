const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./recipes.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database with recipes table
function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        mood TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        prep_time TEXT,
        description TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            seedDatabase();
        }
    });
}

// Seed database with sample recipes
function seedDatabase() {
    db.get("SELECT COUNT(*) as count FROM recipes", (err, row) => {
        if (err) {
            console.error('Error checking database:', err.message);
            return;
        }
        
        if (row.count === 0) {
            const recipes = [
                // Happy recipes
                {
                    name: "Sunny Pancakes",
                    mood: "happy",
                    ingredients: "2 cups flour, 2 eggs, 1.5 cups milk, 2 tbsp sugar, 1 tsp baking powder, 1/2 tsp salt, 2 tbsp melted butter",
                    instructions: "1. Mix dry ingredients in a bowl. 2. In another bowl, whisk together milk, eggs, and melted butter. 3. Combine wet and dry ingredients. 4. Cook on a griddle over medium heat until bubbles form, then flip.",
                    prep_time: "15 minutes",
                    description: "Fluffy, golden pancakes that will brighten your morning!"
                },
                {
                    name: "Rainbow Fruit Salad",
                    mood: "happy",
                    ingredients: "1 cup strawberries, 1 cup blueberries, 1 cup pineapple chunks, 1 cup grapes, 2 kiwis, 2 oranges, 2 tbsp honey, 1 tbsp lime juice",
                    instructions: "1. Wash and cut all fruits into bite-sized pieces. 2. Combine all fruits in a large bowl. 3. Mix honey and lime juice, then drizzle over fruit. 4. Toss gently and serve chilled.",
                    prep_time: "10 minutes",
                    description: "A vibrant and refreshing fruit salad that's as colorful as your mood!"
                },
                
                // Sad/comfort recipes
                {
                    name: "Creamy Mac and Cheese",
                    mood: "sad",
                    ingredients: "8 oz macaroni pasta, 2 cups sharp cheddar cheese, 1 cup milk, 3 tbsp butter, 3 tbsp flour, 1/2 tsp salt, 1/4 tsp pepper, breadcrumbs",
                    instructions: "1. Cook pasta according to package instructions. 2. In a saucepan, melt butter and whisk in flour. 3. Gradually add milk, whisking constantly. 4. Add cheese and seasonings, stir until melted. 5. Mix with pasta, top with breadcrumbs, and bake at 350°F for 20 minutes.",
                    prep_time: "30 minutes",
                    description: "Ultimate comfort food to warm your heart and soul."
                },
                {
                    name: "Chocolate Chip Cookies",
                    mood: "sad",
                    ingredients: "2 cups flour, 1 cup butter, 3/4 cup brown sugar, 1/2 cup white sugar, 2 eggs, 1 tsp vanilla, 1 tsp baking soda, 1 tsp salt, 2 cups chocolate chips",
                    instructions: "1. Preheat oven to 375°F. 2. Cream butter and sugars. 3. Add eggs and vanilla. 4. Mix in dry ingredients. 5. Fold in chocolate chips. 6. Drop spoonfuls on baking sheet and bake 9-11 minutes.",
                    prep_time: "25 minutes",
                    description: "Warm, gooey cookies that are like a hug in food form."
                },
                
                // Energetic recipes
                {
                    name: "Power Smoothie Bowl",
                    mood: "energetic",
                    ingredients: "1 banana, 1 cup spinach, 1/2 cup berries, 1/2 cup Greek yogurt, 1 tbsp almond butter, 1 tbsp chia seeds, 1/4 cup granola, honey to taste",
                    instructions: "1. Blend banana, spinach, berries, yogurt, and almond butter until smooth. 2. Pour into a bowl. 3. Top with chia seeds, granola, and additional berries. 4. Drizzle with honey if desired.",
                    prep_time: "5 minutes",
                    description: "Packed with nutrients to fuel your active day!"
                },
                {
                    name: "Spicy Stir-Fry",
                    mood: "energetic",
                    ingredients: "1 lb chicken breast, 2 cups mixed vegetables, 2 cloves garlic, 1 tbsp ginger, 2 tbsp soy sauce, 1 tbsp sriracha, 1 tbsp oil, 2 green onions, sesame seeds",
                    instructions: "1. Cut chicken into strips. 2. Heat oil in a wok over high heat. 3. Add chicken and cook until done. 4. Add vegetables, garlic, and ginger. 5. Stir in soy sauce and sriracha. 6. Garnish with green onions and sesame seeds.",
                    prep_time: "20 minutes",
                    description: "A zesty dish that matches your high energy!"
                },
                
                // Calm/relaxed recipes
                {
                    name: "Chamomile Tea Cookies",
                    mood: "calm",
                    ingredients: "2 cups flour, 1/2 cup butter, 1/2 cup sugar, 1 egg, 2 tbsp dried chamomile, 1 tsp vanilla, 1/2 tsp baking powder, 1/4 tsp salt",
                    instructions: "1. Cream butter and sugar. 2. Add egg and vanilla. 3. Mix in dry ingredients and chamomile. 4. Roll into balls and flatten slightly. 5. Bake at 350°F for 12-15 minutes until lightly golden.",
                    prep_time: "30 minutes",
                    description: "Soothing cookies perfect for a peaceful moment."
                },
                {
                    name: "Lavender Honey Lemonade",
                    mood: "calm",
                    ingredients: "4 cups water, 1/2 cup fresh lemon juice, 1/4 cup honey, 2 tbsp dried lavender, ice cubes, lemon slices for garnish",
                    instructions: "1. Steep lavender in 1 cup hot water for 10 minutes, then strain. 2. Mix lavender tea with remaining water, lemon juice, and honey. 3. Chill in refrigerator. 4. Serve over ice with lemon slices.",
                    prep_time: "15 minutes",
                    description: "A refreshing and calming drink to help you unwind."
                },
                
                // Adventurous recipes
                {
                    name: "Korean Beef Tacos",
                    mood: "adventurous",
                    ingredients: "1 lb ground beef, 8 small tortillas, 1/4 cup soy sauce, 2 tbsp brown sugar, 1 tbsp sesame oil, 2 cloves garlic, 1 tsp ginger, 2 cups coleslaw mix, sriracha mayo",
                    instructions: "1. Cook beef with soy sauce, brown sugar, sesame oil, garlic, and ginger. 2. Warm tortillas. 3. Fill tortillas with beef mixture and coleslaw. 4. Top with sriracha mayo and serve immediately.",
                    prep_time: "25 minutes",
                    description: "A fusion of Korean and Mexican flavors for your adventurous palate!"
                },
                {
                    name: "Moroccan Spiced Chicken",
                    mood: "adventurous",
                    ingredients: "4 chicken thighs, 1 tsp cumin, 1 tsp coriander, 1 tsp cinnamon, 1/2 tsp turmeric, 1/2 tsp cayenne, 1 onion, 1/2 cup dried apricots, 1/4 cup almonds, olive oil",
                    instructions: "1. Mix all spices together. 2. Rub spice mixture on chicken. 3. Brown chicken in olive oil. 4. Add sliced onion and cook until soft. 5. Add apricots and almonds. 6. Simmer for 25-30 minutes until chicken is cooked through.",
                    prep_time: "45 minutes",
                    description: "Exotic spices transport you to the markets of Morocco!"
                }
            ];
            
            const insertRecipe = db.prepare(`INSERT INTO recipes (name, mood, ingredients, instructions, prep_time, description) VALUES (?, ?, ?, ?, ?, ?)`);
            
            recipes.forEach(recipe => {
                insertRecipe.run([recipe.name, recipe.mood, recipe.ingredients, recipe.instructions, recipe.prep_time, recipe.description]);
            });
            
            insertRecipe.finalize();
            console.log('Database seeded with sample recipes');
        }
    });
}

// API Routes
app.get('/api/recipe/:mood', (req, res) => {
    const mood = req.params.mood.toLowerCase();
    
    db.all("SELECT * FROM recipes WHERE mood = ? ORDER BY RANDOM() LIMIT 1", [mood], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (rows.length === 0) {
            res.status(404).json({ error: 'No recipes found for this mood' });
            return;
        }
        
        res.json(rows[0]);
    });
});

app.get('/api/moods', (req, res) => {
    db.all("SELECT DISTINCT mood FROM recipes", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const moods = rows.map(row => row.mood);
        res.json(moods);
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});