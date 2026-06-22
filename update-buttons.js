const fs = require('fs');
const path = require('path');

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync('src/app/dashboard', function(filePath) {
    if (filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace View buttons that are missing href or onClick
        content = content.replace(/<Button type="link" icon=\{<EyeOutlined \/>\}>View<\/Button>/g, '<Button type="link" icon={<EyeOutlined />} onClick={() => alert("Feature coming soon in MVP phase.")}>View</Button>');
        content = content.replace(/<Button type="link">View<\/Button>/g, '<Button type="link" onClick={() => alert("Redirecting to detail view...")}>View</Button>');
        content = content.replace(/<Button type="link">Review<\/Button>/g, '<Button type="link" onClick={() => alert("Redirecting to review portal...")}>Review</Button>');
        content = content.replace(/<Button type="link">View Details<\/Button>/g, '<Button type="link" onClick={() => alert("Redirecting to details...")}>View Details</Button>');
        
        // Add onClick to any Button that does not have onClick, htmlType="submit", href
        content = content.replace(/<Button(?![^>]*\bonClick=)(?![^>]*\bhtmlType="submit")(?![^>]*\bhref=)([^>]*)>/g, '<Button$1 onClick={() => alert("Feature coming soon in MVP phase.")}>');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
