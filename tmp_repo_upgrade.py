from pathlib import Path
import re
import shutil
root = Path('.')
curated = root / '50-Days-50-Web-Projects'
renames = {
    '01-TO_DO_LIST': '01-To-Do-List',
    '02-AI Image Classifier': '02-AI-Image-Classifier',
    '03-AstronomyDashboard': '03-Astronomy-Dashboard',
    '04-Weather Forcasting': '04-Weather-Forecasting',
    '05-Placement-Predictor': '05-Placement-Predictor',
    '06-RandomJokeGenerator': '06-Random-Joke-Generator',
    '07-Stock-Profit-Calculator': '07-Stock-Profit-Calculator',
    '08-New-AmazonClone': '08-New-Amazon-Clone',
    '09-Blog Page': '09-Blog-Page',
    '10-Discord project': '10-Discord-Project',
    '11-spotify-clone -project': '11-Spotify-Clone',
    '12-e-commerce_cart': '12-E-Commerce-Cart',
    '13-WebsitePersonalizer': '13-Website-Personalizer',
    '14-Material3Showcase': '14-Material3-Showcase',
    '15-AppPrivacyPolicyGenerator': '15-App-Privacy-Policy-Generator',
    '16-AnalogClock': '16-Analog-Clock',
    '17-3d cards': '17-3D-Cards',
    '18-Animated Searchbar': '18-Animated-Searchbar',
    '19-Animated-cursor': '19-Animated-Cursor',
    '20-color-palette-generator': '20-Color-Palette-Generator',
    '21-ColorPaletteArtGenerator': '21-Color-Palette-Art-Generator',
    '22-Carousel Solar System': '22-Carousel-Solar-System',
    '23-Holo Button': '23-Holo-Button',
    '24-slider box': '24-Slider-Box',
    '25-typewriter': '25-Typewriter',
    '26-Virtual_Piano': '26-Virtual-Piano',
    '27-Data Structures Visualizer': '27-Data-Structures-Visualizer',
    '28-PhysicsBallSimulation': '28-Physics-Ball-Simulation',
    '29-Pokedex': '29-Pokedex',
    '30-Coin Scratch': '30-Coin-Scratch',
    '31-Dice-Roller': '31-Dice-Roller',
    '32-Dining Philosophers Simulation': '32-Dining-Philosophers-Simulation',
    '33-Hurdle_Highway_2D': '33-Hurdle-Highway-2D',
    '34-Stone-Paper-Scissor': '34-Stone-Paper-Scissor',
    '35-RetroHighwayRacer': '35-Retro-Highway-Racer',
    '36-ZEN_TIMER': '36-ZEN-TIMER',
    '37-Pomodoro_Timer': '37-Pomodoro-Timer',
    '38-FocusRoom': '38-FocusRoom',
    '39-EchoNotes': '39-EchoNotes',
    '40-Habit-Tracker-Web-App': '40-Habit-Tracker-Web-App',
    '41-InterviewSimulator': '41-Interview-Simulator',
    '42-BMI_Calculator': '42-BMI-Calculator',
    '43-MorseCodeTranslator': '43-Morse-Code-Translator',
    '44-GitHubPromoMaker': '44-GitHub-Promo-Maker',
    '45-Github-Profile-Battle': '45-GitHub-Profile-Battle',
    '46-Self-Improvement': '46-Self-Improvement',
    '47-ContestTracker': '47-Contest-Tracker',
    '48-Music App': '48-Music-App',
    '49-2048_game': '49-2048-Game',
    '50-Image Search Engine': '50-Image-Search-Engine',
}
for old_name, new_name in renames.items():
    old_path = curated / old_name
    new_path = curated / new_name
    if old_path.exists() and not new_path.exists():
        shutil.copytree(old_path, new_path)
        shutil.rmtree(old_path)

