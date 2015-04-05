package megaminds_final_project;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class ExtractUsersInfo {

	private static int count = 0;
	private static int limitcount =0;
	private static String filepath = "../data/users.xml";
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HashMap<String, String>  countries = getCachedCountries();
		int lineRead = 0;
		try {
			BufferedReader br = new BufferedReader(new FileReader(filepath));
			PrintWriter writer = new PrintWriter("../data/extractedUser.txt");
			String line = null;
			
			while ((line = br.readLine()) != null) {
				lineRead++;
				String[] pairs = line.split(" ");
				if(count >= 5000-1258) {
					System.out.println(lineRead);
					break;
				}
				if(pairs.length > 4) {
					String userId = pairs[3].substring(4, pairs[3].length()-1);
					int locationStartIndex = line.indexOf("Location=");
					int locationEndIndex = line.indexOf('"', locationStartIndex+10);
					String userLocation = line.substring(locationStartIndex+10, locationEndIndex);
					String userCreationDate = pairs[5].substring(14, pairs[5].length()-1);
					//Date date = new Date();
					//System.out.println(userCreationDate);
					if(userLocation.equals("=")) {
						userLocation = "NO_LOCATION";
					}
					else {
						String[]address =  userLocation.split(",");
						boolean flag = false;
						for(String a : address) {
							a = a.trim();
							if(countries.containsKey(a)) {
								flag = true;
								userLocation = countries.get(a);
							}
						}
						if(!flag) {
							userLocation = getLocation(userLocation);
						}
						for(String a : address) {
							countries.put(a.trim(), userLocation);
						}
						writer.println(userId + ";" + userLocation + ";" + userCreationDate);
						writer.flush();
					}
				}
			}
			writer.flush();
			br.close();
			writer.close();
		} catch(Exception e) {
			System.out.println(e.toString());
		}
		finally {
			System.out.println(lineRead);
			writeCachedCountries(countries);
		}
		
	}
	
	static private HashMap<String, String> getCachedCountries() {
		HashMap<String, String> map = new HashMap<>();
		try {
			BufferedReader br = new BufferedReader(new FileReader("../data/cachedCountries.txt"));
			String line = "";
			
			while((line = br.readLine()) != null) {
				String[] values = line.split("|");
				map.put(values[0], values[1]);
			}
			br.close();
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		return map;
	}
	
	static private void writeCachedCountries(HashMap<String, String> map) {
		try {
			PrintWriter writer = new PrintWriter("../data/cachedCountries.txt");
			for(String key : map.keySet()) {
				String value = map.get(key);
				writer.println(key + "|" + value);
			}
			writer.flush();
			writer.close();
		} catch(Exception e) {
			System.out.println(e.toString());
		}
	}
	
	/*static private String stripSpaces(String str) {
		while(str.charAt(0) == ' ') {
			str = str.substring(1, str.length());
		}
		while(str.charAt(str.length()-1) == ' ') {
			str = str.substring(0, str.length()-1);
		}
		return str;
	}*/
	
	static public String getLocation(String location) throws IOException, Exception {
		String[] keys = {"AIzaSyDEHlJ15YyHijq_HSSzAbde4i_Zqq9SX-A", "AIzaSyAtGofwEQndI-3ZtvDWg8rOS0aam1XXpUo"};
		String httpReq = "https://maps.googleapis.com/maps/api/geocode/json?address=";
		String encodedLocation = URLEncoder.encode(location, "UTF-8");
		String urlStr = httpReq + encodedLocation + "&key=";
		count++;
		if(count <= 2500) {
			urlStr = urlStr + keys[1];
		}
		else {
			urlStr = urlStr + keys[0];
		}
		
		
		URL  url = new URL(urlStr);
		InputStream input = null;
		try {
			
			if(limitcount==5){
				try {
				    Thread.sleep(1000);                 //1000 milliseconds is one second.
				    limitcount=0;
				} catch(InterruptedException ex) {
				    Thread.currentThread().interrupt();
				}
			}
			input = url.openStream();
			limitcount++;
			// TODO: Sleep
		}
		catch(Exception  e) {
			System.out.println(e.toString());
		}
		String ret = "NO_LOCATION";
		if(input != null) {
			BufferedReader br = new BufferedReader(new InputStreamReader(input));
			String jsonText = readAll(br);
			JSONParser parser = new JSONParser(); // parser object
			JSONObject json = (JSONObject) parser.parse(jsonText);
			
			String status = (String)json.get("status");
			if(status.equals("OK")) {
				JSONArray resultsArray = (JSONArray)json.get("results");
				JSONObject addressJson = (JSONObject)resultsArray.get(0);
				JSONArray addressArray = (JSONArray)addressJson.get("address_components");
				JSONObject lastJson = (JSONObject)addressArray.get(addressArray.size() - 1);
				ret = (String)lastJson.get("long_name");
			}
		}
		return ret;
	}
	
	private static String readAll(Reader rd) throws IOException {
		StringBuilder sb = new StringBuilder();
		int cp;
		while ((cp = rd.read()) != -1) {
			sb.append((char) cp);
		}
		return sb.toString();
	}
}
