quarter=0;
currentmatrix = zeros(length(tags),length(tags));
flag=0;
for i=1:length(poststags)
    i
   x=char(poststags(i));
   curtags = strsplit(x(1:end-1),',');
   
   if(~strcmp(cell2mat(curtags(1)),num2str(quarter)))
       quarter=str2double(cell2mat(curtags(1)));
       eval(['correlationForQuarter' num2str(str2double(cell2mat(curtags(1)))-1) '=currentmatrix;']);
       %eval(['correlationForQuarter' num2str(cell2mat(curtags(1))) '= correlationForQuarter' num2str(str2num(cell2mat(curtags(1)))-1) ';']);
   end
%    if(str2double(cell2mat(curtags(1)))>1)
%        break;
%    end
   
   for j=2:length(curtags)
       tagname1 = curtags(j);
       tagindex1 = find(ismember(tags,tagname1));
       for k = j+1:length(curtags)
           tagname2 = curtags(k);
           tagindex2 = find(ismember(tags,tagname2));
           currentmatrix(tagindex1,tagindex2) = currentmatrix(tagindex1,tagindex2)+1;
           currentmatrix(tagindex2,tagindex1) = currentmatrix(tagindex2,tagindex1)+1;
       end
       
       
   end
   
end