projects = [
    ('01-To-Do-List', 'HTML, CSS, JS', '📝 Productivity'),
    ('02-AI-Image-Classifier', 'API, JavaScript, AI', '🤖 AI Tool'),
    ('03-Astronomy-Dashboard', 'HTML, CSS, JS', '🌌 Dashboard'),
    ('04-Weather-Forecasting', 'API, JavaScript', '🌤️ Weather App'),
    ('05-Placement-Predictor', 'HTML, CSS, JS', '📈 Tool'),
    ('06-Random-Joke-Generator', 'API, JavaScript', '😂 Entertainment'),
    ('07-Stock-Profit-Calculator', 'HTML, CSS, JS', '📊 Finance'),
    ('08-New-Amazon-Clone', 'HTML, CSS, JS', '🛒 E-commerce'),
    ('09-Blog-Page', 'HTML, CSS, JS', '📝 Blog'),
    ('10-Discord-Project', 'HTML, CSS, JS', '💬 Social'),
    ('11-Spotify-Clone', 'HTML, CSS, JS', '🎵 Clone'),
    ('12-E-Commerce-Cart', 'HTML, CSS, JS', '🛒 E-commerce'),
    ('13-Website-Personalizer', 'HTML, CSS, JS', '🌐 Utility'),
    ('14-Material3-Showcase', 'HTML, CSS, JS', '🎨 UI Showcase'),
    ('15-App-Privacy-Policy-Generator', 'HTML, CSS, JS', '📜 Generator'),
    ('16-Analog-Clock', 'HTML, CSS, JS', '⏰ Widget'),
    ('17-3D-Cards', 'HTML, CSS', '🎴 UI Design'),
    ('18-Animated-Searchbar', 'HTML, CSS, JS', '🔍 UI Component'),
    ('19-Animated-Cursor', 'HTML, CSS, JS', '✨ UI Effect'),
    ('20-Color-Palette-Generator', 'HTML, CSS, JS', '🎨 Design Tool'),
    ('21-Color-Palette-Art-Generator', 'HTML, CSS, JS', '🎨 Design Tool'),
    ('22-Carousel-Solar-System', 'HTML, CSS, JS', '🪐 Animation'),
    ('23-Holo-Button', 'HTML, CSS, JS', '✨ UI Component'),
    ('24-Slider-Box', 'HTML, CSS, JS', '🖼️ Slider'),
    ('25-Typewriter', 'HTML, CSS, JS', '⌨️ Animation'),
    ('26-Virtual-Piano', 'HTML, CSS, JS', '🎹 Music'),
    ('27-Data-Structures-Visualizer', 'JavaScript', '📊 Visualizer'),
    ('28-Physics-Ball-Simulation', 'HTML, CSS, JS', '⚽ Simulation'),
    ('29-Pokedex', 'HTML, CSS, JS', '📘 Utility'),
    ('30-Coin-Scratch', 'HTML, CSS, JS', '🪙 Game'),
    ('31-Dice-Roller', 'HTML, CSS, JS', '🎲 Game'),
    ('32-Dining-Philosophers-Simulation', 'JavaScript', '🧠 Strategy Game'),
    ('33-Hurdle-Highway-2D', 'HTML, CSS, JS', '🏁 Game'),
    ('34-Stone-Paper-Scissor', 'HTML, CSS, JS', '✂️ Game'),
    ('35-Retro-Highway-Racer', 'HTML, CSS, JS', '🏎️ Game'),
    ('36-ZEN-TIMER', 'HTML, CSS, JS', '⏱️ Productivity'),
    ('37-Pomodoro-Timer', 'HTML, CSS, JS', '🍅 Productivity'),
    ('38-FocusRoom', 'HTML, CSS, JS', '⏳ Productivity'),
    ('39-EchoNotes', 'HTML, CSS, JS', '📝 Notes App'),
    ('40-Habit-Tracker-Web-App', 'HTML, CSS, JS', '📋 Productivity'),
    ('41-Interview-Simulator', 'JavaScript', '🛠️ Practice Tool'),
    ('42-BMI-Calculator', 'HTML, CSS, JS', '🧮 Health Tool'),
    ('43-Morse-Code-Translator', 'HTML, CSS, JS', '🔡 Converter'),
    ('44-GitHub-Promo-Maker', 'HTML, CSS, JS', '🚀 Generator'),
    ('45-GitHub-Profile-Battle', 'HTML, CSS, JS', '⚔️ GitHub Tool'),
    ('46-Self-Improvement', 'HTML, CSS, JS', '🌱 Productivity'),
    ('47-Contest-Tracker', 'HTML, CSS, JS', '🏆 Tracker'),
    ('48-Music-App', 'HTML, CSS, JS', '🎶 App'),
    ('49-2048-Game', 'HTML, CSS, JS', '🧠 Game'),
    ('50-Image-Search-Engine', 'HTML, CSS, JS', '🔍 Search Tool'),
]
header = '| No | Project Name | Technologies | Type | Demo Link |\n| --- | --- | --- | --- | --- |\n'
rows = [f'| {i:02d} | {name.replace("-", " ")} | {tech} | {category} | [View Demo](https://project-name.vercel.app) |' for i, (name, tech, category) in enumerate(projects, 1)]
new_table = header + '\n'.join(rows) + '\n'
readme_path = root / 'README.md'
readme = readme_path.read_text(encoding='utf-8')
readme = readme.replace('# 🚀 100 Days 100 Web Projects', '# 🚀 50 Days 50 Web Projects')
readme = readme.replace('Welcome to **100 Days 100 Web Projects**! This is a comprehensive collection of **112+ web development projects** ranging from beginner to intermediate level. Our goal is to help developers learn and practice web development through hands-on projects using various technologies.', 'Welcome to **50 Days 50 Web Projects**! This is a curated collection of **50 professional web development projects** selected for portfolio-ready deployment. Each project is focused on clean UI, responsive behavior, and recruiter-friendly functionality.')
readme = readme.replace('**🌐 Visit the Live Website:** [100-days-100-web-project.vercel.app](https://100-days-100-web-project.vercel.app/)', '**🌐 Visit the Live Website:** [50-days-50-web-project.vercel.app](https://50-days-50-web-project.vercel.app/)')
readme = re.sub(r'## 📚 All Projects \(112 Total\)[\s\S]*?### 📊 Project Categories:', '## 📚 All Projects (50 Curated Projects)\n\n<div align="center">\n\n### 🎮 Interactive Demo Available!\n\n**[🌐 Visit Live Website](https://50-days-50-web-project.vercel.app/)** to explore the curated portfolio-ready demos.\n\n</div>\n\n' + new_table + '\n### 📊 Project Categories:', readme)
readme = readme.replace('100-days-100-web-project.vercel.app', '50-days-50-web-project.vercel.app')
readme = readme.replace('100 Days 100 Web Projects', '50 Days 50 Web Projects')
readme = readme.replace('100_days_100_web_project', '50-days-50-web-projects')
readme = readme.replace('100-days-100-web-project', '50-days-50-web-project')
readme = readme.replace('112+ web development projects', '50 professional web development projects')
readme = readme.replace('**🌐 Visit the Live Website:** [50-days-50-web-project.vercel.app](https://50-days-50-web-project.vercel.app/)', '**🌐 Visit the Live Website:** [https://50-days-50-web-project.vercel.app](https://50-days-50-web-project.vercel.app/)')
readme_path.write_text(readme, encoding='utf-8')
files_to_patch = [
    root / 'package.json',
    root / 'package-lock.json',
    root / 'CONTRIBUTING.md',
    root / 'DEPLOYMENT.md',
    root / 'Makefile',
    root / 'Dockerfile',
    root / '404.html',
    root / 'index.js',
    root / 'contributors' / 'contributor.html',
    root / '.github' / 'workflows' / 'auto-comment-on-issue.yml'
]
for path in files_to_patch:
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8')
    text = text.replace('100 Days 100 Web Projects', '50 Days 50 Web Projects')
    text = text.replace('100-days-100-web-project.vercel.app', '50-days-50-web-project.vercel.app')
    text = text.replace('100_days_100_web_project', '50-days-50-web-projects')
    text = text.replace('100-days-100-web-project', '50-days-50-web-project')
    text = text.replace('https://github.com/ChaitanyaSuddamalla/100_days_100_web_project.git', 'https://github.com/chaitanya-suddamalla/50-days-50-web-projects.git')
    text = text.replace('https://github.com/ChaitanyaSuddamalla/100_days_100_web_project', 'https://github.com/chaitanya-suddamalla/50-days-50-web-projects')
    text = text.replace('https://github.com/chaitanya-suddamalla/100_days_100_web_project.git', 'https://github.com/chaitanya-suddamalla/50-days-50-web-projects.git')
    text = text.replace('https://github.com/chaitanya-suddamalla/100_days_100_web_project', 'https://github.com/chaitanya-suddamalla/50-days-50-web-projects')
    text = text.replace('https://github.com/ChaitanyaSuddamalla/100_days_100_web_project', 'https://github.com/chaitanya-suddamalla/50-days-50-web-projects')
    text = text.replace('https://github.com/ChaitanyaSuddamalla/100_days_100_web_project.git', 'https://github.com/chaitanya-suddamalla/50-days-50-web-projects.git')
    text = text.replace('ChaitanyaSuddamalla', 'chaitanya-suddamalla')
    text = text.replace('dhairyagothi', 'chaitanya-suddamalla')
    path.write_text(text, encoding='utf-8')
pkg_path = root / 'package.json'
pkg = pkg_path.read_text(encoding='utf-8')
pkg = pkg.replace('"name": "100-days-100-web-projects"', '"name": "50-days-50-web-projects"')
pkg_path.write_text(pkg, encoding='utf-8')
lock_path = root / 'package-lock.json'
if lock_path.exists():
    lock = lock_path.read_text(encoding='utf-8')
    lock = lock.replace('"name": "100-days-100-web-projects"', '"name": "50-days-50-web-projects"')
    lock_path.write_text(lock, encoding='utf-8')
print('Root repository branding and curated folder updates complete')
