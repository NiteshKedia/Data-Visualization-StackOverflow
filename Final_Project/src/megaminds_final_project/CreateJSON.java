package megaminds_final_project;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.*;
public class CreateJSON {
	private static String filepath = "../data/extractedUser.txt";
	
	public static void main(String args[]){
		int lineRead = 0;
		JSONArray finalJSON = new JSONArray();
		try {
			BufferedReader br = new BufferedReader(new FileReader(filepath));
			//PrintWriter writer = new PrintWriter("../data/extractedUser.txt");
			String line = null;
			LinkedHashMap<Integer,LinkedHashMap<String,Integer>> data = new LinkedHashMap<Integer,LinkedHashMap<String,Integer>>();
			while ((line = br.readLine()) != null) {
				lineRead++;
				String[] currentUserData = line.split(";");
				String Country = currentUserData[1];
				String CreationDate = currentUserData[2];
				int CreationYear = Integer.parseInt(CreationDate.split("-")[0]);
				if(data.containsKey(CreationYear)){
					LinkedHashMap<String,Integer> userCountCountries = data.get(CreationYear);
					if(userCountCountries.containsKey(Country)){
						userCountCountries.put(Country, userCountCountries.get(Country)+1);						
					}
					else{
						userCountCountries.put(Country, 1);
					}
				}
				else{
					LinkedHashMap<String,Integer> userCountCountries = new LinkedHashMap<String,Integer>();
					userCountCountries.put(Country, 1);
					data.put(CreationYear, userCountCountries);
				}
				
			}
			
			JSONArray finalData = new JSONArray();
			for(Map.Entry<Integer, LinkedHashMap<String,Integer>> entry : data.entrySet()){
				JSONObject curYearData = new JSONObject();
				int curYear = entry.getKey();
				JSONArray countries = new JSONArray();
				LinkedHashMap<String,Integer> userCountCountries = entry.getValue();
				for(Map.Entry<String , Integer> entry1  : userCountCountries.entrySet()){
					JSONObject current = new JSONObject();
					current.put("CountryName", entry1.getKey());
					current.put("NumUsers", entry1.getValue());
					countries.add(current);
				}
				curYearData.put("Year", curYear);
				curYearData.put("Countries", countries);
				finalData.add(curYearData);
			}
			
			FileWriter file = new FileWriter("../data/UserCount.json");
	        try {
	            file.write(finalData.toJSONString());
	            //System.out.println("Successfully Copied JSON Object to File...");
	            //System.out.println("\nJSON Object: " + obj);
	 
	        } catch (IOException e) {
	            e.printStackTrace();
	 
	        }
	        finally {
	            file.close();
	        }
		}
		catch(Exception e) {
		System.out.println(e.toString());
		}
		finally {
			System.out.println(lineRead);
			//System.out.println("HI");
		}
	}

}
