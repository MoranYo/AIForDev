class MoodRecipeApp {
    constructor() {
        this.currentMood = null;
        this.currentRecipe = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showMoodSelection();
    }

    bindEvents() {
        // Mood selection buttons
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mood = e.currentTarget.dataset.mood;
                this.selectMood(mood);
            });
        });

        // New recipe button
        document.getElementById('new-recipe-btn').addEventListener('click', () => {
            if (this.currentMood) {
                this.fetchRecipe(this.currentMood);
            }
        });

        // Back to moods button
        document.getElementById('back-to-moods-btn').addEventListener('click', () => {
            this.showMoodSelection();
        });

        // Retry button for errors
        document.getElementById('retry-btn').addEventListener('click', () => {
            this.hideError();
            if (this.currentMood) {
                this.fetchRecipe(this.currentMood);
            } else {
                this.showMoodSelection();
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.showMoodSelection();
            }
        });
    }

    selectMood(mood) {
        this.currentMood = mood;
        this.fetchRecipe(mood);
    }

    async fetchRecipe(mood) {
        try {
            this.showLoading();
            
            const response = await fetch(`/api/recipe/${mood}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const recipe = await response.json();
            this.currentRecipe = recipe;
            this.displayRecipe(recipe);
            
        } catch (error) {
            console.error('Error fetching recipe:', error);
            this.showError('Failed to fetch recipe. Please try again.');
        }
    }

    displayRecipe(recipe) {
        // Hide other sections
        this.hideAll();
        
        // Update recipe content
        document.getElementById('recipe-name').textContent = recipe.name;
        document.getElementById('recipe-description').textContent = recipe.description;
        document.getElementById('recipe-mood').textContent = this.capitalizeFirst(recipe.mood);
        document.getElementById('recipe-time').querySelector('svg').nextSibling.textContent = ` ${recipe.prep_time}`;
        
        // Update header color based on mood
        const header = document.getElementById('recipe-header');
        header.className = `${this.getMoodHeaderClass(recipe.mood)} text-white p-8`;
        
        // Display ingredients
        const ingredientsList = document.getElementById('recipe-ingredients');
        ingredientsList.innerHTML = '';
        const ingredients = recipe.ingredients.split(',').map(ingredient => ingredient.trim());
        
        ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `
                <svg class="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">${ingredient}</span>
            `;
            ingredientsList.appendChild(li);
        });
        
        // Display instructions
        const instructionsList = document.getElementById('recipe-instructions');
        instructionsList.innerHTML = '';
        const instructions = recipe.instructions.split(/\d+\./).filter(step => step.trim());
        
        instructions.forEach((instruction, index) => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                    ${index + 1}
                </span>
                <span class="text-gray-700">${instruction.trim()}</span>
            `;
            instructionsList.appendChild(li);
        });
        
        // Show recipe container
        document.getElementById('recipe-container').classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Add animation
        this.animateRecipeEntry();
    }

    getMoodHeaderClass(mood) {
        const moodClasses = {
            happy: 'bg-gradient-to-r from-yellow-400 to-orange-400',
            sad: 'bg-gradient-to-r from-blue-400 to-indigo-500',
            energetic: 'bg-gradient-to-r from-red-400 to-pink-500',
            calm: 'bg-gradient-to-r from-green-400 to-teal-500',
            adventurous: 'bg-gradient-to-r from-orange-500 to-red-500'
        };
        return moodClasses[mood] || 'bg-gradient-to-r from-purple-500 to-blue-500';
    }

    animateRecipeEntry() {
        const container = document.getElementById('recipe-container');
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.5s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }

    showMoodSelection() {
        this.hideAll();
        document.getElementById('mood-selection').classList.remove('hidden');
        this.currentMood = null;
        this.currentRecipe = null;
        
        // Add entrance animation for mood buttons
        const buttons = document.querySelectorAll('.mood-btn');
        buttons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                btn.style.transition = 'all 0.3s ease-out';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showLoading() {
        this.hideAll();
        document.getElementById('loading').classList.remove('hidden');
    }

    showError(message) {
        this.hideAll();
        const errorDiv = document.getElementById('error-message');
        const errorText = errorDiv.querySelector('p');
        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    hideError() {
        document.getElementById('error-message').classList.add('hidden');
    }

    hideAll() {
        const sections = [
            'mood-selection',
            'loading', 
            'recipe-container', 
            'error-message'
        ];
        
        sections.forEach(sectionId => {
            document.getElementById(sectionId).classList.add('hidden');
        });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Utility method to get random emoji for different moods
    getMoodEmoji(mood) {
        const moodEmojis = {
            happy: ['😊', '😄', '🌞', '🎉'],
            sad: ['😢', '🤗', '☁️', '💙'],
            energetic: ['⚡', '🔥', '💪', '🚀'],
            calm: ['🧘', '☮️', '🍃', '💚'],
            adventurous: ['🌟', '🗺️', '🎭', '🌮']
        };
        
        const emojis = moodEmojis[mood] || ['🍽️'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new MoodRecipeApp();
    
    // Add some fun interactions
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const mood = e.currentTarget.dataset.mood;
            const emoji = e.currentTarget.querySelector('div:first-child');
            const originalEmoji = emoji.textContent;
            
            // Change emoji on hover for some moods
            const hoverEmojis = {
                happy: '🎉',
                sad: '🤗',
                energetic: '🔥',
                calm: '☮️',
                adventurous: '🗺️'
            };
            
            if (hoverEmojis[mood]) {
                emoji.textContent = hoverEmojis[mood];
                
                e.currentTarget.addEventListener('mouseleave', () => {
                    emoji.textContent = originalEmoji;
                }, { once: true });
            }
        });
    });
    
    // Add a subtle animation to the main title
    const title = document.querySelector('h1');
    title.addEventListener('click', () => {
        title.style.transform = 'scale(1.05)';
        setTimeout(() => {
            title.style.transform = 'scale(1)';
        }, 200);
    });
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Number keys 1-5 to select moods quickly
    const moodKeys = {
        '1': 'happy',
        '2': 'sad', 
        '3': 'energetic',
        '4': 'calm',
        '5': 'adventurous'
    };
    
    if (moodKeys[e.key] && !document.getElementById('mood-selection').classList.contains('hidden')) {
        const moodBtn = document.querySelector(`[data-mood="${moodKeys[e.key]}"]`);
        if (moodBtn) {
            moodBtn.click();
        }
    }
    
    // 'R' key for new recipe
    if (e.key.toLowerCase() === 'r' && !document.getElementById('recipe-container').classList.contains('hidden')) {
        document.getElementById('new-recipe-btn').click();
    }
});