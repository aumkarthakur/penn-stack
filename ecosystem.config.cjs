module.exports = {
    apps: [
        {
            name: "penn-stack",
            script: "sh",
            args: "-c 'npm run build && npm start'",
            cwd: "/var/www/html",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};