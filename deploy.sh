cd /root/vostokved/
cd react-app
npm run build
cd ..
cd images
../minify_images.sh
cd ..
echo "minified"
sudo cp -r images /var/www/react-app/
echo "copied images"
sudo cp -r react-app/dist/* /var/www/react-app/
echo "copied build"
echo "Done!"
