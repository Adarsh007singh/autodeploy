# React AWS EC2 Auto Deploy Project

Ye project GitHub Actions ke through AWS EC2 server par automatically deploy hota hai.

## 1. Local setup

```bash
npm install
npm run dev
```

Build test:

```bash
npm run build
```

## 2. EC2 one-time setup

AWS EC2 Ubuntu server me login karein:

```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

Nginx setup ke liye:

```bash
sudo apt-get update
sudo apt-get install -y nginx
sudo mkdir -p /var/www/react-app
sudo chown -R ubuntu:ubuntu /var/www/react-app
```

Nginx config create karein:

```bash
sudo nano /etc/nginx/sites-available/react-app
```

Paste this:

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/react-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site:

```bash
sudo ln -sf /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/react-app
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## 3. GitHub Secrets add karein

GitHub repository me:

`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Add these secrets:

| Secret Name | Example Value |
|---|---|
| `EC2_HOST` | `13.201.xxx.xxx` |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Your full `.pem` private key content |
| `EC2_APP_DIR` | `/var/www/react-app` |

## 4. Deploy kaise hoga?

Jab bhi aap `main` branch par push karenge:

```bash
git add .
git commit -m "deploy react app"
git push origin main
```

GitHub Actions automatically:

1. Code checkout karega
2. Node install karega
3. React app build karega
4. `dist` folder EC2 server me copy karega
5. Nginx reload karega

## 5. Important AWS Security Group

EC2 Security Group me ye ports open hone chahiye:

- SSH: `22`
- HTTP: `80`
- HTTPS: `443` if SSL use karna hai

## 6. Common issues

### Permission denied

Check karein:

```bash
chmod 400 your-key.pem
```

Aur GitHub Secret `EC2_SSH_KEY` me private key ka full content hona chahiye:

```text
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
```

ya

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

### Website blank aa rahi hai

Nginx config me ye line honi chahiye:

```nginx
try_files $uri $uri/ /index.html;
```
