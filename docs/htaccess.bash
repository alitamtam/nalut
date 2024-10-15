# Enable the RewriteEngine module

RewriteEngine On

# Redirect HTTP to HTTPS

RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect to www

RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteRule ^ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Serve static files

RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

# Proxy requests to Node.js for API

RewriteCond %{REQUEST_URI} ^/api/ [NC]
RewriteRule ^ http://localhost:3000%{REQUEST_URI} [P,L]

# Proxy other requests to the Node.js app

RewriteCond %{HTTP_HOST} ^(www\.)?edulibya.ly$
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# CORS Headers

<IfModule mod_headers.c>
  SetEnvIf Origin "https?://(www\.)?(edulibya\.ly)$" AccessControlAllowOrigin=$0
  Header set Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header set Access-Control-Allow-Headers "X-Requested-With, Content-Type, Origin, Authorization"
</IfModule>

# Security Headers

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Content-Security-Policy "default-src 'self'; img-src 'self' data:;"
</IfModule>

# Cache static assets

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
</IfModule>

# Handle missing pages

ErrorDocument 404 /404.html

# Fallback for all other requests (Single Page App support)

RewriteCond %{REQUEST_URI} !^/api/ [NC]
RewriteRule ^ /index.html [L]
