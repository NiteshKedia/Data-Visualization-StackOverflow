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
   tagname1 = curtags(2:end);
   a=find(ismember(tags,tagname1));
%    [p,q] = meshgrid(a,a);
%     pairs = [p(:) q(:)];
    
    for j=1:length(a)
        for k=j:length(a)
            currentmatrix(a(j),a(k)) = currentmatrix(a(j),a(k))+1;
            currentmatrix(a(k),a(j)) = currentmatrix(a(k),a(j))+1;
        end
    end
   
end