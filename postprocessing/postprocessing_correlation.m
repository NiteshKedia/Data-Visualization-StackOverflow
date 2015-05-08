% correlationForQuarter2 = correlationForQuarter2+correlationForQuarter1;
% correlationForQuarter3= correlationForQuarter3 + correlationForQuarter2;
% correlationForQuarter4= correlationForQuarter4 + correlationForQuarter3;
% correlationForQuarter5= correlationForQuarter5 + correlationForQuarter4;
% correlationForQuarter6= correlationForQuarter6 + correlationForQuarter5;
% correlationForQuarter7= correlationForQuarter7 + correlationForQuarter6;
% correlationForQuarter8= correlationForQuarter8 + correlationForQuarter7;
% correlationForQuarter9= correlationForQuarter9 + correlationForQuarter8;
% correlationForQuarter10= correlationForQuarter10 + correlationForQuarter9;
% correlationForQuarter11= correlationForQuarter11 + correlationForQuarter10;
% correlationForQuarter12= correlationForQuarter12 + correlationForQuarter11;
% correlationForQuarter13= correlationForQuarter13 + correlationForQuarter12;
% correlationForQuarter14= correlationForQuarter14 + correlationForQuarter13;
% correlationForQuarter15= correlationForQuarter15 + correlationForQuarter14;
% correlationForQuarter16= correlationForQuarter16 + correlationForQuarter15;
% correlationForQuarter17= correlationForQuarter17 + correlationForQuarter16;

% m = max(abs(correlationForQuarter1), [], 2);B = bsxfun(@rdivide, correlationForQuarter1, m);correlationForQuarter1 = B;
% m = max(abs(correlationForQuarter2), [], 2);B = bsxfun(@rdivide, correlationForQuarter2, m);correlationForQuarter2 = B;
% m = max(abs(correlationForQuarter3), [], 2);B = bsxfun(@rdivide, correlationForQuarter3, m);correlationForQuarter3 = B;
% m = max(abs(correlationForQuarter4), [], 2);B = bsxfun(@rdivide, correlationForQuarter4, m);correlationForQuarter4 = B;
% m = max(abs(correlationForQuarter5), [], 2);B = bsxfun(@rdivide, correlationForQuarter5, m);correlationForQuarter5 = B;
% m = max(abs(correlationForQuarter6), [], 2);B = bsxfun(@rdivide, correlationForQuarter6, m);correlationForQuarter6 = B;
% m = max(abs(correlationForQuarter7), [], 2);B = bsxfun(@rdivide, correlationForQuarter7, m);correlationForQuarter7 = B;
% m = max(abs(correlationForQuarter8), [], 2);B = bsxfun(@rdivide, correlationForQuarter8, m);correlationForQuarter8 = B;
% m = max(abs(correlationForQuarter9), [], 2);B = bsxfun(@rdivide, correlationForQuarter9, m);correlationForQuarter9 = B;
% m = max(abs(correlationForQuarter10), [], 2);B = bsxfun(@rdivide, correlationForQuarter10, m);correlationForQuarter10 = B;
% m = max(abs(correlationForQuarter11), [], 2);B = bsxfun(@rdivide, correlationForQuarter11, m);correlationForQuarter11 = B;
% m = max(abs(correlationForQuarter12), [], 2);B = bsxfun(@rdivide, correlationForQuarter12, m);correlationForQuarter12 = B;
% m = max(abs(correlationForQuarter13), [], 2);B = bsxfun(@rdivide, correlationForQuarter13, m);correlationForQuarter13 = B;
% m = max(abs(correlationForQuarter14), [], 2);B = bsxfun(@rdivide, correlationForQuarter14, m);correlationForQuarter14 = B;
% m = max(abs(correlationForQuarter15), [], 2);B = bsxfun(@rdivide, correlationForQuarter15, m);correlationForQuarter15 = B;
% m = max(abs(correlationForQuarter16), [], 2);B = bsxfun(@rdivide, correlationForQuarter16, m);correlationForQuarter16 = B;
% m = max(abs(correlationForQuarter17), [], 2);B = bsxfun(@rdivide, correlationForQuarter17, m);correlationForQuarter17 = B;

result = cell(0,4);

% [tf,loc] = ismember(tags,toptags);
% [~,p] = sort(loc(tf));
% idx = find(tf);
% idx = idx(p);

for i = 1:17
    i
    eval(['current = correlationForQuarter' num2str(i) ';']);
   for j=1:400
       index  = find(ismember(tags,toptags(j)));
       [xsorted is] = sort(current(index,:),'descend');
       count=0;
       k=1;
       while(count<10)
          
          if(~isempty(find(idx==is(k), 1)))
              count=count+1;
              [x,y,z]= find(xsorted(k));
              result = [result ; {i,toptags(j),tags(is(k)), xsorted(k)}];
          end
          k=k+1;
       end
   end
end

  