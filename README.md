#Task Tracker

A to-do list tracker that runs in a browser.

Features

- Add, complete, and delete tasks
- Priority tags — append `!high`, `!med`, or `!low` to any task
- Filter by All / Active / Done
- Progress bar with live completion stats
- Persists to `localStorage` — survives page refresh
- Can press "Enter" to add
  
Usage

```
# Clone the repo
git clone https://github.com/YOUR_USERNAME/todo-tracker.git
cd todo-tracker

# Open in browser (no server needed)
open index.html
```

Or just drag `index.html` into any browser tab.

## Priority Tags

Add a priority label to any task by appending a tag at the end:

```
Fix the login bug !high
Update README !low
Review PR !med
```

## Project Structure

```
todo-tracker/
├── index.html   # Markup & layout
├── style.css    # All styles (dark theme, animations)
├── app.js       # Logic, state, localStorage
└── README.md
```

## Deploy to GitHub Pages

1. Push to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch → `/ (root)`
4. Done — live at `https://Vanshika13-Cloud.github.io/My-Mini-Project`

## License
