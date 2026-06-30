const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/KOTHI/g, 'CHAAPSHALA');
    content = content.replace(/Kothi/g, 'Chaapshala');
    content = content.replace(/kothi/g, 'chaapshala');
    content = content.replace(/A Grand Highway Dhaba/gi, 'School of Swad');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fully rebranded ${file}`);
  }
}
