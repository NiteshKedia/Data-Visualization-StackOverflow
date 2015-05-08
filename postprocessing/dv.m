% avg = mean(A,1);
% 
% for i = 1:size(A,2)
%     A(:,i) = A(:,i)/avg(i);
% end

C_s = correlationForQuarter1;
S_s = sparse(size(C_s,2),size(C_s,2));
for i = 1:size(C_s,2)
    i
    for j = i+1:size(C_s,2)
        S_s(i,j) = C_s(i,j)/(C_s(i,i) + C_s(j,j) - C_s(i,j));
        S_s(i,j) = S_s(j,i);
    end
end

mag_s = sqrt(sum(S_s.^2,2));
SC_s = S_s*S_s';
for i = 1:size(C_s,2)
    for j = 1:size(C_s,2)
        SC_s(i,j) = SC_s(i,j)/(mag_s(i)*mag_s(j));
    end
end