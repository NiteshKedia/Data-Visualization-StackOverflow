quarter=0;
correlationForQuarter1 = sparse(length(tags),length(tags));
correlationForQuarter2 = sparse(length(tags),length(tags));
correlationForQuarter3 = sparse(length(tags),length(tags));
correlationForQuarter4 = sparse(length(tags),length(tags));
correlationForQuarter5 = sparse(length(tags),length(tags));
correlationForQuarter6 = sparse(length(tags),length(tags));
correlationForQuarter7 = sparse(length(tags),length(tags));
correlationForQuarter8 = sparse(length(tags),length(tags));
correlationForQuarter19 = sparse(length(tags),length(tags));
correlationForQuarter10 = sparse(length(tags),length(tags));
correlationForQuarter11 = sparse(length(tags),length(tags));
correlationForQuarter12 = sparse(length(tags),length(tags));
correlationForQuarter13 = sparse(length(tags),length(tags));
correlationForQuarter14 = sparse(length(tags),length(tags));
correlationForQuarter15 = sparse(length(tags),length(tags));
correlationForQuarter16 = sparse(length(tags),length(tags));
correlationForQuarter17 = sparse(length(tags),length(tags));
flag=0;
for i=1:length(poststags)
    i
   x=char(poststags(i));
   curtags = strsplit(x(1:end-1),',');
   quarter = curtags(1);
%    if(~strcmp(cell2mat(curtags(1)),num2str(quarter)))
%        quarter=str2double(cell2mat(curtags(1)));
%        eval(['correlationForQuarter' num2str(str2double(cell2mat(curtags(1)))-1) '=currentmatrix;']);
%        %eval(['correlationForQuarter' num2str(cell2mat(curtags(1))) '= correlationForQuarter' num2str(str2num(cell2mat(curtags(1)))-1) ';']);
%    end
%    if(str2double(cell2mat(curtags(1)))>1)
%        break;
%    end
   tagname1 = curtags(2:end);
   a = values(mapObj,curtags(2:end));
   a= cell2mat(a);
%    a=find(ismember(tags,tagname1));
%    [p,q] = meshgrid(a,a);
%     pairs = [p(:) q(:)];
    
    for j=1:length(a)
        for k=j+1:length(a)
            eval(['correlationForQuarter' num2str(str2double(cell2mat(curtags(1)))) '(a(' num2str(j) '),a(' num2str(k) ')) = correlationForQuarter' num2str(str2double(cell2mat(curtags(1)))) '(a(' num2str(j) '),a(' num2str(k) '))+1;']);
            eval(['correlationForQuarter' num2str(str2double(cell2mat(curtags(1)))) '(a(' num2str(k) '),a(' num2str(j) ')) = correlationForQuarter' num2str(str2double(cell2mat(curtags(1)))) '(a(' num2str(k) '),a(' num2str(j) '))+1;']);
%             currentmatrix(a(k),a(j)) = currentmatrix(a(k),a(j))+1;
        end
    end
   
end