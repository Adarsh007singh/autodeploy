#!/bin/bash

# Run this script one time on your AWS EC2 Ubuntu server.
# Example:
# chmod +x scripts/setup-ec2.sh
# ./scripts/setup-ec2.sh

set -e

APP_DIR="/var/www/react-app"
DOMAIN_OR_IP="_"

sudo apt-get update
sudo apt-get install -y nginx

sudo mkdir -p "$APP_DIR"
sudo chown -R $USER:$USER "$APP_DIR"

sudo tee /etc/nginx/sites-available/react-app > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN_OR_IP;

    root $APP_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/react-app
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl restart nginx

echo "EC2 setup completed. Deploy path: $APP_DIR"
