while (inotifywait -r -e modify,create,delete ./) > /dev/null; do
  rsync -r . access:~/public_html
done
