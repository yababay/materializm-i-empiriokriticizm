ls -1 .data/*.pdf | while read l
do 
    echo $l
    pdf2txt "$l" > "`echo $l | sed s/pdf/txt/`"
done
