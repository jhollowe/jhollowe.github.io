shopt -s extglob
for i in *!(_tn).jpg; do
  ffmpeg -i $i -vf scale=300:-1 -y ${i%.*}_tn.jpg
done
