cur = 1;

for i=1:length(poststags)
    if(mod(i,10000)==0)
        display(i);
    end
     x=char(poststags(i));
   curtags = strsplit(x(1:end-1),',');
   if(~strcmp(cell2mat(curtags(1)),num2str(cur)))
       if(cell2mat(curtags(1)) < cur)
           display('MISMATCH');
           display(i);
       end
       cur = str2double(cell2mat(curtags(1)));
   end
end