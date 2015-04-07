package megaminds_final_project;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.*; 

public class Tags {
	
	private static String filepath = "../../2012-07 Stack Overflow/posts.xml";
	private static String uniqueTagfilepath = "../../2012-07 Stack Overflow/Tags.csv";
	private static String correlatedTagfilepath = "../../2012-07 Stack Overflow/CorrelatedTags.csv";
	
	public static void main(String args[]){
		
		try {
			
			BufferedReader br = new BufferedReader(new FileReader(filepath));
			FileWriter writer = new FileWriter(uniqueTagfilepath);
			FileWriter writer2 = new FileWriter(correlatedTagfilepath);
			LinkedHashMap<String,LinkedHashMap<String,Integer>> tagsCorrelationCount = new LinkedHashMap<String,LinkedHashMap<String,Integer>>();
			int postCount=0;
			String line = null;
			LinkedHashSet<String> uniqueTags = new LinkedHashSet();
			while ((line = br.readLine()) != null) {
			String[] pairs = line.split(" ");
			if(pairs.length > 4) {
				postCount++;
				System.out.println(postCount);
				int PostTypeIdStartIndex = line.indexOf("PostTypeId=");
				int PostTypeIdEndIndex = line.indexOf('"', PostTypeIdStartIndex+12);
				String PostTypeId = line.substring(PostTypeIdStartIndex+12, PostTypeIdEndIndex);
				
				//Processing Date
				DateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
				String Q1 = "2008-07-01";
				int quarter =0;
				int CreationDateStartIndex = line.indexOf("CreationDate=");
				int CreationDateEndIndex = line.indexOf('"', CreationDateStartIndex+14);
				String CreationDate = line.substring(CreationDateStartIndex+14, CreationDateEndIndex);
				Date postDate = format.parse(CreationDate.substring(0, 10));
				//postDate = format.parse("2012-07-30");
				long diff = postDate.getTime() - format.parse(Q1).getTime();
				long diffdays = diff / (24 * 60 * 60 * 1000 ) ;
				long diffQuarters = (diffdays/30 + 1)/3 + 1;
				writer2.append(diffQuarters+",");
				//Processing Tags
				int TagsStartIndex = line.indexOf("Tags=");
				int TagsEndIndex = line.indexOf('"', TagsStartIndex+6);
				String Tags = line.substring(TagsStartIndex+6, TagsEndIndex);
				Pattern pattern = Pattern.compile("&lt;(.*?)&gt;");
			    Matcher matcher = pattern.matcher(Tags);
			    while (matcher.find()) {
			       // System.out.println(matcher.group(1));
			        uniqueTags.add(matcher.group(1));
			        writer2.append(matcher.group(1)+",");
			        
			    }
			    writer2.append("\n");
//				if(postCount >100){
//					break;
//				}
////				if(postDate.after(format.parse(Q16))) {
////				    quarter = 16;
////				}
//				int a=10;
				
				  
			}
			}
			
			Iterator it = uniqueTags.iterator(); // why capital "M"?
			while(it.hasNext()) {
			    writer.append((CharSequence) it.next()+",\n");
			    
			}
			writer.flush();
		    writer.close();
		    
		    writer2.flush();
		    writer2.close();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		finally {
			
		}
	}

}
